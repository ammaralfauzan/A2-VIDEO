import React from 'react';
import {interpolate} from 'remotion';
import {clamp} from '../../components/motion';
import {TF} from '../../brands/tams-consulting/theme';
import {At, Badge, C, G, GREY, L, LINE, O, Shadow, W, bob, pop} from '../wasiat-maksimal-sepertiga/Ilustrasi';
import {BAR_Y, BOX, BOX_LABEL, BOX_X, GHOST, LOCK_BOX, LOCK_Y, P, PEWARIS} from './layout';

// Diagram kotak keluarga (Tams: bidang rata arang + oranye, sudut bulat penuh, tanpa makhluk bernyawa).
// Kotak PEWARIS di atas, empat kotak keluarga tersambung garis. Kunci "HUBUNGAN DARAH" menyalakan jalur waris;
// dua gembok (beda agama, membunuh pewaris) masing-masing menahan satu kotak: garisnya meredup, kotaknya abu.

// Gembok: badan bulat, lengkung (shackle) terbuka -> tertutup (closed 0..1).
export const Gembok: React.FC<{closed: number; color?: string}> = ({closed, color = C}) => (
  <>
    <g transform={`translate(${(1 - closed) * 12} ${(1 - closed) * -18})`}>
      <path d="M-18 -46 V-62 a18 18 0 0 1 36 0 V-46" fill="none" stroke={color} strokeWidth={9} strokeLinecap="round" />
    </g>
    <rect x={-30} y={-50} width={60} height={50} rx={16} fill={color} />
    <circle cx={0} cy={-30} r={6} fill={W} />
    <rect x={-2.5} y={-28} width={5} height={14} rx={2.5} fill={W} />
  </>
);

// Kunci oranye (gagang bulat, batang, gigi).
export const Kunci: React.FC = () => (
  <>
    <circle cx={-62} cy={0} r={34} fill={O} />
    <circle cx={-62} cy={0} r={13} fill={W} />
    <rect x={-34} y={-9} width={120} height={18} rx={9} fill={O} />
    <rect x={50} y={4} width={14} height={26} rx={6} fill={O} />
    <rect x={72} y={4} width={14} height={20} rx={6} fill={O} />
  </>
);

// Posisi gembok k pada frame f: dari bayangan samar di tepi (ghosts) terbang ke garis kotaknya.
const lockState = (f: number, k: number) => {
  const drop = k === 0 ? P.lock1 : P.lock2;
  const close = k === 0 ? P.close1 : P.close2;
  const fly = L(f, drop, drop + 16);
  const g = GHOST[k];
  const tx = BOX_X[LOCK_BOX[k]];
  const arc = Math.sin(fly * Math.PI) * -40;
  return {
    show: L(f, P.ghosts, P.ghosts + 12),
    fly,
    x: g.x + (tx - g.x) * fly,
    y: g.y + (LOCK_Y - g.y) * fly + arc,
    closed: L(f, close, close + 6),
  };
};

