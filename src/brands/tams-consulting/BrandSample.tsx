import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {CARD_LIGHT, T, TF, TR, leafRadius} from './theme';

// Satu frame contoh Brand Kit Tams Consulting. Bukan video.
// Gaya mengikuti posting Bos: latar putih, susunan tengah, judul oranye, garis oranye pendek,
// dekor lengkung pudar di sudut. Area aman 9:16: x 60–900, y 220–1500.

// Ilustrasi contoh: bagan pembagian waris sederhana (bidang rata, tanpa wajah).
const Bagan: React.FC = () => {
  const node = (x: number, y: number, label: string, hot = false) => (
    <g key={label}>
      <path d={`M${x - 70} ${y + 36} L${x - 70} ${y - 6} Q${x - 70} ${y - 36} ${x - 40} ${y - 36} L${x + 70} ${y - 36} L${x + 70} ${y + 36} Z`}
        fill={hot ? T.orange : T.charcoal} />
      <text x={x} y={y + 10} textAnchor="middle" fontFamily="Montserrat" fontWeight={700} fontSize={26} fill={T.onDark}>{label}</text>
    </g>
  );
  return (
    <svg width={700} height={300} viewBox="0 0 700 300">
      <path d="M350 86 L350 150 M130 150 L570 150 M130 150 L130 200 M350 150 L350 200 M570 150 L570 200" stroke={T.line2} strokeWidth={4} fill="none" />
      {node(350, 50, 'Pewaris', true)}
      {node(130, 236, 'Ahli 1')}
      {node(350, 236, 'Ahli 2')}
      {node(570, 236, 'Ahli 3')}
    </svg>
  );
};

export const BrandSample: React.FC = () => (
  <AbsoluteFill style={{background: T.bg, fontFamily: TF.text, color: T.ink}}>
    {/* dekor lengkung pudar di sudut (dari lingkaran logo) */}
    <div style={{position: 'absolute', right: -180, top: -120, width: 520, height: 520, borderRadius: '50%', border: `2px solid ${T.line}`}} />
    <div style={{position: 'absolute', left: -200, bottom: -160, width: 480, height: 480, borderRadius: '50%', background: T.orangeSoft, opacity: 0.6}} />

    {/* logo asli, tidak digambar ulang */}
    <Img src={staticFile('brands/tams-consulting/logo-lengkap.png')} style={{position: 'absolute', left: 480 - 210, top: 210, width: 420}} />

    {/* kartu judul */}
    <div style={{position: 'absolute', left: 60, top: 520, width: 840, textAlign: 'center'}}>
      <div style={{fontFamily: TF.head, fontWeight: 700, fontSize: 26, color: T.ink3, letterSpacing: 6}}>KARTU JUDUL</div>
      <div style={{fontFamily: TF.head, fontWeight: 800, fontSize: 70, lineHeight: 1.1, marginTop: 18, letterSpacing: -1}}>
        Ayo,<br /><span style={{color: T.orange}}>Hitung Waris Dulu.</span>
      </div>
      <div style={{fontSize: 34, fontWeight: 500, lineHeight: 1.4, color: T.ink2, marginTop: 24}}>Contoh teks isi: satu gagasan per layar.</div>
    </div>

    {/* ilustrasi */}
    <div style={{position: 'absolute', left: 60, top: 920, width: 840, height: 360, ...CARD_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{transform: 'scale(.9)'}}><Bagan /></div>
      <div style={{position: 'absolute', right: 28, top: 22, fontSize: 24, fontWeight: 600, color: T.ink3}}>contoh</div>
    </div>

    {/* ajakan: judul tegas + garis oranye pendek + tombol */}
    <div style={{position: 'absolute', left: 60, top: 1330, width: 840, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div style={{background: T.orange, color: T.onDark, fontFamily: TF.head, fontWeight: 700, fontSize: 38, padding: '24px 52px', borderRadius: leafRadius(TR.btn)}}>
        Ajakan (belum ditentukan)
      </div>
      <div style={{width: 96, height: 6, background: T.orange, marginTop: 26, borderRadius: 3}} />
    </div>
  </AbsoluteFill>
);
