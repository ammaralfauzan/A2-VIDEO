import React from 'react';
import {AbsoluteFill, Html5Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {KineticText} from './components/KineticText';
import {clamp} from './components/motion';
import {CHUNKS} from './data/timeline-manual-template-otomatis';
import {Broll} from './tips-umroh/Broll';
import {GigiNaik} from './scenes/manual-template-otomatis/GigiNaik';
import {Judul} from './scenes/manual-template-otomatis/Judul';
import {BROLL_CLIPS, TEXT_BOX} from './scenes/manual-template-otomatis/layout';
import {OUTRO, Penutup} from './scenes/manual-template-otomatis/Penutup';
import {Sfx} from './scenes/manual-template-otomatis/Sfx';
import {Tangga} from './scenes/manual-template-otomatis/Tangga';
import {color, font} from './theme';

// "Manual, Template, atau Otomatis?": explainer kinetik 9:16. Tangga tiga tingkat dengan contoh tugas marketing
// digital, rantai pemicu-aturan-tindakan, Gigi naik anak tangga; teks kinetik di bawah; penutup logo + ajakan follow.
export const ManualTemplateOtomatis: React.FC<{safeGuide?: boolean}> = ({safeGuide = false}) => {
  const f = useCurrentFrame();
  const toWhite = interpolate(f, [OUTRO.start, OUTRO.start + 14], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: color.canvas, fontFamily: font.family, overflow: 'hidden'}}>
      <AbsoluteFill style={{background: color.surface, opacity: toWhite}} />
      <Judul f={f} />
      <Tangga f={f} />
      <Penutup f={f} />
      <GigiNaik f={f} />
      <KineticText chunks={CHUNKS} box={TEXT_BOX} hideFrom={OUTRO.start} />
      {BROLL_CLIPS.map((c, i) => (
        <Broll key={i} range={[c.from, c.to]} src={c.src} shift={c.shift ?? 0} />
      ))}
      <Html5Audio src={staticFile('audio/vo-manual-template-otomatis.mp3')} />
      <Sfx />
      {safeGuide ? (
        <div style={{position: 'absolute', left: 60, top: 220, width: 840, height: 1280, border: '3px dashed #E5484D', pointerEvents: 'none'}} />
      ) : null}
    </AbsoluteFill>
  );
};
