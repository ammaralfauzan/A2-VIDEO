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
  ['jamaah', 'jamaah'],
  ['bayar', 'bayar'],
  ['whatsapp', 'whatsapp/wa'],
  ['empat', 'empat/4'],
  ['checkout', 'checkout/check'],
  ['sisanya', 'sisanya'],
  ['sepuluh', 'sepuluh/10/10000/10rb'],
  ['lima', 'lima/5'],
  ['dicek', 'dicek/dicheck'],
  ['kode', 'kode'],
  ['pesanan', 'pesanan'],
  ['simpan', 'simpan'],
  ['pemenang', 'pemenang'],
  ['januari', 'januari'],
  ['bebas', 'bebas'],
  ['reguler', 'reguler'],
  ['bintang', 'bintang'],
  ['berangkat', 'berangkat'],
  ['ikuti', 'ikuti'],
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
