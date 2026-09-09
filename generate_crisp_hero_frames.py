import cv2
import numpy as np
import os
import time

def process_all_frames():
    start_time = time.time()
    input_video = 'Truck_animation_for_Oilteq_Indus…_202609091635.mp4'
    output_dir = 'public/hero-sequence'
    os.makedirs(output_dir, exist_ok=True)

    # 1. Prepare crisp official logo
    logo_raw = cv2.imread('public/oilteq-logo.png', cv2.IMREAD_UNCHANGED)
    h_l, w_l = logo_raw.shape[:2]
    
    # Text side is x >= 550. Droplet emblem is x < 550.
    logo_crisp = logo_raw.copy()
    for y in range(h_l):
        for x in range(550, w_l):
            if logo_raw[y, x, 3] > 0:
                if y < h_l * 0.52:
                    # 'OILTEQ' in crisp pure white #FFFFFF
                    logo_crisp[y, x, :3] = [255, 255, 255]
                else:
                    # 'INDUSTRIES' in clean metallic silver #D8DDE2
                    logo_crisp[y, x, :3] = [226, 221, 216]

    # Target size on 1080p canvas:
    target_h = int(136 * 1.5) # 204 px
    target_w = int(w_l * (target_h / h_l)) # ~465 px
    resized_logo = cv2.resize(logo_crisp, (target_w, target_h), interpolation=cv2.INTER_LANCZOS4)
    logo_rgb = resized_logo[:, :, :3]
    logo_alpha = (resized_logo[:, :, 3] / 255.0)[:, :, np.newaxis]

    base_pos_x = int(425 * 1.5) - target_w // 2 # 402
    base_pos_y = int(265 * 1.5) # 397

    cap = cv2.VideoCapture(input_video)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    print(f"Starting processing of {total_frames} frames to 1080p...")

    # Pre-calculated displacement for frames 0 to 65:
    # Linear tracking: truck translates ~0.8 px/frame in 720p (1.2 px/frame in 1080p)
    dx_table = [min(49, int(f * 0.8)) for f in range(66)]

    for f in range(total_frames):
        ret, frame = cap.read()
        if not ret:
            break

        # Horizontal flip so truck drives left-to-right
        flipped = cv2.flip(frame, 1)

        if f <= 64:
            dx_720 = dx_table[f]
            # Mirrored text/logo ROI on 720p:
            x1, x2 = 230 + dx_720, 710 + dx_720
            y1, y2 = 250, 425

            roi = flipped[y1:y2, x1:x2]
            gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
            sat = cv2.cvtColor(roi, cv2.COLOR_BGR2HSV)[:, :, 1]
            mask = ((gray > 65) | (sat > 30)).astype(np.uint8) * 255
            mask = cv2.dilate(mask, np.ones((5, 5), np.uint8), iterations=2)

            # Exclude pillar from inpaint if pillar enters this region
            sky_row = flipped[100, :, 0]
            p_cols = np.where(sky_row < 80)[0]
            if len(p_cols) > 0:
                p_left, p_right = p_cols[0], p_cols[-1]
                for c in range(x1, x2):
                    if p_left - 10 <= c <= p_right + 10:
                        mask[:, c - x1] = 0

            full_mask = np.zeros(flipped.shape[:2], dtype=np.uint8)
            full_mask[y1:y2, x1:x2] = mask
            inpainted = cv2.inpaint(flipped, full_mask, 5, cv2.INPAINT_TELEA)

            # Upscale to 1080p (1920x1080)
            up_1080 = cv2.resize(inpainted, (1920, 1080), interpolation=cv2.INTER_LANCZOS4)
            blurred = cv2.GaussianBlur(up_1080, (0, 0), 1.2)
            sharpened = cv2.addWeighted(up_1080, 1.35, blurred, -0.35, 0)

            # Composite logo
            pos_x = base_pos_x + int(dx_720 * 1.5)
            pos_y = base_pos_y

            p1080_left = int(p_cols[0] * 1.5) if len(p_cols) > 0 else 9999

            logo_roi = sharpened[pos_y:pos_y+target_h, pos_x:pos_x+target_w]
            alpha = logo_alpha.copy()

            # Mask out logo where pillar covers it or behind pillar
            for lx in range(target_w):
                gx = pos_x + lx
                if gx >= p1080_left - 5:
                    alpha[:, lx, :] = 0.0

            blended = (logo_rgb * alpha + logo_roi * (1.0 - alpha)).astype(np.uint8)
            sharpened[pos_y:pos_y+target_h, pos_x:pos_x+target_w] = blended
            final_frame = sharpened
        else:
            # Frames 65-239: Upscale to 1080p and sharpen for crisp edge clarity
            up_1080 = cv2.resize(flipped, (1920, 1080), interpolation=cv2.INTER_LANCZOS4)
            blurred = cv2.GaussianBlur(up_1080, (0, 0), 1.2)
            final_frame = cv2.addWeighted(up_1080, 1.35, blurred, -0.35, 0)

        out_path = os.path.join(output_dir, f"frame_{f:03d}.webp")
        cv2.imwrite(out_path, final_frame, [cv2.IMWRITE_WEBP_QUALITY, 94])

        if f % 30 == 0 or f == total_frames - 1:
            print(f"Rendered frame {f}/{total_frames - 1} ({time.time() - start_time:.1f}s)")

    cap.release()
    print(f"Finished rendering all {total_frames} frames in {time.time() - start_time:.2f}s!")

if __name__ == '__main__':
    process_all_frames()
