import React from 'react';
import {interpolate} from 'remotion';
import {APP, CLICKS, DRAG} from '../data/timeline';
import {color, font, radius} from '../theme';
import {Card, Header, Row, Sidebar, Status, Tab} from './AppUI';
import {Button} from './Button';
import {Chart} from './Chart';
import {pressAt} from './Cursor';
import {IconBell, IconBolt, IconChart, IconCheck, IconFile, IconHome, IconSend} from './Icons';
import {clamp, ease, fadeOut, sp, textIn} from './motion';
import {ProgressBar} from './ProgressBar';
import {Toggle} from './Toggle';
import {Window} from './Window';

// Aplikasi "A2 Sekolah". Satu jendela yang sama dipakai dari titik balik sampai empati,
// sehingga perpindahan adegan terjadi di dalam jendela, bukan cut.

export const T = {
  bloom: 334,
  homeOut: CLICKS.otomatiskan + 4,
  raporIn: CLICKS.otomatiskan + 12,
  progressFrom: 391,
  progressTo: 451,
  kirimBtnIn: 453,
  kirimDone: CLICKS.kirim + 4,
  island: 488,
  islandEnd: 533,
  reply: 512,
  raporOut: CLICKS.navPengingat + 2,
  sppIn: CLICKS.navPengingat + 10,
  scheduleIn: DRAG.to + 4,
  sppOut: CLICKS.navLaporan + 2,
  laporanIn: CLICKS.navLaporan + 8,
  chartFrom: 661,
  chartTo: 706,
  recede: 722,
};

const TABS: Tab[] = [
  {label: 'Beranda', Icon: IconHome},
  {label: 'Rapor', Icon: IconFile},
  {label: 'Pengingat', Icon: IconBell},
  {label: 'Laporan', Icon: IconChart},
];
const TAB_SWITCH = [
  {f: 0, i: 0},
  {f: CLICKS.otomatiskan + 4, i: 1},
  {f: CLICKS.navPengingat + 2, i: 2},
  {f: CLICKS.navLaporan + 2, i: 3},
];

// ---------- Panel Beranda (titik balik) ----------
const HomePanel: React.FC<{f: number}> = ({f}) => {
  const press = f < CLICKS.otomatiskan + 10 ? pressAt(f) : 0;
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <Header f={f} start={T.bloom + 4} title="Selamat malam, Bu Rina" sub="Kelas 8A · Semester Ganjil 2026/2027" />
      <Card top={110} style={{paddingTop: 16, paddingBottom: 16}}>
        {['Susun rapor 32 siswa', 'Kirim rapor ke wali murid', 'Pengingat SPP bulan ini'].map((t, i) => (
          <Row key={t} last={i === 2}>
            <span style={{fontSize: font.ui}}>{t}</span>
            <span style={{color: color.muted}}>Manual</span>
          </Row>
        ))}
      </Card>
      <div style={{position: 'absolute', right: 0, bottom: 0}}>
        <Button label="Otomatiskan" icon={<IconBolt size={26} stroke={color.surface} />} press={press} />
      </div>
    </div>
  );
};

