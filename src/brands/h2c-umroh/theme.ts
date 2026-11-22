// Token visual H2C Umroh / H2C Wisata Mandiri (kode: h2c-umroh). STATUS: menunggu persetujuan Bos.
// Sumber: repo h2c-umroh, app/globals.css (:root) dan app/landing.css (judul hero .hx-* / .st-*),
// plus hijau limau dari logo (public/logo.jpeg). Berbeda dari kit `h2c` (situs Wakaf: #06140C, emas #F6C56B, Fraunces).
// Jangan menambah warna di luar daftar ini.
export const U = {
  bg: '#0A1F17', // --emerald-950: latar utama
  bg2: '#0E2A1F', // --emerald-900
  surface: '#123B2A', // --emerald-800: kartu
  surface2: '#1B4E38', // --emerald-700
  ivory: '#F4EFE1', // --ivory-100: teks utama
  ivory2: '#E9E2CD', // --ivory-200: teks isi
  sage: '#9FB3A6', // --sage-300: teks redup, label
  gold: '#D4AF6A', // --gold-400: aksen, tombol
  goldLight: '#E3C78C', // --gold-300: angka, sorotan
  goldDeep: '#B8872F', // --gold-600
  leaf: '#8CC63F', // --leaf-400: hijau limau logo (aksen kecil, titik, garis kemajuan)
  leafLight: '#B5E36B', // --leaf-300
  goldLine: 'rgba(212, 175, 106, .30)',
  goldSoft: 'rgba(212, 175, 106, .12)',
  line: 'rgba(244, 239, 225, .14)',
  ribbonInk: '#FFF8EA',
} as const;

export const UF = {
  script: '"Great Vibes", cursive', // baris skrip di atas judul
  big: '"Anton", Impact, sans-serif', // judul kapital tegak rapat, isi emas bergradasi
  display: '"Amiri", Georgia, serif', // judul kecil / angka harga
  text: '"Plus Jakarta Sans", sans-serif', // teks, label, tombol
} as const;

// Judul besar (.hx-big / .st-big): gradasi gading ke emas, dari atas ke bawah, diulang per baris
// (backgroundSize '100% .9em' bila judul lebih dari satu baris, seperti .st-big di situs).
export const BIG_GRADIENT = 'linear-gradient(180deg, #FFFAF0 10%, #F3E3C0 55%, #D4AF6A 100%)';
// Pita emas miring (.hx-ribbon / .st-ribbon).
export const RIBBON = {
  background: 'linear-gradient(90deg, #C18A36, #D9AB5B 55%, #B67D2C)',
  borderRadius: '6px 14px 6px 14px',
  transform: 'rotate(-2deg)',
  color: U.ribbonInk,
  boxShadow: '0 14px 30px -12px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.3)',
} as const;
// Garis kemajuan / aksen: emas ke limau (.steps-track, .hl-bars).
export const GOLD_LEAF = `linear-gradient(90deg, ${U.gold}, ${U.leaf})`;

export const UR = {card: 44, chip: 999, btn: 999, box: 24} as const;

// Kartu: zamrud pekat, garis emas tipis, bayangan lembut. Tanpa backdrop-filter.
export const CARD = {
  background: U.surface,
  border: `2px solid ${U.goldLine}`,
  borderRadius: UR.card,
  boxShadow: '0 40px 100px -40px rgba(0,0,0,.6)',
} as const;
// Tombol utama (.btn-gold): pill emas rata, teks zamrud.
export const BTN = {
  background: U.gold,
  color: U.bg,
  borderRadius: UR.btn,
} as const;
