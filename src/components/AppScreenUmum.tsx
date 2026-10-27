import React from 'react';
import {interpolate} from 'remotion';
import {APP} from '../data/timeline';
import {chartPoint, U_CHART, U_CLICK_LIST, U_CLICKS, U_CONTENT, U_CURSOR_PATH, U_DRAG_LIST, U_DRAGS, U_SEG} from '../data/timeline-a2-umum';
import {color, font, gradient, radius} from '../theme';
import {Card, Header, Row, Sidebar, Status, Tab} from './AppUI';
import {Button} from './Button';
import {Chart} from './Chart';
import {positionAt, pressAt} from './Cursor';
import {IconBolt, IconChart, IconCheck, IconGear, IconHome, IconInbox, IconReceipt} from './Icons';
import {clamp, ease, fadeOut, sp, textIn} from './motion';
import {Toggle} from './Toggle';
import {Window} from './Window';

// Dashboard "A2 Automation" untuk video umum. Satu jendela dari titik balik sampai empati.

export const UT = {
  bloom: 296,
  morph: U_CLICKS.otomatiskan + 3,
  check: U_CLICKS.otomatiskan + 18,
  rowsAuto: U_CLICKS.otomatiskan + 22,
  homeOut: U_CLICKS.navInbox + 2,
  inboxIn: U_CLICKS.navInbox + 8,
  replyFrom: 398,
  replyStep: 12,
  countFrom: 394,
  countTo: 452,
  inboxOut: U_CLICKS.navTagihan + 2,
  tagihanIn: U_CLICKS.navTagihan + 8,
  island: U_DRAGS.toggle.to + 3,
  islandEnd: 538,
  tagihanOut: U_CLICKS.navLaporan + 2,
  laporanIn: U_CLICKS.navLaporan + 8,
  chartFrom: 558,
  chartTo: 590,
  tooltip: [588, 620] as [number, number],
  laporanOut: U_CLICKS.navBeranda + 2,
  ringkasanIn: U_CLICKS.navBeranda + 8,
  recede: 709,
};

const press = (f: number) => pressAt(f, U_CLICK_LIST, U_DRAG_LIST);

const inboxCount = (f: number) => Math.round(97 * (1 - interpolate(f, [UT.countFrom, UT.countTo], [0, 1], {...clamp, easing: ease})));

const CountBadge: React.FC<{n: number; big?: boolean}> = ({n, big}) => (
  <div
    style={{
      minWidth: big ? 56 : 40,
      height: big ? 40 : 32,
      padding: '0 12px',
      borderRadius: radius.pill,
      background: n > 0 ? color.navy : color.success,
      color: color.surface,
      fontSize: font.label,
      fontWeight: 600,
      fontVariantNumeric: 'tabular-nums',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
    }}
  >
    {n > 0 ? n : <IconCheck size={20} stroke={color.surface} strokeWidth={2.5} />}
  </div>
);

const tabs = (f: number): Tab[] => [
  {label: 'Beranda', Icon: IconHome},
  {label: 'Pesan', Icon: IconInbox, badge: f >= UT.bloom ? <CountBadge n={inboxCount(f)} /> : null},
  {label: 'Tagihan', Icon: IconReceipt},
  {label: 'Laporan', Icon: IconChart},
];
const TAB_SWITCH = [
  {f: 0, i: 0},
  {f: U_CLICKS.navInbox + 2, i: 1},
  {f: U_CLICKS.navTagihan + 2, i: 2},
  {f: U_CLICKS.navLaporan + 2, i: 3},
  {f: U_CLICKS.navBeranda + 2, i: 0},
];

