import {interpolate} from 'remotion';
import {clamp, ease} from '../../components/motion';

// Muncul 0->1 dalam `d` frame (ease-out lembut).
export const inP = (f: number, at: number, d = 10) => interpolate(f, [at, at + d], [0, 1], {...clamp, easing: ease});
// Rentang tampil [a, b]: masuk `din` frame, keluar `dout` frame sebelum b.
export const win = (f: number, [a, b]: [number, number], din = 10, dout = 8) =>
  Math.min(inP(f, a, din), interpolate(f, [b - dout, b], [1, 0], clamp));
// Pegas kecil untuk tombol/cap: 0 -> 1.08 -> 1.
export const pop = (f: number, at: number) => interpolate(f, [at, at + 7, at + 12], [0, 1.08, 1], clamp);
// Gaya masuk standar: naik + skala kecil.
export const rise = (p: number, dy = 26): React.CSSProperties => ({opacity: p, transform: `translateY(${(1 - p) * dy}px) scale(${0.96 + 0.04 * p})`});
