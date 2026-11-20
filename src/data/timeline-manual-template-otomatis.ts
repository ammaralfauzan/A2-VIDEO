// Komposisi "Manual, Template, atau Otomatis?" (ManualTemplateOtomatis), 1080x1920, 30 fps.
// Teks: *kata* = kata kunci (tebal). | = pindah ke potongan teks berikutnya (maks. 6 kata per potongan).
// Waktu dari vo-timing-manual-template-otomatis.json (suara asli Bos, tidak dipercepat).
// Tiap kalimat punya `segmen` (ucapan di antara jeda) + jumlah kata layar di dalamnya; kata disebar
// menurut suku kata hanya di dalam segmennya, jadi kata setelah jeda tetap jatuh tepat.
import voTiming from './vo-timing-manual-template-otomatis.json';
import type {Chunk, Word} from './timeline-satu-pesanan';

export const FPS = 30;

// Teks layar ("A2" ditulis A2, diucapkan "A Dua").
export const SENTENCES = [
  'Cara kerja marketing digitalmu|ada di tingkat *berapa?*',
  'Ada tiga tingkat:|*manual, template,* dan *otomatis.*',
  'Tingkat *satu,* *manual.*',
  'Posting *diunggah* satu per satu|di tiap platform.',
  'Pesan masuk *dibalas*|satu per satu.',
  'Datanya *disalin* ke lembar kerja,|lalu *dihitung* sendiri.',
  'Tingkat *dua,* *template.*',
  '*Kalender* konten,|kerangka caption,|dan balasan siap pakai.',
  'Mengetik *lebih* *singkat,*|gaya lebih *konsisten.*',
  'Tapi kamu masih harus|membuka dan *menekan* kirim *sendiri.*',
  'Tingkat *tiga,* *otomatis.*',
  'Cukup tiga bagian:|*pemicu, aturan,* dan *tindakan.*',
  'Contohnya, calon pelanggan mengisi *formulir* iklan,',
  'Datanya langsung *tercatat,*',
  'Balasan pertama *terkirim.*',
  '*Laporan* *mingguan* terkumpul sendiri.',
  'Tidak perlu langsung|ke tingkat *tiga.*',
  'Pilih *satu* tugas yang paling|sering berulang,|lalu *naik* satu *tingkat.*',
  'Tugasmu *yang* *mana,*|dan di *tingkat* *berapa?*',
  '*Tulis* di *komentar.*',
  'Suka dengan konten|seperti *ini?*',
  'Follow A2 Automation titik official.',
] as const;

export const S = {
  hook: 0,
  tiga: 1,
  t1: 2,
  unggah: 3,
  balas: 4,
  salin: 5,
  t2: 6,
  kalender: 7,
  singkat: 8,
  kirim: 9,
  t3: 10,
  bagian: 11,
  contoh: 12,
  tercatat: 13,
  terkirim: 14,
  laporan: 15,
  tidak: 16,
  pilih: 17,
  tugasmu: 18,
  komentar: 19,
  suka: 20,
  ajakan: 21,
} as const;

type Seg = {mulai: number; selesai: number; kata: number};
type Timing = {mulai: number; selesai: number; segmen: Seg[]}[];
const measured = (voTiming as {kalimat: Timing}).kalimat;
if (measured.length !== SENTENCES.length) throw new Error('Jumlah kalimat timing VO tidak cocok dengan naskah');
export const AUDIO_END = (voTiming as {durasi: number}).durasi;

export const sf = (i: number) => Math.round(measured[i].mulai * FPS);
export const ef = (i: number) => Math.round(measured[i].selesai * FPS);

// Suara 60,03 dtk (kalimat terakhir selesai 59,75) + logo diam ±1,5 dtk (suara tidak dipercepat).
export const TOTAL_FRAMES = Math.ceil((AUDIO_END + 1.5) * FPS);

const syllables = (w: string) => Math.max(1, (w.toLowerCase().match(/[aiueo]+/g) || []).length);
const weight = (w: string) => {
  const t = w.replace(/\*/g, '');
  if (/^A2$/.test(t)) return 3; // "A Dua"
  return syllables(t) + (/,$/.test(t) ? 0.8 : 0);
};

const spread = (words: string[], start: number, end: number): number[] => {
  const weights = words.map(weight);
  const total = weights.reduce((a, b) => a + b, 0);
  let acc = 0;
  return words.map((_, k) => {
    const f = Math.round((start + ((end - start) * acc) / total) * FPS);
    acc += weights[k];
    return f;
  });
};

// Semua kata tiap kalimat (dengan frame ucapannya), dari segmen jeda.
const WORDS: Word[][] = SENTENCES.map((s, si) => {
  const all = s.split('|').flatMap((p) => p.split(/\s+/).filter(Boolean));
  const segs = measured[si].segmen;
  const n = segs.reduce((a, g) => a + g.kata, 0);
  if (n !== all.length) throw new Error(`Kalimat ${si}: jumlah kata segmen (${n}) != naskah (${all.length})`);
  const out: Word[] = [];
  let k = 0;
  for (const g of segs) {
    const ws = all.slice(k, k + g.kata);
    spread(ws, g.mulai, g.selesai).forEach((f, j) => out.push({text: ws[j].replace(/\*/g, ''), bold: ws[j].startsWith('*'), f}));
    k += g.kata;
  }
  return out;
});

// Frame saat kata ke-n (0-based) dalam kalimat i diucapkan.
export const wf = (i: number, n: number) => WORDS[i][n].f;

// Kalimat ajakan tidak ditampilkan sebagai teks: logo dan tombol yang "mengucapkannya".
export const CHUNKS: Chunk[] = (() => {
  const chunks: Chunk[] = [];
  SENTENCES.forEach((s, si) => {
    if (si === S.ajakan) return;
    let k = 0;
    for (const p of s.split('|')) {
      const n = p.split(/\s+/).filter(Boolean).length;
      const words = WORDS[si].slice(k, k + n);
      k += n;
      chunks.push({words, from: words[0].f - 1, to: 0, sentence: si});
    }
  });
  // Potongan tampil sampai potongan berikutnya mulai (maks. 1,2 dtk setelah kalimatnya selesai).
  chunks.forEach((c, i) => {
    const next = chunks[i + 1];
    const hardEnd = ef(c.sentence) + 36;
    c.to = next ? Math.min(next.from, Math.max(hardEnd, next.from - 2)) : hardEnd;
  });
  return chunks;
})();
