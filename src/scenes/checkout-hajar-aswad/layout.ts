import {e, s, sn, TOTAL_FRAMES} from '../../data/timeline-checkout-hajar-aswad';

// Tata letak "Cara Checkout Paket Hajar Aswad": seluruh bingkai = tampilan mobile web umroh.h2c.or.id (replika).
// Area aman 9:16: x 60-900, y 220-1500. Kolom isi x 150-900 (tengah 525).
// Zona: kepala situs y 236-336, jalur 5 langkah y 362-430, panggung y 460-1290, label 1-3 kata y 1330-1470.
export const COL = {x: 150, w: 750, cx: 525} as const;
export const HEADER = {y: 236, h: 100} as const;
export const TRACK = {y: 396, x0: 225, gap: 150, r: 30} as const; // pusat titik langkah k: x0 + k*gap
export const STAGE = {y: 460, h: 830} as const;
export const LABEL = {x: 150, y: 1330, w: 750, h: 140} as const;

export const TIERS = [
  {id: 'silver', name: 'Silver', dp: 'Rp500 rb'},
  {id: 'gold', name: 'Gold', dp: 'Rp1 jt'},
  {id: 'platinum', name: 'Platinum', dp: 'Rp2,5 jt'},
  {id: 'diamond', name: 'Diamond', dp: 'Rp5 jt'},
] as const;
// warna tepi lencana (components/IkonTingkat.tsx di repo h2c-umroh)
export const TIER_RIM = ['#8dd3f6', '#ffd24a', '#c4e84a', '#c286e3'] as const;

// Jadwal (frame global), semua dari kata pemicu di suara.
export const P = {
  titleIn: 4,
  cards: s('harga') - 4,
  ribbon: s('harga') + 2,
  dots: [0, 1, 2, 3, 4].map((k) => s('langkah') + k * 5),
  hook: [0, s('satu') - 6] as [number, number],

  step1: [s('satu') - 6, s('dua') - 6] as [number, number],
  type1: s('satu') + 10,
  tapMasuk: s('masuk') + 6,
  drawer: s('masuk') + 18,
  tapPaket: s('paket') + 3,

  step2: [s('dua') - 6, s('tiga') - 6] as [number, number],
  standar: s('standar') - 3,
  premium: s('premium') - 3,
  tapStandar: e('premium') + 4,
  detail: e('premium') + 12,
  tingkat: s('tingkat') - 4,
  tierOn: [s('silver'), s('gold'), s('platinum'), s('diamond')].map((x) => x - 3),

  step3: [s('tiga') - 6, s('empat') - 6] as [number, number],
  tapPlus: s('jamaah') + 4,
  tapDp: s('bayar') - 2,
  tapWa: s('whatsapp') - 2,

  step4: [s('empat') - 6, s('lima') - 6] as [number, number],
  tapCheckout: s('checkout') + 4,
  paid: s('checkout') + 18,
  sisa: s('sisanya') - 3,
  cicil: s('sepuluh') - 3,

  step5: [s('lima') - 6, s('pemenang') - 6] as [number, number],
  dicek: s('dicek') - 2,
  kode: s('kode') - 2,
  pesanan: s('pesanan') - 3,
  simpan: s('simpan') - 2,

  umum: [s('pemenang') - 6, s('ikuti') - 6] as [number, number],
  januari: s('januari') - 6,
  bebas: s('bebas') - 4,
  promo: sn('bebas', 3) - 3,
  reguler: s('reguler') - 3,
  bintang: s('bintang') - 3,
  berangkat: s('berangkat') - 3,

  semua: [s('ikuti') - 6, s('kunjungi') - 6] as [number, number],
  outro: s('kunjungi') - 6,
  btn: s('kunjungi') + 8,
  end: TOTAL_FRAMES,
};

// Langkah aktif (0 = pembuka, 1-5 = langkah, 6 = sesudah langkah).
export const STEP_STARTS = [P.step1[0], P.step2[0], P.step3[0], P.step4[0], P.step5[0], P.umum[0]];
export const stepAt = (f: number) => STEP_STARTS.reduce((acc, at, i) => (f >= at ? i + 1 : acc), 0);

// Ketukan (titik emas, bukan tangan): [frame, x, y].
export const TAPS: [number, number, number][] = [
  [P.tapMasuk, COL.cx, 1000],
  [P.tapPaket, 700, 760],
  [P.tapStandar, 335, 900],
  [P.tapPlus, 806, 694],
  [P.tapDp, 232, 853],
  [P.tapWa, 700, 1022],
  [P.tapCheckout, COL.cx + 220, 888],
  [P.simpan, 800, 1040],
];

// Label 1-3 kata di bawah panggung, mengikuti kata yang diucapkan.
export const LABELS: [number, string][] = [
  [P.ribbon, 'Harga spesial'],
  [s('langkah') - 3, '5 langkah'],
  [s('masuk') - 3, 'Masuk'],
  [s('paket') - 3, 'Paket'],
  [P.standar, 'Standar'],
  [P.premium, 'Premium'],
  [P.tierOn[0], 'Silver'],
  [P.tierOn[1], 'Gold'],
  [P.tierOn[2], 'Platinum'],
  [P.tierOn[3], 'Diamond'],
  [s('jamaah') - 3, 'Jamaah'],
  [P.tapDp, 'Bayar DP'],
  [P.tapWa, 'WhatsApp'],
  [P.tapCheckout - 6, 'Checkout'],
  [P.cicil, 'mulai Rp10.000'],
  [P.kode, 'Kode kupon'],
  [P.simpan, 'Simpan'],
  [P.januari, '1 Januari 2027'],
  [P.bebas, 'Bebas pilih'],
  [P.berangkat, 'Berangkat 2027'],
  [s('ikuti') - 3, 'Semua tingkat'],
];
// Label berhenti tampil di titik-titik ini (pergantian adegan).
export const LABEL_CUTS = [P.step1[0], P.step2[0], P.step3[0], P.step4[0], P.step5[0], P.umum[0], P.semua[0], P.outro];
