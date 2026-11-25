import React from 'react';
import {interpolate} from 'remotion';
import {clamp, ease} from '../../components/motion';
import {T, TF} from '../../brands/tams-consulting/theme';
import {CARD, CX, P, SRC, WIPE_LEN} from './layout';

// Panggung: hook (map HARTA + tanda tanya), kartu arang "SEBELUM AYAT TURUN" (benda per kalimat), lalu geser
// sudut daun ke kartu terang "SESUDAH AYAT TURUN" (kartu ayat, dua map setara, pita DITETAPKAN). Label sumber di atas.
// Hanya benda: tanpa orang, siluet, tangan. Tanpa pecahan atau angka bagian.
const L = (f: number, a: number, b: number, from = 0, to = 1) => interpolate(f, [a, b], [from, to], {...clamp, easing: ease});
const inStyle = (p: number, dy = 14) => ({opacity: p, filter: `blur(${(1 - p) * 8}px)`, transform: `translateY(${(1 - p) * dy}px)`});

const Label: React.FC<{dark?: boolean; children: React.ReactNode}> = ({dark, children}) => (
  <div style={{fontFamily: TF.head, fontWeight: 700, fontSize: 26, letterSpacing: 4, color: dark ? T.onDark2 : T.ink3, textTransform: 'uppercase'}}>{children}</div>
);
const Rule: React.FC = () => <div style={{width: 96, height: 6, borderRadius: 3, background: T.orange, margin: '20px auto 0'}} />;

// ---------- benda (SVG, sudut bulat, bidang rata) ----------
const MapHarta: React.FC<{w?: number; label: string; fill?: number; dark?: boolean; rise?: number}> = ({w = 420, label, fill = 1, dark, rise = 0}) => {
  const vh = 330 + rise;
  return (
    <svg width={w} height={(w * vh) / 420} viewBox={`0 ${-rise} 420 ${vh}`}>
      <ellipse cx={210} cy={318} rx={170} ry={10} fill="rgba(10,10,10,.10)" />
      {/* kertas di dalam map, naik sesuai fill */}
      {[0, 1, 2].map((k) => (
        <rect key={k} x={60 + k * 18} y={40 - rise * fill + (1 - fill) * 120 + k * 22} width={280 - k * 36} height={200} rx={14} fill={k === 1 ? T.orange : T.bg} stroke="rgba(10,10,10,.22)" strokeWidth={3} opacity={fill > 0.02 ? 1 : 0} />
      ))}
      <path d="M24 70 Q24 50 44 50 L150 50 Q164 50 172 62 L184 78 L376 78 Q396 78 396 98 L396 286 Q396 306 376 306 L44 306 Q24 306 24 286 Z" fill={dark ? T.bg2 : T.charcoal} />
      <rect x={24} y={110} width={372} height={196} rx={20} fill={dark ? T.bg : '#3A3A3A'} />
      <text x={210} y={226} textAnchor="middle" fontFamily="Montserrat" fontWeight={800} fontSize={label.length > 9 ? 34 : 44} letterSpacing={4} fill={dark ? T.ink : T.onDark}>{label}</text>
    </svg>
  );
};

const Tanya: React.FC<{p: number}> = ({p}) => (
  <div style={{position: 'absolute', left: CX + 120, top: 470, width: 170, height: 170, borderRadius: '50%', background: T.orange, color: T.onDark, fontFamily: TF.head, fontWeight: 800, fontSize: 120, lineHeight: '170px', textAlign: 'center', opacity: p, transform: `scale(${0.6 + 0.4 * p}) rotate(${(1 - p) * -14}deg)`}}>?</div>
);

