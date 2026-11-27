import {eg, sg, wf} from '../../data/timeline-umroh-10-juta';

// Semua fase adegan dihitung dari timing suara (grafis muncul ±4 frame sebelum kata pemicunya).
// Zona: panggung visual x 180-900, y 240-1270; teks besar (caption) y 1310-1500. Area aman 9:16 x 60-900, y 220-1500.
export const CAPTION_BOX = {x: 180, y: 1310, w: 720, h: 190};

export const TIERS = [
  {name: 'Silver', dp: 'Rp500.000', dpShort: '500 rb', win: 'Rp20.000.000', seg: 13},
  {name: 'Gold', dp: 'Rp1.000.000', dpShort: '1 jt', win: 'Rp15.000.000', seg: 16},
  {name: 'Platinum', dp: 'Rp2.500.000', dpShort: '2,5 jt', win: 'Rp12.500.000', seg: 19},
  {name: 'Diamond', dp: 'Rp5.000.000', dpShort: '5 jt', win: 'Rp10.000.000', seg: 22},
] as const;

export const P = {
  // hook: batu + "10 JUTA"
  titleIn: 4,
  apa: sg(1) - 2,
  iya: sg(2) - 2,
  bisa: sg(3) - 3,
  hookOut: sg(4) - 6,
  // layar H2C (replika)
  phone: [sg(4) + 2, sg(5) - 4] as [number, number],
  chip500: wf(4, 12) - 4,
  // empat kartu tingkat + koin pemenang + kupon
  row: [sg(5) - 4, sg(8) + 2] as [number, number],
  coins: wf(5, 2) - 4,
  coupon: sg(7) - 4,
  // gratis: kupon ke tengah, cap
  couponCenter: sg(8) - 4,
  stamp: wf(8, 2) - 3,
  couponOut: sg(9) - 6,
  // tabungan utuh vs hadiah terpisah, halal
  fair: [sg(9) - 4, sg(12) - 6] as [number, number],
  utuh: wf(9, 6) - 4,
  hadiah: wf(10, 3) - 4,
  halal: wf(11, 2) - 4,
  // detail tingkat
  tiers: [sg(12) - 4, sg(25) - 6] as [number, number],
  tierOn: TIERS.map((t) => sg(t.seg) - 4),
  tierDp: TIERS.map((t) => wf(t.seg, 1) - 4),
  tierWin: TIERS.map((t) => wf(t.seg + 2, 2) - 4),
  diamondPulse: wf(24, 2) - 2,
  // syarat
  syarat: [sg(25) - 4, sg(26) - 6] as [number, number],
  syarat2: wf(25, 3) - 4,
  // isyarat Video 2
  teaser: [sg(26) - 4, sg(29) - 6] as [number, number],
  teaserChip: sg(27) - 4,
  dots: [0, 1, 2, 3, 4].map((k) => Math.round(wf(28, 3) - 4 + ((eg(28) - 14 - wf(28, 3)) * k) / 4)),
  // penutup
  outro: sg(29) - 6,
  promo: wf(30, 2) - 4,
  btn: sg(31) - 4,
};
