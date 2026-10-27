import type {CaptionCue, CursorKey} from './timeline';
import {APP} from './timeline';

// Komposisi "Makin Tumbuh, Makin Sibuk" (A2Umum). Semua waktu dalam frame global (30 fps).
// Durasi adegan mengikuti public/audio/vo-a2-umum.mp3 (33,23 dtk); batas adegan jatuh di jeda
// antarkalimat (lihat vo-timing-a2-umum.json).

export const U_SCENES = {
  hook: {from: 0, dur: 112},
  masalah: {from: 112, dur: 166},
  titikBalik: {from: 278, dur: 97},
  inbox: {from: 375, dur: 93},
  tagihan: {from: 468, dur: 74},
  laporan: {from: 542, dur: 79},
  industri: {from: 621, dur: 88},
  empati: {from: 709, dur: 153},
  ajakan: {from: 862, dur: 158},
} as const;

export const U_TOTAL_FRAMES = 1020;

export const U_CAPTIONS: CaptionCue[] = [
  {from: 2, to: 108, text: 'Makin tumbuh, makin sibuk?', size: 'hook'},
  {from: 113, to: 272, text: 'Semua masih manual.', size: 'normal'},
  {from: 278, to: 370, text: 'Bagaimana kalau jalan sendiri?', size: 'normal'},
  {from: 375, to: 464, text: 'Tidak ada yang terlewat.', size: 'normal'},
  {from: 469, to: 538, text: 'Tagihan tepat waktu.', size: 'normal'},
  {from: 542, to: 617, text: 'Laporan siap tiap pagi.', size: 'normal'},
  {from: 621, to: 705, text: 'Sekolah · Klinik · UKM', size: 'normal'},
];

// Konten aplikasi (koordinat layar), sama dengan jendela A2 Sekolah.
const CX = APP.x + APP.sidebar + 48; // 628
const CY = APP.y + APP.titleBar + 48; // 212
export const U_CONTENT = {x: CX, y: CY, w: APP.w - APP.sidebar - 96, h: APP.h - APP.titleBar - 96};

const nav = (i: number) => ({x: 410, y: APP.y + APP.titleBar + 120 + 28 + i * 64});

// Grafik penjualan di panel Laporan: posisi titik dihitung sama dengan komponen Chart.
export const U_CHART = {
  left: CX + 33,
  top: CY + 100 + 33 + 72,
  width: 898,
  height: 300,
  values: [12, 15, 14, 18, 21, 19, 24],
  labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
  max: 28,
};
export const chartPoint = (i: number) => {
  const plotH = U_CHART.height - 44;
  const step = U_CHART.width / (U_CHART.values.length - 1);
  return {
    x: U_CHART.left + i * step,
    y: U_CHART.top + plotH - (U_CHART.values[i] / U_CHART.max) * (plotH - 24),
  };
};

// Tab industri (segmented control) di kanan header panel Beranda.
export const U_SEG = {w: 150, h: 60, right: CX + U_CONTENT.w, top: CY};
// Wadah tab: lebar 3 segmen + padding 6 di tiap sisi, rata kanan.
export const segCenter = (i: number) => ({x: U_SEG.right - 3 * U_SEG.w - 6 + i * U_SEG.w + U_SEG.w / 2, y: U_SEG.top + U_SEG.h / 2});

export const U_TARGET = {
  navBeranda: nav(0),
  navInbox: nav(1),
  navTagihan: nav(2),
  navLaporan: nav(3),
  otomatiskan: {x: 1452, y: 756},
  toggleOff: {x: 1484, y: 380},
  toggleOn: {x: 1532, y: 380},
  inboxInput: {x: 1250, y: 610},
  invoiceRow: {x: 420, y: 712},
  inboxDrop: {x: 1300, y: 470},
  cellA: {x: 760, y: 437},
  cellB: {x: 760, y: 482},
};

export const U_CLICKS = {
  inbox: 131, // fokus kolom balasan, lalu mengetik
  cellA: 222,
  cellB: 252,
  otomatiskan: 340,
  navInbox: 381,
  navTagihan: 472,
  navLaporan: 546,
  navBeranda: 625,
  segKlinik: 652,
  segUkm: 680,
};
export const U_DRAGS = {
  invoice: {from: 180, to: 200}, // seret invoice ke chat pelanggan
  toggle: {from: 495, to: 509}, // seret toggle pengingat tagihan
};
export const U_CLICK_LIST = Object.values(U_CLICKS);
export const U_DRAG_LIST = Object.values(U_DRAGS);

const T = U_TARGET;
const pt = (f: number, p: {x: number; y: number}): CursorKey => ({f, x: p.x, y: p.y});

export const U_CURSOR_PATH: CursorKey[] = [
  {f: 0, x: 700, y: 520},
  {f: 70, x: 716, y: 528},
  // Masalah: chat -> seret invoice -> isi spreadsheet
  {f: 113, x: 716, y: 528},
  pt(127, T.inboxInput),
  pt(160, {x: T.inboxInput.x + 20, y: T.inboxInput.y + 4}),
  pt(176, T.invoiceRow),
  pt(180, T.invoiceRow),
  pt(200, T.inboxDrop),
  pt(206, T.inboxDrop),
  pt(218, T.cellA),
  pt(246, T.cellA),
  pt(250, T.cellB),
  pt(276, T.cellB),
  // Titik balik: tombol Otomatiskan
  {f: 312, x: 1200, y: 640},
  pt(334, T.otomatiskan),
  pt(364, T.otomatiskan),
  // Kotak masuk
  pt(377, T.navInbox),
  pt(384, T.navInbox),
  {f: 404, x: 1250, y: 760},
  {f: 456, x: 1270, y: 770},
  // Tagihan: klik menu lalu seret toggle
  pt(469, T.navTagihan),
  pt(475, T.navTagihan),
  pt(492, T.toggleOff),
  pt(495, T.toggleOff),
  pt(509, T.toggleOn),
  pt(514, T.toggleOn),
  {f: 528, x: 1380, y: 620},
  // Laporan: klik menu, lalu kursor menyusuri grafik (tooltip mengikuti)
  pt(543, T.navLaporan),
  pt(549, T.navLaporan),
  {f: 572, x: chartPoint(2).x, y: chartPoint(2).y + 60},
  {f: 588, x: chartPoint(2).x, y: chartPoint(2).y + 60},
  {f: 614, x: chartPoint(6).x, y: chartPoint(6).y + 60},
  // Beranda + tab industri
  pt(622, T.navBeranda),
  pt(628, T.navBeranda),
  pt(648, segCenter(1)),
  pt(656, segCenter(1)),
  pt(676, segCenter(2)),
  pt(686, segCenter(2)),
  {f: 700, x: 1250, y: 600},
];
export const U_CURSOR_FADE: [number, number] = [705, 719];

export const U_CLOCK = {
  night: {from: 112, to: 266, start: 21 * 60 + 30, end: 23 * 60 + 50},
  nightFade: [282, 296] as [number, number],
  dayAt: 560,
  dayMinutes: 7 * 60,
  dayIn: 588,
  dayFade: [711, 724] as [number, number],
};

export const U_OUTRO = {logoIn: 862, tagline: [872, 900] as [number, number], pillIn: 909};
