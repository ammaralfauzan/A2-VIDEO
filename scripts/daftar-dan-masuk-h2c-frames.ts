// Frame kunci "Daftar dan Masuk Akun H2C" dihitung dari timing suara (termasuk frame di tengah transisi).
import {sg, TOTAL_FRAMES, wf} from '../src/data/timeline-daftar-dan-masuk-h2c';
import {CURSOR_KEYS, P, SCREENS} from '../src/scenes/daftar-dan-masuk-h2c/layout';

for (let i = 1; i < CURSOR_KEYS.length; i++) {
  if (CURSOR_KEYS[i].f <= CURSOR_KEYS[i - 1].f) throw new Error(`Titik kursor ${i} tidak berurutan (${CURSOR_KEYS[i - 1].f} -> ${CURSOR_KEYS[i].f})`);
}
for (let i = 1; i < SCREENS.length; i++) {
  if (SCREENS[i][0] <= SCREENS[i - 1][0]) throw new Error(`Layar ${i} tidak berurutan`);
}

const frames: [string, number][] = [
  ['01-hook-judul', 40],
  ['01a-hook-pita', P.hookRibbon + 20],
  ['01b-hook-ke-layar-tengah', P.frameIn + 6],
  ['02-beranda-kursor', sg(3) + 10],
  ['03-bagian1-tengah', P.sec1[0] + 5],
  ['03b-bagian1', P.sec1[0] + 30],
  ['04-klik-daftar', P.clickDaftar1],
  ['04b-ke-form-tengah', P.clickDaftar1 + 8],
  ['05-ketik-nama', P.clickNama + 20],
  ['05b-ketik-email', P.clickEmail + 30],
  ['06-password-titik', P.clickPass + 36],
  ['06b-ikon-mata', P.clickEye + 8],
  ['07-klik-daftar2', P.clickDaftar2 + 1],
  ['07b-kode-notif', P.notif + 12],
  ['08-tab-email-tengah', P.clickTabMail + 7],
  ['08b-kotak-masuk', P.clickItem - 6],
  ['08c-surat-terbuka', P.clickItem + 20],
  ['08d-spam', P.spam + 6],
  ['09-lihat-kode', P.copyTo + 6],
  ['09b-kembali-h2c-tengah', P.clickTabH2C + 7],
  ['09c-ketik-kode', Math.round((P.digitsFrom + P.digitsTo) / 2)],
  ['09d-kode-penuh', P.digitsTo + 10],
  ['10-selesai-tengah', P.done[0] + 5],
  ['10b-selesai', P.done[0] + 30],
  ['11-bagian2', P.sec2[0] + 30],
  ['11b-masuk-layar', P.sec2[1] + 12],
  ['12-masuk-email', P.clickMEmail + 20],
  ['12b-masuk-password', P.clickMPass + 22],
  ['12c-klik-masuk', P.clickMasuk + 1],
  ['13-akun-tengah', P.clickMasuk + 8],
  ['13b-akun-chip', P.chipLangsung + 12],
  ['14-penutup-tengah', P.outro + 8],
  ['14a-penutup-promo', wf(27, 8) + 8],
  ['14b-penutup-tombol', wf(27, 10) + 20],
  ['14c-akhir', TOTAL_FRAMES - 4],
];
console.log(JSON.stringify(frames));
