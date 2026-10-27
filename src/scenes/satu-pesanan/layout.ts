import {IconBell, IconChart, IconChat, IconClipboard, IconReceipt, IconSend, IconTable} from '../../components/Icons';
import {S, sf, wf} from '../../data/timeline-satu-pesanan';

// Area visual 9:16 (di atas teks kinetik), di dalam area aman x 180–900.
export const VIS = {cx: 540, top: 260, bottom: 1060};
export const TEXT_BOX = {left: 180, width: 720, top: 1110};

export const STEPS = [
  {Icon: IconChat, label: 'Balas chat'},
  {Icon: IconTable, label: 'Catat'},
  {Icon: IconReceipt, label: 'Invoice'},
  {Icon: IconSend, label: 'Kirim'},
  {Icon: IconBell, label: 'Ingatkan'},
  {Icon: IconClipboard, label: 'Rekap'},
  {Icon: IconChart, label: 'Laporan'},
];

export const NODE = 110;

// Fase tata letak simpul langkah.
export const P = {
  chipIn: () => wf(S.pesanan, 1),
  badge7: () => wf(S.tujuh, 3),
  stepIn: (i: number) => sf(S.step1 + i),
  grid: () => sf(S.hitung),
  pile: () => sf(S.banyak),
  ring: () => sf(S.sambung) + 8,
  compact: () => sf(S.otomatis),
  out: () => sf(S.manusia),
};

// Pohon berliku: 3 + 3 + 1, chip pesanan di atasnya.
export const CHIP_TOP = {x: 540, y: 300};
export const TREE = [
  {x: 300, y: 450},
  {x: 540, y: 450},
  {x: 780, y: 450},
  {x: 780, y: 660},
  {x: 540, y: 660},
  {x: 300, y: 660},
  {x: 540, y: 870},
];

// Tumpukan berantakan di sekitar Gigi.
export const PILE = [
  {x: 330, y: 470, r: -14},
  {x: 520, y: 400, r: 9},
  {x: 720, y: 470, r: -6},
  {x: 800, y: 660, r: 16},
  {x: 300, y: 690, r: 11},
  {x: 640, y: 850, r: -18},
  {x: 430, y: 880, r: 7},
];

export const HUB = {x: 540, y: 640, r: 250};
export const HUB_COMPACT = {x: 560, y: 420, r: 150, scale: 0.62};
export const ringPos = (i: number, c: {x: number; y: number; r: number}) => {
  const a = -Math.PI / 2 + (i / STEPS.length) * Math.PI * 2;
  return {x: c.x + Math.cos(a) * c.r, y: c.y + Math.sin(a) * c.r};
};

// Grid 10 x 5 ubin (50 pesanan) untuk adegan hitung.
export const GRID = {cols: 10, rows: 5, tile: 60, gap: 12, top: 300};
export const gridLeft = () => VIS.cx - (GRID.cols * GRID.tile + (GRID.cols - 1) * GRID.gap) / 2;
export const tilePos = (k: number) => ({
  x: gridLeft() + (k % GRID.cols) * (GRID.tile + GRID.gap) + GRID.tile / 2,
  y: GRID.top + Math.floor(k / GRID.cols) * (GRID.tile + GRID.gap) + GRID.tile / 2,
});
