import React from 'react';
import {interpolate} from 'remotion';
import {clamp, ease, sp, textIn} from '../components/motion';
import {IcBook, IcCalendar, IcChat, IcCheck, IcHotel, IcPlane, IcReceipt, IcUsers} from './Icons';
import {CheckChip, Divider, Eyebrow, GlassCard, GoldButton, NumBadge, Pill, reveal, Spark, Tile, Title, type Seg} from './parts';
import {BTN_GRADIENT, W, WF} from './theme';
import {BEAT, CARD, POINT_ENDS, POINT_STARTS} from './timeline';

// ---------- Hook: "Sebelum daftar umroh, jangan cuma lihat harganya aja." ----------
export const Hook: React.FC<{f: number}> = ({f}) => (
  <GlassCard f={f} from={CARD.hook} to={CARD.p1}>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30}}>
      <div style={textIn(f, CARD.hook + 2)}>
        <Eyebrow text="Tips umroh" />
      </div>
      <Title
        f={f}
        at={CARD.hook + 6}
        size={76}
        align="center"
        lines={[[{t: 'Jangan cuma lihat'}], [{t: 'harganya', hl: true}]]}
        strike={BEAT.strike}
      />
      <div style={{...textIn(f, BEAT.fiveTips), marginTop: 6}}>
        <Pill text="Cek 5 hal ini dulu" dotPulse={pulse(f, BEAT.fiveTips)} />
      </div>
    </div>
  </GlassCard>
);

const pulse = (f: number, at: number) => (f < at ? 0 : 0.5 + 0.5 * Math.sin(((f - at) / 30) * Math.PI * 2));

// ---------- Kerangka kartu poin: nomor, judul, garis, ilustrasi ----------
const PointCard: React.FC<{f: number; i: number; lines: Seg[][]; children: React.ReactNode}> = ({f, i, lines, children}) => {
  const from = POINT_STARTS[i];
  return (
    <GlassCard f={f} from={from} to={POINT_ENDS[i]}>
      <div style={{display: 'flex', alignItems: 'center', gap: 30}}>
        <NumBadge f={f} at={from + 2} n={i + 1} />
        <Title f={f} at={from + 4} lines={lines} />
      </div>
      <Divider f={f} at={from + 8} />
      {children}
    </GlassCard>
  );
};

// 1. Tanggal & durasi: deret hari, rentang emas dari berangkat sampai pulang.
const DAYS = 7;
const CELL = 72;
const GAP = (624 - DAYS * CELL) / (DAYS - 1);
const LAST = 5; // sel "pulang"
export const Point1: React.FC<{f: number}> = ({f}) => {
  const start = sp(f, BEAT.tanggal, 14);
  const range = interpolate(f, [BEAT.durasi, BEAT.durasi + 22], [0, 1], {...clamp, easing: ease});
  const reach = range * LAST; // sel terjauh yang sudah tercakup
  const x = (k: number) => k * (CELL + GAP);
  return (
    <PointCard f={f} i={0} lines={[[{t: 'Tanggal & '}, {t: 'durasi', hl: true}], [{t: 'keberangkatan'}]]}>
      <div style={{position: 'relative', height: CELL + 58, ...textIn(f, POINT_STARTS[0] + 10)}}>
        {/* pita rentang di belakang sel */}
        <div
          style={{
            position: 'absolute',
            left: x(0),
            top: 0,
            height: CELL,
            width: CELL + x(reach),
            borderRadius: 22,
            background: W.goldSoft,
            boxShadow: `inset 0 0 0 2px ${W.goldLine}`,
            opacity: range > 0 ? 1 : 0,
          }}
        />
        {Array.from({length: DAYS}, (_, k) => {
          const isEnd = (k === 0 && start > 0.01) || (k === LAST && range >= 1);
          const inRange = k <= reach + 0.01 && range > 0;
          return (
            <div
              key={k}
              style={{
                position: 'absolute',
                left: x(k),
                top: 0,
                width: CELL,
                height: CELL,
                borderRadius: 22,
                display: 'grid',
                placeItems: 'center',
                background: isEnd ? BTN_GRADIENT : 'rgba(255, 244, 220, .04)',
                border: `2px solid ${isEnd ? 'transparent' : inRange ? 'transparent' : W.line}`,
                boxSizing: 'border-box',
                transform: `scale(${k === 0 ? 0.85 + 0.15 * start : 1})`,
                boxShadow: isEnd ? '0 14px 34px -14px rgba(227, 154, 52, .85)' : undefined,
              }}
            >
              {isEnd ? (
                k === 0 ? <IcCalendar size={36} stroke={W.btnInk} strokeWidth={2} /> : <IcCheck size={36} stroke={W.btnInk} strokeWidth={2.4} />
              ) : (
                <span style={{width: 10, height: 10, borderRadius: '50%', background: inRange ? W.gold : W.cream3, opacity: inRange ? 0.9 : 0.5}} />
              )}
            </div>
          );
        })}
        <Label f={f} at={BEAT.tanggal + 4} left={x(0)} text="Berangkat" />
        <Label f={f} at={BEAT.durasi + 20} left={x(LAST) + CELL} text="Pulang" alignRight />
        <Label f={f} at={BEAT.durasi + 10} left={(x(0) + x(LAST) + CELL) / 2} text="durasi" center italic />
      </div>
    </PointCard>
  );
};

