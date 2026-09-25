import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'https://oilteqindustries.com/scan';
const outputPath = path.join(__dirname, '..', 'public', 'oilteq-qr.png');

async function generateQR() {
  try {
    await QRCode.toFile(outputPath, url, {
      width: 512,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#F4F1EA',  // Match the brand cream background
      },
      errorCorrectionLevel: 'H', // High error correction for logo overlay
    });
    console.log(`QR code generated successfully at: ${outputPath}`);
    console.log(`Encoded URL: ${url}`);
  } catch (err) {
    console.error('Error generating QR code:', err);
  }
}

generateQR();
