// Frame kunci "Umroh 10 Juta" dihitung dari timing suara (termasuk frame di tengah transisi).
import {TOTAL_FRAMES} from '../src/data/timeline-umroh-10-juta';
import {P} from '../src/scenes/umroh-10-juta/layout';

const frames: [string, number][] = [
  ['01-hook-awal', 2],
  ['01a-hook-judul', 30],
  ['01b-hook-apa', P.apa + 14],
  ['01c-hook-bisa', P.bisa + 14],
  ['01d-ke-layar-tengah', P.hookOut + 5],
  ['02-layar', P.phone[0] + 40],
  ['02b-chip-500', P.chip500 + 16],
  ['03-kartu-tingkat', P.coins + 24],
  ['03b-kupon', P.coupon + 24],
  ['04-kupon-tengah', P.couponCenter + 8],
  ['04b-gratis', P.stamp + 16],
  ['05-tabungan', P.fair[0] + 20],
  ['05b-utuh', P.utuh + 16],
  ['05c-hadiah', P.hadiah + 20],
  ['05d-halal', P.halal + 10],
  ['06-empat-undian', P.tiers[0] + 40],
  ['06a-silver', P.tierWin[0] + 16],
  ['06b-silver-ke-gold', P.tierOn[1] + 5],
  ['06c-gold', P.tierWin[1] + 16],
  ['06d-platinum', P.tierWin[2] + 16],
  ['06e-diamond-dp', P.tierDp[3] + 12],
  ['06f-diamond', P.diamondPulse + 6],
  ['07-syarat', P.syarat2 + 16],
  ['08-teaser', P.teaserChip + 20],
  ['08b-titik', P.dots[4] + 8],
  ['09-penutup-tengah', P.outro + 10],
  ['09a-promo', P.promo + 14],
  ['09b-tombol', P.btn + 24],
  ['09c-akhir', TOTAL_FRAMES - 4],
];
console.log(JSON.stringify(frames));
