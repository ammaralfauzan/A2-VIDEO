import React from 'react';
import {interpolate} from 'remotion';
import {clamp, ease, sp} from '../../components/motion';
import {S, sf, wf} from '../../data/timeline-alasan-saya-bikin-a2';
import {color, radius, shadow} from '../../theme';
import {P, STAGE} from './layout';

// Ilustrasi animasi cerita di panggung atas (permintaan Bos): gambar datar dari token warna A2,
// satu adegan per bagian cerita, berganti dengan pudar (adegan lama habis dulu, baru yang baru masuk).
//  A pemilik usaha pulang larut       B ramai pesanan, mengetik ulang hal sama, lalu tenaga habis
//  D keluarga menunggu, kursi kosong   E pekerjaan berulang dikerjakan mesin
//  F orangnya fokus ke pelanggan       G pulang tepat waktu, kursi terisi (alasan itu manusia)

const W = STAGE.w;
const H = STAGE.h;
const FLOOR = 300;

// Jendela tampil tiap adegan [mulai, selesai] dalam frame video.
const SC = {
  A: () => [P.stageIn(), sf(S.ketik) - 6] as const,
  B: () => [sf(S.ketik) - 6, sf(S.waktu) - 4] as const,
  D: () => [sf(S.waktu) - 4, sf(S.pikir) - 4] as const,
  E: () => [sf(S.pikir) - 4, sf(S.manusia) - 4] as const,
  F: () => [sf(S.manusia) - 4, sf(S.bukan) - 4] as const,
  G: () => [sf(S.bukan) - 4, P.stageOut()] as const,
};

const lin = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], {...clamp, easing: ease});
const pop = (f: number, at: number) => sp(f, at, 14);
const popStyle = (p: number, ox: number, oy: number) => ({
  opacity: interpolate(p, [0, 0.5], [0, 1], clamp),
  transform: `translate(${ox}px, ${oy}px) scale(${0.85 + 0.15 * p}) translate(${-ox}px, ${-oy}px)`,
});

// ---------- Bentuk dasar ----------

type PersonProps = {
  x: number;
  y: number; // dasar kaki
  s?: number;
  body: string;
  walk?: number; // fase langkah (radian) saat berjalan
  slump?: number; // 0..1 lunglai: badan memendek, kepala turun
  smile?: boolean;
  handR?: {x: number; y: number}; // posisi tangan kanan (lokal, relatif kaki)
  handL?: {x: number; y: number};
  bag?: boolean;
  hop?: number; // lompatan kecil (px)
  ink?: string; // warna kepala dan kaki (terang untuk latar malam)
};

const Person: React.FC<PersonProps> = ({x, y, s = 1, body, walk, slump = 0, smile, handR, handL, bag, hop = 0, ink = color.navy}) => {
  const sw = walk !== undefined ? Math.sin(walk) : 0;
  const legA = sw * 20;
  const leg = (deg: number, dx: number) => {
    const r = (deg * Math.PI) / 180;
    return <line x1={dx} y1={-56} x2={dx + Math.sin(r) * 54} y2={-56 + Math.cos(r) * 54} stroke={ink} strokeWidth={12} strokeLinecap="round" />;
  };
  const top = -124 + slump * 20;
  const headY = -146 + slump * 44;
  const headX = slump * 4;
  const shoulderY = top + 14;
  const hr = handR ?? {x: 26 + sw * 8, y: -66};
  const hl = handL ?? {x: -26 - sw * 8, y: -66};
  return (
    <g transform={`translate(${x} ${y - hop}) scale(${s})`}>
      {leg(legA, -9)}
      {leg(-legA, 9)}
      <line x1={-16} y1={shoulderY} x2={hl.x} y2={hl.y} stroke={body} strokeWidth={11} strokeLinecap="round" />
      <rect x={-23} y={top} width={46} height={-56 - top + 8} rx={20} fill={body} />
      <line x1={16} y1={shoulderY} x2={hr.x} y2={hr.y} stroke={body} strokeWidth={11} strokeLinecap="round" />
      {bag ? <rect x={hr.x - 10} y={hr.y} width={22} height={26} rx={5} fill={ink} /> : null}
      <circle cx={headX} cy={headY} r={19} fill={ink} />
      {smile ? <path d={`M${headX - 7},${headY + 4} Q${headX},${headY + 11} ${headX + 7},${headY + 4}`} stroke={ink === color.navy ? color.surface : color.navy} strokeWidth={3} fill="none" strokeLinecap="round" /> : null}
    </g>
  );
};

