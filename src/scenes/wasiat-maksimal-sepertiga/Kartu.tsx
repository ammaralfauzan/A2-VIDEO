import React from 'react';
import {interpolate} from 'remotion';
import {clamp, ease} from '../../components/motion';
import {T, TF} from '../../brands/tams-consulting/theme';
import {CARD, P} from './layout';

const L = (f: number, a: number, b: number, from = 0, to = 1) => interpolate(f, [a, b], [from, to], {...clamp, easing: ease});
const O: React.FC<{children: React.ReactNode}> = ({children}) => <span style={{color: T.orange}}>{children}</span>;

const Label: React.FC<{dark?: boolean; children: React.ReactNode}> = ({dark, children}) => (
  <div style={{fontFamily: TF.head, fontWeight: 700, fontSize: 26, letterSpacing: 4, color: dark ? T.onDark2 : T.ink3, textTransform: 'uppercase'}}>{children}</div>
);
const Shalawat: React.FC<{dark?: boolean}> = ({dark}) => (
  <div style={{fontFamily: TF.text, fontWeight: 600, fontSize: 24, color: dark ? T.onDark2 : T.ink3, marginTop: 6}}>shallallahu &apos;alaihi wa sallam</div>
);
const Title: React.FC<{dark?: boolean; size?: number; children: React.ReactNode}> = ({dark, size = 62, children}) => (
  <div style={{fontFamily: TF.head, fontWeight: 800, fontSize: size, lineHeight: 1.12, letterSpacing: -1, color: dark ? T.onDark : T.ink, marginTop: 26}}>{children}</div>
);
const Body: React.FC<{dark?: boolean; children: React.ReactNode}> = ({dark, children}) => (
  <div style={{fontFamily: TF.text, fontWeight: 500, fontSize: 32, lineHeight: 1.3, color: dark ? T.onDark2 : T.ink2, marginTop: 22}}>{children}</div>
);
const Rule: React.FC = () => <div style={{width: 96, height: 6, borderRadius: 3, background: T.orange, marginTop: 26}} />;

const Amplop: React.FC = () => (
  <svg width={420} height={270} viewBox="0 0 420 270">
    <ellipse cx={210} cy={256} rx={170} ry={10} fill="rgba(10,10,10,.08)" />
    <rect x={14} y={14} width={392} height={226} rx={26} fill={T.bg} stroke="rgba(10,10,10,.14)" strokeWidth={3} />
    <path d="M30 34 L210 150 L390 34" fill="none" stroke="rgba(10,10,10,.22)" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M30 222 L160 120 M390 222 L260 120" fill="none" stroke="rgba(10,10,10,.10)" strokeWidth={4} strokeLinecap="round" />
    <circle cx={210} cy={150} r={34} fill={T.orange} />
    <circle cx={210} cy={150} r={20} fill="none" stroke={T.onDark} strokeWidth={4} opacity={0.8} />
  </svg>
);

const Row: React.FC<{p: number; good: boolean; text: string}> = ({p, good, text}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 18, height: 84, width: 560, borderRadius: 42, padding: '0 26px', background: good ? T.charcoal : T.bg, boxShadow: good ? 'none' : `inset 0 0 0 2px ${T.line2}`, opacity: p, transform: `translateY(${(1 - p) * 14}px)`, boxSizing: 'border-box'}}>
    <svg width={44} height={44} viewBox="0 0 44 44">
      <circle cx={22} cy={22} r={22} fill={good ? T.orange : 'rgba(10,10,10,.14)'} />
      {good ? <path d="M12 23 l7 7 l13 -15" fill="none" stroke={T.onDark} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" /> : <path d="M14 14 L30 30 M30 14 L14 30" stroke={T.ink3} strokeWidth={5} strokeLinecap="round" />}
    </svg>
    <span style={{fontFamily: TF.head, fontWeight: 800, fontSize: 28, letterSpacing: 2, color: good ? T.onDark : T.ink3, textDecoration: good ? 'none' : 'line-through'}}>{text}</span>
  </div>
);

type Phase = {from: number; dark: boolean; render: (f: number) => React.ReactNode};

