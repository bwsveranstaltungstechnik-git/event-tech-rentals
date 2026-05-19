const fs = require('fs');

const contentPath = 'C:\\Users\\beren\\.gemini\\antigravity\\brain\\8e44a3c6-8d05-4f07-b899-fc85b77f4003\\.system_generated\\steps\\49\\content.md';
const content = fs.readFileSync(contentPath, 'utf8');
const lines = content.split('\n');

console.log('--- EQUIPMENT SECTIONS ---');
lines.forEach((line, index) => {
  if (line.includes('Bilder/Miet-Sortiment/') || line.includes('Miet-Sortiment') || line.includes('Mietpool')) {
    // Print the line and 3 lines around it
    console.log(`Line ${index + 1}: ${line.trim()}`);
    for (let i = Math.max(0, index - 5); i <= Math.min(lines.length - 1, index + 5); i++) {
      console.log(`  [${i + 1}] ${lines[i]}`);
    }
    console.log('------------------------');
  }
});
