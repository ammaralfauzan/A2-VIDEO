import React from 'react';
import {TF, T} from '../../brands/tams-consulting/theme';
import {At, C, L, O, bob, pop} from '../wasiat-maksimal-sepertiga/Ilustrasi';
import {HOUSE, ITEM_LABEL, ITEM_LABEL_Y, ITEM_X, ITEM_Y, LEGEND_Y, LOCK_ITEM, LOCK_Y, P, flowAt, flowPath} from './layout';
import {Centang, Gembok, IkonCabang, IkonCincin, IkonPohon, IkonTunas, KEYHOLE, Kunci, LabelGantung, Rumah, Silang} from './Ikon';

// Adegan motion graphic (revisi 2 Bos, 25 Nov 2026: "jangan seperti bagan", "tanpa frame/kartu di belakang").
// Rumah PEWARIS muncul, empat benda keluarga melayang di bawahnya tanpa kotak. Kunci kuningan berlabel HUBUNGAN DARAH
// masuk ke lubang kunci pintu dan berputar, pintu terbuka, rumah menyala, lalu aliran cahaya lengkung mengalir dari
// pintu ke tiap benda (titik cahaya bergerak). Gembok merah jatuh ke ujung aliran SAUDARA lalu ORANG TUA, mengunci:
// aliran memerah dan berhenti, benda memudar abu. Tanpa makhluk bernyawa, tanpa angka.
export {Gembok, Kunci};

const IKON = [IkonTunas, IkonCabang, IkonPohon, IkonCincin];
const line = {fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};

const lockState = (f: number, k: number) => {
  const dropAt = k === 0 ? P.lock1 : P.lock2;
  const close = k === 0 ? P.close1 : P.close2;
  return {
    show: L(f, dropAt, dropAt + 4), // muncul cepat dan padat (tanpa bayangan transparan yang menunggu)
    fall: pop(f, dropAt),
    closed: L(f, close, close + 5),
    ring: L(f, close, close + 18),
  };
};

