import React from 'react';
import {TF} from '../../brands/tams-consulting/theme';
import {At, C, Coins, Envelope, G, GoldStack, GREY, House, L, LINE, Lock, O, pop, W} from './Ilustrasi';
import {BAR, KEW, P} from './layout';

const mixHex = (a: string, b: string, t: number) => {
  const A = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const B = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',')})`;
};

export const Txt: React.FC<{x: number; y: number; c: string; size?: number; anchor?: 'start' | 'middle' | 'end'; o?: number; children: React.ReactNode}> = ({x, y, c, size = 26, anchor = 'middle', o = 1, children}) => (
  <text x={x} y={y} textAnchor={anchor} fontFamily={TF.head} fontWeight={800} fontSize={size} letterSpacing={3} fill={c} opacity={o}>
    {children}
  </text>
);

type Marker = {label: string; inF: number; xF?: number; x: number; anchor: 'middle' | 'end'};

// Batang harta besar (koordinat panggung, x 0 = tengah layar x 540) berisi rumah, emas, koin.
// Varian 1: tawaran SELURUH? dan SETENGAH? dicoret, garis oranye terkunci di sepertiga, sisanya meredup bergembok
// dan ditandai untuk ahli waris. Varian 2: potongan KEWAJIBAN dilepas, SISA HARTA, garis sepertiga terkunci lagi.
export const Batang: React.FC<{f: number; v: 1 | 2}> = ({f, v}) => {
  const start = v === 1 ? P.mSeluruh - 6 : P.reset;
  const intro = pop(f, start);
  const lockF = v === 1 ? P.lock : P.relock;

  const shrinkP = v === 2 ? L(f, P.kew + 6, P.kew + 24) : 0;
  const off = v === 2 ? (-KEW / 2) * L(f, P.kew + 20, P.kew + 36) : 0;
  const left = BAR.left + KEW * shrinkP + off;
  const right = BAR.right + off;
  const w = right - left;
  const x3 = left + w / 3;
  const lineP = L(f, lockF, lockF + 10);
  const dim = L(f, lockF + 2, lockF + 14);
  const hartaOut = L(f, lockF - 2, lockF + 4, 1, 0); // label HARTA hilang dulu
  const sideIn = L(f, lockF + 8, lockF + 18); // baru WASIAT / AHLI WARIS masuk
  const kewC = v === 2 ? L(f, P.kew, P.kew + 6) : 0;
  const kewMove = v === 2 ? L(f, P.kew + 8, P.kew + 30) : 0;
  const sisaP = v === 2 ? L(f, P.sisa, P.sisa + 10) : 0;
  const cut = v === 2 && f >= P.kew;
  const barLeft = cut ? Math.max(left, BAR.left + KEW + off) : left;

  const markers: Marker[] =
    v === 1
      ? [
          {label: 'SELURUH?', inF: P.mSeluruh, xF: P.xSeluruh, x: BAR.right, anchor: 'end'},
          {label: 'SETENGAH?', inF: P.mSetengah, xF: P.xSetengah, x: 0, anchor: 'middle'},
          {label: f < P.lock ? 'SEPERTIGA?' : 'SEPERTIGA', inF: P.mSepertiga, x: BAR.left + (BAR.right - BAR.left) / 3, anchor: 'middle'},
        ]
      : [{label: 'SEPERTIGA', inF: P.relock, x: x3, anchor: 'middle'}];

  const icon = (k: number) => barLeft + ((right - barLeft) * (k * 2 + 1)) / 6;
  const heirP = v === 1 ? pop(f, P.heirIn) : 0;
  const lineH = (BAR.h + 44) * lineP;

  return (
    <g opacity={Math.min(1, intro * 1.4)} transform={`translate(0 ${(1 - Math.min(1, intro)) * 24})`}>
      {/* penanda tawaran */}
      {markers.map((m, i) => {
        const p = L(f, m.inF, m.inF + 10);
        if (p <= 0) return null;
        const sp = m.xF ? L(f, m.xF, m.xF + 8) : 0;
        const gone = m.xF ? L(f, m.xF + 14, m.xF + 24, 1, 0) : 1;
        const third = m.label.startsWith('SEPERTIGA');
        const col = third ? mixHex('#0A0A0A', O, lineP) : mixHex('#0A0A0A', '#9A9A9A', sp);
        const tw = m.label.length * 21.5;
        const tx = m.anchor === 'end' ? m.x - tw : m.x - tw / 2;
        const tickX = m.anchor === 'end' ? m.x - 30 : m.x;
        return (
          <g key={i} opacity={p * gone} transform={`translate(0 ${(1 - p) * 10})`}>
            <rect x={tickX - 2.5} y={BAR.top - 36} width={5} height={30} rx={2.5} fill={third ? mixHex('#9A9A9A', O, lineP) : '#9A9A9A'} />
            <Txt x={m.x} y={BAR.top - 52} c={col} size={28} anchor={m.anchor}>
              {m.label}
            </Txt>
            {m.xF ? <rect x={tx - 6} y={BAR.top - 64} width={(tw + 12) * sp} height={5} rx={2.5} fill="#0A0A0A" /> : null}
          </g>
        );
      })}

      {/* potongan kewajiban (varian 2): berubah arang lalu jatuh ke kiri bawah */}
      {v === 2 && f >= P.kew - 1 && kewMove < 1 ? (
        <g opacity={1 - kewMove} transform={`translate(${BAR.left - 90 * kewMove} ${BAR.top + 120 * kewMove}) rotate(${-12 * kewMove})`}>
          <rect x={0} y={0} width={KEW} height={BAR.h} rx={30} fill={mixHex('#F3F3F1', '#2B2B2B', kewC)} />
          <g opacity={kewC}>
            <rect x={45} y={30} width={60} height={72} rx={10} fill={W} />
            <path d="M57 50 H93 M57 64 H93 M57 78 H80" stroke={GREY} strokeWidth={5} strokeLinecap="round" />
            <Txt x={KEW / 2} y={140} c={W} size={17} o={1}>
              KEWAJIBAN
            </Txt>
          </g>
        </g>
      ) : null}

      {/* batang */}
      <rect x={barLeft} y={BAR.top} width={right - barLeft} height={BAR.h} rx={30} fill={G} stroke={LINE} strokeWidth={3} />
      <At x={icon(0)} y={BAR.top + BAR.h - 24} s={0.6}>
        <House lit={dim} />
      </At>
      <At x={icon(1)} y={BAR.top + BAR.h - 34} s={0.75}>
        <GoldStack />
      </At>
      <At x={icon(2)} y={BAR.top + BAR.h - 32} s={0.85}>
        <Coins n={4} />
      </At>
      {/* bagian wasiat (bingkai oranye) dan bagian terkunci (redup + gembok) */}
      <rect x={barLeft} y={BAR.top} width={Math.max(0, x3 - barLeft)} height={BAR.h} rx={30} fill="none" stroke={O} strokeWidth={6} opacity={dim} />
      <rect x={x3} y={BAR.top} width={right - x3} height={BAR.h} rx={30} fill={W} opacity={0.8 * dim} />
      <At x={(x3 + right) / 2} y={BAR.top + BAR.h / 2 + 34} s={1.4 * (0.75 + 0.25 * dim)} o={dim}>
        <Lock />
      </At>
      <rect x={x3 - 5} y={BAR.top - 22 + (BAR.h + 44 - lineH) / 2} width={10} height={lineH} rx={5} fill={O} />

      {/* label di bawah batang */}
      <Txt x={(barLeft + right) / 2} y={BAR.top + BAR.h + 58} c={GREY} o={hartaOut * (1 - sisaP)}>
        HARTA
      </Txt>
      <Txt x={(barLeft + right) / 2} y={BAR.top + BAR.h + 58} c={C} o={hartaOut * sisaP}>
        SISA HARTA
      </Txt>
      <Txt x={(barLeft + x3) / 2} y={BAR.top + BAR.h + 58} c={O} o={sideIn}>
        WASIAT
      </Txt>
      <Txt x={(x3 + right) / 2} y={BAR.top + BAR.h + 58} c={C} o={sideIn}>
        AHLI WARIS
      </Txt>

      {/* varian 1: amplop wasiat dan rumah ahli waris di bawah label */}
      {heirP > 0 ? (
        <>
          <At x={(left + x3) / 2} y={560} s={0.6 * heirP} o={Math.min(1, heirP)}>
            <Envelope />
          </At>
          <At x={(x3 + right) / 2} y={560} s={0.6 * heirP} o={Math.min(1, heirP)}>
            <House lit={1} />
          </At>
        </>
      ) : null}
    </g>
  );
};
