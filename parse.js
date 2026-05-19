import fs from 'fs';
import path from 'path';

const filePath = 'C:/Users/beren/.gemini/antigravity/brain/8e44a3c6-8d05-4f07-b899-fc85b77f4003/.system_generated/steps/593/content.md';
const content = fs.readFileSync(filePath, 'utf8');

// Find all src="..." or href="..." or style="background-image: url(...)" references
const srcRegex = /src=["']([^"']+)["']/g;
const hrefRegex = /href=["']([^"']+)["']/g;
const bgRegex = /url\(["']?([^"')]+)["']?\)/g;

const images = new Set();
let match;

while ((match = srcRegex.exec(content)) !== null) {
  if (match[1].match(/\.(jpg|jpeg|png|gif|svg|webp)/i)) {
    images.add(match[1]);
  }
}

while ((match = bgRegex.exec(content)) !== null) {
  if (match[1].match(/\.(jpg|jpeg|png|gif|svg|webp)/i)) {
    images.add(match[1]);
  }
}

console.log('--- FOUND IMAGES ---');
images.forEach(img => console.log(img));
