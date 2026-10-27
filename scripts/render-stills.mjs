// Render frame kunci tiap adegan (bundle sekali, render banyak).
// Pakai: node scripts/render-stills.mjs [JamSembilanMalam|A2Umum|JamSembilanMalam916|A2Umum916] [prefix-nama...]
// SAFE_GUIDE=1 menandai area aman 9:16 (untuk review); STILLS_DIR mengganti folder keluaran.
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';

const SETS = {
  JamSembilanMalam: {
    dir: 'out/stills',
    stills: [
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
    ],
  },
  A2Umum: {
    dir: 'out/stills/a2-umum',
    stills: [
      ['01-hook', 20],
      ['01b-hook-badge', 90],
      ['02-masalah-chat', 150],
      ['02b-masalah-seret-invoice', 192],
      ['02c-masalah-spreadsheet', 262],
      ['03-titik-balik', 336],
      ['03b-gear-centang', 372],
      ['04-inbox', 440],
      ['05-tagihan', 525],
      ['06-laporan', 600],
      ['07-industri', 704],
      ['08-empati', 820],
      ['09-ajakan', 1000],
    ],
  },
};
SETS.JamSembilanMalam916 = {
  dir: 'out/stills/jam-9-malam-9x16',
  stills: [...SETS.JamSembilanMalam.stills, ['10-ajakan-pill', 960]],
};
SETS.A2Umum916 = {
  dir: 'out/stills/a2-umum-9x16',
  stills: [...SETS.A2Umum.stills, ['10-ajakan-pill', 960]],
};

const [id = 'JamSembilanMalam', ...only] = process.argv.slice(2);
const set = SETS[id];
if (!set) throw new Error(`Komposisi tidak dikenal: ${id}`);
const dir = process.env.STILLS_DIR || set.dir;
const inputProps = process.env.SAFE_GUIDE ? {safeGuide: true} : {};
// Pakai Chromium lokal jika REMOTION_BROWSER diisi (mis. lingkungan tanpa akses unduh).
const browserExecutable = process.env.REMOTION_BROWSER || null;

const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const composition = await selectComposition({serveUrl, id, browserExecutable, inputProps});
for (const [name, frame] of set.stills) {
  if (only.length && !only.some((o) => name.startsWith(o))) continue;
  const output = `${dir}/${name}-f${String(frame).padStart(3, '0')}.png`;
  await renderStill({serveUrl, composition, frame, output, overwrite: true, browserExecutable, inputProps});
  console.log('rendered', output);
}