const MejaGelas: React.FC = () => (
  <svg width={420} height={330} viewBox="0 0 420 330">
    <ellipse cx={210} cy={318} rx={160} ry={10} fill="rgba(0,0,0,.25)" />
    {/* meja kecil */}
    <rect x={70} y={170} width={280} height={30} rx={15} fill={T.bg2} />
    <rect x={100} y={196} width={26} height={118} rx={13} fill={T.bg2} opacity={0.85} />
    <rect x={294} y={196} width={26} height={118} rx={13} fill={T.bg2} opacity={0.85} />
    <rect x={110} y={250} width={200} height={18} rx={9} fill={T.bg2} opacity={0.6} />
    {/* gelas air */}
    <path d="M176 70 L244 70 L236 164 Q235 172 227 172 L193 172 Q185 172 184 164 Z" fill="rgba(254,254,254,.16)" stroke={T.bg2} strokeWidth={5} strokeLinejoin="round" />
    <path d="M181 108 L239 108 L236 164 Q235 168 227 168 L193 168 Q185 168 184 164 Z" fill={T.orange} opacity={0.9} />
    {/* buku kecil */}
    <rect x={262} y={140} width={70} height={30} rx={8} fill={T.orange} opacity={0.55} />
  </svg>
);

const Kapsul: React.FC<{p: number; nama: string; lafaz: string; ket: string}> = ({p, nama, lafaz, ket}) => (
  <div style={{width: 600, borderRadius: 999, background: T.bg2, padding: '22px 36px', boxSizing: 'border-box', textAlign: 'center', ...inStyle(p)}}>
    <div style={{fontFamily: TF.head, fontWeight: 800, fontSize: 48, color: T.ink, letterSpacing: -0.5}}>{nama}</div>
    <div style={{fontFamily: TF.text, fontWeight: 600, fontSize: 26, color: T.ink2, marginTop: 4}}>{lafaz}</div>
    <div style={{fontFamily: TF.head, fontWeight: 700, fontSize: 22, letterSpacing: 3, color: T.orange, marginTop: 8, textTransform: 'uppercase'}}>{ket}</div>
  </div>
);

const Kendi: React.FC<{f: number}> = ({f}) => {
  const drops = [
    {x: 318, y: 120, d: 0},
    {x: 350, y: 96, d: 5},
    {x: 336, y: 150, d: 9},
    {x: 372, y: 132, d: 13},
    {x: 304, y: 84, d: 17},
  ];
  return (
    <svg width={460} height={330} viewBox="0 0 460 330">
      <ellipse cx={200} cy={318} rx={150} ry={10} fill="rgba(0,0,0,.25)" />
      {/* badan kendi */}
      <path d="M150 90 Q150 70 170 70 L230 70 Q250 70 250 90 L250 110 Q320 140 320 220 Q320 300 200 306 Q80 300 80 220 Q80 140 150 110 Z" fill={T.bg2} />
      <rect x={140} y={56} width={120} height={26} rx={13} fill={T.bg2} />
      {/* cerat */}
      <path d="M300 170 Q330 150 352 112" fill="none" stroke={T.bg2} strokeWidth={22} strokeLinecap="round" />
      <path d="M100 168 Q40 170 56 226 Q66 256 100 252" fill="none" stroke={T.bg2} strokeWidth={16} strokeLinecap="round" />
      <path d="M100 200 Q200 228 300 200" fill="none" stroke={T.orange} strokeWidth={10} strokeLinecap="round" opacity={0.7} />
      {drops.map((d, i) => {
        const t = f - P.percik - d.d;
        const cyc = ((t % 40) + 40) % 40;
        const p = t < 0 ? 0 : interpolate(cyc, [0, 6, 30, 40], [0, 1, 1, 0], clamp);
        const dy = t < 0 ? 0 : (cyc / 40) * -46;
        return <path key={i} d={`M${d.x} ${d.y + dy - 18} Q${d.x + 11} ${d.y + dy - 2} ${d.x} ${d.y + dy + 4} Q${d.x - 11} ${d.y + dy - 2} ${d.x} ${d.y + dy - 18} Z`} fill={T.orange} opacity={p} />;
      })}
    </svg>
  );
};

