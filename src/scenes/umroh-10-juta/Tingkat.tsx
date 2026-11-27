import React from 'react';
import {interpolate} from 'remotion';
import {CARD, U, UF} from '../../brands/h2c-umroh/theme';
import {clamp, ease} from '../../components/motion';
import {big} from './Hook';
import {TIER_COLOR} from './Undian';
import {inP, win} from './anim';
import {P, TIERS} from './layout';

// Empat undian: deret tab tingkat di atas (y 300-420), kartu besar di bawahnya (y 470-1040).
// Tiap tingkat menyala tepat saat disebut: baris "Tabung Rp..." lalu "Menang: umroh Rp...".
// Diamond terakhir: bingkai emas penuh dan angka berdenyut.
export const Tingkat: React.FC<{f: number}> = ({f}) => {
  const v = win(f, P.tiers, 12, 10);
  if (v <= 0.001) return null;
  const active = P.tierOn.reduce((acc, at, i) => (f >= at ? i : acc), -1);
  const cardIn = inP(f, P.tiers[0] + 10, 16);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: v}}>
      {TIERS.map((t, i) => {
        const p = interpolate(f, [P.tiers[0] + i * 5, P.tiers[0] + i * 5 + 14], [0, 1], {...clamp, easing: ease});
        const on = inP(f, P.tierOn[i], 8) * (1 - (i < 3 ? inP(f, P.tierOn[i + 1], 8) : 0));
        const done = i < active ? 1 : 0;
        return (
          <div
            key={t.name}
            style={{
              position: 'absolute',
              left: 180 + i * 185,
              top: 250,
              width: 165,
              height: 140,
              borderRadius: 26,
              boxSizing: 'border-box',
              background: on > 0.5 ? U.surface2 : U.surface,
              border: `3px solid ${on > 0.05 ? TIER_COLOR[i] : U.goldLine}`,
              boxShadow: `0 0 0 ${8 * on}px rgba(212,175,106,${0.16 * on})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              opacity: p * (0.55 + 0.45 * Math.max(on, done)),
              transform: `translateY(${(1 - p) * 40 - 8 * on}px) scale(${1 + 0.05 * on})`,
            }}
          >
            <div style={{fontFamily: UF.text, fontWeight: 700, fontSize: 21, color: TIER_COLOR[i], letterSpacing: 0.5}}>{t.name.toUpperCase()}</div>
            <div style={{fontFamily: UF.display, fontSize: 40, color: U.ivory, lineHeight: 1}}>{t.dpShort}</div>
          </div>
        );
      })}
      {/* kartu besar */}
      <div style={{position: 'absolute', left: 180, top: 430, width: 720, height: 830, opacity: cardIn, transform: `translateY(${(1 - cardIn) * 60}px)`}}>
        <Kartu f={f} active={active} />
      </div>
    </div>
  );
};

const Kartu: React.FC<{f: number; active: number}> = ({f, active}) => {
  const dia = active === 3 ? inP(f, P.tierOn[3], 14) : 0;
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        ...CARD,
        border: `${3 + 5 * dia}px solid ${active >= 0 ? TIER_COLOR[active] : U.goldLine}`,
        boxShadow: `0 40px 100px -40px rgba(0,0,0,.6), 0 0 ${60 * dia}px rgba(212,175,106,${0.35 * dia})`,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {active < 0 ? <Pembuka f={f} /> : null}
      {TIERS.map((t, i) => {
        if (i !== active && i !== active - 1) return null;
        // isi lama keluar ke kiri, isi baru masuk dari kanan (pudar silang 10 frame)
        // isi lama habis dulu (8 frame sebelum tingkat baru), baru isi baru masuk: tidak ada teks bertumpuk
        const pin = inP(f, P.tierOn[i], 10);
        const pout = i < 3 ? inP(f, P.tierOn[i + 1] - 8, 8) : 0;
        if (pout >= 1) return null;
        return (
          <div key={t.name} style={{position: 'absolute', inset: 0, opacity: pin * (1 - pout), transform: `translateX(${(1 - pin) * 60 - pout * 60}px)`}}>
            <Isi f={f} i={i} />
          </div>
        );
      })}
    </div>
  );
};

const Pembuka: React.FC<{f: number}> = ({f}) => {
  const p = inP(f, P.tiers[0] + 18, 14);
  const out = 1 - inP(f, P.tierOn[0], 8);
  return (
    <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: p * out}}>
      <div style={{fontFamily: UF.script, fontSize: 100, color: U.goldLight, lineHeight: 1}}>Empat</div>
      <div style={{...big, fontSize: 180}}>Undian</div>
      <div style={{fontFamily: UF.text, fontWeight: 600, fontSize: 38, color: U.ivory2, marginTop: 26}}>sesuai tabunganmu</div>
    </div>
  );
};

const Isi: React.FC<{f: number; i: number}> = ({f, i}) => {
  const t = TIERS[i];
  const dp = inP(f, P.tierDp[i], 10);
  const w = inP(f, P.tierWin[i], 10);
  const pulse = i === 3 ? 1 + 0.08 * interpolate(f, [P.diamondPulse, P.diamondPulse + 6, P.diamondPulse + 16, P.diamondPulse + 22, P.diamondPulse + 30], [0, 1, 0, 0.6, 0], clamp) : 1;
  return (
    <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{fontFamily: UF.text, fontWeight: 700, fontSize: 28, color: U.sage, letterSpacing: 3}}>UNDIAN</div>
      <div style={{...big, fontSize: 150, marginTop: 6}}>{t.name}</div>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 16, marginTop: 56, opacity: dp, transform: `translateY(${(1 - dp) * 16}px)`}}>
        <span style={{fontFamily: UF.text, fontWeight: 700, fontSize: 36, color: U.sage}}>Tabung</span>
        <span style={{fontFamily: UF.display, fontSize: 76, color: U.ivory, lineHeight: 1}}>{t.dp}</span>
      </div>
      <div style={{width: 520, height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${U.gold}, ${U.leaf})`, marginTop: 50, opacity: 0.6 * dp, transform: `scaleX(${dp})`}} />
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 46, opacity: w, transform: `translateY(${(1 - w) * 16}px)`}}>
        <span style={{fontFamily: UF.text, fontWeight: 700, fontSize: 36, color: U.goldLight}}>Menang: umroh cukup</span>
        <span style={{fontFamily: UF.display, fontSize: 104, color: U.goldLight, lineHeight: 1.15, transform: `scale(${pulse})`, display: 'inline-block'}}>{t.win}</span>
      </div>
    </div>
  );
};