const Moon: React.FC<{x: number; y: number; r: number; sky: string}> = ({x, y, r, sky}) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={color.surface} />
    <circle cx={x + r * 0.45} cy={y - r * 0.3} r={r * 0.85} fill={sky} />
  </g>
);

const Stars: React.FC<{f: number; pts: [number, number][]}> = ({f, pts}) => (
  <>
    {pts.map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={2.6} fill={color.surface} opacity={0.45 + 0.45 * Math.sin(f / 9 + i * 1.7)} />
    ))}
  </>
);

// Jendela rumah; malam (bulan) atau senja (matahari).
const HomeWindow: React.FC<{f: number; x: number; y: number; night: boolean}> = ({f, x, y, night}) => {
  const w = 140;
  const h = 100;
  const sky = night ? color.navy : color.blue1;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={sky} />
      {night ? (
        <>
          <Moon x={x + 98} y={y + 36} r={16} sky={sky} />
          <Stars f={f} pts={[[x + 26, y + 24], [x + 52, y + 58], [x + 30, y + 80]]} />
        </>
      ) : (
        <circle cx={x + 70} cy={y + 84} r={26} fill={color.surface} opacity={0.9} />
      )}
      <rect x={x} y={y} width={w} height={h} rx={10} fill="none" stroke={color.navy} strokeWidth={6} />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke={color.navy} strokeWidth={5} />
    </g>
  );
};

const Clock: React.FC<{x: number; y: number; r: number; min: number; hour: number}> = ({x, y, r, min, hour}) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={color.surface} stroke={color.navy} strokeWidth={5} />
    {[0, 90, 180, 270].map((a) => (
      <circle key={a} cx={x + Math.sin((a * Math.PI) / 180) * (r - 9)} cy={y - Math.cos((a * Math.PI) / 180) * (r - 9)} r={2.4} fill={color.navy} />
    ))}
    <line x1={x} y1={y} x2={x + Math.sin((hour * Math.PI) / 180) * r * 0.45} y2={y - Math.cos((hour * Math.PI) / 180) * r * 0.45} stroke={color.navy} strokeWidth={5} strokeLinecap="round" />
    <line x1={x} y1={y} x2={x + Math.sin((min * Math.PI) / 180) * r * 0.72} y2={y - Math.cos((min * Math.PI) / 180) * r * 0.72} stroke={color.blue2} strokeWidth={4} strokeLinecap="round" />
  </g>
);

// Gear sederhana (mesin), bukan maskot.
const Cog: React.FC<{x: number; y: number; r: number; a: number; fill: string; hole: string}> = ({x, y, r, a, fill, hole}) => (
  <g transform={`translate(${x} ${y}) rotate(${a})`}>
    {Array.from({length: 8}, (_, i) => (
      <rect key={i} x={-r * 0.16} y={-r} width={r * 0.32} height={r * 0.4} rx={2} fill={fill} transform={`rotate(${i * 45})`} />
    ))}
    <circle r={r * 0.78} fill={fill} />
    <circle r={r * 0.36} fill={hole} />
  </g>
);

// Kartu kecil berisi baris yang sama (pekerjaan berulang).
const RowCard: React.FC<{x: number; y: number; w?: number; done?: boolean}> = ({x, y, w = 58, done}) => (
  <g>
    <rect x={x} y={y} width={w} height={42} rx={8} fill={color.surface} stroke={done ? color.success : color.line} strokeWidth={3} />
    <rect x={x + 9} y={y + 11} width={w * 0.55} height={6} rx={3} fill={color.muted} />
    <rect x={x + 9} y={y + 24} width={w * 0.4} height={6} rx={3} fill={color.muted} />
    {done ? (
      <g>
        <circle cx={x + w - 4} cy={y + 4} r={11} fill={color.success} />
        <path d={`M${x + w - 9},${y + 4} l4,4 l7,-8`} stroke={color.surface} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    ) : null}
  </g>
);

