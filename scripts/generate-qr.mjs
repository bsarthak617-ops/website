import QRCode from 'qrcode';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'https://oilteqindustries.com/scan';
const outputPath = path.join(__dirname, '..', 'public', 'oilteq-qr.png');
const logoPath = path.join(__dirname, '..', 'public', 'oilteq-logo-4k.png');

// Use even numbers to avoid sub-pixel rounding issues
const QR_SIZE = 512;
const CIRCLE_DIAMETER = 112;
const LOGO_SIZE = 62;
const BORDER_WIDTH = 2;

async function generateQR() {
  try {
    // 1. Generate QR code
    const qrBuffer = await QRCode.toBuffer(url, {
      width: QR_SIZE,
      margin: 2,
      color: { dark: '#000000', light: '#F4F1EA' },
      errorCorrectionLevel: 'H',
    });

    // Exact center offsets (all even numbers → no rounding drift)
    const circleLeft = (QR_SIZE - CIRCLE_DIAMETER) / 2;  // 200
    const circleTop = (QR_SIZE - CIRCLE_DIAMETER) / 2;   // 200

    const logoLeft = (QR_SIZE - LOGO_SIZE) / 2;           // 225
    const logoTop = (QR_SIZE - LOGO_SIZE) / 2 + 1;        // 226 — nudge down 1px for teardrop visual balance

    // 2. Cream circle with gold border
    const circleSvg = Buffer.from(
      `<svg width="${CIRCLE_DIAMETER}" height="${CIRCLE_DIAMETER}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${CIRCLE_DIAMETER / 2}" cy="${CIRCLE_DIAMETER / 2}" r="${CIRCLE_DIAMETER / 2 - BORDER_WIDTH}" fill="#F4F1EA" stroke="#CA9A43" stroke-width="${BORDER_WIDTH}"/>
      </svg>`
    );

    // 3. Resize logo — trim any transparent padding first, then resize
    const logoTrimmed = await sharp(logoPath)
      .trim()
      .resize(LOGO_SIZE, LOGO_SIZE, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    // 4. Composite
    await sharp(qrBuffer)
      .composite([
        { input: await sharp(circleSvg).png().toBuffer(), top: circleTop, left: circleLeft },
        { input: logoTrimmed, top: logoTop, left: logoLeft },
      ])
      .png()
      .toFile(outputPath);

    console.log('Done:', outputPath);
    console.log(`Circle at (${circleLeft}, ${circleTop}) ${CIRCLE_DIAMETER}px`);
    console.log(`Logo at (${logoLeft}, ${logoTop}) ${LOGO_SIZE}px`);
  } catch (err) {
    console.error('Error:', err);
  }
}

generateQR();
