// Frame kunci "Alasan Saya Bikin A2" dihitung dari timing suara (termasuk frame di tengah transisi).
import {S, sf, ef, TOTAL_FRAMES} from '../src/data/timeline-alasan-saya-bikin-a2';
import {P} from '../src/scenes/alasan-saya-bikin-a2/layout';
import {OUTRO} from '../src/scenes/alasan-saya-bikin-a2/Penutup';

const mid = (a: number, b: number) => Math.round((a + b) / 2);
const frames: [string, number][] = [
  ['01-hook-tumbuh', mid(P.grow()[0], P.grow()[1])],
  ['01b-hook', ef(S.hook) + 6],
  ['02-titik1-pindah', P.pointIn(0) + 8],
  ['02b-titik1-larut', ef(S.lihat)],
  ['03-mengetik-ulang', ef(S.ketik)],
  ['04-titik2-pindah', P.pointIn(1) + 10],
  ['04b-sadar', ef(S.sadar)],
  ['05-waktu-tersentak', sf(S.waktu) + 7],
  ['05b-waktu-habis', ef(S.waktu)],
  ['06-titik3-pindah', P.pointIn(2) + 10],
  ['06b-mesin', ef(S.pikir)],
  ['07-tersambung', ef(S.manusia)],
  ['08-menyatu-tengah', mid(P.merge()[0], P.merge()[1])],
  ['08b-bukan-jualan', ef(S.bukan)],
  ['09-alasan-manusia', ef(S.alasan) - 4],
  ['10-melingkar-awal', P.ring()[0] + 8],
  ['10a-melingkar-tengah', mid(P.ring()[0], P.ring()[1])],
  ['10b-gigi-masuk', mid(P.gigiIn()[0], P.gigiIn()[1])],
  ['10c-gigi-di-lingkaran', P.gigiIn()[1] - 4],
  ['11-lompat', OUTRO.hop + 12],
  ['11b-jadi-gear', OUTRO.mergeFrom + 8],
  ['12-logo', TOTAL_FRAMES - 10],
];
console.log(JSON.stringify(frames));
