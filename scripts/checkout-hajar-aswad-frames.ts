// Frame kunci "Cara Checkout Paket Hajar Aswad" dihitung dari timing suara (termasuk tengah transisi).
import {TOTAL_FRAMES} from '../src/data/timeline-checkout-hajar-aswad';
import {LABELS, P, TAPS} from '../src/scenes/checkout-hajar-aswad/layout';

for (let i = 1; i < LABELS.length; i++) if (LABELS[i][0] <= LABELS[i - 1][0]) throw new Error(`Label ${i} tidak berurutan`);
for (let i = 1; i < TAPS.length; i++) if (TAPS[i][0] <= TAPS[i - 1][0]) throw new Error(`Ketukan ${i} tidak berurutan`);

const frames: [string, number][] = [
  ['00-awal', 2],
  ['01-judul', 30],
  ['01a-paket', P.cards + 20],
  ['01b-lima-titik', P.dots[4] + 10],
  ['02-langkah1-angka', P.step1[0] + 8],
  ['02a-langkah1-tengah', P.step1[0] + 18],
  ['02b-ketik', P.type1 + 26],
  ['02c-ketuk-masuk', P.tapMasuk],
  ['02d-menu-paket', P.tapPaket + 6],
  ['03-langkah2-tengah', P.step2[0] + 6],
  ['03a-standar', P.standar + 10],
  ['03b-premium', P.premium + 10],
  ['03c-ke-detail-tengah', P.detail + 6],
  ['03d-detail', P.tingkat + 12],
  ['03e-silver', P.tierOn[0] + 8],
  ['03f-diamond', P.tierOn[3] + 10],
  ['04-langkah3', P.step3[0] + 30],
  ['04a-jamaah', P.tapPlus + 6],
  ['04b-dp', P.tapDp + 8],
  ['04c-wa', P.tapWa + 10],
  ['05-langkah4-tombol', P.tapCheckout],
  ['05a-terbayar', P.paid + 14],
  ['05b-cicil', P.cicil + 40],
  ['06-langkah5', P.step5[0] + 30],
  ['06a-dicek', P.dicek + 10],
  ['06b-kode', P.kode + 34],
  ['06c-simpan', P.simpan + 10],
  ['07-pengumuman-tengah', P.umum[0] + 6],
  ['07a-januari', P.januari + 20],
  ['07b-pilihan', P.bintang + 14],
  ['07c-berangkat', P.berangkat + 20],
  ['08-semua-tingkat', P.semua[1] - 8],
  ['09-penutup-tengah', P.outro + 7],
  ['09a-tombol', P.btn + 20],
  ['09b-akhir', TOTAL_FRAMES - 4],
];
console.log(JSON.stringify(frames));
