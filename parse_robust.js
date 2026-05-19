import fs from 'fs';

const filePath = 'C:/Users/beren/.gemini/antigravity/brain/8e44a3c6-8d05-4f07-b899-fc85b77f4003/.system_generated/steps/593/content.md';
const content = fs.readFileSync(filePath, 'utf8');

// Find snippets containing Team members
const lines = content.split('\n');
console.log('--- TEAM REFERENCES ---');
lines.forEach((line, idx) => {
  if (line.includes('Marius') || line.includes('Elian') || line.includes('Moritz') || line.includes('Paul') || line.includes('Karneval') || line.includes('Crimson')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
