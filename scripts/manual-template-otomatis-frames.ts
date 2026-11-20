// Frame kunci "Manual, Template, atau Otomatis?" dihitung dari timing suara (termasuk frame di tengah transisi).
import {ef, S, sf, TOTAL_FRAMES, wf} from '../src/data/timeline-manual-template-otomatis';
import {P} from '../src/scenes/manual-template-otomatis/layout';
import {OUTRO} from '../src/scenes/manual-template-otomatis/Penutup';

const frames: [string, number][] = [
  ['01-hook-tangga-naik', P.stepIn[1] + 8],
  ['01b-hook-berapa', wf(S.hook, 7) + 10],
  ['02-tiga-label-1', P.label(0) + 12],
  ['02b-tiga-label-3', P.label(2) + 14],
  ['03-t1-kartu-1', P.t1Card(0) + 40],
  ['03b-t1-kartu-3', P.t1Card(2) + 50],
  ['03c-t1-semua', P.t1Out() - 4],
  ['04-t1-ke-t2-tengah', P.t1Out() + 6],
  ['04b-t2-kartu-1', P.t2Card(0) + 12],
  ['04c-t2-kartu-3', P.t2Card(2) + 20],
  ['05-t2-singkat', P.t2Short() + 16],
  ['05b-t2-konsisten', P.t2Check() + 16],
  ['05c-t2-kirim', P.t2Press() + 6],
  ['06-t2-ke-t3-tengah', P.t2Out() + 6],
  ['06b-t3-node-1', P.node(0) + 14],
  ['06c-t3-rantai', P.node(2) + 16],
  ['07-t3-flow-pemicu', P.flowIn() + 16],
  ['07b-t3-flow-aturan-tengah', P.flowMove(1) + 7],
  ['07c-t3-tercatat', P.chip(0) + 14],
  ['07d-t3-terkirim', P.chip(1) + 14],
  ['08-t3-flow-keluar-tengah', P.flowOut() + 4],
  ['08b-t3-laporan', P.report() + 40],
  ['09-t3-keluar-tengah', P.t3Out() + 5],
  ['09b-tugas-kartu', P.task() + 18],
  ['09c-tugas-naik-tengah', P.taskUp() + 8],
  ['09d-tugas-di-tingkat-2', P.taskUp() + 30],
  ['10-komentar-masuk', P.compose() + 16],
  ['10b-komentar-siklus', P.cycle() + 20],
  ['10c-komentar-bubble', P.bubble() + 14],
  ['11-suka', sf(S.suka) + 20],
  ['12-logo-masuk-tengah', OUTRO.hop + 10],
  ['12b-logo-penyatuan', OUTRO.mergeFrom + 8],
  ['12c-logo-follow', OUTRO.url + 20],
  ['12d-logo-akhir', TOTAL_FRAMES - 8],
];
void ef;
console.log(JSON.stringify(frames));
