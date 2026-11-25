// Frame kunci "Satu Akun untuk Sekeluarga" dari timing suara (termasuk tengah transisi). Dipakai render-stills.mjs.
import {P, POP, STEP_AT} from '../src/scenes/akun-keluarga-h2c/layout';
import {TOTAL_FRAMES} from '../src/data/timeline-akun-keluarga-h2c';

const s: [string, number][] = [
  ['00-hook-awal', 3],
  ['01-hook', 60],
  ['02-empat-langkah', P.pelan + 10],
  ['03a-angka-1', STEP_AT[0] + 12],
  ['03b-angka-pindah', STEP_AT[0] - POP.pre + POP.hold + 6],
  ['03c-menu-keluarga', P.clickNav + 6],
  ['03d-isi-nama-sandi', P.sandiFrom + 14],
  ['03e-kata-rahasia', P.sandiGlow + 12],
  ['03f-empat-anggota', P.full + 10],
  ['04a-angka-2', STEP_AT[1] + 12],
  ['04b-salin', P.clickSalin + 12],
  ['04c-ke-ponsel', P.phoneIn + 10],
  ['04d-terkirim', P.sent + 10],
  ['05a-masuk-pilih', P.clickIdBtn - 6],
  ['05b-ketik-id', P.pwFrom + 14],
  ['05c-kartu-maju', P.forward + 14],
  ['06a-paket', P.clickPaket + 8],
  ['06b-kartu-meluncur', P.fly + 9],
  ['06c-pesanan', P.order + 16],
  ['07a-selesai', P.done + 14],
  ['07b-sekeluarga', P.rowGlow + 20],
  ['08a-ajakan-mundur', P.cta + 24],
  ['08b-penutup-tumbuh', P.outro + 8],
  ['08c-tombol', TOTAL_FRAMES - 5],
];
console.log(JSON.stringify(s));
