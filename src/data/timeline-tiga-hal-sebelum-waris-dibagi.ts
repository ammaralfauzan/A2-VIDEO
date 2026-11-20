// Komposisi "Tiga Hal Sebelum Waris Dibagi" (TigaHalSebelumWaris), 1080x1920, 30 fps, brand Tams Consulting.
// Teks: *kata* = tebal, ^kata^ = oranye (satu sorotan). | = pindah ke potongan teks berikutnya.
// Waktu dari vo-timing-tiga-hal-sebelum-waris-dibagi.json (suara asli Bos, tidak dipercepat).
import voTiming from './vo-timing-tiga-hal-sebelum-waris-dibagi.json';

export const FPS = 30;

export const SENTENCES = [
  'Harta almarhum ^belum^ boleh dibagi.',
  'Ada yang harus beres *dulu.*',
  'Bayangkan seluruh *harta* itu satu blok,|yang mengalir turun melewati *tiga* gerbang.',
  '*Gerbang* *pertama:*|biaya perawatan *jenazah.*',
  'Menurut para ulama,|ini diambil *lebih* *dulu* dari harta almarhum.',
  '*Gerbang* *kedua:*|*utang.*',
  '*Utang* almarhum harus *dilunasi* dulu.',
  'Itu *hak* *orang* *lain,*|bukan bagian ahli waris.',
  '*Gerbang* *ketiga:*|*wasiat.*',
  'Wasiat yang *sah* ditunaikan|sebelum waris dibagi.',
  "Ini ditegaskan *Al-Qur'an,*|surah An-Nisa ayat *sebelas* dan *dua* belas.",
  'Baru setelah *ketiganya* beres,|sisanya sampai ke *ahli* waris.',
  '*Urutannya:*|perawatan jenazah,|utang,|wasiat,|lalu *waris.*',
  'Waris bukan soal cepat *membagi.*',
  'Tapi soal *membagi* dengan *benar,*|dan urutan yang *tepat.*',
] as const;

export const S = {
  harta: 0, beres: 1, bayangkan: 2, g1: 3, ulama: 4, g2: 5, utang: 6, hak: 7, g3: 8, wasiat: 9, ayat: 10, baru: 11, urutan: 12, bukan: 13, tapi: 14,
} as const;

type Seg = {mulai: number; selesai: number; kata: number};
type Timing = {mulai: number; selesai: number; segmen: Seg[]}[];
const measured = (voTiming as {kalimat: Timing}).kalimat;
if (measured.length !== SENTENCES.length) throw new Error('Jumlah kalimat timing VO tidak cocok dengan naskah');
export const AUDIO_END = (voTiming as {durasi: number}).durasi;

export const sf = (i: number) => Math.round(measured[i].mulai * FPS);
export const ef = (i: number) => Math.round(measured[i].selesai * FPS);

// Suara 56,53 dtk + logo diam 2 dtk (suara tidak dipercepat).
export const TOTAL_FRAMES = Math.ceil((AUDIO_END + 2) * FPS);

export type Word = {text: string; bold: boolean; orange: boolean; f: number};
export type Chunk = {words: Word[]; from: number; to: number; sentence: number};

const syllables = (w: string) => Math.max(1, (w.toLowerCase().match(/[aiueo]+/g) || []).length);
const clean = (w: string) => w.replace(/[*^]/g, '');
const weight = (w: string) => syllables(clean(w)) + (/,[*^]?$/.test(w) ? 0.8 : 0);

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

const WORDS: Word[][] = SENTENCES.map((s, si) => {
  const all = s.split('|').flatMap((p) => p.split(/\s+/).filter(Boolean));
  const segs = measured[si].segmen;
  const n = segs.reduce((a, g) => a + g.kata, 0);
  if (n !== all.length) throw new Error(`Kalimat ${si}: jumlah kata segmen (${n}) != naskah (${all.length})`);
  const out: Word[] = [];
  let k = 0;
  for (const g of segs) {
    const ws = all.slice(k, k + g.kata);
    spread(ws, g.mulai, g.selesai).forEach((f, j) => out.push({text: clean(ws[j]), bold: ws[j].startsWith('*'), orange: ws[j].startsWith('^'), f}));
    k += g.kata;
  }
  return out;
});

// Frame saat kata ke-n (0-based) dalam kalimat i diucapkan.
export const wf = (i: number, n: number) => WORDS[i][n].f;

// Teks bawah (subtitle kinetik). Kalimat "Urutannya..." hanya menampilkan kata pertama (daftar ditampilkan visual).
export const CHUNKS: Chunk[] = (() => {
  const chunks: Chunk[] = [];
  SENTENCES.forEach((s, si) => {
    let k = 0;
    s.split('|').forEach((p, pi) => {
      const n = p.split(/\s+/).filter(Boolean).length;
      const words = WORDS[si].slice(k, k + n);
      k += n;
      if (si === S.urutan && pi > 0) return;
      chunks.push({words, from: words[0].f - 1, to: 0, sentence: si});
    });
  });
  chunks.forEach((c, i) => {
    const next = chunks[i + 1];
    const hardEnd = ef(c.sentence) + 30;
    c.to = next ? Math.min(next.from, Math.max(hardEnd, next.from - 2)) : hardEnd;
  });
  return chunks;
})();
