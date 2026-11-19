import {ef, S, sf, wf} from '../../data/timeline-alasan-saya-bikin-a2';

// Zona 9:16 (area aman x 60–900, y 220–1500), dari atas ke bawah: judul kecil, panggung ilustrasi
// cerita, Gigi duduk di atas garis waktu, label titik, teks kinetik. Zona tidak saling menimpa.
export const TITLE_TOP = 268;
// Panggung ilustrasi (koordinat dalam SVG 720 x 340).
export const STAGE = {left: 180, top: 360, w: 720, h: 340};
export const TEXT_BOX = {left: 180, width: 720, top: 1110};

export const LINE = {x0: 180, x1: 900, y: 900};
export const POINTS = [
  {x: 280, label: 'Yang saya lihat'},
  {x: 540, label: 'Yang saya sadari'},
  {x: 800, label: 'Keputusan'},
];
export const LABEL_TOP = LINE.y + 44;

// Lingkaran penutup: panjang garis berubah jadi lingkaran seukuran ujung gigi Gigi.
export const RING = {cx: 540, cy: LINE.y, r: 115};
// Lebar Gigi saat ujung giginya pas di lingkaran (viewBox 160 untuk jari-jari 70).
export const RING_GIGI = Math.round((RING.r * 160) / 70);

// Fase tata letak, semua dari timing suara.
export const P = {
  grow: () => [sf(S.hook) + 2, ef(S.hook) + 4] as [number, number],
  pointIn: (i: number) => [sf(S.lihat), sf(S.sadar), sf(S.pikir)][i] - 4,
  // "mesin": gear Gigi mulai berputar
  mesin: () => wf(S.pikir, 8) - 2,
  connect: () => sf(S.manusia) - 2,
  merge: () => [sf(S.bukan) - 4, sf(S.bukan) + 22] as [number, number],
  ring: () => [ef(S.alasan) + 2, ef(S.alasan) + 28] as [number, number],
  // Panggung ilustrasi muncul setelah Gigi turun ke garis, hilang sebelum garis melingkar.
  stageIn: () => sf(S.lihat) + 6,
  stageOut: () => ef(S.alasan) + 8,
  gigiIn: () => [ef(S.alasan) + 18, ef(S.alasan) + 38] as [number, number],
};
