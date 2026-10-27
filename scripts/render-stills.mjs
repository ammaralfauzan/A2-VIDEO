// Render frame kunci tiap adegan ke out/stills/ (bundle sekali, render banyak).
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';

const STILLS = [
  ['01-hook', 20],
  ['01b-hook-badge', 74],
  ['02-masalah', 130],
  ['02b-masalah-ketik', 215],
  ['03-titik-balik', 366],
  ['04-rapor', 430],
  ['05-kirim', 520],
  ['06-spp', 625],
  ['07-laporan', 712],
  ['08-empati', 810],
  ['09-ajakan', 1000],
];
const only = process.argv.slice(2);
// Pakai Chromium lokal jika REMOTION_BROWSER diisi (mis. lingkungan tanpa akses unduh).
const browserExecutable = process.env.REMOTION_BROWSER || null;

const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const composition = await selectComposition({serveUrl, id: 'JamSembilanMalam', browserExecutable});
for (const [name, frame] of STILLS) {
  if (only.length && !only.some((o) => name.startsWith(o))) continue;
  const output = `out/stills/${name}-f${String(frame).padStart(3, '0')}.png`;
  await renderStill({serveUrl, composition, frame, output, overwrite: true, browserExecutable});
  console.log('rendered', output);
}
