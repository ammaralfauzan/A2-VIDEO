// Komposisi "Cara Checkout Paket Hajar Aswad" (CheckoutHajarAswad), 1080x1920, 30 fps, brand H2C Umroh.
// Waktu dari vo-timing-checkout-hajar-aswad.json (MP3 Jefri dari Bos 28 Nov 2026, tidak dipercepat), per kata.
// Setiap titik adegan = kata pemicu yang dicari berurutan di transkrip (tahan terhadap angka ditulis sebagai digit).
import voTiming from './vo-timing-checkout-hajar-aswad.json';

export const FPS = 30;

type Kata = {w: string; s: number; e: number};
const T = voTiming as {durasi: number; kata: Kata[]};
const W = T.kata;
const norm = (x: string) => x.toLowerCase().replace(/[^a-z0-9]/g, '');
const N = W.map((k) => norm(k.w));

// Cari kata (atau salah satu alternatif) mulai dari indeks `from`. Alternatif dipisah '/'.
const find = (alt: string, from: number): number => {
  const opts = alt.split('/').map(norm);
  for (let i = from; i < N.length; i++) if (opts.some((o) => N[i] === o || (o.length > 3 && N[i].startsWith(o)))) return i;
  throw new Error(`Kata pemicu "${alt}" tidak ditemukan di timing VO (mulai kata ${from})`);
};

// Urutan pemicu sesuai naskah. Nilai = indeks kata.
const ORDER = [
  ['hook', 'mau'],
  ['harga', 'harga'],
  ['langkah', 'lima/5'],
  ['satu', 'satu/1'],
  ['masuk', 'masuk'],
  ['paket', 'paket'],
  ['dua', 'dua/2'],
  ['standar', 'standar'],
  ['premium', 'premium'],
  ['tingkat', 'tingkat'],
  ['silver', 'silver'],
  ['gold', 'gold'],
  ['platinum', 'platinum'],
  ['diamond', 'diamond'],
  ['tiga', 'tiga/3'],
  ['jamaah', 'jemaah/jamaah'],
  ['bayar', 'bayar'],
  ['whatsapp', 'whatsapp/wa'],
  ['empat', 'empat/4'],
  ['checkout', 'checkout/check'],
  ['sisanya', 'sisanya'],
  ['sepuluh', 'sepuluh/10/10000/10rb'],
  ['lima', 'lima/5'],
  ['terbayar', 'terbayar'],
  ['dicek', 'dicek/dicheck'],
  ['kode', 'kode'],
  ['pesanan', 'pesanan'],
  ['simpan', 'simpan'],
  ['pemenang', 'pemenang'],
  ['januari', 'januari'],
  ['bebas', 'bebas'],
  ['promo', 'promo'],
  ['reguler', 'reguler'],
  ['bintang', 'bintang'],
  ['berangkat', 'keberangkatan/berangkat'],
  ['ingin', 'ingin'],
  ['ikuti', 'ikuti'],
  ['yuk', 'yuk'],
  ['kunjungi', 'kunjungi'],
] as const;
type Key = (typeof ORDER)[number][0];

const IDX = (() => {
  const m = {} as Record<Key, number>;
  let at = 0;
  for (const [k, alt] of ORDER) {
    at = find(alt, at);
    m[k] = at;
    at += 1;
  }
  return m;
})();

// Frame mulai / selesai kata pemicu.
export const s = (k: Key) => Math.round(W[IDX[k]].s * FPS);
export const e = (k: Key) => Math.round(W[IDX[k]].e * FPS);
// Frame kata ke-n sesudah pemicu (mis. "Hajar" dalam "pilih Hajar Aswad").
export const sn = (k: Key, n: number) => Math.round(W[Math.min(W.length - 1, IDX[k] + n)].s * FPS);

export const AUDIO_END = T.durasi;
// Suara + logo diam ±1,2 dtk.
export const TOTAL_FRAMES = Math.ceil((AUDIO_END + 1.2) * FPS);

// Subtitle: kata asli dari transkrip, dipotong di tanda baca atau tiap 6 kata. Kata kunci emas.
const KUNCI = /^(hajar|aswad|lima|langkah|satu|dua|tiga|empat|paket|standar|premium|silver|gold|platinum|diamond|dp|bayar|whatsapp|checkout|sepuluh|ribu|kode|kupon|pesanan|simpan|januari|2027|1|reguler|sembilan|bintang|promo|promonya|semua|umroh)$/;
export type Kata2 = {text: string; f: number; bold: boolean};
export type Sub = {words: Kata2[]; from: number; to: number};
export const SUBS: Sub[] = (() => {
  const out: Kata2[][] = [];
  let cur: Kata2[] = [];
  W.forEach((k, i) => {
    const t = /umroh\.h2c/.test(k.w) ? 'umroh.h2c.or.id' : k.w.replace(/[.,!?]+$/, '').replace(/^DP-nya$/, 'DP-nya');
    cur.push({text: t, f: Math.round(k.s * FPS), bold: KUNCI.test(norm(k.w.replace(/-nya$/, '')))});
    const end = /[.,!?]$/.test(k.w);
    // potong di tanda baca; potong karena panjang (6 kata) hanya bila kata berikutnya bukan akhir kalimat (boleh 7)
    const nextEnds = i + 1 < W.length && /[.,!?]$/.test(W[i + 1].w);
    if (end || (cur.length >= 6 && !nextEnds) || cur.length >= 7 || i === W.length - 1) {
      out.push(cur);
      cur = [];
    }
  });
  // potongan satu kata digabung ke potongan sebelumnya (atau berikutnya) agar tidak berkedip
  const merged: Kata2[][] = [];
  for (let i = 0; i < out.length; i++) {
    const prev = merged[merged.length - 1];
    const akhirKalimat = out[i].length === 1 && /[.!?]$/.test(W.find((k) => Math.round(k.s * FPS) === out[i][0].f)?.w ?? '');
    if (akhirKalimat && prev && prev.length < 7) prev.push(...out[i]);
    else if (out[i].length === 1 && i + 1 < out.length && out[i + 1].length < 6) out[i + 1] = [...out[i], ...out[i + 1]];
    else merged.push(out[i]);
  }
  return merged.map((ws, j) => {
    const from = ws[0].f - 3;
    const last = W.findIndex((k) => Math.round(k.s * FPS) === ws[ws.length - 1].f);
    const hold = Math.round(W[Math.max(0, last)].e * FPS) + 10;
    const next = merged[j + 1];
    const to = next ? Math.min(next[0].f - 4, hold + 20) : hold + 20;
    return {words: ws, from, to: Math.max(to, from + 12)};
  });
})();
