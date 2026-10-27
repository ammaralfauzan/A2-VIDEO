import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {clamp, sp} from '../../components/motion';
import {StepNode} from '../../components/StepNode';
import {color} from '../../theme';
import {CHIP_TOP, HUB, HUB_COMPACT, NODE, P, PILE, ringPos, STEPS, tilePos, TREE} from './layout';

type St = {x: number; y: number; s: number; r: number; o: number};

// Posisi tiap simpul langkah menurut fase; perpindahan fase memakai spring (tanpa cut).
export const nodeState = (i: number, f: number): St => {
  const tree: St = {...TREE[i], s: 1, r: 0, o: 1};
  const tile = tilePos(0);
  const grid: St = {x: tile.x, y: tile.y, s: 0.12, r: 0, o: 0};
  const pile: St = {x: PILE[i].x, y: PILE[i].y, s: 1, r: PILE[i].r, o: 1};
  const ring: St = {...ringPos(i, HUB), s: 0.92, r: 0, o: 1};
  const compact: St = {...ringPos(i, HUB_COMPACT), s: HUB_COMPACT.scale, r: 0, o: 1};
  const gone: St = {...compact, s: 0.3, o: 0};

  const mix = (a: St, b: St, t: number): St => ({
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    s: a.s + (b.s - a.s) * t,
    r: a.r + (b.r - a.r) * t,
    o: a.o + (b.o - a.o) * t,
  });

  if (f < P.grid()) {
    const t = sp(f, P.stepIn(i), 12);
    return {...tree, s: 0.4 + 0.6 * t, o: interpolate(t, [0, 0.4], [0, 1], clamp)};
  }
  if (f < P.pile()) return mix(tree, grid, sp(f, P.grid() + (6 - i), 14));
  if (f < P.ring()) return mix(grid, pile, sp(f, P.pile() + i * 3, 12));
  if (f < P.compact()) return mix(pile, ring, sp(f, P.ring() + i * 2, 16));
  if (f < P.out()) return mix(ring, compact, sp(f, P.compact(), 16));
  return mix(compact, gone, sp(f, P.out(), 12));
};

// Garis titik-titik antarsimpul pada pohon (chip -> 1 -> 2 -> ... -> 7).
const TreeLinks: React.FC<{f: number}> = ({f}) => {
  if (f >= P.grid() + 14) return null;
  const fade = interpolate(f, [P.grid(), P.grid() + 8], [1, 0], clamp);
  const pts = [CHIP_TOP, ...TREE];
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: fade}}>
      {pts.slice(1).map((b, i) => {
        const a = pts[i];
        const draw = interpolate(f, [P.stepIn(i) - 4, P.stepIn(i) + 6], [0, 1], clamp);
        if (draw <= 0) return null;
        // Garis dimulai dari tepi lingkaran; bila turun ke bawah, mulai setelah label agar tidak menembusnya.
        const len = Math.hypot(b.x - a.x, b.y - a.y);
        const ux = (b.x - a.x) / len;
        const uy = (b.y - a.y) / len;
        const startGap = i === 0 ? 46 : NODE / 2 + (uy > 0.5 ? 64 : 8);
        const sx = a.x + ux * startGap;
        const sy = a.y + uy * startGap;
        const ex = b.x - ux * (NODE / 2 + 8);
        const ey = b.y - uy * (NODE / 2 + 8);
        return (
          <line
            key={i}
            x1={sx}
            y1={sy}
            x2={sx + (ex - sx) * draw}
            y2={sy + (ey - sy) * draw}
            stroke={color.muted}
            strokeOpacity={0.55}
            strokeWidth={3}
            strokeDasharray="2 10"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};

export const LangkahGraph: React.FC<{f: number}> = ({f}) => {
  if (f < P.stepIn(0) - 6 || f > P.out() + 20) return null;
  return (
    <>
      <TreeLinks f={f} />
      {STEPS.map((st, i) => {
        const s = nodeState(i, f);
        if (s.o <= 0.01) return null;
        // Label hanya tampil di pohon; hilang saat simpul menyusut jadi ubin.
        const labelO = interpolate(f, [P.grid(), P.grid() + 6], [1, 0], clamp);
        return (
          <StepNode
            key={st.label}
            Icon={st.Icon}
            label={st.label}
            size={NODE}
            labelOpacity={labelO}
            style={{
              left: s.x - NODE / 2,
              top: s.y - NODE / 2,
              opacity: s.o,
              transform: `rotate(${s.r}deg) scale(${s.s})`,
              zIndex: 10,
            }}
          />
        );
      })}
    </>
  );
};
