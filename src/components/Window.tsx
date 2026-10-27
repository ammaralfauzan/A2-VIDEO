import React from 'react';
import {color, font, radius, shadow} from '../theme';

type Props = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  titleBar?: number;
  badge?: React.ReactNode;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  children?: React.ReactNode;
};

// Jendela bergaya macOS: tiga titik kiri atas, judul di tengah, tanpa toolbar.
export const Window: React.FC<Props> = ({x, y, w, h, title, titleBar = 56, badge, style, bodyStyle, children}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: h,
      background: color.surface,
      borderRadius: radius.window,
      boxShadow: shadow,
      border: `1px solid ${color.line}`,
      overflow: 'hidden',
      fontFamily: font.family,
      ...style,
    }}
  >
    <div
      style={{
        height: titleBar,
        borderBottom: `1px solid ${color.line}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div style={{position: 'absolute', left: 24, display: 'flex', gap: 8}}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{width: 14, height: 14, borderRadius: 7, background: color.line}} />
        ))}
      </div>
      <div style={{fontSize: font.label, fontWeight: 500, color: color.muted, display: 'flex', alignItems: 'center', gap: 12}}>
        {title}
        {badge}
      </div>
    </div>
    <div style={{position: 'relative', height: h - titleBar, ...bodyStyle}}>{children}</div>
  </div>
);
