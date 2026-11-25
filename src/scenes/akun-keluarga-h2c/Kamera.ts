import {Easing} from 'remotion';
import {CAM_KEYS, SHOT, Shot} from './layout';

// Kamera murni fungsi waktu: antara dua kunci, satu kemajuan ber-easing (tahan sebentar di awal dan akhir gerak).
const ease = Easing.bezier(0.42, 0, 0.18, 1);
const mix = (a: Shot, b: Shot, t: number): Shot => ({
  cx: a.cx + (b.cx - a.cx) * t,
  cy: a.cy + (b.cy - a.cy) * t,
  s: a.s + (b.s - a.s) * t,
  tx: a.tx + (b.tx - a.tx) * t,
  ty: a.ty + (b.ty - a.ty) * t,
  dof: a.dof + (b.dof - a.dof) * t,
});

export const camAt = (f: number): Shot => {
  const K = CAM_KEYS;
  if (f <= K[0][0]) return SHOT[K[0][1]];
  for (let i = 0; i < K.length - 1; i++) {
    const [fa, sa] = K[i];
    const [fb, sb] = K[i + 1];
    if (f >= fa && f < fb) return mix(SHOT[sa], SHOT[sb], ease((f - fa) / Math.max(1, fb - fa)));
  }
  return SHOT[K[K.length - 1][1]];
};

// Transform CSS untuk lapisan dunia: titik (cx,cy) ke (tx,ty) dengan skala s.
export const camTransform = (c: Shot) => `translate(${c.tx - c.cx * c.s}px, ${c.ty - c.cy * c.s}px) scale(${c.s})`;
