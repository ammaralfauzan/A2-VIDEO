import React from 'react';
import {interpolate} from 'remotion';
import {clamp, ease, sp, textIn} from '../components/motion';
import {BTN_GRADIENT, GLASS, HL_GRADIENT, W, WF} from './theme';

// Area aman 9:16: kartu ditengahkan di x 540, lebar 720 (berhenti di x 900, sebelum tombol sosmed),
// dasar kartu di y 1480 (di atas caption/nama akun). Wajah pembicara di y 460–860 tidak boleh tertutup.
export const CARD_BOX = {left: 180, width: 720, bottom: 1480, pad: 48} as const;

// Kartu kaca masuk dengan spring (blur ke tajam, naik), keluar memudar ke atas sebelum kartu berikutnya.
export const GlassCard: React.FC<{f: number; from: number; to: number; children: React.ReactNode}> = ({f, from, to, children}) => {
  if (f < from - 1 || f > to) return null;
  const pIn = sp(f, from, 16);
  const pOut = interpolate(f, [to - 8, to], [0, 1], {...clamp, easing: ease});
  return (
    <div
      style={{
        position: 'absolute',
        left: CARD_BOX.left,
        width: CARD_BOX.width,
        bottom: 1920 - CARD_BOX.bottom,
        boxSizing: 'border-box',
        padding: CARD_BOX.pad,
        borderRadius: 44,
        ...GLASS,
        opacity: interpolate(pIn, [0, 0.4], [0, 1], clamp) * (1 - pOut),
        filter: `blur(${(1 - pIn) * 10 + pOut * 8}px)`,
        transform: `translateY(${(1 - pIn) * 48 - pOut * 28}px) scale(${0.96 + 0.04 * pIn})`,
        transformOrigin: '50% 100%',
      }}
    >
      {children}
    </div>
  );
};

// Label kecil berhuruf kapital renggang dengan garis emas di kedua sisi (.eyebrow).
export const Eyebrow: React.FC<{text: string; style?: React.CSSProperties}> = ({text, style}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 18,
      fontFamily: WF.ui,
      fontWeight: 600,
      fontSize: 26,
      letterSpacing: '0.24em',
      textTransform: 'uppercase',
      color: W.gold,
      ...style,
    }}
  >
    <span style={{width: 56, height: 2, background: `linear-gradient(90deg, transparent, ${W.gold})`}} />
    <span style={{marginRight: '-0.24em'}}>{text}</span>
    <span style={{width: 56, height: 2, background: `linear-gradient(90deg, ${W.gold}, transparent)`}} />
  </div>
);

export type Seg = {t: string; hl?: boolean};

// Judul serif (.h2) dengan kata kunci italic emas (.hl). Tiap baris masuk bergiliran.
export const Title: React.FC<{f: number; at: number; lines: Seg[][]; size?: number; align?: 'left' | 'center'; strike?: number}> = ({
  f,
  at,
  lines,
  size = 64,
  align = 'left',
  strike,
}) => (
  <div style={{fontFamily: WF.serif, fontWeight: 600, fontSize: size, lineHeight: 1.1, letterSpacing: '-0.015em', color: W.cream, textAlign: align}}>
    {lines.map((segs, i) => (
      <div key={i} style={textIn(f, at + i * 4)}>
        {segs.map((s, j) =>
          s.hl ? (
            <span key={j} style={{position: 'relative', display: 'inline-block'}}>
              <span
                style={{
                  fontStyle: 'italic',
                  fontWeight: 500,
                  background: HL_GRADIENT,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  paddingRight: '0.08em',
                }}
              >
                {s.t}
              </span>
              {strike !== undefined ? <Strike f={f} at={strike} /> : null}
            </span>
          ) : (
            <span key={j}>{s.t}</span>
          ),
        )}
      </div>
    ))}
  </div>
);

// Coretan tangan emas yang tergores melintang kata.
const Strike: React.FC<{f: number; at: number}> = ({f, at}) => {
  const p = interpolate(f, [at, at + 9], [0, 1], {...clamp, easing: ease});
  if (p <= 0) return null;
  return (
    <svg viewBox="0 0 100 20" preserveAspectRatio="none" style={{position: 'absolute', left: '-4%', top: '38%', width: '108%', height: '30%', overflow: 'visible'}}>
      <path d="M2 14 C 30 8, 60 12, 98 5" fill="none" stroke={W.gold} strokeWidth={5} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} vectorEffect="non-scaling-stroke" />
    </svg>
  );
};

