// Komposisi "Satu Akun untuk Sekeluarga" (AkunKeluargaH2C), 1080x1920, 30 fps, brand H2C Umroh.
// Waktu dari vo-timing-akun-keluarga-h2c.json (suara asli Bos, tidak dipercepat): 30 potongan ucapan.
// Teks layar per potongan: *kata* = kata kunci (emas). | = pindah ke potongan teks berikutnya (maks. 6 kata).
// Awalan # = potongan tidak ditulis sebagai teks (angka langkah besar yang "mengucapkannya").
// "WhatsApp" di suara ditulis "pesan" di layar (tanpa merek pihak ketiga). Nama, ID, sandi: fiktif, berlabel "contoh".
// Versi 2D memakai timing MP3 lama (commit 1af6d99); vo-timing-akun-keluarga-h2c.json kini milik jalur 3D (MP3 V3).
import voTiming from './vo-timing-akun-keluarga-h2c-2d.json';

export const FPS = 30;

type Pot = {mulai: number; selesai: number; teks: string};
type Timing = {durasi: number; kalimat: {mulai: number; selesai: number; potongan: Pot[]}[]};
const T = voTiming as Timing;
const POT: Pot[] = T.kalimat.flatMap((k) => k.potongan);

export const SEG_TEXT = [
  'Umroh *sekeluarga?*',
  'Cukup *satu* *akun*|kepala keluarga.',
  'Tidak perlu|semua daftar *sendiri.*',
  'Ikuti *empat* *langkahnya* ya,',
  'Bapak, Ibu.',
  '*Pelan-pelan* saja.',
  '#Langkah satu:',
  '*Tambah* *anggota.*',
  'Kepala keluarga buka|halaman *keluarga,*',
  'lalu isi *nama*|dan *sandi* setiap anggota.',
  '*Sandi* itu|*kata* *rahasia.*',
  'Satu akun bisa menampung|sampai *empat* *anggota.*',
  '#Langkah dua:',
  '*Kirim* *ID* dan sandinya.',
  '*Salin* ID keluarga|dan sandi anggota,',
  'lalu *kirim* lewat *pesan.*',
  '#Langkah tiga:',
  '*Anggota* *masuk.*',
  'Pilih masuk dengan|*ID* *keluarga,*',
  'lalu ketik *ID* dan *sandi*|yang dikirim tadi.',
  'Tidak perlu|*daftar* lagi.',
  '#Langkah empat:',
  '*Belikan* *paket.*',
  'Kepala keluarga|memilih *paket* *umroh,*',
  'lalu memilih *nama*|anggota yang dibelikan.',
  'Semua diatur dari|*satu* *akun.*',
  '*Selesai.*',
  '*Satu* *akun,*|untuk seluruh *keluarga.*',
  'Yuk, rencanakan|umroh *sekeluarga.*',
  'Kunjungi|umroh.h2c.or.id',
] as const;

if (POT.length !== SEG_TEXT.length) throw new Error('Jumlah potongan timing VO tidak cocok dengan teks layar');
export const AUDIO_END = T.durasi;

export const sg = (i: number) => Math.round(POT[i].mulai * FPS);
export const eg = (i: number) => Math.round(POT[i].selesai * FPS);

// Suara 61,57 dtk + logo diam ±0,9 dtk (suara tidak dipercepat).
export const TOTAL_FRAMES = Math.ceil((AUDIO_END + 0.9) * FPS);

const syllables = (w: string) => Math.max(1, (w.toLowerCase().match(/[aiueo]+/g) || []).length);
const weight = (w: string) => {
  const t = w.replace(/[*#]/g, '');
  if (/^ID$/.test(t)) return 2; // "i-di"
  if (/umroh\.h2c/.test(t)) return 12;
  return syllables(t) + (/[,:]$/.test(t) ? 0.8 : 0);
};

export type Word = {text: string; bold: boolean; f: number};
const WORDS: Word[][] = SEG_TEXT.map((s, i) => {
  const ws = s.replace(/^#/, '').split('|').flatMap((p) => p.split(/\s+/).filter(Boolean));
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
export const CHUNKS: Chunk[] = (() => {
  const out: {words: Word[]; seg: number}[] = [];
  SEG_TEXT.forEach((s, i) => {
    if (s.startsWith('#')) return;
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
