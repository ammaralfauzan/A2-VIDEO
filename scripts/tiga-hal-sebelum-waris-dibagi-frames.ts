// Frame kunci "Tiga Hal Sebelum Waris Dibagi" dihitung dari timing suara (termasuk frame di tengah transisi).
import {ef, S, sf, TOTAL_FRAMES, wf} from '../src/data/timeline-tiga-hal-sebelum-waris-dibagi';
import {P} from '../src/scenes/tiga-hal-sebelum-waris-dibagi/layout';

const frames: [string, number][] = [
  ['01-blok-masuk', P.blockIn + 10],
  ['01b-hook-belum', wf(S.harta, 2) + 10],
  ['01c-harta-ke-blok-tengah', P.morph + 4],
  ['02-beres-dulu', sf(S.beres) + 40],
  ['02b-blok-morf-tengah', P.morph + 9],
  ['02c-tiga-gerbang', P.heirIn + 20],
  ['03-g1-turun', P.drop[0] + 8],
  ['03b-g1-potongan-tengah', P.peel[0] + 8],
  ['03c-g1-menyala', P.peel[0] + 30],
  ['04-g2-turun-tengah', P.drop[1] + 8],
  ['04b-g2-menyala', P.peel[1] + 30],
  ['04c-cap-lunas', P.lunas + 12],
  ['04d-hak-orang-lain', P.hak + 20],
  ['05-g3-turun-tengah', P.drop[2] + 8],
  ['05b-g3-menyala', P.peel[2] + 30],
  ['05b2-wasiat-sah', P.sah + 14],
  ['05c-kartu-ayat', P.ayatCard + 24],
  ['05d-ganti-ke-ayat-tengah', P.ayat + 4],
  ['06-blok-mendarat', P.land + 10],
  ['06b-kotak-terisi', P.fill + 24],
  ['07-panggung-keluar-tengah', P.stageOut + 5],
  ['07b-daftar-1', P.list[0] + 14],
  ['07c-daftar-3', P.list[2] + 14],
  ['07d-daftar-4', P.list[3] + 16],
  ['08-daftar-keluar-tengah', P.listOut + 5],
  ['08b-bukan-soal-cepat', P.headline - 6],
  ['08c-kalimat-penutup', P.headline + 20],
  ['08d-logo-masuk-tengah', P.logo + 7],
  ['08e-logo-akhir', TOTAL_FRAMES - 8],
];
void ef;
console.log(JSON.stringify(frames));
