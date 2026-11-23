// Tata letak dan jadwal adegan "Daftar dan Masuk Akun H2C". Semua frame dihitung dari timing suara.
// Area aman 9:16: x 60–900, y 220–1500. Isi ditengahkan di x 540, lebar maks. 720 (x 180–900).
import {sg, TOTAL_FRAMES, wf} from '../../data/timeline-daftar-dan-masuk-h2c';

// Jendela peramban (replika web umroh H2C tampilan HP).
export const FRAME = {x: 180, y: 300, w: 720, h: 990} as const;
export const TABS_H = 66;
export const ADDR_H = 64;
export const CONTENT_Y = FRAME.y + TABS_H + ADDR_H; // 430
export const PAD = 40;
export const IN_X = FRAME.x + PAD; // 220
export const IN_W = FRAME.w - PAD * 2; // 640

// Kotak isian (koordinat global).
export const FIELD_H = 84;
export const F = {
  nama: {y: 645},
  email: {y: 790},
  pass: {y: 935},
  daftarBtn: {y: 1065, h: 84},
  // layar Masuk
  mEmail: {y: 645},
  mPass: {y: 790},
  masukBtn: {y: 920, h: 84},
} as const;
export const EYE = (y: number) => ({x: IN_X + IN_W - 50, y: y + FIELD_H / 2});
export const BOX = {w: 88, h: 108, gap: 16, y: 690};
export const BOX_X0 = 540 - (6 * BOX.w + 5 * BOX.gap) / 2; // 236
export const TAB1 = {x: FRAME.x + 14, w: 330};
export const TAB2 = {x: FRAME.x + 352, w: 220};
export const HEADER_BTN = {daftar: {x: 724, y: 462, w: 136, h: 56}, masuk: {x: 604, y: 462, w: 110, h: 56}};
export const MAIL = {pillsY: 456, itemY: 548, itemH: 124, codeY: 820};
// Menu kecil seperti di HP: "Salin" di atas kode email, "Tempel" di atas kotak kode.
export const COPY_MENU = {x: 540 - 100, y: 738, w: 200, h: 68};
export const PASTE_MENU = {x: 236, y: 604, w: 220, h: 68};
export const CAPTION_BOX = {x: 180, y: 1330, w: 720, h: 170};

// Isian fiktif.
export const DATA = {
  nama: 'Ahmad Fauzi',
  email: 'ahmad@contoh.com',
  pass: 'amanah123',
  kode: '482715',
} as const;

// Jadwal (frame global).
export const P = {
  // hook versi F: "Daftar online itu ribet?" lalu "Salah!" lalu pita "Bapak, Ibu juga bisa"
  hookSalah: sg(1) - 4,
  hookRibbon: sg(2) - 4,
  hookOut: sg(3) - 12,
  frameIn: sg(3) - 16,
  sec1: [sg(4) - 6, sg(6) + 2] as [number, number],
  clickDaftar1: wf(7, 3) + 2,
  clickNama: sg(8) + 2,
  clickEmail: wf(9, 1) - 2,
  clickPass: sg(10) + 1,
  eyeHint: wf(12, 0),
  clickEye: wf(12, 3),
  clickDaftar2: wf(13, 2) + 1,
  notif: wf(14, 5),
  clickTabMail: wf(15, 1) + 2,
  clickItem: wf(15, 6) + 2,
  spam: wf(16, 6),
  // salin-tempel (revisi E 23 Nov): angka disorot, menu "Salin" ditekan, kembali ke H2C, menu "Tempel" ditekan
  selFrom: wf(17, 0) - 2,
  selTo: wf(17, 0) + 10,
  copyClick: wf(17, 2) + 2,
  clickTabH2C: wf(18, 0) + 4,
  clickBox: sg(19) - 2,
  pasteClick: wf(19, 1) + 4,
  digitsFrom: wf(19, 1) + 6,
  digitsTo: wf(19, 1) + 14,
  done: [sg(20) - 3, sg(22) - 8] as [number, number],
  sec2: [sg(22) - 6, sg(24) + 2] as [number, number],
  clickMEmail: sg(25) - 2,
  clickMPass: sg(26) - 3,
  clickMasuk: wf(27, 1) + 1,
  chipEmail: wf(27, 1) + 14,
  chipPass: wf(27, 1) + 22,
  chipLangsung: sg(28),
  outro: sg(29) - 6,
  end: TOTAL_FRAMES,
};

