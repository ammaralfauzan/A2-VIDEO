import React from 'react';
import {AbsoluteFill, Html5Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import type {CaptionCue} from '../data/timeline';
import {color, font} from '../theme';
import {Button} from './Button';
import {Clock, ClockSchedule} from './Clock';
import {Island} from './Island';
import {VerticalContext} from './Layout';
import {Logo} from './Logo';
import {clamp, ease, sp, textIn} from './motion';
import type {OutroTiming} from './Outro';

// Versi 9:16 untuk Reels/TikTok/Shorts. Stage 16:9 dirender di dalam "kamera" yang zoom dan
// menggeser mengikuti fokus; teks penting ditata ulang di area aman agar tidak tertutup
// tombol like/komentar/share (kanan), caption dan nama akun (bawah), serta tab (atas).

export const V_WIDTH = 1080;
export const V_HEIGHT = 1920;

// Area aman gabungan TikTok, Reels, dan Shorts (piksel 1080x1920).
export const SAFE = {left: 60, right: 900, top: 220, bottom: 1500};
const SAFE_CX = (SAFE.left + SAFE.right) / 2; // 480
const SAFE_CY = (SAFE.top + SAFE.bottom) / 2; // 860

// Teks dan logo diletakkan di tengah layar (x 540) agar terlihat seimbang, dengan lebar
// maksimal 720 px sehingga sisi kanannya tetap berhenti di batas aman x 900.
const TEXT = {cx: V_WIDTH / 2, w: 2 * (SAFE.right - V_WIDTH / 2)};
const TEXT_LEFT = TEXT.cx - TEXT.w / 2; // 180

// Titik di layar tempat pusat fokus kamera diletakkan (di atas area caption).
const VIEW = {x: SAFE_CX, y: 830};

export type CameraKey = {f: number; x: number; y: number; z: number};

const cameraAt = (f: number, keys: CameraKey[]) => {
  if (f <= keys[0].f) return keys[0];
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i];
    const b = keys[i + 1];
    if (f >= a.f && f <= b.f) {
      const t = interpolate(f, [a.f, b.f], [0, 1], {...clamp, easing: ease});
      return {x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, z: a.z + (b.z - a.z) * t};
    }
  }
  return keys[keys.length - 1];
};

const Camera: React.FC<{keys: CameraKey[]; children: React.ReactNode}> = ({keys, children}) => {
  const f = useCurrentFrame();
  const {x, y, z} = cameraAt(f, keys);
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: 1920,
        height: 1080,
        transformOrigin: '0 0',
        transform: `translate(${VIEW.x - x * z}px, ${VIEW.y - y * z}px) scale(${z})`,
      }}
    >
      <VerticalContext.Provider value>{children}</VerticalContext.Provider>
    </div>
  );
};

const VCaptions: React.FC<{cues: CaptionCue[]}> = ({cues}) => {
  const frame = useCurrentFrame();
  const cue = cues.find((c) => frame >= c.from && frame < c.to);
  if (!cue) return null;
  const inStyle = textIn(frame, cue.from);
  const out = interpolate(frame, [cue.to - 6, cue.to], [1, 0], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: TEXT_LEFT,
        width: TEXT.w,
        bottom: V_HEIGHT - SAFE.bottom + 30,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 50,
      }}
    >
      <div
        style={{
          fontFamily: font.family,
          fontWeight: 600,
          fontSize: cue.size === 'hook' ? 84 : 64,
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          textAlign: 'center',
          textWrap: 'balance',
          color: color.navy,
          ...inStyle,
          opacity: inStyle.opacity * out,
        }}
      >
        {cue.text}
      </div>
    </div>
  );
};

export type EmpatiText = {small: string; smallAt: number; big: string; bigAt: number; out: [number, number]};

