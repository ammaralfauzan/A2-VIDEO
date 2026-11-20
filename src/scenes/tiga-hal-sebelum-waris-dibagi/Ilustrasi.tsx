import React from 'react';
import {interpolate} from 'remotion';
import {clamp, ease} from '../../components/motion';
import {T, TF} from '../../brands/tams-consulting/theme';
import {ILLU, ILLU_SVG, P} from './layout';

// Revisi 1 Bos: ilustrasi benda yang jelas per penjelasan (tanpa orang, tanpa wajah; Brand Kit Tams), di kartu tengah
// (x 180–900). Gaya modern (permintaan Bos): semua sudut membulat, tanpa garis hitam tebal, bidang rata + rona
// (tint) dari token arang/oranye, bayangan lembut di bawah benda, lingkaran latar pudar. Detail kecil tetap ada
// (ikatan kain, cap, segel, pita buku).
const C = T.charcoal;
const O = T.orange;
const W = T.bg;
const OL = 'rgba(229,91,3,.16)'; // oranye muda
const OM = 'rgba(229,91,3,.45)';
const CL = 'rgba(43,43,43,.10)'; // arang muda
const CM = 'rgba(43,43,43,.28)';
const EDGE = 'rgba(10,10,10,.12)'; // garis tepi lembut
const SH = 'rgba(10,10,10,.07)'; // bayangan

const L = (f: number, a: number, b: number, from = 0, to = 1) => interpolate(f, [a, b], [from, to], {...clamp, easing: ease});
// Masuk "pop": tumbuh dari 0.6 dengan sedikit lewat.
const pop = (f: number, a: number) => {
  const p = interpolate(f, [a, a + 6, a + 12], [0, 1.08, 1], clamp);
  return {p: Math.min(1, L(f, a, a + 6)), s: 0.6 + 0.4 * p};
};
const at = (x: number, y: number, s = 1, r = 0) => `translate(${x} ${y}) rotate(${r}) scale(${s})`;
const grow = (x: number, y: number, s: number) => `translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})`;
// Persegi dengan sudut atas membulat saja (kepala dokumen).
const topRound = (x: number, y: number, w: number, h: number, r: number) => `M${x} ${y + h} L${x} ${y + r} Q${x} ${y} ${x + r} ${y} L${x + w - r} ${y} Q${x + w} ${y} ${x + w} ${y + r} L${x + w} ${y + h} Z`;
// Poligon bersudut bulat: isi + garis tebal warna sama dengan sambungan bulat.
const Soft: React.FC<{d: string; fill: string; r?: number}> = ({d, fill, r = 14}) => <path d={d} fill={fill} stroke={fill} strokeWidth={r} strokeLinejoin="round" />;
const Shadow: React.FC<{cx: number; cy?: number; rx: number}> = ({cx, cy = 350, rx}) => <ellipse cx={cx} cy={cy} rx={rx} ry={12} fill={SH} />;
const Backdrop: React.FC<{cx?: number; cy?: number; r?: number}> = ({cx = 360, cy = 200, r = 170}) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={OL} opacity={0.55} />
    <circle cx={cx + r * 0.95} cy={cy - r * 0.6} r={10} fill={OM} opacity={0.5} />
    <circle cx={cx - r * 1.05} cy={cy + r * 0.3} r={7} fill={CM} opacity={0.5} />
  </g>
);

