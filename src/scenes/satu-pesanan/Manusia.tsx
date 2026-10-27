import React from 'react';
import {interpolate} from 'remotion';
import {IconHeart, IconHelp, IconUsers} from '../../components/Icons';
import {clamp, sp} from '../../components/motion';
import {StepNode} from '../../components/StepNode';
import {S, sf} from '../../data/timeline-satu-pesanan';
import {color} from '../../theme';

const TEAM = {x: 540, y: 420};
const KIDS = [
  {x: 330, y: 680, Icon: IconHelp, label: 'Pertanyaan sulit', at: () => sf(S.sulit)},
  {x: 750, y: 680, Icon: IconHeart, label: 'Pelanggan', at: () => sf(S.pelanggan)},
];

// "Tim Anda cukup mengurus yang butuh manusia": simpul tim + dua tugas yang butuh sentuhan manusia.
export const Manusia: React.FC<{f: number}> = ({f}) => {
  const start = sf(S.manusia);
  if (f < start || f > sf(S.tanya) + 12) return null;
  const out = interpolate(f, [sf(S.tanya), sf(S.tanya) + 10], [1, 0], clamp);
  const team = sp(f, start + 4, 12);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: out}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {KIDS.map((k) => {
          const d = interpolate(f, [k.at(), k.at() + 10], [0, 1], clamp);
          if (d <= 0) return null;
          return (
            <line
              key={k.label}
              x1={TEAM.x}
              y1={TEAM.y + 70}
              x2={TEAM.x + (k.x - TEAM.x) * d}
              y2={TEAM.y + 70 + (k.y - 60 - TEAM.y - 70) * d}
              stroke={color.navy}
              strokeWidth={3}
              strokeDasharray="2 10"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      <StepNode
        Icon={IconUsers}
        label="Tim Anda"
        size={150}
        dark
        style={{left: TEAM.x - 75, top: TEAM.y - 75, opacity: team, transform: `scale(${0.6 + 0.4 * team})`}}
      />
      {KIDS.map((k) => {
        const p = sp(f, k.at(), 12);
        if (f < k.at() - 1) return null;
        return <StepNode key={k.label} Icon={k.Icon} label={k.label} size={120} style={{left: k.x - 60, top: k.y - 60, opacity: p, transform: `scale(${0.6 + 0.4 * p})`}} />;
      })}
    </div>
  );
};
