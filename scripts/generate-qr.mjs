import QRCode from 'qrcode';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'https://oilteqindustries.com/scan';
const outputPath = path.join(__dirname, '..', 'public', 'oilteq-qr.png');

const QR_SIZE = 512;
const CIRCLE_RATIO = 0.24; // Cream circle clearing in center (~24% of QR)

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

    // 2. Create a cream circle clearing (no logo — the CSS overlay handles it)
    const circleSize = Math.round(QR_SIZE * CIRCLE_RATIO);
    const offset = Math.round((QR_SIZE - circleSize) / 2);

    const circleSvg = Buffer.from(`
      <svg width="${circleSize}" height="${circleSize}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${circleSize/2}" cy="${circleSize/2}" r="${circleSize/2}" fill="#F4F1EA" />
      </svg>
    `);

    // 3. Composite: QR code + cream circle clearing
    await sharp(qrBuffer)
      .composite([
        {
          input: await sharp(circleSvg).png().toBuffer(),
          top: offset,
          left: offset,
        },
      ])
      .png()
      .toFile(outputPath);

    console.log(`QR code generated at: ${outputPath}`);
    console.log(`Encoded URL: ${url}`);
    console.log(`Size: ${QR_SIZE}x${QR_SIZE}, Center clearing: ${circleSize}px`);
  } catch (err) {
    console.error('Error generating QR code:', err);
  }
}

generateQR();
