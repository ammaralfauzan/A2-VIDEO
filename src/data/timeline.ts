// Semua waktu dalam frame global (30 fps). Durasi adegan mengikuti voiceover
// public/audio/vo.mp3 (33,07 dtk); batas adegan jatuh di jeda antarkalimat (lihat vo-timing.json).

export const SCENES = {
  hook: {from: 0, dur: 96},
  masalah: {from: 96, dur: 216},
  titikBalik: {from: 312, dur: 74},
  rapor: {from: 386, dur: 79},
  kirim: {from: 465, dur: 91},
  spp: {from: 556, dur: 87},
  laporan: {from: 643, dur: 79},
  empati: {from: 722, dur: 124},
  ajakan: {from: 846, dur: 174},
} as const;

export const TOTAL_FRAMES = 1020;

export type CaptionCue = {from: number; to: number; text: string; size: 'hook' | 'normal'};

// Caption besar, maksimal 6 kata, muncul saat kalimatnya mulai diucapkan.
export const CAPTIONS: CaptionCue[] = [
  {from: 2, to: 92, text: 'Rapor dibagi besok.', size: 'hook'},
  {from: 98, to: 224, text: 'Satu per satu.', size: 'normal'},
  {from: 229, to: 308, text: 'Setiap semester.', size: 'normal'},
  {from: 315, to: 382, text: 'Bagaimana kalau jalan sendiri?', size: 'normal'},
  {from: 390, to: 462, text: 'Rapor jadi otomatis.', size: 'normal'},
  {from: 469, to: 554, text: 'Langsung ke wali murid.', size: 'normal'},
  {from: 560, to: 640, text: 'Pengingat jalan sendiri.', size: 'normal'},
  {from: 646, to: 719, text: 'Waktu kembali.', size: 'normal'},
];

// Geometri jendela aplikasi A2 Sekolah (sama di semua adegan solusi).
export const APP = {x: 280, y: 100, w: 1360, h: 740, sidebar: 300, titleBar: 64};
export const APP_CONTENT = {
  x: APP.x + APP.sidebar + 48,
  y: APP.y + APP.titleBar + 48,
  w: APP.w - APP.sidebar - 96,
};

// Titik target kursor (koordinat layar).
export const TARGET = {
  otomatiskan: {x: 1456, y: 760},
  kirim: {x: 1410, y: 760},
  navPengingat: {x: 410, y: 440},
  navLaporan: {x: 410, y: 504},
  toggleKnobOff: {x: 1484, y: 380},
  toggleKnobOn: {x: 1532, y: 380},
};

// Jalur kursor: posisi kunci; di antara kunci kursor bergerak dengan easing.
export type CursorKey = {f: number; x: number; y: number};
export const CURSOR_PATH: CursorKey[] = [
  {f: 0, x: 690, y: 500},
  {f: 64, x: 706, y: 508},
  // Masalah: bolak-balik rekap nilai dan chat
  {f: 103, x: 706, y: 508},
  {f: 118, x: 778, y: 388},
  {f: 146, x: 778, y: 388},
  {f: 163, x: 1230, y: 610},
  {f: 240, x: 1250, y: 612},
  {f: 257, x: 778, y: 432},
  {f: 276, x: 778, y: 432},
  {f: 293, x: 1230, y: 610},
  {f: 314, x: 1240, y: 612},
  // Titik balik: menuju tombol Otomatiskan
  {f: 344, x: 1240, y: 640},
  {f: 364, x: TARGET.otomatiskan.x, y: TARGET.otomatiskan.y},
  {f: 386, x: TARGET.otomatiskan.x, y: TARGET.otomatiskan.y},
  {f: 399, x: 1560, y: 820},
  // Kirim ke wali murid
  {f: 458, x: 1560, y: 820},
  {f: 473, x: TARGET.kirim.x, y: TARGET.kirim.y},
  {f: 483, x: TARGET.kirim.x, y: TARGET.kirim.y},
  {f: 500, x: 1300, y: 660},
  // Sidebar Pengingat
  {f: 553, x: 1300, y: 700},
  {f: 568, x: TARGET.navPengingat.x, y: TARGET.navPengingat.y},
  {f: 573, x: TARGET.navPengingat.x, y: TARGET.navPengingat.y},
  // Seret toggle
  {f: 591, x: TARGET.toggleKnobOff.x, y: TARGET.toggleKnobOff.y},
  {f: 597, x: TARGET.toggleKnobOff.x, y: TARGET.toggleKnobOff.y},
  {f: 612, x: TARGET.toggleKnobOn.x, y: TARGET.toggleKnobOn.y},
  {f: 618, x: TARGET.toggleKnobOn.x, y: TARGET.toggleKnobOn.y},
  {f: 629, x: 1380, y: 600},
  // Sidebar Laporan
  {f: 643, x: TARGET.navLaporan.x, y: TARGET.navLaporan.y},
  {f: 654, x: TARGET.navLaporan.x, y: TARGET.navLaporan.y},
  {f: 682, x: 470, y: 690},
];

// Frame saat tombol mouse ditekan (dilepas 5 frame kemudian).
export const CLICKS = {
  sel1: 122,
  chat1: 168, // klik kolom balasan chat lalu mengetik
  sel2: 262,
  chat2: 298,
  otomatiskan: 369,
  kirim: 477,
  navPengingat: 570,
  toggleDown: 597, // ditahan sampai 612 (seret)
  navLaporan: 648,
};
export const CLICK_LIST = [
  CLICKS.sel1,
  CLICKS.chat1,
  CLICKS.sel2,
  CLICKS.chat2,
  CLICKS.otomatiskan,
  CLICKS.kirim,
  CLICKS.navPengingat,
  CLICKS.navLaporan,
];
export const DRAG = {from: 597, to: 612};

export const CURSOR_VISIBLE = {from: 0, fadeOutFrom: 718, fadeOutTo: 732};