// ---------- ikon kecil (dipakai di ikhtisar dan daftar), kotak 100x100 ----------
export type IconKind = 'kafan' | 'utang' | 'wasiat' | 'rumah';
export const MiniIcon: React.FC<{kind: IconKind}> = ({kind}) => {
  if (kind === 'kafan')
    return (
      <g>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={14 + i * 4} y={60 - i * 21} width={72 - i * 8} height={22} rx={11} fill={i === 1 ? CL : W} stroke={EDGE} strokeWidth={3} />
        ))}
        <rect x={33} y={14} width={8} height={70} rx={4} fill={O} />
        <rect x={60} y={14} width={8} height={70} rx={4} fill={O} />
      </g>
    );
  if (kind === 'utang')
    return (
      <g>
        <rect x={20} y={8} width={60} height={84} rx={12} fill={W} stroke={EDGE} strokeWidth={3} />
        <path d={topRound(20, 8, 60, 20, 12)} fill={C} />
        {[38, 50, 62].map((y) => (
          <rect key={y} x={30} y={y} width={40} height={6} rx={3} fill={CM} />
        ))}
        <rect x={42} y={70} width={34} height={16} rx={8} fill={O} />
      </g>
    );
  if (kind === 'wasiat')
    return (
      <g>
        <rect x={10} y={24} width={80} height={58} rx={12} fill={W} stroke={EDGE} strokeWidth={3} />
        <path d="M16 30 L50 58 L84 30" fill="none" stroke={CM} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={50} cy={58} r={12} fill={O} />
      </g>
    );
  return (
    <g>
      <Soft d="M18 46 L50 18 L82 46 Z" fill={C} r={10} />
      <rect x={24} y={42} width={52} height={46} rx={8} fill={W} stroke={EDGE} strokeWidth={3} />
      <rect x={42} y={60} width={16} height={28} rx={6} fill={O} />
    </g>
  );
};

// Rumah modern (dipakai di harta dan waris).
const House: React.FC<{x: number; y: number; s?: number; door?: number}> = ({x, y, s = 1, door = 0}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={44} y={-206} width={24} height={56} rx={8} fill={C} />
    <rect x={-80} y={-150} width={160} height={150} rx={16} fill={W} stroke={EDGE} strokeWidth={3} />
    <Soft d="M-92 -136 L0 -214 L92 -136 Z" fill={C} r={18} />
    <circle cx={0} cy={-162} r={14} fill={W} />
    <circle cx={0} cy={-162} r={6} fill={O} />
    <rect x={-22} y={-74} width={44} height={74} rx={12} fill={O} />
    {door > 0 ? <rect x={-22} y={-74} width={44 * (1 - door * 0.75)} height={74} rx={12} fill={C} /> : <circle cx={12} cy={-36} r={4} fill={W} />}
    {[-58, 32].map((wx) => (
      <g key={wx}>
        <rect x={wx} y={-120} width={26} height={30} rx={7} fill={C} />
        <rect x={wx + 11} y={-120} width={4} height={30} fill={W} />
      </g>
    ))}
    <rect x={-80} y={-12} width={160} height={12} rx={6} fill={OL} />
  </g>
);

