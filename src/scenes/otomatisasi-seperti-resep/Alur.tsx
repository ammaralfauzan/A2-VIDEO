import React from 'react';
import {interpolate} from 'remotion';
import {clamp, ease, sp, textIn} from '../../components/motion';
import {color, font, radius, shadow} from '../../theme';
import {NodeBolt, NodeData, NodeSteps, Stroke} from './art';
import {brollOn} from './Broll';
import {NODE, P, ROW_TOP, ROW_TOP_FLOW} from './layout';

// Baris simpul alur kerja: PEMICU -> BAHAN -> LANGKAH. Tiap simpul "terbang" dari ilustrasinya
// (gelembung, tiga bahan, tiga langkah) ke slotnya, lalu label muncul.
const rowTop = (f: number) => interpolate(f, [P.rowDown, P.rowDown + 16], [ROW_TOP, ROW_TOP_FLOW], {...clamp, easing: ease});
const center = (i: number, f: number) => ({x: NODE.lefts[i] + NODE.w / 2, y: rowTop(f) + NODE.h / 2});

const SPEC = [
  {label: 'PEMICU', icon: <NodeBolt />, fly: () => P.flyPemicu, labelAt: () => P.labelPemicu, from: {x: 330, y: 805, s: 0.3}},
  {label: 'BAHAN', icon: <NodeData />, fly: () => P.flyBahan, labelAt: () => P.labelBahan, from: {x: 540, y: 760, s: 0.5}},
  {label: 'LANGKAH', icon: <NodeSteps />, fly: () => P.flyLangkah, labelAt: () => P.labelLangkah, from: {x: 540, y: 760, s: 0.5}},
];

const Node: React.FC<{i: number; f: number}> = ({i, f}) => {
  const s = SPEC[i];
  const at = s.fly();
  if (f < at) return null;
  const p = interpolate(f, [at, at + 20], [0, 1], {...clamp, easing: ease});
  const c = center(i, f);
  const dx = (1 - p) * (s.from.x - c.x);
  const dy = (1 - p) * (s.from.y - c.y);
  const sc = s.from.s + (1 - s.from.s) * p;
  const pulse = P.pulse[i];
  const pu = interpolate(f, [pulse, pulse + 22], [0, 1], clamp);
  const hot = f >= pulse && pu < 1;
  return (
    <div
      style={{
        position: 'absolute',
        left: NODE.lefts[i],
        top: rowTop(f),
        width: NODE.w,
        height: NODE.h,
        transform: `translate(${dx}px, ${dy}px) scale(${sc})`,
        opacity: interpolate(p, [0, 0.35], [0, 1], clamp),
      }}
    >
      {hot ? (
        <div style={{position: 'absolute', inset: -pu * 14, borderRadius: radius.card + 6, border: `3px solid ${color.blue1}`, opacity: 0.6 * (1 - pu)}} />
      ) : null}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: color.surface,
          border: `2px solid ${hot ? color.blue1 : color.line}`,
          borderRadius: radius.card,
          boxShadow: shadow,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
        }}
      >
        {s.icon}
        <div style={{fontFamily: font.family, fontWeight: 600, fontSize: 28, letterSpacing: '0.08em', color: color.navy, ...textIn(f, s.labelAt())}}>{s.label}</div>
      </div>
    </div>
  );
};

export const Alur: React.FC<{f: number}> = ({f}) => {
  const on = brollOn(f);
  const out = interpolate(f, [P.rowOut, P.rowOut + 8], [1, 0], clamp);
  if (f < SPEC[0].fly() || out <= 0) return null;
  const top = rowTop(f);
  const cy = top + NODE.h / 2;
  const arrows = [0, 1].map((i) => {
    const x0 = NODE.lefts[i] + NODE.w + 8;
    const x1 = NODE.lefts[i + 1] - 8;
    return {x0, x1, p: interpolate(f, [P.arrows[i], P.arrows[i] + 12], [0, 1], clamp)};
  });
  // titik bergerak di panah: bergantian panah 1 lalu panah 2, berulang.
  const loop = 56;
  const u = ((f - P.dots) % loop) / loop;
  const dotAt = f >= P.dots ? (u < 0.5 ? {a: arrows[0], k: u / 0.5} : {a: arrows[1], k: (u - 0.5) / 0.5}) : null;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: (1 - on) * out}}>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
        {arrows.map((a, i) => (
          <g key={i}>
            <Stroke p={a.p} d={`M${a.x0} ${cy} H${a.x1}`} w={4} stroke={color.navy} />
            <Stroke p={interpolate(a.p, [0.7, 1], [0, 1], clamp)} d={`M${a.x1 - 12} ${cy - 10} L${a.x1} ${cy} L${a.x1 - 12} ${cy + 10}`} w={4} stroke={color.navy} />
          </g>
        ))}
        {dotAt ? (
          <circle
            cx={dotAt.a.x0 + (dotAt.a.x1 - dotAt.a.x0 - 4) * dotAt.k}
            cy={cy}
            r={10}
            fill={color.blue1}
            opacity={Math.sin(dotAt.k * Math.PI) * interpolate(f, [P.dots, P.dots + 8], [0, 1], clamp)}
          />
        ) : null}
      </svg>
      {[0, 1, 2].map((i) => (
        <Node key={i} i={i} f={f} />
      ))}
    </div>
  );
};
void sp;
