#!/usr/bin/env python3
"""
WheelsEye to n8n Cloud Automated Daily Pusher
============================================
Runs on schedule at 8:00 AM every morning.
Logs into WheelsEye Fleet Owner portal, extracts yesterday's
Distance Report Excel verbatim, and transmits it directly to n8n Cloud.
"""

import os
import sys
import time
import argparse
import datetime
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).parent.resolve()
env_file = BASE_DIR / ".env"
if env_file.exists():
    load_dotenv(dotenv_path=env_file)

import wheelseye_agent

DEFAULT_PROD_WEBHOOK = os.getenv(
    "N8N_WEBHOOK_URL",
    "https://namyattest.app.n8n.cloud/webhook/wheelseye-data"
)


def push_file_to_n8n(file_path: Path, webhook_url: str) -> bool:
    import pandas as pd
    import requests

    if not file_path.exists():
        print(f"❌ File not found: {file_path}")
        return False

    xl = pd.ExcelFile(file_path)
    sheet1_records = []
    lifecycle_records = []

    # Parse Sheet1 (or first sheet)
    s1_name = "Sheet1" if "Sheet1" in xl.sheet_names else xl.sheet_names[0]
    df1 = pd.read_excel(file_path, sheet_name=s1_name)
    sheet1_records = df1.fillna("").to_dict(orient="records")

    # Parse Trip_Lifecycle if present
    if "Trip_Lifecycle" in xl.sheet_names:
        df2 = pd.read_excel(file_path, sheet_name="Trip_Lifecycle")
        lifecycle_records = df2.fillna("").to_dict(orient="records")

    payload = {
        "status": "success",
        "extraction_mode": "DUAL_TAB_REPORT_PUSH",
        "total_records": len(sheet1_records),
        "sheet1_records": sheet1_records,
        "lifecycle_records": lifecycle_records,
        "daily_records": sheet1_records,
        "raw_records": sheet1_records
    }

    print(f"[PUSH] Transmitting {len(sheet1_records)} audit records and {len(lifecycle_records)} lifecycle records from {file_path.name} to n8n ({webhook_url})...")
    res = requests.post(webhook_url, json=payload, timeout=30)
    if res.status_code in [200, 201]:
        print(f"✅ SUCCESS! n8n confirmed webhook start ({res.status_code}): {res.text}")
        return True
    else:
        print(f"❌ n8n returned status ({res.status_code}): {res.text}")
        return False


def main():
    parser = argparse.ArgumentParser(description="Automated WheelsEye live sync to Google Sheets")
    parser.add_argument(
        "--webhook",
        type=str,
        default=DEFAULT_PROD_WEBHOOK,
        help="Your n8n Cloud Webhook URL"
    )
    parser.add_argument(
        "--date",
        type=str,
        default=None,
        help="Target date (DD/MM/YYYY). Defaults to yesterday."
    )
    parser.add_argument(
        "--file",
        type=str,
        default=None,
        help="Optional path to Excel report with Night_Halt_Location to push directly to n8n"
    )
    parser.add_argument(
        "--retries",
        type=int,
        default=3,
        help="Maximum retry attempts if portal or network fails"
    )
    args = parser.parse_args()

    if args.file:
        file_path = Path(args.file)
        if not file_path.is_absolute():
            file_path = BASE_DIR / file_path
        success = push_file_to_n8n(file_path, args.webhook)
        return 0 if success else 1

    target_date = args.date
    if not target_date:
        target_date = (datetime.date.today() - datetime.timedelta(days=1)).strftime("%d/%m/%Y")

    now_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print("=" * 65)
    print(f"  🚀 WheelsEye Live Sync [{now_str}]")
    print("=" * 65)
    print(f"Target Date:    {target_date}")
    print(f"Target Webhook: {args.webhook}")
    print(f"Max Retries:    {args.retries}")
    print("-" * 65)

    # Allow 3 seconds for network/Wi-Fi to settle in case machine just woke up
    time.sleep(3)

    retry_delay = 15
    for attempt in range(1, args.retries + 1):
        try:
            print(f"[SYNC ATTEMPT {attempt}/{args.retries}] Starting WheelsEye data extraction...")
            result = wheelseye_agent.execute_sync(target_date=target_date, webhook_url=args.webhook)
            records = result.get("raw_records", [])
            print(f"\n✅ SUCCESS! Transferred {len(records)} live WheelsEye records directly to Google Sheets.")
            return 0
        except Exception as e:
            print(f"\n⚠️ Attempt {attempt}/{args.retries} failed: {e}")
            if attempt < args.retries:
                print(f"[RETRY] Waiting {retry_delay}s before retrying...")
                time.sleep(retry_delay)
                retry_delay *= 2
            else:
                print("\n❌ All retry attempts failed.")
                return 1


if __name__ == "__main__":
    sys.exit(main())
