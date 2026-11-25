import {ef, S, sf, wf} from '../../data/timeline-dulu-tak-dapat-bagian';

// Zona 9:16 (area aman x 60–900, y 220–1500). Semua ditengahkan di x 540, lebar 720 (x 180–900):
// label sumber y 236–330, kartu panggung y 360–1170, teks bawah y 1250+.
export const CX = 540;
export const TEXT_BOX = {left: 180, width: 720, top: 1250};
export const SRC = {x: 180, y: 236, w: 720};
export const CARD = {x: 180, y: 360, w: 720, h: 810};

// Fase tiap adegan, semua dari timing suara (grafis ±4 frame sebelum kata pemicu).
export const P = {
  hookIn: 4,
  tanda: wf(S.hook, 2) - 4,
  hookOut: sf(S.jabir) - 10,
  cardIn: sf(S.jabir) - 6,
  srcIn: sf(S.jabir) - 2,
  sakit: wf(S.jabir, 6) - 4,
  jenguk: sf(S.jenguk) - 4,
  abuBakar: wf(S.jenguk, 8) - 4,
  wudhu: sf(S.wudhu) - 4,
  percik: wf(S.wudhu, 2) - 2,
  sadar: wf(S.wudhu, 6) - 4,
  tanya: sf(S.tanya) - 4,
  tulis: wf(S.tanya, 4) - 4,
  wipe: sf(S.turun) - 4,
  ayat11: wf(S.turun, 4) - 4,
  ayat7: sf(S.ayat7) - 4,
  laki: wf(S.ayat7, 2),
  perempuan: wf(S.ayat7, 7) - 4,
  tetap: wf(S.tetap, 3) - 6,
  stageOut: sf(S.jadi) - 8,
  kebiasaan: wf(S.jadi, 4) - 4,
  coret: ef(S.jadi) - 4,
  ketetapan: wf(S.waris, 2) - 4,
  logo: wf(S.waris, 4) + 4,
};
export const WIPE_LEN = 20;

// Slot B-roll (klip Bos B1..B5, dalam frame). src = null selama klip belum dilampirkan: slot dilewati.
// shift = geser klip tajam ke atas agar bagian penting tidak tertutup teks bawah.
export type BrollSlot = {from: number; to: number; src: string | null; start?: number; shift?: number};
export const BROLL: BrollSlot[] = [
  {from: 0, to: sf(S.jabir) - 8, src: null, shift: -500}, // B1 map di meja, cahaya samping (hook)
  {from: sf(S.jabir) + 10, to: sf(S.jabir) + 130, src: null, shift: -500}, // B2 meja samping ranjang, gelas air
  {from: sf(S.turun) + 14, to: sf(S.ayat7) - 6, src: null, shift: -500}, // B3 buku tua di rehal kayu
  {from: wf(S.ayat7, 11) + 10, to: wf(S.ayat7, 11) + 120, src: null, shift: -500}, // B4 dua tumpukan map setara
  {from: sf(S.jadi) - 4, to: sf(S.jadi) + 106, src: null, shift: -500}, // B5 meja putih, map tertutup dan kunci
];
