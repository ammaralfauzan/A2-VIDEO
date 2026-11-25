import {S, sf, wf} from '../../data/timeline-penghalang-waris';

// Zona 9:16 (area aman x 60–900, y 220–1500). Semua ditengahkan di x 540, lebar maks 720 (x 180–900):
// judul tanpa bingkai y 240–590, panggung ilustrasi y 620–1190 (SVG, x 0 = tengah layar), teks bawah y 1250+.
export const CX = 540;
export const TEXT_BOX = {left: 180, width: 720, top: 1250};
export const TOP = {x: 180, y: 240, w: 720, h: 350};
export const STAGE = {x: 180, y: 620, w: 720, h: 570};

// Adegan keluarga dalam koordinat panggung (y 0 = layar 620, x 0 = tengah). Revisi 2 Bos (25 Nov 2026): BUKAN bagan,
// tanpa kartu/kotak di belakang. Rumah PEWARIS di atas, empat benda keluarga melayang di bawahnya, aliran cahaya
// lengkung dari pintu rumah ke tiap benda (muncul setelah kunci membuka pintu). Jarak antarelemen >= 28 px.
export const HOUSE = {x: 0, y: 222}; // tanah depan pintu; rumah setinggi 204 (atap y 18)
export const ITEM_Y = 400; // tengah ikon (ikon ±55, tanah ikon y 450)
export const ITEM_LABEL_Y = 490;
export const ITEM_X = [-255, -85, 85, 255];
export const ITEM_LABEL = ['ANAK', 'SAUDARA', 'ORANG TUA', 'PASANGAN'];
// Benda yang ditahan gembok: 1 = beda agama (SAUDARA), 2 = membunuh pewaris (ORANG TUA). Label netral, tanpa nama.
export const LOCK_ITEM = [1, 2];
export const LOCK_Y = 334; // dasar gembok, tepat di ujung aliran di atas benda
export const LEGEND_Y = 546;
// Aliran: kurva kubik dari tanah rumah ke atas benda.
export const flow = (x: number) => ({p0: [x * 0.1, 236], p1: [x * 0.1, 292], p2: [x, 268], p3: [x, 336]});
export const flowPath = (x: number) => {
  const {p0, p1, p2, p3} = flow(x);
  return `M${p0[0]} ${p0[1]} C${p1[0]} ${p1[1]} ${p2[0]} ${p2[1]} ${p3[0]} ${p3[1]}`;
};
export const flowAt = (x: number, t: number) => {
  const {p0, p1, p2, p3} = flow(x);
  const u = 1 - t;
  const k = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
  return [k[0] * p0[0] + k[1] * p1[0] + k[2] * p2[0] + k[3] * p3[0], k[0] * p0[1] + k[1] * p1[1] + k[2] * p2[1] + k[3] * p3[1]];
};

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
