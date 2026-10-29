import React from 'react';
import {AbsoluteFill, Html5Audio, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Cta, Hook, Point1, Point2, Point3, Point4, Point5, TopProgress} from './tips-umroh/Scenes';
import {W} from './tips-umroh/theme';
import {BEAT, CARD, POINT_STARTS} from './tips-umroh/timeline';

// "5 Hal Sebelum Daftar Umroh": video bicara asli + motion graphic penjelasan bergaya situs Wakaf H2C.
// Video dan suara asli tidak dipotong; grafis menempel pada kata yang diucapkan (lihat tips-umroh/timeline.ts).

const SFX_GAIN = 0.18;
type Ev = {f: number; src: string; v?: number};
const SFX: Ev[] = [
  {f: CARD.hook, src: 'whoosh', v: 0.5},
  {f: BEAT.strike, src: 'chip', v: 0.7},
  {f: BEAT.fiveTips, src: 'ting', v: 0.6},
  ...POINT_STARTS.map((s, i) => ({f: s + 2, src: `step-${i + 1}`, v: 0.8})),
  {f: BEAT.durasi + 20, src: 'tick', v: 0.7},
  {f: BEAT.hotel, src: 'tick', v: 0.6},
  {f: BEAT.maskapai, src: 'tick', v: 0.6},
  ...[0, 1, 2, 3].map((k) => ({f: BEAT.fasilitas + k * 7 + 4, src: 'tick', v: 0.6})),
  {f: BEAT.paket + 4, src: 'tick', v: 0.6},
  {f: BEAT.tambahan, src: 'kaget', v: 0.45},
  {f: BEAT.manasik, src: 'tick', v: 0.6},
  {f: BEAT.pendampingan, src: 'tick', v: 0.6},
  {f: CARD.cta, src: 'whoosh', v: 0.5},
  {f: BEAT.hubungi - 6, src: 'outro', v: 0.6},
];

export const TipsUmroh: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{backgroundColor: W.bgDeep}}>
      <OffthreadVideo src={staticFile('video/tips-umroh.mp4')} style={{width: 1080, height: 1920}} />
      {/* Gelap hutan di atas (meredam poster latar) dan di bawah (dasar kartu); wajah di y 460–860 tetap terang. */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(4, 13, 8, .72) 0%, rgba(4, 13, 8, .35) 14%, rgba(4, 13, 8, 0) 24%, rgba(4, 13, 8, 0) 50%, rgba(4, 13, 8, .55) 64%, rgba(4, 13, 8, .82) 100%)',
        }}
      />
      <TopProgress f={f} />
      <Hook f={f} />
      <Point1 f={f} />
      <Point2 f={f} />
      <Point3 f={f} />
      <Point4 f={f} />
      <Point5 f={f} />
      <Cta f={f} />
      {SFX.map((e, i) => (
        <Sequence key={i} from={Math.max(0, e.f)} durationInFrames={110} name={`sfx ${e.src}`}>
          <Html5Audio src={staticFile(`sfx/${e.src}.wav`)} volume={SFX_GAIN * (e.v ?? 1)} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
