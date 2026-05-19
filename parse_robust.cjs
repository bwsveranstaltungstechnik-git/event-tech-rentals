const fs = require('fs');

const contentPath = 'C:\\Users\\beren\\.gemini\\antigravity\\brain\\8e44a3c6-8d05-4f07-b899-fc85b77f4003\\.system_generated\\steps\\49\\content.md';
const content = fs.readFileSync(contentPath, 'utf8');

// Let's find all instances of data-produkt-id in the file.
// For each match, we find its start index, and we can look at the block of text (say 2000 characters) after it to extract details.
const regex = /data-produkt-id="([^"]+)"/g;
const products = [];
let match;

while ((match = regex.exec(content)) !== null) {
  const id = match[1];
  const startIndex = match.index;
  // Let's grab the next 1500 characters
  const chunk = content.substring(startIndex, startIndex + 1500);

  // Extract category
  const catMatch = /data-kategorie="([^"]+)"/i.exec(chunk);
  const category = catMatch ? catMatch[1] : '';

  // Extract available
  const avMatch = /data-verfuegbar="([^"]+)"/i.exec(chunk);
  const available = avMatch ? parseInt(avMatch[1], 10) : 0;

  // Extract image
  const imgMatch = /src=["'](Bilder\/[^"']+)["']/i.exec(chunk);
  const imgSrc = imgMatch ? imgMatch[1] : '';

  // Extract title (the next <h4> after the start)
  const titleMatch = /<h4[^>]*>([^<]+)<\/h4>/i.exec(chunk);
  const name = titleMatch ? titleMatch[1].trim() : '';

  // Extract price
  const priceMatch = /data-preis="([^"]+)"/i.exec(chunk);
  const price = priceMatch ? parseFloat(priceMatch[1]) : 0;

  // Extract description (the text in <p> after title but excluding the price span)
  let description = '';
  const descMatch = /<p[^>]*class="[^"]*text-gray-400[^"]*"[^>]*>([\s\S]*?)<\/p>/i.exec(chunk);
  if (descMatch) {
    description = descMatch[1]
      .replace(/<span[\s\S]*?<\/span>/gi, '') // Remove price span
      .replace(/<br\s*\/?>/gi, ' ')            // Replace br with space
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  products.push({
    id,
    name,
    category,
    imgSrc,
    description,
    pricePerDay: price,
    inStock: available
  });
}

console.log(JSON.stringify(products, null, 2));
console.log(`\nFound ${products.length} products total.`);
