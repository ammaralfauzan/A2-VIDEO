import React from 'react';
import {interpolate} from 'remotion';
import {clamp, ease} from '../../components/motion';
import {leafRadius, T, TF} from '../../brands/tams-consulting/theme';
import {BIG, BLOCK0, BLOCK_W, CARD, GATES, HEIR, LANE_X, P, PILL, SLICE} from './layout';

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

const GATE_NAMES = ['1 · PERAWATAN JENAZAH', '2 · UTANG', '3 · WASIAT'];

// Blok harta, tiga gerbang, potongan yang dilepas, dan kotak ahli waris. Bidang rata, tanpa orang.
export const Stage: React.FC<{f: number}> = ({f}) => {
  const out = L(f, P.stageOut, P.stageOut + 10, 1, 0);
  if (out <= 0) return null;
  const intro = L(f, P.blockIn, P.blockIn + 16, 0, 1);

  // geometri blok
  const m = L(f, P.morph, P.morph + 18, 0, 1);
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
  const finalTop = HEIR.y + 9;
  push(P.land, prevBottom - h, prevBottom);
  push(P.land + 16, finalTop, finalTop + h);
  push(P.fill, finalTop, finalTop + h);
  push(P.fill + 14, HEIR.y + 6, HEIR.y + HEIR.h - 6);
  const t = interpolate(f, kf, top, {...clamp, easing: ease});
  const b = interpolate(f, kf, bot, {...clamp, easing: ease});
  const fillP = L(f, P.fill, P.fill + 14, 0, 1);
  const w = L(f, P.morph, P.morph + 18, BIG.w, BLOCK_W) + fillP * (HEIR.w - 12 - BLOCK_W);
  const cx = L(f, P.morph, P.morph + 18, BIG.cx, LANE_X);
  const landP = L(f, P.land, P.land + 12, 0, 1);

  const bars = GATES.map((g, k) => {
    const dr = L(f, P.gates[k], P.gates[k] + 12, 0, 1);
    const c = mix(INK3, T.orange, lit(f, k));
    return (
      <React.Fragment key={k}>
        <div style={{position: 'absolute', left: 100, top: g - 4, width: LANE_X - 110 - 100, height: 8, borderRadius: 4, background: c, transformOrigin: 'left center', transform: `scaleX(${dr})`}} />
        <div style={{position: 'absolute', left: LANE_X + 110, top: g - 4, width: 500 - (LANE_X + 110), height: 8, borderRadius: 4, background: c, transformOrigin: 'right center', transform: `scaleX(${dr})`}} />
      </React.Fragment>
    );
  });

  const pills = GATES.map((g, k) => {
    const p = L(f, P.peel[k] + 2, P.peel[k] + 16, 0, 1);
    if (p <= 0) return null;
    const x = LANE_X + BLOCK_W / 2 + (PILL.x - (LANE_X + BLOCK_W / 2)) * p;
    const lt = lit(f, k);
    return (
      <div
        key={k}
        style={{
          position: 'absolute',
          left: x,
          top: g - 20 - PILL.h / 2,
          width: PILL.w,
          height: PILL.h,
          borderRadius: leafRadius(30),
          background: mix('#2B2B2B', T.orange, lt),
          color: T.onDark,
          fontFamily: TF.head,
          fontWeight: 800,
          fontSize: 22,
          letterSpacing: 0.6,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 24,
          whiteSpace: 'nowrap',
          opacity: p,
          transformOrigin: 'left center',
          transform: `scale(${0.5 + 0.5 * p})`,
        }}
      >
        {GATE_NAMES[k]}
      </div>
    );
  });

  const heirP = L(f, P.heirIn, P.heirIn + 14, 0, 1);
  const cardP = L(f, P.ayatCard, P.ayatCard + 12, 0, 1);
  const wide = 1 - Math.min(1, m * 2);
  const narrow = Math.max(0, m * 2 - 1);

  return (
    <div style={{position: 'absolute', inset: 0, opacity: out}}>
      {bars}
      {/* kotak ahli waris */}
      <div
        style={{
          position: 'absolute',
          left: HEIR.x,
          top: HEIR.y,
          width: HEIR.w,
          height: HEIR.h,
          borderRadius: leafRadius(40),
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
          left: cx - w / 2,
          top: t,
          width: w,
          height: b - t,
          borderRadius: leafRadius(fillP > 0 ? 40 : 36),
          background: mix('#2B2B2B', T.orange, fillP),
          opacity: intro,
          transform: `scale(${0.94 + 0.06 * intro})`,
        }}
      >
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: wide * (1 - landP), fontFamily: TF.head, fontWeight: 800, fontSize: 44, letterSpacing: 5, color: T.onDark, whiteSpace: 'nowrap'}}>
          HARTA ALMARHUM
        </div>
        <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: narrow * (1 - landP), fontFamily: TF.head, fontWeight: 800, fontSize: 26, letterSpacing: 1.5, lineHeight: 1.25, color: T.onDark, whiteSpace: 'nowrap'}}>
          <span>HARTA</span>
          <span>ALMARHUM</span>
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
          fontSize: 30,
          letterSpacing: 5,
          color: mix('#848484', T.onDark, landP),
          opacity: heirP * (1 - landP * (1 - fillP)),
        }}
      >
        AHLI WARIS
      </div>
      {pills}
      {/* kartu sumber */}
      <div
        style={{
          position: 'absolute',
          left: CARD.x,
          top: CARD.y,
          width: CARD.w,
          height: CARD.h,
          borderRadius: leafRadius(40),
          background: T.bg2,
          border: `2px solid ${T.line}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: TF.head,
          fontWeight: 700,
          fontSize: 26,
          letterSpacing: 2,
          color: T.ink,
          opacity: cardP,
          transform: `translateY(${(1 - cardP) * 12}px)`,
        }}
      >
        QS AN-NISA 4:11-12
      </div>
    </div>
  );
};
