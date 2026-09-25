import QRCode from 'qrcode';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import jsQR from 'jsqr';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'https://oilteqindustries.com/scan';
const outputPath = path.join(__dirname, '..', 'public', 'oilteq-qr.png');
const teardropPath = path.join(__dirname, '..', 'src', 'assets', 'oilteq-clean-teardrop.png');

async function generateMasterQR() {
  const TOTAL_SIZE = 800;
  const QR_MATRIX_SIZE = 556;
  const CIRCLE_DIAMETER = 154; // Diameter of central circle
  const BORDER_WIDTH = 4;
  const DROP_HEIGHT = 126; // Height of central teardrop

  // 1. Generate QR matrix SVG
  const qrSvgRaw = await QRCode.toString(url, {
    type: 'svg',
    margin: 0,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#121714',
      light: '#00000000', // Transparent so canvas shows through
    },
  });

  const qrBuffer = await sharp(Buffer.from(qrSvgRaw))
    .resize(QR_MATRIX_SIZE, QR_MATRIX_SIZE)
    .png()
    .toBuffer();

  const qrLeft = Math.round((TOTAL_SIZE - QR_MATRIX_SIZE) / 2); // 122
  const qrTop = Math.round((TOTAL_SIZE - QR_MATRIX_SIZE) / 2);  // 122

  // 2. Full background canvas with 4 Gold Corner Reticle Brackets
  const canvasSvg = Buffer.from(
    `<svg width="${TOTAL_SIZE}" height="${TOTAL_SIZE}" viewBox="0 0 ${TOTAL_SIZE} ${TOTAL_SIZE}" xmlns="http://www.w3.org/2000/svg">
      <!-- Cream background -->
      <rect width="${TOTAL_SIZE}" height="${TOTAL_SIZE}" fill="#F4F1EA" />
      
      <!-- 4 Gold Corner Reticle Brackets matching original design -->
      <!-- Top-Left -->
      <path d="M 28 94 L 28 28 L 94 28" stroke="#CA9A43" stroke-width="5" stroke-linecap="square" fill="none" />
      <!-- Top-Right -->
      <path d="M 706 28 L 772 28 L 772 94" stroke="#CA9A43" stroke-width="5" stroke-linecap="square" fill="none" />
      <!-- Bottom-Left -->
      <path d="M 28 706 L 28 772 L 94 772" stroke="#CA9A43" stroke-width="5" stroke-linecap="square" fill="none" />
      <!-- Bottom-Right -->
      <path d="M 706 772 L 772 772 L 772 706" stroke="#CA9A43" stroke-width="5" stroke-linecap="square" fill="none" />
    </svg>`
  );

  // 3. Central cream circle with gold border
  const badgeSvg = Buffer.from(
    `<svg width="${CIRCLE_DIAMETER}" height="${CIRCLE_DIAMETER}" viewBox="0 0 ${CIRCLE_DIAMETER} ${CIRCLE_DIAMETER}" xmlns="http://www.w3.org/2000/svg">
      <circle 
        cx="${CIRCLE_DIAMETER / 2}" 
        cy="${CIRCLE_DIAMETER / 2}" 
        r="${CIRCLE_DIAMETER / 2 - BORDER_WIDTH / 2}" 
        fill="#F4F1EA" 
        stroke="#CA9A43" 
        stroke-width="${BORDER_WIDTH}" 
      />
    </svg>`
  );
  const badgePng = await sharp(badgeSvg).png().toBuffer();
  const badgeLeft = Math.round((TOTAL_SIZE - CIRCLE_DIAMETER) / 2); // 323
  const badgeTop = Math.round((TOTAL_SIZE - CIRCLE_DIAMETER) / 2);  // 323

  // 4. Resize clean teardrop by height ONLY (preserves natural aspect ratio without padding)
  const dropBuffer = await sharp(teardropPath)
    .resize({ height: DROP_HEIGHT })
    .png()
    .toBuffer();

  const dropMeta = await sharp(dropBuffer).metadata();
  const dropLeft = Math.round((TOTAL_SIZE - dropMeta.width) / 2);
  const dropTop = Math.round((TOTAL_SIZE - dropMeta.height) / 2);

  // Composite: canvas -> QR matrix -> Center Badge -> Teardrop
  await sharp(canvasSvg)
    .composite([
      { input: qrBuffer, top: qrTop, left: qrLeft },
      { input: badgePng, top: badgeTop, left: badgeLeft },
      { input: dropBuffer, top: dropTop, left: dropLeft },
    ])
    .png()
    .toFile(outputPath);

  console.log('Master QR Generated:', outputPath);
  console.log(`Canvas: ${TOTAL_SIZE}x${TOTAL_SIZE}`);
  console.log(`QR Matrix: ${QR_MATRIX_SIZE}x${QR_MATRIX_SIZE} at (${qrLeft}, ${qrTop})`);
  console.log(`Circle Badge: ${CIRCLE_DIAMETER}x${CIRCLE_DIAMETER} at (${badgeLeft}, ${badgeTop})`);
  console.log(`Teardrop: ${dropMeta.width}x${dropMeta.height} at (${dropLeft}, ${dropTop})`);

  // Verify scan with jsQR
  const { data, info } = await sharp(outputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  const code = jsQR(new Uint8ClampedArray(data), info.width, info.height);
  if (code && code.data === url) {
    console.log('✓ Verification SUCCESS: QR decodes exactly to:', code.data);
  } else {
    console.error('✗ Verification FAILED! Decoded:', code?.data);
  }
}

generateMasterQR();
