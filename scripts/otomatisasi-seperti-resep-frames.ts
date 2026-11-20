// Frame kunci "Otomatisasi Itu Seperti Resep" dihitung dari timing suara (termasuk frame di tengah transisi).
import {ef, S, sf, TOTAL_FRAMES, wf} from '../src/data/timeline-otomatisasi-seperti-resep';
import {BROLL, P} from '../src/scenes/otomatisasi-seperti-resep/layout';
import {OUTRO} from '../src/scenes/otomatisasi-seperti-resep/Penutup';

const frames: [string, number][] = [
  ['01-hook-b1', 40],
  ['01b-hook-akhir', ef(S.hook) - 2],
  ['02-panci-digambar', P.potDraw + 18],
  ['02b-kartu-resep', P.cardIn + 14],
  ['03-pemicu-gelembung', P.bolt + 12],
  ['03b-air-mendidih-b1', BROLL.b1b.from + 3],
  ['03c-air-mendidih-b1-tengah', BROLL.b1b.from + 20],
  ['03d-gelembung-jadi-simpul', P.flyPemicu + 9],
  ['03e-simpul-pemicu', P.labelPemicu + 14],
  ['04-bahan-ikon', P.ingr[2] + 18],
  ['04b-bahan-b3-masuk', BROLL.b3.from + 3],
  ['04c-bahan-b3', BROLL.b3.from + 30],
  ['04d-bahan-jadi-simpul', P.flyBahan + 9],
  ['04e-kartu-data-contoh', P.dataCards + 30],
  ['05-langkah-tiga-ikon', P.steps[2] + 18],
  ['05b-langkah-b2a', BROLL.b2a.from + 20],
  ['05c-langkah-b2-sambungan', BROLL.b2a.to],
  ['05d-langkah-b2b', BROLL.b2b.from + 25],
  ['05e-langkah-jadi-simpul', P.flyLangkah + 10],
  ['05f-tiga-simpul-panah', P.arrows[1] + 16],
  ['06-alur-turun-tengah', P.rowDown + 8],
  ['06b-alur-pemicu-nyala', P.pulse[0] + 6],
  ['06c-alur-langkah-nyala', P.pulse[2] + 8],
  ['06d-alur-titik-berjalan', P.dots + 26],
  ['06e-dapur-memudar', P.ghostOut + 8],
  ['07-alur-memudar', P.rowOut + 4],
  ['07b-kartu-tanya', P.ask + 30],
  ['08-logo-gear', OUTRO.gear + 10],
  ['08b-logo-wordmark', OUTRO.word + 14],
  ['08c-ajakan-label', OUTRO.pill + 12],
  ['08d-logo-ajakan', TOTAL_FRAMES - 10],
];
void sf;
void wf;
console.log(JSON.stringify(frames.sort((a, b) => a[1] - b[1])));