const VEmpati: React.FC<{t: EmpatiText}> = ({t}) => {
  const f = useCurrentFrame();
  if (f < t.smallAt) return null;
  const out = interpolate(f, t.out, [1, 0], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: TEXT_LEFT,
        width: TEXT.w,
        top: SAFE.top,
        height: SAFE.bottom - SAFE.top,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
        textAlign: 'center',
        fontFamily: font.family,
        opacity: out,
        zIndex: 30,
      }}
    >
      <div style={{fontSize: 44, fontWeight: 500, color: color.muted, ...textIn(f, t.smallAt)}}>{t.small}</div>
      <div style={{fontSize: 80, lineHeight: 1.1, fontWeight: 600, color: color.navy, letterSpacing: '-0.02em', textWrap: 'balance', ...textIn(f, t.bigAt)}}>
        {t.big}
      </div>
    </div>
  );
};

const VOutro: React.FC<{timing: OutroTiming}> = ({timing}) => {
  const f = useCurrentFrame();
  if (f < timing.logoIn - 1) return null;
  const s = sp(f, timing.logoIn, 12);
  const raw = interpolate(f, timing.tagline, [0, 1], {...clamp, easing: ease});
  const tagline = Math.round(raw * 40) / 40;
  const size = 1000;
  // Isi logo ada di x 14,5–85,7% dan y 23,1–72,5% file. Logo + tombol (tinggi ±640 px)
  // ditengahkan di area aman: isi logo jatuh di x 185–897, tombol di bawahnya.
  const group = {h: 0.494 * size + 56 + 88};
  const contentTop = SAFE_CY - group.h / 2;
  return (
    <>
      <Logo
        size={size}
        taglineReveal={tagline}
        style={{
          position: 'absolute',
          left: TEXT.cx - size / 2,
          top: contentTop - 0.231 * size,
          opacity: s,
          transform: `scale(${0.96 + 0.04 * s})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: TEXT_LEFT,
          width: TEXT.w,
          top: contentTop + 0.494 * size + 56,
          display: 'flex',
          justifyContent: 'center',
          ...textIn(f, timing.pillIn),
        }}
      >
        <Button label="Konsultasi gratis · a2automate.com" style={{height: 88, padding: '0 40px', fontSize: 32}} />
      </div>
    </>
  );
};

// Panduan area aman untuk review frame kunci (tidak ikut ke video akhir).
const SafeGuide: React.FC = () => {
  const zone = {position: 'absolute', background: 'rgba(229,72,77,0.22)', zIndex: 200} as const;
  return (
    <>
      <div style={{...zone, left: 0, right: 0, top: 0, height: SAFE.top}} />
      <div style={{...zone, left: 0, right: 0, top: SAFE.bottom, bottom: 0}} />
      <div style={{...zone, left: SAFE.right, right: 0, top: SAFE.top, height: SAFE.bottom - SAFE.top}} />
      <div style={{...zone, left: 0, width: SAFE.left, top: SAFE.top, height: SAFE.bottom - SAFE.top}} />
    </>
  );
};

export type VerticalConfig = {
  Stage: React.FC;
  audio: string;
  captions: CaptionCue[];
  camera: CameraKey[];
  clock?: ClockSchedule;
  island: {start: number; end: number; text: string};
  empati: EmpatiText;
  outro: OutroTiming;
  toWhite: [number, number];
};

export const VerticalVideo: React.FC<{config: VerticalConfig; safeGuide?: boolean}> = ({config, safeGuide}) => {
  const frame = useCurrentFrame();
  const c = config;
  return (
    <AbsoluteFill style={{background: color.canvas, fontFamily: font.family, overflow: 'hidden'}}>
      <AbsoluteFill style={{background: color.surface, opacity: interpolate(frame, c.toWhite, [0, 1], clamp)}} />
      <Camera keys={c.camera}>
        <c.Stage />
      </Camera>
      <Html5Audio src={staticFile(c.audio)} />
      <Clock schedule={c.clock} position={{top: SAFE.top + 30, left: SAFE.left, right: 'auto'}} />
      <Island frame={frame} start={c.island.start} end={c.island.end} text={c.island.text} top={SAFE.top + 30} centerX={TEXT.cx} />
      <VCaptions cues={c.captions} />
      <VEmpati t={c.empati} />
      <VOutro timing={c.outro} />
      {safeGuide ? <SafeGuide /> : null}
    </AbsoluteFill>
  );
};
