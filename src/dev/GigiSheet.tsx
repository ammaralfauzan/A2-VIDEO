import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Gigi, Mood} from '../components/Gigi';
import {color, font} from '../theme';

// Lembar ekspresi Gigi untuk review desain maskot (tidak dirender ke video).
const MOODS: Mood[] = ['biasa', 'senang', 'puas', 'kaget', 'cemas', 'lelah', 'mikir', 'kedip'];

export const GigiSheet: React.FC = () => (
  <AbsoluteFill style={{background: color.canvas, display: 'flex', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center', rowGap: 30, columnGap: 40, padding: 40, fontFamily: font.family}}>
    {MOODS.map((m) => (
      <div key={m} style={{width: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
        <Gigi size={190} mood={m} sweat={m === 'lelah' || m === 'cemas' ? 1 : 0} />
        <div style={{fontSize: 30, fontWeight: 600, color: color.navy}}>{m}</div>
      </div>
    ))}
  </AbsoluteFill>
);

// Lembar Gigi bervolume (2D tampak 3D, revisi 5 "Alasan Saya Bikin A2"): ekspresi + arah toleh.
const SHEET3D: {mood: Mood; turn: number; pitch: number; label: string}[] = [
  {mood: 'biasa', turn: 0, pitch: 0, label: 'biasa'},
  {mood: 'senang', turn: 0, pitch: 0, label: 'senang'},
  {mood: 'sedih', turn: 0, pitch: -0.5, label: 'sedih, dongak'},
  {mood: 'cemas', turn: -0.7, pitch: 0, label: 'geleng kiri'},
  {mood: 'cemas', turn: 0.7, pitch: 0, label: 'geleng kanan'},
  {mood: 'lelah', turn: 0, pitch: 0.3, label: 'lelah'},
  {mood: 'mikir', turn: 0.3, pitch: -0.3, label: 'mikir'},
  {mood: 'puas', turn: 0, pitch: 0, label: 'puas'},
];
export const GigiSheet3D: React.FC = () => (
  <AbsoluteFill style={{background: color.canvas, display: 'flex', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center', rowGap: 30, columnGap: 40, padding: 40, fontFamily: font.family}}>
    {SHEET3D.map((g) => (
      <div key={g.label} style={{width: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
        <Gigi size={190} mood={g.mood} turn={g.turn} pitch={g.pitch} volume={1} sweat={g.mood === 'lelah' || g.mood === 'cemas' ? 1 : 0} sweatPhase={0.3} />
        <div style={{fontSize: 28, fontWeight: 600, color: color.navy}}>{g.label}</div>
      </div>
    ))}
  </AbsoluteFill>
);
