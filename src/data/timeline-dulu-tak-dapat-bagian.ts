// Komposisi "Siapa yang Menentukan Bagian Waris?" (DuluTakDapatBagian, slug dulu-tak-dapat-bagian), 1080x1920, 30 fps, Tams Consulting.
// Teks: *kata* = tebal, ^kata^ = oranye (satu sorotan), ~kata = lafaz penghormatan (lebih kecil, abu). | = potongan teks berikutnya.
// Waktu dari vo-timing-dulu-tak-dapat-bagian.json (suara asli Bos, tidak dipercepat).
import voTiming from './vo-timing-dulu-tak-dapat-bagian.json';

export const FPS = 30;

export const SENTENCES = [
  'Siapa yang berhak *menentukan*|bagian ^waris^ dalam keluarga?',
  "*Jabir* *bin* *Abdullah* ~radhiyallahu ~'anhu|pernah *sakit* *parah,*|sampai tidak sadarkan diri.",
  "*Rasulullah* ~shallallahu ~'alaihi ~wa ~sallam|datang menjenguk bersama|*Abu* *Bakar* ~radhiyallahu ~'anhu.",
  'Beliau *berwudhu,*|lalu memercikkan airnya kepadanya,|hingga ia ^sadar.^',
  'Ia bertanya kepada beliau:|apa yang harus aku lakukan|dengan ^hartaku?^',
  'Lalu turun *ayat* *waris,*|surah ^An-Nisa^ ^ayat^ ^sebelas.^',
  'Di surah yang sama,|ayat tujuh menegaskan:|^perempuan^ juga punya *hak* *bagian.*',
  'Bagian itu sudah ^ditetapkan,^|sedikit atau banyak hartanya.',
  'Jadi waris bukan soal|*kebiasaan* *keluarga.*',
  "Waris adalah *ketetapan* ^Allah^ ~subhanahu ~wa ~ta'ala.",
] as const;

export const S = {
  hook: 0, jabir: 1, jenguk: 2, wudhu: 3, tanya: 4, turun: 5, ayat7: 6, tetap: 7, jadi: 8, waris: 9,
} as const;

type Seg = {mulai: number; selesai: number; kata: number};
type Timing = {mulai: number; selesai: number; segmen: Seg[]}[];
const measured = (voTiming as {kalimat: Timing}).kalimat;
if (measured.length !== SENTENCES.length) throw new Error('Jumlah kalimat timing VO tidak cocok dengan naskah');
export const AUDIO_END = (voTiming as {durasi: number}).durasi;

export const sf = (i: number) => Math.round(measured[i].mulai * FPS);
export const ef = (i: number) => Math.round(measured[i].selesai * FPS);

// Suara 46,11 dtk + logo diam 2 dtk (suara tidak dipercepat).
export const TOTAL_FRAMES = Math.ceil((AUDIO_END + 2) * FPS);

export type Word = {text: string; bold: boolean; orange: boolean; small: boolean; f: number};
export type Chunk = {words: Word[]; from: number; to: number; sentence: number};

const syllables = (w: string) => Math.max(1, (w.toLowerCase().match(/[aiueo]+/g) || []).length);
const clean = (w: string) => w.replace(/[*^~]/g, '');
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
    spread(ws, g.mulai, g.selesai).forEach((f, j) => out.push({text: clean(ws[j]), bold: ws[j].startsWith('*'), orange: ws[j].startsWith('^'), small: ws[j].startsWith('~'), f}));
    k += g.kata;
  }
  return out;
});

// Frame saat kata ke-n (0-based) dalam kalimat i diucapkan.
export const wf = (i: number, n: number) => WORDS[i][n].f;

// Teks bawah (subtitle kinetik), satu potongan per bagian kalimat.
export const CHUNKS: Chunk[] = (() => {
  const chunks: Chunk[] = [];
  SENTENCES.forEach((s, si) => {
    let k = 0;
    s.split('|').forEach((p) => {
      const n = p.split(/\s+/).filter(Boolean).length;
      const words = WORDS[si].slice(k, k + n);
      k += n;
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
