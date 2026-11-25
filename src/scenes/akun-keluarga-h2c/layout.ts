// Tata letak dan jadwal "Satu Akun untuk Sekeluarga" (dunia 1080x1920 sebelum kamera).
// Meja 3D semu: monitor di meja zamrud, empat kartu nama berdiri di depannya, ponsel di sisi kanan, tumbuhan kecil.
// Semua frame diturunkan dari timing suara (sg/eg/wf), jadi adegan mengikuti MP3 asli.
import {eg, sg, wf} from '../../data/timeline-akun-keluarga-h2c';

// Monitor dan layar (koordinat dunia). Isi layar digambar di koordinat lokal 744x484.
export const MON = {x: 90, y: 470, w: 780, h: 520};
export const SCR = {x: 108, y: 488, w: 744, h: 484};
export const L = (x: number, y: number) => ({x: SCR.x + x, y: SCR.y + y});
export const DESK_Y = 1034;
// Kartu nama (tent card) di meja.
export const CARD = {y: 1090, w: 160, h: 140};
export const CARD_X = [100, 300, 500, 700];
// Ponsel berdiri di penyangga, sisi kanan meja.
export const PHONE = {x: 890, y: 660, w: 200, h: 400};
// Teks besar di bawah meja.
export const CAPTION_BOX = {x: 80, y: 1286, w: 800, h: 196};

export const NAMES = ['Aisyah', 'Hasan', 'Fatimah', 'Umar'] as const;
export const FAMILY_ID = 'KLG-2417';
export const SANDI = 'melati24';

// Angka langkah besar: frame mulai tiap langkah.
export const STEP_AT = [sg(6), sg(12), sg(16), sg(21)];
export const STEP_LABEL = ['TAMBAH ANGGOTA', 'KIRIM ID & SANDI', 'ANGGOTA MASUK', 'BELIKAN PAKET'];
export const POP = {pre: 2, hold: 26, move: 12}; // angka di tengah, lalu mengecil ke lencana

export const P = {
  // pembuka
  introAt: sg(3),
  pelan: sg(5),
  // langkah 1
  cursorIn: sg(8) - 6,
  clickNav: wf(8, 3),
  clickAdd: wf(9, 0) + 2,
  nameFrom: wf(9, 2),
  sandiFrom: wf(9, 4),
  sandiGlow: sg(10),
  clickSave: eg(10) - 2,
  addMore: [wf(11, 1), wf(11, 3), wf(11, 5)],
  full: wf(11, 6),
  // langkah 2
  kirimOpen: STEP_AT[1] + POP.pre + POP.hold,
  clickSalin: wf(14, 0) + 2,
  toastTo: eg(14) + 2,
  phoneIn: sg(15) - 8,
  bubble: wf(15, 1),
  sent: wf(15, 3) + 2,
  phoneOut: sg(16) - 2,
  // langkah 3
  masukOpen: STEP_AT[2] + POP.pre + POP.hold,
  clickIdBtn: wf(18, 3),
  idFrom: wf(19, 2),
  pwFrom: wf(19, 4),
  clickMasuk: eg(19) + 2,
  forward: sg(20),
  // langkah 4
  paketOpen: STEP_AT[3] + POP.pre + POP.hold,
  clickPaket: wf(23, 3),
  panel: sg(24),
  fly: wf(24, 2) - 2,
  clickChip: wf(24, 3) + 6,
  order: sg(25) + 2,
  // selesai dan ajakan
  done: sg(26) - 2,
  rowGlow: sg(27),
  cta: sg(28) - 2,
  outro: sg(29) - 8,
  button: wf(29, 1) - 4,
};

export const TYPE_EVERY = 2; // frame per huruf saat mengetik
export const typed = (text: string, from: number, f: number) => text.slice(0, Math.max(0, Math.min(text.length, Math.floor((f - from) / TYPE_EVERY) + 1)));
export const typedEnd = (text: string, from: number) => from + text.length * TYPE_EVERY;