export const Diagram: React.FC<{f: number}> = ({f}) => {
  const house = pop(f, P.diagIn);
  const tag = L(f, P.diagIn + 10, P.diagIn + 22);
  const keyIn = L(f, P.keyIn, P.keyIn + 18);
  const keyTurn = L(f, P.glow - 4, P.glow + 6); // mata kunci berputar
  const door = L(f, P.glow + 4, P.glow + 14);
  const lit = L(f, P.glow + 4, P.glow + 20);
  const keyOut = L(f, P.glow + 10, P.glow + 22);
  const locks = [0, 1].map((k) => lockState(f, k));
  const ok = pop(f, P.berhak);
  const bad = pop(f, P.terhalang);
  const pulse = (start: number) => (f >= start && f < start + 20 ? Math.sin(((f - start) / 20) * Math.PI) * 0.08 : 0);
  // getaran kecil benda yang nanti tertahan, saat "penghalang" disebut
  const shake = (i: number) => (LOCK_ITEM.includes(i) && f >= P.ghosts && f < P.ghosts + 16 ? Math.sin((f - P.ghosts) * 1.6) * 4 * (1 - (f - P.ghosts) / 16) : 0);
  const kx = HOUSE.x + KEYHOLE.x - (1 - keyIn) * 220 - keyOut * 120;
  const ky = HOUSE.y + KEYHOLE.y - keyOut * 30;
  return (
    <>
      <defs>
        <radialGradient id="pw-light">
          <stop offset="0" stopColor={O} stopOpacity={0.16} />
          <stop offset="0.6" stopColor={O} stopOpacity={0.06} />
          <stop offset="1" stopColor={O} stopOpacity={0} />
        </radialGradient>
        <filter id="pw-gray">
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      {/* cahaya lembut di belakang rumah saat pintu terbuka */}
      {/* pendar cahaya memudar ke tepi (gradasi hanya untuk cahaya), bukan bidang berbatas */}
      <circle cx={0} cy={150} r={190 + lit * 30} fill="url(#pw-light)" opacity={lit} />
      <ellipse cx={0} cy={HOUSE.y + 8} rx={150} ry={11} fill="rgba(10,10,10,.08)" opacity={house} />

      {/* aliran cahaya dari pintu ke tiap benda */}
      {ITEM_X.map((x, i) => {
        const rank = Math.abs(i - 1.5) > 1 ? 1 : 0;
        const v = L(f, P.glow + 14 + rank * 6, P.glow + 34 + rank * 6);
        if (v <= 0.01) return null;
        const k = LOCK_ITEM.indexOf(i);
        const shut = k >= 0 ? locks[k].closed : 0;
        const flowStart = P.glow + 34 + rank * 6;
        return (
          <g key={x}>
            <path d={flowPath(x)} stroke={O} strokeWidth={16} {...line} opacity={0.14 * (1 - shut)} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - v} />
            <path d={flowPath(x)} stroke={O} strokeWidth={6} {...line} opacity={1 - shut} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - v} />
            {shut > 0 ? <path d={flowPath(x)} stroke={T.red} strokeWidth={6} {...line} opacity={shut} strokeDasharray="2 14" /> : null}
            {/* titik cahaya mengalir; berhenti bila aliran terkunci */}
            {f > flowStart && shut < 1
              ? [0, 1, 2].map((d) => {
                  const t = (((f - flowStart) / 42 + d / 3) % 1 + 1) % 1;
                  const [px, py] = flowAt(x, t);
                  return <circle key={d} cx={px} cy={py} r={5.5} fill={O} opacity={(1 - shut) * Math.min(1, t * 6, (1 - t) * 6)} />;
                })
              : null}
          </g>
        );
      })}

      {/* rumah PEWARIS */}
      <At x={HOUSE.x} y={HOUSE.y} s={house}>
        <Rumah lit={lit} door={door} />
      </At>
      <g opacity={tag} transform={`translate(${(1 - tag) * 12} 0)`}>
        <circle cx={160} cy={112} r={6} fill={O} />
        <text x={176} y={120} fontFamily={TF.head} fontWeight={800} fontSize={22} letterSpacing={4} fill={C}>
          PEWARIS
        </text>
      </g>

      {/* empat benda keluarga, tanpa kotak */}
      {ITEM_X.map((x, i) => {
        const p = pop(f, P.boxesIn + i * 4);
        const k = LOCK_ITEM.indexOf(i);
        const lockedAmt = k >= 0 ? locks[k].closed : 0;
        const s = p * (1 + (k >= 0 ? pulse(k === 0 ? P.close1 : P.close2) + pulse(P.terhalang) : pulse(P.berhak)));
        const Ikon = IKON[i];
        const y = ITEM_Y + bob(f, i * 1.7, 3) * (1 - lockedAmt);
        return (
          <g key={x}>
            <ellipse cx={x} cy={ITEM_Y + 60} rx={44 * p} ry={7 * p} fill={lockedAmt > 0.5 ? T.redSoft : 'rgba(10,10,10,.08)'} />
            <At x={x + shake(i)} y={y} s={s}>
              <g opacity={1 - lockedAmt * 0.55} filter={lockedAmt > 0.5 ? 'url(#pw-gray)' : undefined}>
                <Ikon />
              </g>
            </At>
            <text x={x} y={ITEM_LABEL_Y} textAnchor="middle" fontFamily={TF.head} fontWeight={800} fontSize={20} letterSpacing={1.5} fill={lockedAmt > 0.5 ? T.red : C} opacity={L(f, P.boxesIn + i * 4 + 4, P.boxesIn + i * 4 + 14)}>
              {ITEM_LABEL[i]}
            </text>
          </g>
        );
      })}

      {/* centang hijau (berhak) dan silang merah (terhalang) */}
      {ITEM_X.map((x, i) =>
        LOCK_ITEM.includes(i) ? (
          bad > 0 ? (
            <At key={x} x={x + 52} y={ITEM_Y - 60} s={bad}>
              <Silang r={17} />
            </At>
          ) : null
        ) : ok > 0 ? (
          <At key={x} x={x + 52} y={ITEM_Y - 60} s={pop(f, P.berhak + (i === 0 ? 0 : 5))}>
            <Centang r={17} />
          </At>
        ) : null,
      )}

      {/* gembok: jatuh padat dengan pegas, lalu lengkung menutup "klik" */}
      {locks.map((l, k) => {
        if (l.show <= 0) return null;
        const x = ITEM_X[LOCK_ITEM[k]];
        const y = LOCK_Y - (1 - l.fall) * 70;
        const sc = 0.8 * (1 + (pulse(k === 0 ? P.close1 : P.close2) + pulse(P.terhalang)) * 1.4);
        return (
          <g key={k}>
            {l.ring > 0 && l.ring < 1 ? <circle cx={x} cy={LOCK_Y - 30} r={30 + l.ring * 44} fill="none" stroke={T.red} strokeWidth={4} opacity={(1 - l.ring) * 0.55} /> : null}
            {l.ring > 0 && l.ring < 1
              ? [0, 1, 2, 3].map((d) => {
                  const a = (-150 + d * 40) * (Math.PI / 180);
                  const r0 = 50 + l.ring * 18;
                  return <path key={d} d={`M${x + Math.cos(a) * r0} ${LOCK_Y - 46 + Math.sin(a) * r0} l${Math.cos(a) * 12} ${Math.sin(a) * 12}`} stroke={T.red} strokeWidth={4} strokeLinecap="round" opacity={1 - l.ring} />;
                })
              : null}
            <At x={x} y={y} s={sc} o={l.show}>
              <Gembok closed={l.closed} />
            </At>
          </g>
        );
      })}

      {/* kunci HUBUNGAN DARAH: masuk ke lubang kunci, berputar, lalu pergi */}
      {keyIn > 0 && keyOut < 1 ? (
        <g opacity={keyIn * (1 - keyOut)} transform={`translate(${kx} ${ky})`}>
          <path d="M-170 20 Q-176 44 -170 66" stroke="rgba(10,10,10,.35)" strokeWidth={2.5} fill="none" />
          <g transform="translate(-170 66) rotate(4)">
            <g transform="translate(-14 0)">
              <LabelGantung text="HUBUNGAN DARAH" w={196} />
            </g>
          </g>
          <Kunci bit={Math.cos(keyTurn * Math.PI)} />
        </g>
      ) : null}

      {/* keterangan status (tanpa kapsul berbingkai) */}
      {ok > 0 ? (
        <At x={-130} y={LEGEND_Y} s={ok}>
          <Centang r={15} />
          <text x={26} y={7} fontFamily={TF.head} fontWeight={800} fontSize={20} letterSpacing={2} fill={T.green}>
            BERHAK
          </text>
        </At>
      ) : null}
      {bad > 0 ? (
        <At x={74} y={LEGEND_Y} s={bad}>
          <Silang r={15} />
          <text x={26} y={7} fontFamily={TF.head} fontWeight={800} fontSize={20} letterSpacing={2} fill={T.red}>
            TERHALANG
          </text>
        </At>
      ) : null}
    </>
  );
};