// ---------- adegan ----------
// 0: harta almarhum (rumah, emas, buku tabungan, sertifikat, kunci) + label "BELUM DIBAGI" bergembok.
const Harta: React.FC<{f: number}> = ({f}) => {
  const items = [0, 4, 8, 12].map((d) => pop(f, 2 + d));
  const lock = pop(f, P.belum);
  // saat "Bayangkan ... satu blok": benda mengecil dan turun ke jalur blok
  const gather = L(f, P.morph - 4, P.morph + 12);
  return (
    <g transform={`translate(0 ${gather * 260}) ${grow(360, 195, 1 - 0.75 * gather)}`} opacity={1 - gather}>
      <Backdrop cy={230} r={160} />
      {/* rumah */}
      <g opacity={items[0].p} transform={grow(150, 346, items[0].s)}>
        <Shadow cx={150} rx={100} />
        <House x={150} y={346} />
      </g>
      {/* emas batangan + kunci */}
      <g opacity={items[1].p} transform={grow(340, 346, items[1].s)}>
        <Shadow cx={340} rx={80} />
        {[
          [272, 308],
          [340, 308],
          [306, 270],
        ].map(([x, y], i) => (
          <g key={i}>
            <Soft d={`M${x} ${y + 34} L${x + 8} ${y + 2} L${x + 60} ${y + 2} L${x + 68} ${y + 34} Z`} fill={O} r={10} />
            <rect x={x + 12} y={y + 4} width={44} height={8} rx={4} fill={W} opacity={0.45} />
          </g>
        ))}
        <g transform={at(316, 240, 1, -18)}>
          <circle cx={0} cy={0} r={15} fill="none" stroke={C} strokeWidth={8} />
          <rect x={12} y={-4} width={42} height={9} rx={4.5} fill={C} />
          <rect x={40} y={2} width={8} height={12} rx={3} fill={C} />
          <rect x={28} y={2} width={8} height={9} rx={3} fill={C} />
        </g>
      </g>
      {/* buku tabungan */}
      <g opacity={items[2].p} transform={grow(490, 346, items[2].s)}>
        <Shadow cx={490} rx={60} />
        <rect x={440} y={212} width={100} height={134} rx={16} fill={C} />
        <rect x={452} y={230} width={76} height={28} rx={10} fill={W} />
        <rect x={462} y={241} width={56} height={6} rx={3} fill={CM} />
        <circle cx={490} cy={292} r={18} fill={OL} />
        <circle cx={490} cy={292} r={9} fill={O} />
        <path d="M520 346 L520 372 L528 364 L536 372 L536 346 Z" fill={O} />
      </g>
      {/* sertifikat tanah */}
      <g opacity={items[3].p} transform={grow(620, 346, items[3].s)}>
        <Shadow cx={620} rx={66} />
        <g transform={at(620, 266, 1, 6)}>
          <rect x={-58} y={-80} width={116} height={160} rx={16} fill={W} stroke={EDGE} strokeWidth={3} />
          <rect x={-40} y={-60} width={80} height={12} rx={6} fill={C} />
          {[-30, -14, 2, 18].map((y) => (
            <rect key={y} x={-40} y={y} width={y === 18 ? 46 : 80} height={7} rx={3.5} fill={CL} />
          ))}
          <circle cx={26} cy={48} r={17} fill={O} />
          <circle cx={26} cy={48} r={8} fill={W} opacity={0.5} />
        </g>
      </g>
      {/* gembok + label BELUM DIBAGI */}
      <g opacity={lock.p} transform={`translate(360 66) scale(${lock.s})`}>
        <rect x={-176} y={-34} width={352} height={68} rx={34} fill={O} />
        <g transform="translate(-134 0)">
          <path d="M-11 -4 L-11 -12 A11 11 0 0 1 11 -12 L11 -4" fill="none" stroke={W} strokeWidth={5} strokeLinecap="round" />
          <rect x={-18} y={-6} width={36} height={28} rx={8} fill={W} />
          <circle cx={0} cy={7} r={4} fill={O} />
        </g>
        <text x={24} y={10} textAnchor="middle" fontFamily={TF.head} fontWeight={800} fontSize={28} letterSpacing={2} fill={W}>
          BELUM DIBAGI
        </text>
      </g>
    </g>
  );
};

// 1: ikhtisar tiga gerbang: tiga ikon berurutan, lalu rumah ahli waris (oranye).
const Ikhtisar: React.FC<{f: number}> = ({f}) => {
  const kinds: IconKind[] = ['kafan', 'utang', 'wasiat', 'rumah'];
  const starts = [P.gates[0], P.gates[1], P.gates[2], P.heirIn];
  const labels = ['1', '2', '3', 'WARIS'];
  const xs = [90, 270, 450, 630];
  return (
    <g>
      {xs.slice(0, 3).map((x, i) => {
        const p = L(f, starts[i + 1] - 4, starts[i + 1] + 8);
        return (
          <g key={i} opacity={p}>
            {[0, 1, 2].map((j) => (
              <circle key={j} cx={x + 76 + j * 14} cy={160} r={4} fill={CM} />
            ))}
          </g>
        );
      })}
      {xs.map((x, i) => {
        const q = pop(f, starts[i]);
        const last = i === 3;
        return (
          <g key={i} opacity={q.p} transform={`translate(${x} 160) scale(${q.s})`}>
            <ellipse cx={0} cy={74} rx={50} ry={10} fill={SH} />
            <circle r={64} fill={last ? O : W} stroke={last ? 'none' : EDGE} strokeWidth={3} />
            <circle r={50} fill={last ? W : OL} opacity={last ? 0.95 : 1} />
            <g transform="translate(-34 -34) scale(0.68)">
              <MiniIcon kind={kinds[i]} />
            </g>
            <g transform="translate(0 118)">
              <rect x={last ? -64 : -28} y={-24} width={last ? 128 : 56} height={46} rx={23} fill={last ? O : C} />
              <text x={0} y={8} textAnchor="middle" fontFamily={TF.head} fontWeight={800} fontSize={24} letterSpacing={1.5} fill={W}>
                {labels[i]}
              </text>
            </g>
          </g>
        );
      })}
    </g>
  );
};

