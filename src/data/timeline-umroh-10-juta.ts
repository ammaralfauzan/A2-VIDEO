// Komposisi "Umroh 10 Juta" (Umroh10Juta), 1080x1920, 30 fps, brand H2C Umroh, jalur 2D motion.
// Waktu dari vo-timing-umroh-10-juta.json (MP3 Jefri dari Bos 27 Nov 2026, tidak dipercepat): 32 potongan ucapan.
// Teks layar per potongan: *kata* = kata kunci (emas). | = pindah ke potongan teks berikutnya (maks. 6 kata).
import voTiming from './vo-timing-umroh-10-juta.json';

export const FPS = 30;

type Pot = {mulai: number; selesai: number; teks: string};
type Timing = {durasi: number; potongan: Pot[]};
const T = voTiming as Timing;
const POT: Pot[] = T.potongan;

export const SEG_TEXT = [
  'Kamu mau *umroh*|*sepuluh* *juta?*',
  'Apa, *sepuluh* *juta?!*',
  'Iya, *sepuluh* *juta.*',
  '*Bisa!*',
  'Kamu berkesempatan|umroh *sepuluh* *juta,*|hanya dengan *menabung*|baru di *H2C,*|minimal *lima* *ratus*|*ribu* rupiah!',
  'Ada *empat* *pemenang* undian.',
  'Syaratnya cuma *satu:*',
  '*menabung* di platform|umroh *H2C.*',
  'Ikut undiannya *gratis.*',
  'Tabungan semua jamaah|*tidak* *ada* yang *dikurangi.*',
  'Pemenang murni|mendapat *hadiah,*|tanpa *memotong* tabungan|jamaah yang lain.',
  'Dan ini *halal.*',
  'Ada *empat* *undian,*|sesuai *tabunganmu.*',
  'Menabung *lima* *ratus* *ribu,*|masuk undian *Silver.*',
  'Kalau *menang,*',
  'umroh cukup|*dua* *puluh* *juta.*',
  'Menabung *satu* *juta,*|masuk undian *Gold.*',
  'Kalau *menang,*',
  'umroh cukup|*lima* *belas* *juta.*',
  'Menabung *dua* *setengah* *juta,*|masuk undian *Platinum.*',
  'Kalau *menang,*',
  'umroh cukup *dua* *belas*|*setengah* *juta.*',
  'Menabung *lima* *juta,*|masuk undian *Diamond.*',
  'Kalau *menang,*',
  'umroh cukup|*sepuluh* *juta!*',
  'Berlaku bagi yang|*belum* mengambil|paket umroh *2027.*',
  '*Penasaran* caranya?',
  'Tunggu video kami|*selanjutnya.*',
  'Kami tunjukkan *langkahnya*|*satu* *per* *satu.*',
  'Tunggu *apalagi?*',
  'Segera ambil|*paket* *promo*|sesuai pilihan dan|kemampuan antum.',
  'Kunjungi|umroh.h2c.or.id',
] as const;

if (POT.length !== SEG_TEXT.length) throw new Error('Jumlah potongan timing VO tidak cocok dengan teks layar');
export const AUDIO_END = T.durasi;

export const sg = (i: number) => Math.round(POT[i].mulai * FPS);
export const eg = (i: number) => Math.round(POT[i].selesai * FPS);

// Suara 73,09 dtk + logo diam ±1 dtk.
export const TOTAL_FRAMES = Math.ceil((AUDIO_END + 1) * FPS);

const syllables = (w: string) => Math.max(1, (w.toLowerCase().match(/[aiueo]+/g) || []).length);
const weight = (w: string) => {
  const t = w.replace(/\*/g, '');
  if (/H2C/.test(t)) return 4; // "Ha dua Ce"
  if (/2027/.test(t)) return 8; // "dua ribu dua puluh tujuh"
  if (/umroh\.h2c/.test(t)) return 13;
  return syllables(t) + (/[,:]$/.test(t) ? 0.8 : 0);
};

export type Word = {text: string; bold: boolean; f: number};
const WORDS: Word[][] = SEG_TEXT.map((s, i) => {
  const ws = s.split('|').flatMap((p) => p.split(/\s+/).filter(Boolean));
  const w = ws.map(weight);
  const total = w.reduce((a, b) => a + b, 0);
  let acc = 0;
  return ws.map((x, k) => {
    const f = Math.round((POT[i].mulai + ((POT[i].selesai - POT[i].mulai) * acc) / total) * FPS);
    acc += w[k];
    return {text: x.replace(/\*/g, ''), bold: x.startsWith('*'), f};
  });
});

// Frame saat kata ke-n (0-based) dalam potongan i diucapkan.
export const wf = (i: number, n: number) => WORDS[i][n].f;

export type Chunk = {words: Word[]; from: number; to: number};
// Potongan teks URL tidak ditampilkan sebagai teks: tombol emas yang "mengucapkannya".
export const CHUNKS: Chunk[] = (() => {
  const out: {words: Word[]; seg: number}[] = [];
  SEG_TEXT.forEach((s, i) => {
    let k = 0;
    for (const p of s.split('|')) {
      const n = p.split(/\s+/).filter(Boolean).length;
      if (!/umroh\.h2c/.test(p)) out.push({words: WORDS[i].slice(k, k + n), seg: i});
      k += n;
    }
  });
  return out.map((c, j) => {
    const from = c.words[0].f - 3;
    const next = out[j + 1];
    const hold = eg(c.seg) + 14;
    const to = next ? Math.min(next.words[0].f - 4, Math.max(hold, c.words[c.words.length - 1].f + 12)) : hold;
    return {words: c.words, from, to: Math.max(to, from + 10)};
  });
})();
