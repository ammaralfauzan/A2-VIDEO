import React from 'react';
import {interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {clamp, ease} from '../../components/motion';
import {BROLL, BrollSlot} from './layout';

// Pola src/tips-umroh/Broll.tsx: layar penuh, masuk whip-zoom (besar + buram ke tajam), suara klip dibuang,
// keluar memudar. `shift` menaikkan klip tajam agar bagian penting di atas teks bawah; celah diisi klip yang sama diburamkan.
// Slot dengan src null (klip belum dilampirkan) dilewati: bidang rata tetap utuh.
const Clip: React.FC<{slot: BrollSlot}> = ({slot}) => {
  const t = useCurrentFrame();
  const dur = slot.to - slot.from;
  const pIn = interpolate(t, [0, 7], [0, 1], {...clamp, easing: ease});
  const out = interpolate(t, [dur - 6, dur], [0, 1], {...clamp, easing: ease});
  const fade = 'linear-gradient(180deg, black 0%, black 78%, transparent 100%)';
  const src = staticFile(slot.src as string);
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', opacity: interpolate(pIn, [0, 0.5], [0, 1], clamp) * (1 - out)}}>
      <OffthreadVideo src={src} muted trimBefore={slot.start ?? 0} style={{position: 'absolute', inset: 0, width: 1080, height: 1920, transform: 'scale(1.25)', filter: 'blur(36px) brightness(.8)'}} />
      <OffthreadVideo
        src={src}
        muted
        trimBefore={slot.start ?? 0}
        style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, transformOrigin: '50% 30%', transform: `translateY(${slot.shift ?? 0}px) scale(${(1.22 - 0.22 * pIn) * (1 + 0.05 * (t / dur))})`, filter: `blur(${(1 - pIn) * 14}px)`, WebkitMaskImage: fade, maskImage: fade}}
      />
    </div>
  );
};

export const BrollLayer: React.FC = () => (
  <>
    {BROLL.filter((s) => s.src).map((s, i) => (
      <Sequence key={i} from={s.from} durationInFrames={s.to - s.from} name={`broll ${s.src}`} layout="none">
        <Clip slot={s} />
      </Sequence>
    ))}
  </>
);

// 0..1: seberapa penuh B-roll menutup layar pada frame f (untuk kartu putih di bawah teks).
export const brollOn = (f: number) => {
  let best = 0;
  for (const r of BROLL) {
    if (!r.src) continue;
    const a = r.from <= 0 ? 1 : interpolate(f, [r.from, r.from + 5], [0, 1], clamp);
    best = Math.max(best, Math.min(a, interpolate(f, [r.to - 5, r.to], [1, 0], clamp)));
  }
  return best;
};
