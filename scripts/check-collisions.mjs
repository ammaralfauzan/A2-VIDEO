// Pemeriksa tabrakan layout: merender frame terpilih dan mengukur kotak teks sungguhan di Chromium
// (lewat probe di src/dev/CollisionProbe.tsx). Melaporkan: teks menimpa teks, teks di luar area aman 9:16,
// dan teks yang menutup area terlindungi (mis. wajah pembicara).
//
// Pakai: node scripts/check-collisions.mjs <IdKomposisi> [--every=15] [--frames=10,50,120] [--from=0] [--to=N]
//          [--safe=off|x,y,w,h] [--protect=nama:x,y,w,h ...] [--max=40]
// Area aman 1080x1920 (x 60-900, y 220-1500) aktif otomatis untuk komposisi 9:16; matikan dengan --safe=off.
// Keluar dengan kode 1 bila ada temuan (dipakai hook penjaga render).
import {bundle} from '@remotion/bundler';
import {openBrowser, renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs';

const args = process.argv.slice(2);
const id = args.find((a) => !a.startsWith('--'));
if (!id) {
  console.error('Pakai: node scripts/check-collisions.mjs <IdKomposisi> [--every=15] [--frames=..] [--safe=off] [--protect=nama:x,y,w,h]');
  process.exit(2);
}
const opt = (k) => args.filter((a) => a.startsWith(`--${k}=`)).map((a) => a.slice(k.length + 3));
const one = (k, d) => opt(k)[0] ?? d;

const SAFE_916 = {x: 60, y: 220, w: 840, h: 1280};
// Area terlindungi bawaan per komposisi (mis. wajah pembicara) dari scripts/collision-config.json.
const cfgPath = path.resolve('scripts/collision-config.json');
const cfg = fs.existsSync(cfgPath) ? JSON.parse(fs.readFileSync(cfgPath, 'utf8')) : {};
const protect = [...(cfg[id]?.protect ?? []), ...opt('protect')].map((v) => {
  const [name, rest] = v.split(':');
  const [x, y, w, h] = rest.split(',').map(Number);
  return {name, x, y, w, h};
});

const browserExecutable = process.env.REMOTION_BROWSER || undefined;
const serveUrl = await bundle({entryPoint: path.resolve(process.env.REMOTION_ENTRY || 'src/index.ts'), webpackOverride: (c) => c});
const browser = await openBrowser('chrome', {browserExecutable, chromiumOptions: {gl: 'angle'}});

const base = {collisionProbe: true};
const comp0 = await selectComposition({serveUrl, id, puppeteerInstance: browser, inputProps: base});
const is916 = comp0.width === 1080 && comp0.height === 1920;
const safeOpt = one('safe', 'auto');
const customSafe = /^\d/.test(safeOpt) ? (([x, y, w, h]) => ({x, y, w, h}))(safeOpt.split(',').map(Number)) : null;
const safe = customSafe ?? (safeOpt === 'off' ? null : is916 ? SAFE_916 : null);
const inputProps = {...base, probeConfig: {safe, protect}};

let frames;
if (opt('frames').length) frames = one('frames').split(',').map(Number);
else {
  const every = Number(one('every', '15'));
  const from = Number(one('from', '0'));
  const to = Math.min(Number(one('to', String(comp0.durationInFrames - 1))), comp0.durationInFrames - 1);
  frames = [];
  for (let f = from; f <= to; f += every) frames.push(f);
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cc-'));
const found = new Map(); // "kind|detail" -> frame pertama, terakhir, jumlah
let checked = 0;
for (const frame of frames) {
  let report = null;
  await renderStill({
    composition: comp0,
    serveUrl,
    frame,
    inputProps,
    output: path.join(tmp, 'f.png'),
    puppeteerInstance: browser,
    onBrowserLog: (log) => {
      if (log.text.startsWith('CC_REPORT ')) report = JSON.parse(log.text.slice(10));
    },
  });
  if (!report) {
    console.error(`frame ${frame}: probe tidak melapor (komposisi belum dibungkus withProbe?)`);
    process.exit(2);
  }
  checked++;
  for (const it of report.issues) {
    const key = `${it.kind}|${it.detail}`;
    const e = found.get(key) ?? {first: frame, last: frame, n: 0, kind: it.kind, detail: it.detail};
    e.last = frame;
    e.n++;
    found.set(key, e);
  }
}
await browser.close({silent: true});
fs.rmSync(tmp, {recursive: true, force: true});

const list = [...found.values()].sort((a, b) => a.first - b.first);
const max = Number(one('max', '40'));
console.log(`${id}: ${checked} frame diperiksa${safe ? ' (area aman 9:16 aktif)' : ''}${protect.length ? `, ${protect.length} area terlindungi` : ''}`);
if (!list.length) {
  console.log('Tidak ada tabrakan.');
  process.exit(0);
}
console.log(`${list.length} temuan:`);
for (const e of list.slice(0, max)) console.log(`- [${e.kind}] frame ${e.first}${e.last !== e.first ? `-${e.last}` : ''} (${e.n}x): ${e.detail}`);
if (list.length > max) console.log(`... dan ${list.length - max} lainnya (naikkan --max)`);
process.exit(1);