// Nomor urut bulat italic serif emas (.steps li::before).
export const NumBadge: React.FC<{f: number; at: number; n: number; size?: number}> = ({f, at, n, size = 96}) => {
  const p = sp(f, at, 14);
  return (
    <div
      style={{
        width: size,
        height: size,
        flex: 'none',
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        background: W.goldSoft,
        boxShadow: `inset 0 0 0 2px ${W.goldLine}, 0 0 ${40 * p}px -10px rgba(246, 197, 107, .55)`,
        fontFamily: WF.serif,
        fontStyle: 'italic',
        fontWeight: 500,
        fontSize: size * 0.4,
        color: W.gold,
        opacity: interpolate(p, [0, 0.4], [0, 1], clamp),
        transform: `scale(${0.7 + 0.3 * p})`,
      }}
    >
      {String(n).padStart(2, '0')}
    </div>
  );
};

// Garis pemisah emas tipis yang memanjang dari kiri.
export const Divider: React.FC<{f: number; at: number}> = ({f, at}) => {
  const p = interpolate(f, [at, at + 12], [0, 1], {...clamp, easing: ease});
  return <div style={{height: 2, margin: '34px 0', background: `linear-gradient(90deg, ${W.goldLine}, transparent)`, transform: `scaleX(${p})`, transformOrigin: '0 50%'}} />;
};

// Kotak ikon emas (.icon-badge).
export const IconBadge: React.FC<{size?: number; children: React.ReactNode; glow?: number}> = ({size = 76, children, glow = 0}) => (
  <div
    style={{
      width: size,
      height: size,
      flex: 'none',
      borderRadius: size * 0.3,
      display: 'grid',
      placeItems: 'center',
      background: 'radial-gradient(circle at 30% 25%, rgba(246, 197, 107, .22), rgba(246, 197, 107, .06))',
      boxShadow: `inset 0 0 0 2px rgba(246, 197, 107, ${0.32 + glow * 0.3}), 0 20px 48px -28px rgba(246, 197, 107, .6), 0 0 ${glow * 44}px -6px rgba(246, 197, 107, .55)`,
    }}
  >
    {children}
  </div>
);

// Pil kaca dengan titik emas berpendar (.pill).
export const Pill: React.FC<{text: string; style?: React.CSSProperties; dotPulse?: number}> = ({text, style, dotPulse = 0}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 16,
      padding: '14px 30px',
      borderRadius: 999,
      fontFamily: WF.ui,
      fontWeight: 600,
      fontSize: 30,
      letterSpacing: '0.02em',
      color: W.cream,
      background: 'rgba(10, 28, 17, .82)',
      border: `2px solid ${W.line2}`,
      ...style,
    }}
  >
    <span
      style={{
        width: 14,
        height: 14,
        borderRadius: '50%',
        background: W.gold,
        boxShadow: `0 0 ${20 + dotPulse * 14}px ${4 + dotPulse * 4}px rgba(246, 197, 107, ${0.55 + dotPulse * 0.3})`,
      }}
    />
    {text}
  </div>
);

// Tombol aksen emas (.btn--accent) dengan sapuan kilau ([data-sparkle]).
export const GoldButton: React.FC<{label: string; icon?: React.ReactNode; iconAfter?: boolean; shine: number; style?: React.CSSProperties}> = ({
  label,
  icon,
  iconAfter,
  shine,
  style,
}) => (
  <div
    style={{
      position: 'relative',
      overflow: 'hidden',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 18,
      height: 112,
      padding: '0 56px',
      borderRadius: 999,
      background: BTN_GRADIENT,
      color: W.btnInk,
      fontFamily: WF.ui,
      fontWeight: 600,
      fontSize: 42,
      letterSpacing: '0.01em',
      boxShadow: '0 28px 68px -28px rgba(227, 154, 52, .85), inset 0 2px 0 rgba(255, 255, 255, .55)',
      ...style,
    }}
  >
    {iconAfter ? null : icon}
    {label}
    {iconAfter ? icon : null}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(115deg, transparent 35%, rgba(255, 255, 255, .75) 50%, transparent 65%) no-repeat',
        backgroundSize: '250% 100%',
        backgroundPosition: `${130 - shine * 160}% 0`,
        mixBlendMode: 'soft-light',
        opacity: shine > 0 && shine < 1 ? 1 : 0,
      }}
    />
  </div>
);

