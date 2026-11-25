import {S, sf, wf} from '../../data/timeline-penghalang-waris';

// Zona 9:16 (area aman x 60–900, y 220–1500). Semua ditengahkan di x 540, lebar maks 720 (x 180–900):
// judul tanpa bingkai y 240–590, panggung ilustrasi y 620–1190 (SVG, x 0 = tengah layar), teks bawah y 1250+.
export const CX = 540;
export const TEXT_BOX = {left: 180, width: 720, top: 1250};
export const TOP = {x: 180, y: 240, w: 720, h: 350};
export const STAGE = {x: 180, y: 620, w: 720, h: 570};

// Diagram keluarga dalam koordinat panggung (y 0 = layar 620, x 0 = tengah). Kartu latar x -340..340, y 0..560;
// isi diberi padding >= 36 px dari tepi kartu. Semua bentuk bersudut bulat (kotak rx 34, garis ujung bulat, siku melengkung).
export const CARD = {x: -340, y: 0, w: 680, h: 560, r: 56};
export const PEWARIS = {y: 40, w: 300, h: 100, r: 36};
export const TRUNK_END = 200; // y tempat garis cabang membelok
export const ELBOW_R = 28;
export const BOX = {y: 320, w: 144, h: 140, r: 34};
export const BOX_X = [-231, -77, 77, 231];
export const BOX_LABEL = ['ANAK', 'SAUDARA', 'ORANG TUA', 'PASANGAN'];
// Kotak yang ditahan gembok: 1 = beda agama (SAUDARA), 2 = membunuh pewaris (ORANG TUA). Label netral, tanpa nama.
export const LOCK_BOX = [1, 2];
export const LOCK_Y = 306; // dasar gembok di garis cabang
export const LEGEND_Y = 514;

// Fase tiap adegan, semua dari timing suara (grafis ±4 frame sebelum kata pemicu).
export const P = {
  diagIn: 4,
  boxesIn: wf(S.hook, 1) - 4,
  tSebab: sf(S.sebab) - 4,
  keyIn: sf(S.sebab) - 4,
  glow: wf(S.sebab, 3) - 4,
  tPenghalang: wf(S.penghalang, 3) - 6,
  ghosts: wf(S.penghalang, 4) - 4,
  tDua: sf(S.dua) - 4,
  tPertama: sf(S.pertama) - 4,
  lock1: wf(S.pertama, 1) - 4,
  tUsamah: sf(S.usamah) - 4,
  tSabda: sf(S.nabi) - 4,
  quote: sf(S.sabda) - 4,
  close1: wf(S.sabda, 1) - 4,
  tSumber: sf(S.hadits) - 4,
  books: sf(S.hadits) - 6,
  jumhur: wf(S.hadits, 9) - 4,
  back: sf(S.kedua) - 6,
  tKedua: sf(S.kedua) - 4,
  lock2: wf(S.kedua, 1) - 4,
  tSepakat: sf(S.sepakat) - 4,
  close2: wf(S.sepakat, 3) - 4,
  rincian: sf(S.rincian) - 4,
  tJadi: sf(S.jadi) - 4,
  berhak: wf(S.jadi, 9) - 4,
  terhalang: wf(S.jadi, 13) - 4,
  stageOut: sf(S.ragu) - 8,
  headline: sf(S.ragu) + 2,
  logo: sf(S.ragu) + 16,
};

// Slot B-roll (klip Bos B1..B5, dalam frame). src = null selama klip belum dilampirkan: slot dilewati.
// shift = geser klip tajam ke atas agar bagian penting tidak tertutup teks bawah.
export type BrollSlot = {from: number; to: number; src: string | null; start?: number; shift?: number};
export const BROLL: BrollSlot[] = [
  {from: 0, to: sf(S.sebab) - 6, src: null, shift: -500}, // B1 kotak kayu tertutup + kunci kuningan (hook)
  {from: wf(S.penghalang, 3), to: wf(S.penghalang, 3) + 90, src: null, shift: -500}, // B2 kunci masuk lubang kunci laci
  {from: sf(S.usamah) + 4, to: sf(S.usamah) + 100, src: null, shift: -500}, // B3 gembok pada kotak arsip
  {from: sf(S.kedua) + 4, to: sf(S.kedua) + 110, src: null, shift: -500}, // B4 rak map, satu map digembok
  {from: sf(S.jadi) + 20, to: sf(S.jadi) + 140, src: null, shift: -500}, // B5 meja: map terbuka, kunci, gembok
];
