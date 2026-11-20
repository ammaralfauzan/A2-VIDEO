import React from 'react';
import {interpolate} from 'remotion';
import {Button} from '../../components/Button';
import {IconBolt, IconChart, IconChat, IconCheck, IconClipboard, IconDoc, IconGear, IconSend, IconTable} from '../../components/Icons';
import {clamp, ease, sp} from '../../components/motion';
import {ef, S, sf} from '../../data/timeline-manual-template-otomatis';
import {color, font, gradient, radius} from '../../theme';
import {FLOW, NODE, nodeLeft, P, PANEL, STEP, stepTop, TASK} from './layout';
import {OUTRO} from './Penutup';

// Tangga tiga tingkat + panel contoh tugas di atasnya. Semua waktu dari timing suara (layout.ts, P).

const NAMES = ['Manual', 'Template', 'Otomatis'];

// Masuk (blur ke tajam, naik 8 px) mulai `at`, opsional memudar mulai `out`. null = belum/tidak terlihat.
const show = (f: number, at: number, out?: number): React.CSSProperties | null => {
  if (f < at) return null;
  const p = interpolate(f, [at, at + 8], [0, 1], {...clamp, easing: ease});
  const o = out === undefined ? 1 : interpolate(f, [out, out + 8], [1, 0], clamp);
  if (o <= 0) return null;
  return {opacity: p * o, filter: `blur(${(1 - p) * 8}px)`, transform: `translateY(${(1 - p) * 8}px)`};
};

// Anak tangga yang menyala: dari ucapan (label), tingkat aktif, lalu pilihan satu tugas dan pertanyaan.
const EVENTS: {f: number; idx: number}[] = (() => {
  const ev: {f: number; idx: number}[] = [];
  for (const k of [0, 1, 2]) ev.push({f: P.label(k), idx: k});
  P.tier.forEach((t, k) => ev.push({f: t, idx: k}));
  ev.push({f: sf(S.tidak) - 2, idx: 0}, {f: P.taskUp(), idx: 1});
  let k = 0;
  for (let t = P.cycle(); t < ef(S.suka) - 40; t += 14) ev.push({f: t, idx: k++ % 3});
  return ev.sort((a, b) => a.f - b.f);
})();

const activeState = (f: number) => {
  let idx = -1;
  let prev = -1;
  let at = -999;
  for (const e of EVENTS) {
    if (e.f > f) break;
    if (e.idx !== idx) {
      prev = idx;
      idx = e.idx;
      at = e.f;
    }
  }
  return {idx, prev, at};
};

const Steps: React.FC<{f: number}> = ({f}) => {
  const st = activeState(f);
  const ramp = interpolate(f, [st.at, st.at + 8], [0, 1], {...clamp, easing: ease});
  return (
    <>
      {[0, 1, 2].map((i) => {
        const p = sp(f, P.stepIn[i], 18);
        if (p <= 0.001) return null;
        const H = STEP.heights[i] * p;
        const amt = i === st.idx ? ramp : i === st.prev ? 1 - ramp : 0;
        const label = show(f, P.label(i));
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: STEP.left + i * STEP.w,
              top: STEP.base - H,
              width: STEP.w,
              height: H,
              boxSizing: 'border-box',
              borderRadius: `${radius.card}px ${radius.card}px 0 0`,
              background: color.surface,
              border: `2px solid ${color.line}`,
              borderBottom: 'none',
              boxShadow: amt > 0.5 ? '0 24px 60px rgba(11,22,48,0.12)' : 'none',
              overflow: 'hidden',
              zIndex: Math.round(amt * 2),
            }}
          >
            <div style={{position: 'absolute', inset: 0, background: gradient, opacity: amt}} />
            {label ? (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  height: 128,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: font.family,
                  color: amt > 0.5 ? color.surface : color.navy,
                  ...label,
                }}
              >
                <div style={{fontSize: 56, fontWeight: 600, lineHeight: 1}}>{i + 1}</div>
                <div style={{fontSize: 30, fontWeight: 500, marginTop: 6}}>{NAMES[i]}</div>
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
};

// ---------- kartu contoh tingkat 1 dan 2 ----------
const CARD = {w: 224, h: 190, gap: 24};
const cardLeft = (k: number) => PANEL.left + k * (CARD.w + CARD.gap);

const CardShell: React.FC<{k: number; style: React.CSSProperties; icon: React.ReactNode; title: string; tag?: React.ReactNode; children?: React.ReactNode}> = ({
  k,
  style,
  icon,
  title,
  tag,
  children,
}) => (
  <div
    style={{
      position: 'absolute',
      left: cardLeft(k),
      top: PANEL.top,
      width: CARD.w,
      height: CARD.h,
      boxSizing: 'border-box',
      padding: 20,
      borderRadius: radius.card,
      background: color.surface,
      border: `2px solid ${color.line}`,
      boxShadow: '0 24px 60px rgba(11,22,48,0.12)',
      fontFamily: font.family,
      ...style,
    }}
  >
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 32}}>
      {icon}
      {tag}
    </div>
    <div style={{marginTop: 10, fontSize: 26, fontWeight: 600, lineHeight: 1.15, color: color.navy, height: 60}}>{title}</div>
    <div style={{position: 'absolute', left: 20, right: 20, bottom: 20}}>{children}</div>
  </div>
);

