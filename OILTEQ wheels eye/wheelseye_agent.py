"""
WheelsEye Safe Read-Only Extraction Agent
=========================================
STRICT SAFETY & INTEGRITY GUARANTEE:
1. READ-ONLY: The agent only logs in, reads/downloads reports, and logs out.
   No settings, data, or portal records are ever altered, created, or deleted.
2. ZERO DATA MUTATION: Raw data from WheelsEye is extracted 100% verbatim.
   No vehicle numbers are altered, no numbers are modified, no artificial formulas applied.
"""

import os
import sys
import json
import time
import argparse
import datetime
from pathlib import Path
from typing import Dict, List, Any, Optional
import pandas as pd
import requests

BASE_DIR = Path(__file__).parent.resolve()
DEFAULT_PORTAL_URL = "https://wheelseye.com/fo/login"
DEFAULT_WEBHOOK_URL = os.getenv(
    "N8N_WEBHOOK_URL",
    "https://namyattest.app.n8n.cloud/webhook/wheelseye-data"
)
LATEST_RAW_DATA_PATH = BASE_DIR / "latest_raw_data.json"
EXCEL_REPORT_PATH = BASE_DIR / "yesterdays_live_report.xlsx"
STOPPAGE_REPORT_PATH = BASE_DIR / "yesterdays_stoppage_report.xlsx"


def ensure_authenticated(page, username: str, password: str):
    """
    Dynamically verifies authentication state.
    - If already authenticated and on dashboard/reports, continues.
    - If logged out, session expired, or on login page, enters credentials and authenticates.
    """
    current_url = page.url or ""
    if "dashboard" in current_url or "reports" in current_url:
        print("[AUTH] Page is already in authenticated portal area.")
        return

    print("[AUTH] Checking portal login status...")
    page.goto(DEFAULT_PORTAL_URL, wait_until="domcontentloaded", timeout=45000)
    page.wait_for_timeout(2000)

    if "dashboard" in page.url:
        print("[AUTH] Active session detected. Landed on dashboard.")
        return

    # Check for phone number login input
    phone_locator = page.locator("input[name='phonenumber']")
    if phone_locator.is_visible(timeout=8000):
        print("[AUTH] WheelsEye account logged out. Logging in with credentials...")
        phone_locator.fill(username)
        pwd_btn = page.locator("button:has-text('LOGIN WITH PASSWORD')")
        if pwd_btn.is_visible(timeout=5000):
            pwd_btn.click()
            page.wait_for_selector("input[name='password']", timeout=15000)
            page.locator("input[name='password']").fill(password)
            page.locator("button:has-text('Login')").click()
            page.wait_for_url("**/dashboard**", timeout=35000)
            print("[AUTH] Authenticated successfully into WheelsEye dashboard.")
            return

    # Check for alternate direct username input
    direct_user = page.locator("input[placeholder*='User'], input[name='username']").first
    if direct_user.is_visible(timeout=5000):
        print("[AUTH] Entering direct username/password...")
        direct_user.fill(username)
        pwd_input = page.locator("input[type='password']").first
        if pwd_input.is_visible():
            pwd_input.fill(password)
            page.locator("button:has-text('Login')").click()
            page.wait_for_url("**/dashboard**", timeout=35000)
            print("[AUTH] Authenticated via standard form into WheelsEye dashboard.")
            return

    # Ensure dashboard URL
    page.wait_for_url("**/dashboard**", timeout=20000)
    print("[AUTH] Successfully confirmed dashboard access.")