const Bubble: React.FC<{x: number; y: number; w: number; tailRight?: boolean; children?: React.ReactNode}> = ({x, y, w, tailRight, children}) => (
  <g>
    <rect x={x} y={y} width={w} height={48} rx={16} fill={color.surface} stroke={color.line} strokeWidth={3} />
    <path d={tailRight ? `M${x + w - 34},${y + 46} l12,14 l4,-14` : `M${x + 22},${y + 46} l-4,14 l12,-14`} fill={color.surface} stroke={color.line} strokeWidth={3} strokeLinejoin="round" />
    <rect x={x + 3} y={y + 40} width={w - 6} height={6} fill={color.surface} />
    {children}
  </g>
);

const Dots: React.FC<{x: number; y: number; f: number}> = ({x, y, f}) => (
  <>
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={x + i * 16} cy={y - Math.max(0, Math.sin(f / 4 - i * 0.9)) * 4} r={5} fill={color.blue2} />
    ))}
  </>
);

const Heart: React.FC<{x: number; y: number; s: number}> = ({x, y, s}) => (
  <path
    transform={`translate(${x} ${y}) scale(${s})`}
    d="M0,10 C-14,-2 -22,-12 -14,-20 C-8,-26 -2,-22 0,-16 C2,-22 8,-26 14,-20 C22,-12 14,-2 0,10 Z"
    fill={color.alert}
  />
);

// Meja makan dengan panel depan (menutup kaki orang yang duduk di belakangnya).
const Table: React.FC<{x: number; w: number}> = ({x, w}) => (
  <g>
    <rect x={x} y={232} width={w} height={H - 232} fill={color.line} />
    <rect x={x - 8} y={226} width={w + 16} height={14} rx={5} fill={color.navy} />
  </g>
);

const Plate: React.FC<{x: number}> = ({x}) => <ellipse cx={x} cy={224} rx={26} ry={6} fill={color.surface} stroke={color.muted} strokeWidth={3} />;

const Floor: React.FC = () => <rect x={0} y={FLOOR} width={W} height={H - FLOOR} fill={color.line} opacity={0.6} />;

// ---------- Adegan ----------

// A. Malam, toko masih menyala; pemilik usaha keluar dan pulang larut, lampu toko padam.
const SceneA: React.FC<{f: number; t0: number}> = ({f, t0}) => {
  const t = f - t0;
  const moonY = interpolate(t, [0, 50], [110, 66], {...clamp, easing: ease});
  const walkU = lin(t, 14, 92);
  const lightOn = 1 - 0.85 * lin(t, 62, 70);
  const px = 286 + walkU * 270;
  return (
    <g>
      <rect width={W} height={H} fill={color.navy} />
      <Stars f={f} pts={[[60, 40], [150, 76], [420, 34], [500, 96], [690, 46], [250, 30], [560, 140]]} />
      <Moon x={620} y={moonY} r={28} sky={color.navy} />
      <rect y={FLOOR} width={W} height={H - FLOOR} fill={color.navyInk} />
      {/* toko */}
      <rect x={70} y={136} width={280} height={164} fill={color.blue2} opacity={0.55} />
      <rect x={150} y={96} width={120} height={28} rx={7} fill={color.surface} opacity={0.9} />
      <rect x={166} y={106} width={56} height={8} rx={4} fill={color.navy} />
      {Array.from({length: 7}, (_, i) => (
        <rect key={i} x={60 + i * 43} y={128} width={43} height={30} fill={i % 2 ? color.surface : color.blue1} />
      ))}
      <rect x={96} y={186} width={118} height={78} rx={6} fill={color.surface} opacity={0.15 + 0.85 * lightOn} />
      <rect x={110} y={214} width={90} height={5} fill={color.muted} opacity={lightOn} />
      <rect x={110} y={240} width={90} height={5} fill={color.muted} opacity={lightOn} />
      <rect x={250} y={190} width={72} height={110} rx={4} fill={color.navyInk} />
      <rect x={258} y={198} width={56} height={102} fill={color.surface} opacity={0.3 * lightOn} />
      {/* pemilik usaha berjalan pulang, lunglai, membawa tas */}
      <Person x={px} y={FLOOR} s={1.1} body={color.blue1} ink={color.line} walk={walkU < 1 && walkU > 0 ? t * 0.32 : undefined} slump={0.35} bag />
    </g>
  );
};

