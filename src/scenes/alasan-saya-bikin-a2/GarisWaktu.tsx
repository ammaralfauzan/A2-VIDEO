import React from 'react';
import {interpolate} from 'remotion';
import {clamp, ease, sp} from '../../components/motion';
import {color, font, radius} from '../../theme';
import {LABEL_TOP, LINE, P, POINTS} from './layout';

// Satu garis waktu tipis: tumbuh dari kiri saat hook, tiga titik cerita muncul bergantian
// (titik lama meredup, tidak hilang), lalu tersambung, menyatu jadi satu garis terang,
// dan akhirnya melingkar menjadi lingkaran gear yang diisi Gigi.

// Garis lurus dari kiri sepanjang `len` (0..1) dari panjang garis.
const linePath = (len: number) => `M${LINE.x0},${LINE.y} L${(LINE.x0 + (LINE.x1 - LINE.x0) * len).toFixed(1)},${LINE.y}`;

// Panjang isian biru (0..1 dari panjang garis) mengikuti titik yang sedang diceritakan.
const fillAt = (f: number) => {
  const xs = [LINE.x0, ...POINTS.map((p) => p.x), LINE.x1];
  const at = [P.pointIn(0), P.pointIn(1), P.pointIn(2), P.connect()];
  let x = xs[0];
  at.forEach((s, i) => {
    x = x + (xs[i + 1] - x) * interpolate(f, [s, s + 18], [0, 1], {...clamp, easing: ease});
  });
  return (x - LINE.x0) / (LINE.x1 - LINE.x0);
};

const pointAlpha = (f: number, i: number) => {
  // meredup saat titik berikutnya muncul, terang lagi saat ketiganya tersambung
  if (i >= 2) return 1;
  const dimAt = P.pointIn(i + 1);
  const dim = interpolate(f, [dimAt, dimAt + 10], [0, 1], clamp) * (1 - interpolate(f, [P.connect(), P.connect() + 12], [0, 1], clamp));
  return 1 - 0.62 * dim;
};

export const GarisWaktu: React.FC<{f: number}> = ({f}) => {
  const [g0, g1] = P.grow();
  if (f < g0) return null;
  const [m0, m1] = P.merge();
  const [o0, o1] = P.lineOut();
  if (f > o1 + 2) return null;

  const grow = interpolate(f, [g0, g1], [0, 1], {...clamp, easing: ease});
  const fill = fillAt(f);
  const merge = interpolate(f, [m0, m1], [0, 1], {...clamp, easing: ease});
  const lineFade = interpolate(f, [o0, o1], [1, 0], {...clamp, easing: ease});
  const stroke = 6 + 4 * merge;
  const pointsGone = merge >= 1;
  const labelsOut = interpolate(f, [m0 - 2, m0 + 8], [1, 0], clamp);

  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: lineFade}}>
        <defs>
          <linearGradient id="gw-terang" gradientUnits="userSpaceOnUse" x1={LINE.x0} y1={0} x2={LINE.x1} y2={0}>
            <stop offset="0%" stopColor={color.blue1} />
            <stop offset="100%" stopColor={color.blue2} />
          </linearGradient>
        </defs>
        {/* garis dasar abu */}
        {merge < 1 ? (
          <line x1={LINE.x0} y1={LINE.y} x2={LINE.x0 + (LINE.x1 - LINE.x0) * grow} y2={LINE.y} stroke={color.line} strokeWidth={stroke} strokeLinecap="round" />
        ) : null}
        {/* isian biru yang berjalan; menjadi garis terang bergradasi saat menyatu, lalu melingkar */}
        {fill > 0.001 || merge > 0 ? (
          <path
            d={linePath(Math.max(fill, merge))}
            fill="none"
            stroke={merge > 0 ? 'url(#gw-terang)' : color.blue1}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}
        {/* tiga titik */}
        {!pointsGone
          ? POINTS.map((p, i) => {
              const s = sp(f, P.pointIn(i), 14);
              if (s <= 0.001) return null;
              const shrink = 1 - merge;
              const a = pointAlpha(f, i);
              const r = 22 * s * shrink;
              const halo = interpolate(f - P.pointIn(i), [0, 30], [0, 1], clamp);
              return (
                <g key={i} opacity={a}>
                  {/* cincin cahaya sekali saat titik muncul */}
                  {halo < 1 ? <circle cx={p.x} cy={LINE.y} r={22 + 26 * halo} fill="none" stroke={color.blue1} strokeWidth={3} opacity={0.5 * (1 - halo) * shrink} /> : null}
                  <circle cx={p.x} cy={LINE.y} r={r} fill={color.surface} stroke={color.navy} strokeWidth={6 * shrink} />
                  <circle cx={p.x} cy={LINE.y} r={r * 0.45} fill={color.blue1} />
                </g>
              );
            })
          : null}
      </svg>
      {/* label kecil di bawah titik, dalam kapsul berlatar solid */}
      {labelsOut > 0
        ? POINTS.map((p, i) => {
            const s = interpolate(f, [P.pointIn(i) + 4, P.pointIn(i) + 12], [0, 1], {...clamp, easing: ease});
            if (s <= 0) return null;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: p.x - 120,
                  width: 240,
                  top: LABEL_TOP,
                  display: 'flex',
                  justifyContent: 'center',
                  opacity: s * labelsOut * pointAlpha(f, i),
                  filter: `blur(${(1 - s) * 6}px)`,
                  transform: `translateY(${(1 - s) * 8}px)`,
                }}
              >
                <div
                  style={{
                    fontFamily: font.family,
                    fontSize: 26,
                    fontWeight: 500,
                    color: color.navy,
                    background: color.surface,
                    border: `2px solid ${color.line}`,
                    borderRadius: radius.pill,
                    padding: '6px 16px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {p.label}
                </div>
              </div>
            );
          })
        : null}
    </>
  );
};
