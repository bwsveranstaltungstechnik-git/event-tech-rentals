import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { equipmentData } from './src/data/equipment.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to download a file from a URL to a local destination
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    // URL-encode spaces in the URL path
    const encodedUrl = url.replace(/ /g, '%20');
    
    const file = fs.createWriteStream(dest);
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };

    https.get(encodedUrl, options, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {}); // Delete temp file
        reject(new Error(`Failed to download ${encodedUrl}: Status Code ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function start() {
  console.log('Starting BWS image download from live server...');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const item of equipmentData) {
    if (!item.imgSrc) continue;
    
    const localPath = path.join(__dirname, item.imgSrc);
    const dir = path.dirname(localPath);
    
    // Ensure directory exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const liveUrl = `https://www.bwsveranstaltungstechnik.de/${item.imgSrc}`;
    console.log(`Downloading: ${item.name} -> ${item.imgSrc}...`);
    
    try {
      await downloadFile(liveUrl, localPath);
      const stats = fs.statSync(localPath);
      console.log(`  [SUCCESS] Saved ${item.name} (${(stats.size / 1024).toFixed(1)} KB)`);
      successCount++;
    } catch (err) {
      console.log(`  [FAILED] Could not download ${item.name}: ${err.message}`);
      failCount++;
    }
  }
  
  console.log(`\nFinished download job.`);
  console.log(`Success: ${successCount} files`);
  console.log(`Failed/Skipped: ${failCount} files`);
}

start();
