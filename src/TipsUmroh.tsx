import React from 'react';
import {AbsoluteFill, Html5Audio, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Broll} from './tips-umroh/Broll';
import {IntroBackdrop, IntroTitle, RevealRing, revealRadius} from './tips-umroh/Intro';
import {Cta, Hook, Point1, Point2, Point3, Point4, Point5, TopProgress} from './tips-umroh/Scenes';
import {W} from './tips-umroh/theme';
import {BEAT, BROLL, CARD, INTRO, POINT_STARTS} from './tips-umroh/timeline';

// "5 Hal Sebelum Daftar Umroh": video bicara asli + motion graphic penjelasan bergaya situs Wakaf H2C.
// Video dan suara asli tidak dipotong; grafis menempel pada kata yang diucapkan (lihat tips-umroh/timeline.ts).

// Efek suara foley (scripts/make-sfx-umroh.py): kertas, pensil, buku, angin. Tanpa nada sintetis.
const SFX_GAIN = 0.25;
type Ev = {f: number; src: string; v?: number};
const SFX: Ev[] = [
  {f: 0, src: 'angin', v: 0.6},
  {f: INTRO.reveal[0], src: 'dentum', v: 0.75},
  {f: CARD.hook - 2, src: 'kartu', v: 0.5},
  {f: BEAT.strike, src: 'coret', v: 0.8},
  {f: BEAT.fiveTips, src: 'klik', v: 0.45},
  ...POINT_STARTS.map((s) => ({f: s - 2, src: 'kartu', v: 0.45})),
  {f: BEAT.tanggal, src: 'halaman', v: 0.6},
  {f: BEAT.durasi + 20, src: 'centang-1', v: 0.6},
  {f: BEAT.hotel, src: 'klik', v: 0.3},
  {f: BEAT.maskapai, src: 'pesawat', v: 0.55},
  ...[0, 1, 2, 3].map((k) => ({f: BEAT.fasilitas + k * 7 + 4, src: `centang-${k + 1}`, v: 0.55})),
  {f: BROLL.makan[0], src: 'foto', v: 0.5},
  {f: BEAT.paket + 4, src: 'centang-2', v: 0.55},
  {f: BEAT.tambahan, src: 'sobek', v: 0.55},
  {f: BEAT.manasik, src: 'buku', v: 0.6},
  {f: BROLL.pembimbing[0], src: 'foto', v: 0.5},
  {f: CARD.cta - 2, src: 'kartu', v: 0.45},
  {f: BEAT.hubungi - 6, src: 'klik', v: 0.6},
];

export const TipsUmroh: React.FC = () => {
  const f = useCurrentFrame();
  const r = revealRadius(f);
  const opening = f < INTRO.reveal[1];
  return (
    <AbsoluteFill style={{backgroundColor: W.bgDeep}}>
      <IntroBackdrop f={f} />
      {/* Pembicara terbuka dari lingkaran di wajahnya; suaranya tetap terdengar sejak frame 0. */}
      <AbsoluteFill style={{clipPath: opening ? `circle(${r}px at ${INTRO.center.x}px ${INTRO.center.y}px)` : undefined}}>
        <OffthreadVideo src={staticFile('video/tips-umroh.mp4')} style={{width: 1080, height: 1920}} />
      </AbsoluteFill>
      <RevealRing f={f} />
      <Broll f={f} range={BROLL.makan} src="broll/makan.jpg" caption="Fasilitas makan" focus="50% 78%" />
      <Broll f={f} range={BROLL.pembimbing} src="broll/pembimbing.jpg" caption="Pembimbing H2C" focus="60% 40%" />
      {/* Gelap hutan di atas (meredam poster latar) dan di bawah (dasar kartu); wajah di y 460–860 tetap terang. */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(4, 13, 8, .72) 0%, rgba(4, 13, 8, .35) 14%, rgba(4, 13, 8, 0) 24%, rgba(4, 13, 8, 0) 50%, rgba(4, 13, 8, .55) 64%, rgba(4, 13, 8, .82) 100%)',
          opacity: interpolate(f, INTRO.reveal, [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      />
      <IntroTitle f={f} />
      <TopProgress f={f} />
      <Hook f={f} />
      <Point1 f={f} />
      <Point2 f={f} />
      <Point3 f={f} />
      <Point4 f={f} />
      <Point5 f={f} />
      <Cta f={f} />
      {SFX.map((e, i) => (
        <Sequence key={i} from={Math.max(0, e.f)} durationInFrames={90} name={`sfx ${e.src}`}>
          <Html5Audio src={staticFile(`sfx/umroh/${e.src}.wav`)} volume={SFX_GAIN * (e.v ?? 1)} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
