// Frame kunci "Hubungan Darah Belum Tentu Cukup" dihitung dari timing suara (termasuk frame di tengah transisi).
import {TOTAL_FRAMES} from '../src/data/timeline-penghalang-waris';
import {P} from '../src/scenes/penghalang-waris/layout';

const frames: [string, number][] = [
  ['01-hook-pewaris-masuk', P.diagIn + 8],
  ['01b-hook-diagram', P.boxesIn + 40],
  ['02-ganti-judul-tengah', P.tSebab + 6],
  ['02b-kunci-masuk', P.keyIn + 8],
  ['02c-jalur-menyala-tengah', P.glow + 12],
  ['02d-jalur-menyala', P.glow + 34],
  ['03-penghalang-samar', P.ghosts + 18],
  ['04-dua-penghalang', P.tDua + 22],
  ['05-gembok1-terbang-tengah', P.lock1 + 8],
  ['05b-gembok1-di-garis', P.lock1 + 24],
  ['06-usamah', P.tUsamah + 30],
  ['07-sabda-nabi', P.tSabda + 30],
  ['07b-gembok1-terkunci', P.close1 + 14],
  ['07c-kutipan-penuh', P.close1 + 90],
  ['08-ganti-kitab-tengah', P.books + 4],
  ['08b-sumber-kitab', P.books + 34],
  ['08c-jumhur', P.jumhur + 16],
  ['09-diagram-kembali-tengah', P.back + 4],
  ['09b-membunuh-pewaris', P.tKedua + 24],
  ['09c-gembok2-terbang-tengah', P.lock2 + 8],
  ['10-kesepakatan', P.tSepakat + 20],
  ['10b-gembok2-terkunci', P.close2 + 14],
  ['11-rincian-mazhab', P.rincian + 30],
  ['12-pastikan', P.tJadi + 24],
  ['12b-centang-berhak', P.berhak + 16],
  ['12c-terhalang', P.terhalang + 10],
  ['13-panggung-keluar-tengah', P.stageOut + 5],
  ['13b-bila-ragu', P.headline + 26],
  ['13c-logo-masuk-tengah', P.logo + 7],
  ['13d-logo-akhir', TOTAL_FRAMES - 8],
];
console.log(JSON.stringify(frames));
