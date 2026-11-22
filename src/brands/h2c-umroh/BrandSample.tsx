import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {BIG_GRADIENT, BTN, CARD, GOLD_LEAF, RIBBON, U, UF} from './theme';

// Satu frame contoh Brand Kit H2C Umroh. Bukan video.
// Gaya dari situs umroh.h2c.or.id (repo h2c-umroh): latar zamrud, judul skrip + kapital emas + pita emas,
// chip pill bergaris emas, tombol pill emas, aksen limau dari logo. Area aman 9:16: x 60–900, y 220–1500.

// Ilustrasi contoh: koper + tiket (benda saja, tanpa tempat ibadah dan tanpa wajah).
const KoperTiket: React.FC = () => (
  <svg width={590} height={300} viewBox="0 20 620 310">
    <ellipse cx={310} cy={300} rx={250} ry={18} fill="rgba(0,0,0,.28)" />
    {/* koper */}
    <rect x={120} y={96} width={190} height={200} rx={28} fill={U.surface2} stroke={U.goldLine} strokeWidth={3} />
    <rect x={172} y={56} width={86} height={50} rx={18} fill="none" stroke={U.gold} strokeWidth={12} />
    <rect x={150} y={96} width={14} height={200} fill={U.goldSoft} />
    <rect x={266} y={96} width={14} height={200} fill={U.goldSoft} />
    <rect x={190} y={176} width={50} height={40} rx={10} fill={U.gold} />
    <circle cx={215} cy={196} r={6} fill={U.bg} />
    {/* tiket */}
    <g transform="rotate(-6 440 200)">
      <rect x={330} y={130} width={230} height={130} rx={22} fill={U.ivory} />
      <rect x={330} y={130} width={230} height={36} rx={18} fill={U.gold} />
      <rect x={330} y={150} width={230} height={16} fill={U.gold} />
      <line x1={480} y1={176} x2={480} y2={250} stroke={U.sage} strokeWidth={3} strokeDasharray="8 8" />
      <rect x={352} y={186} width={100} height={14} rx={7} fill={U.surface} opacity={0.5} />
      <rect x={352} y={214} width={70} height={14} rx={7} fill={U.surface} opacity={0.3} />
      <circle cx={520} cy={213} r={20} fill={U.leaf} />
      <path d="M510 213 L518 221 L532 205" stroke={U.bg} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

export const BrandSample: React.FC = () => (
  <AbsoluteFill style={{background: U.bg, fontFamily: UF.text, color: U.ivory}}>
    {/* cahaya lembut dan lingkaran pudar */}
    <div style={{position: 'absolute', left: -260, top: -200, width: 900, height: 900, borderRadius: '50%', background: 'radial-gradient(circle, rgba(27,78,56,.9) 0%, rgba(10,31,23,0) 70%)'}} />
    <div style={{position: 'absolute', right: -220, bottom: 160, width: 560, height: 560, borderRadius: '50%', border: `2px solid ${U.goldLine}`, opacity: 0.5}} />

    {/* logo asli, tidak digambar ulang */}
    <Img src={staticFile('brands/h2c-umroh/logo.jpeg')} style={{position: 'absolute', left: 60, top: 230, width: 120, height: 120, borderRadius: '50%', border: `3px solid ${U.goldLine}`}} />
    <div style={{position: 'absolute', left: 200, top: 252, fontFamily: UF.text, fontWeight: 800, fontSize: 32}}>H2C Wisata Mandiri</div>
    <div style={{position: 'absolute', left: 200, top: 298, fontWeight: 600, fontSize: 24, color: U.sage}}>umroh.h2c.or.id</div>

    {/* chip */}
    <div style={{position: 'absolute', left: 60, top: 410, display: 'flex', alignItems: 'center', gap: 14, padding: '14px 26px 14px 20px', borderRadius: 999, border: `2px solid ${U.goldLine}`, background: 'rgba(8,26,18,.6)', fontWeight: 700, fontSize: 26}}>
      <span style={{width: 14, height: 14, borderRadius: '50%', background: U.gold, boxShadow: `0 0 0 7px ${U.goldSoft}`}} />
      KARTU JUDUL
    </div>

    {/* kartu judul: skrip + kapital emas + pita */}
    <div style={{position: 'absolute', left: 60, top: 500, width: 840, display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
      <div style={{fontFamily: UF.script, fontSize: 104, lineHeight: 1, padding: '10px 8px 0', color: U.ivory, textShadow: '0 6px 30px rgba(0,0,0,.5)'}}>Siapkan</div>
      <div style={{fontFamily: UF.big, fontSize: 128, lineHeight: 0.9, whiteSpace: 'nowrap', textTransform: 'uppercase', background: BIG_GRADIENT, backgroundSize: '100% .9em', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', marginTop: -6}}>Umroh Tenang</div>
      <div style={{...RIBBON, fontFamily: UF.script, fontSize: 60, lineHeight: 1, padding: '6px 30px 14px', marginTop: 18}}>dari niat sampai pulang</div>
      <div style={{fontSize: 34, fontWeight: 500, lineHeight: 1.45, color: U.ivory2, marginTop: 30}}>Contoh teks isi: satu gagasan per layar.</div>
    </div>

    {/* ilustrasi */}
    <div style={{position: 'absolute', left: 60, top: 990, width: 840, height: 300, ...CARD, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
      <KoperTiket />
      <div style={{position: 'absolute', right: 30, top: 22, fontSize: 24, fontWeight: 600, color: U.sage}}>contoh</div>
      <div style={{position: 'absolute', left: 0, bottom: 0, width: '62%', height: 8, background: GOLD_LEAF}} />
    </div>

    {/* tombol ajakan */}
    <div style={{position: 'absolute', left: 60, top: 1340, width: 840, display: 'flex', justifyContent: 'center'}}>
      <div style={{...BTN, fontWeight: 800, fontSize: 40, padding: '26px 60px', boxShadow: '0 20px 44px -18px rgba(212,175,106,.6)'}}>
        umroh.h2c.or.id
      </div>
    </div>
  </AbsoluteFill>
);
