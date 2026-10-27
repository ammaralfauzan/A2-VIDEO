import React from 'react';
import {color, font, shadow} from '../theme';

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
      <div
        style={{
          position: 'absolute',
          top: size + 12,
          left: -80,
          width: size + 160,
          textAlign: 'center',
          fontFamily: font.family,
          fontSize: 28,
          fontWeight: 500,
          color: color.navy,
          opacity: labelOpacity,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </div>
    ) : null}
  </div>
);
