import React from 'react';
import {interpolate} from 'remotion';
import {U_CLICKS, U_CURSOR_PATH, U_DRAGS} from '../data/timeline-a2-umum';
import {color, font, radius} from '../theme';
import {positionAt} from './Cursor';
import {IconDoc} from './Icons';
import {clamp, sp} from './motion';
import {Window} from './Window';

// Desktop berantakan untuk "Makin Tumbuh, Makin Sibuk": inbox pelanggan, rekap penjualan,
// folder invoice, dan laporan. Semua status dihitung dari frame global.

type WinId = 'inbox' | 'sheet' | 'folder' | 'laporan';
const WIN: Record<WinId, {x: number; y: number; w: number; h: number; title: string}> = {
  sheet: {x: 120, y: 130, w: 760, h: 470, title: 'Rekap Penjualan Oktober'},
  inbox: {x: 980, y: 110, w: 640, h: 560, title: 'Kotak Masuk Pelanggan'},
  folder: {x: 200, y: 600, w: 600, h: 270, title: 'Invoice'},
  laporan: {x: 1180, y: 690, w: 640, h: 180, title: 'Laporan_Bulanan_draft3'},
};

// Jendela yang terakhir disentuh kursor naik ke paling atas.
const zOrder = (f: number): WinId[] => {
  const events: [number, WinId][] = [
    [0, 'sheet'],
    [U_CLICKS.inbox, 'inbox'],
    [U_DRAGS.invoice.from, 'folder'],
    [U_DRAGS.invoice.to, 'inbox'],
    [U_CLICKS.cellA, 'sheet'],
  ];
  const order: WinId[] = ['laporan', 'folder', 'inbox', 'sheet'];
  for (const [at, id] of events) {
    if (f >= at) {
      order.splice(order.indexOf(id), 1);
      order.push(id);
    }
  }
  return order;
};

const typed = (f: number, start: number, text: string, cps = 1.2) =>
  text.slice(0, Math.max(0, Math.min(text.length, Math.floor((f - start) * cps))));

const cell: React.CSSProperties = {height: 44, display: 'flex', alignItems: 'center', fontSize: font.label, color: color.navy};

const ROWS = [
  ['01 Okt', 'Toko Sinar Jaya', '1.250.000'],
  ['02 Okt', 'Klinik Sehat Utama', '980.000'],
  ['03 Okt', 'CV Maju Bersama', '2.100.000'],
  ['04 Okt', 'Yayasan Pelita', null],
  ['05 Okt', 'Toko Berkah', null],
  ['06 Okt', 'Apotek Sentosa', null],
];

const SheetBody: React.FC<{f: number}> = ({f}) => {
  const cols = [140, 340, 184];
  const total = (r: number) => {
    if (ROWS[r][2]) return ROWS[r][2];
    if (r === 3 && f >= U_CLICKS.cellA + 4) return typed(f, U_CLICKS.cellA + 4, '1.475.000', 0.6);
    if (r === 4 && f >= U_CLICKS.cellB + 4) return typed(f, U_CLICKS.cellB + 4, '860.000', 0.6);
    return '';
  };
  const selected = f >= U_CLICKS.cellB ? 4 : f >= U_CLICKS.cellA ? 3 : -1;
  return (
    <div style={{padding: 48}}>
      <div style={{display: 'flex', borderBottom: `2px solid ${color.line}`}}>
        {['Tanggal', 'Pelanggan', 'Total (Rp)'].map((h, i) => (
          <div key={h} style={{...cell, width: cols[i], color: color.muted, fontWeight: 500}}>
            {h}
          </div>
        ))}
      </div>
      {ROWS.map((r, i) => (
        <div key={r[0]} style={{display: 'flex', borderBottom: `1px solid ${color.line}`}}>
          <div style={{...cell, width: cols[0], color: color.muted}}>{r[0]}</div>
          <div style={{...cell, width: cols[1]}}>{r[1]}</div>
          <div
            style={{
              ...cell,
              width: cols[2] - 12,
              paddingLeft: 10,
              fontVariantNumeric: 'tabular-nums',
              outline: selected === i ? `2px solid ${color.blue2}` : 'none',
              outlineOffset: -4,
              borderRadius: 6,
            }}
          >
            {total(i)}
          </div>
        </div>
      ))}
    </div>
  );
};

const Bubble: React.FC<{children: React.ReactNode; out?: boolean; style?: React.CSSProperties}> = ({children, out, style}) => (
  <div
    style={{
      alignSelf: out ? 'flex-end' : 'flex-start',
      maxWidth: 480,
      padding: '12px 18px',
      borderRadius: radius.card,
      background: out ? color.navy : color.canvas,
      color: out ? color.surface : color.navy,
      fontSize: font.label,
      lineHeight: 1.3,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      ...style,
    }}
  >
    {children}
  </div>
);

const REPLY = 'Baik Kak, segera kami cek.';
const SENT = U_CLICKS.inbox + 30;