// B. Meja kerja malam: ramai pesanan masuk, lalu mengetik ulang hal yang sama di tiga tempat,
// lalu tenaga habis (badan lunglai, baterai turun).
const SceneB: React.FC<{f: number}> = ({f}) => {
  const bubbleOut = 1 - lin(f, wf(S.ketik, 3) - 8, wf(S.ketik, 3) - 2);
  const typeStart = wf(S.ketik, 4) - 2; // "mengetik"
  const cardsOut = 1 - lin(f, sf(S.sadar) - 6, sf(S.sadar) + 2);
  const slump = lin(f, sf(S.sadar), sf(S.sadar) + 24);
  const typing = f >= typeStart && f < sf(S.sadar);
  const tap = typing ? Math.abs(Math.sin(f * 0.9)) * 6 : 0;
  const level = interpolate(f, [wf(S.sadar, 4), wf(S.sadar, 7) + 12], [0.85, 0.1], {...clamp, easing: ease});
  const batt = pop(f, sf(S.sadar) + 8);
  const bubbles = [
    {x: 470, y: 46},
    {x: 560, y: 116},
    {x: 470, y: 186},
  ];
  return (
    <g>
      <rect width={W} height={H} fill={color.canvas} />
      <HomeWindow f={f} x={36} y={30} night />
      <Floor />
      {/* lampu meja */}
      <circle cx={150} cy={190} r={74} fill={color.blue1} opacity={0.1} />
      <line x1={138} y1={226} x2={150} y2={176} stroke={color.navy} strokeWidth={5} strokeLinecap="round" />
      <path d="M128,176 L172,176 L162,154 L138,154 Z" fill={color.blue2} />
      {/* orang di belakang meja, laptop dilihat dari belakang */}
      <Person
        x={280}
        y={FLOOR}
        body={color.blue1}
        slump={slump}
        handR={{x: 40, y: -86 + 6 * slump - (typing ? tap : 0)}}
        handL={{x: -30, y: -84 + 6 * slump - (typing ? 6 - tap : 0)}}
      />
      <rect x={316} y={160} width={112} height={68} rx={7} fill={color.muted} />
      <circle cx={372} cy={194} r={7} fill={color.line} />
      <Table x={110} w={360} />
      {/* ramai pesanan: "bukan karena sepi" */}
      {bubbleOut > 0
        ? bubbles.map((b, i) => {
            const p = pop(f, wf(S.ketik, i) - 4);
            if (p <= 0.001) return null;
            return (
              <g key={i} style={popStyle(p, b.x + 60, b.y + 24)} opacity={bubbleOut}>
                <Bubble x={b.x} y={b.y} w={124}>
                  <rect x={b.x + 16} y={b.y + 16} width={20} height={18} rx={4} fill={color.blue1} />
                  <path d={`M${b.x + 20},${b.y + 17} q6,-10 12,0`} stroke={color.blue1} strokeWidth={3} fill="none" />
                  <rect x={b.x + 46} y={b.y + 16} width={56} height={6} rx={3} fill={color.muted} />
                  <rect x={b.x + 46} y={b.y + 28} width={36} height={6} rx={3} fill={color.muted} />
                </Bubble>
              </g>
            );
          })
        : null}
      {/* mengetik ulang hal yang sama: baris identik terketik di tiga kartu bergantian */}
      {f >= wf(S.ketik, 3) - 4 && cardsOut > 0
        ? [0, 1, 2].map((i) => {
            const cx = 488;
            const cy = 34 + i * 92;
            const p = pop(f, wf(S.ketik, 3) - 4 + i * 3);
            const head = [color.blue1, color.blue2, color.success][i];
            return (
              <g key={i} style={popStyle(p, cx + 100, cy + 40)} opacity={cardsOut}>
                <rect x={cx} y={cy} width={200} height={80} rx={12} fill={color.surface} stroke={color.line} strokeWidth={3} />
                <rect x={cx + 14} y={cy + 14} width={22} height={22} rx={6} fill={head} />
                <rect x={cx + 46} y={cy + 20} width={70} height={8} rx={4} fill={color.line} />
                {[0, 1].map((r) => {
                  const k = r * 3 + i;
                  const u = lin(f, typeStart + k * 9, typeStart + k * 9 + 9);
                  return (
                    <g key={r}>
                      <rect x={cx + 14} y={cy + 46 + r * 16} width={90 * u} height={7} rx={3.5} fill={color.navy} opacity={0.75} />
                      <rect x={cx + 108} y={cy + 46 + r * 16} width={50 * u} height={7} rx={3.5} fill={color.blue2} opacity={0.75} />
                    </g>
                  );
                })}
              </g>
            );
          })
        : null}
      {/* tenaga habis */}
      {batt > 0.001 ? (
        <g style={popStyle(batt, 590, 150)}>
          <rect x={524} y={120} width={130} height={62} rx={12} fill={color.surface} stroke={color.navy} strokeWidth={6} />
          <rect x={656} y={138} width={10} height={26} rx={3} fill={color.navy} />
          <rect x={534} y={130} width={110 * level} height={42} rx={6} fill={level > 0.4 ? color.success : color.alert} />
        </g>
      ) : null}
    </g>
  );
};

