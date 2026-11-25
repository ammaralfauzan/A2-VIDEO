import React from 'react';
import {Html5Audio, Sequence, staticFile} from 'remotion';
import {CLICK_FRAMES} from './Kursor';
import {FAMILY_ID, NAMES, P, POP, SANDI, STEP_AT, TYPE_EVERY, typedEnd} from './layout';

// Efek suara halus (tanpa musik, sesuai naskah): klik, ketikan, wush saat kamera/angka langkah, ting saat tersimpan.
// Palet umroh (scripts/make-sfx-umroh.py) + tick. Jauh di bawah narator.
export const SFX_GAIN = 0.2;

type Ev = {f: number; src: string; v?: number};

export const sfxEvents = (): Ev[] => {
  const ev: Ev[] = [];
  CLICK_FRAMES.forEach((f) => ev.push({f, src: 'tick', v: 0.9}));
  const typing: [string, number][] = [
    [NAMES[0], P.nameFrom],
    [SANDI, P.sandiFrom],
    [FAMILY_ID, P.idFrom],
    [SANDI, P.pwFrom],
  ];
  typing.forEach(([t, from]) => {
    for (let f = from; f < typedEnd(t, from); f += TYPE_EVERY * 2) ev.push({f, src: 'tick', v: 0.22});
  });
  [0, 1, 2, 3].forEach((i) => ev.push({f: 1 + i * 5, src: 'tick', v: 0.45})); // kartu muncul
  STEP_AT.forEach((s) => {
    ev.push({f: s - POP.pre, src: 'umroh/wush-besar', v: 0.5});
    ev.push({f: s - POP.pre + POP.hold, src: 'umroh/wush', v: 0.35});
  });
  ev.push({f: P.clickSave + 4, src: 'umroh/ting-1', v: 0.5});
  P.addMore.forEach((f, i) => ev.push({f: f + 1, src: `umroh/ting-${i + 2}`, v: 0.45}));
  ev.push({f: P.clickSalin + 2, src: 'umroh/ting-2', v: 0.5});
  ev.push({f: P.phoneIn, src: 'umroh/wush', v: 0.45});
  ev.push({f: P.bubble, src: 'umroh/sset', v: 0.5});
  ev.push({f: P.sent, src: 'umroh/ting-3', v: 0.45});
  ev.push({f: P.phoneOut, src: 'umroh/wush', v: 0.4});
  ev.push({f: P.clickMasuk + 6, src: 'umroh/ting-4', v: 0.5});
  ev.push({f: P.fly, src: 'umroh/wush', v: 0.4});
  ev.push({f: P.order, src: 'umroh/ting-5', v: 0.5});
  ev.push({f: P.done, src: 'umroh/ting', v: 0.8});
  ev.push({f: P.outro, src: 'umroh/wush', v: 0.6});
  ev.push({f: P.button, src: 'umroh/ting-5', v: 0.6});
  return ev.sort((a, b) => a.f - b.f);
};

export const Sfx: React.FC = () => (
  <>
    {sfxEvents().map((e, i) => (
      <Sequence key={i} from={Math.max(0, e.f)} durationInFrames={60} name={`sfx ${e.src}`}>
        <Html5Audio src={staticFile(`sfx/${e.src}.wav`)} volume={SFX_GAIN * (e.v ?? 1)} />
      </Sequence>
    ))}
  </>
);
