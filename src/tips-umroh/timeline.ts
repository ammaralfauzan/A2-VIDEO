import data from '../data/tips-umroh-words.json';
import {FPS} from '../theme';

// Semua waktu dalam frame (30 fps), diturunkan dari timing per kata transkrip.
// Adegan mengikuti ucapan pembicara; video asli tidak dipotong atau dipercepat.
const WORDS = data.words as [string, number, number][];

// Frame awal kata ke-i (indeks pada daftar kata).
export const w = (i: number) => Math.round(WORDS[i][1] * FPS);
export const wEnd = (i: number) => Math.round(WORDS[i][2] * FPS);

export const TOTAL_FRAMES = Math.floor(data.durasi * FPS);

// Indeks kata kunci.
const K = {
  aja: 7,
  pertama: 8,
  tanggal: 10,
  durasi: 12,
  kedua: 14,
  hotel: 16,
  maskapai: 18,
  ketiga: 20,
  fasilitas: 22,
  termasuk: 25,
  keempat: 26,
  tanyakan4: 28,
  tambahan: 29,
  kemungkinan: 32,
  terakhir: 34,
  manasik: 38,
  pendampingan: 40,
  perjalanan: 42,
  untuk: 45,
  hubungi: 49,
} as const;

// Kartu berganti tepat sebelum pembicara menyebut poin berikutnya.
const LEAD = 4;
export const CARD = {
  hook: 4,
  p1: w(K.pertama) - LEAD,
  p2: w(K.kedua) - LEAD,
  p3: w(K.ketiga) - LEAD,
  p4: w(K.keempat) - LEAD,
  p5: w(K.terakhir) - LEAD,
  cta: w(K.untuk) - LEAD,
  end: TOTAL_FRAMES,
} as const;
export const POINT_STARTS = [CARD.p1, CARD.p2, CARD.p3, CARD.p4, CARD.p5];
export const POINT_ENDS = [CARD.p2, CARD.p3, CARD.p4, CARD.p5, CARD.cta];

// Momen di dalam kartu, menempel pada kata yang diucapkan.
export const BEAT = {
  strike: w(K.aja) - 2, // coretan pada "harganya"
  fiveTips: wEnd(K.aja) - 10, // pil "5 hal yang perlu dicek"
  tanggal: w(K.tanggal),
  durasi: w(K.durasi),
  hotel: w(K.hotel),
  maskapai: w(K.maskapai),
  fasilitas: w(K.fasilitas),
  paket: w(K.tanyakan4),
  tambahan: w(K.tambahan),
  kemungkinan: w(K.kemungkinan),
  manasik: w(K.manasik),
  pendampingan: w(K.pendampingan),
  perjalanan: w(K.perjalanan),
  hubungi: w(K.hubungi),
} as const;