// ---------- Panel Rapor (rapor + kirim) ----------
const RaporPanel: React.FC<{f: number}> = ({f}) => {
  const n = Math.round(interpolate(f, [T.progressFrom, T.progressTo], [0, 32], {...clamp, easing: ease}));
  const rows = [
    {name: 'Aditya Pratama', at: 1},
    {name: 'Bunga Lestari', at: 2},
    {name: 'Dimas Saputra', at: 3},
  ];
  const done = f >= T.kirimDone;
  const press = f >= CLICKS.kirim - 4 && f < CLICKS.kirim + 10 ? pressAt(f) : 0;
  const replyP = sp(f, T.reply);
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <Header f={f} start={T.raporIn} title="Rapor Kelas 8A" sub="Disusun otomatis dari data nilai" />
      <Card top={100} style={textIn(f, T.raporIn + 2)}>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: font.ui, color: color.navy, marginBottom: 20}}>
          <span style={{fontWeight: 500}}>{n < 32 ? 'Menyusun rapor' : 'Rapor siap'}</span>
          <span style={{fontWeight: 600, fontVariantNumeric: 'tabular-nums'}}>
            {n}/32 siswa
          </span>
        </div>
        <ProgressBar value={n / 32} width={898} />
      </Card>
      <Card top={274} style={{paddingTop: 16, paddingBottom: 16, ...textIn(f, T.raporIn + 4)}}>
        {rows.map((r, i) => (
          <Row key={r.name} last={i === rows.length - 1}>
            <span>{r.name}</span>
            {done ? <Status done doneText="Terkirim" /> : <Status done={n >= r.at * 10} />}
          </Row>
        ))}
      </Card>
      {f >= T.kirimBtnIn ? (
        <div style={{position: 'absolute', right: 0, bottom: 0, ...textIn(f, T.kirimBtnIn)}}>
          {done ? (
            <Button variant="done" label="Terkirim ke 32 wali murid" icon={<IconCheck size={26} stroke={color.success} />} />
          ) : (
            <Button label="Kirim ke wali murid" icon={<IconSend size={26} stroke={color.surface} />} press={press} />
          )}
        </div>
      ) : null}
      {f >= T.reply ? (
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: 80,
            padding: '0 32px 0 16px',
            borderRadius: radius.pill,
            background: color.canvas,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            opacity: replyP,
            transform: `translateY(${(1 - replyP) * 12}px)`,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              background: color.surface,
              border: `1px solid ${color.line}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: font.label,
              fontWeight: 600,
              color: color.navy,
            }}
          >
            S
          </div>
          <div style={{lineHeight: 1.15}}>
            <div style={{fontSize: font.label, color: color.muted}}>Ibu Sari · wali murid Bunga</div>
            <div style={{fontSize: font.ui, fontWeight: 500, color: color.navy}}>Terima kasih, Bu.</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

// ---------- Panel Pengingat SPP ----------
const SppPanel: React.FC<{f: number}> = ({f}) => {
  const on = interpolate(f, [DRAG.from, DRAG.to], [0, 1], {...clamp, easing: ease});
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <Header f={f} start={T.sppIn} title="Pengingat SPP" sub="Untuk wali murid kelas 7–9" />
      <Card top={100} style={textIn(f, T.sppIn + 2)}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <div style={{fontSize: font.ui, fontWeight: 500, color: color.navy}}>Pengingat SPP otomatis</div>
            <div style={{fontSize: font.label, color: color.muted, marginTop: 6}}>Dikirim 3 hari sebelum jatuh tempo</div>
          </div>
          <Toggle progress={on} />
        </div>
      </Card>
      {f >= T.scheduleIn ? (
        <Card top={268} style={textIn(f, T.scheduleIn)}>
          <div style={{fontSize: font.label, color: color.muted}}>Jadwal berikutnya</div>
          <div style={{fontSize: font.ui, fontWeight: 600, color: color.navy, marginTop: 8}}>Selasa, 3 November 2026</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: font.label, color: color.success, marginTop: 12, fontWeight: 500}}>
            <IconCheck size={22} stroke={color.success} />
            186 wali murid terjadwal
          </div>
        </Card>
      ) : null}
    </div>
  );
};

// ---------- Panel Laporan ----------
const LaporanPanel: React.FC<{f: number}> = ({f}) => {
  const p = interpolate(f, [T.chartFrom, T.chartTo], [0, 1], {...clamp, easing: ease});
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <Header
        f={f}
        start={T.laporanIn}
        title="Laporan"
        sub="Jam kerja admin dihemat per bulan"
        right={
          <div style={{fontSize: font.label, color: color.muted, border: `1px solid ${color.line}`, borderRadius: radius.pill, padding: '6px 16px'}}>
            Ilustrasi
          </div>
        }
      />
      <Card top={100} style={{bottom: 0, ...textIn(f, T.laporanIn + 2)}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16}}>
          <span style={{fontSize: font.ui, fontWeight: 500, color: color.navy}}>Jam admin dihemat</span>
          <span style={{fontSize: font.title, fontWeight: 600, color: color.navy, fontVariantNumeric: 'tabular-nums', opacity: interpolate(p, [0.85, 1], [0, 1], clamp)}}>
            38 jam/bulan
          </span>
        </div>
        <Chart width={898} height={330} labels={['Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']} values={[0, 8, 15, 23, 31, 38]} max={40} progress={p} />
      </Card>
    </div>
  );
};

export const AppScreen: React.FC<{f: number}> = ({f}) => {
  if (f < T.bloom) return null;
  const bloom = sp(f, T.bloom, 14);
  const recede = sp(f, T.recede, 15);
  const scale = (0.5 + 0.5 * bloom) * (1 - 0.12 * recede);
  const opacity = interpolate(bloom, [0, 0.4], [0, 1], clamp) * (1 - recede);
  if (opacity <= 0.001 && f > T.recede) return null;

  const homeOp = fadeOut(f, T.homeOut);
  const raporOp = Math.min(interpolate(f, [T.raporIn, T.raporIn + 6], [0, 1], clamp), fadeOut(f, T.raporOut));
  const sppOp = Math.min(interpolate(f, [T.sppIn, T.sppIn + 6], [0, 1], clamp), fadeOut(f, T.sppOut));
  const lapOp = interpolate(f, [T.laporanIn, T.laporanIn + 6], [0, 1], clamp);

  return (
    <Window
      x={APP.x}
      y={APP.y}
      w={APP.w}
      h={APP.h}
      titleBar={APP.titleBar}
      title="A2 Sekolah"
      style={{opacity, transform: `translateY(${-30 * recede}px) scale(${scale})`, transformOrigin: '50% 50%', zIndex: 20}}
    >
      <Sidebar f={f} width={APP.sidebar} brand="A2 Sekolah" sub="SMP Harapan Bangsa" tabs={TABS} switches={TAB_SWITCH} />
      <div style={{position: 'absolute', left: APP.sidebar + 48, top: 48, right: 48, bottom: 48}}>
        {homeOp > 0 ? (
          <div style={{position: 'absolute', inset: 0, opacity: homeOp}}>
            <HomePanel f={f} />
          </div>
        ) : null}
        {f >= T.raporIn && raporOp > 0 ? (
          <div style={{position: 'absolute', inset: 0, opacity: raporOp}}>
            <RaporPanel f={f} />
          </div>
        ) : null}
        {f >= T.sppIn && sppOp > 0 ? (
          <div style={{position: 'absolute', inset: 0, opacity: sppOp}}>
            <SppPanel f={f} />
          </div>
        ) : null}
        {f >= T.laporanIn ? (
          <div style={{position: 'absolute', inset: 0, opacity: lapOp}}>
            <LaporanPanel f={f} />
          </div>
        ) : null}
      </div>
    </Window>
  );
};
