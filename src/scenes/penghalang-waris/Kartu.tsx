import React from 'react';
import {interpolate} from 'remotion';
import {clamp, ease} from '../../components/motion';
import {T, TF} from '../../brands/tams-consulting/theme';
import {P, TOP} from './layout';

// Pola dari wasiat-maksimal-sepertiga. Judul atas TANPA bingkai/kotak (revisi Bos 25 Nov 2026: "teks atas kenapa harus pakai frame kotak").
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

const Pill: React.FC<{p: number; soft?: boolean; children: React.ReactNode}> = ({p, soft, children}) => (
  <div style={{marginTop: 26, padding: '14px 30px', borderRadius: 999, background: soft ? T.bg2 : T.charcoal, border: soft ? `2px solid ${T.line}` : 'none', color: soft ? T.ink2 : T.onDark, fontFamily: TF.head, fontWeight: 700, fontSize: 26, letterSpacing: 1, ...enter(p)}}>{children}</div>
);

const SHALAWAT = 'shallallahu ‘alaihi wa sallam';

type Phase = {from: number; render: (f: number, a: (d: number) => number) => React.ReactNode};

const PHASES: Phase[] = [
  {
    from: 0,
    render: (_f, a) => (
      <>
        <Label p={a(0)}>Waris</Label>
        <Title p={a(4)}>
          Hubungan darah
          <br />
          <O>belum tentu cukup</O>
        </Title>
      </>
    ),
  },
  {
    from: P.tSebab,
    render: (_f, a) => (
      <>
        <Label p={a(0)}>Sebab waris</Label>
        <Title p={a(4)}>
          Hubungan <O>darah</O>
        </Title>
        <Rule p={a(8)} />
        <Body p={a(12)}>membuka jalan untuk mewarisi</Body>
      </>
    ),
  },
  {
    from: P.tPenghalang,
    render: (_f, a) => (
      <>
        <Label p={a(0)}>Tetapi</Label>
        <Title p={a(4)}>
          Ada <O>penghalang</O>
        </Title>
        <Rule p={a(8)} />
        <Body p={a(12)}>yang membuat hak itu tertahan</Body>
      </>
    ),
  },
  {
    from: P.tDua,
    render: (_f, a) => (
      <>
        <Label p={a(0)}>Yang paling dikenal</Label>
        <Title p={a(4)}>
          <O>Dua</O> penghalang
        </Title>
      </>
    ),
  },
  {
    from: P.tPertama,
    render: (_f, a) => (
      <>
        <Label p={a(0)}>Penghalang 1</Label>
        <Title p={a(4)}>
          Beda <O>agama</O>
        </Title>
      </>
    ),
  },
  {
    from: P.tUsamah,
    render: (_f, a) => (
      <>
        <Label p={a(0)}>Riwayat sahabat</Label>
        <Title p={a(4)}>Usamah bin Zaid</Title>
        <Sub p={a(8)}>radhiyallahu ‘anhu</Sub>
      </>
    ),
  },
  {
    from: P.tSabda,
    render: (f, a) => (
      <>
        <Label p={a(0)}>Sabda Nabi</Label>
        <Sub p={a(3)}>{SHALAWAT}</Sub>
        <Title p={L(f, P.quote, P.quote + 12)} size={44}>
          “Muslim <span style={{color: f >= P.close1 ? T.orange : T.ink}}>tidak mewarisi</span>
          <br />
          orang kafir, dan orang kafir
          <br />
          tidak mewarisi muslim.”
        </Title>
      </>
    ),
  },
  {
    from: P.tSumber,
    render: (f, a) => (
      <>
        <Label p={a(0)}>Sumber</Label>
        <Title p={a(4)} size={56}>
          HR. Bukhari <O>6764</O>
          <br />
          HR. Muslim <O>1614</O>
        </Title>
        <Pill p={L(f, P.jumhur, P.jumhur + 12)}>Pendapat jumhur ulama</Pill>
      </>
    ),
  },
  {
    from: P.tKedua,
    render: (_f, a) => (
      <>
        <Label p={a(0)}>Penghalang 2</Label>
        <Title p={a(4)}>
          Membunuh <O>pewaris</O>
        </Title>
      </>
    ),
  },
  {
    from: P.tSepakat,
    render: (f, a) => (
      <>
        <Label p={a(0)}>Kesepakatan ulama</Label>
        <Title p={a(4)} size={58}>
          Pembunuh <O>tidak</O>
          <br />
          mewarisi
        </Title>
        <Pill p={L(f, P.rincian, P.rincian + 12)} soft>
          Rincian berbeda antar mazhab
        </Pill>
      </>
    ),
  },
  {
    from: P.tJadi,
    render: (f, a) => (
      <>
        <Label p={a(0)}>Sebelum harta dibagi</Label>
        <Title p={a(4)} size={58}>
          Pastikan siapa
          <br />
          yang <span style={{color: f >= P.berhak ? T.orange : T.ink}}>berhak</span>
        </Title>
        <Body p={L(f, P.terhalang - 4, P.terhalang + 8)}>dan siapa yang terhalang</Body>
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
