import React from 'react';
import {TF, T} from '../../brands/tams-consulting/theme';
import {At, C, G, GREY, L, LINE, O, W, bob, pop} from '../wasiat-maksimal-sepertiga/Ilustrasi';
import {BOX, BOX_LABEL, BOX_X, CARD, ELBOW_R, LEGEND_Y, LOCK_BOX, LOCK_Y, P, PEWARIS, TRUNK_END} from './layout';
import {Centang, Gembok, IkonCabang, IkonCincin, IkonPohon, IkonRumah, IkonTunas, Kunci, Silang} from './Ikon';

// Diagram waris sebagai ilustrasi: kartu latar bulat, kotak PEWARIS (ikon rumah), empat kotak keluarga berikon benda
// (tunas, cabang, pohon, cincin), garis penghubung bersiku melengkung berujung bulat. Kunci "HUBUNGAN DARAH" menyalakan jalur;
// dua gembok merah menahan satu kotak masing-masing (garis bawahnya merah, kotak ber-rona merah). Tanpa makhluk bernyawa.
export {Gembok, Kunci};

const IKON = [IkonTunas, IkonCabang, IkonPohon, IkonCincin];

// Garis cabang: dari batang (0, TRUNK_END) mendatar, siku melengkung, turun ke kotak.
const branch = (x: number) => {
  const d = Math.sign(x);
  const r = ELBOW_R;
  return `M0 ${TRUNK_END} H${x - d * r} Q${x} ${TRUNK_END} ${x} ${TRUNK_END + r} V${BOX.y}`;
};
const drop = (x: number) => `M${x} ${TRUNK_END + ELBOW_R} V${BOX.y}`;
const TRUNK = `M0 ${PEWARIS.y + PEWARIS.h} V${TRUNK_END}`;
const line = {fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};

const lockState = (f: number, k: number) => {
  const dropAt = k === 0 ? P.lock1 : P.lock2;
  const close = k === 0 ? P.close1 : P.close2;
  const fall = L(f, dropAt, dropAt + 14);
  return {
    show: L(f, P.ghosts, P.ghosts + 12),
    fall,
    y: LOCK_Y - (1 - fall) * 36,
    closed: L(f, close, close + 6),
    ring: L(f, close, close + 18),
  };
};

