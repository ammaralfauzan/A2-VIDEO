import React from 'react';
import {interpolate} from 'remotion';
import {clamp, ease} from '../../components/motion';
import {T, TF} from '../../brands/tams-consulting/theme';
import {P, TOP} from './layout';

// Judul atas TANPA bingkai/kotak (revisi Bos 25 Nov 2026: "teks atas kenapa harus pakai frame kotak").
// Tipografi bebas di atas latar putih: label oranye kecil bertitik, judul besar, garis oranye pendek, isi abu.
// Tiap bagian masuk bertahap (label → judul → isi), blur ke tajam, naik pelan.
const L = (f: number, a: number, b: number, from = 0, to = 1) => interpolate(f, [a, b], [from, to], {...clamp, easing: ease});
const O: React.FC<{children: React.ReactNode}> = ({children}) => <span style={{color: T.orange}}>{children}</span>;

const enter = (p: number) => ({opacity: p, filter: `blur(${(1 - p) * 6}px)`, transform: `translateY(${(1 - p) * 16}px)`});

const Label: React.FC<{p: number; children: React.ReactNode}> = ({p, children}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 14, ...enter(p)}}>
    <div style={{width: 12, height: 12, borderRadius: 6, background: T.orange}} />
    <div style={{fontFamily: TF.head, fontWeight: 700, fontSize: 25, letterSpacing: 5, color: T.orange, textTransform: 'uppercase'}}>{children}</div>
  </div>
);
const Sub: React.FC<{p: number; children: React.ReactNode}> = ({p, children}) => (
  <div style={{fontFamily: TF.text, fontWeight: 600, fontSize: 24, color: T.ink3, marginTop: 8, ...enter(p)}}>{children}</div>
);
const Title: React.FC<{p: number; size?: number; children: React.ReactNode}> = ({p, size = 64, children}) => (
  <div style={{fontFamily: TF.head, fontWeight: 800, fontSize: size, lineHeight: 1.1, letterSpacing: -1.5, color: T.ink, marginTop: 20, ...enter(p)}}>{children}</div>
);
const Body: React.FC<{p: number; children: React.ReactNode}> = ({p, children}) => (
  <div style={{fontFamily: TF.text, fontWeight: 500, fontSize: 30, lineHeight: 1.32, color: T.ink2, marginTop: 20, maxWidth: 640, ...enter(p)}}>{children}</div>
);
const Rule: React.FC<{p: number}> = ({p}) => <div style={{width: 80, height: 6, borderRadius: 3, background: T.orange, marginTop: 22, transform: `scaleX(${p})`}} />;

const SHALAWAT = 'shallallahu ‘alaihi wa sallam';

type Phase = {from: number; render: (f: number, a: (d: number) => number) => React.ReactNode};

const PHASES: Phase[] = [
  {
    from: 0,
    render: (_f, a) => (
      <>
        <Label p={a(0)}>Wasiat</Label>
        <Title p={a(4)}>
          Semua harta
          <br />
          untuk <O>wasiat?</O>
        </Title>
      </>
    ),
  },
  {
    from: P.cardSad,
    render: (_f, a) => (
      <>
        <Label p={a(0)}>Kisah sahabat</Label>
        <Title p={a(4)} size={62}>
          Sa’d bin Abi Waqqash
        </Title>
        <Sub p={a(8)}>radhiyallahu ‘anhu</Sub>
        <Body p={a(12)}>Sakit keras, lalu bertanya: bolehkah mewasiatkan seluruh harta?</Body>
      </>
    ),
  },
  {
    from: P.cardQuote,
    render: (f, a) => (
      <>
        <Label p={a(0)}>Sabda Nabi</Label>
        <Sub p={a(3)}>{SHALAWAT}</Sub>
        <Title p={a(6)} size={62}>
          “Sepertiga,
          <br />
          dan sepertiga itu
          <br />
          sudah <span style={{color: f >= P.banyak ? T.orange : T.ink}}>banyak.”</span>
        </Title>
      </>
    ),
  },
  {
    from: P.cardBanding,
    render: (_f, a) => (
      <>
        <Label p={a(0)}>Meninggalkan ahli waris</Label>
        <Title p={a(4)} size={60}>
          <O>Berkecukupan</O>
          <br />
          lebih baik daripada miskin
        </Title>
      </>
    ),
  },
  {
    from: P.cardSumber1,
    render: (_f, a) => (
      <>
        <Label p={a(0)}>Sumber</Label>
        <Title p={a(4)} size={60}>
          HR. Bukhari <O>2742</O>
          <br />
          HR. Muslim <O>1628</O>
        </Title>
      </>
    ),
  },
  {
    from: P.cardWasiat,
    render: (f, a) => (
      <>
        <Label p={a(0)}>Batas wasiat</Label>
        <Title p={a(4)}>
          Paling banyak <O>sepertiga</O>
        </Title>
        <Rule p={a(8)} />
        <Body p={L(f, P.sisa - 4, P.sisa + 8)}>dari sisa harta, setelah kewajiban almarhum diselesaikan</Body>
      </>
    ),
  },
  {
    from: P.cardLarang,
    render: (f, a) => (
      <>
        <Label p={a(0)}>Sabda Nabi</Label>
        <Sub p={a(3)}>{SHALAWAT}</Sub>
        <Title p={a(6)}>
          Tidak ada wasiat
          <br />
          untuk <span style={{color: f >= P.block ? T.orange : T.ink}}>ahli waris.</span>
        </Title>
      </>
    ),
  },
  {
    from: P.cardSumber2,
    render: (_f, a) => (
      <>
        <Label p={a(0)}>Sumber</Label>
        <Title p={a(4)} size={56}>
          HR. Abu Dawud <O>2870</O>
          <br />
          HR. Ibnu Majah <O>2713</O>
        </Title>
      </>
    ),
  },
  {
    from: P.cardBagian,
    render: (_f, a) => (
      <>
        <Label p={a(0)}>Ahli waris</Label>
        <Title p={a(4)}>
          Bagiannya sudah
          <br />
          <O>ditetapkan.</O>
        </Title>
      </>
    ),
  },
];

// Judul atas (x 180–900, y 240–590): satu blok per penjelasan, bergantian (lama keluar dulu, baru masuk).
export const Kartu: React.FC<{f: number}> = ({f}) => (
  <>
    {PHASES.map((ph, i) => {
      const start = ph.from <= 0 ? 4 : ph.from + 4;
      const end = i + 1 < PHASES.length ? PHASES[i + 1].from + 2 : P.stageOut + 2;
      if (f < start - 1 || f >= end) return null;
      const outP = L(f, end - 8, end, 1, 0);
      const a = (d: number) => L(f, start + d, start + d + 12);
      return (
        <div
          key={i}
          style={{position: 'absolute', left: TOP.x, top: TOP.y, width: TOP.w, height: TOP.h, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', opacity: outP, transform: `translateY(${(1 - outP) * -10}px)`}}
        >
          {ph.render(f, a)}
        </div>
      );
    })}
  </>
);
