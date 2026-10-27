import React from 'react';
import {interpolate} from 'remotion';
import {IconBell, IconBolt, IconChart, IconCheck, IconInbox, IconReceipt} from '../../components/Icons';
import {clamp, sp} from '../../components/motion';
import {CHUNKS, S} from '../../data/timeline-satu-pesanan';
import {color, font, radius, shadow} from '../../theme';
import {nodeState} from './LangkahGraph';
import {HUB, HUB_COMPACT, P, STEPS} from './layout';

const CARDS = [
  {Icon: IconInbox, title: 'Pesanan #1041 masuk', sub: 'Tercatat otomatis'},
  {Icon: IconReceipt, title: 'Invoice INV-1041 terbit', sub: 'Terkirim ke pelanggan'},
  {Icon: IconBell, title: 'Pengingat bayar terkirim', sub: '3 hari sebelum jatuh tempo'},
  {Icon: IconChart, title: 'Laporan harian tersusun', sub: 'Siap setiap pagi'},
];

// "A2 Automation menyambungkan semuanya": hub di tengah, garis gradasi ke tiap langkah,
// denyut kecil mengalir. Lalu kartu hasil muncul satu per satu mengikuti suara.
export const Hub: React.FC<{f: number}> = ({f}) => {
  const start = P.ring();
  if (f < start - 4 || f > P.out() + 16) return null;
  const compact = sp(f, P.compact(), 16);
  const c = {
    x: HUB.x + (HUB_COMPACT.x - HUB.x) * compact,
    y: HUB.y + (HUB_COMPACT.y - HUB.y) * compact,
    s: 1 + (HUB_COMPACT.scale - 1) * compact,
  };
  const pop = sp(f, start, 14);
  const out = interpolate(f, [P.out(), P.out() + 12], [1, 0], clamp);
  const hubSize = 170 * c.s;
  const cardChunks = CHUNKS.filter((k) => k.sentence === S.otomatis);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: out}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, zIndex: 9}}>
        <defs>
          <linearGradient id="hubLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color.blue1} />
            <stop offset="100%" stopColor={color.blue2} />
          </linearGradient>
        </defs>
        {STEPS.map((_, i) => {
          const n = nodeState(i, f);
          const draw = interpolate(f, [start + 8 + i * 4, start + 20 + i * 4], [0, 1], clamp);
          if (draw <= 0) return null;
          const x2 = c.x + (n.x - c.x) * draw;
          const y2 = c.y + (n.y - c.y) * draw;
          const pulse = ((f - start - i * 5) % 36) / 36;
          return (
            <g key={i}>
              <line x1={c.x} y1={c.y} x2={x2} y2={y2} stroke="url(#hubLine)" strokeWidth={5 * c.s} strokeLinecap="round" />
              {draw >= 1 ? <circle cx={c.x + (n.x - c.x) * pulse} cy={c.y + (n.y - c.y) * pulse} r={7 * c.s} fill={color.surface} stroke={color.blue2} strokeWidth={3} /> : null}
            </g>
          );
        })}
      </svg>
      <div
        style={{
          position: 'absolute',
          left: c.x - hubSize / 2,
          top: c.y - hubSize / 2,
          width: hubSize,
          height: hubSize,
          borderRadius: hubSize / 2,
          background: color.navy,
          boxShadow: shadow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: pop,
          transform: `scale(${0.5 + 0.5 * pop})`,
          zIndex: 11,
        }}
      >
        <IconBolt size={hubSize * 0.42} stroke={color.surface} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: c.x - 200,
          width: 400,
          top: c.y + hubSize / 2 + 14,
          textAlign: 'center',
          fontFamily: font.family,
          fontSize: 30 * c.s + 6 * (1 - c.s),
          fontWeight: 600,
          color: color.navy,
          opacity: pop * (1 - compact),
          zIndex: 11,
        }}
      >
        Alur otomatis
      </div>
      {CARDS.map((card, i) => {
        const at = cardChunks[i]?.from ?? P.compact() + i * 20;
        if (f < at - 1) return null;
        const p = sp(f, at, 12);
        return (
          <div
            key={card.title}
            style={{
              position: 'absolute',
              left: 210,
              width: 660,
              top: 640 + i * 108,
              height: 92,
              borderRadius: radius.card,
              background: color.surface,
              border: `1px solid ${color.line}`,
              boxShadow: shadow,
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              padding: '0 24px 0 16px',
              boxSizing: 'border-box',
              fontFamily: font.family,
              opacity: p,
              transform: `translateY(${(1 - p) * 24}px)`,
              zIndex: 12,
            }}
          >
            <div style={{width: 60, height: 60, borderRadius: 30, background: color.canvas, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              <card.Icon size={30} />
            </div>
            <div style={{flex: 1, lineHeight: 1.2}}>
              <div style={{fontSize: 28, fontWeight: 600, color: color.navy}}>{card.title}</div>
              <div style={{fontSize: 22, color: color.muted}}>{card.sub}</div>
            </div>
            <div style={{width: 40, height: 40, borderRadius: 20, background: color.success, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <IconCheck size={24} stroke={color.surface} strokeWidth={2.5} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
