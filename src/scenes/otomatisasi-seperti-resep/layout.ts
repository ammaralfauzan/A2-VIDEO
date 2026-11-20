import {ef, S, sf, wf} from '../../data/timeline-otomatisasi-seperti-resep';

// Zona 9:16 (area aman x 60–900, y 220–1500), dari atas ke bawah, tidak saling menimpa:
// judul kecil (268), baris simpul alur (372–522), panggung ilustrasi (580–1010), teks kinetik (1110+).
export const TITLE_TOP = 268;
export const TEXT_BOX = {left: 180, width: 720, top: 1118};
export const NODE = {w: 200, h: 150, lefts: [182, 440, 698]};
export const ROW_TOP = 372;
export const ROW_TOP_FLOW = 650; // saat alur ditampilkan sendiri
export const STAGE = {cx: 540, cy: 800};

// Sisipan B-roll (klip Bos), dalam frame. whip = masuk zoom-buram; shift = geser klip tajam ke atas agar
// bagian penting tidak tertutup kartu teks (y 1090–1300).
export const BROLL = {
  b1a: {from: 0, to: ef(S.hook) + 6},
  b1b: {from: sf(S.air) - 4, to: sf(S.tanda) - 4},
  b3: {from: wf(S.tiga, 0) - 6, to: ef(S.tiga) + 4},
  b2a: {from: sf(S.masukkan) - 4, to: wf(S.masukkan, 2) - 4},
  b2b: {from: wf(S.masukkan, 2) - 4, to: ef(S.masukkan) + 6},
};

// Fase tiap adegan, semua dari timing suara.
export const P = {
  titleIn: 4,
  potDraw: ef(S.hook) + 2,
  potShift: sf(S.coba) + 2,
  cardIn: sf(S.coba) + 8,
  bubbles: sf(S.pertama),
  bolt: wf(S.pertama, 1),
  flyPemicu: wf(S.tanda, 0) - 2,
  labelPemicu: wf(S.tanda, 3),
  stageOut1: sf(S.kedua) - 8,
  ingr: [sf(S.kedua) + 6, sf(S.kedua) + 18, sf(S.kedua) + 30],
  flyBahan: sf(S.data) - 4,
  labelBahan: sf(S.data) + 14,
  dataCards: wf(S.data, 2) - 2,
  stageOut2: sf(S.ketiga) - 10,
  steps: [sf(S.ketiga) + 8, sf(S.ketiga) + 26, sf(S.ketiga) + 44],
  flyLangkah: sf(S.urutan) - 2,
  labelLangkah: wf(S.urutan, 1),
  arrows: [sf(S.urutan) + 16, sf(S.urutan) + 28],
  rowDown: sf(S.sederhana) - 8,
  pulse: [wf(S.sederhana, 4), wf(S.sederhana, 5), wf(S.sederhana, 6)],
  ghost: sf(S.sederhana) + 40,
  dots: sf(S.bedanya),
  ghostOut: wf(S.bedanya, 3),
  rowOut: wf(S.tanya, 1) - 8,
  ask: wf(S.tanya, 1) + 2,
};

// B-roll aktif (0..1) dengan rampa 6 frame: ilustrasi dan baris simpul menyingkir di bawahnya.
export const brollRanges = Object.values(BROLL);