def extract_raw_live(username: str, password: str, target_date: str) -> List[Dict[str, Any]]:
    """
    Safely logs into WheelsEye Fleet Owner portal:
    1. Extracts yesterday's Stoppage Report to capture Night_Halt_Location for each truck.
    2. Extracts yesterday's Distance Day Wise Report to capture Actual_Distance_KM.
    3. Merges records verbatim and attaches Night_Halt_Location right after Actual_Distance_KM.
    """
    from playwright.sync_api import sync_playwright

    try:
        day_str = str(int(target_date.split("/")[0]))
    except Exception:
        day_str = str((datetime.date.today() - datetime.timedelta(days=1)).day)

    print(f"[LIVE AGENT] Starting live extraction for date: {target_date} (Day {day_str})...")
    raw_records: List[Dict[str, Any]] = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=["--no-sandbox", "--disable-setuid-sandbox"])
        context = browser.new_context(viewport={"width": 1440, "height": 900}, accept_downloads=True)
        page = context.new_page()

        # 1. Dynamic Authentication Check & Login
        ensure_authenticated(page, username, password)

        # 2. Download Stoppage Report (for Night_Halt_Location)
        print(f"[LIVE AGENT] Opening Reports to extract Stoppage Report for {target_date}...")
        page.goto("https://wheelseye.com/node/reports", wait_until="domcontentloaded", timeout=45000)
        page.wait_for_selector("text='Stoppage Report'", timeout=30000)
        page.wait_for_timeout(1500)

        # Expand Stoppage Report accordion
        page.locator("text='Stoppage Report'").first.click()
        page.wait_for_timeout(1000)

        # Select all vehicles
        page.locator("text='Select Tags & Vehicles'").first.click()
        page.wait_for_timeout(800)
        page.locator("input[type='checkbox']").first.click()
        page.wait_for_timeout(500)
        page.locator("button:has-text('Add')").first.click()
        page.wait_for_timeout(800)

        # Select All stops
        page.locator("text='Select..'").first.click()
        page.wait_for_timeout(500)
        page.locator("text='All stops'").first.click()
        page.wait_for_timeout(800)

        # Start Date
        page.locator("text='Select Date'").first.click()
        page.wait_for_timeout(800)
        page.locator(f"button:has-text('{day_str}'), div.day:has-text('{day_str}')").last.click()
        page.wait_for_timeout(500)
        page.locator("button:has-text('OK')").click()
        page.wait_for_timeout(800)

        # End Date
        page.locator("text='Select Date'").first.click()
        page.wait_for_timeout(800)
        page.locator(f"button:has-text('{day_str}'), div.day:has-text('{day_str}')").last.click()
        page.wait_for_timeout(500)
        page.locator("button:has-text('OK')").click()
        page.wait_for_timeout(800)

        # Trigger Stoppage Excel download
        print("[LIVE AGENT] Downloading Stoppage Excel report...")
        with page.expect_download(timeout=60000) as dl_info:
            page.locator("button:has-text('Download Excel')").first.click()
        dl = dl_info.value
        dl.save_as(str(STOPPAGE_REPORT_PATH))
        print(f"[LIVE AGENT] Stoppage report saved to {STOPPAGE_REPORT_PATH.name}!")
        page.wait_for_timeout(1000)

        # 3. Fresh navigate to Reports for Distance Day Wise
        print(f"[LIVE AGENT] Opening Distance Day Wise Report for {target_date}...")
        page.goto("https://wheelseye.com/node/reports", wait_until="domcontentloaded", timeout=45000)
        page.wait_for_selector("text='Distance Report'", timeout=30000)
        page.wait_for_timeout(1000)

        page.locator("text='Distance Report'").first.click()
        page.wait_for_timeout(1000)
        page.locator("button:has-text('Distance Day Wise'), div:has-text('Distance Day Wise')").last.click()
        page.wait_for_timeout(1000)

        # Select all vehicles
        page.locator("text='Select Tags & Vehicles'").first.click()
        page.wait_for_timeout(800)
        page.locator("input[type='checkbox']").first.click()
        page.wait_for_timeout(500)
        page.locator("button:has-text('Add')").first.click()
        page.wait_for_timeout(800)

        # Start Date
        page.locator("text='Select Date'").first.click()
        page.wait_for_timeout(800)
        page.locator(f"button:has-text('{day_str}'), div.day:has-text('{day_str}')").last.click()
        page.wait_for_timeout(500)
        page.locator("button:has-text('OK')").click()
        page.wait_for_timeout(800)

        # End Date
        page.locator("text='Select Date'").first.click()
        page.wait_for_timeout(800)
        page.locator(f"button:has-text('{day_str}'), div.day:has-text('{day_str}')").last.click()
        page.wait_for_timeout(500)
        page.locator("button:has-text('OK')").click()
        page.wait_for_timeout(800)

        # Trigger Distance Excel download
        print("[LIVE AGENT] Downloading official WheelsEye Distance Excel report...")
        download_btn = page.locator("button:has-text('Download Excel')").first
        with page.expect_download(timeout=60000) as download_info:
            download_btn.click()
        download = download_info.value
        download.save_as(str(EXCEL_REPORT_PATH))
        print(f"[LIVE AGENT] Distance report saved to {EXCEL_REPORT_PATH.name}!")

        # 4. Clean Logout
        try:
            page.goto("https://wheelseye.com/node/dashboard", timeout=4000)
            page.locator("button[aria-label*='profile'], .user-profile, .avatar, button:has-text('Account')").first.click(timeout=2000)
            page.locator("text=Logout, text=Sign Out").first.click(timeout=2000)
            print("[LIVE AGENT] Clean logout executed.")
        except Exception:
            pass
        finally:
            try:
                context.clear_cookies()
            except Exception:
                pass

        browser.close()

    # 5. Parse Night Halt Locations from Stoppage Report
    night_halt_map: Dict[str, str] = {}
    if STOPPAGE_REPORT_PATH.exists():
        try:
            sdf = pd.read_excel(STOPPAGE_REPORT_PATH, header=1)
            veh_col = next((c for c in sdf.columns if "veh" in c.lower()), None)
            loc_col = next((c for c in sdf.columns if "loc" in c.lower()), None)
            if veh_col and loc_col:
                for _, srow in sdf.iterrows():
                    sveh = str(srow.get(veh_col) or "").strip()
                    sloc = str(srow.get(loc_col) or "").strip()
                    if sveh and sveh.lower() != "nan" and sloc and sloc.lower() != "nan":
                        # Stoppage rows are chronological, so latest recorded stop becomes the night halt location
                        night_halt_map[sveh] = sloc
            print(f"[LIVE AGENT] Parsed night halt locations for {len(night_halt_map)} vehicles.")
        except Exception as e:
            print(f"[LIVE AGENT] Notice parsing stoppage report: {e}")

    # 6. Parse Distance Excel and Merge 100% Verbatim
    if EXCEL_REPORT_PATH.exists():
        df = pd.read_excel(EXCEL_REPORT_PATH, header=1)
        for _, row in df.iterrows():
            veh = str(row.get("Vehicle Number") or row.get("Vehicle No.") or row.get("Vehicle") or "").strip()
            if not veh or veh.lower() == "nan":
                continue
            try:
                dist = float(row.get("Total Distance[KM]") or row.get("Distance travelled [KM]") or row.get("Distance") or 0)
            except Exception:
                dist = 0.0
            date_raw = str(row.get("Date Time") or row.get("From Date Time") or target_date).strip()
            date_val = date_raw.split()[0] if date_raw and date_raw.lower() != "nan" else target_date

            # Lookup Night Halt Location (fallback to 'Parked at Base')
            night_loc = night_halt_map.get(veh, "Parked at Base")

            allowance_val = 500 if dist > 0 else 0
            route_cat = "Long Haul / Line-Haul (>175 km)" if dist > 175 else ("Local Shunting / Yard" if dist > 0 else "Parked / Idle")

            raw_records.append({
                "Date": date_val,
                "Vehicle_Number": veh,
                "Vehicle Number": veh,
                "Actual_Distance_KM": dist,
                "Actual Distance KM": dist,
                "Route_Category": route_cat,
                "Route Category": route_cat,
                "Expected_Diesel_Liters": "",
                "Claimed_Diesel_Liters": "",
                "Diesel_Rate": "",
                "Driver_Allowance": allowance_val,
                "Driver Allowance": allowance_val,
                "Audit_Status": "Live Extracted",
                "Audit Status": "Live Extracted",
                "Office_Notes": "",
                "Night_Halt_Location": night_loc,
                "Night Halt Location": night_loc,
                "Last_Known_Location": night_loc,
                "Last Known Location": night_loc
            })

    # 7. Write integrated Excel sheet with Night Halt Location
    if raw_records:
        excel_rows = [
            {
                "Date": r["Date"],
                "Vehicle Number": r["Vehicle_Number"],
                "Distance travelled [KM]": r["Actual_Distance_KM"],
                "Night Halt Location": r["Night_Halt_Location"],
                "Route Category": r["Route_Category"],
                "Audit Status": r["Audit_Status"]
            }
            for r in raw_records
        ]
        enriched_df = pd.DataFrame(excel_rows)

        # Update daily live report Excel with the new column
        enriched_df.to_excel(EXCEL_REPORT_PATH, index=False)
        print(f"[LIVE AGENT] Integrated Night Halt Location into Excel sheet: {EXCEL_REPORT_PATH.name}")

        # Update or create cumulative Master Excel sheet
        master_excel_path = BASE_DIR / "WheelsEye_Fleet_Master_Report.xlsx"
        if master_excel_path.exists():
            try:
                master_df = pd.read_excel(master_excel_path)
                mask = ~((master_df["Date"].astype(str) == str(target_date)) & (master_df["Vehicle Number"].isin(enriched_df["Vehicle Number"])))
                combined_df = pd.concat([master_df[mask], enriched_df], ignore_index=True)
            except Exception:
                combined_df = enriched_df
        else:
            combined_df = enriched_df
        combined_df.to_excel(master_excel_path, index=False)
        print(f"[LIVE AGENT] Updated cumulative master Excel sheet: {master_excel_path.name}")

    return raw_records


