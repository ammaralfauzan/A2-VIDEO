import React from 'react';
import {color} from '../theme';

// Ikon garis 2px yang konsisten (viewBox 24).
type P = {size?: number; stroke?: string; strokeWidth?: number};

const Svg: React.FC<P & {children: React.ReactNode}> = ({size = 24, stroke = color.navy, strokeWidth = 2, children}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

export const IconHome: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </Svg>
);
export const IconFile: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M14 3H6v18h12V7z" />
    <path d="M14 3v4h4M9 12h6M9 16h6" />
  </Svg>
);
export const IconBell: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" />
    <path d="M10 21h4" />
  </Svg>
);
export const IconChart: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M4 20V4M4 20h16" />
    <path d="m7 15 4-4 3 3 5-6" />
  </Svg>
);
export const IconCheck: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
);
export const IconClock: React.FC<P> = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
);
export const IconSend: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M21 3 10 14" />
    <path d="M21 3 14 21l-4-7-7-4z" />
  </Svg>
);
export const IconUsers: React.FC<P> = (p) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
    <path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6" />
  </Svg>
);
export const IconBolt: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
  </Svg>
);
export const IconGear: React.FC<P> = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
    <circle cx="12" cy="12" r="6.5" />
  </Svg>
);
export const IconInbox: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M3 13h5l1.5 3h5L16 13h5" />
    <path d="M5.5 5h13L21 13v6H3v-6z" />
  </Svg>
);
export const IconReceipt: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
    <path d="M9 8h6M9 12h6M9 16h3" />
  </Svg>
);
export const IconDoc: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M14 3H6v18h12V7z" />
    <path d="M14 3v4h4" />
  </Svg>
);
