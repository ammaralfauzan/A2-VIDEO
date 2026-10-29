import React from 'react';
import {AbsoluteFill, Html5Audio, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Broll} from './tips-umroh/Broll';
import {IntroBackdrop, IntroTitle, RevealRing, revealRadius} from './tips-umroh/Intro';
import {Cta, Hook, Point1, Point2, Point3, Point4, Point5, TopProgress} from './tips-umroh/Scenes';
import {W} from './tips-umroh/theme';
import {sp} from './components/motion';
import {BEAT, BROLL, CARD, INTRO, POINT_STARTS, ZOOM} from './tips-umroh/timeline';

// "5 Hal Sebelum Daftar Umroh": video bicara asli + motion graphic penjelasan bergaya situs Wakaf H2C.
// Video dan suara asli tidak dipotong; grafis menempel pada kata yang diucapkan (lihat tips-umroh/timeline.ts).

// Efek suara (scripts/make-sfx-umroh.py): wush saat kartu/B-roll masuk, ssset saat coretan dan zoom,
// ting saat centang (naik nada) dan tombol.
const SFX_GAIN = 0.25;
type Ev = {f: number; src: string; v?: number};
const SFX: Ev[] = [
  {f: 0, src: 'angin', v: 0.6},
  {f: INTRO.reveal[0] - 4, src: 'wush-besar', v: 0.6},
  {f: INTRO.reveal[0], src: 'dentum', v: 0.7},
  {f: ZOOM.punch1 - 3, src: 'sset', v: 0.7},
  {f: CARD.hook - 4, src: 'wush', v: 0.55},
  {f: ZOOM.punch2 - 3, src: 'sset', v: 0.8},
  {f: BEAT.strike, src: 'sset', v: 0.7},
  {f: BEAT.fiveTips, src: 'ting', v: 0.5},
  ...POINT_STARTS.map((s) => ({f: s - 4, src: 'wush', v: 0.5})),
  {f: BEAT.tanggal, src: 'ting-1', v: 0.45},
  {f: BEAT.durasi + 20, src: 'ting-3', v: 0.5},
  {f: BEAT.hotel, src: 'ting-2', v: 0.4},
  {f: BEAT.maskapai, src: 'ting-4', v: 0.4},
  {f: BROLL.fasilitas[0] - 4, src: 'wush-besar', v: 0.6},
  ...[0, 1, 2, 3].map((k) => ({f: BEAT.fasilitas + k * 7 + 4, src: `ting-${k + 1}`, v: 0.45})),
  {f: BEAT.paket + 4, src: 'ting-2', v: 0.45},
  {f: BEAT.tambahan, src: 'sset', v: 0.6},
  {f: BROLL.manasik[0] - 4, src: 'wush-besar', v: 0.6},
  {f: BROLL.pembimbing[0] - 3, src: 'wush', v: 0.55},
  {f: CARD.cta - 4, src: 'wush', v: 0.5},
  {f: BEAT.hubungi - 6, src: 'ting', v: 0.6},
  {f: BEAT.hubungi + 6, src: 'sset', v: 0.4},
];

// Zoom hook ke wajah: dua punch-in (spring sedikit memantul) lalu kembali halus sebelum poin 1.
const zoomAt = (f: number) => {
  const back = interpolate(f, ZOOM.back, [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return 1 + (0.14 * sp(f, ZOOM.punch1, 10) + 0.16 * sp(f, ZOOM.punch2, 10)) * back;
};

export const TipsUmroh: React.FC = () => {
  const f = useCurrentFrame();
  const r = revealRadius(f);
  const opening = f < INTRO.reveal[1];
  return (
    <AbsoluteFill style={{backgroundColor: W.bgDeep}}>
      <IntroBackdrop f={f} />
      {/* Pembicara terbuka dari lingkaran di wajahnya; suaranya tetap terdengar sejak frame 0. */}
      <AbsoluteFill style={{clipPath: opening ? `circle(${r}px at ${INTRO.center.x}px ${INTRO.center.y}px)` : undefined}}>
        <OffthreadVideo
          src={staticFile('video/tips-umroh.mp4')}
          style={{width: 1080, height: 1920, transform: `scale(${zoomAt(f)})`, transformOrigin: `${INTRO.center.x}px ${INTRO.center.y}px`}}
        />
      </AbsoluteFill>
      <RevealRing f={f} />
      <Broll range={BROLL.fasilitas} src="broll/fasilitas.mp4" shift={-360} />
      <Broll range={BROLL.manasik} src="broll/manasik.mp4" shift={-330} fadeOut={false} />
      <Broll range={BROLL.pembimbing} src="broll/pembimbing.mp4" shift={-420} />
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
