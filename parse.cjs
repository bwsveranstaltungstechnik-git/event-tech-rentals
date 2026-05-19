const fs = require('fs');

const contentPath = 'C:\\Users\\beren\\.gemini\\antigravity\\brain\\8e44a3c6-8d05-4f07-b899-fc85b77f4003\\.system_generated\\steps\\49\\content.md';
const content = fs.readFileSync(contentPath, 'utf8');
const lines = content.split('\n');

console.log('--- REVIEWS EXCERPT ---');
for (let i = 1269; i < 1360; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