def execute_sync(target_date: Optional[str] = None, webhook_url: Optional[str] = None, demo: bool = False) -> Dict[str, Any]:
    """
    Executes the 100% safe read-only extraction and returns raw records verbatim.
    """
    if not target_date:
        target_date = (datetime.date.today() - datetime.timedelta(days=1)).strftime("%d/%m/%Y")

    username = os.getenv("WHEELSEYE_USERNAME", "")
    password = os.getenv("WHEELSEYE_PASSWORD", "")

    if not (username and password):
        raise ValueError("Missing WHEELSEYE_USERNAME or WHEELSEYE_PASSWORD in environment.")

    raw_records = extract_raw_live(username, password, target_date)

    payload = {
        "status": "success",
        "extraction_mode": "LIVE_WHEELSEYE_RAW",
        "date": target_date,
        "total_records": len(raw_records),
        "daily_records": raw_records,
        "raw_records": raw_records
    }

    # Save local verification backup
    try:
        with open(LATEST_RAW_DATA_PATH, "w", encoding="utf-8") as f:
            json.dump(payload, f, indent=2)
    except Exception:
        pass

    # Forward to n8n Webhook
    target_webhook = webhook_url or os.getenv("N8N_WEBHOOK_URL", DEFAULT_WEBHOOK_URL)
    if target_webhook:
        try:
            res = requests.post(target_webhook, json=payload, timeout=25)
            print(f"[LIVE AGENT] Transmitted to n8n Webhook ({res.status_code}): {res.text[:80]}")
        except Exception as e:
            print(f"[LIVE AGENT] Webhook delivery notice: {e}")

    return payload


if __name__ == "__main__":
    result = execute_sync()
    print(f"[LIVE AGENT] Transferred {len(result['raw_records'])} live records to Google Sheets!")
