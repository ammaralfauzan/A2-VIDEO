import {S, sf, wf} from '../../data/timeline-manual-template-otomatis';

// Zona 9:16 (area aman x 60–900, y 220–1500), dari atas ke bawah: judul kecil, panel contoh tugas
// (kartu / rantai), tangga tiga anak tangga dengan Gigi di atas anak tangga aktif, teks kinetik.
export const TITLE_TOP = 232;
export const TEXT_BOX = {left: 180, width: 720, top: 1110};

export const PANEL = {left: 180, width: 720, top: 330};

// Tangga: tiga blok 240 lebar, sama dasar, makin tinggi ke kanan.
export const STEP = {left: 180, w: 240, base: 1050, heights: [130, 240, 350]};
export const stepTop = (i: number) => STEP.base - STEP.heights[i];
export const stepCx = (i: number) => STEP.left + STEP.w * i + STEP.w / 2;

export const GIGI_SIZE = 100;
// Pusat Gigi saat berdiri melayang di atas anak tangga i.
export const gigiAt = (i: number) => ({x: stepCx(i), y: stepTop(i) - GIGI_SIZE / 2 - 8, size: GIGI_SIZE});

// Rantai PEMICU, ATURAN, TINDAKAN (tingkat 3).
export const NODE = {w: 200, h: 100, gap: 60, top: 330};
export const nodeLeft = (k: number) => PANEL.left + k * (NODE.w + NODE.gap);
export const FLOW = {top: 452, w: NODE.w, h: 80};

// Kartu tugas (adegan "pilih satu tugas"): menempel di atas kolom anak tangga, ikut naik satu tingkat.
export const TASK = {w: 232, h: 80, tops: [700, 590]};

// Sisipan B-roll (klip Bos B1..B5). Klip belum dilampirkan saat BANGUN, jadi daftar kosong.
// Titik sisip yang direncanakan (naskah): B1 ±6,5–11 dtk (sf(unggah)-4), B2 ±17,5–23 dtk (sf(t2)),
// B3 ±28,5–34 dtk (wf(contoh,3)), B4 ±34–39 dtk (sf(tercatat)), B5 ±40–45 dtk (sf(tidak)).
// Isi {src: 'broll/manual-b1.mp4', from, to, shift?} bila klip sudah ada; Tangga menyingkir di bawahnya.
export const BROLL_CLIPS: {src: string; from: number; to: number; shift?: number}[] = [];
export const BROLL_PLAN = {
  b1: [sf(S.unggah) - 4, sf(S.balas) + 20],
  b2: [sf(S.t2) - 4, wf(S.kalender, 5) + 20],
  b3: [wf(S.contoh, 3) - 6, sf(S.tercatat) + 6],
  b4: [sf(S.tercatat) + 6, sf(S.terkirim) + 20],
  b5: [sf(S.pilih) - 4, wf(S.pilih, 8) + 20],
};

// Fase, semua dari timing suara.
export const P = {
  stepIn: [4, 14, 24],
  label: (k: number) => wf(S.tiga, [3, 4, 6][k]) - 4, // "manual," "template," "otomatis."
  tier: [sf(S.t1) - 6, sf(S.t2) - 6, sf(S.t3) - 6],
  // tingkat 1
  t1In: () => sf(S.t1) - 4,
  t1Card: (k: number) => [wf(S.unggah, 0), sf(S.balas), sf(S.salin)][k] - 4,
  t1Out: () => sf(S.t2) - 12,
  // tingkat 2
  t2In: () => sf(S.t2) - 4,
  t2Card: (k: number) => [wf(S.kalender, 0), wf(S.kalender, 2), wf(S.kalender, 5)][k] - 4,
  t2Short: () => wf(S.singkat, 2) - 4, // "singkat,"
  t2Check: () => wf(S.singkat, 5) - 2, // "konsisten."
  t2Btn: () => wf(S.kirim, 4) - 2, // "membuka"
  t2Press: () => wf(S.kirim, 6), // "menekan"
  t2Out: () => sf(S.t3) - 12,
  // tingkat 3
  t3In: () => sf(S.t3) - 4,
  node: (k: number) => wf(S.bagian, [3, 4, 6][k]) - 4,
  flowIn: () => wf(S.contoh, 3) - 4, // "mengisi"
  flowMove: (k: number) => [wf(S.contoh, 3), sf(S.tercatat), sf(S.terkirim)][k] - 2,
  chip: (k: number) => [wf(S.tercatat, 2), wf(S.terkirim, 2)][k] - 2,
  flowOut: () => sf(S.laporan) - 2,
  report: () => sf(S.laporan) + 6,
  t3Out: () => sf(S.tidak) - 10,
  // pilih satu tugas, naik satu tingkat
  task: () => sf(S.tidak) + 22,
  taskUp: () => wf(S.pilih, 8) - 2, // "naik"
  taskArrow: () => wf(S.pilih, 8) - 8,
  // ajakan komentar
  taskOut: () => sf(S.tugasmu) - 14,
  compose: () => sf(S.tugasmu) - 2,
  cycle: () => wf(S.tugasmu, 3), // "dan di tingkat berapa": anak tangga menyala bergantian
  bubble: () => wf(S.komentar, 0) - 2,
};