// 2: perawatan jenazah: keranda bertutup kain, tumpukan kain kafan terikat, uang biaya.
const Jenazah: React.FC<{f: number}> = ({f}) => {
  const a = P.drop[0];
  const k = pop(f, a + 4);
  const c = pop(f, a + 12);
  const coin = pop(f, P.peel[0] + 6);
  return (
    <g>
      <Backdrop cx={300} cy={210} r={160} />
      {/* keranda */}
      <g opacity={k.p} transform={grow(220, 346, k.s)}>
        <Shadow cx={220} rx={190} />
        <rect x={20} y={284} width={400} height={16} rx={8} fill={C} />
        {[70, 120, 310, 360].map((x) => (
          <rect key={x} x={x} y={292} width={14} height={54} rx={7} fill={C} />
        ))}
        <rect x={66} y={246} width={308} height={46} rx={14} fill={CM} />
        {/* tutup lengkung + kain */}
        <path d="M78 254 C78 150 120 116 220 116 C320 116 362 150 362 254 Z" fill={W} stroke={EDGE} strokeWidth={3} strokeLinejoin="round" />
        {[134, 177, 220, 263, 306].map((x) => (
          <path key={x} d={`M${x} 130 C${x - 6} 176 ${x - 6} 214 ${x} 246`} fill="none" stroke={CL} strokeWidth={5} strokeLinecap="round" />
        ))}
        <rect x={82} y={180} width={276} height={26} rx={13} fill={O} />
        <rect x={70} y={242} width={300} height={16} rx={8} fill={C} />
      </g>
      {/* kain kafan terlipat dan terikat */}
      <g opacity={c.p} transform={grow(560, 346, c.s)}>
        <Shadow cx={560} rx={100} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={470 + i * 8} y={298 - i * 48} width={180 - i * 16} height={48} rx={24} fill={i === 1 ? CL : W} stroke={EDGE} strokeWidth={3} />
            <rect x={490 + i * 8} y={318 - i * 48} width={140 - i * 16} height={5} rx={2.5} fill={CL} />
          </g>
        ))}
        {[508, 598].map((x) => (
          <g key={x}>
            <rect x={x} y={200} width={12} height={148} rx={6} fill={O} />
            <path d={`M${x + 6} 202 q-10 -22 -22 -14 M${x + 6} 202 q10 -22 22 -14`} fill="none" stroke={O} strokeWidth={7} strokeLinecap="round" />
          </g>
        ))}
      </g>
      {/* uang biaya, diambil dari harta */}
      <g opacity={coin.p} transform={`translate(660 130) scale(${coin.s})`}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <ellipse cx={0} cy={26 - i * 14} rx={36} ry={13} fill={OM} />
            <ellipse cx={0} cy={22 - i * 14} rx={36} ry={13} fill={O} />
          </g>
        ))}
        <ellipse cx={-8} cy={-6} rx={14} ry={4} fill={W} opacity={0.45} />
        <text x={0} y={-34} textAnchor="middle" fontFamily={TF.head} fontWeight={800} fontSize={22} letterSpacing={1.5} fill={C}>
          BIAYA
        </text>
      </g>
    </g>
  );
};