const Contoh: React.FC = () => <span style={{fontSize: 20, fontWeight: 500, color: color.muted}}>contoh</span>;

const Tier1: React.FC<{f: number}> = ({f}) => {
  const items = [
    {icon: <IconSend />, title: 'Unggah posting'},
    {icon: <IconChat />, title: 'Balas pesan'},
    {icon: <IconTable />, title: 'Salin data'},
  ];
  return (
    <>
      {items.map((it, k) => {
        const st = show(f, P.t1Card(k), P.t1Out());
        if (!st) return null;
        const at = P.t1Card(k);
        return (
          <CardShell key={k} k={k} style={st} icon={it.icon} title={it.title} tag={<Contoh />}>
            {/* kerja berulang: titik terisi satu per satu */}
            <div style={{display: 'flex', gap: 10}}>
              {[0, 1, 2, 3].map((d) => {
                const a = interpolate(f, [at + 16 + d * 9, at + 22 + d * 9], [0, 1], clamp);
                return <div key={d} style={{width: 14, height: 14, borderRadius: 7, background: color.navy, opacity: 0.18 + 0.82 * a}} />;
              })}
            </div>
          </CardShell>
        );
      })}
    </>
  );
};

const ring = (f: number, at: number) => {
  const t = f - at;
  if (t < 0) return {spread: 0, opacity: 0};
  const u = (t % 44) / 44;
  return {spread: 4 + u * 18, opacity: 0.55 * (1 - u)};
};

const Tier2: React.FC<{f: number}> = ({f}) => {
  const items = [
    {icon: <IconTable />, title: 'Kalender konten'},
    {icon: <IconDoc />, title: 'Kerangka caption'},
    {icon: <IconChat />, title: 'Balasan siap pakai'},
  ];
  const short = interpolate(f, [P.t2Short(), P.t2Short() + 12], [0, 1], {...clamp, easing: ease});
  const check = sp(f, P.t2Check(), 14);
  const widths = [100, 100, 66].map((w, i) => w - short * [34, 40, 30][i]);
  const btn = show(f, P.t2Btn(), P.t2Out());
  const press = interpolate(f, [P.t2Press(), P.t2Press() + 4, P.t2Press() + 9], [0, 1, 0], clamp);
  const r = ring(f, P.t2Press() + 4);
  return (
    <>
      {items.map((it, k) => {
        const st = show(f, P.t2Card(k), P.t2Out());
        if (!st) return null;
        return (
          <CardShell
            key={k}
            k={k}
            style={st}
            icon={it.icon}
            tag={
              f >= P.t2Check() ? (
                <span style={{display: 'inline-flex', transform: `scale(${check})`, opacity: check}}>
                  <IconCheck stroke={color.success} />
                </span>
              ) : (
                <Contoh />
              )
            }
            title={it.title}
          >
            <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
              {widths.map((w, i) => (
                <div key={i} style={{height: 8, width: `${w}%`, borderRadius: 4, background: color.line}} />
              ))}
            </div>
          </CardShell>
        );
      })}
      {btn ? (
        <div style={{position: 'absolute', left: PANEL.left, width: PANEL.width, top: PANEL.top + CARD.h + 28, display: 'flex', justifyContent: 'center', ...btn}}>
          <div style={{position: 'relative'}}>
            <div
              style={{
                position: 'absolute',
                inset: -r.spread,
                borderRadius: radius.pill,
                border: `3px solid ${color.blue1}`,
                opacity: r.opacity,
              }}
            />
            <Button label="Kirim" press={press} icon={<IconSend stroke={color.surface} />} />
          </div>
        </div>
      ) : null}
    </>
  );
};

