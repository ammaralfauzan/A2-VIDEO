// Frame kunci "Alasan Saya Bikin A2" dihitung dari timing suara (termasuk frame di tengah transisi).
import {S, sf, ef, wf, TOTAL_FRAMES} from '../src/data/timeline-alasan-saya-bikin-a2';
import {P} from '../src/scenes/alasan-saya-bikin-a2/layout';
import {OUTRO} from '../src/scenes/alasan-saya-bikin-a2/Penutup';

const mid = (a: number, b: number) => Math.round((a + b) / 2);
const frames: [string, number][] = [
  ['01-hook-tumbuh', mid(P.grow()[0], P.grow()[1])],
  ['01b-hook', ef(S.hook) + 6],
  ['02-titik1-pindah', P.pointIn(0) + 8],
  ['02b-titik1-larut', ef(S.lihat)],
  ['02g-menggeleng-1', sf(S.ketik) + 8],
  ['02h-menggeleng-2', sf(S.ketik) + 14],
  ['02c-ilustrasi-pulang-larut', sf(S.lihat) + 60],
  ['02d-transisi-ke-meja', sf(S.ketik) - 4],
  ['02e-ramai-pesanan', wf(S.ketik, 2) + 6],
  ['02f-mengetik-ulang', wf(S.ketik, 4) + 30],
  ['03-mengetik-ulang', ef(S.ketik)],
  ['04-titik2-pindah', P.pointIn(1) + 10],
  ['04b-sadar', ef(S.sadar)],
  ['05-waktu-tersentak', sf(S.waktu) + 7],
  ['05a-sedih-keluarga', sf(S.waktu) + 40],
  ['05b-waktu-habis', ef(S.waktu)],
  ['06-titik3-pindah', P.pointIn(2) + 10],
  ['06b-mesin', ef(S.pikir)],
  ['06c-transisi-ke-mesin', sf(S.pikir) + 2],
  ['07-tersambung', ef(S.manusia)],
  ['07b-jabat-tangan', wf(S.manusia, 5) + 8],
  ['08-menyatu-tengah', mid(P.merge()[0], P.merge()[1])],
  ['08a-pulang-duduk', sf(S.bukan) + 60],
  ['08b-bukan-jualan', ef(S.bukan)],
  ['09-jeda-dramatis', Math.round(36.7 * 30)],
  ['09a-kebersamaan-keluarga', ef(S.alasan) - 4],
  ['09b-panggung-keluar', ef(S.alasan) + 14],
  ['10-garis-pudar', mid(P.lineOut()[0], P.lineOut()[1])],
  ['10b-gigi-siap', OUTRO.start - 4],
  ['11-lompat', OUTRO.hop + 12],
  ['11b-jadi-gear', OUTRO.mergeFrom + 8],
  ['12-logo', TOTAL_FRAMES - 10],
];
console.log(JSON.stringify(frames));