// D. Di rumah, malam: keluarga menunggu, satu kursi kosong; jam berputar cepat;
// waktu untuk berpikir (awan bohlam) ikut meredup.
const SceneD: React.FC<{f: number; t0: number}> = ({f, t0}) => {
  const t = f - t0;
  const chairHi = interpolate(f, [wf(S.waktu, 2) - 2, wf(S.waktu, 2) + 6, wf(S.waktu, 2) + 30], [0, 1, 0.35], clamp);
  const thinkIn = pop(f, wf(S.waktu, 5) - 4);
  const fade = lin(f, wf(S.waktu, 7) - 4, wf(S.waktu, 7) + 16);
  const famOp = 1 - 0.45 * fade;
  return (
    <g>
      <rect width={W} height={H} fill={color.canvas} />
      <HomeWindow f={f} x={40} y={30} night />
      <Clock x={470} y={72} r={36} min={t * 14} hour={120 + t * 1.2} />
      <Floor />
      <g opacity={famOp}>
        <Person x={210} y={FLOOR + 8} body={color.blue1} />
        <Person x={322} y={FLOOR - 14} s={0.72} body={color.success} />
      </g>
      {/* kursi kosong */}
      <rect x={410} y={150} width={56} height={84} rx={10} fill="none" stroke={chairHi > 0 ? color.blue2 : color.muted} strokeWidth={5} strokeDasharray="10 8" opacity={0.5 + 0.5 * chairHi} />
      <Table x={140} w={370} />
      <Plate x={210} />
      <Plate x={322} />
      <Plate x={438} />
      {/* waktu untuk berpikir: awan bohlam yang meredup */}
      {thinkIn > 0.001 ? (
        <g style={popStyle(thinkIn, 610, 150)} opacity={1 - 0.75 * fade}>
          <circle cx={566} cy={238} r={8} fill={color.surface} stroke={color.line} strokeWidth={3} />
          <circle cx={584} cy={212} r={12} fill={color.surface} stroke={color.line} strokeWidth={3} />
          <ellipse cx={622} cy={150} rx={66} ry={52} fill={color.surface} stroke={color.line} strokeWidth={3} />
          <circle cx={622} cy={142} r={26 + 10 * (1 - fade)} fill={color.blue1} opacity={0.18 * (1 - fade)} />
          <circle cx={622} cy={140} r={20} fill={fade > 0.5 ? color.muted : color.blue1} opacity={1 - 0.4 * fade} />
          <rect x={612} y={160} width={20} height={14} rx={3} fill={color.navy} />
        </g>
      ) : null}
    </g>
  );
};

