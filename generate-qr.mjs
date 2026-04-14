#!/usr/bin/env node
import QRCode from "qrcode";
import { writeFileSync } from "fs";

const url = process.argv[2];
const output = process.argv[3] || "qr-code.svg";

if (!url) {
  console.error("Usage: node generate-qr.mjs <url> [output.svg]");
  process.exit(1);
}

const svg = await QRCode.toString(url, {
  type: "svg",
  color: { light: "#00000000", dark: "#000000" },
  margin: 0,
});

writeFileSync(output, svg);
console.log(`QR code saved to ${output}`);
