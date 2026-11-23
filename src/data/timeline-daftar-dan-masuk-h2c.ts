// Komposisi "Daftar dan Masuk Akun H2C" (DaftarDanMasukH2C), 1080x1920, 30 fps, brand H2C Umroh.
// Waktu dari vo-timing-daftar-dan-masuk-h2c.json (suara asli Bos, tidak dipercepat): 33 potongan ucapan (naskah versi F).
// Teks layar per potongan: *kata* = kata kunci (emas). | = pindah ke potongan teks berikutnya (maks. 6 kata).
// Di layar "H2C" ditulis H2C (diucapkan "H dua C"); "Gmail" di layar ditulis "email" (tanpa merek pihak ketiga).
import voTiming from './vo-timing-daftar-dan-masuk-h2c.json';

export const FPS = 30;

type Pot = {mulai: number; selesai: number; teks: string};
type Timing = {durasi: number; kalimat: {mulai: number; selesai: number; potongan: Pot[]}[]};
const T = voTiming as Timing;
const POT: Pot[] = T.kalimat.flatMap((k) => k.potongan);

export const SEG_TEXT = [
  'Katanya daftar|*umroh* *online*|itu *ribet?*',
  '*Salah!*',
  'Bapak, Ibu|juga *bisa.*',
  'Ikuti *langkahnya!*',
  'Bagian *satu:*',
  '*daftar.*',
  'Buka situs umroh *H2C.*',
  'Lalu tekan tombol *Daftar.*',
  'Ketik *nama* *lengkap*|Bapak atau Ibu.',
  'Lalu ketik|alamat *email.*',
  'Buat *password,*|yaitu *kata* *rahasia,*',
  'minimal *delapan*|huruf atau angka.',
  'Tekan gambar *mata*|kalau mau melihat|tulisannya.',
  'Lalu tekan *Daftar.*',
  'Nanti ada *kode* *enam* *angka*|dikirim ke email|Bapak atau Ibu.',
  'Buka *email,*|cari surat dari *H2C* *Travel.*',
  'Kalau tidak ada,|lihat di kotak *Spam.*',
  '*Salin* atau *copy*|enam angkanya.',
  'Kembali ke *H2C,*',
  'lalu *tempel* atau|*paste* di kolom kode.',
  '*Selesai!*',
  'Daftar cukup|*sekali* saja.',
  'Bagian *dua:*',
  '*masuk.*',
  'Lain kali,|tidak perlu *kode* lagi.',
  'Ketik *email.*',
  'Lalu ketik *password.*',
  'Tekan *Masuk.*',
  '*Mudah,* kan?',
  'Yuk, Bapak, Ibu,',
  'buat akun *sekarang.*',
  'Lagi ada *promo* *umroh,*',
  'lihat di umroh.h2c.or.id',
] as const;

if (POT.length !== SEG_TEXT.length) throw new Error('Jumlah potongan timing VO tidak cocok dengan teks layar');
export const AUDIO_END = T.durasi;

export const sg = (i: number) => Math.round(POT[i].mulai * FPS);
export const eg = (i: number) => Math.round(POT[i].selesai * FPS);

// Suara 63,79 dtk + logo diam ±0,9 dtk (suara tidak dipercepat).
export const TOTAL_FRAMES = Math.ceil((AUDIO_END + 0.9) * FPS);

const syllables = (w: string) => Math.max(1, (w.toLowerCase().match(/[aiueo]+/g) || []).length);
const weight = (w: string) => {
  const t = w.replace(/\*/g, '');
  if (/H2C/.test(t)) return 4; // "Ha dua Ce"
  if (/umroh\.h2c/.test(t)) return 12;
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
