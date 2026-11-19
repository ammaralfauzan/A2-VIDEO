import {S, sf, wf} from '../../data/timeline-tiga-salah-kaprah-otomatisasi';

// Zona 9:16 (area aman x 60–900, y 220–1500), dari atas ke bawah: judul kecil, baris kartu selesai,
// kartu aktif, Gigi (di bawah kartu, menatap ke atas), teks kinetik. Zona tidak saling menimpa.
export const TITLE_TOP = 268;
export const TEXT_BOX = {left: 180, width: 720, top: 1110};

// Kartu penuh (aktif) dan slot kecil di baris atas (kartu menunggu / kartu FAKTA selesai).
export const CARD = {w: 620, h: 360};
export const CENTER = {x: 540, y: 690};
export const SLOT_SCALE = 0.34;
export const SLOT_Y = 420;
export const SLOTS = [300, 540, 780];

// Gigi melayang di bawah kartu aktif.
export const GIGI = {x: 540, y: 975, size: 140};
export const GIGI_KANAN = {x: 790, y: 975, size: 140}; // mitos 3: memberi tempat kartu tugas kecil

// Kartu tugas kecil (mitos 3), kiri bawah kartu aktif.
export const TASK = {left: 180, w: 470, h: 58, tops: [902, 976]};

// Isi kartu (maks. 6 kata), sama dengan naskah yang disetujui.
export const MYTHS = ['Harus jago teknis', 'Menggantikan karyawan', 'Harus sekaligus'];
export const FACTS = ['Cukup paham alur kerja sendiri', 'Yang diganti pekerjaan berulang, bukan orangnya', 'Mulai dari satu pekerjaan kecil'];

const MITOS = [S.mitos1, S.mitos2, S.mitos3];
const FAKTA = [S.fakta1, S.fakta2, S.fakta3];

// Fase, semua dari timing suara.
export const P = {
  stackIn: 2,
  spread: () => wf(S.padahal, 1) - 4, // "belum tentu benar": tumpukan merenggang
  park: () => sf(S.mitos1) - 30, // kartu 2 dan 3 menunggu di baris atas
  // kartu i maju ke tengah, dibuka (MITOS), dicap, lalu dibalik (FAKTA), kembali ke baris
  advance: (i: number) => (i === 0 ? sf(MITOS[0]) - 12 : sf(MITOS[i]) - 8),
  showMyth: (i: number) => sf(MITOS[i]) - 2,
  stamp: (i: number) => wf(MITOS[i], 3) - 2, // "jago" / "menggantikan" / "diubah"
  flipFact: (i: number) => sf(FAKTA[i]) - 6, // "Faktanya"
  back: (i: number) => (i < 2 ? sf(MITOS[i + 1]) - 26 : sf(S.tanya) - 4),
  task: (k: number) => [wf(S.fakta3, 4) - 4, wf(S.fakta3, 11) - 2][k], // "satu" / "baru tambah"
  taskOut: () => sf(S.tanya) - 8,
  gather: () => sf(S.tanya) + 14, // tiga FAKTA merapat jadi satu baris
  rowOut: () => wf(S.tanya, 5) - 4, // memudar saat "pekerjaan apa"
  ask: () => wf(S.tanya, 5) + 4, // kartu kecil kosong bertanda tanya
};