// 3: utang: surat utang, cap "LUNAS" dihentak saat "dilunasi", koin keluar ke "HAK ORANG LAIN".
const Utang: React.FC<{f: number}> = ({f}) => {
  const a = P.drop[1];
  const d = pop(f, a + 4);
  const stampP = interpolate(f, [P.lunas, P.lunas + 5, P.lunas + 9], [0, 1, 1], clamp);
  const stampS = interpolate(f, [P.lunas, P.lunas + 5, P.lunas + 9], [1.8, 0.94, 1], clamp);
  const hak = pop(f, P.hak);
  const move = L(f, P.hak, P.hak + 16);
  return (
    <g>
      <Backdrop cx={250} cy={200} r={170} />
      {/* surat */}
      <g opacity={d.p} transform={`${grow(250, 200, d.s)} rotate(-3 250 200)`}>
        <rect x={118} y={30} width={280} height={340} rx={24} fill={SH} />
        <rect x={110} y={20} width={280} height={340} rx={24} fill={W} stroke={EDGE} strokeWidth={3} />
        <path d={topRound(110, 20, 280, 60, 24)} fill={C} />
        <text x={250} y={60} textAnchor="middle" fontFamily={TF.head} fontWeight={800} fontSize={24} letterSpacing={2} fill={W}>
          SURAT UTANG
        </text>
        {[106, 130, 154, 178, 202].map((y, i) => (
          <rect key={y} x={138} y={y} width={i === 4 ? 140 : 224} height={10} rx={5} fill={CL} />
        ))}
        <path d="M142 300 C160 272 178 320 198 292 C212 274 226 306 244 292" fill="none" stroke={C} strokeWidth={5} strokeLinecap="round" />
        <rect x={138} y={314} width={120} height={5} rx={2.5} fill={CM} />
        {/* cap LUNAS */}
        <g opacity={stampP} transform={`translate(300 268) rotate(-12) scale(${stampS})`}>
          <rect x={-88} y={-34} width={176} height={68} rx={20} fill={W} stroke={O} strokeWidth={7} />
          <text x={0} y={12} textAnchor="middle" fontFamily={TF.head} fontWeight={800} fontSize={36} letterSpacing={4} fill={O}>
            LUNAS
          </text>
        </g>
      </g>
      {/* koin bergerak ke pemberi utang */}
      <g transform={`translate(${480 + move * 100} ${236 - move * 36})`} opacity={d.p}>
        <ellipse cx={0} cy={72} rx={46} ry={10} fill={SH} opacity={1 - move} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <ellipse cx={0} cy={50 - i * 16} rx={40} ry={14} fill={OM} />
            <ellipse cx={0} cy={46 - i * 16} rx={40} ry={14} fill={O} />
          </g>
        ))}
        <ellipse cx={-10} cy={-2} rx={16} ry={4} fill={W} opacity={0.45} />
      </g>
      <g opacity={hak.p}>
        <path d={`M444 300 L${556 + move * 40} 300`} stroke={C} strokeWidth={7} strokeLinecap="round" />
        <path d={`M${542 + move * 40} 286 L${558 + move * 40} 300 L${542 + move * 40} 314`} fill="none" stroke={C} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g opacity={hak.p} transform={`translate(570 352) scale(${hak.s})`}>
        <rect x={-124} y={-25} width={248} height={50} rx={25} fill={C} />
        <text x={0} y={8} textAnchor="middle" fontFamily={TF.head} fontWeight={800} fontSize={22} letterSpacing={1.5} fill={W}>
          HAK ORANG LAIN
        </text>
      </g>
    </g>
  );
};

// 4: wasiat: amplop bersegel oranye, lembar wasiat menyembul, pena, centang "SAH".
const Wasiat: React.FC<{f: number}> = ({f}) => {
  const a = P.drop[2];
  const e = pop(f, a + 4);
  const rise = L(f, a + 10, a + 26);
  const pen = pop(f, a + 14);
  const sah = pop(f, P.sah);
  return (
    <g>
      <Backdrop cx={300} cy={220} r={170} />
      <g opacity={e.p} transform={grow(300, 340, e.s)}>
        <Shadow cx={300} rx={200} />
        {/* lembar wasiat di belakang amplop */}
        <g transform={`translate(0 ${(1 - rise) * 90})`}>
          <rect x={150} y={56} width={300} height={220} rx={20} fill={W} stroke={EDGE} strokeWidth={3} />
          <text x={300} y={102} textAnchor="middle" fontFamily={TF.head} fontWeight={800} fontSize={28} letterSpacing={3} fill={C}>
            WASIAT
          </text>
          {[122, 144].map((y) => (
            <rect key={y} x={180} y={y} width={240} height={9} rx={4.5} fill={CL} />
          ))}
        </g>
        {/* amplop */}
        <rect x={110} y={168} width={380} height={178} rx={24} fill={W} stroke={EDGE} strokeWidth={3} />
        <path d="M128 330 L258 248 M472 330 L342 248" stroke={CL} strokeWidth={6} strokeLinecap="round" />
        <path d="M122 182 L300 284 L478 182" fill={CL} stroke={CL} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={300} cy={282} r={32} fill={O} />
        <circle cx={300} cy={282} r={21} fill={OM} />
        <path d="M290 292 C290 272 300 268 312 270 C312 284 306 292 290 292 Z" fill={W} />
      </g>
      {/* pena */}
      <g opacity={pen.p} transform={`translate(604 240) rotate(-38) scale(${pen.s})`}>
        <rect x={-15} y={-112} width={30} height={172} rx={15} fill={C} />
        <rect x={-15} y={-56} width={30} height={16} fill={O} />
        <path d="M-13 58 L0 102 L13 58 Z" fill={OM} stroke={OM} strokeWidth={6} strokeLinejoin="round" />
        <rect x={6} y={-100} width={5} height={50} rx={2.5} fill={W} opacity={0.5} />
      </g>
      {/* centang SAH */}
      <g opacity={sah.p} transform={`translate(566 66) scale(${sah.s})`}>
        <rect x={-76} y={-31} width={152} height={62} rx={31} fill={O} />
        <circle cx={-44} cy={0} r={18} fill={W} />
        <path d="M-53 0 L-46 7 L-34 -6" fill="none" stroke={O} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        <text x={18} y={11} textAnchor="middle" fontFamily={TF.head} fontWeight={800} fontSize={30} letterSpacing={3} fill={W}>
          SAH
        </text>
      </g>
    </g>
  );
};

