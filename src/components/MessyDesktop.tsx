import React from 'react';
import {interpolate} from 'remotion';
import {CLICKS} from '../data/timeline';
import {color, font, radius} from '../theme';
import {clamp, sp} from './motion';
import {Window} from './Window';

// Desktop berantakan untuk adegan hook dan masalah. Semua status dihitung dari frame global.

type WinId = 'nilai' | 'chat' | 'rapor' | 'siswa' | 'spp';
const WIN: Record<WinId, {x: number; y: number; w: number; h: number; title: string}> = {
  nilai: {x: 120, y: 130, w: 760, h: 470, title: 'Rekap Nilai Kelas 8A'},
  chat: {x: 980, y: 110, w: 620, h: 560, title: 'Grup Wali Murid 8A'},
  rapor: {x: 520, y: 380, w: 640, h: 420, title: 'Rapor_8A_final_revisi2'},
  siswa: {x: 1240, y: 470, w: 560, h: 360, title: 'Data Siswa 8A'},
  spp: {x: 220, y: 560, w: 560, h: 300, title: 'Tagihan SPP'},
};

const zOrder = (f: number): WinId[] => {
  const base: WinId[] = ['siswa', 'spp', 'rapor'];
  const chatOnTop = (f >= CLICKS.chat1 && f < CLICKS.sel2) || f >= CLICKS.chat2;
  return chatOnTop ? [...base, 'nilai', 'chat'] : [...base, 'chat', 'nilai'];
};

const STUDENTS = ['Aditya Pratama', 'Bunga Lestari', 'Dimas Saputra', 'Fajar Nugroho', 'Intan Permata', 'Rizky Ramadhan'];
const NILAI = [
  [82, 88, 85, '90'],
  [90, 86, 92, '88'],
  [76, 80, 78, null],
  [84, 79, 81, null],
  [88, 91, 87, null],
  [73, 77, 80, null],
];

const typed = (f: number, start: number, text: string, cps = 1.2) =>
  text.slice(0, Math.max(0, Math.min(text.length, Math.floor((f - start) * cps))));

const cell: React.CSSProperties = {height: 44, display: 'flex', alignItems: 'center', fontSize: font.label, color: color.navy};

const NilaiBody: React.FC<{f: number}> = ({f}) => {
  const cols = [260, 100, 100, 100, 100];
  const uas = (row: number) => {
    if (NILAI[row][3]) return NILAI[row][3];
    if (row === 2 && f >= CLICKS.sel1 + 4) return typed(f, CLICKS.sel1 + 4, '86', 0.5);
    if (row === 3 && f >= CLICKS.sel2 + 4) return typed(f, CLICKS.sel2 + 4, '79', 0.5);
    return '';
  };
  const selected = f >= CLICKS.sel2 ? 3 : f >= CLICKS.sel1 ? 2 : -1;
  return (
    <div style={{padding: 48, paddingTop: 48}}>
      <div style={{display: 'flex', borderBottom: `2px solid ${color.line}`}}>
        {['Nama', 'UH 1', 'UH 2', 'UTS', 'UAS'].map((h, i) => (
          <div key={h} style={{...cell, width: cols[i], color: color.muted, fontWeight: 500}}>
            {h}
          </div>
        ))}
      </div>
      {STUDENTS.map((s, r) => (
        <div key={s} style={{display: 'flex', borderBottom: `1px solid ${color.line}`}}>
          <div style={{...cell, width: cols[0]}}>{s}</div>
          {[0, 1, 2].map((c) => (
            <div key={c} style={{...cell, width: cols[c + 1], fontVariantNumeric: 'tabular-nums'}}>
              {NILAI[r][c]}
            </div>
          ))}
          <div
            style={{
              ...cell,
              width: cols[4] - 12,
              paddingLeft: 10,
              fontVariantNumeric: 'tabular-nums',
              outline: selected === r ? `2px solid ${color.blue2}` : 'none',
              outlineOffset: -4,
              borderRadius: 6,
            }}
          >
            {uas(r)}
          </div>
        </div>
      ))}
    </div>
  );
};

const Bubble: React.FC<{text: string; out?: boolean; style?: React.CSSProperties}> = ({text, out, style}) => (
  <div
    style={{
      alignSelf: out ? 'flex-end' : 'flex-start',
      maxWidth: 470,
      padding: '12px 18px',
      borderRadius: radius.card,
      background: out ? color.navy : color.canvas,
      color: out ? color.surface : color.navy,
      fontSize: font.label,
      lineHeight: 1.3,
      ...style,
    }}
  >
    {text}
  </div>
);

const REPLY_1 = 'Baik Bu, rapornya sedang kami siapkan.';
const REPLY_2 = 'Mohon ditunggu ya, Pak.';
const SENT_1 = 235;