const Label: React.FC<{f: number; at: number; left: number; text: string; alignRight?: boolean; center?: boolean; italic?: boolean}> = ({
  f,
  at,
  left,
  text,
  alignRight,
  center,
  italic,
}) => (
  <div
    style={{
      position: 'absolute',
      top: CELL + 16,
      left,
      transform: alignRight ? 'translateX(-100%)' : center ? 'translateX(-50%)' : undefined,
      fontFamily: italic ? WF.serif : WF.ui,
      fontStyle: italic ? 'italic' : 'normal',
      fontWeight: 500,
      fontSize: italic ? 32 : 28,
      color: italic ? W.gold : W.cream2,
      whiteSpace: 'nowrap',
    }}
  >
    <div style={textIn(f, at)}>{text}</div>
  </div>
);

// 2. Hotel & maskapai.
export const Point2: React.FC<{f: number}> = ({f}) => (
  <PointCard f={f} i={1} lines={[[{t: 'Tanya '}, {t: 'hotel', hl: true}], [{t: '& '}, {t: 'maskapai', hl: true}]]}>
    <div style={{display: 'flex', gap: 18}}>
      <Tile f={f} at={BEAT.hotel} pre={POINT_STARTS[1] + 12} icon={<IcHotel size={40} />} title="Hotel" note="Lokasi & kelasnya" />
      <Tile f={f} at={BEAT.maskapai} pre={POINT_STARTS[1] + 14} icon={<IcPlane size={40} />} title="Maskapai" note="Langsung atau transit" />
    </div>
  </PointCard>
);

// 3. Fasilitas yang sudah termasuk: centang satu per satu.
const FASILITAS = [
  ['Visa', 'Makan'],
  ['Transportasi', 'Perlengkapan'],
];
export const Point3: React.FC<{f: number}> = ({f}) => (
  <PointCard f={f} i={2} lines={[[{t: 'Fasilitas yang'}], [{t: 'sudah termasuk', hl: true}]]}>
    <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
      {FASILITAS.map((row, r) => (
        <div key={r} style={{display: 'flex', gap: 16}}>
          {row.map((label, c) => (
            <CheckChip key={label} f={f} at={BEAT.fasilitas + (r * 2 + c) * 7} pre={POINT_STARTS[2] + 12 + (r * 2 + c) * 2} label={label} />
          ))}
        </div>
      ))}
    </div>
  </PointCard>
);

// 4. Biaya tambahan: rincian dengan baris "?" yang berdenyut.
export const Point4: React.FC<{f: number}> = ({f}) => {
  const q = f < BEAT.kemungkinan ? 0 : pulse(f, BEAT.kemungkinan);
  return (
    <PointCard f={f} i={3} lines={[[{t: 'Kemungkinan'}], [{t: 'biaya tambahan', hl: true}]]}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
        <BillRow f={f} at={BEAT.paket} pre={POINT_STARTS[3] + 12} icon={<IcReceipt size={34} stroke={W.cream2} />} label="Harga paket" end={<IcCheck size={34} stroke={W.gold} strokeWidth={2.4} />} />
        <BillRow
          f={f}
          at={BEAT.tambahan}
          pre={POINT_STARTS[3] + 14}
          gold
          icon={<span style={{fontFamily: WF.ui, fontWeight: 600, fontSize: 38, color: W.gold, lineHeight: 1}}>+</span>}
          label="Biaya tambahan"
          end={
            <span
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                background: BTN_GRADIENT,
                color: W.btnInk,
                fontFamily: WF.ui,
                fontWeight: 600,
                fontSize: 32,
                transform: `scale(${1 + q * 0.12})`,
                boxShadow: `0 0 ${18 + q * 26}px -4px rgba(246, 197, 107, ${0.5 + q * 0.4})`,
              }}
            >
              ?
            </span>
          }
        />
      </div>
    </PointCard>
  );
};