// 5: dasar ayat: mushaf terbuka di atas rehal (garis teks abstrak, tanpa huruf tiruan).
const Ayat: React.FC<{f: number}> = ({f}) => {
  const b = pop(f, P.ayat + 2);
  const lines = L(f, P.ayat + 8, P.ayat + 30);
  return (
    <g opacity={b.p} transform={grow(360, 346, b.s)}>
      <Backdrop cx={360} cy={180} r={170} />
      <Shadow cx={360} rx={200} />
      {/* rehal */}
      <path d="M210 340 L468 172 M510 340 L252 172" stroke={C} strokeWidth={24} strokeLinecap="round" />
      {/* sampul */}
      <Soft d="M124 208 L360 238 L596 208 L596 224 L360 254 L124 224 Z" fill={C} r={12} />
      {/* halaman */}
      <path d="M134 70 C214 52 300 62 360 92 L360 236 C300 206 214 198 134 214 Z" fill={W} stroke={W} strokeWidth={10} strokeLinejoin="round" />
      <path d="M586 70 C506 52 420 62 360 92 L360 236 C420 206 506 198 586 214 Z" fill={W} stroke={W} strokeWidth={10} strokeLinejoin="round" />
      <path d="M134 70 C214 52 300 62 360 92 L360 236 C300 206 214 198 134 214 Z" fill="none" stroke={EDGE} strokeWidth={3} strokeLinejoin="round" />
      <path d="M586 70 C506 52 420 62 360 92 L360 236 C420 206 506 198 586 214 Z" fill="none" stroke={EDGE} strokeWidth={3} strokeLinejoin="round" />
      {/* bingkai halaman */}
      <path d="M158 90 C220 78 290 84 338 106 L338 204 C290 186 220 180 158 192 Z" fill={OL} stroke={O} strokeWidth={3} strokeLinejoin="round" />
      <path d="M562 90 C500 78 430 84 382 106 L382 204 C430 186 500 180 562 192 Z" fill={OL} stroke={O} strokeWidth={3} strokeLinejoin="round" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} opacity={L(lines, i * 0.16, i * 0.16 + 0.3)}>
          <path d={`M174 ${114 + i * 18} C220 ${106 + i * 18} 280 ${110 + i * 18} 322 ${126 + i * 18}`} fill="none" stroke={CM} strokeWidth={6} strokeLinecap="round" />
          <path d={`M546 ${114 + i * 18} C500 ${106 + i * 18} 440 ${110 + i * 18} 398 ${126 + i * 18}`} fill="none" stroke={CM} strokeWidth={6} strokeLinecap="round" />
        </g>
      ))}
      <rect x={355} y={86} width={10} height={156} rx={5} fill={CM} />
      <path d="M360 240 L360 300" stroke={O} strokeWidth={8} strokeLinecap="round" />
    </g>
  );
};

