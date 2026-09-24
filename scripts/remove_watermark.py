import cv2
import numpy as np
import os
import shutil

def process_all_frames():
    seq_dir = 'public/hero-sequence'
    backup_dir = 'public/hero-sequence-backup'

    if not os.path.exists(backup_dir):
        print(f"Creating backup in {backup_dir}...")
        os.makedirs(backup_dir, exist_ok=True)
        for i in range(240):
            fname = f"frame_{i:03d}.webp"
            src = os.path.join(seq_dir, fname)
            dst = os.path.join(backup_dir, fname)
            if os.path.exists(src):
                shutil.copy2(src, dst)
        print("Backup complete.")

    # 1. Prepare global inpaint mask for the 1080x1920 frame
    h, w = 1080, 1920
    mask = np.zeros((h, w), dtype=np.uint8)
    cx = 1700 + 39.5
    cy = 860 + 39.5
    rx, ry = 37.0, 37.0
    roi_h, roi_w = 100, 100
    Y, X = np.ogrid[:roi_h, :roi_w]
    dist = (np.abs((X - 50) / rx))**0.65 + (np.abs((Y - 50) / ry))**0.65
    local_mask = (dist <= 1.08).astype(np.uint8) * 255
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    local_mask = cv2.dilate(local_mask, kernel)
    mask[int(cy - 50):int(cy - 50) + roi_h, int(cx - 50):int(cx - 50) + roi_w] = local_mask

    print("Processing 240 frames...")
    for idx in range(240):
        frame_path = os.path.join(seq_dir, f"frame_{idx:03d}.webp")
        if not os.path.exists(frame_path):
            continue

        img = cv2.imread(frame_path)
        if img is None:
            continue

        # Inpaint base watermark
        inp = cv2.inpaint(img, mask, 4, cv2.INPAINT_TELEA)

        # Work on 160x160 patch [820:980, 1660:1820]
        crop = inp[820:980, 1660:1820].copy()

        # Handle feature lines passing through the star area
        if idx <= 220:
            # Horizontal pavement seam / glowing wire at y ≈ 93..94
            x1, y1 = 45.0, 93.0
            x2, y2 = 115.0, 94.0
            bridge_line(crop, (x1, y1), (x2, y2), width=11, sigma=0.8)
        elif 223 <= idx <= 232:
            # Diagonal glowing wire across perimeter
            p1, p2 = find_wire_endpoints(img[820:980, 1660:1820])
            if p1 is not None and p2 is not None:
                bridge_line(crop, p1, p2, width=13, sigma=0.8)

        # Place patch back into frame
        inp[820:980, 1660:1820] = crop

        # Save back to webp with high quality
        cv2.imwrite(frame_path, inp, [cv2.IMWRITE_WEBP_QUALITY, 92])

        if idx % 30 == 0 or idx == 239:
            print(f"Processed frame {idx:03d} / 239")

    print("All 240 frames successfully processed and saved!")

def find_wire_endpoints(crop):
    # Radius 48 around (80, 80)
    angles = np.linspace(0, 2 * np.pi, 720)
    r = 48
    xs = 80 + r * np.cos(angles)
    ys = 80 + r * np.sin(angles)

    vals = np.array([cv2.getRectSubPix(crop, (1, 1), (x, y))[0, 0].mean() for x, y in zip(xs, ys)])

    # Left hemisphere: angles from 120 to 240 deg (indices 240 to 480)
    left_sub = vals[240:480]
    left_peak_idx = 240 + np.argmax(left_sub)

    # Right hemisphere: angles from 300 to 360/0 to 60 deg
    right_indices = np.concatenate([np.arange(600, 720), np.arange(0, 120)])
    right_sub = vals[right_indices]
    right_peak_idx = right_indices[np.argmax(right_sub)]

    if vals[left_peak_idx] > 200 and vals[right_peak_idx] > 200:
        p1 = (float(xs[left_peak_idx]), float(ys[left_peak_idx]))
        p2 = (float(xs[right_peak_idx]), float(ys[right_peak_idx]))
        return p1, p2
    return None, None

def bridge_line(crop, p1, p2, width=11, sigma=0.8):
    x1, y1 = p1
    x2, y2 = p2
    N = int(np.hypot(x2 - x1, y2 - y1))
    if N == 0:
        return

    dx = (x2 - x1) / N
    dy = (y2 - y1) / N
    nx = -dy
    ny = dx

    h_w = (width - 1) / 2.0
    dists = np.linspace(-h_w, h_w, width * 2 + 1)

    prof1 = np.array([cv2.getRectSubPix(crop, (1, 1), (x1 + d * nx, y1 + d * ny))[0, 0] for d in dists]).astype(float)
    prof2 = np.array([cv2.getRectSubPix(crop, (1, 1), (x2 + d * nx, y2 + d * ny))[0, 0] for d in dists]).astype(float)

    wire_layer = np.zeros_like(crop, dtype=float)
    wire_weight = np.zeros(crop.shape[:2], dtype=float)

    for step in range(N + 1):
        t = step / N
        px = x1 + t * (x2 - x1)
        py = y1 + t * (y2 - y1)
        blended_prof = (1 - t) * prof1 + t * prof2
        for d_idx, d in enumerate(dists):
            qx = px + d * nx
            qy = py + d * ny
            ix, iy = int(round(qx)), int(round(qy))
            if 0 <= ix < 160 and 0 <= iy < 160:
                wire_layer[iy, ix] += blended_prof[d_idx]
                wire_weight[iy, ix] += 1.0

    valid = wire_weight > 0
    wire_patch = crop.copy()
    wire_patch[valid] = np.clip(wire_layer[valid] / wire_weight[valid, None], 0, 255).astype(np.uint8)

    wire_smooth = cv2.GaussianBlur(wire_patch, (3, 3), sigma)
    crop[valid] = wire_smooth[valid]

if __name__ == '__main__':
    process_all_frames()
