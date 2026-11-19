// Komposisi "Alasan Saya Bikin A2" (AlasanSayaBikinA2), 1080x1920, 30 fps.
// Teks: *kata* = kata kunci (tebal). | = pindah ke potongan teks berikutnya (maks. 6 kata per potongan).
// Waktu dari vo-timing-alasan-saya-bikin-a2.json (suara asli, tidak dipercepat).
import voTiming from './vo-timing-alasan-saya-bikin-a2.json';
import type {Chunk, Word} from './timeline-satu-pesanan';

export const FPS = 30;

// Teks layar ("A2" ditulis A2, diucapkan "A Dua").
export const SENTENCES = [
  'Ini *alasan* saya mulai A2.',
  'Dulu saya sering lihat|pemilik usaha pulang *larut.*',
  'Bukan karena *sepi,*|tapi karena *mengetik* *ulang*|hal yang *sama.*',
  'Lama-lama saya *sadar,*|yang habis bukan cuma *tenaga.*',
  '*Waktu* untuk keluarga|dan untuk berpikir ikut *habis.*',
  'Saya *pikir,*|pekerjaan yang *berulang* ini|biar dikerjakan *mesin.*',
  'Orangnya fokus ke yang butuh *manusia.*',
  'Jadi ini bukan sekadar *optimasi* *bisnis.*',
  'Ada *alasan* di *baliknya,*|dan alasan itu|*kebersamaan* *keluarga.*',
  'Itu sebabnya A2 Automation hadir untuk membantu Anda.',
] as const;

export const S = {
  hook: 0,
  lihat: 1,
  ketik: 2,
  sadar: 3,
  waktu: 4,
  pikir: 5,
  manusia: 6,
  bukan: 7,
  alasan: 8,
  penutup: 9,
} as const;

type Timing = {mulai: number; selesai: number; potongan?: {mulai: number; selesai: number}[]}[];
const measured = (voTiming as {kalimat: Timing}).kalimat;
if (measured.length !== SENTENCES.length) throw new Error('Jumlah kalimat timing VO tidak cocok dengan naskah');
export const SENTENCE_TIMES = measured.map((k) => ({start: k.mulai, end: k.selesai}));
export const AUDIO_END = (voTiming as {durasi: number}).durasi;

export const sf = (i: number) => Math.round(SENTENCE_TIMES[i].start * FPS);
export const ef = (i: number) => Math.round(SENTENCE_TIMES[i].end * FPS);

// Suara 35,63 dtk (MP3 Jefri v4 dari Bos) + logo diam ±4,6 dtk.
export const TOTAL_FRAMES = Math.ceil((AUDIO_END + 4.6) * FPS);

const syllables = (w: string) => Math.max(1, (w.toLowerCase().match(/[aiueo]+/g) || []).length);
// "A2" diucapkan "A Dua" (3 suku kata).
const weight = (w: string) => {
  const t = w.replace(/\*/g, '');
  return (/A2/.test(t) ? 3 : syllables(t)) + (/,$/.test(t) ? 0.8 : 0);
};

const spread = (words: string[], start: number, end: number): Word[] => {
  const weights = words.map(weight);
  const total = weights.reduce((a, b) => a + b, 0);
  let acc = 0;
  return words.map((w, k) => {
    const f = Math.round((start + ((end - start) * acc) / total) * FPS);
    acc += weights[k];
    return {text: w.replace(/\*/g, ''), bold: w.startsWith('*'), f};
  });
};

// Kalimat penutup tidak ditampilkan sebagai teks: logo yang "mengucapkannya".
export const CHUNKS: Chunk[] = (() => {
  const chunks: Chunk[] = [];
  SENTENCES.forEach((s, si) => {
    if (si === S.penutup) return;
    const {start, end} = SENTENCE_TIMES[si];
    const parts = s.split('|').map((p) => p.split(/\s+/).filter(Boolean));
    const pot = measured[si].potongan;
    if (pot && pot.length === parts.length) {
      parts.forEach((p, k) => {
        const words = spread(p, pot[k].mulai, pot[k].selesai);
        chunks.push({words, from: words[0].f, to: 0, sentence: si});
      });
      return;
    }
    const all = spread(parts.flat(), start, end);
    let k = 0;
    for (const p of parts) {
      const words = all.slice(k, k + p.length);
      k += p.length;
      chunks.push({words, from: words[0].f, to: 0, sentence: si});
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

// Frame saat kata ke-n (0-based) dalam kalimat i diucapkan.
export const wf = (i: number, n: number) => CHUNKS.filter((c) => c.sentence === i).flatMap((c) => c.words)[n].f;