// ---------- Beranda: tombol Otomatiskan berubah jadi gear lalu centang ----------
const AutomateButton: React.FC<{f: number}> = ({f}) => {
  const m = sp(f, UT.morph, 12);
  const c = sp(f, UT.check, 10);
  const w = 280 - (280 - 72) * m;
  const p = f < UT.morph ? press(f) : 0;
  const spin = Math.max(0, f - UT.morph) * 14;
  // Pusat tombol tetap di bawah kursor (U_TARGET.otomatiskan).
  return (
    <div
      style={{
        position: 'absolute',
        left: 1452 - U_CONTENT.x - w / 2,
        bottom: 0,
        width: w,
        height: 72,
        borderRadius: radius.pill,
        background: color.navy,
        transform: `scale(${1 - p * 0.04})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          opacity: interpolate(m, [0, 0.4], [1, 0], clamp),
          fontFamily: font.family,
          fontWeight: 600,
          fontSize: font.ui,
          color: color.surface,
          whiteSpace: 'nowrap',
        }}
      >
        <IconBolt size={26} stroke={color.surface} />
        Otomatiskan
      </div>
      <div style={{position: 'absolute', opacity: interpolate(m, [0.5, 1], [0, 1], clamp) * (1 - c), transform: `rotate(${spin}deg) scale(${1 - 0.4 * c})`}}>
        <IconGear size={36} stroke={color.surface} />
      </div>
      <div style={{position: 'absolute', opacity: c, transform: `scale(${0.6 + 0.4 * c})`}}>
        <IconCheck size={36} stroke={color.surface} strokeWidth={2.5} />
      </div>
    </div>
  );
};

const HomePanel: React.FC<{f: number}> = ({f}) => (
  <div style={{position: 'absolute', inset: 0}}>
    <Header f={f} start={UT.bloom + 4} title="Selamat malam" sub="Usaha Anda · 3 pekerjaan berulang" />
    <Card top={110} style={{paddingTop: 16, paddingBottom: 16}}>
      {['Balas chat pelanggan', 'Kirim tagihan dan pengingat', 'Susun laporan harian'].map((t, i) => (
        <Row key={t} last={i === 2}>
          <span style={{fontSize: font.ui}}>{t}</span>
          {f >= UT.rowsAuto + i * 4 ? <Status done doneText="Otomatis" p={sp(f, UT.rowsAuto + i * 4, 8)} /> : <span style={{color: color.muted}}>Manual</span>}
        </Row>
      ))}
    </Card>
    <AutomateButton f={f} />
  </div>
);

// ---------- Kotak Masuk ----------
const CHATS = [
  {who: 'Rina', msg: 'Kak, pesanan saya sudah dikirim?', tag: 'Pesanan'},
  {who: 'Budi', msg: 'Harga paket bulanan berapa ya?', tag: 'Tanya harga'},
  {who: 'Klinik Sehat', msg: 'Mohon kirim ulang invoice Oktober.', tag: 'Tagihan'},
  {who: 'Sari', msg: 'Jadwal konsultasi besok bisa?', tag: 'Jadwal'},
  {who: 'Andi', msg: 'Barang sudah sampai, terima kasih.', tag: 'Ulasan'},
];

const Chip: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <span style={{padding: '4px 14px', borderRadius: radius.pill, background: color.canvas, border: `1px solid ${color.line}`, color: color.navy, fontSize: font.label, ...style}}>
    {children}
  </span>
);

const InboxPanel: React.FC<{f: number}> = ({f}) => (
  <div style={{position: 'absolute', inset: 0}}>
    <Header f={f} start={UT.inboxIn} title="Pesan Pelanggan" sub="Dibalas dan diberi label otomatis" right={<CountBadge n={inboxCount(f)} big />} />
    <Card top={100} style={{paddingTop: 8, paddingBottom: 8, ...textIn(f, UT.inboxIn + 2)}}>
      {CHATS.map((c, i) => {
        const at = UT.replyFrom + i * UT.replyStep;
        const done = f >= at;
        const p = sp(f, at, 8);
        return (
          <Row key={c.who} last={i === CHATS.length - 1} height={84}>
            <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  border: `1px solid ${color.line}`,
                  background: color.canvas,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                }}
              >
                {c.who[0]}
              </div>
              <div style={{lineHeight: 1.25}}>
                <div style={{fontWeight: 600}}>{c.who}</div>
                <div style={{color: color.muted}}>{c.msg}</div>
              </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
              {done ? <Chip style={{opacity: p, transform: `translateX(${(1 - p) * 8}px)`}}>{c.tag}</Chip> : null}
              <div style={{width: 150, display: 'flex', justifyContent: 'flex-end'}}>
                <Status done={done} p={p} doneText="Dibalas" waitText="Belum dibalas" />
              </div>
            </div>
          </Row>
        );
      })}
    </Card>
  </div>
);

// ---------- Tagihan ----------
const INVOICES = [
  ['INV-2026-1041', 'Toko Sinar Jaya'],
  ['INV-2026-1042', 'Klinik Sehat Utama'],
  ['INV-2026-1043', 'CV Maju Bersama'],
];

const TagihanPanel: React.FC<{f: number}> = ({f}) => {
  const on = interpolate(f, [U_DRAGS.toggle.from, U_DRAGS.toggle.to], [0, 1], {...clamp, easing: ease});
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <Header f={f} start={UT.tagihanIn} title="Tagihan dan Pengingat" sub="Untuk semua pelanggan aktif" />
      <Card top={100} style={textIn(f, UT.tagihanIn + 2)}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <div style={{fontSize: font.ui, fontWeight: 500, color: color.navy}}>Pengingat tagihan otomatis</div>
            <div style={{fontSize: font.label, color: color.muted, marginTop: 6}}>Dikirim 3 hari sebelum jatuh tempo</div>
          </div>
          <Toggle progress={on} />
        </div>
      </Card>
      <Card top={268} style={{paddingTop: 16, paddingBottom: 16, ...textIn(f, UT.tagihanIn + 4)}}>
        {INVOICES.map(([no, who], i) => {
          const at = UT.island + 2 + i * 6;
          return (
            <Row key={no} last={i === INVOICES.length - 1}>
              <span>
                <span style={{fontWeight: 600, fontVariantNumeric: 'tabular-nums'}}>{no}</span>
                <span style={{color: color.muted}}> · {who}</span>
              </span>
              <Status done={f >= at} p={sp(f, at, 8)} doneText="Terkirim" waitText="Terjadwal" />
            </Row>
          );
        })}
      </Card>
    </div>
  );
};

// ---------- Laporan: grafik menggambar diri, tooltip mengikuti kursor ----------
const fmtRp = (v: number) => `Rp${v.toFixed(1).replace('.', ',')} jt`;

const LaporanPanel: React.FC<{f: number}> = ({f}) => {
  const p = interpolate(f, [UT.chartFrom, UT.chartTo], [0, 1], {...clamp, easing: ease});
  const tipOp = interpolate(f, [UT.tooltip[0], UT.tooltip[0] + 6, UT.tooltip[1] - 4, UT.tooltip[1]], [0, 1, 1, 0], clamp);
  const cur = positionAt(f, U_CURSOR_PATH);
  let idx = 0;
  for (let i = 0; i < U_CHART.values.length; i++) {
    if (Math.abs(chartPoint(i).x - cur.x) < Math.abs(chartPoint(idx).x - cur.x)) idx = i;
  }
  const pt = chartPoint(idx);
  const rel = {x: pt.x - U_CONTENT.x, y: pt.y - U_CONTENT.y};
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <Header
        f={f}
        start={UT.laporanIn}
        title="Laporan Penjualan"
        sub="Tersusun otomatis setiap pagi, 07.00"
        right={<div style={{fontSize: font.label, color: color.muted, border: `1px solid ${color.line}`, borderRadius: radius.pill, padding: '6px 16px'}}>Ilustrasi</div>}
      />
      <Card top={100} style={{bottom: 0, ...textIn(f, UT.laporanIn + 2)}}>
        <div style={{height: 56, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <span style={{fontSize: font.ui, fontWeight: 500, color: color.navy}}>Penjualan 7 hari</span>
          <span style={{fontSize: font.title, fontWeight: 600, color: color.navy, fontVariantNumeric: 'tabular-nums', opacity: interpolate(p, [0.85, 1], [0, 1], clamp)}}>
            Rp123 jt
          </span>
        </div>
        <Chart width={U_CHART.width} height={U_CHART.height} labels={U_CHART.labels} values={U_CHART.values} max={U_CHART.max} progress={p} />
      </Card>
      {tipOp > 0 ? (
        <>
          <div style={{position: 'absolute', left: rel.x - 1, top: rel.y, width: 2, height: U_CHART.top + U_CHART.height - 44 - pt.y, background: color.line, opacity: tipOp}} />
          <div
            style={{
              position: 'absolute',
              left: rel.x,
              top: rel.y - 22,
              transform: 'translate(-50%, -100%)',
              padding: '10px 18px',
              borderRadius: radius.input,
              background: color.navy,
              color: color.surface,
              fontSize: font.label,
              fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
              whiteSpace: 'nowrap',
              opacity: tipOp,
            }}
          >
            {U_CHART.labels[idx]} · {fmtRp(U_CHART.values[idx])}
          </div>
        </>
      ) : null}
    </div>
  );
};

// ---------- Ringkasan: tab cair Sekolah -> Klinik -> UKM ----------
const INDUSTRI = [
  {
    tab: 'Sekolah',
    stats: [
      ['Rapor terkirim', '32', 'siswa'],
      ['Pengingat SPP', '186', 'wali murid'],
      ['Chat dibalas', '97', 'pesan'],
    ],
    rows: ['Rapor ke wali murid', 'Pengingat SPP bulanan', 'Balasan chat wali murid'],
  },
  {
    tab: 'Klinik',
    stats: [
      ['Janji temu', '54', 'terkonfirmasi'],
      ['Pengingat kontrol', '120', 'pasien'],
      ['Chat dibalas', '88', 'pesan'],
    ],
    rows: ['Konfirmasi janji temu', 'Pengingat jadwal kontrol', 'Balasan chat pasien'],
  },
  {
    tab: 'UKM',
    stats: [
      ['Pesanan diproses', '76', 'pesanan'],
      ['Tagihan terkirim', '128', 'tagihan'],
      ['Chat dibalas', '97', 'pesan'],
    ],
    rows: ['Rekap pesanan harian', 'Tagihan dan pengingat', 'Balasan chat pelanggan'],
  },
];
const SEG_SWITCH = [
  {f: 0, i: 0},
  {f: U_CLICKS.segKlinik + 2, i: 1},
  {f: U_CLICKS.segUkm + 2, i: 2},
];

const SegmentedTabs: React.FC<{f: number}> = ({f}) => {
  // Posisi indikator berpindah dengan spring; lebarnya merenggang di tengah perjalanan (efek cair).
  let pos = 0;
  let stretch = 0;
  for (let k = 1; k < SEG_SWITCH.length; k++) {
    if (f >= SEG_SWITCH[k].f) {
      const s = sp(f, SEG_SWITCH[k].f, 14);
      pos = SEG_SWITCH[k - 1].i + (SEG_SWITCH[k].i - SEG_SWITCH[k - 1].i) * s;
      stretch = Math.sin(Math.PI * Math.min(1, s)) * 56;
    }
  }
  const active = [...SEG_SWITCH].reverse().find((t) => f >= t.f)!.i;
  return (
    <div
      style={{
        position: 'relative',
        width: 3 * U_SEG.w + 12,
        height: U_SEG.h,
        borderRadius: radius.pill,
        background: color.canvas,
        border: `1px solid ${color.line}`,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 5,
          left: 5 + pos * U_SEG.w - stretch / 2,
          width: U_SEG.w + stretch,
          height: U_SEG.h - 12,
          borderRadius: radius.pill,
          background: gradient,
        }}
      />
      {INDUSTRI.map((d, i) => (
        <div
          key={d.tab}
          style={{
            position: 'absolute',
            top: 0,
            left: 6 + i * U_SEG.w,
            width: U_SEG.w,
            height: U_SEG.h - 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: font.label,
            fontWeight: 600,
            color: i === active ? color.surface : color.muted,
          }}
        >
          {d.tab}
        </div>
      ))}
    </div>
  );
};

const RingkasanPanel: React.FC<{f: number}> = ({f}) => (
  <div style={{position: 'absolute', inset: 0}}>
    <Header f={f} start={UT.ringkasanIn} title="Ringkasan" sub="Otomatisasi aktif minggu ini · ilustrasi" right={<SegmentedTabs f={f} />} />
    {INDUSTRI.map((d, i) => {
      const from = SEG_SWITCH[i].f;
      const to = SEG_SWITCH[i + 1]?.f ?? 99999;
      if (f < from || f >= to + 6) return null;
      const out = fadeOut(f, to, 6);
      const inS = i === 0 ? textIn(f, UT.ringkasanIn + 2) : textIn(f, from + 4);
      return (
        <div key={d.tab} style={{position: 'absolute', inset: 0, ...inS, opacity: inS.opacity * out}}>
          <div style={{position: 'absolute', top: 110, left: 0, right: 0, display: 'flex', gap: 24}}>
            {d.stats.map(([label, value, unit]) => (
              <div key={label} style={{flex: 1, border: `1px solid ${color.line}`, borderRadius: radius.card, padding: 32}}>
                <div style={{fontSize: font.label, color: color.muted}}>{label}</div>
                <div style={{display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 10}}>
                  <span style={{fontSize: font.title, fontWeight: 600, color: color.navy, fontVariantNumeric: 'tabular-nums'}}>{value}</span>
                  <span style={{fontSize: font.label, color: color.muted}}>{unit}</span>
                </div>
              </div>
            ))}
          </div>
          <Card top={310} style={{paddingTop: 16, paddingBottom: 16}}>
            {d.rows.map((r, k) => (
              <Row key={r} last={k === d.rows.length - 1}>
                <span>{r}</span>
                <Status done doneText="Otomatis" />
              </Row>
            ))}
          </Card>
        </div>
      );
    })}
  </div>
);

export const AppScreenUmum: React.FC<{f: number}> = ({f}) => {
  if (f < UT.bloom) return null;
  const bloom = sp(f, UT.bloom, 14);
  const recede = sp(f, UT.recede, 15);
  const scale = (0.5 + 0.5 * bloom) * (1 - 0.12 * recede);
  const opacity = interpolate(bloom, [0, 0.4], [0, 1], clamp) * (1 - recede);
  if (opacity <= 0.001 && f > UT.recede) return null;

  const layer = (show: boolean, op: number, node: React.ReactNode) =>
    show && op > 0 ? <div style={{position: 'absolute', inset: 0, opacity: op}}>{node}</div> : null;
  const fadeIn = (at: number) => interpolate(f, [at, at + 6], [0, 1], clamp);

  return (
    <Window
      x={APP.x}
      y={APP.y}
      w={APP.w}
      h={APP.h}
      titleBar={APP.titleBar}
      title="A2 Automation"
      style={{opacity, transform: `translateY(${-30 * recede}px) scale(${scale})`, transformOrigin: '50% 50%', zIndex: 20}}
    >
      <Sidebar f={f} width={APP.sidebar} brand="A2 Automation" sub="Usaha Anda" tabs={tabs(f)} switches={TAB_SWITCH} />
      <div style={{position: 'absolute', left: APP.sidebar + 48, top: 48, right: 48, bottom: 48}}>
        {layer(f < UT.inboxIn, fadeOut(f, UT.homeOut), <HomePanel f={f} />)}
        {layer(f >= UT.inboxIn, Math.min(fadeIn(UT.inboxIn), fadeOut(f, UT.inboxOut)), <InboxPanel f={f} />)}
        {layer(f >= UT.tagihanIn, Math.min(fadeIn(UT.tagihanIn), fadeOut(f, UT.tagihanOut)), <TagihanPanel f={f} />)}
        {layer(f >= UT.laporanIn, Math.min(fadeIn(UT.laporanIn), fadeOut(f, UT.laporanOut)), <LaporanPanel f={f} />)}
        {layer(f >= UT.ringkasanIn, fadeIn(UT.ringkasanIn), <RingkasanPanel f={f} />)}
      </div>
    </Window>
  );
};
