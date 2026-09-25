import QRCode from 'qrcode';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'https://oilteqindustries.com/scan';
const outputPath = path.join(__dirname, '..', 'public', 'oilteq-qr.png');
const logoPath = path.join(__dirname, '..', 'public', 'oilteq-logo-4k.png');

const QR_SIZE = 512;
const CIRCLE_DIAMETER = Math.round(QR_SIZE * 0.22); // ~22% of QR — matches CSS overlay size
const LOGO_SIZE = Math.round(CIRCLE_DIAMETER * 0.58);
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

    const center = Math.round(QR_SIZE / 2);
    const circleOffset = center - Math.round(CIRCLE_DIAMETER / 2);
    const logoOffset = center - Math.round(LOGO_SIZE / 2);

    // 2. Cream circle with gold border
    const circleSvg = Buffer.from(`<svg width="${CIRCLE_DIAMETER}" height="${CIRCLE_DIAMETER}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${CIRCLE_DIAMETER/2}" cy="${CIRCLE_DIAMETER/2}" r="${CIRCLE_DIAMETER/2 - BORDER_WIDTH}" fill="#F4F1EA" stroke="#CA9A43" stroke-width="${BORDER_WIDTH}"/>
    </svg>`);

    // 3. Resize logo
    const logoResized = await sharp(logoPath)
      .resize(LOGO_SIZE, LOGO_SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    // 4. Composite all layers
    await sharp(qrBuffer)
      .composite([
        { input: await sharp(circleSvg).png().toBuffer(), top: circleOffset, left: circleOffset },
        { input: logoResized, top: logoOffset, left: logoOffset },
      ])
      .png()
      .toFile(outputPath);

    console.log('Done:', outputPath);
    console.log(`URL: ${url} | QR: ${QR_SIZE}px | Circle: ${CIRCLE_DIAMETER}px | Logo: ${LOGO_SIZE}px`);
  } catch (err) {
    console.error('Error:', err);
  }
}

generateQR();
