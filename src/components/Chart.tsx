import React from 'react';
import {color, font} from '../theme';

type Props = {
  width: number;
  height: number;
  labels: string[];
  values: number[];
  max: number;
  progress: number; // 0..1, garis menggambar dirinya
};

// Grafik garis sederhana; garis memakai gradasi aksen.
export const Chart: React.FC<Props> = ({width, height, labels, values, max, progress}) => {
  const padB = 44;
  const plotH = height - padB;
  const step = width / (values.length - 1);
  const pts = values.map((v, i) => [i * step, plotH - (v / max) * (plotH - 24)] as const);
  const d = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  let length = 0;
  for (let i = 1; i < pts.length; i++) length += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  const shownIdx = Math.floor(progress * (values.length - 1) + 0.001);
  return (
    <svg width={width} height={height} style={{overflow: 'visible'}}>
      <defs>
        <linearGradient id="chartLine" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor={color.blue1} />
          <stop offset="100%" stopColor={color.blue2} />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((t) => (
        <line key={t} x1={0} x2={width} y1={plotH - t * (plotH - 24)} y2={plotH - t * (plotH - 24)} stroke={color.line} strokeWidth={2} />
      ))}
      <line x1={0} x2={width} y1={plotH} y2={plotH} stroke={color.line} strokeWidth={2} />
      <path
        d={d}
        fill="none"
        stroke="url(#chartLine)"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={length}
        strokeDashoffset={length * (1 - progress)}
      />
      {pts.map(([x, y], i) =>
        i <= shownIdx && progress > 0 ? <circle key={i} cx={x} cy={y} r={8} fill={color.surface} stroke={color.blue2} strokeWidth={4} /> : null,
      )}
      {labels.map((l, i) => (
        <text
          key={l}
          x={i * step}
          y={height - 6}
          textAnchor={i === 0 ? 'start' : i === labels.length - 1 ? 'end' : 'middle'}
          fontFamily={font.family}
          fontSize={font.label}
          fill={color.muted}
        >
          {l}
        </text>
      ))}
    </svg>
  );
};
