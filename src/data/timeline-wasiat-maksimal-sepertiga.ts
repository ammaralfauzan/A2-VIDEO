// Komposisi "Kenapa Wasiat Dibatasi Sepertiga?" (WasiatMaksimalSepertiga), 1080x1920, 30 fps, brand Tams Consulting.
// Teks: *kata* = tebal, ^kata^ = oranye (satu sorotan). | = pindah ke potongan teks berikutnya.
// Waktu dari vo-timing-wasiat-maksimal-sepertiga.json (suara asli Bos, tidak dipercepat).
import voTiming from './vo-timing-wasiat-maksimal-sepertiga.json';

export const FPS = 30;

export const SENTENCES = [
  'Mau mewasiatkan *semua* harta?',
  'Nabi menjawab:|^jangan.^',
  "Suatu hari, sahabat *Sa'd* *bin* *Abi* *Waqqash*|sakit keras.",
  'Ia bertanya kepada Nabi,|bolehkah mewasiatkan *seluruh* hartanya?',
  'Nabi menjawab:|*tidak.*',
  'Bagaimana kalau *setengah?*|*Tidak.*',
  '^Sepertiga?^',
  'Nabi bersabda:|*sepertiga,*|dan sepertiga itu sudah ^banyak.^',
  'Lalu beliau menjelaskan:|meninggalkan ahli waris dalam keadaan *berkecukupan,*|lebih baik daripada meninggalkan mereka *miskin,*|meminta-minta kepada orang lain.',
  'Hadits ini diriwayatkan *Bukhari* dan *Muslim.*',
  'Jadi, wasiat paling banyak ^sepertiga,^|dari *sisa* *harta* setelah kewajiban almarhum diselesaikan.',
  'Satu lagi.|Nabi bersabda:|*tidak* *ada* wasiat untuk ^ahli^ ^waris.^',
  'Diriwayatkan *Abu* *Dawud* dan *Ibnu* *Majah.*',
  'Sebab ahli waris sudah punya *bagiannya* sendiri.',
  'Batas ini bukan untuk *menahan* kebaikan,|tapi untuk ^menjaga^ keluarga yang ditinggalkan.',
] as const;

export const S = {
  hook: 0, jangan: 1, sad: 2, tanya: 3, tidak: 4, setengah: 5, sepertiga: 6, sabda: 7, jelas: 8, hadits: 9, jadi: 10, satu: 11, abuDawud: 12, sebab: 13, batas: 14,
} as const;

type Seg = {mulai: number; selesai: number; kata: number};
type Timing = {mulai: number; selesai: number; segmen: Seg[]}[];
const measured = (voTiming as {kalimat: Timing}).kalimat;
if (measured.length !== SENTENCES.length) throw new Error('Jumlah kalimat timing VO tidak cocok dengan naskah');
export const AUDIO_END = (voTiming as {durasi: number}).durasi;

export const sf = (i: number) => Math.round(measured[i].mulai * FPS);
export const ef = (i: number) => Math.round(measured[i].selesai * FPS);

// Suara 59,72 dtk + logo diam 2 dtk (suara tidak dipercepat).
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