const Surat: React.FC<{f: number}> = ({f}) => {
  const tulis = L(f, P.tulis, P.tulis + 24);
  return (
    <div style={{width: 560, borderRadius: 40, background: T.bg, padding: '40px 44px 44px', boxSizing: 'border-box', textAlign: 'left', position: 'relative'}}>
      <Label>Pertanyaan</Label>
      <div style={{fontFamily: TF.head, fontWeight: 800, fontSize: 54, lineHeight: 1.14, color: T.ink, marginTop: 18, letterSpacing: -1, clipPath: `inset(0 ${(1 - tulis) * 100}% 0 0)`}}>
        Hartaku harus <span style={{color: T.orange}}>diapakan?</span>
      </div>
      {[0, 1, 2].map((k) => (
        <div key={k} style={{height: 14, borderRadius: 7, background: T.bg2, marginTop: k ? 14 : 30, width: `${[100, 86, 62][k]}%`}} />
      ))}
    </div>
  );
};

const KartuAyat: React.FC<{p: number; ayat: string; ket: string}> = ({p, ayat, ket}) => (
  <div style={{width: 600, borderRadius: 44, background: T.charcoal, padding: '30px 36px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 28, ...inStyle(p)}}>
    <svg width={110} height={90} viewBox="0 0 110 90">
      {/* mushaf terbuka di rehal */}
      <path d="M55 22 Q34 10 8 14 L8 66 Q34 62 55 74 Q76 62 102 66 L102 14 Q76 10 55 22 Z" fill={T.bg} stroke={T.bg} strokeWidth={6} strokeLinejoin="round" />
      <path d="M55 24 L55 72" stroke={T.charcoal} strokeWidth={4} strokeLinecap="round" />
      <path d="M18 80 L92 80" stroke={T.orange} strokeWidth={8} strokeLinecap="round" />
    </svg>
    <div style={{textAlign: 'left'}}>
      <div style={{fontFamily: TF.head, fontWeight: 800, fontSize: 46, color: T.onDark, letterSpacing: -0.5, whiteSpace: 'nowrap'}}>{ayat}</div>
      <div style={{fontFamily: TF.text, fontWeight: 600, fontSize: 26, color: T.onDark2, marginTop: 4}}>{ket}</div>
    </div>
  </div>
);

// Map setara: kertas naik mengisi (fill 0..1).
const MapSetara: React.FC<{p: number; fill: number; label: string}> = ({p, fill, label}) => (
  <div style={{opacity: p, transform: `translateY(${(1 - p) * 18}px) scale(${0.94 + 0.06 * p})`}}>
    <MapHarta w={300} label={label} fill={fill} rise={90} />
  </div>
);

// ---------- label sumber ----------
const Sumber: React.FC<{f: number}> = ({f}) => {
  const items = [
    {from: P.srcIn, to: P.ayat11, kind: 'Riwayat hadits', main: 'HR. Bukhari 4577, Muslim 1616', sub: "dari Jabir bin Abdullah radhiyallahu 'anhu"},
    {from: P.ayat11, to: P.ayat7, kind: 'Ayat', main: 'QS An-Nisa 4:11', sub: 'ayat waris'},
    {from: P.ayat7, to: P.stageOut + 10, kind: 'Ayat', main: 'QS An-Nisa 4:7', sub: 'hak bagian laki-laki dan perempuan'},
  ];
  return (
    <>
      {items.map((it, i) => {
        const a = L(f, it.from, it.from + 10);
        const b = i === items.length - 1 ? L(f, it.to - 10, it.to, 1, 0) : L(f, it.to - 2, it.to + 6, 1, 0);
        const o = Math.min(a, b);
        if (o <= 0) return null;
        return (
          <div key={i} style={{position: 'absolute', left: SRC.x, width: SRC.w, top: SRC.y, textAlign: 'center', opacity: o, filter: `blur(${(1 - o) * 6}px)`}}>
            <div style={{fontFamily: TF.head, fontWeight: 700, fontSize: 22, letterSpacing: 4, color: T.orange, textTransform: 'uppercase'}}>{it.kind}</div>
            <div style={{fontFamily: TF.head, fontWeight: 800, fontSize: 30, color: T.ink, marginTop: 4}}>{it.main}</div>
            <div style={{fontFamily: TF.text, fontWeight: 500, fontSize: 22, color: T.ink3, marginTop: 2}}>{it.sub}</div>
          </div>
        );
      })}
    </>
  );
};

// isi kartu arang berganti per kalimat (pudar silang)
const Isi: React.FC<{f: number; from: number; to: number; children: React.ReactNode}> = ({f, from, to, children}) => {
  const o = Math.min(L(f, from, from + 10), L(f, to - 2, to + 6, 1, 0));
  if (o <= 0) return null;
  return <div style={{position: 'absolute', left: 0, right: 0, top: 120, bottom: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', ...inStyle(o, 10)}}>{children}</div>;
};

export const Panggung: React.FC<{f: number}> = ({f}) => {
  // hook
  const hook = Math.min(L(f, P.hookIn, P.hookIn + 12), L(f, P.hookOut, P.hookOut + 8, 1, 0));
  const tanda = L(f, P.tanda, P.tanda + 10);
  // kartu arang
  const card = L(f, P.cardIn, P.cardIn + 12);
  const out = L(f, P.stageOut, P.stageOut + 10, 1, 0);
  // geser sudut daun: kartu terang terbuka dari kanan ke kiri, sudut kiri atas membulat besar
  const w = L(f, P.wipe, P.wipe + WIPE_LEN);
  const leaf = 44 + 300 * (1 - w) * (w > 0 ? 1 : 0);
  return (
    <>
      {hook > 0 ? (
        <>
          <div style={{position: 'absolute', left: CX - 210, top: 560, ...inStyle(hook, 20)}}>
            <MapHarta label="HARTA" />
          </div>
          <div style={{opacity: hook}}>
            <Tanya p={tanda} />
          </div>
          <div style={{position: 'absolute', left: CX - 300, width: 600, top: 950, textAlign: 'center', ...inStyle(hook)}}>
            <Label>Siapa yang menentukan?</Label>
          </div>
        </>
      ) : null}
      <Sumber f={f} />
      {card > 0 && out > 0 ? (
        <div style={{position: 'absolute', left: CARD.x, top: CARD.y, width: CARD.w, height: CARD.h, opacity: Math.min(card, out), transform: `scale(${0.96 + 0.04 * card})`}}>
          {/* kartu arang: SEBELUM */}
          <div style={{position: 'absolute', inset: 0, borderRadius: 44, background: T.charcoal, overflow: 'hidden', opacity: 1 - w}}>
            <div style={{position: 'absolute', top: 48, left: 0, right: 0, textAlign: 'center', opacity: L(f, P.wipe, P.wipe + 6, 1, 0)}}>
              <Label dark>Sebelum ayat turun</Label>
            </div>
            <Isi f={f} from={P.cardIn} to={P.jenguk}>
              <MejaGelas />
              <div style={{fontFamily: TF.head, fontWeight: 800, fontSize: 42, color: T.onDark, marginTop: 30, textAlign: 'center'}}>Jabir bin Abdullah</div>
              <div style={{fontFamily: TF.text, fontWeight: 600, fontSize: 26, color: T.onDark2, marginTop: 4}}>radhiyallahu &apos;anhu</div>
              <div style={{marginTop: 22, padding: '10px 26px', borderRadius: 999, background: T.orange, color: T.onDark, fontFamily: TF.head, fontWeight: 700, fontSize: 24, letterSpacing: 3, textTransform: 'uppercase', ...inStyle(L(f, P.sakit, P.sakit + 10))}}>Sakit parah</div>
            </Isi>
            <Isi f={f} from={P.jenguk} to={P.wudhu}>
              <Kapsul p={L(f, P.jenguk, P.jenguk + 12)} nama="Rasulullah" lafaz="shallallahu 'alaihi wa sallam" ket="datang menjenguk" />
              <div style={{height: 36}} />
              <Kapsul p={L(f, P.abuBakar, P.abuBakar + 12)} nama="Abu Bakar" lafaz="radhiyallahu 'anhu" ket="bersama beliau" />
            </Isi>
            <Isi f={f} from={P.wudhu} to={P.tanya}>
              <Kendi f={f} />
              <div style={{fontFamily: TF.head, fontWeight: 800, fontSize: 40, color: T.onDark, marginTop: 26}}>Air wudhu dipercikkan</div>
              <div style={{marginTop: 22, padding: '10px 26px', borderRadius: 999, background: T.orange, color: T.onDark, fontFamily: TF.head, fontWeight: 700, fontSize: 24, letterSpacing: 3, textTransform: 'uppercase', ...inStyle(L(f, P.sadar, P.sadar + 10))}}>Jabir sadar</div>
            </Isi>
            <Isi f={f} from={P.tanya} to={P.wipe + WIPE_LEN}>
              <Surat f={f} />
            </Isi>
          </div>
          {/* kartu terang: SESUDAH (geser sudut daun) */}
          {w > 0 ? (
            <div style={{position: 'absolute', inset: 0, background: T.bg2, boxShadow: `inset 0 0 0 2px ${T.line}`, clipPath: `inset(0 0 0 ${(1 - w) * 100}% round ${leaf}px 44px 44px 44px)`, overflow: 'hidden'}}>
              <div style={{position: 'absolute', top: 48, left: 0, right: 0, textAlign: 'center'}}>
                <Label>Sesudah ayat turun</Label>
                <Rule />
              </div>
              <div style={{position: 'absolute', left: 0, right: 0, top: 150, display: 'flex', justifyContent: 'center'}}>
                <div style={{position: 'relative', width: 600, height: 150}}>
                  {(() => {
                    const a = Math.min(L(f, P.ayat11, P.ayat11 + 12), L(f, P.ayat7 - 2, P.ayat7 + 6, 1, 0));
                    const b = L(f, P.ayat7 + 2, P.ayat7 + 14);
                    return (
                      <>
                        {a > 0 ? <div style={{position: 'absolute', inset: 0}}><KartuAyat p={a} ayat="QS An-Nisa 4:11" ket="Ayat waris turun" /></div> : null}
                        {b > 0 ? <div style={{position: 'absolute', inset: 0}}><KartuAyat p={b} ayat="QS An-Nisa 4:7" ket="Hak bagian keduanya" /></div> : null}
                      </>
                    );
                  })()}
                </div>
              </div>
              {/* dua map setara */}
              <div style={{position: 'absolute', left: 0, right: 0, top: 330, display: 'flex', justifyContent: 'center', gap: 36}}>
                <MapSetara p={L(f, P.laki, P.laki + 12)} fill={L(f, P.laki + 6, P.laki + 26)} label="LAKI-LAKI" />
                <MapSetara p={L(f, P.perempuan, P.perempuan + 12)} fill={L(f, P.perempuan + 6, P.perempuan + 26)} label="PEREMPUAN" />
              </div>
              {/* pita DITETAPKAN */}
              {(() => {
                const t = L(f, P.tetap, P.tetap + 12);
                if (t <= 0) return null;
                return (
                  <div style={{position: 'absolute', left: CX - CARD.x - 190, width: 380, top: 680, height: 76, borderRadius: 999, background: T.orange, color: T.onDark, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontFamily: TF.head, fontWeight: 800, fontSize: 32, letterSpacing: 5, opacity: t, transform: `scale(${1.15 - 0.15 * t})`}}>
                    <svg width={34} height={34} viewBox="0 0 34 34"><circle cx={17} cy={17} r={17} fill={T.onDark} /><path d="M9 18 l5 5 l11 -12" fill="none" stroke={T.orange} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" /></svg>
                    DITETAPKAN
                  </div>
                );
              })()}
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};
