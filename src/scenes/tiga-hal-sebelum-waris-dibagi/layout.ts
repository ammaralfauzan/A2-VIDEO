import {ef, S, sf, wf} from '../../data/timeline-tiga-hal-sebelum-waris-dibagi';

// Zona 9:16 (area aman x 60–900, y 220–1500). Semua ditengahkan di x 540, lebar maks 720 (x 180–900):
// kartu ilustrasi y 250–760, alur blok + tiga gerbang y 790–1190, teks bawah y 1250+ (revisi 1 Bos: ilustrasi + tengah).
export const CX = 540;
export const TEXT_BOX = {left: 180, width: 720, top: 1250};
export const ILLU = {x: 180, y: 250, w: 720, h: 510}; // kartu ilustrasi
export const ILLU_SVG = {y: 350, h: 390}; // area gambar di dalam kartu (viewBox 720x390)

export const LANE_X = CX; // pusat jalur blok
export const BLOCK_W = 160;
export const GATES = [920, 1000, 1080]; // garis gerbang (y)
export const SLICE = 16; // tinggi potongan yang dilepas di tiap gerbang
export const HEIR = {x: 380, y: 1110, w: 320, h: 80};
export const BLOCK0 = {top: 800, bottom: 880}; // blok awal
export const BAR = {left: 236, right: 724, gap: 96}; // batang gerbang: kiri 236..CX-gap, kanan CX+gap..724; nomor di kiri, nama di kanan

// Fase tiap adegan, semua dari timing suara.
export const P = {
  blockIn: 2,
  morph: wf(S.bayangkan, 4),
  gates: [wf(S.bayangkan, 7), wf(S.bayangkan, 7) + 12, wf(S.bayangkan, 7) + 24],
  heirIn: wf(S.bayangkan, 7) + 36,
  drop: [sf(S.g1) - 12, sf(S.g2) - 12, sf(S.g3) - 12],
  peel: [sf(S.g1) + 4, sf(S.g2) + 4, sf(S.g3) + 4],
  land: sf(S.baru) - 8,
  fill: sf(S.baru) + 14,
  ayatCard: wf(S.ayat, 3),
  // sorotan di ilustrasi
  belum: wf(S.harta, 2),
  lunas: wf(S.utang, 3),
  hak: wf(S.hak, 1),
  sah: wf(S.wasiat, 2),
  ayat: sf(S.ayat),
  stageOut: sf(S.urutan) - 8,
  list: [wf(S.urutan, 1), wf(S.urutan, 3), wf(S.urutan, 4), wf(S.urutan, 6)],
  listOut: sf(S.bukan) - 6,
  headline: sf(S.bukan) + 24,
  logo: wf(S.tapi, 5),
};
export const OUT_START = ef(S.tapi);

// Slot B-roll (klip Bos B1..B5, dalam frame). src = null selama klip belum dilampirkan: slot dilewati.
// whip = masuk zoom-buram; shift = geser klip tajam ke atas agar bagian penting tidak tertutup teks bawah.
export type BrollSlot = {from: number; to: number; src: string | null; start?: number; shift?: number};
export const BROLL: BrollSlot[] = [
  {from: 0, to: sf(S.beres) + 60, src: null, shift: -500}, // B1 (naskah 0–4 dtk)
  {from: sf(S.bayangkan) + 6, to: sf(S.bayangkan) + 130, src: null, shift: -500}, // B2 (6–10 dtk)
  {from: sf(S.g2), to: sf(S.g2) + 120, src: null, shift: -500}, // B3 (utang)
  {from: sf(S.g3) + 4, to: sf(S.g3) + 124, src: null, shift: -500}, // B4 (wasiat)
  {from: sf(S.bukan), to: sf(S.bukan) + 120, src: null, shift: -500}, // B5 (penutup)
];
