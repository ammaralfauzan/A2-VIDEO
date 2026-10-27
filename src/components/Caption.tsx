import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {CAPTIONS, CaptionCue} from '../data/timeline';
import {color, font} from '../theme';
import {clamp, textIn} from './motion';

// Caption besar di bawah layar, mengikuti cue di timeline.
export const Captions: React.FC<{cues?: CaptionCue[]}> = ({cues = CAPTIONS}) => {
  const frame = useCurrentFrame();
  const cue = cues.find((c) => frame >= c.from && frame < c.to);
  if (!cue) return null;
  const inStyle = textIn(frame, cue.from);
  const out = interpolate(frame, [cue.to - 6, cue.to], [1, 0], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: cue.size === 'hook' ? 896 : 916,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 50,
      }}
    >
      <div
        style={{
          fontFamily: font.family,
          fontWeight: 600,
          fontSize: cue.size === 'hook' ? font.hook : font.caption,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
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
