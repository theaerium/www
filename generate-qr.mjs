#!/usr/bin/env node
import QRCode from "qrcode";
import { writeFileSync } from "fs";

const url = process.argv[2];
const output = process.argv[3] || "qr-code.svg";

if (!url) {
  console.error("Usage: node generate-qr.mjs <url> [output.svg]");
  process.exit(1);
}

const qr = QRCode.create(url, { errorCorrectionLevel: "M" });
const size = qr.modules.size;
const data = qr.modules.data;
const scale = 10;
const svgSize = size * scale;

let rects = "";
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    if (data[y * size + x]) {
      rects += `<rect x="${x * scale}" y="${y * scale}" width="${scale}" height="${scale}"/>`;
    }
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgSize} ${svgSize}" width="${svgSize}" height="${svgSize}">
<g fill="#000">${rects}</g>
</svg>`;

writeFileSync(output, svg);
console.log(`QR code saved to ${output}`);