export const Diagram: React.FC<{f: number}> = ({f}) => {
  const boss = pop(f, P.diagIn);
  const glow = L(f, P.glow, P.glow + 24);
  const keyIn = L(f, P.keyIn, P.keyIn + 14);
  const keyOut = L(f, P.lock1 - 8, P.lock1 + 4);
  const keyTurn = L(f, P.glow - 2, P.glow + 8);
  const locks = [0, 1].map((k) => lockState(f, k));
  const ok = pop(f, P.berhak);
  const bad = pop(f, P.terhalang);
  const pulse = (start: number) => (f >= start && f < start + 20 ? Math.sin(((f - start) / 20) * Math.PI) * 0.07 : 0);
  const branchIn = (i: number) => L(f, P.boxesIn + i * 4, P.boxesIn + i * 4 + 14);
  return (
    <>
      <rect x={CARD.x} y={CARD.y} width={CARD.w} height={CARD.h} rx={CARD.r} fill={G} stroke={LINE} strokeWidth={3} opacity={L(f, 0, 10)} />
      {/* garis dasar abu */}
      <path d={TRUNK} stroke={GREY} strokeWidth={7} {...line} opacity={L(f, P.boxesIn, P.boxesIn + 12)} />
      {BOX_X.map((x, i) => (
        <path key={x} d={branch(x)} stroke={GREY} strokeWidth={7} {...line} opacity={branchIn(i)} />
      ))}
      {/* jalur waris menyala oranye (kunci HUBUNGAN DARAH): batang dulu, lalu cabang dari tengah ke tepi */}
      {glow > 0.01 ? <path d={TRUNK} stroke={O} strokeWidth={9} {...line} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - L(f, P.glow, P.glow + 8)} /> : null}
      {BOX_X.map((x, i) => {
        const rank = Math.abs(i - 1.5) > 1 ? 1 : 0;
        const v = L(f, P.glow + 6 + rank * 5, P.glow + 24 + rank * 5);
        return v > 0.01 ? <path key={x} d={branch(x)} stroke={O} strokeWidth={9} {...line} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - v} /> : null;
      })}
      {/* garis di bawah gembok memerah saat terkunci */}
      {LOCK_BOX.map((b, k) => (locks[k].closed > 0.01 ? <path key={b} d={drop(BOX_X[b])} stroke={T.red} strokeWidth={9} {...line} opacity={locks[k].closed} /> : null))}

      {/* kotak PEWARIS */}
      <At x={0} y={PEWARIS.y + PEWARIS.h / 2} s={boss}>
        <rect x={-PEWARIS.w / 2} y={-PEWARIS.h / 2} width={PEWARIS.w} height={PEWARIS.h} rx={PEWARIS.r} fill={C} />
        <g transform="translate(-100 -2) scale(0.9)">
          <IkonRumah />
        </g>
        <text x={34} y={10} textAnchor="middle" fontFamily={TF.head} fontWeight={800} fontSize={28} letterSpacing={4} fill={W}>
          PEWARIS
        </text>
      </At>

      {/* empat kotak keluarga */}
      {BOX_X.map((x, i) => {
        const p = pop(f, P.boxesIn + i * 4);
        const k = LOCK_BOX.indexOf(i);
        const lockedAmt = k >= 0 ? locks[k].closed : 0;
        const lit = L(f, P.glow + 20, P.glow + 30) * (1 - lockedAmt);
        const s = p * (1 + (k >= 0 ? pulse(k === 0 ? P.close1 : P.close2) + pulse(P.terhalang) : pulse(P.berhak)));
        const Ikon = IKON[i];
        const redTone = lockedAmt > 0.5;
        return (
          <At key={x} x={x} y={BOX.y + BOX.h / 2} s={s}>
            <rect x={-BOX.w / 2} y={-BOX.h / 2} width={BOX.w} height={BOX.h} rx={BOX.r} fill={redTone ? T.redSoft : W} stroke={LINE} strokeWidth={3} />
            <rect x={-BOX.w / 2} y={-BOX.h / 2} width={BOX.w} height={BOX.h} rx={BOX.r} fill="none" stroke={O} strokeWidth={5} opacity={lit} />
            <rect x={-BOX.w / 2} y={-BOX.h / 2} width={BOX.w} height={BOX.h} rx={BOX.r} fill="none" stroke={T.red} strokeWidth={5} opacity={lockedAmt} />
            <g transform="translate(0 -22) scale(1.12)" opacity={redTone ? 0.45 : 1}>
              <Ikon />
            </g>
            <text x={0} y={52} textAnchor="middle" fontFamily={TF.head} fontWeight={800} fontSize={16} letterSpacing={0.5} fill={redTone ? T.red : C}>
              {BOX_LABEL[i]}
            </text>
          </At>
        );
      })}

      {/* centang hijau (berhak) dan silang merah (terhalang) di sudut kotak */}
      {BOX_X.map((x, i) =>
        LOCK_BOX.includes(i) ? (
          bad > 0 ? (
            <At key={x} x={x + 46} y={BOX.y + 24} s={bad}>
              <Silang r={17} />
            </At>
          ) : null
        ) : ok > 0 ? (
          <At key={x} x={x + 46} y={BOX.y + 24} s={pop(f, P.berhak + (i === 0 ? 0 : 5))}>
            <Centang r={17} />
          </At>
        ) : null,
      )}

      {/* gembok: samar terbuka di atas garis, lalu jatuh dan terkunci merah */}
      {locks.map((l, k) =>
        l.show > 0 ? (
          <g key={k}>
            {l.ring > 0 && l.ring < 1 ? <circle cx={BOX_X[LOCK_BOX[k]]} cy={LOCK_Y - 22} r={26 + l.ring * 46} fill="none" stroke={T.red} strokeWidth={5} opacity={(1 - l.ring) * 0.6} /> : null}
            <At x={BOX_X[LOCK_BOX[k]]} y={l.y + (l.fall < 1 ? bob(f, k * 2, 3) * (1 - l.fall) : 0)} s={0.8 + 0.04 * l.fall + (pulse(k === 0 ? P.close1 : P.close2) + pulse(P.terhalang)) * 1.5} o={l.show * (0.35 + 0.65 * l.fall)}>
              <Gembok closed={l.closed} color={l.fall > 0.5 ? T.red : GREY} />
            </At>
          </g>
        ) : null,
      )}

      {/* kunci HUBUNGAN DARAH */}
      {keyIn > 0 && keyOut < 1 ? (
        <g opacity={keyIn * (1 - keyOut)} transform={`translate(${-196 - (1 - keyIn) * 90} ${LEGEND_Y})`}>
          <g transform={`rotate(${-14 + keyTurn * 14})`}>
            <Kunci />
          </g>
          <g transform="translate(168 0)">
            <rect x={0} y={-28} width={268} height={56} rx={28} fill={T.orangeSoft} />
            <text x={134} y={8} textAnchor="middle" fontFamily={TF.head} fontWeight={800} fontSize={22} letterSpacing={2} fill={O}>
              HUBUNGAN DARAH
            </text>
          </g>
        </g>
      ) : null}

      {/* legenda status */}
      {ok > 0 ? (
        <At x={-132} y={LEGEND_Y} s={ok}>
          <rect x={-100} y={-28} width={200} height={56} rx={28} fill={T.greenSoft} />
          <g transform="translate(-68 0)">
            <Centang r={15} />
          </g>
          <text x={14} y={8} textAnchor="middle" fontFamily={TF.head} fontWeight={800} fontSize={20} letterSpacing={2} fill={T.green}>
            BERHAK
          </text>
        </At>
      ) : null}
      {bad > 0 ? (
        <At x={132} y={LEGEND_Y} s={bad}>
          <rect x={-110} y={-28} width={220} height={56} rx={28} fill={T.redSoft} />
          <g transform="translate(-78 0)">
            <Silang r={15} />
          </g>
          <text x={18} y={8} textAnchor="middle" fontFamily={TF.head} fontWeight={800} fontSize={20} letterSpacing={2} fill={T.red}>
            TERHALANG
          </text>
        </At>
      ) : null}
    </>
  );
};
