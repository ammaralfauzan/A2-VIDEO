import React from 'react';
import {color, font, radius, shadow} from '../theme';

// Simpul diagram: ikon garis di lingkaran putih berbayang lembut, label kecil di bawahnya.
export const StepNode: React.FC<{
  Icon: React.FC<{size?: number; stroke?: string; strokeWidth?: number}>;
  label?: string;
  size?: number;
  dark?: boolean;
  style?: React.CSSProperties;
  labelOpacity?: number;
}> = ({Icon, label, size = 120, dark = false, style, labelOpacity = 1}) => (
  <div style={{position: 'absolute', width: size, height: size, ...style}}>
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        background: dark ? color.navy : color.surface,
        boxShadow: shadow,
        border: dark ? 'none' : `1px solid ${color.line}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <Icon size={size * 0.44} stroke={dark ? color.surface : color.navy} strokeWidth={2} />
    </div>
    {label ? (
      // Label dalam kapsul berbingkai agar garis penghubung lewat di belakangnya, tidak menimpa teks.
      <div
        style={{
          position: 'absolute',
          top: size + 10,
          left: -100,
          width: size + 200,
          display: 'flex',
          justifyContent: 'center',
          opacity: labelOpacity,
        }}
      >
        <span
          style={{
            padding: '5px 16px',
            borderRadius: radius.pill,
            background: color.surface,
            border: `1px solid ${color.line}`,
            fontFamily: font.family,
            fontSize: 26,
            fontWeight: 500,
            color: color.navy,
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
      </div>
    ) : null}
  </div>
);
