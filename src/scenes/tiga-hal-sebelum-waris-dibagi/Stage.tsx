import React from 'react';
import {interpolate} from 'remotion';
import {clamp, ease} from '../../components/motion';
import {T, TF} from '../../brands/tams-consulting/theme';
import {BAR, BLOCK0, BLOCK_W, GATES, HEIR, LANE_X, P, SLICE} from './layout';

const L = (f: number, a: number, b: number, from: number, to: number) => interpolate(f, [a, b], [from, to], {...clamp, easing: ease});
const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const mix = (a: string, b: string, t: number) => {
  const A = rgb(a);
  const B = rgb(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',')})`;
};
const INK3 = '#848484'; // abu dari ink 48% di atas putih (bar gerbang redup)

// Gerbang k menyala dari saat potongan dilepas sampai blok turun ke gerbang berikutnya (tepat satu sorotan oranye).
const lit = (f: number, k: number) => {
  const off = k < 2 ? P.drop[k + 1] : P.land;
  return L(f, P.peel[k] - 4, P.peel[k] + 6, 0, 1) * (1 - L(f, off, off + 8, 0, 1));
};

const GATE_NAMES = ['JENAZAH', 'UTANG', 'WASIAT'];

// Blok harta, tiga gerbang, potongan yang dilepas, dan kotak ahli waris, ditengahkan di x 540 di bawah kartu ilustrasi
// (revisi 1). Nama lengkap tiap gerbang tampil di kartu ilustrasi; di sini nomor (kiri) dan nama singkat (kanan).
export const Stage: React.FC<{f: number}> = ({f}) => {
  const out = L(f, P.stageOut, P.stageOut + 10, 1, 0);
  if (out <= 0) return null;
  const intro = L(f, P.morph, P.morph + 16, 0, 1);

  // geometri blok
  const kf: number[] = [];
  const bot: number[] = [];
  const top: number[] = [];
  const push = (fr: number, t: number, b: number) => {
    kf.push(fr);
    top.push(t);
    bot.push(b);
  };
  push(0, BLOCK0.top, BLOCK0.bottom);
  let h = BLOCK0.bottom - BLOCK0.top;
  let prevBottom = BLOCK0.bottom;
  for (let k = 0; k < 3; k++) {
    const g = GATES[k];
    push(P.drop[k], prevBottom - h, prevBottom);
    push(P.drop[k] + 14, g - h, g);
    push(P.peel[k], g - h, g);
    push(P.peel[k] + 8, g - h, g - SLICE);
    h -= SLICE;
    prevBottom = g - SLICE;
  }
  const finalTop = HEIR.y + (HEIR.h - h) / 2;
  push(P.land, prevBottom - h, prevBottom);
  push(P.land + 16, finalTop, finalTop + h);
  push(P.fill, finalTop, finalTop + h);
  push(P.fill + 14, HEIR.y + 6, HEIR.y + HEIR.h - 6);
  const t = interpolate(f, kf, top, {...clamp, easing: ease});
  const b = interpolate(f, kf, bot, {...clamp, easing: ease});
  const fillP = L(f, P.fill, P.fill + 14, 0, 1);
  const w = BLOCK_W + fillP * (HEIR.w - 12 - BLOCK_W);
  const landP = L(f, P.land, P.land + 12, 0, 1);

  // potongan yang dilepas tiap gerbang: bergeser ke kiri lalu pudar (keluar dari harta)
  const slices = GATES.map((g, k) => {
    const p = L(f, P.peel[k], P.peel[k] + 18, 0, 1);
    if (p <= 0 || p >= 1) return null;
    return <div key={k} style={{position: 'absolute', left: LANE_X - BLOCK_W / 2 - p * 150, top: g - SLICE + 2, width: BLOCK_W * (1 - 0.4 * p), height: SLICE - 2, borderRadius: 8, background: T.orange, opacity: 1 - p}} />;
  });

  const bars = GATES.map((g, k) => {
    const dr = L(f, P.gates[k], P.gates[k] + 12, 0, 1);
    const lt = lit(f, k);
    const c = mix(INK3, T.orange, lt);
    return (
      <React.Fragment key={k}>
        <div style={{position: 'absolute', left: BAR.left, top: g - 4, width: LANE_X - BAR.gap - BAR.left, height: 8, borderRadius: 4, background: c, transformOrigin: 'right center', transform: `scaleX(${dr})`}} />
        <div style={{position: 'absolute', left: LANE_X + BAR.gap, top: g - 4, width: BAR.right - (LANE_X + BAR.gap), height: 8, borderRadius: 4, background: c, transformOrigin: 'left center', transform: `scaleX(${dr})`}} />
        <div style={{position: 'absolute', left: BAR.left - 56, top: g - 22, width: 44, height: 44, borderRadius: 22, background: mix('#2B2B2B', T.orange, lt), color: T.onDark, fontFamily: TF.head, fontWeight: 800, fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: dr}}>
          {k + 1}
        </div>
        <div style={{position: 'absolute', left: BAR.right + 14, top: g - 16, width: 900 - BAR.right - 14, height: 32, fontFamily: TF.head, fontWeight: 800, fontSize: 22, letterSpacing: 1, lineHeight: '32px', color: mix(INK3, T.orange, lt), opacity: dr, whiteSpace: 'nowrap'}}>
          {GATE_NAMES[k]}
        </div>
      </React.Fragment>
    );
  });

  const heirP = L(f, P.heirIn, P.heirIn + 14, 0, 1);

  return (
    <div style={{position: 'absolute', inset: 0, opacity: out}}>
      {bars}
      {slices}
      {/* kotak ahli waris */}
      <div
        style={{
          position: 'absolute',
          left: HEIR.x,
          top: HEIR.y,
          width: HEIR.w,
          height: HEIR.h,
          borderRadius: 28,
          background: T.bg2,
          border: `2px solid ${T.line2}`,
          opacity: heirP,
          transform: `translateY(${(1 - heirP) * 16}px)`,
        }}
      />
      {/* blok harta */}
      <div
        style={{
          position: 'absolute',
          left: LANE_X - w / 2,
          top: t,
          width: w,
          height: b - t,
          borderRadius: fillP > 0 ? 24 : 18,
          background: mix('#2B2B2B', T.orange, fillP),
          opacity: intro,
          transform: `scale(${0.8 + 0.2 * intro})`,
        }}
      >
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 1 - landP, fontFamily: TF.head, fontWeight: 800, fontSize: 24, letterSpacing: 2, lineHeight: 1, color: T.onDark, whiteSpace: 'nowrap'}}>
          HARTA
        </div>
      </div>
      {/* label kotak ahli waris di atas blok */}
      <div
        style={{
          position: 'absolute',
          left: HEIR.x,
          top: HEIR.y,
          width: HEIR.w,
          height: HEIR.h,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: TF.head,
          fontWeight: 800,
          fontSize: 28,
          letterSpacing: 4,
          color: mix(INK3, T.onDark, landP),
          opacity: heirP * (1 - landP * (1 - fillP)),
        }}
      >
        AHLI WARIS
      </div>
    </div>
  );
};