// 6: ahli waris: sisa harta (oranye) baru masuk ke rumah keluarga.
const Waris: React.FC<{f: number}> = ({f}) => {
  const a = P.land;
  const h = pop(f, a + 2);
  const move = L(f, P.fill - 6, P.fill + 20);
  const door = L(f, P.fill - 14, P.fill - 2);
  return (
    <g>
      <Backdrop cx={420} cy={200} r={170} />
      <g opacity={h.p} transform={grow(420, 346, h.s)}>
        <Shadow cx={420} rx={150} />
        <House x={420} y={346} s={1.25} door={door} />
      </g>
      {/* sisa harta berjalan ke pintu */}
      <g opacity={h.p * (1 - L(f, P.fill + 16, P.fill + 22))} transform={`translate(${120 + move * 300} 296) scale(${1 - move * 0.45})`}>
        <ellipse cx={0} cy={56} rx={60} ry={10} fill={SH} />
        <rect x={-66} y={-46} width={132} height={92} rx={24} fill={O} />
        <text x={0} y={-6} textAnchor="middle" fontFamily={TF.head} fontWeight={800} fontSize={20} letterSpacing={1.5} fill={W}>
          SISA
        </text>
        <text x={0} y={20} textAnchor="middle" fontFamily={TF.head} fontWeight={800} fontSize={20} letterSpacing={1.5} fill={W}>
          HARTA
        </text>
      </g>
    </g>
  );
};

type Scene = {from: number; to: number; title: string; dark?: boolean; draw: React.FC<{f: number}>};
const SCENES = (): Scene[] => [
  {from: -10, to: P.morph + 14, title: 'HARTA ALMARHUM', draw: Harta},
  {from: P.morph + 14, to: P.drop[0], title: 'TIGA GERBANG', draw: Ikhtisar},
  {from: P.drop[0], to: P.drop[1], title: '1 · PERAWATAN JENAZAH', draw: Jenazah},
  {from: P.drop[1], to: P.drop[2], title: '2 · UTANG', draw: Utang},
  {from: P.drop[2], to: P.ayat, title: '3 · WASIAT', draw: Wasiat},
  {from: P.ayat, to: P.land, title: 'QS AN-NISA 4:11-12', draw: Ayat},
  {from: P.land, to: P.stageOut + 10, title: 'SISANYA: AHLI WARIS', dark: true, draw: Waris},
];

// Kartu ilustrasi di tengah (x 180–900), sudut membulat penuh. Isi bergantian: yang lama pudar 8 frame, yang baru masuk.
export const Ilustrasi: React.FC<{f: number}> = ({f}) => {
  const cardIn = L(f, 0, 12);
  const cardOut = L(f, P.stageOut, P.stageOut + 10, 1, 0);
  if (cardOut <= 0) return null;
  return (
    <div style={{position: 'absolute', left: ILLU.x, top: ILLU.y, width: ILLU.w, height: ILLU.h, opacity: cardIn * cardOut, transform: `translateY(${(1 - cardIn) * 16}px)`}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: 44, background: T.bg2, border: `2px solid ${T.line}`, overflow: 'hidden'}} />
      {SCENES().map((s, i) => {
        const vis = L(f, s.from + 2, s.from + 12) * L(f, s.to - 8, s.to, 1, 0);
        if (vis <= 0 || f < s.from || f >= s.to) return null;
        const Draw = s.draw;
        return (
          <React.Fragment key={i}>
            <div style={{position: 'absolute', left: 0, width: ILLU.w, top: 34, display: 'flex', justifyContent: 'center', opacity: vis, transform: `translateY(${(1 - vis) * 10}px)`}}>
              <div style={{padding: '12px 30px', borderRadius: 999, background: s.dark ? T.orange : T.charcoal, color: T.onDark, fontFamily: TF.head, fontWeight: 800, fontSize: 28, letterSpacing: 2, whiteSpace: 'nowrap'}}>{s.title}</div>
            </div>
            <svg width={ILLU.w} height={ILLU_SVG.h} viewBox={`0 0 720 ${ILLU_SVG.h}`} style={{position: 'absolute', left: 0, top: ILLU_SVG.y - ILLU.y, opacity: Math.min(1, vis * 1.2), overflow: 'visible'}}>
              <Draw f={f} />
            </svg>
          </React.Fragment>
        );
      })}
    </div>
  );
};