// E. Pekerjaan berulang masuk ke mesin, keluar rapi dan selesai.
const SceneE: React.FC<{f: number; t0: number}> = ({f, t0}) => {
  const t = f - t0;
  const N = 6;
  const start = t0 + 30;
  const gap = 15;
  const glow = interpolate(f, [P.mesin() - 2, P.mesin() + 6, P.mesin() + 30], [0, 1, 0.4], clamp);
  const departed = (k: number) => f >= start + k * gap;
  const remaining = Array.from({length: N}, (_, k) => k).filter((k) => !departed(k));
  return (
    <g>
      <rect width={W} height={H} fill={color.canvas} />
      <HomeWindow f={f} x={40} y={30} night={false} />
      <Floor />
      {/* ban berjalan */}
      <rect x={60} y={266} width={600} height={12} rx={6} fill={color.navy} />
      {Array.from({length: 9}, (_, i) => (
        <circle key={i} cx={90 + i * 68} cy={272} r={4} fill={color.line} transform={`rotate(${t * 6} ${90 + i * 68} 272)`} />
      ))}
      {/* tumpukan pekerjaan yang sama, menunggu */}
      {remaining.map((k, j) => (
        <RowCard key={k} x={80} y={222 - j * 14} />
      ))}
      {/* item berjalan masuk dan keluar mesin */}
      {Array.from({length: N}, (_, k) => {
        const p = (f - (start + k * gap)) / 40;
        if (p < 0) return null;
        const outY = 222 - k * 14;
        if (p < 0.45) return <RowCard key={k} x={80 + (p / 0.45) * 220} y={222} />;
        if (p < 0.6) return null;
        const u = Math.min(1, (p - 0.6) / 0.4);
        const e = ease(u);
        return <RowCard key={k} x={440 + e * 150} y={222 + (outY - 222) * e} done />;
      })}
      {/* mesin */}
      <circle cx={370} cy={200} r={110} fill={color.blue1} opacity={0.12 * glow} />
      <rect x={300} y={140} width={140} height={130} rx={18} fill={color.navy} />
      <circle cx={370} cy={196} r={42} fill={color.navyInk} />
      <Cog x={370} y={196} r={34} a={t * 5} fill={color.blue1} hole={color.navyInk} />
      <circle cx={420} cy={156} r={6} fill={color.success} opacity={0.5 + 0.5 * Math.sin(t / 4)} />
    </g>
  );
};

// F. Orangnya fokus ke pelanggan: ngobrol, berjabat tangan; mesin kecil bekerja sendiri di pojok.
const SceneF: React.FC<{f: number; t0: number}> = ({f, t0}) => {
  const t = f - t0;
  const b1 = pop(f, t0 + 12);
  const b2 = pop(f, t0 + 40);
  const shake = lin(f, wf(S.manusia, 5) - 10, wf(S.manusia, 5) + 2);
  const bob = shake >= 1 ? Math.sin((f - wf(S.manusia, 5)) / 3) * 4 : 0;
  const ticks = [0, 1, 2].filter((i) => t > 20 + i * 22);
  return (
    <g>
      <rect width={W} height={H} fill={color.canvas} />
      <Floor />
      {/* mesin kecil di pojok, terus bekerja */}
      <rect x={560} y={26} width={136} height={86} rx={14} fill={color.navy} />
      <Cog x={600} y={69} r={24} a={t * 6} fill={color.blue1} hole={color.navy} />
      {ticks.map((i) => (
        <g key={i}>
          <circle cx={646} cy={46 + i * 22} r={8} fill={color.success} />
          <path d={`M${642},${46 + i * 22} l3,3 l5,-6`} stroke={color.surface} strokeWidth={2.5} fill="none" strokeLinecap="round" />
        </g>
      ))}
      <Person x={250} y={FLOOR} body={color.blue1} smile handR={{x: 26 + shake * 78, y: -66 - shake * 24 + bob}} />
      <Person x={460} y={FLOOR} body={color.blue2} smile handL={{x: -26 - shake * 78, y: -66 - shake * 24 + bob}} />
      {b1 > 0.001 ? (
        <g style={popStyle(b1, 460, 110)}>
          <Bubble x={410} y={52} w={110} tailRight={false}>
            <Dots x={442} y={76} f={f} />
          </Bubble>
        </g>
      ) : null}
      {b2 > 0.001 ? (
        <g style={popStyle(b2, 250, 110)}>
          <Bubble x={170} y={52} w={110} tailRight>
            <Heart x={225} y={80} s={0.75} />
          </Bubble>
        </g>
      ) : null}
    </g>
  );
};

