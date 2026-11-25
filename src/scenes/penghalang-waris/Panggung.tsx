import React from 'react';
import {interpolate} from 'remotion';
import {clamp} from '../../components/motion';
import {At, Books, pop} from '../wasiat-maksimal-sepertiga/Ilustrasi';
import {Diagram} from './Diagram';
import {P, STAGE} from './layout';

// Panggung ilustrasi (x 180–900, y 620–1190), tanpa kartu latar (revisi 2 Bos): adegan rumah dan benda keluarga, diselingi rak kitab Bukhari-Muslim saat sumber
// disebut. Adegan bergantian (lama memudar 8 frame, baru masuk dengan pegas). Koordinat SVG: x 0 = tengah layar.
type Scene = {from: number; render: (f: number) => React.ReactNode};

const SCENES: Scene[] = [
  {from: 0, render: (f) => <Diagram f={f} />},
  {
    // Sumber: kitab Bukhari dan Muslim di rak.
    from: P.books,
    render: (f) => (
      <>
        <At x={0} y={470} s={0.92}>
          <Books a={pop(f, P.books + 4)} b={pop(f, P.books + 10)} open={Math.min(1, pop(f, P.books + 18))} />
        </At>
      </>
    ),
  },
  {from: P.back, render: (f) => <Diagram f={f} />},
];

export const Panggung: React.FC<{f: number}> = ({f}) => (
  <svg width={STAGE.w} height={STAGE.h} viewBox={`${-STAGE.w / 2} 0 ${STAGE.w} ${STAGE.h}`} style={{position: 'absolute', left: STAGE.x, top: STAGE.y, overflow: 'visible'}}>
    {SCENES.map((sc, i) => {
      const end = i + 1 < SCENES.length ? SCENES[i + 1].from : P.stageOut;
      if (f < sc.from || f >= end) return null;
      const o = interpolate(f, [end - 8, end], [1, 0], clamp) * (i > 0 ? interpolate(f, [sc.from, sc.from + 6], [0, 1], clamp) : 1);
      return (
        <g key={i} opacity={o}>
          {sc.render(f)}
        </g>
      );
    })}
  </svg>
);