const PHASES: Phase[] = [
  {
    from: 0,
    dark: false,
    render: () => (
      <>
        <Amplop />
        <div style={{marginTop: 18}}>
          <Label>Surat wasiat</Label>
        </div>
      </>
    ),
  },
  {
    from: P.cardSad,
    dark: true,
    render: () => (
      <>
        <Label dark>Kisah sahabat</Label>
        <Title dark size={64}>Sa’d bin Abi Waqqash</Title>
        <Rule />
        <Body dark>Sakit keras, lalu bertanya: bolehkah mewasiatkan seluruh harta?</Body>
      </>
    ),
  },
  {
    from: P.cardQuote,
    dark: false,
    render: (f) => (
      <>
        <Label>Sabda Nabi</Label>
        <Shalawat />
        <Title size={64}>
          “Sepertiga, dan sepertiga itu sudah
          <br />
          <span style={{color: f >= P.banyak ? T.orange : T.ink}}>banyak.”</span>
        </Title>
      </>
    ),
  },
  {
    from: P.cardBanding,
    dark: false,
    render: (f) => (
      <>
        <Label>Meninggalkan ahli waris</Label>
        <div style={{marginTop: 34}} />
        <Row p={L(f, P.cukup, P.cukup + 10)} good text="BERKECUKUPAN" />
        <div style={{fontFamily: TF.text, fontWeight: 600, fontSize: 28, color: T.ink2, margin: '16px 0', opacity: L(f, P.cukup + 6, P.cukup + 16)}}>lebih baik daripada</div>
        <Row p={L(f, P.miskin, P.miskin + 10)} good={false} text="MISKIN, MEMINTA-MINTA" />
      </>
    ),
  },
  {
    from: P.cardSumber1,
    dark: true,
    render: () => (
      <>
        <Label dark>Sumber</Label>
        <Title dark size={60}>
          HR. Bukhari <O>2742</O>
          <br />
          HR. Muslim <O>1628</O>
        </Title>
        <Body dark>Kisah Sa’d bin Abi Waqqash</Body>
      </>
    ),
  },
  {
    from: P.cardWasiat,
    dark: false,
    render: () => (
      <>
        <Label>Batas wasiat</Label>
        <Title size={64}>
          Paling banyak <O>sepertiga</O>
        </Title>
        <Rule />
        <Body>dari sisa harta, setelah kewajiban almarhum diselesaikan</Body>
      </>
    ),
  },
  {
    from: P.cardLarang,
    dark: true,
    render: (f) => (
      <>
        <Label dark>Sabda Nabi</Label>
        <Shalawat dark />
        <Title dark size={64}>
          Tidak ada wasiat untuk
          <br />
          <span style={{color: f >= P.block ? T.orange : T.onDark}}>ahli waris.</span>
        </Title>
      </>
    ),
  },
  {
    from: P.cardSumber2,
    dark: true,
    render: () => (
      <>
        <Label dark>Sumber</Label>
        <Title dark size={54}>
          HR. Abu Dawud <O>2870</O>
          <br />
          HR. Ibnu Majah <O>2713</O>
        </Title>
        <Body dark>Tidak ada wasiat untuk ahli waris</Body>
      </>
    ),
  },
  {
    from: P.cardBagian,
    dark: false,
    render: () => (
      <>
        <Label>Ahli waris</Label>
        <Title size={64}>
          Bagiannya sudah <O>ditetapkan.</O>
        </Title>
        <Rule />
      </>
    ),
  },
];

// Kartu atas (x 180–900, y 260–720): satu kartu per penjelasan, bergantian (keluar dulu, baru masuk).
export const Kartu: React.FC<{f: number}> = ({f}) => (
  <>
    {PHASES.map((ph, i) => {
      const end = i + 1 < PHASES.length ? PHASES[i + 1].from : P.stageOut + 2;
      const inP = ph.from <= 0 ? L(f, 2, 14) : L(f, ph.from, ph.from + 10);
      const outP = L(f, end - 8, end, 1, 0);
      const o = inP * outP;
      if (o <= 0) return null;
      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: CARD.x,
            top: CARD.y,
            width: CARD.w,
            height: CARD.h,
            borderRadius: 44,
            background: ph.dark ? T.charcoal : T.bg2,
            boxShadow: ph.dark ? 'none' : `inset 0 0 0 2px ${T.line}`,
            boxSizing: 'border-box',
            padding: '0 56px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            opacity: o,
            filter: `blur(${(1 - inP) * 6}px)`,
            transform: `translateY(${(1 - inP) * 14}px) scale(${0.98 + 0.02 * outP})`,
          }}
        >
          {ph.render(f)}
        </div>
      );
    })}
  </>
);
