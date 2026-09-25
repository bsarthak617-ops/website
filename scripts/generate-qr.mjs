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
const LOGO_CIRCLE_RATIO = 0.28; // Logo circle takes ~28% of QR width

async function generateQR() {
  try {
    // 1. Generate the QR code as a PNG buffer
    const qrBuffer = await QRCode.toBuffer(url, {
      width: QR_SIZE,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#F4F1EA',
      },
      errorCorrectionLevel: 'H',
    });

    // 2. Calculate logo circle dimensions
    const circleSize = Math.round(QR_SIZE * LOGO_CIRCLE_RATIO);
    const logoSize = Math.round(circleSize * 0.6);
    const offset = Math.round((QR_SIZE - circleSize) / 2);

    // 3. Create a cream-colored circle with border as SVG
    const circleSvg = Buffer.from(`
      <svg width="${circleSize}" height="${circleSize}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="3" flood-color="rgba(0,0,0,0.22)" />
          </filter>
        </defs>
        <circle cx="${circleSize/2}" cy="${circleSize/2}" r="${circleSize/2 - 2}" 
                fill="#F4F1EA" stroke="#CA9A43" stroke-width="3" filter="url(#shadow)" />
      </svg>
    `);

    // 4. Resize the logo to fit inside the circle
    const logoResized = await sharp(logoPath)
      .resize(logoSize, logoSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    const logoOffset = Math.round((QR_SIZE - logoSize) / 2);

    // 5. Composite: QR → circle → logo
    const result = await sharp(qrBuffer)
      .composite([
        {
          input: await sharp(circleSvg).png().toBuffer(),
          top: offset,
          left: offset,
        },
        {
          input: logoResized,
          top: logoOffset,
          left: logoOffset,
        },
      ])
      .png()
      .toFile(outputPath);

    console.log(`QR code with logo generated successfully at: ${outputPath}`);
    console.log(`Encoded URL: ${url}`);
    console.log(`Image size: ${QR_SIZE}x${QR_SIZE}, Logo circle: ${circleSize}px`);
  } catch (err) {
    console.error('Error generating QR code:', err);
  }
}

generateQR();
