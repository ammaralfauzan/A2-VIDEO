import React from 'react';
import {color, font, radius} from '../theme';

type Props = {
  label: React.ReactNode;
  icon?: React.ReactNode;
  press?: number; // 0..1, mengecil sedikit saat diklik
  variant?: 'navy' | 'done';
  style?: React.CSSProperties;
};

// Tombol pill penuh.
export const Button: React.FC<Props> = ({label, icon, press = 0, variant = 'navy', style}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      height: 72,
      padding: '0 36px',
      borderRadius: radius.pill,
      background: variant === 'navy' ? color.navy : color.surface,
      border: variant === 'navy' ? 'none' : `2px solid ${color.success}`,
      color: variant === 'navy' ? color.surface : color.success,
      fontFamily: font.family,
      fontWeight: 600,
      fontSize: font.ui,
      transform: `scale(${1 - press * 0.04})`,
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    {icon}
    {label}
  </div>
);
