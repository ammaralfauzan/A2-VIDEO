// Token visual dari situs Wakaf H2C (h2c-wakaf/public/assets/css/style.css), diskalakan untuk 1080x1920.
// Palet: hijau hutan malam, emas matahari terbit, krem hangat. Jangan menambah warna di luar daftar ini.
export const W = {
  bg: '#06140C',
  bg2: '#0A1C11',
  bg3: '#0E2616',
  bgDeep: '#040D08',
  cream: '#F7EFDD',
  cream2: 'rgba(247, 239, 221, .78)',
  cream3: 'rgba(247, 239, 221, .56)',
  gold: '#F6C56B',
  gold2: '#E39A34',
  goldSoft: 'rgba(246, 197, 107, .12)',
  goldLine: 'rgba(246, 197, 107, .36)',
  line: 'rgba(255, 233, 190, .14)',
  line2: 'rgba(255, 233, 190, .24)',
  btnInk: '#2E1B05',
} as const;

export const WF = {
  serif: '"Fraunces", Georgia, serif', // judul
  ui: '"Outfit", "Plus Jakarta Sans", sans-serif', // label, angka, tombol
  text: '"Plus Jakarta Sans", sans-serif', // teks
} as const;

// Sorotan judul (.hl): italic emas bergradasi.
export const HL_GRADIENT = `linear-gradient(100deg, #FFE3A6 0%, ${W.gold} 45%, #E9A548 100%)`;
// Tombol aksen (.btn--accent).
export const BTN_GRADIENT = `linear-gradient(180deg, #F9CF7C 0%, ${W.gold2} 100%)`;
// Kartu kaca (.pillar/.callout), dibuat lebih pekat agar terbaca di atas video.
export const GLASS = {
  background: 'linear-gradient(160deg, rgba(16, 42, 25, .82) 0%, rgba(6, 20, 12, .88) 100%)',
  border: `2px solid ${W.line}`,
  boxShadow: '0 60px 120px -60px rgba(0, 0, 0, .9), inset 0 2px 0 rgba(255, 240, 210, .10)',
  backdropFilter: 'blur(22px) saturate(130%)',
  WebkitBackdropFilter: 'blur(22px) saturate(130%)',
} as const;
