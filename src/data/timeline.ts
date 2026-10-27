// Semua waktu dalam frame global (30 fps). Durasi adegan mengikuti naskah
// karena belum ada voiceover; saat vo.mp3 tersedia, sesuaikan dengan vo-timing.json.

export const SCENES = {
  hook: {from: 0, dur: 90},
  masalah: {from: 90, dur: 180},
  titikBalik: {from: 270, dur: 60},
  rapor: {from: 330, dur: 120},
  kirim: {from: 450, dur: 120},
  spp: {from: 570, dur: 90},
  laporan: {from: 660, dur: 60},
  empati: {from: 720, dur: 116},
  ajakan: {from: 836, dur: 64},
} as const;

export const TOTAL_FRAMES = 900;

export type CaptionCue = {from: number; to: number; text: string; size: 'hook' | 'normal'};

// Caption besar, maksimal 6 kata, mengikuti kalimat voiceover.
export const CAPTIONS: CaptionCue[] = [
  {from: 4, to: 86, text: 'Rapor dibagi besok.', size: 'hook'},
  {from: 94, to: 172, text: 'Satu per satu.', size: 'normal'},
  {from: 178, to: 264, text: 'Setiap semester.', size: 'normal'},
  {from: 272, to: 328, text: 'Bagaimana kalau jalan sendiri?', size: 'normal'},
  {from: 336, to: 446, text: 'Rapor jadi otomatis.', size: 'normal'},
  {from: 456, to: 566, text: 'Langsung ke wali murid.', size: 'normal'},
  {from: 576, to: 656, text: 'Pengingat jalan sendiri.', size: 'normal'},
  {from: 666, to: 716, text: 'Waktu kembali.', size: 'normal'},
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
  {f: 60, x: 706, y: 508},
  // Masalah: bolak-balik rekap nilai dan chat
  {f: 96, x: 706, y: 508},
  {f: 108, x: 778, y: 388},
  {f: 132, x: 778, y: 388},
  {f: 146, x: 1230, y: 610},
  {f: 210, x: 1250, y: 612},
  {f: 224, x: 778, y: 432},
  {f: 240, x: 778, y: 432},
  {f: 254, x: 1230, y: 610},
  {f: 272, x: 1240, y: 612},
  // Titik balik: menuju tombol Otomatiskan
  {f: 296, x: 1240, y: 640},
  {f: 312, x: TARGET.otomatiskan.x, y: TARGET.otomatiskan.y},
  {f: 330, x: TARGET.otomatiskan.x, y: TARGET.otomatiskan.y},
  {f: 350, x: 1560, y: 820},
  // Kirim ke wali murid
  {f: 440, x: 1560, y: 820},
  {f: 460, x: TARGET.kirim.x, y: TARGET.kirim.y},
  {f: 474, x: TARGET.kirim.x, y: TARGET.kirim.y},
  {f: 496, x: 1300, y: 660},
  // Sidebar Pengingat
  {f: 566, x: 1300, y: 700},
  {f: 582, x: TARGET.navPengingat.x, y: TARGET.navPengingat.y},
  {f: 588, x: TARGET.navPengingat.x, y: TARGET.navPengingat.y},
  // Seret toggle
  {f: 606, x: TARGET.toggleKnobOff.x, y: TARGET.toggleKnobOff.y},
  {f: 612, x: TARGET.toggleKnobOff.x, y: TARGET.toggleKnobOff.y},
  {f: 626, x: TARGET.toggleKnobOn.x, y: TARGET.toggleKnobOn.y},
  {f: 634, x: TARGET.toggleKnobOn.x, y: TARGET.toggleKnobOn.y},
  {f: 646, x: 1380, y: 600},
  // Sidebar Laporan
  {f: 660, x: TARGET.navLaporan.x, y: TARGET.navLaporan.y},
  {f: 668, x: TARGET.navLaporan.x, y: TARGET.navLaporan.y},
  {f: 690, x: 470, y: 690},
];

// Frame saat tombol mouse ditekan (dilepas 5 frame kemudian).
export const CLICKS = {
  sel1: 112,
  chat1: 150, // klik kolom balasan chat lalu mengetik
  sel2: 228,
  chat2: 258,
  otomatiskan: 316,
  kirim: 466,
  navPengingat: 584,
  toggleDown: 612, // ditahan sampai 628 (seret)
  navLaporan: 664,
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
export const DRAG = {from: 612, to: 628};

export const CURSOR_VISIBLE = {from: 0, fadeOutFrom: 716, fadeOutTo: 730};