const InboxBody: React.FC<{f: number}> = ({f}) => {
  const typing = f >= U_CLICKS.inbox + 4 && f < SENT;
  const input = typing ? typed(f, U_CLICKS.inbox + 4, REPLY) : '';
  const focused = f >= U_CLICKS.inbox && f < U_DRAGS.invoice.from;
  const caretOn = Math.floor(f / 8) % 2 === 0;
  const sentP = sp(f, SENT, 9);
  const fileP = sp(f, U_DRAGS.invoice.to + 2, 9);
  return (
    <div style={{padding: 48, paddingBottom: 0, height: '100%', boxSizing: 'border-box', position: 'relative'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        <Bubble>Kak, pesanan saya sudah dikirim?</Bubble>
        <Bubble>Harga paket bulanan berapa ya?</Bubble>
        <Bubble>Invoice bulan ini belum masuk.</Bubble>
        {f >= SENT ? (
          <Bubble out style={{opacity: sentP, transform: `translateY(${(1 - sentP) * 8}px)`}}>
            {REPLY}
          </Bubble>
        ) : null}
        {f >= U_DRAGS.invoice.to + 2 ? (
          <Bubble out style={{opacity: fileP, transform: `translateY(${(1 - fileP) * 8}px)`}}>
            <IconDoc size={22} stroke={color.surface} />
            INV-2026-1041
          </Bubble>
        ) : null}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 48,
          right: 48,
          bottom: 40,
          height: 56,
          borderRadius: radius.input,
          border: `2px solid ${focused ? color.blue2 : color.line}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 18px',
          fontSize: font.label,
          color: input ? color.navy : color.muted,
        }}
      >
        {input || 'Tulis balasan'}
        {focused && typing && caretOn ? <span style={{width: 2, height: 26, background: color.navy, marginLeft: 2}} /> : null}
      </div>
    </div>
  );
};

const FILES = ['INV-2026-1041', 'INV-2026-1042', 'INV-2026-1043'];

const FolderBody: React.FC<{f: number}> = ({f}) => {
  const dragging = f >= U_DRAGS.invoice.from && f < U_DRAGS.invoice.to;
  return (
    <div style={{padding: '32px 48px'}}>
      {FILES.map((name, i) => (
        <div
          key={name}
          style={{
            ...cell,
            height: 48,
            gap: 14,
            borderBottom: `1px solid ${color.line}`,
            background: i === 0 && dragging ? color.canvas : 'transparent',
            opacity: i === 0 && dragging ? 0.5 : 1,
          }}
        >
          <IconDoc size={24} stroke={color.muted} />
          {name}
        </div>
      ))}
    </div>
  );
};

const Bar: React.FC<{w: string}> = ({w}) => <div style={{width: w, height: 14, borderRadius: 7, background: color.line, marginTop: 14}} />;

const LaporanBody: React.FC = () => (
  <div style={{padding: '18px 48px'}}>
    <Bar w="90%" />
    <Bar w="74%" />
    <Bar w="82%" />
  </div>
);

const Badge: React.FC<{f: number}> = ({f}) => {
  const steps = [
    {f: 0, n: 12},
    {f: 30, n: 48},
    {f: 62, n: 97},
  ];
  const cur = [...steps].reverse().find((s) => f >= s.f)!;
  const pop = cur.f === 0 ? 1 : sp(f, cur.f, 9);
  return (
    <div
      style={{
        minWidth: 40,
        height: 34,
        padding: '0 10px',
        borderRadius: 17,
        background: color.alert,
        color: color.surface,
        fontSize: font.label,
        fontWeight: 600,
        fontVariantNumeric: 'tabular-nums',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${0.7 + 0.3 * pop})`,
      }}
    >
      {cur.n}
    </div>
  );
};

// Berkas invoice yang sedang diseret mengikuti kursor.
const DragGhost: React.FC<{f: number}> = ({f}) => {
  if (f < U_DRAGS.invoice.from || f >= U_DRAGS.invoice.to) return null;
  const {x, y} = positionAt(f, U_CURSOR_PATH);
  return (
    <div
      style={{
        position: 'absolute',
        left: x + 18,
        top: y + 22,
        zIndex: 30,
        padding: '10px 18px',
        borderRadius: radius.input,
        background: color.surface,
        border: `1px solid ${color.line}`,
        boxShadow: '0 12px 30px rgba(11,22,48,0.16)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: font.family,
        fontSize: font.label,
        color: color.navy,
      }}
    >
      <IconDoc size={22} stroke={color.navy} />
      INV-2026-1041
    </div>
  );
};

export const MessyDesktopUmum: React.FC<{f: number; collapseStart?: number}> = ({f, collapseStart = 99999}) => {
  const order = zOrder(f);
  const center = {x: 960, y: 470};
  return (
    <>
      {order.map((id, z) => {
        const w = WIN[id];
        const p = sp(f, collapseStart + z * 2, 14);
        const opacity = interpolate(p, [0.4, 1], [1, 0], clamp);
        if (opacity <= 0) return null;
        return (
          <Window
            key={id}
            {...w}
            badge={id === 'inbox' ? <Badge f={f} /> : undefined}
            style={{
              zIndex: z + 1,
              opacity,
              transform: `translate(${(center.x - w.x - w.w / 2) * p}px, ${(center.y - w.y - w.h / 2) * p}px) scale(${1 - 0.9 * p})`,
            }}
          >
            {id === 'sheet' ? <SheetBody f={f} /> : null}
            {id === 'inbox' ? <InboxBody f={f} /> : null}
            {id === 'folder' ? <FolderBody f={f} /> : null}
            {id === 'laporan' ? <LaporanBody /> : null}
          </Window>
        );
      })}
      <DragGhost f={f} />
    </>
  );
};
