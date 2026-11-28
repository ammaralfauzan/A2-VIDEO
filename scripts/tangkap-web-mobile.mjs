// Tangkap halaman web asli tampilan mobile (lebar 390, 3x) dengan Chrome milik Remotion, untuk layar di video.
// Pakai: node scripts/tangkap-web-mobile.mjs <folder-keluar> <nama>=<url>[@tinggi] ...
// Halaman ditangkap penuh (tinggi diambil dari dokumen bila @tinggi tidak diberikan).
import {openBrowser} from '@remotion/renderer';
import fs from 'node:fs';
import path from 'node:path';

const [out, ...jobs] = process.argv.slice(2);
if (!out || jobs.length === 0) {
  console.error('Pakai: node scripts/tangkap-web-mobile.mjs <folder> nama=url[@tinggi] ...');
  process.exit(1);
}
fs.mkdirSync(out, {recursive: true});
const browser = await openBrowser('chrome', {logLevel: 'error'});
try {
  for (const job of jobs) {
    const [name, rest] = [job.slice(0, job.indexOf('=')), job.slice(job.indexOf('=') + 1)];
    const [url, h] = rest.split('@');
    const page = await browser.newPage({context: () => null, logLevel: 'error', indent: false, pageIndex: 0, onBrowserLog: null, onLog: () => undefined});
    await page.setViewport({width: 390, height: 844, deviceScaleFactor: 3});
    await page.goto({url, timeout: 45000, options: {waitUntil: 'load'}});
    await new Promise((r) => setTimeout(r, 3000));
    const full = h ? Number(h) : await page.evaluate(() => document.documentElement.scrollHeight);
    await page.setViewport({width: 390, height: Math.min(full, 9000), deviceScaleFactor: 3});
    await new Promise((r) => setTimeout(r, 800));
    const res = await page._client().send('Page.captureScreenshot', {format: 'png'});
    const data = res.data ?? res.value?.data;
    const file = path.join(out, `${name}.png`);
    fs.writeFileSync(file, Buffer.from(data, 'base64'));
    console.log(`${file} (390x${full})`);
    await page.close();
  }
} finally {
  await browser.close({silent: true});
}