const BillRow: React.FC<{f: number; at: number; pre?: number; icon: React.ReactNode; label: string; end: React.ReactNode; gold?: boolean}> = ({
  f,
  at,
  pre,
  icon,
  label,
  end,
  gold,
}) => {
  const lead = interpolate(f, [at + 2, at + 14], [0, 1], {...clamp, easing: ease});
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        height: 84,
        padding: '0 22px',
        borderRadius: 24,
        background: gold ? W.goldSoft : 'rgba(255, 244, 220, .04)',
        border: `2px solid ${gold ? W.goldLine : W.line}`,
        ...reveal(f, at, pre),
      }}
    >
      <span style={{width: 40, display: 'grid', placeItems: 'center'}}>{icon}</span>
      <span
        style={{
          fontFamily: gold ? WF.serif : WF.ui,
          fontStyle: gold ? 'italic' : 'normal',
          fontWeight: 500,
          fontSize: gold ? 38 : 34,
          color: gold ? W.gold : W.cream,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
      {/* garis titik penghubung ke ujung kanan */}
      <span style={{flex: 1, height: 0, borderTop: `3px dotted ${gold ? W.goldLine : W.line2}`, transform: `scaleX(${lead})`, transformOrigin: '0 50%'}} />
      <span style={{opacity: lead}}>{end}</span>
    </div>
  );
};

// 5. Manasik & pendampingan.
export const Point5: React.FC<{f: number}> = ({f}) => (
  <PointCard f={f} i={4} lines={[[{t: 'Manasik &'}], [{t: 'pendampingan', hl: true}]]}>
    <div style={{display: 'flex', gap: 18}}>
      <Tile f={f} at={BEAT.manasik} pre={POINT_STARTS[4] + 12} icon={<IcBook size={40} />} title="Manasik" note="Bekal tata cara ibadah" />
      <Tile f={f} at={BEAT.pendampingan} pre={POINT_STARTS[4] + 14} icon={<IcUsers size={40} />} title="Pendamping" note="Selama perjalanan" />
    </div>
  </PointCard>
);

// ---------- Ajakan: "Untuk informasi lebih lanjut, hubungi tim kami sekarang juga." ----------
export const Cta: React.FC<{f: number}> = ({f}) => {
  const btnAt = BEAT.hubungi - 6;
  const pb = sp(f, btnAt, 16);
  const shine = interpolate((f - btnAt - 12) % 45, [0, 24], [0, 1], clamp) * (f > btnAt + 12 ? 1 : 0);
  const sparkT = (d: number) => ((f - btnAt - 8 - d) % 40) / 40;
  return (
    <GlassCard f={f} from={CARD.cta} to={CARD.end + 20}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30}}>
        <div style={textIn(f, CARD.cta + 2)}>
          <Eyebrow text="Info lebih lanjut" />
        </div>
        <Title f={f} at={CARD.cta + 6} size={76} align="center" lines={[[{t: 'Hubungi '}, {t: 'tim kami', hl: true}]]} />
        <div
          style={{
            position: 'relative',
            marginTop: 8,
            opacity: interpolate(pb, [0, 0.4], [0, 1], clamp),
            filter: `blur(${(1 - pb) * 8}px)`,
            transform: `translateY(${(1 - pb) * 20}px) scale(${0.9 + 0.1 * pb})`,
          }}
        >
          <GoldButton label="Hubungi Sekarang" icon={<IcChat size={46} stroke={W.btnInk} strokeWidth={2} />} shine={shine} />
          {f > btnAt + 8 ? (
            <>
              <Spark x={-14} y={6} s={34} t={sparkT(0)} />
              <Spark x={540} y={-8} s={28} t={sparkT(14)} />
              <Spark x={500} y={118} s={22} t={sparkT(26)} />
            </>
          ) : null}
        </div>
      </div>
    </GlassCard>
  );
};

// ---------- Strip atas: pil judul seri + 5 segmen progres (seperti indikator slide di hero situs) ----------
export const TopProgress: React.FC<{f: number}> = ({f}) => {
  const at = CARD.p1 - 2;
  if (f < at) return null;
  const done = f >= CARD.cta;
  return (
    <div style={{position: 'absolute', top: 236, left: 180, width: 720, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, ...textIn(f, at)}}>
      <Pill text={done ? 'Sudah dicek semua' : 'Cek sebelum daftar umroh'} dotPulse={done ? pulse(f, CARD.cta) : 0} />
      <div style={{display: 'flex', gap: 12}}>
        {POINT_STARTS.map((s, i) => {
          const p = interpolate(f, [s, POINT_ENDS[i] - 4], [0, 1], clamp);
          const active = f >= s && f < POINT_ENDS[i];
          return (
            <div key={i} style={{width: 64, height: 8, borderRadius: 8, background: 'rgba(247, 239, 221, .28)', overflow: 'hidden', transform: `scaleY(${active ? 1.25 : 1})`}}>
              <div style={{width: `${p * 100}%`, height: '100%', background: BTN_GRADIENT, boxShadow: '0 0 12px rgba(246, 197, 107, .7)'}} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
