import React from 'react';
import {W} from './theme';

// Ikon garis gaya situs Wakaf (.ico: stroke 1.7, ujung bulat, viewBox 24).
type P = {size?: number; stroke?: string; strokeWidth?: number};

const Svg: React.FC<P & {children: React.ReactNode}> = ({size = 24, stroke = W.gold, strokeWidth = 1.7, children}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const IcCalendar: React.FC<P> = (p) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </Svg>
);
export const IcHotel: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h9A1.5 1.5 0 0 1 16 5.5V21" />
    <path d="M16 10h2.5A1.5 1.5 0 0 1 20 11.5V21M2.5 21h19" />
    <path d="M8 8h1M11 8h1M8 11.5h1M11 11.5h1M8 15h1M11 15h1" />
  </Svg>
);
export const IcPlane: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M10.2 13.8 6 18.5H3.8l2.4-5.6-3-1.1v-1.6l3.6.2 4.6-5.2c.9-1 2.6-1.3 3.4-.5.8.8.5 2.5-.5 3.4l-5.2 4.6.2 3.6h-1.6z" transform="rotate(8 12 12)" />
  </Svg>
);
export const IcCheck: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
);
export const IcReceipt: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
    <path d="M9 8h6M9 12h6M9 16h3" />
  </Svg>
);
export const IcBook: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M12 6.5C10 5 7 4.5 3.5 5v13.5c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5z" />
    <path d="M12 6.5V20" />
  </Svg>
);
export const IcUsers: React.FC<P> = (p) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
    <path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6" />
  </Svg>
);
export const IcChat: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M12 3.5c4.7 0 8.5 3.3 8.5 7.4s-3.8 7.4-8.5 7.4c-1 0-2-.1-2.9-.4L5 19.8l1.2-3.6C4.6 14.9 3.5 13 3.5 10.9c0-4.1 3.8-7.4 8.5-7.4z" />
    <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" strokeWidth={2.6} />
  </Svg>
);
export const IcArrow: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);
