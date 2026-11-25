// Frame kunci "Siapa yang Menentukan Bagian Waris?" dihitung dari timing suara (termasuk frame di tengah transisi).
import {TOTAL_FRAMES} from '../src/data/timeline-dulu-tak-dapat-bagian';
import {P, WIPE_LEN} from '../src/scenes/dulu-tak-dapat-bagian/layout';

const frames: [string, number][] = [
  ['01-hook-map-harta', P.tanda + 20],
  ['02-ganti-kartu-tengah', P.cardIn + 5],
  ['02b-jabir-sakit', P.sakit + 20],
  ['03-rasulullah', P.jenguk + 20],
  ['03b-abu-bakar', P.abuBakar + 20],
  ['04-kendi-percik', P.percik + 12],
  ['04b-jabir-sadar', P.sadar + 16],
  ['05-surat-tulis-tengah', P.tulis + 10],
  ['05b-surat-tanya', P.tulis + 40],
  ['06-geser-daun-tengah', P.wipe + Math.round(WIPE_LEN / 2)],
  ['06b-ayat-11', P.ayat11 + 24],
  ['07-ganti-ayat-7-tengah', P.ayat7 + 4],
  ['07b-map-laki-laki', P.laki + 26],
  ['07c-map-perempuan', P.perempuan + 30],
  ['07d-ditetapkan', P.tetap + 24],
  ['08-panggung-keluar-tengah', P.stageOut + 5],
  ['08b-kebiasaan-dicoret', P.coret + 16],
  ['09-ketetapan-allah', P.ketetapan + 20],
  ['09b-logo-masuk-tengah', P.logo + 7],
  ['09c-logo-akhir', TOTAL_FRAMES - 8],
];
console.log(JSON.stringify(frames));
