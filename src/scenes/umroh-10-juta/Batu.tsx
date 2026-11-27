import React from 'react';
import {U} from '../../brands/h2c-umroh/theme';

// Batu hitam berbingkai perak (benda saja, tanpa orang/tangan/tempat). Bidang rata dari token:
// perak = gading-sage, batu = zamrud paling gelap ditimpa hitam beropasitas. Cahaya emas menyapu bingkai.
export const Batu: React.FC<{f: number; w?: number}> = ({f, w = 300}) => {
  const h = (w * 380) / 300;
  // sapuan cahaya: berjalan diagonal tiap ±3 dtk
  const sweep = ((f * 2.2) % 220) - 60; // -60..160 (persen)
  const breathe = 0.75 + 0.25 * Math.sin(f / 22);
  return (
    <svg width={w} height={h} viewBox="0 0 300 380" style={{overflow: 'visible', display: 'block'}}>
      <defs>
        <radialGradient id="bt-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={U.gold} stopOpacity={0.42} />
          <stop offset="60%" stopColor={U.gold} stopOpacity={0.1} />
          <stop offset="100%" stopColor={U.gold} stopOpacity={0} />
        </radialGradient>
        <linearGradient id="bt-silver" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={U.ivory} />
          <stop offset="45%" stopColor={U.sage} />
          <stop offset="75%" stopColor={U.ivory2} />
          <stop offset="100%" stopColor={U.sage} />
        </linearGradient>
        <linearGradient id="bt-sweep" x1="0" y1="0" x2="1" y2="1">
          <stop offset={`${sweep - 14}%`} stopColor={U.goldLight} stopOpacity={0} />
          <stop offset={`${sweep}%`} stopColor={U.goldLight} stopOpacity={0.9} />
          <stop offset={`${sweep + 14}%`} stopColor={U.goldLight} stopOpacity={0} />
        </linearGradient>
        <radialGradient id="bt-stone" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor={U.surface} />
          <stop offset="55%" stopColor={U.bg} />
          <stop offset="100%" stopColor={U.bg} />
        </radialGradient>
        <clipPath id="bt-frame">
          <ellipse cx="150" cy="190" rx="138" ry="178" />
        </clipPath>
      </defs>
      {/* pendar emas di belakang */}
      <ellipse cx="150" cy="190" rx={260} ry={300} fill="url(#bt-glow)" opacity={breathe} />
      {/* bayangan di meja */}
      <ellipse cx="150" cy="392" rx="120" ry="16" fill="#000" opacity={0.35} />
      {/* bingkai perak: cincin luar, ukiran, cincin dalam */}
      <ellipse cx="150" cy="190" rx="138" ry="178" fill="url(#bt-silver)" />
      <ellipse cx="150" cy="190" rx="138" ry="178" fill="url(#bt-sweep)" clipPath="url(#bt-frame)" />
      <ellipse cx="150" cy="190" rx="122" ry="162" fill="none" stroke={U.bg} strokeOpacity={0.35} strokeWidth={3} />
      {Array.from({length: 18}).map((_, i) => {
        const a = (i / 18) * Math.PI * 2;
        return <circle key={i} cx={150 + Math.cos(a) * 130} cy={190 + Math.sin(a) * 170} r={4} fill={U.ivory} opacity={0.7} />;
      })}
      <ellipse cx="150" cy="212" rx="86" ry="104" fill={U.sage} />
      <ellipse cx="150" cy="212" rx="78" ry="96" fill="#000" opacity={0.25} />
      {/* batu */}
      <ellipse cx="150" cy="212" rx="72" ry="90" fill="url(#bt-stone)" />
      <ellipse cx="150" cy="212" rx="72" ry="90" fill="#000" opacity={0.62} />
      <path d="M110 170 L150 150 L186 178 L170 214 L128 206 Z" fill={U.surface} opacity={0.35} />
      <path d="M118 236 L152 222 L184 240 L162 276 L126 266 Z" fill={U.surface} opacity={0.28} />
      <path d="M128 206 L170 214 L152 222 L118 236 Z" fill="#000" opacity={0.3} />
      <path d="M116 168 Q130 150 156 148" fill="none" stroke={U.ivory} strokeOpacity={0.35} strokeWidth={4} strokeLinecap="round" />
    </svg>
  );
};
