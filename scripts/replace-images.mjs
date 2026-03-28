import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, '../src'), function(filePath) {
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    if (content.includes("'/images/")) {
      content = content.replace(/'\/images\//g, "'/hotel-shasha-website/images/");
      hasChanges = true;
    }
    if (content.includes('"/images/')) {
      content = content.replace(/"\/images\//g, '"/hotel-shasha-website/images/');
      hasChanges = true;
    }
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
});
console.log("Replaced image paths.");
