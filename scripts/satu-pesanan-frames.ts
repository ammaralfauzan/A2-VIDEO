// Frame kunci "Satu Pesanan" dihitung dari timing kalimat, agar ikut bergeser saat VO diganti.
import {S, sf, ef, wf, TOTAL_FRAMES} from '../src/data/timeline-satu-pesanan';

const mid = (i: number) => Math.round((sf(i) + ef(i)) / 2);
const frames: [string, number][] = [
  ['01-pesanan', ef(S.pesanan)],
  ['02-tujuh-langkah', ef(S.tujuh)],
  ['03-langkah-3', ef(S.step1 + 2)],
  ['04-langkah-7', ef(S.step1 + 6) + 6],
  ['05-hitung-350', wf(S.hitung, 11) + 10],
  ['06-setiap-hari', ef(S.setiapHari) + 6],
  ['07-rajin', mid(S.rajin)],
  ['08-terlalu-banyak', ef(S.banyak)],
  ['09-menyambungkan', ef(S.sambung)],
  ['10-kartu-otomatis', ef(S.otomatis)],
  ['11-manusia', ef(S.pelanggan)],
  ['12-tanya', ef(S.tanya)],
  ['13-logo', mid(S.logo) + 20],
  ['14-ajakan', TOTAL_FRAMES - 10],
];
console.log(JSON.stringify(frames));
