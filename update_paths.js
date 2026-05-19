import fs from 'fs';

const filePath = 'src/data/equipment.js';
let content = fs.readFileSync(filePath, 'utf8');

// Replace all occurrences of imgSrc: "Bilder/ with imgSrc: "/Bilder/
const updatedContent = content.replaceAll('imgSrc: "Bilder/', 'imgSrc: "/Bilder/');

fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('Successfully updated product image paths in equipment.js');
