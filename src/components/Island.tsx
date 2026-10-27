import React from 'react';
import {interpolate} from 'remotion';
import {color, font, radius} from '../theme';
import {IconCheck} from './Icons';
import {clamp, sp} from './motion';

// Notifikasi bergaya dynamic island: pil kecil yang melebar, lalu menyusut kembali.
export const Island: React.FC<{frame: number; start: number; end: number; text: string; top?: number; centerX?: number}> = ({
  frame,
  start,
  end,
  text,
  top = 22,
  centerX,
}) => {
  if (frame < start - 1 || frame > end + 14) return null;
  const open = sp(frame, start) - sp(frame, end);
  const textOp = interpolate(open, [0.6, 1], [0, 1], clamp);
  const w = 120 + open * 440;
  return (
    <div style={{position: 'absolute', top, left: 0, ...(centerX === undefined ? {right: 0} : {width: centerX * 2}), display: 'flex', justifyContent: 'center', zIndex: 60}}>
      <div
        style={{
          width: w,
          height: 64,
          borderRadius: radius.pill,
          background: color.navyInk,
          opacity: interpolate(open, [0, 0.15], [0, 1], clamp),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
          overflow: 'hidden',
          fontFamily: font.family,
          fontSize: font.ui,
          fontWeight: 600,
          color: color.surface,
          whiteSpace: 'nowrap',
        }}
      >
        <div style={{opacity: textOp, display: 'flex', alignItems: 'center', gap: 14}}>
          <div style={{width: 36, height: 36, borderRadius: 18, background: color.success, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <IconCheck size={22} stroke={color.surface} strokeWidth={2.5} />
          </div>
          {text}
        </div>
      </div>
    </div>
  );
};
