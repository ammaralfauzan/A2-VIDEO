import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {CARD_DARK, CARD_LIGHT, T, TF, TR, leafRadius} from './theme';

// Satu frame contoh Brand Kit Tams Consulting (draf). Bukan video.
// Area aman 9:16: x 60–900, y 220–1500.
const Chart: React.FC = () => {
  const bars = [150, 210, 185, 280, 360];
  return (
    <svg width={640} height={420} viewBox="0 0 640 420">
      <line x1={20} y1={400} x2={620} y2={400} stroke={T.line2} strokeWidth={3} />
      {bars.map((h, i) => {
        const last = i === bars.length - 1;
        const x = 50 + i * 115;
        const y = 400 - h;
        // batang terakhir memakai bentuk daun logo (sudut kiri atas membulat)
        return last ? (
          <path key={i} d={`M${x} ${y + 40} Q${x} ${y} ${x + 40} ${y} L${x + 72} ${y} L${x + 72} 400 L${x} 400 Z`} fill={T.orange} />
        ) : (
          <rect key={i} x={x} y={y} width={72} height={h} rx={3} fill={T.charcoal} opacity={0.85} />
        );
      })}
    </svg>
  );
};

export const BrandSample: React.FC = () => (
  <AbsoluteFill style={{background: T.bg, fontFamily: TF.text, color: T.ink}}>
    {/* logo asli, tidak digambar ulang */}
    <Img src={staticFile('brands/tams-concsulting/logo-lengkap.png')} style={{position: 'absolute', left: 30, top: 200, width: 520}} />

    {/* kartu judul: panel arang, sudut daun */}
    <div style={{position: 'absolute', left: 80, top: 520, width: 800, ...CARD_DARK, padding: '60px 56px'}}>
      <div style={{display: 'inline-block', fontFamily: TF.head, fontWeight: 700, fontSize: 26, color: T.orange, letterSpacing: 6}}>KARTU JUDUL</div>
      <div style={{fontFamily: TF.head, fontWeight: 800, fontSize: 74, lineHeight: 1.08, marginTop: 22, letterSpacing: -1}}>
        Keputusan bisnis yang <span style={{color: T.orange}}>lebih jelas</span>.
      </div>
      <div style={{fontSize: 32, fontWeight: 500, lineHeight: 1.4, color: T.onDark2, marginTop: 24}}>Contoh teks isi: satu gagasan per layar.</div>
    </div>

    {/* ilustrasi */}
    <div style={{position: 'absolute', left: 80, top: 1000, width: 800, height: 330, ...CARD_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
      <div style={{transform: 'scale(.68)'}}><Chart /></div>
      <div style={{position: 'absolute', right: 28, top: 22, fontSize: 24, fontWeight: 600, color: T.ink3}}>contoh</div>
    </div>

    {/* tombol ajakan: oranye, sudut daun */}
    <div style={{position: 'absolute', left: 80, top: 1370, background: T.orange, color: T.onDark, fontFamily: TF.head, fontWeight: 700, fontSize: 38, padding: '26px 48px', borderRadius: leafRadius(TR.btn)}}>
      Ajakan (belum ditentukan) →
    </div>
  </AbsoluteFill>
);
