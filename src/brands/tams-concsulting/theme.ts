// Token visual Tams Consulting (kode: tams-concsulting). STATUS: DRAF, belum disetujui Bos.
// Warna diambil langsung dari logo Bos (public/brands/tams-concsulting/): oranye #E55B03, arang #2B2B2B,
// hitam huruf #0A0A0A, putih latar logo #FEFEFE. Jangan menambah warna di luar daftar ini.
export const T = {
  bg: '#FEFEFE', // latar utama = putih latar logo (logo lengkap tampil tanpa kotak)
  bg2: '#F3F3F1', // permukaan kartu terang
  ink: '#0A0A0A', // teks utama = hitam huruf TAMS
  ink2: 'rgba(10, 10, 10, .70)',
  ink3: 'rgba(10, 10, 10, .48)',
  charcoal: '#2B2B2B', // arang lingkaran logo: kartu gelap, panel judul
  onDark: '#FEFEFE', // teks di atas arang/oranye
  onDark2: 'rgba(254, 254, 254, .72)',
  orange: '#E55B03', // oranye logo: aksen, sorotan, tombol
  orangeSoft: 'rgba(229, 91, 3, .12)',
  line: 'rgba(10, 10, 10, .10)',
  line2: 'rgba(10, 10, 10, .20)',
} as const;

export const TF = {
  head: '"Montserrat", sans-serif', // judul dan label (geometris, mendekati huruf logo)
  text: '"Montserrat", sans-serif', // teks (satu keluarga huruf)
} as const;

// Bentuk khas dari logo: bidang oranye dengan SATU sudut membulat besar (kiri atas), sudut lain tegas.
export const leafRadius = (r: number) => `${r}px 4px 4px 4px`;
export const TR = {card: 56, btn: 32, chip: 4} as const;

export const CARD_DARK = {
  background: T.charcoal,
  color: T.onDark,
  borderRadius: leafRadius(TR.card),
} as const;

export const CARD_LIGHT = {
  background: T.bg2,
  border: `2px solid ${T.line}`,
  borderRadius: leafRadius(TR.card),
} as const;
