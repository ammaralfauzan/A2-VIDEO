import React from 'react';
import {interpolate} from 'remotion';
import {clamp, ease} from '../../components/motion';
import {T, TF} from '../../brands/tams-consulting/theme';
import {BAR, HEIR, KEW, P} from './layout';

const L = (f: number, a: number, b: number, from = 0, to = 1) => interpolate(f, [a, b], [from, to], {...clamp, easing: ease});
const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const mix = (a: string, b: string, t: number) => {
  const A = rgb(a);
  const B = rgb(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',')})`;
};
const INK3 = '#848484'; // abu dari ink 48% di atas putih

const Lock: React.FC<{x: number; y: number; o: number}> = ({x, y, o}) => (
  <svg width={44} height={52} viewBox="0 0 44 52" style={{position: 'absolute', left: x - 22, top: y - 26, opacity: o}}>
    <path d="M11 22 V15 a11 11 0 0 1 22 0 V22" fill="none" stroke={INK3} strokeWidth={5} strokeLinecap="round" />
    <rect x={4} y={21} width={36} height={28} rx={9} fill={INK3} />
    <circle cx={22} cy={34} r={4} fill={T.bg2} />
  </svg>
);

type Marker = {label: string; inF: number; xF?: number; x: number; anchor: 'center' | 'right'};

// Satu batang harta arang. Penanda tawaran (SELURUH?, SETENGAH?) dicoret; garis oranye terkunci di sepertiga,
// sisanya meredup dengan gembok dan mengalir ke kotak AHLI WARIS. Lalu potongan "kewajiban" dilepas (sisa harta),
// panah wasiat ke ahli waris ditahan palang, kotak ahli waris diberi tanda bagian sudah ditetapkan. Tanpa angka.
export const Batang: React.FC<{f: number}> = ({f}) => {
  const out = L(f, P.stageOut, P.stageOut + 10, 1, 0);
  if (out <= 0) return null;
  const intro = L(f, P.barIn, P.barIn + 14);
  const sh = f >= P.jangan && f < P.jangan + 16 ? Math.sin((f - P.jangan) * 1.5) * 12 * (1 - (f - P.jangan) / 16) : 0;

  // geometri: potongan kewajiban dilepas lalu batang ditengahkan lagi
  const shrinkP = L(f, P.kew + 6, P.kew + 24);
  const recenter = L(f, P.kew + 20, P.kew + 36);
  const off = (-KEW / 2) * recenter;
  const effLeft = BAR.left + KEW * shrinkP + off;
  const right = BAR.right + off;
  const baseLeft = (f >= P.kew + 6 ? BAR.left + KEW : BAR.left) + off;
  const x3 = effLeft + (right - effLeft) / 3;
  const dim = interpolate(f, [P.lock, P.lock + 12, P.reset, P.reset + 10, P.relock, P.relock + 12], [0, 1, 1, 0, 0, 1], {...clamp, easing: ease});
  const lineP = L(f, P.lock, P.lock + 10);
  const sisaP = L(f, P.sisa, P.sisa + 10);
  const labL = effLeft + (x3 - effLeft) * lineP * (1 - dim); // label utama pindah ke kanan garis saat garis tampil

  const markers: Marker[] = [
    {label: 'SELURUH?', inF: P.mSeluruh, xF: P.xSeluruh, x: BAR.right - 4, anchor: 'right'},
    {label: 'SETENGAH?', inF: P.mSetengah, xF: P.xSetengah, x: (BAR.left + BAR.right) / 2, anchor: 'center'},
    {label: f < P.lock ? 'SEPERTIGA?' : 'SEPERTIGA', inF: P.mSepertiga, x: x3, anchor: 'center'},
  ];

  const heirP = L(f, P.heirIn, P.heirIn + 12);
  const flowP = L(f, P.flow, P.flow + 22);
  const filled = L(f, P.flow + 18, P.flow + 24);
  const arrowX = (effLeft + x3) / 2;
  const arrowP = L(f, P.arrow, P.arrow + 12) * L(f, P.cardBagian, P.cardBagian + 10, 1, 0);
  const blockP = L(f, P.block, P.block + 10);
  const badgeP = L(f, P.badge, P.badge + 10);
  const kewC = L(f, P.kew, P.kew + 6);
  const kewMove = L(f, P.kew + 8, P.kew + 28);

  return (
    <div style={{position: 'absolute', inset: 0, opacity: out}}>
      {/* penanda tawaran */}
      {markers.map((m, i) => {
        const p = L(f, m.inF, m.inF + 10);
        if (p <= 0) return null;
        const sp = m.xF ? L(f, m.xF, m.xF + 8) : 0;
        const gone = m.xF ? L(f, m.xF + 12, m.xF + 20, 1, 0) : 1;
        const third = i === 2;
        const col = third ? mix(T.ink, T.orange, lineP) : mix(T.ink, INK3, sp);
        const left = m.anchor === 'right' ? m.x - 236 : m.x - 120;
        return (
          <div key={i} style={{position: 'absolute', inset: 0, opacity: p * gone}}>
            <div style={{position: 'absolute', left: m.x - 2, top: 862, width: 4, height: 38, borderRadius: 2, background: third ? mix(INK3, T.orange, lineP) : INK3, transformOrigin: 'bottom', transform: `scaleY(${p})`}} />
            <div style={{position: 'absolute', left, top: 812, width: 240, height: 40, textAlign: m.anchor === 'right' ? 'right' : 'center', transform: `translateY(${(1 - p) * 10}px)`}}>
              <span style={{position: 'relative', display: 'inline-block', fontFamily: TF.head, fontWeight: 800, fontSize: 27, letterSpacing: 1.5, lineHeight: '40px', color: col, whiteSpace: 'nowrap'}}>
                {m.label}
                {m.xF ? <span style={{position: 'absolute', left: -4, right: -4, top: 18, height: 4, borderRadius: 2, background: T.ink, transformOrigin: 'left', transform: `scaleX(${sp})`}} /> : null}
              </span>
            </div>
          </div>
        );
      })}

      {/* batang harta */}
      <div style={{position: 'absolute', inset: 0, opacity: intro, transform: `translateX(${sh}px) scale(${0.92 + 0.08 * intro})`, transformOrigin: '540px 940px'}}>
        <div style={{position: 'absolute', left: baseLeft, top: BAR.top, width: right - baseLeft, height: BAR.h, borderRadius: 24, background: T.charcoal}} />
        {/* bagian di luar batas: meredup + gembok */}
        <div style={{position: 'absolute', left: x3, top: BAR.top, width: right - x3, height: BAR.h, borderRadius: '0 24px 24px 0', background: T.bg2, boxShadow: `inset 0 0 0 2px ${T.line2}`, opacity: dim}} />
        <Lock x={(x3 + right) / 2} y={BAR.top + BAR.h / 2} o={dim} />
        {/* potongan kewajiban */}
        {f >= P.kew && kewMove < 1 ? (
          <div style={{position: 'absolute', left: BAR.left, top: BAR.top, width: KEW, height: BAR.h, borderRadius: '24px 0 0 24px', background: mix(T.charcoal, INK3, kewC), opacity: 1 - kewMove, transform: `translate(${-70 * kewMove}px, ${70 * kewMove}px)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: TF.head, fontWeight: 800, fontSize: 18, letterSpacing: 1, color: T.onDark}}>
            <span style={{opacity: kewC}}>KEWAJIBAN</span>
          </div>
        ) : null}
        {/* label batang */}
        <div style={{position: 'absolute', left: labL, top: BAR.top, width: right - labL, height: BAR.h, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: TF.head, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: T.onDark, opacity: (1 - dim) * (1 - sisaP)}}>HARTA</div>
        <div style={{position: 'absolute', left: labL, top: BAR.top, width: right - labL, height: BAR.h, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: TF.head, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: T.onDark, opacity: (1 - dim) * sisaP}}>SISA HARTA</div>
        <div style={{position: 'absolute', left: effLeft, top: BAR.top, width: x3 - effLeft, height: BAR.h, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: TF.head, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: T.onDark, opacity: dim}}>WASIAT</div>
        {/* garis batas sepertiga */}
        <div style={{position: 'absolute', left: x3 - 4, top: BAR.top - 24, width: 8, height: BAR.h + 48, borderRadius: 4, background: T.orange, transformOrigin: 'top', transform: `scaleY(${lineP})`}} />
      </div>

      {/* bagian ahli waris mengalir ke kotak */}
      {flowP > 0 && flowP < 1 ? (
        <div
          style={{
            position: 'absolute',
            left: interpolate(flowP, [0, 1], [x3, HEIR.x]),
            top: interpolate(flowP, [0, 1], [BAR.top, HEIR.y]),
            width: interpolate(flowP, [0, 1], [right - x3, HEIR.w]),
            height: interpolate(flowP, [0, 1], [BAR.h, HEIR.h]),
            borderRadius: 28,
            background: T.charcoal,
            opacity: interpolate(flowP, [0, 0.15], [0, 1], clamp),
          }}
        />
      ) : null}

      {/* kotak ahli waris */}
      <div style={{position: 'absolute', left: HEIR.x, top: HEIR.y, width: HEIR.w, height: HEIR.h, borderRadius: 28, background: mix(T.bg2, T.charcoal, filled), boxShadow: `inset 0 0 0 2px ${T.line2}`, opacity: heirP, transform: `translateY(${(1 - heirP) * 16}px)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: TF.head, fontWeight: 800, fontSize: 28, letterSpacing: 4, color: mix(INK3, T.onDark, filled)}}>
        AHLI WARIS
        {badgeP > 0 ? (
          <svg width={48} height={48} viewBox="0 0 48 48" style={{position: 'absolute', left: HEIR.w - 70, top: (HEIR.h - 48) / 2, opacity: badgeP, transform: `scale(${0.6 + 0.4 * badgeP})`}}>
            <circle cx={24} cy={24} r={24} fill={T.orange} />
            <path d="M14 25 l7 7 l13 -15" fill="none" stroke={T.onDark} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </div>

      {/* panah wasiat ke ahli waris, ditahan palang */}
      {arrowP > 0 ? (
        <div style={{position: 'absolute', inset: 0, opacity: arrowP}}>
          <div style={{position: 'absolute', left: arrowX - 3, top: BAR.top + BAR.h + 8, width: 6, height: 104 * arrowP, borderRadius: 3, background: T.charcoal}} />
          <svg width={28} height={20} viewBox="0 0 28 20" style={{position: 'absolute', left: arrowX - 14, top: BAR.top + BAR.h + 8 + 104 * arrowP - 6}}>
            <path d="M3 3 L14 16 L25 3" fill="none" stroke={T.charcoal} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {blockP > 0 ? (
            <svg width={60} height={60} viewBox="0 0 60 60" style={{position: 'absolute', left: arrowX - 30, top: 1000, opacity: blockP, transform: `scale(${0.6 + 0.4 * blockP})`}}>
              <circle cx={30} cy={30} r={30} fill={T.orange} />
              <path d="M19 19 L41 41 M41 19 L19 41" stroke={T.onDark} strokeWidth={6} strokeLinecap="round" />
            </svg>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
