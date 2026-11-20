// Komposisi "Otomatisasi Itu Seperti Resep" (OtomatisasiSepertiResep), 1080x1920, 30 fps.
// Teks: *kata* = kata kunci (tebal). | = pindah ke potongan teks berikutnya (maks. 6 kata per potongan).
// Waktu dari vo-timing-otomatisasi-seperti-resep.json (suara asli Bos, tidak dipercepat).
import voTiming from './vo-timing-otomatisasi-seperti-resep.json';
import type {Chunk, Word} from './timeline-satu-pesanan';

export const FPS = 30;

// Teks layar ("A2" ditulis A2, diucapkan "A Dua").
export const SENTENCES = [
  'Kalau bisa masak *mi* *instan,*|kamu sudah paham *otomatisasi.*',
  'Coba ingat *resepnya.*',
  'Pertama, ada *pemicu.*',
  '*Air* *mendidih.*',
  'Itu tanda untuk *mulai.*',
  'Kedua, ada *bahan.*',
  '*Mi,* *bumbu,* dan air.',
  'Di pekerjaan,|bahan itu *data.*',
  'Ketiga, ada langkah *berurutan.*',
  'Masukkan *mi,* tunggu, tuang *bumbu.*',
  'Urutannya *selalu* *sama.*',
  'Otomatisasi itu sesederhana ini:|*pemicu,* *bahan,* *langkah.*',
  'Bedanya, yang menjalankan|bukan *tanganmu.*',
  'Jadi, pekerjaan apa di tempatmu|yang urutannya *selalu* *sama?*',
  'A2 Automation.',
  'Konsultasi gratis di a2automate.com.',
] as const;

export const S = {
  hook: 0,
  coba: 1,
  pertama: 2,
  air: 3,
  tanda: 4,
  kedua: 5,
  tiga: 6,
  data: 7,
  ketiga: 8,
  masukkan: 9,
  urutan: 10,
  sederhana: 11,
  bedanya: 12,
  tanya: 13,
  nama: 14,
  ajakan: 15,
} as const;

type Seg = {mulai: number; selesai: number; kata: number};
type Timing = {mulai: number; selesai: number; segmen: Seg[]}[];
const measured = (voTiming as {kalimat: Timing}).kalimat;
if (measured.length !== SENTENCES.length) throw new Error('Jumlah kalimat timing VO tidak cocok dengan naskah');
export const AUDIO_END = (voTiming as {durasi: number}).durasi;

export const sf = (i: number) => Math.round(measured[i].mulai * FPS);
export const ef = (i: number) => Math.round(measured[i].selesai * FPS);

// Suara 40,91 dtk + logo dan ajakan diam ±1,7 dtk (suara tidak dipercepat).
export const TOTAL_FRAMES = Math.ceil((AUDIO_END + 1.7) * FPS);

const syllables = (w: string) => Math.max(1, (w.toLowerCase().match(/[aiueo]+/g) || []).length);
const weight = (w: string) => {
  const t = w.replace(/\*/g, '');
  if (/a2automate/.test(t)) return 8; // "a dua automate titik com"
  if (/A2/.test(t)) return 3; // "A Dua"
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
    if (si === S.ajakan || si === S.nama) return;
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
