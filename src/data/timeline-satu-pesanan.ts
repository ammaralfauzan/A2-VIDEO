// Komposisi "Satu Pesanan, Tujuh Langkah" (SatuPesanan), 1080x1920, 30 fps.
// Teks: *kata* = kata kunci (tebal). | = pindah ke potongan teks berikutnya (maks. 6 kata per potongan).
// Waktu kalimat ada di SENTENCE_TIMES (detik). Bila vo-satu-pesanan.mp3 tersedia, isi dari
// vo-timing-satu-pesanan.json; jika belum, dipakai perkiraan dari jumlah suku kata.
import voTiming from './vo-timing-satu-pesanan.json';

export const FPS = 30;

export const SENTENCES = [
  'Satu *pesanan* masuk.',
  'Tim Anda mengerjakan *tujuh* *langkah.*',
  'Balas *chat.*',
  'Catat di *spreadsheet.*',
  'Buat *invoice.*',
  '*Kirim.*',
  'Ingatkan *pembayaran.*',
  '*Rekap.*',
  'Susun *laporan.*',
  'Kalau sehari ada *lima* *puluh* pesanan,|itu *tiga* *ratus* *lima* *puluh* *langkah.*',
  '*Setiap* *hari.*',
  'Masalahnya bukan tim Anda kurang *rajin.*',
  'Langkahnya yang *terlalu* *banyak.*',
  '*A2* *Automation* menyambungkan *semuanya.*',
  'Pesanan *masuk,*|invoice terbit *sendiri,*|pengingat terkirim *sendiri,*|laporan tersusun *sendiri.*',
  'Tim Anda cukup mengurus|yang butuh *manusia.*',
  'Menjawab pertanyaan *sulit.*',
  'Menjaga *pelanggan.*',
  'Mau tahu langkah mana|di bisnis Anda yang bisa *otomatis?*',
  'A2 Automation.',
  'Konsultasi gratis di a2automate.com.',
] as const;

export const S = {
  pesanan: 0,
  tujuh: 1,
  step1: 2, // langkah 1..7 = kalimat 2..8
  hitung: 9,
  setiapHari: 10,
  rajin: 11,
  banyak: 12,
  sambung: 13,
  otomatis: 14,
  manusia: 15,
  sulit: 16,
  pelanggan: 17,
  tanya: 18,
  logo: 19,
  ajakan: 20,
} as const;

const syllables = (w: string) => Math.max(1, (w.toLowerCase().match(/[aiueo]+/g) || []).length);

// Perkiraan bila belum ada audio: ±0,18 dtk per suku kata, jeda 0,35 dtk antarkalimat.
const estimate = () => {
  const out: {start: number; end: number}[] = [];
  let t = 0.3;
  for (const s of SENTENCES) {
    const words = s.replace(/[*|]/g, ' ').split(/\s+/).filter(Boolean);
    const syl = words.reduce((a, w) => a + syllables(w) + (/[,]$/.test(w) ? 0.8 : 0), 0);
    const d = Math.max(0.7, syl * 0.18);
    out.push({start: t, end: t + d});
    t += d + (/[?]/.test(s) ? 0.6 : 0.35);
  }
  return out;
};

type Timing = {mulai: number; selesai: number}[];
const measured = (voTiming as {kalimat: Timing}).kalimat;
export const HAS_AUDIO = measured.length === SENTENCES.length;
export const SENTENCE_TIMES = HAS_AUDIO ? measured.map((k) => ({start: k.mulai, end: k.selesai})) : estimate();

export const sf = (i: number) => Math.round(SENTENCE_TIMES[i].start * FPS); // frame awal kalimat
export const ef = (i: number) => Math.round(SENTENCE_TIMES[i].end * FPS); // frame akhir kalimat

export const TOTAL_FRAMES = Math.ceil((SENTENCE_TIMES[SENTENCE_TIMES.length - 1].end + 1.6) * FPS);

export type Word = {text: string; bold: boolean; f: number};
export type Chunk = {words: Word[]; from: number; to: number; sentence: number};

// Kata per kata: waktu tiap kata dibagi rata menurut jumlah suku katanya di dalam kalimat.
export const CHUNKS: Chunk[] = (() => {
  const chunks: Chunk[] = [];
  SENTENCES.forEach((s, si) => {
    const {start, end} = SENTENCE_TIMES[si];
    const parts = s.split('|').map((p) => p.split(/\s+/).filter(Boolean));
    const all = parts.flat();
    const weights = all.map((w) => syllables(w.replace(/\*/g, '')) + (/,\*?$/.test(w) ? 0.8 : 0));
    const total = weights.reduce((a, b) => a + b, 0);
    let acc = 0;
    let k = 0;
    for (const p of parts) {
      const words: Word[] = p.map((w) => {
        const f = Math.round((start + ((end - start) * acc) / total) * FPS);
        acc += weights[k++];
        return {text: w.replace(/\*/g, ''), bold: w.startsWith('*'), f};
      });
      chunks.push({words, from: words[0].f, to: 0, sentence: si});
    }
  });
  // Potongan tampil sampai potongan berikutnya mulai (maks. 1,2 dtk setelah kalimatnya selesai).
  chunks.forEach((c, i) => {
    const next = chunks[i + 1];
    const hardEnd = ef(c.sentence) + 36;
    c.to = next ? Math.min(next.from, Math.max(hardEnd, next.from - 2)) : TOTAL_FRAMES;
  });
  return chunks;
})();

// Frame saat kata ke-n (0-based) dalam kalimat i diucapkan.
export const wf = (i: number, n: number) => CHUNKS.filter((c) => c.sentence === i).flatMap((c) => c.words)[n].f;
