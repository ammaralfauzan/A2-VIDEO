// Komposisi "Tiga Salah Kaprah soal Otomatisasi" (TigaSalahKaprah), 1080x1920, 30 fps.
// Teks: *kata* = kata kunci (tebal). | = pindah ke potongan teks berikutnya (maks. 6 kata per potongan).
// Waktu dari vo-timing-tiga-salah-kaprah-otomatisasi.json (suara asli Bos, tidak dipercepat).
// Tiap kalimat punya `segmen` (ucapan di antara jeda) + jumlah kata layar di dalamnya; kata disebar
// menurut suku kata hanya di dalam segmennya, jadi kata setelah jeda tetap jatuh tepat.
import voTiming from './vo-timing-tiga-salah-kaprah-otomatisasi.json';
import type {Chunk, Word} from './timeline-satu-pesanan';

export const FPS = 30;

// Teks layar ("A2" ditulis A2, diucapkan "A Dua").
export const SENTENCES = [
  'Tiga hal ini|bikin orang *takut* otomatisasi.',
  'Padahal, *belum* *tentu* *benar.*',
  'Pertama, katanya|harus *jago* *teknis.*',
  'Faktanya, *tidak.*|Cukup paham *alur* *kerja* Anda sendiri.|Bagian teknisnya bisa *dibantu.*',
  'Kedua, katanya otomatisasi|*menggantikan* *karyawan.*',
  'Faktanya, yang diganti|pekerjaan *berulangnya,*|*bukan* *orangnya.*|Tim jadi punya waktu untuk *pelanggan.*',
  'Ketiga, katanya harus diubah|semua *sekaligus.*',
  'Faktanya, bisa mulai dari|*satu* pekerjaan kecil dulu.|Setelah terasa *ringan,*|baru tambah *pelan-pelan.*',
  'Jadi, kalau boleh pilih satu,|pekerjaan apa yang ingin|Anda lepas *duluan?*',
  'A2 Automation. Konsultasi gratis di a2automate.com.',
] as const;

export const S = {
  hook: 0,
  padahal: 1,
  mitos1: 2,
  fakta1: 3,
  mitos2: 4,
  fakta2: 5,
  mitos3: 6,
  fakta3: 7,
  tanya: 8,
  ajakan: 9,
} as const;

type Seg = {mulai: number; selesai: number; kata: number};
type Timing = {mulai: number; selesai: number; segmen: Seg[]}[];
const measured = (voTiming as {kalimat: Timing}).kalimat;
if (measured.length !== SENTENCES.length) throw new Error('Jumlah kalimat timing VO tidak cocok dengan naskah');
export const AUDIO_END = (voTiming as {durasi: number}).durasi;

export const sf = (i: number) => Math.round(measured[i].mulai * FPS);
export const ef = (i: number) => Math.round(measured[i].selesai * FPS);

// Suara 44,51 dtk + logo dan ajakan diam ±2 dtk (suara tidak dipercepat).
export const TOTAL_FRAMES = Math.ceil((AUDIO_END + 2) * FPS);

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