// Kamera: satu nilai kemajuan per gerak, ber-easing; dunia (cx,cy) dipetakan ke layar (tx,ty) dengan skala s.
export type Shot = {cx: number; cy: number; s: number; tx: number; ty: number; dof: number};
export const SHOT: Record<'far' | 'base' | 'back' | 'screen' | 'phone' | 'out', Shot> = {
  far: {cx: 480, cy: 860, s: 0.93, tx: 480, ty: 880, dof: 0},
  base: {cx: 480, cy: 860, s: 1, tx: 480, ty: 860, dof: 0},
  back: {cx: 480, cy: 860, s: 0.965, tx: 480, ty: 870, dof: 0},
  screen: {cx: 480, cy: 730, s: 1.07, tx: 480, ty: 730, dof: 0},
  phone: {cx: 990, cy: 860, s: 1.4, tx: 480, ty: 840, dof: 1},
  out: {cx: 480, cy: 860, s: 0.9, tx: 480, ty: 880, dof: 0},
};
// [frame, shot]: antara dua kunci kamera bergerak; kunci sama = diam.
export const CAM_KEYS: [number, keyof typeof SHOT][] = [
  [0, 'far'],
  [eg(2), 'base'],
  [P.introAt, 'base'],
  [P.introAt + 24, 'back'],
  [STEP_AT[0] + 6, 'back'],
  [STEP_AT[0] + 40, 'screen'],
  [P.phoneIn, 'screen'],
  [P.phoneIn + 20, 'phone'],
  [P.phoneOut, 'phone'],
  [P.phoneOut + 22, 'screen'],
  [P.done, 'screen'],
  [P.done + 26, 'base'],
  [P.cta, 'base'],
  [P.cta + 34, 'out'],
];

// Kunci kursor (koordinat dunia). hide = tak terlihat.
export type Key = {f: number; x: number; y: number; click?: boolean; hide?: boolean};
const k = (f: number, lx: number, ly: number, o: Partial<Key> = {}): Key => ({f, ...L(lx, ly), ...o});
export const CURSOR_KEYS: Key[] = [
  k(0, 640, 420, {hide: true}),
  k(P.cursorIn, 640, 420, {hide: true}),
  k(P.cursorIn + 10, 600, 300),
  k(P.clickNav, 486, 40, {click: true}),
  k(P.clickAdd, 596, 112, {click: true}),
  k(P.nameFrom - 2, 400, 232),
  k(P.sandiFrom - 2, 400, 322),
  k(P.sandiGlow + 18, 566, 300),
  k(P.clickSave, 446, 396, {click: true}),
  k(P.addMore[1], 560, 300),
  k(STEP_AT[1] - 4, 620, 420),
  k(STEP_AT[1] + 2, 620, 420, {hide: true}),
  k(P.kirimOpen, 620, 440, {hide: true}),
  k(P.kirimOpen + 8, 560, 440),
  k(P.clickSalin, 446, 392, {click: true}),
  k(P.clickSalin + 14, 600, 330),
  k(P.phoneIn, 470, 430),
  k(P.phoneIn + 4, 470, 430, {hide: true}),
  k(P.masukOpen, 620, 430, {hide: true}),
  k(P.masukOpen + 8, 600, 420),
  k(P.clickIdBtn, 556, 288, {click: true}),
  k(P.idFrom - 2, 420, 214),
  k(P.pwFrom - 2, 420, 306),
  k(P.clickMasuk, 452, 398, {click: true}),
  k(STEP_AT[3] - 4, 560, 430),
  k(STEP_AT[3] + 2, 560, 430, {hide: true}),
  k(P.paketOpen, 640, 440, {hide: true}),
  k(P.paketOpen + 8, 600, 420),
  k(P.clickPaket, 446, 314, {click: true}),
  k(P.clickChip, 262, 420, {click: true}),
  k(P.order, 520, 450),
  k(P.order + 6, 520, 450, {hide: true}),
];

// Titik sisip B-roll dari naskah (B1-B4). Klip belum dilampirkan Bos: src null = tidak tampil.
// Isi src dengan 'broll/akun-keluarga-h2c/B1.mp4' dst. lalu render ulang (pola src/tips-umroh/Broll.tsx).
export const BROLL: {id: string; from: number; to: number; src: string | null; shift?: number}[] = [
  {id: 'B1', from: sg(1), to: sg(1) + 90, src: null},
  {id: 'B2', from: sg(15), to: sg(15) + 90, src: null},
  {id: 'B3', from: sg(18), to: sg(18) + 90, src: null},
  {id: 'B4', from: sg(28), to: sg(28) + 120, src: null},
];