export type Screen = 'beranda' | 'daftar' | 'kode' | 'email' | 'masuk' | 'akun';
// Layar aktif di jendela + frame mulainya (pergantian 8 frame).
export const SCREENS: [number, Screen][] = [
  [0, 'beranda'],
  [P.clickDaftar1 + 5, 'daftar'],
  [P.clickDaftar2 + 5, 'kode'],
  [P.clickTabMail + 4, 'email'],
  [P.clickTabH2C + 4, 'kode'],
  [P.sec2[0] + 14, 'masuk'],
  [P.clickMasuk + 5, 'akun'],
];

// Jadwal ketik: [mulai, teks, frame per huruf].
export const TYPE = {
  nama: {from: P.clickNama + 6, text: DATA.nama, cpf: 0.42},
  email: {from: P.clickEmail + 6, text: DATA.email, cpf: 0.5},
  pass: {from: P.clickPass + 6, text: DATA.pass, cpf: 0.36},
  mEmail: {from: P.clickMEmail + 5, text: DATA.email, cpf: 0.62},
  mPass: {from: P.clickMPass + 5, text: DATA.pass, cpf: 0.5},
} as const;

// Kursor: titik kunci [frame tiba, x, y, klik?]. Di antara titik kunci kursor bergerak melengkung,
// cepat di awal lalu melambat sebelum tiba (seperti tangan), lalu jeda sebelum klik.
export type Key = {f: number; x: number; y: number; click?: boolean; hide?: boolean};
const fieldPt = (y: number, dx = -60) => ({x: 540 + dx, y: y + FIELD_H / 2});
export const CURSOR_KEYS: Key[] = [
  {f: P.sec1[1] - 2, x: 600, y: 960, hide: true},
  {f: P.sec1[1] + 6, x: 600, y: 960},
  {f: P.clickDaftar1 - 12, x: 793, y: 492},
  {f: P.clickDaftar1, x: 792, y: 490, click: true},
  {f: P.clickNama - 4, x: fieldPt(F.nama.y).x - 6, y: fieldPt(F.nama.y).y + 3},
  {f: P.clickNama, ...fieldPt(F.nama.y), click: true},
  {f: P.clickNama + 30, x: 700, y: 760},
  {f: P.clickEmail - 6, x: fieldPt(F.email.y, 40).x, y: fieldPt(F.email.y).y + 4},
  {f: P.clickEmail, ...fieldPt(F.email.y, 40), click: true},
  {f: P.clickEmail + 26, x: 760, y: 900},
  {f: P.clickPass - 6, x: fieldPt(F.pass.y, -100).x, y: fieldPt(F.pass.y).y + 3},
  {f: P.clickPass, ...fieldPt(F.pass.y, -100), click: true},
  {f: P.clickPass + 34, x: 640, y: 1060},
  {f: P.eyeHint + 8, x: EYE(F.pass.y).x + 6, y: EYE(F.pass.y).y + 8},
  {f: P.clickEye, x: EYE(F.pass.y).x + 2, y: EYE(F.pass.y).y + 4, click: true},
  {f: P.clickEye + 16, x: 760, y: 1040},
  {f: P.clickDaftar2 - 8, x: 548, y: F.daftarBtn.y + 44},
  {f: P.clickDaftar2, x: 546, y: F.daftarBtn.y + 42, click: true},
  {f: P.clickDaftar2 + 30, x: 780, y: 1180},
  {f: P.clickTabMail - 30, x: 780, y: 1170},
  {f: P.clickTabMail - 6, x: TAB2.x + 90, y: FRAME.y + 36},
  {f: P.clickTabMail, x: TAB2.x + 88, y: FRAME.y + 34, click: true},
  {f: P.clickItem - 8, x: 520, y: MAIL.itemY + 60},
  {f: P.clickItem, x: 518, y: MAIL.itemY + 58, click: true},
  {f: P.clickItem + 24, x: 780, y: 760},
  {f: P.spam - 8, x: IN_X + 300, y: MAIL.pillsY + 30},
  {f: P.spam + 4, x: IN_X + 298, y: MAIL.pillsY + 28},
  {f: P.selFrom, x: 520, y: MAIL.codeY + 70},
  {f: P.selTo, x: 760, y: MAIL.codeY + 74},
  {f: P.copyClick - 6, x: COPY_MENU.x + COPY_MENU.w / 2 + 6, y: COPY_MENU.y + COPY_MENU.h / 2 + 6},
  {f: P.copyClick, x: COPY_MENU.x + COPY_MENU.w / 2, y: COPY_MENU.y + COPY_MENU.h / 2, click: true},
  {f: P.copyClick + 20, x: 760, y: 1000},
  {f: P.clickTabH2C - 6, x: TAB1.x + 160, y: FRAME.y + 36},
  {f: P.clickTabH2C, x: TAB1.x + 158, y: FRAME.y + 34, click: true},
  {f: P.clickBox - 3, x: BOX_X0 + BOX.w / 2 + 4, y: BOX.y + BOX.h / 2 + 4},
  {f: P.clickBox, x: BOX_X0 + BOX.w / 2, y: BOX.y + BOX.h / 2, click: true},
  {f: P.pasteClick - 6, x: PASTE_MENU.x + PASTE_MENU.w / 2 + 6, y: PASTE_MENU.y + PASTE_MENU.h / 2 + 6},
  {f: P.pasteClick, x: PASTE_MENU.x + PASTE_MENU.w / 2, y: PASTE_MENU.y + PASTE_MENU.h / 2, click: true},
  {f: P.digitsFrom + 14, x: 700, y: 1000},
  {f: P.done[0] - 2, x: 720, y: 1020},
  {f: P.done[0] + 6, x: 720, y: 1020, hide: true},
  {f: P.sec2[1] + 2, x: 760, y: 1160, hide: true},
  {f: P.sec2[1] + 10, x: 760, y: 1160},
  {f: P.clickMEmail - 6, x: fieldPt(F.mEmail.y).x - 4, y: fieldPt(F.mEmail.y).y + 4},
  {f: P.clickMEmail, ...fieldPt(F.mEmail.y), click: true},
  {f: P.clickMEmail + 22, x: 720, y: 760},
  {f: P.clickMPass - 5, x: fieldPt(F.mPass.y).x - 4, y: fieldPt(F.mPass.y).y + 3},
  {f: P.clickMPass, ...fieldPt(F.mPass.y), click: true},
  {f: P.clickMPass + 26, x: 700, y: 1060},
  {f: P.clickMasuk - 6, x: 552, y: F.masukBtn.y + 44},
  {f: P.clickMasuk, x: 550, y: F.masukBtn.y + 42, click: true},
  {f: P.clickMasuk + 30, x: 820, y: 1220},
  {f: P.outro - 6, x: 830, y: 1230},
  {f: P.outro + 2, x: 830, y: 1230, hide: true},
];

// B-roll: titik sisip dari naskah. `src: null` = klip belum dilampirkan Bos (adegan memakai replika layar saja).
// Isi `src` dengan 'broll/daftar-dan-masuk-h2c/B1.mp4' dst. lalu render ulang (pola src/tips-umroh/Broll.tsx).
export const BROLL: {id: string; from: number; to: number; src: string | null; shift?: number}[] = [
  {id: 'B1', from: 0, to: sg(1) + 12, src: null},
  {id: 'B2', from: sg(14), to: sg(14) + 90, src: null},
  {id: 'B3', from: wf(21, 0), to: wf(21, 0) + 66, src: null},
  {id: 'B4', from: sg(29) + 18, to: sg(29) + 108, src: null},
];
