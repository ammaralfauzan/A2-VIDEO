// Frame kunci "Kenapa Wasiat Dibatasi Sepertiga?" dihitung dari timing suara (termasuk frame di tengah transisi).
import {S, sf, TOTAL_FRAMES, wf} from '../src/data/timeline-wasiat-maksimal-sepertiga';
import {P} from '../src/scenes/wasiat-maksimal-sepertiga/layout';

const frames: [string, number][] = [
  ['01-hook-amplop', P.barIn + 30],
  ['01b-jangan-getar', P.jangan + 5],
  ['02-ganti-kartu-sad-tengah', P.cardSad + 4],
  ['02b-kartu-sad', P.cardSad + 30],
  ['03-penanda-seluruh', P.mSeluruh + 16],
  ['03b-seluruh-dicoret', P.xSeluruh + 9],
  ['03c-setengah', P.mSetengah + 14],
  ['03d-setengah-dicoret', P.xSetengah + 9],
  ['03e-sepertiga-tanya', P.mSepertiga + 14],
  ['04-kunci-tengah', P.lock + 6],
  ['04b-kunci-sudah-banyak', P.banyak + 14],
  ['04c-ikon-wasiat-ahli-waris', P.heirIn + 24],
  ['05-alir-tengah', P.flow + 11],
  ['05b-berkecukupan', P.cukup + 20],
  ['05c-miskin', P.miskin + 24],
  ['06-sumber-bukhari-muslim', P.cardSumber1 + 30],
  ['07-buka-lagi-tengah', P.reset + 5],
  ['07b-sisa-harta', P.sisa + 14],
  ['07c-kewajiban-lepas-tengah', P.kew + 16],
  ['07d-sisa-terkunci', P.relock + 20],
  ['08-panah-ahli-waris', P.arrow + 14],
  ['08b-palang', P.block + 16],
  ['08c-sumber-abu-dawud', P.cardSumber2 + 30],
  ['09-bagian-ditetapkan', P.badge + 16],
  ['10-panggung-keluar-tengah', P.stageOut + 5],
  ['10b-kalimat-penutup', P.headline + 24],
  ['10c-logo-masuk-tengah', P.logo + 7],
  ['10d-logo-akhir', TOTAL_FRAMES - 8],
];
void S;
void sf;
void wf;
console.log(JSON.stringify(frames));
