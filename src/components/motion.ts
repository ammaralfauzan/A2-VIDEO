import {Easing, interpolate, spring} from 'remotion';
import {FPS, springConfig, springFrames} from '../theme';

// Spring 0 -> 1 mulai dari frame `start`.
export const sp = (frame: number, start: number, dur: number = springFrames) =>
  spring({frame: frame - start, fps: FPS, config: springConfig, durationInFrames: dur});

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const ease = Easing.bezier(0.45, 0, 0.2, 1);

export const lerp = (frame: number, [a, b]: [number, number], [from, to]: [number, number]) =>
  interpolate(frame, [a, b], [from, to], {...clamp, easing: ease});

// Teks masuk: blur ke tajam + naik 8px dalam ~250 ms.
export const textIn = (frame: number, start: number) => {
  const p = interpolate(frame, [start, start + 8], [0, 1], {...clamp, easing: ease});
  return {
    opacity: p,
    filter: `blur(${(1 - p) * 8}px)`,
    transform: `translateY(${(1 - p) * 8}px)`,
  };
};

// Konten panel bergantian: pudar keluar lalu masuk dengan blur ringan.
export const fadeOut = (frame: number, start: number, dur = 8) =>
  interpolate(frame, [start, start + dur], [1, 0], {...clamp, easing: ease});
