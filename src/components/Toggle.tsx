import React from 'react';
import {color, gradient, radius} from '../theme';

// progress 0 (OFF) .. 1 (ON); posisi knob mengikuti seretan kursor.
export const Toggle: React.FC<{progress: number}> = ({progress}) => {
  const w = 104;
  const h = 56;
  const knob = 44;
  const travel = w - knob - 12;
  return (
    <div style={{position: 'relative', width: w, height: h, borderRadius: radius.pill, background: color.line}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: radius.pill, background: gradient, opacity: progress}} />
      <div
        style={{
          position: 'absolute',
          top: 6,
          left: 6 + travel * progress,
          width: knob,
          height: knob,
          borderRadius: knob / 2,
          background: color.surface,
          boxShadow: '0 2px 6px rgba(11,22,48,0.18)',
        }}
      />
    </div>
  );
};
