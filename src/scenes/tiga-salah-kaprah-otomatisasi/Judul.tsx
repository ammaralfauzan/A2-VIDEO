import React from 'react';
import {interpolate} from 'remotion';
import {clamp, textIn} from '../../components/motion';
import {color, font} from '../../theme';
import {OUTRO} from './Penutup';
import {TITLE_TOP} from './layout';

// Judul kecil tetap di atas (caption hook "Tiga salah kaprah otomatisasi"), memudar sebelum logo.
export const Judul: React.FC<{f: number}> = ({f}) => {
  const out = interpolate(f, [OUTRO.start - 10, OUTRO.start], [1, 0], clamp);
  if (out <= 0) return null;
  const inn = textIn(f, 4);
  return (
    <div
      style={{
        position: 'absolute',
        left: 180,
        width: 720,
        top: TITLE_TOP,
        display: 'flex',
        justifyContent: 'center',
        ...inn,
        opacity: (inn.opacity as number) * out,
      }}
    >
      <div
        style={{
          fontFamily: font.family,
          fontSize: 36,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: color.navy,
          padding: '10px 26px',
          borderRadius: 999,
          border: `2px solid ${color.line}`,
          background: color.surface,
        }}
      >
        Tiga salah kaprah otomatisasi
      </div>
    </div>
  );
};
