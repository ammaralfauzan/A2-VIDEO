// Frame kunci "Tiga Salah Kaprah" dihitung dari timing suara (termasuk frame di tengah transisi).
import {ef, S, sf, TOTAL_FRAMES, wf} from '../src/data/timeline-tiga-salah-kaprah-otomatisasi';
import {P} from '../src/scenes/tiga-salah-kaprah-otomatisasi/layout';
import {OUTRO} from '../src/scenes/tiga-salah-kaprah-otomatisasi/Penutup';

const frames: [string, number][] = [
  ['01-hook-tumpukan', 30],
  ['01b-hook-takut-geleng', wf(S.hook, 5) + 10],
  ['01c-merenggang', P.spread() + 8],
  ['01d-parkir-transisi', P.park() + 8],
];
const N = ['1', '2', '3'];
[0, 1, 2].forEach((i) => {
  const n = N[i];
  if (i > 0) frames.push([`0${i + 1}a-kartu${n}-maju`, P.advance(i) + 6]);
  frames.push([`0${i + 1}b-kartu${n}-buka-tengah-balik`, P.showMyth(i) + 7]);
  frames.push([`0${i + 1}c-kartu${n}-cap`, P.stamp(i) + 2]);
  frames.push([`0${i + 1}d-kartu${n}-mitos`, P.stamp(i) + 14]);
  frames.push([`0${i + 1}e-kartu${n}-balik-tengah`, P.flipFact(i) + 7]);
  frames.push([`0${i + 1}f-kartu${n}-fakta`, P.flipFact(i) + 30]);
  frames.push([`0${i + 1}g-kartu${n}-kembali-transisi`, P.back(i) + 8]);
});
frames.push(['03h-tugas-kecil-1', P.task(0) + 20]);
frames.push(['03i-tugas-kecil-2', P.task(1) + 20]);
frames.push(['04-tanya-merapat', P.gather() + 8]);
frames.push(['04b-tanya-memudar', P.rowOut() + 5]);
frames.push(['04c-tanya-kartu', P.ask() + 30]);
frames.push(['04d-tanya-kedip', wf(S.tanya, 11) + 6]);
frames.push(['05-gigi-melayang', OUTRO.hop + 12]);
frames.push(['05b-jadi-gear', OUTRO.mergeFrom + 8]);
frames.push(['05c-ajakan-label', OUTRO.pill + 12]);
frames.push(['06-logo-ajakan', TOTAL_FRAMES - 10]);
void sf;
void ef;
console.log(JSON.stringify(frames.sort((a, b) => a[1] - b[1])));