// Kilau bintang empat sudut (.spark), berkedip pada fase t (0..1).
// x boleh berupa persen lebar induk (mis. '100%') agar mengikuti lebar tombol.
export const Spark: React.FC<{x: number | string; y: number; s: number; t: number}> = ({x, y, s, t}) => {
  const k = t <= 0 || t >= 1 ? 0 : Math.sin(Math.PI * t);
  return (
    <div
      style={{
        position: 'absolute',
        left: typeof x === 'number' ? x - s / 2 : `calc(${x} - ${s / 2}px)`,
        top: y - s / 2,
        width: s,
        height: s,
        opacity: k,
        transform: `scale(${k}) rotate(${t * 90}deg)`,
        background: 'radial-gradient(circle, #FFFFFF 0%, #FFF1C4 45%, #F6C56B 100%)',
        clipPath: 'polygon(50% 0, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0 50%, 40% 40%)',
        filter: 'drop-shadow(0 0 6px rgba(255, 226, 150, 1))',
      }}
    />
  );
};

// Isi kartu tampil redup sejak kartu masuk (pre), lalu menyala penuh saat katanya diucapkan (at),
// agar kartu tidak pernah kosong menunggu pembicara.
export const reveal = (f: number, at: number, pre: number = at, dy = 18): React.CSSProperties => {
  const pIn = sp(f, Math.min(pre, at), 14);
  const pOn = sp(f, at, 14);
  const dim = pre < at ? 0.32 : 0;
  return {
    opacity: interpolate(pIn, [0, 0.4], [0, 1], clamp) * (dim + (1 - dim) * pOn),
    filter: `blur(${(1 - pIn) * 6}px)`,
    transform: `translateY(${(1 - pIn) * dy}px)`,
  };
};

// Kapsul label dengan centang yang tergores saat dicek (.chip).
export const CheckChip: React.FC<{f: number; at: number; pre?: number; label: string}> = ({f, at, pre, label}) => {
  const tick = interpolate(f, [at + 4, at + 12], [0, 1], {...clamp, easing: ease});
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 26px 14px 16px',
        borderRadius: 999,
        fontFamily: WF.ui,
        fontWeight: 500,
        fontSize: 32,
        color: W.cream,
        background: `rgba(246, 197, 107, ${0.04 + tick * 0.08})`,
        border: `2px solid ${tick > 0.5 ? W.goldLine : W.line2}`,
        ...reveal(f, at, pre, 16),
      }}
    >
      <span
        style={{
          width: 42,
          height: 42,
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          background: tick > 0 ? BTN_GRADIENT : 'transparent',
          boxShadow: `inset 0 0 0 2px ${W.goldLine}`,
          transform: `scale(${0.8 + 0.2 * tick})`,
        }}
      >
        <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={W.btnInk} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 12.5 4.5 4.5L19 7.5" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - tick} />
        </svg>
      </span>
      {label}
    </div>
  );
};

// Ubin ikon di atas judul + keterangan, dipakai berpasangan.
export const Tile: React.FC<{f: number; at: number; pre?: number; icon: React.ReactNode; title: string; note: string}> = ({f, at, pre, icon, title, note}) => {
  const glow = interpolate(f, [at, at + 6, at + 26], [0, 1, 0.25], clamp);
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 18,
        padding: 24,
        borderRadius: 28,
        background: 'rgba(255, 244, 220, .04)',
        border: `2px solid ${W.line}`,
        ...reveal(f, at, pre, 20),
      }}
    >
      <IconBadge size={76} glow={glow}>
        {icon}
      </IconBadge>
      <div>
        <div style={{fontFamily: WF.serif, fontWeight: 600, fontSize: 36, lineHeight: 1.15, color: W.cream}}>{title}</div>
        <div style={{fontFamily: WF.text, fontWeight: 500, fontSize: 24, lineHeight: 1.3, color: W.cream3, marginTop: 4}}>{note}</div>
      </div>
    </div>
  );
};