const ChatBody: React.FC<{f: number}> = ({f}) => {
  let input = '';
  if (f >= CLICKS.chat1 + 4 && f < SENT_1) input = typed(f, CLICKS.chat1 + 4, REPLY_1);
  if (f >= CLICKS.chat2 + 4) input = typed(f, CLICKS.chat2 + 4, REPLY_2);
  const sent = f >= SENT_1;
  const sentP = sp(f, SENT_1, 9);
  const focused = (f >= CLICKS.chat1 && f < CLICKS.sel2) || f >= CLICKS.chat2;
  const caretOn = Math.floor(f / 8) % 2 === 0;
  return (
    <div style={{padding: 48, paddingBottom: 0, height: '100%', boxSizing: 'border-box', position: 'relative'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        <Bubble text="Bu, rapor anak saya kapan bisa diambil?" />
        <Bubble text="Nilai UTS Dimas sudah keluar belum, Bu?" />
        <Bubble text="Bu, SPP bulan ini bisa dicicil?" />
        {sent ? <Bubble out text={REPLY_1} style={{opacity: sentP, transform: `translateY(${(1 - sentP) * 8}px)`}} /> : null}
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
        {focused && caretOn ? <span style={{width: 2, height: 26, background: color.navy, marginLeft: 2}} /> : null}
      </div>
    </div>
  );
};

const Bar: React.FC<{w: number | string}> = ({w}) => (
  <div style={{width: w, height: 14, borderRadius: 7, background: color.line, marginTop: 14}} />
);

const RaporBody: React.FC = () => (
  <div style={{padding: 48, fontSize: font.label, color: color.navy}}>
    <div style={{fontWeight: 600, letterSpacing: '0.06em'}}>RAPOR PESERTA DIDIK</div>
    <div style={{marginTop: 16, color: color.muted}}>Nama: Dimas Saputra · Kelas: 8A</div>
    <Bar w="92%" />
    <Bar w="80%" />
    <Bar w="86%" />
    <Bar w="60%" />
  </div>
);

const SiswaBody: React.FC = () => (
  // Baris dimulai di bawah jendela chat yang menumpuk di atasnya.
  <div style={{padding: 48, paddingTop: 150}}>
    {STUDENTS.slice(0, 3).map((s, i) => (
      <div key={s} style={{...cell, justifyContent: 'space-between', borderBottom: `1px solid ${color.line}`}}>
        <span>{s}</span>
        <span style={{color: color.muted, fontVariantNumeric: 'tabular-nums'}}>NIS 2024{String(101 + i)}</span>
      </div>
    ))}
  </div>
);

const SppBody: React.FC = () => (
  <div style={{padding: 48, paddingTop: 32}}>
    {[
      ['Oktober', '9 belum lunas'],
      ['September', '4 belum lunas'],
      ['Agustus', '2 belum lunas'],
    ].map(([m, s]) => (
      <div key={m} style={{...cell, justifyContent: 'space-between', borderBottom: `1px solid ${color.line}`}}>
        <span>{m}</span>
        <span style={{color: color.alert, fontWeight: 500}}>{s}</span>
      </div>
    ))}
  </div>
);

const Badge: React.FC<{f: number}> = ({f}) => {
  const steps = [
    {f: 0, n: 12},
    {f: 32, n: 37},
    {f: 64, n: 84},
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

// collapseStart: frame global saat semua jendela tersedot ke satu titik.
export const MessyDesktop: React.FC<{f: number; collapseStart?: number}> = ({f, collapseStart = 99999}) => {
  const order = zOrder(f);
  const center = {x: 960, y: 470};
  return (
    <>
      {order.map((id, z) => {
        const w = WIN[id];
        const p = sp(f, collapseStart + z * 2, 14);
        const cx = w.x + w.w / 2;
        const cy = w.y + w.h / 2;
        const opacity = interpolate(p, [0.4, 1], [1, 0], clamp);
        if (opacity <= 0) return null;
        return (
          <Window
            key={id}
            {...w}
            badge={id === 'chat' ? <Badge f={f} /> : undefined}
            style={{
              zIndex: z + 1,
              opacity,
              transform: `translate(${(center.x - cx) * p}px, ${(center.y - cy) * p}px) scale(${1 - 0.9 * p})`,
            }}
          >
            {id === 'nilai' ? <NilaiBody f={f} /> : null}
            {id === 'chat' ? <ChatBody f={f} /> : null}
            {id === 'rapor' ? <RaporBody /> : null}
            {id === 'siswa' ? <SiswaBody /> : null}
            {id === 'spp' ? <SppBody /> : null}
          </Window>
        );
      })}
    </>
  );
};
