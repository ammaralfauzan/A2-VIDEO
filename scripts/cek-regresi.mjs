// Cek regresi: render ulang frame kunci video yang TIDAK sedang dikerjakan, lalu pastikan tidak ada file out/stills yang berubah
// dibanding yang sudah di-commit. Dipakai setelah refaktor komponen bersama (Window, Cursor, Layout, Gigi, dll).
//
// Pakai: node scripts/cek-regresi.mjs [IdKomposisi ...]   (tanpa argumen: semua yang punya set frame kunci)
// Keluar 0 = identik, 1 = ada frame berubah (daftar ditampilkan). Frame yang berubah sengaja? commit ulang stills-nya.
import {execFileSync, spawnSync} from 'node:child_process';

const DIRS = {
  JamSembilanMalam: 'out/stills',
  A2Umum: 'out/stills/a2-umum',
  JamSembilanMalam916: 'out/stills/jam-9-malam-9x16',
  A2Umum916: 'out/stills/a2-umum-9x16',
  SatuPesanan: 'out/stills/satu-pesanan',
  TipsUmroh: 'out/stills/tips-umroh',
  AlasanSayaBikinA2: 'out/stills/alasan-saya-bikin-a2',
  TigaSalahKaprah: 'out/stills/tiga-salah-kaprah-otomatisasi',
};
const ids = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(DIRS);
const bad = [];
for (const id of ids) {
  const dir = DIRS[id];
  if (!dir) {
    console.error(`Komposisi tidak dikenal: ${id}`);
    process.exit(2);
  }
  console.log(`Render ulang ${id} ...`);
  const r = spawnSync('node', ['scripts/render-stills.mjs', id], {stdio: ['ignore', 'ignore', 'inherit']});
  if (r.status !== 0) process.exit(2);
  const out = execFileSync('git', ['status', '--porcelain', '--', dir], {encoding: 'utf8'});
  // hanya file berubah (M) yang dihitung; file baru/terhapus berarti set frame kunci diubah sengaja
  for (const l of out.split('\n').filter((x) => /^.M /.test(x))) bad.push(l.trim());
}
if (!bad.length) {
  console.log(`Identik: ${ids.join(', ')}`);
  process.exit(0);
}
console.log(`${bad.length} frame berubah:\n${bad.map((b) => `- ${b}`).join('\n')}`);
process.exit(1);