// G. Pulang tepat waktu: senja, pemilik masuk dan duduk di kursi yang tadi kosong.
const SceneG: React.FC<{f: number; t0: number}> = ({f, t0}) => {
  const t = f - t0;
  const walk = lin(t, 4, 44);
  const sit = lin(t, 44, 56);
  const px = 660 - walk * 222;
  const childHop = Math.max(0, Math.sin(((t - 40) / 18) * Math.PI)) * (t > 40 && t < 76 ? 14 : 0);
  const heart = pop(f, wf(S.alasan, 7) - 4);
  const beat = heart >= 1 ? 1 + 0.06 * Math.sin((f - wf(S.alasan, 7)) / 4) : 1;
  return (
    <g>
      <rect width={W} height={H} fill={color.canvas} />
      <HomeWindow f={f} x={40} y={30} night={false} />
      <Clock x={470} y={72} r={36} min={180 + t * 0.6} hour={150} />
      <Floor />
      <Person x={210} y={FLOOR + 8} body={color.blue1} smile />
      <Person x={322} y={FLOOR - 14} s={0.72} body={color.success} smile hop={childHop} />
      <Person x={px} y={FLOOR + 8 * sit} body={color.blue2} smile walk={walk > 0 && walk < 1 ? t * 0.32 : undefined} />
      <Table x={140} w={370} />
      <Plate x={210} />
      <Plate x={322} />
      <Plate x={438} />
      {heart > 0.001 ? (
        <g style={popStyle(heart, 324, 136)}>
          <Heart x={324} y={138} s={1.5 * beat} />
        </g>
      ) : null}
    </g>
  );
};

const sceneOpacity = (f: number, [a, b]: readonly [number, number], first: boolean) =>
  (first ? 1 : interpolate(f, [a, a + 10], [0, 1], clamp)) * interpolate(f, [b - 8, b], [1, 0], clamp);

export const Ilustrasi: React.FC<{f: number}> = ({f}) => {
  const inn = P.stageIn();
  const out = P.stageOut();
  if (f < inn || f > out + 12) return null;
  const card = sp(f, inn, 16);
  const cardOut = interpolate(f, [out, out + 10], [1, 0], clamp);
  const scenes: [keyof typeof SC, React.ReactNode][] = [
    ['A', <SceneA key="A" f={f} t0={SC.A()[0]} />],
    ['B', <SceneB key="B" f={f} />],
    ['D', <SceneD key="D" f={f} t0={SC.D()[0]} />],
    ['E', <SceneE key="E" f={f} t0={SC.E()[0]} />],
    ['F', <SceneF key="F" f={f} t0={SC.F()[0]} />],
    ['G', <SceneG key="G" f={f} t0={SC.G()[0]} />],
  ];
  return (
    <div
      style={{
        position: 'absolute',
        left: STAGE.left,
        top: STAGE.top,
        width: W,
        height: H,
        borderRadius: radius.window + 8,
        overflow: 'hidden',
        background: color.surface,
        boxShadow: shadow,
        opacity: interpolate(card, [0, 0.5], [0, 1], clamp) * cardOut,
        transform: `translateY(${(1 - card) * 24}px) scale(${0.94 + 0.06 * card})`,
        filter: card < 1 ? `blur(${(1 - card) * 6}px)` : undefined,
      }}
    >
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display: 'block'}}>
        {scenes.map(([k, node]) => {
          const win = SC[k]();
          if (f < win[0] || f > win[1]) return null;
          return (
            <g key={k} opacity={sceneOpacity(f, win, k === 'A')}>
              {node}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
