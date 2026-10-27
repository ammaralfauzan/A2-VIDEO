import React from 'react';
import {color, font, gradient, radius} from '../theme';
import {IconCheck} from './Icons';
import {sp, textIn} from './motion';

// Bagian UI bersama untuk jendela aplikasi A2 (sidebar, header, kartu, baris, status).

export type Tab = {label: string; Icon: React.FC<{size?: number; stroke?: string}>; badge?: React.ReactNode};
export type TabSwitch = {f: number; i: number};

export const NAV_TOP = 120; // relatif ke badan jendela
export const NAV_STEP = 64;

// Tab aktif berpindah dengan spring pada frame `switches[k].f` (dipicu klik kursor).
export const Sidebar: React.FC<{f: number; width: number; brand: string; sub: React.ReactNode; tabs: Tab[]; switches: TabSwitch[]}> = ({
  f,
  width,
  brand,
  sub,
  tabs,
  switches,
}) => {
  let y = NAV_TOP + switches[0].i * NAV_STEP;
  for (let k = 1; k < switches.length; k++) {
    const prev = switches[k - 1].i;
    const s = sp(f, switches[k].f);
    if (f >= switches[k].f) y = NAV_TOP + (prev + (switches[k].i - prev) * s) * NAV_STEP;
  }
  const active = [...switches].reverse().find((t) => f >= t.f)!.i;
  return (
    <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width, borderRight: `1px solid ${color.line}`, padding: 32, boxSizing: 'border-box'}}>
      <div style={{fontSize: font.ui, fontWeight: 600, color: color.navy}}>{brand}</div>
      <div style={{fontSize: font.label, color: color.muted, marginTop: 4}}>{sub}</div>
      <div style={{position: 'absolute', left: 16, right: 16, top: y, height: 56, borderRadius: radius.input, background: color.canvas}}>
        <div style={{position: 'absolute', left: 0, top: 14, width: 4, height: 28, borderRadius: 2, background: gradient}} />
      </div>
      {tabs.map(({label, Icon, badge}, i) => (
        <div
          key={label}
          style={{
            position: 'absolute',
            left: 40,
            right: 28,
            top: NAV_TOP + i * NAV_STEP,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: font.label,
            fontWeight: i === active ? 600 : 500,
            color: i === active ? color.navy : color.muted,
          }}
        >
          <Icon size={26} stroke={i === active ? color.navy : color.muted} />
          <span style={{flex: 1}}>{label}</span>
          {badge}
        </div>
      ))}
    </div>
  );
};

export const Header: React.FC<{title: React.ReactNode; sub: React.ReactNode; f: number; start: number; right?: React.ReactNode}> = ({title, sub, f, start, right}) => (
  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', ...textIn(f, start)}}>
    <div>
      <div style={{fontSize: font.title, fontWeight: 600, color: color.navy, letterSpacing: '-0.01em'}}>{title}</div>
      <div style={{fontSize: font.label, color: color.muted, marginTop: 6}}>{sub}</div>
    </div>
    {right}
  </div>
);

export const Card: React.FC<{top: number; children: React.ReactNode; style?: React.CSSProperties}> = ({top, children, style}) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top,
      border: `1px solid ${color.line}`,
      borderRadius: radius.card,
      padding: 32,
      background: color.surface,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Row: React.FC<{children: React.ReactNode; last?: boolean; height?: number}> = ({children, last, height = 48}) => (
  <div
    style={{
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: last ? 'none' : `1px solid ${color.line}`,
      fontSize: font.label,
      color: color.navy,
    }}
  >
    {children}
  </div>
);

export const Status: React.FC<{done: boolean; p?: number; doneText?: string; waitText?: string}> = ({done, p = 1, doneText = 'Selesai', waitText = 'Menunggu'}) =>
  done ? (
    <span style={{display: 'flex', alignItems: 'center', gap: 8, color: color.success, fontWeight: 500, opacity: p}}>
      <IconCheck size={22} stroke={color.success} />
      {doneText}
    </span>
  ) : (
    <span style={{color: color.muted}}>{waitText}</span>
  );
