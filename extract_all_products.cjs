const fs = require('fs');

const contentPath = 'C:\\Users\\beren\\.gemini\\antigravity\\brain\\8e44a3c6-8d05-4f07-b899-fc85b77f4003\\.system_generated\\steps\\49\\content.md';
const content = fs.readFileSync(contentPath, 'utf8');

// We want to find divs that contain data-produkt-id
// Example: <div class="glas-karte..." data-produkt-id="xyz" data-kategorie="abc" data-verfuegbar="12">
// Inside it:
// <img src="Bilder/..." ...>
// <h4 ...>Title</h4>
// <p class="text-gray-400 text-sm">Description... <span data-preis="50">...</span></p>

const productRegex = /<div[^>]*class="[^"]*glas-karte[^"]*"[^>]*data-produkt-id="([^"]+)"[^>]*data-kategorie="([^"]+)"[^>]*data-verfuegbar="([^"]+)"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;

const products = [];
let match;
while ((match = productRegex.exec(content)) !== null) {
  const [_, id, category, available, innerHtml] = match;
  
  // Extract img src
  const imgMatch = /src=["'](Bilder\/[^"']+)["']/i.exec(innerHtml);
  const imgSrc = imgMatch ? imgMatch[1] : '';

  // Extract Title
  const titleMatch = /<h4[^>]*>([^<]+)<\/h4>/i.exec(innerHtml);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // Extract Price
  const priceMatch = /data-preis="([^"]+)"/i.exec(innerHtml);
  const price = priceMatch ? parseFloat(priceMatch[1]) : 0;

  // Extract Description (clean up span tags or get complete text)
  let desc = '';
  const descMatch = /<p[^>]*class="[^"]*text-gray-400[^"]*"[^>]*>([\s\S]*?)<\/p>/i.exec(innerHtml);
  if (descMatch) {
    desc = descMatch[1].replace(/<span[\s\S]*?<\/span>/gi, '').replace(/<br\s*\/?>/gi, ' ').trim();
  }

  products.push({
    id,
    name: title,
    category,
    imgSrc,
    description: desc,
    pricePerDay: price,
    inStock: parseInt(available, 10)
  });
}

console.log(JSON.stringify(products, null, 2));
console.log(`\nFound ${products.length} products total.`);
