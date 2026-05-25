const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'assets', 'img');
const destDir = path.join(__dirname, '..', 'public', 'assets', 'img');

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function copyRecursive(src, dest) {
  const entries = await fs.promises.readdir(src, { withFileTypes: true });
  await ensureDir(dest);
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyRecursive(srcPath, destPath);
    } else {
      await fs.promises.copyFile(srcPath, destPath);
      console.log(`Copied ${srcPath} -> ${destPath}`);
    }
  }
}

(async () => {
  try {
    const removeFlag = process.argv.includes('--remove');
    if (!fs.existsSync(srcDir)) {
      console.error('Source assets folder not found:', srcDir);
      process.exit(1);
    }

    await copyRecursive(srcDir, destDir);

    if (removeFlag) {
      // remove srcDir recursively
      await fs.promises.rm(path.join(__dirname, '..', 'assets'), { recursive: true, force: true });
      console.log('Removed original assets folder');
    }

    console.log('Assets sync completed.');
  } catch (err) {
    console.error('Error syncing assets:', err);
    process.exit(1);
  }
})();