// ---------- tingkat 3: rantai pemicu, aturan, tindakan ----------
const Tier3: React.FC<{f: number}> = ({f}) => {
  const nodes = [
    {label: 'PEMICU', icon: IconBolt},
    {label: 'ATURAN', icon: IconGear},
    {label: 'TINDAKAN', icon: IconSend},
  ];
  const flowOn = f >= P.flowIn() && f < P.flowOut() + 8;
  const at = [P.flowMove(0), P.flowMove(1), P.flowMove(2)];
  const x = (() => {
    const base = nodeLeft(0);
    if (f >= at[1]) return nodeLeft(1) + (nodeLeft(2) - nodeLeft(1)) * interpolate(f, [at[2], at[2] + 14], [0, 1], {...clamp, easing: ease});
    return base + (nodeLeft(1) - base) * interpolate(f, [at[1], at[1] + 14], [0, 1], {...clamp, easing: ease});
  })();
  const fl = show(f, P.flowIn(), P.flowOut());
  const rep = show(f, P.report(), P.t3Out());
  const bars = [30, 52, 40, 70, 86];
  return (
    <>
      {nodes.map((n, k) => {
        const st = show(f, P.node(k), P.t3Out());
        if (!st) return null;
        const startK = k === 0 ? P.flowIn() : at[k];
        const endK = k === 2 ? P.flowOut() : at[k + 1];
        const litAmt = interpolate(f, [startK, startK + 8], [0, 1], {...clamp, easing: ease}) * (1 - interpolate(f, [endK, endK + 8], [0, 1], {...clamp, easing: ease}));
        const lit = litAmt > 0.5;
        const Ico = n.icon;
        return (
          <React.Fragment key={k}>
            <div
              style={{
                position: 'absolute',
                left: nodeLeft(k),
                top: NODE.top,
                width: NODE.w,
                height: NODE.h,
                boxSizing: 'border-box',
                borderRadius: radius.card,
                background: color.surface,
                border: `2px solid ${litAmt > 0.5 ? color.navy : color.line}`,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                fontFamily: font.family,
                fontSize: 26,
                fontWeight: 600,
                letterSpacing: '0.04em',
                color: lit ? color.surface : color.navy,
                ...st,
              }}
            >
              <div style={{position: 'absolute', inset: 0, background: color.navy, opacity: litAmt}} />
              <div style={{position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
                <Ico stroke={lit ? color.surface : color.navy} />
                {n.label}
              </div>
            </div>
            {k < 2 && show(f, P.node(k + 1), P.t3Out()) ? (
              <svg
                width={NODE.gap}
                height={24}
                viewBox="0 0 60 24"
                style={{position: 'absolute', left: nodeLeft(k) + NODE.w, top: NODE.top + NODE.h / 2 - 12, ...show(f, P.node(k + 1), P.t3Out())}}
              >
                <path d="M10 12H48M40 5l8 7-8 7" fill="none" stroke={color.navy} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : null}
          </React.Fragment>
        );
      })}
      {flowOn && fl ? (
        <div
          style={{
            position: 'absolute',
            left: x,
            top: FLOW.top,
            width: FLOW.w,
            height: FLOW.h,
            boxSizing: 'border-box',
            borderRadius: radius.card,
            background: color.surface,
            border: `2px solid ${color.blue1}`,
            boxShadow: '0 24px 60px rgba(11,22,48,0.12)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: font.family,
            ...fl,
          }}
        >
          <div style={{fontSize: 24, fontWeight: 600, color: color.navy}}>Formulir masuk</div>
          <div style={{fontSize: 20, fontWeight: 500, color: color.muted}}>contoh</div>
        </div>
      ) : null}
      {[0, 1].map((k) => {
        const st = show(f, P.chip(k), P.flowOut());
        if (!st) return null;
        return (
          <div
            key={k}
            style={{
              position: 'absolute',
              left: nodeLeft(k + 1),
              top: FLOW.top + FLOW.h + 14,
              width: NODE.w,
              display: 'flex',
              justifyContent: 'center',
              ...st,
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                height: 40,
                padding: '0 18px',
                borderRadius: radius.pill,
                border: `2px solid ${color.success}`,
                background: color.surface,
                fontFamily: font.family,
                fontSize: 22,
                fontWeight: 600,
                color: color.success,
              }}
            >
              <IconCheck size={22} stroke={color.success} />
              {k === 0 ? 'Tercatat' : 'Terkirim'}
            </div>
          </div>
        );
      })}
      {rep ? (
        <div
          style={{
            position: 'absolute',
            left: PANEL.left,
            top: FLOW.top,
            width: PANEL.width,
            height: 118,
            boxSizing: 'border-box',
            padding: '0 28px',
            borderRadius: radius.card,
            background: color.surface,
            border: `2px solid ${color.line}`,
            boxShadow: '0 24px 60px rgba(11,22,48,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: font.family,
            ...rep,
          }}
        >
          <div>
            <div style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 30, fontWeight: 600, color: color.navy}}>
              <IconChart />
              Laporan mingguan
            </div>
            <div style={{marginTop: 4, marginLeft: 36, fontSize: 20, fontWeight: 500, color: color.muted}}>contoh</div>
          </div>
          <div style={{display: 'flex', alignItems: 'flex-end', gap: 14, height: 90}}>
            {bars.map((h, i) => {
              const g = interpolate(f, [P.report() + 6 + i * 8, P.report() + 18 + i * 8], [0, 1], {...clamp, easing: ease});
              return <div key={i} style={{width: 28, height: h * g, borderRadius: 6, background: color.blue1}} />;
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};

// ---------- pilih satu tugas, naik satu tingkat ----------
const Tugas: React.FC<{f: number}> = ({f}) => {
  const st = show(f, P.task(), P.taskOut());
  if (!st) return null;
  const u = interpolate(f, [P.taskUp(), P.taskUp() + 16], [0, 1], {...clamp, easing: ease});
  const x = STEP.left + 4 + u * STEP.w;
  const y = TASK.tops[0] + (TASK.tops[1] - TASK.tops[0]) * u;
  const arrow = show(f, P.taskArrow(), P.taskOut());
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: TASK.w,
          height: TASK.h,
          boxSizing: 'border-box',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          borderRadius: radius.card,
          background: color.surface,
          border: `2px solid ${color.blue1}`,
          boxShadow: '0 24px 60px rgba(11,22,48,0.12)',
          fontFamily: font.family,
          fontSize: 24,
          fontWeight: 600,
          lineHeight: 1.12,
          color: color.navy,
          ...st,
        }}
      >
        <IconClipboard />
        <span>Satu tugas berulang</span>
      </div>
      {arrow ? (
        <svg width={36} height={44} viewBox="0 0 36 44" style={{position: 'absolute', left: x + TASK.w / 2 - 18, top: y - 56, ...arrow}}>
          <path d="M18 40V8M7 19l11-11 11 11" fill="none" stroke={color.blue1} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </>
  );
};

// ---------- ajakan komentar ----------
const Komentar: React.FC<{f: number}> = ({f}) => {
  const st = show(f, P.compose());
  if (!st) return null;
  const bub = sp(f, P.bubble(), 14);
  const caret = Math.floor(f / 15) % 2 === 0 ? 1 : 0.15;
  return (
    <div
      style={{
        position: 'absolute',
        left: 240,
        top: PANEL.top,
        width: 600,
        height: 190,
        boxSizing: 'border-box',
        padding: '28px 32px',
        borderRadius: radius.card,
        background: color.surface,
        border: `2px solid ${color.line}`,
        boxShadow: '0 24px 60px rgba(11,22,48,0.12)',
        fontFamily: font.family,
        ...st,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 44}}>
        <div style={{width: 40, height: 40, borderRadius: 20, border: `2px solid ${color.navy}`, boxSizing: 'border-box', background: color.canvas}} />
        <span style={{display: 'inline-flex', opacity: bub, transform: `scale(${0.8 + 0.2 * bub})`}}>
          <IconChat size={40} stroke={color.blue2} />
        </span>
      </div>
      <div style={{marginTop: 14, fontSize: 32, fontWeight: 500, color: color.navy, lineHeight: 1.3}}>
        <div>
          Tugasku: <span style={{color: color.muted}}>…</span>
        </div>
        <div>
          Tingkat: <span style={{color: color.muted}}>…</span>
          <span style={{display: 'inline-block', width: 3, height: 30, marginLeft: 8, verticalAlign: 'middle', background: color.navy, opacity: caret}} />
        </div>
      </div>
    </div>
  );
};

export const Tangga: React.FC<{f: number}> = ({f}) => {
  const out = interpolate(f, [OUTRO.start - 10, OUTRO.start], [1, 0], clamp);
  if (out <= 0) return null;
  void stepTop;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: out}}>
      <Steps f={f} />
      <Tier1 f={f} />
      <Tier2 f={f} />
      <Tier3 f={f} />
      <Tugas f={f} />
      <Komentar f={f} />
    </div>
  );
};
