import {S, sf, wf} from '../../data/timeline-wasiat-maksimal-sepertiga';

// Zona 9:16 (area aman x 60–900, y 220–1500). Semua ditengahkan di x 540, lebar maks 720 (x 180–900):
// judul tanpa bingkai y 240–590, panggung ilustrasi y 620–1190 (SVG, x 0 = tengah layar), teks bawah y 1250+.
export const CX = 540;
export const TEXT_BOX = {left: 180, width: 720, top: 1250};
export const TOP = {x: 180, y: 240, w: 720, h: 350};
export const STAGE = {x: 180, y: 620, w: 720, h: 570};
// Batang harta dalam koordinat panggung (x -360..360 = layar 180..900; y 190 = layar 810).
export const BAR = {left: -360, right: 360, top: 190, h: 170};
export const KEW = 150; // lebar potongan "kewajiban" yang dilepas

// Fase tiap adegan, semua dari timing suara (grafis ±4 frame sebelum kata pemicu).
export const P = {
  barIn: 4,
  jangan: wf(S.jangan, 2),
  cardSad: sf(S.sad) - 6,
  mSeluruh: wf(S.tanya, 6) - 4,
  xSeluruh: wf(S.tidak, 2) - 2,
  mSetengah: wf(S.setengah, 2) - 4,
  xSetengah: wf(S.setengah, 3) - 2,
  mSepertiga: sf(S.sepertiga) - 4,
  cardQuote: sf(S.sabda) - 4,
  lock: wf(S.sabda, 2) - 4,
  banyak: wf(S.sabda, 7) - 4,
  heirIn: sf(S.jelas),
  cardBanding: wf(S.jelas, 3) - 6,
  flow: wf(S.jelas, 3),
  cukup: wf(S.jelas, 8) - 4,
  miskin: wf(S.jelas, 14) - 4,
  cardSumber1: sf(S.hadits) - 4,
  reset: sf(S.jadi) - 4,
  cardWasiat: sf(S.jadi) - 4,
  sisa: wf(S.jadi, 6) - 4,
  kew: wf(S.jadi, 9) - 4,
  relock: wf(S.jadi, 11),
  cardLarang: wf(S.satu, 2) - 4,
  arrow: wf(S.satu, 4) - 4,
  block: wf(S.satu, 8) - 4,
  cardSumber2: sf(S.abuDawud) - 4,
  cardBagian: sf(S.sebab) - 4,
  badge: wf(S.sebab, 5) - 4,
  stageOut: sf(S.batas) - 8,
  headline: sf(S.batas) + 8,
  logo: wf(S.batas, 8) - 4,
};

// Slot B-roll (klip Bos B1..B5, dalam frame). src = null selama klip belum dilampirkan: slot dilewati.
// whip = masuk zoom-buram; shift = geser klip tajam ke atas agar bagian penting tidak tertutup teks bawah.
export type BrollSlot = {from: number; to: number; src: string | null; start?: number; shift?: number};
export const BROLL: BrollSlot[] = [
  {from: 0, to: sf(S.sad) - 8, src: null, shift: -500}, // B1 amplop tersegel (hook)
  {from: sf(S.sad) + 4, to: sf(S.tanya) + 36, src: null, shift: -500}, // B2 meja samping tempat tidur
  {from: wf(S.jelas, 9), to: wf(S.jelas, 9) + 120, src: null, shift: -500}, // B3 miniatur rumah dan kunci
  {from: sf(S.jadi) + 30, to: sf(S.jadi) + 150, src: null, shift: -500}, // B4 map rapi
  {from: sf(S.batas), to: sf(S.batas) + 120, src: null, shift: -500}, // B5 cahaya jendela
];