export const Diagram: React.FC<{f: number}> = ({f}) => {
  const boss = pop(f, P.diagIn);
  const glow = L(f, P.glow, P.glow + 24);
  const v1 = interpolate(glow, [0, 0.35], [0, 1], clamp);
  const v2 = interpolate(glow, [0.3, 0.65], [0, 1], clamp);
  const v3 = interpolate(glow, [0.6, 1], [0, 1], clamp);
  const locks = [0, 1].map((k) => lockState(f, k));
  const keyIn = L(f, P.keyIn, P.keyIn + 14);
  const keyTurn = L(f, P.glow - 2, P.glow + 8);
  const ok = pop(f, P.berhak);
  const pulse = (start: number) => (f >= start && f < start + 20 ? Math.sin(((f - start) / 20) * Math.PI) * 0.08 : 0);
  const half = BOX_X[3];
  return (
    <>
      {/* garis dasar abu */}
      <path d={`M0 ${PEWARIS.y + PEWARIS.h} V${BAR_Y} M${-half} ${BAR_Y} H${half}`} stroke={GREY} strokeWidth={6} strokeLinecap="round" fill="none" opacity={L(f, P.boxesIn, P.boxesIn + 14)} />
      {BOX_X.map((x, i) => (
        <path key={x} d={`M${x} ${BAR_Y} V${BOX.y}`} stroke={GREY} strokeWidth={6} strokeLinecap="round" opacity={L(f, P.boxesIn + i * 4, P.boxesIn + i * 4 + 12)} />
      ))}
      {/* jalur waris menyala oranye (kunci HUBUNGAN DARAH) */}
      {v1 > 0 ? <path d={`M0 ${PEWARIS.y + PEWARIS.h} V${PEWARIS.y + PEWARIS.h + (BAR_Y - PEWARIS.y - PEWARIS.h) * v1}`} stroke={O} strokeWidth={8} strokeLinecap="round" /> : null}
      {v2 > 0 ? <path d={`M${-half * v2} ${BAR_Y} H${half * v2}`} stroke={O} strokeWidth={8} strokeLinecap="round" /> : null}
      {BOX_X.map((x, i) => {
        if (v3 <= 0) return null;
        const k = LOCK_BOX.indexOf(i);
        const dim = k >= 0 ? locks[k].closed : 0;
        return <path key={x} d={`M${x} ${BAR_Y} V${BAR_Y + (BOX.y - BAR_Y) * v3}`} stroke={O} strokeWidth={8} strokeLinecap="round" opacity={1 - dim * 0.85} />;
      })}
      {/* kotak PEWARIS */}
      <At x={0} y={PEWARIS.y + PEWARIS.h} s={boss}>
        <Shadow rx={170} y={14} />
        <rect x={-PEWARIS.w / 2} y={-PEWARIS.h} width={PEWARIS.w} height={PEWARIS.h} rx={46} fill={C} />
        <text x={0} y={-PEWARIS.h / 2 + 10} textAnchor="middle" fontFamily={TF.head} fontWeight={800} fontSize={30} letterSpacing={5} fill={W}>
          PEWARIS
        </text>
      </At>
      {/* empat kotak keluarga */}
      {BOX_X.map((x, i) => {
        const p = pop(f, P.boxesIn + i * 4);
        const k = LOCK_BOX.indexOf(i);
        const dim = k >= 0 ? locks[k].closed : 0;
        const lit = v3 * (1 - dim);
        const s = p * (1 + (k >= 0 ? pulse(k === 0 ? P.close1 : P.close2) + pulse(P.terhalang) : 0) + (k < 0 ? pulse(P.berhak) : 0));
        return (
          <At key={x} x={x} y={BOX.y + BOX.h / 2} s={s}>
            <rect x={-BOX.w / 2} y={-BOX.h / 2} width={BOX.w} height={BOX.h} rx={48} fill={dim > 0.5 ? G : W} stroke={LINE} strokeWidth={3} />
            <rect x={-BOX.w / 2} y={-BOX.h / 2} width={BOX.w} height={BOX.h} rx={48} fill="none" stroke={O} strokeWidth={5} opacity={lit} />
            <text x={0} y={9} textAnchor="middle" fontFamily={TF.head} fontWeight={800} fontSize={21} letterSpacing={1} fill={dim > 0.5 ? GREY : C}>
              {BOX_LABEL[i]}
            </text>
          </At>
        );
      })}
      {/* centang pada kotak yang tetap berhak */}
      {ok > 0
        ? BOX_X.map((x, i) =>
            LOCK_BOX.includes(i) ? null : (
              <At key={x} x={x + 62} y={BOX.y - 2} s={pop(f, P.berhak + (i === 0 ? 0 : 5))}>
                <Badge ok r={22} />
              </At>
            ),
          )
        : null}
      {/* gembok: samar di tepi, lalu terbang ke garis kotaknya dan terkunci */}
      {locks.map((l, k) =>
        l.show > 0 ? (
          <At key={k} x={l.x} y={l.y + (l.fly < 1 ? bob(f, k * 2, 4) * (1 - l.fly) : 0)} s={1.05 + 0.1 * l.fly + (pulse(k === 0 ? P.close1 : P.close2) + pulse(P.terhalang)) * 2} o={l.show * (0.32 + 0.68 * l.fly)}>
            <Gembok closed={l.closed} color={l.fly > 0.5 ? C : GREY} />
          </At>
        ) : null,
      )}
      {/* kunci HUBUNGAN DARAH */}
      {keyIn > 0 ? (
        <g opacity={keyIn} transform={`translate(${-150 - (1 - keyIn) * 120} 500)`}>
          <g transform={`rotate(${-12 + keyTurn * 12})`}>
            <Kunci />
          </g>
          <g transform="translate(170 0)">
            <rect x={-62} y={-30} width={300} height={60} rx={30} fill={O} opacity={0.12} />
            <text x={88} y={9} textAnchor="middle" fontFamily={TF.head} fontWeight={800} fontSize={24} letterSpacing={3} fill={O}>
              HUBUNGAN DARAH
            </text>
          </g>
        </g>
      ) : null}
    </>
  );
};
