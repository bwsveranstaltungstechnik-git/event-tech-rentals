import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageUrls = [
  'Bilder/Events/Karneval/Karneval Klausen.jpg',
  'Bilder/Events/Crimson/Crimson Fest Hauptbild.jpg',
  'Bilder/Events/Abiball/Abiball Hauptbild.jpg',
  'Bilder/Team/Ausgeschnitten/Marius_ausgeschnitten.png',
  'Bilder/Team/Ausgeschnitten/Elian_ausgeschnitten.png',
  'Bilder/Team/Ausgeschnitten/Moritz_ausgeschnitten.png',
  'Bilder/Team/Ausgeschnitten/Paul_ausgeschnitten.png'
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const encodedUrl = url.replace(/ /g, '%20');
    const file = fs.createWriteStream(dest);
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };

    https.get(encodedUrl, options, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
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
  console.log('Downloading events and team images from BWS live website...');
  for (const imgPath of imageUrls) {
    const localPath = path.join(__dirname, 'public', imgPath);
    const dir = path.dirname(localPath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const liveUrl = `https://www.bwsveranstaltungstechnik.de/${imgPath}`;
    console.log(`Downloading ${liveUrl} -> ${localPath}...`);
    
    try {
      await downloadFile(liveUrl, localPath);
      console.log(`  [SUCCESS] Saved ${imgPath}`);
    } catch (err) {
      console.log(`  [FAILED] ${imgPath}: ${err.message}`);
    }
  }
}

start();
