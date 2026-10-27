import React from 'react';
import {interpolate} from 'remotion';
import {clamp, ease, sp, textIn} from '../../components/motion';
import {S, sf, wf} from '../../data/timeline-satu-pesanan';
import {color, font, radius} from '../../theme';
import {GRID, P, tilePos} from './layout';

const TOTAL = GRID.cols * GRID.rows;
const DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

// Ubin kecil berisi pola 7 titik = satu pesanan dengan 7 langkahnya.
const Tile: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <div
    style={{
      position: 'absolute',
      left: x - GRID.tile / 2,
      top: y - GRID.tile / 2,
      width: GRID.tile,
      height: GRID.tile,
      borderRadius: 12,
      background: color.surface,
      border: `1px solid ${color.line}`,
      boxShadow: '0 6px 16px rgba(11,22,48,0.08)',
      opacity: p,
      transform: `scale(${0.6 + 0.4 * p})`,
    }}
  >
    <svg width={GRID.tile} height={GRID.tile} viewBox="0 0 60 60">
      <path d="M14 18 H46 V32 H14 V46 H30" fill="none" stroke={color.line} strokeWidth={2} />
      {[
        [14, 18],
        [30, 18],
        [46, 18],
        [46, 32],
        [30, 32],
        [14, 32],
        [30, 46],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={4} fill={color.navy} />
      ))}
    </svg>
  </div>
);

// 50 pesanan x 7 langkah = 350 langkah (contoh), lalu "Setiap hari." menyalakan 7 hari.
export const Hitung: React.FC<{f: number}> = ({f}) => {
  const start = P.grid();
  if (f < start || f > P.pile() + 12) return null;
  const fillFrom = start + 8;
  const fillTo = wf(S.hitung, 5); // "pesanan,"
  const shown = Math.round(interpolate(f, [fillFrom, fillTo], [1, TOTAL], {...clamp, easing: ease}));
  const countTo = wf(S.hitung, 7); // "tiga"
  const count = Math.round(interpolate(f, [fillFrom, countTo + 12], [7, 350], {...clamp, easing: ease}));
  const out = interpolate(f, [sf(S.rajin), sf(S.rajin) + 10], [1, 0], clamp);
  const daysAt = sf(S.setiapHari);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: out, zIndex: 8}}>
      {Array.from({length: TOTAL}, (_, k) => {
        if (k >= shown) return null;
        const at = fillFrom + ((fillTo - fillFrom) * k) / TOTAL;
        const {x, y} = tilePos(k);
        return <Tile key={k} x={x} y={y} p={k === 0 ? 1 : sp(f, at, 8)} />;
      })}
      <div style={{position: 'absolute', left: 0, width: 1080, top: 680, textAlign: 'center', fontFamily: font.family, ...textIn(f, fillFrom)}}>
        <div style={{fontSize: 150, fontWeight: 600, color: color.navy, letterSpacing: '-0.03em', lineHeight: 1, fontVariantNumeric: 'tabular-nums'}}>{count}</div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, marginTop: 10}}>
          <span style={{fontSize: 40, fontWeight: 500, color: color.navy}}>langkah</span>
          <span style={{fontSize: 22, color: color.muted, border: `1px solid ${color.line}`, borderRadius: radius.pill, padding: '4px 14px'}}>contoh</span>
        </div>
      </div>
      {f >= daysAt ? (
        <div style={{position: 'absolute', left: 0, width: 1080, top: 898, display: 'flex', justifyContent: 'center', gap: 10, ...textIn(f, daysAt)}}>
          {DAYS.map((d, i) => {
            const on = sp(f, daysAt + 3 + i * 3, 8);
            return (
              <div
                key={d}
                style={{
                  width: 84,
                  height: 56,
                  borderRadius: radius.pill,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: font.family,
                  fontSize: 24,
                  fontWeight: 600,
                  background: on > 0.5 ? color.navy : color.surface,
                  color: on > 0.5 ? color.surface : color.muted,
                  border: `1px solid ${on > 0.5 ? color.navy : color.line}`,
                }}
              >
                {d}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
