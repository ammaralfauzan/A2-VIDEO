import React from 'react';
import {Img, interpolate, staticFile} from 'remotion';
import {BTN, GOLD_LEAF, U, UF} from '../../brands/h2c-umroh/theme';
import {clamp, ease} from '../../components/motion';
import {wf} from '../../data/timeline-akun-keluarga-h2c';
import {FAMILY_ID, NAMES, P, POP, SANDI, SCR, STEP_AT, typed, typedEnd} from './layout';

// Isi layar monitor (koordinat lokal 744x484): replika generik web umroh H2C, data fiktif berlabel "contoh".
const W = SCR.w;
const H = SCR.h;
const pin = (f: number, a: number, d = 8) => interpolate(f, [a, a + d], [0, 1], {...clamp, easing: ease});
const win = (f: number, a: number, b: number) => Math.min(pin(f, a), 1 - pin(f, b, 6));
const abs = (x: number, y: number, s: React.CSSProperties = {}): React.CSSProperties => ({position: 'absolute', left: x, top: y, ...s});

const Field: React.FC<{x: number; y: number; w: number; label: string; value: string; caret?: boolean; glow?: number}> = ({x, y, w, label, value, caret, glow = 0}) => (
  <div style={abs(x, y, {width: w})}>
    <div style={{fontSize: 18, fontWeight: 700, color: U.sage, marginBottom: 8}}>{label}</div>
    <div style={{height: 52, borderRadius: 16, background: U.bg, border: `2px solid ${glow > 0 ? U.gold : U.goldLine}`, boxShadow: `0 0 0 ${8 * glow}px rgba(212,175,106,${0.22 * glow})`, display: 'flex', alignItems: 'center', padding: '0 18px', fontSize: 24, fontWeight: 600, color: U.ivory}}>
      {value}
      {caret ? <span style={{width: 12, height: 26, marginLeft: 3, background: U.goldLight}} /> : null}
    </div>
  </div>
);

const Pill: React.FC<{x: number; y: number; w: number; h?: number; gold?: boolean; children: React.ReactNode; size?: number}> = ({x, y, w, h = 52, gold, children, size = 22}) => (
  <div style={abs(x, y, {width: w, height: h, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: size, fontWeight: 700, ...(gold ? {background: BTN.background, color: BTN.color} : {border: `2px solid ${U.goldLine}`, color: U.ivory, background: U.bg2})})}>{children}</div>
);

const Check: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 40 40">
    <circle cx={20} cy={20} r={19} fill={U.leaf} />
    <path d="M11 20.5 L17.5 27 L29 14" fill="none" stroke={U.bg} strokeWidth={4.2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Modal: React.FC<{f: number; at: number; y?: number; h: number; children: React.ReactNode}> = ({f, at, y = 104, h, children}) => {
  const p = pin(f, at, 9);
  return (
    <div style={abs(132, y, {width: 480, height: h, borderRadius: 28, background: U.surface2, border: `2px solid ${U.goldLine}`, boxShadow: '0 30px 70px -20px rgba(0,0,0,.7)', opacity: p, transform: `translateY(${(1 - p) * 18}px) scale(${0.96 + 0.04 * p})`})}>
      {children}
    </div>
  );
};

// Bilah atas: logo asli, nama, menu Keluarga, empat titik langkah.
const TopBar: React.FC<{f: number}> = ({f}) => {
  const navOn = pin(f, P.clickNav, 6);
  return (
    <div style={abs(0, 0, {width: W, height: 70, background: U.bg2, borderBottom: `2px solid ${U.goldLine}`})}>
      <Img src={staticFile('brands/h2c-umroh/logo.jpeg')} style={abs(22, 13, {width: 44, height: 44, borderRadius: '50%'})} />
      <div style={abs(78, 21, {fontSize: 21, fontWeight: 700, color: U.ivory})}>H2C Wisata Mandiri</div>
      <div style={abs(440, 22, {fontSize: 20, fontWeight: 700, color: navOn > 0.5 ? U.goldLight : U.sage, paddingBottom: 4, borderBottom: `3px solid rgba(212,175,106,${navOn})`})}>Keluarga</div>
      {[0, 1, 2, 3].map((i) => {
        const lit = pin(f, wf(3, 1) + i * 6, 5) * (1 - pin(f, STEP_AT[0] - 10, 8)); // pembuka: menyala satu per satu
        const cur = f >= STEP_AT[i] && (i === 3 ? f < P.done : f < STEP_AT[i + 1]);
        const doneStep = i < 3 ? f >= STEP_AT[i + 1] : f >= P.done;
        const fill = doneStep ? U.leaf : cur ? U.gold : lit > 0.01 ? `rgba(212,175,106,${lit})` : 'transparent';
        return (
          <div key={i} style={abs(594 + i * 34, 26, {width: 18, height: 18, borderRadius: '50%', border: `2px solid ${doneStep ? U.leaf : U.gold}`, background: fill, boxShadow: cur || lit > 0.5 ? `0 0 0 5px rgba(212,175,106,.22)` : 'none'})} />
        );
      })}
    </div>
  );
};

const Home: React.FC = () => (
  <div style={abs(0, 70, {width: W, height: H - 70, display: 'flex', flexDirection: 'column', alignItems: 'center'})}>
    <Img src={staticFile('brands/h2c-umroh/logo.jpeg')} style={{width: 112, height: 112, borderRadius: '50%', marginTop: 40, border: `3px solid ${U.goldLine}`}} />
    <div style={{fontFamily: UF.display, fontWeight: 700, fontSize: 50, color: U.ivory, marginTop: 22}}>Akun Keluarga</div>
    <div style={{fontSize: 24, fontWeight: 500, color: U.sage, marginTop: 6}}>Satu akun untuk sekeluarga</div>
    <div style={{width: 180, height: 5, borderRadius: 3, background: GOLD_LEAF, marginTop: 26}} />
  </div>
);

const Keluarga: React.FC<{f: number}> = ({f}) => {
  const count = [P.clickSave + 4, ...P.addMore].filter((a) => f >= a).length;
  const tambah = win(f, P.clickAdd + 1, P.clickSave + 3);
  const kirim = win(f, P.kirimOpen, 99999);
  const listOp = 1 - 0.78 * Math.max(tambah, kirim);
  const glow = win(f, P.sandiGlow, P.clickSave);
  const saveP = interpolate(f, [P.clickSave - 2, P.clickSave + 2, P.clickSave + 6], [1, 0.94, 1], clamp);
  const salinDone = f >= P.clickSalin + 1;
  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: listOp}}>
        <div style={abs(36, 84, {fontFamily: UF.display, fontWeight: 700, fontSize: 36, lineHeight: 1.1, color: U.ivory})}>Akun Keluarga</div>
        <div style={abs(36, 140, {display: 'flex', alignItems: 'center', gap: 8, fontSize: 18, fontWeight: 700, color: U.sage})}>
          Anggota {count}/4
          {[0, 1, 2, 3].map((i) => (
            <span key={i} style={{width: 12, height: 12, borderRadius: '50%', marginLeft: i ? 0 : 6, background: i < count ? U.leaf : 'transparent', border: `2px solid ${i < count ? U.leaf : U.sage}`}} />
          ))}
        </div>
        <Pill x={470} y={90} w={238} h={46} gold size={20}>+ Tambah anggota</Pill>
        {[0, 1, 2, 3].map((i) => {
          const at = i === 0 ? P.clickSave + 4 : P.addMore[i - 1];
          const p = pin(f, at, 8);
          const filled = f >= at;
          return (
            <div key={i} style={abs(36, 172 + i * 56, {width: 672, height: 48, borderRadius: 16, boxSizing: 'border-box', border: filled ? `2px solid ${U.goldLine}` : `2px dashed ${U.line}`, background: filled ? U.surface : 'transparent', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 14})}>
              {filled ? (
                <div style={{display: 'flex', alignItems: 'center', gap: 14, opacity: p, transform: `translateX(${(1 - p) * 16}px)`, width: '100%'}}>
                  <span style={{width: 30, height: 30, borderRadius: '50%', background: U.gold, color: U.bg, fontSize: 17, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{NAMES[i][0]}</span>
                  <span style={{fontSize: 22, fontWeight: 700, color: U.ivory}}>{NAMES[i]}</span>
                  <span style={{marginLeft: 'auto', fontSize: 16, fontWeight: 600, color: U.sage}}>contoh</span>
                </div>
              ) : (
                <span style={{fontSize: 18, fontWeight: 600, color: U.sage, opacity: 0.7}}>Kosong</span>
              )}
            </div>
          );
        })}
        {f >= P.full ? (
          <div style={abs(36, 396, {width: 672, height: 48, borderRadius: 16, background: 'rgba(159,179,166,.12)', display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', boxSizing: 'border-box', opacity: pin(f, P.full, 8)})}>
            <svg width={20} height={22} viewBox="0 0 20 22"><rect x={2} y={9} width={16} height={12} rx={3} fill={U.sage} /><path d="M6 9 V6 a4 4 0 0 1 8 0 V9" fill="none" stroke={U.sage} strokeWidth={2.4} /></svg>
            <span style={{fontSize: 18, fontWeight: 700, color: U.sage}}>Maksimal 4 anggota</span>
          </div>
        ) : null}
      </div>
      {tambah > 0.01 ? (
        <div style={{position: 'absolute', inset: 0, opacity: tambah}}>
          <Modal f={f} at={P.clickAdd + 1} h={340}>
            <div style={abs(32, 26, {fontSize: 26, fontWeight: 700, color: U.ivory})}>Tambah anggota</div>
            <Field x={32} y={74} w={416} label="Nama" value={typed(NAMES[0], P.nameFrom, f) && f >= P.nameFrom ? typed(NAMES[0], P.nameFrom, f) : ''} caret={f >= P.nameFrom - 6 && f < typedEnd(NAMES[0], P.nameFrom) + 4} />
            <Field x={32} y={164} w={416} label="Sandi" value={f >= P.sandiFrom ? typed(SANDI, P.sandiFrom, f) : ''} caret={f >= typedEnd(NAMES[0], P.nameFrom) + 4 && f < P.sandiGlow} glow={glow} />
            {glow > 0.01 ? <div style={abs(262, 214, {fontSize: 18, fontWeight: 700, color: U.goldLight, opacity: glow})}>kata rahasia</div> : null}
            <div style={{position: 'absolute', left: 132, top: 266, transform: `scale(${saveP})`}}>
              <Pill x={0} y={0} w={216} h={50} gold>Simpan</Pill>
            </div>
          </Modal>
        </div>
      ) : null}
      {kirim > 0.01 ? (
        <div style={{position: 'absolute', inset: 0, opacity: kirim}}>
          <Modal f={f} at={P.kirimOpen} h={340}>
            <div style={abs(32, 26, {fontSize: 26, fontWeight: 700, color: U.ivory})}>Kirim ke {NAMES[0]}</div>
            <div style={abs(372, 32, {fontSize: 16, fontWeight: 600, color: U.sage})}>contoh</div>
            {[
              ['ID keluarga', FAMILY_ID],
              ['Sandi', SANDI],
            ].map(([a, b], i) => (
              <div key={a} style={abs(32, 84 + i * 82, {width: 416, height: 66, borderRadius: 18, background: U.bg, border: `2px solid ${U.goldLine}`, boxSizing: 'border-box', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'})}>
                <span style={{fontSize: 18, fontWeight: 700, color: U.sage}}>{a}</span>
                <span style={{fontSize: 26, fontWeight: 700, color: U.goldLight, letterSpacing: 1}}>{b}</span>
              </div>
            ))}
            <div style={{position: 'absolute', left: 140, top: 262, transform: `scale(${interpolate(f, [P.clickSalin - 2, P.clickSalin + 2, P.clickSalin + 6], [1, 0.94, 1], clamp)})`}}>
              <Pill x={0} y={0} w={200} h={50} gold={!salinDone}>
                {salinDone ? <Check size={24} /> : null}
                {salinDone ? 'Tersalin' : 'Salin'}
              </Pill>
            </div>
          </Modal>
        </div>
      ) : null}
    </>
  );
};

const Masuk: React.FC<{f: number}> = ({f}) => {
  const a = 1 - pin(f, P.clickIdBtn + 3, 6);
  const b = win(f, P.clickIdBtn + 6, P.clickMasuk + 4);
  const c = pin(f, P.clickMasuk + 6, 9);
  const press = (at: number) => interpolate(f, [at - 2, at + 2, at + 6], [1, 0.94, 1], clamp);
  return (
    <>
      <div style={abs(0, 92, {width: W, textAlign: 'center', fontFamily: UF.display, fontWeight: 700, fontSize: 42, color: U.ivory, opacity: 1 - c})}>Masuk</div>
      {a > 0.01 ? (
        <div style={{position: 'absolute', inset: 0, opacity: a}}>
          <Pill x={152} y={172} w={440} h={58}>Masuk dengan email</Pill>
          <div style={{position: 'absolute', left: 152, top: 250, transform: `scale(${press(P.clickIdBtn)})`}}>
            <Pill x={0} y={0} w={440} h={58} gold>Masuk dengan ID keluarga</Pill>
          </div>
        </div>
      ) : null}
      {b > 0.01 ? (
        <div style={{position: 'absolute', inset: 0, opacity: b}}>
          <Field x={152} y={160} w={440} label="ID keluarga" value={f >= P.idFrom ? typed(FAMILY_ID, P.idFrom, f) : ''} caret={f < typedEnd(FAMILY_ID, P.idFrom) + 4} />
          <Field x={152} y={252} w={440} label="Sandi" value={f >= P.pwFrom ? typed(SANDI, P.pwFrom, f) : ''} caret={f >= typedEnd(FAMILY_ID, P.idFrom) + 4 && f < P.clickMasuk} />
          <div style={{position: 'absolute', left: 262, top: 366, transform: `scale(${press(P.clickMasuk)})`}}>
            <Pill x={0} y={0} w={220} h={52} gold>Masuk</Pill>
          </div>
        </div>
      ) : null}
      {c > 0.01 ? (
        <div style={abs(0, 120, {width: W, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: c, transform: `scale(${0.9 + 0.1 * c})`})}>
          <Check size={110} />
          <div style={{fontSize: 34, fontWeight: 700, color: U.ivory, marginTop: 26}}>Selamat datang, {NAMES[0]}</div>
          <div style={{fontSize: 20, fontWeight: 600, color: U.sage, marginTop: 8}}>Masuk tanpa daftar lagi · contoh</div>
        </div>
      ) : null}
    </>
  );
};

const Koper: React.FC = () => (
  <svg width={70} height={64} viewBox="0 0 70 64">
    <rect x={24} y={2} width={22} height={12} rx={5} fill="none" stroke={U.gold} strokeWidth={4} />
    <rect x={6} y={12} width={58} height={46} rx={10} fill={U.gold} />
    <rect x={20} y={12} width={5} height={46} fill={U.goldDeep} />
    <rect x={45} y={12} width={5} height={46} fill={U.goldDeep} />
  </svg>
);

const Paket: React.FC<{f: number}> = ({f}) => {
  const sel = f >= P.clickPaket;
  const panel = pin(f, P.panel, 9);
  const chip = f >= P.clickChip;
  const order = pin(f, P.order, 9);
  const dim = 1 - 0.78 * order;
  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: dim}}>
        <div style={abs(36, 88, {fontFamily: UF.display, fontWeight: 700, fontSize: 38, color: U.ivory})}>Pilih paket umroh</div>
        {['A', 'B', 'C'].map((n, i) => {
          const on = sel && i === 1;
          return (
            <div key={n} style={abs(36 + i * 228, 150, {width: 208, height: 176, borderRadius: 24, boxSizing: 'border-box', background: on ? U.surface2 : U.surface, border: `${on ? 3 : 2}px solid ${on ? U.gold : U.goldLine}`, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 22, boxShadow: on ? '0 0 0 6px rgba(212,175,106,.18)' : 'none', transform: `scale(${on ? interpolate(f, [P.clickPaket, P.clickPaket + 6], [0.95, 1], clamp) : 1})`})}>
              <Koper />
              <div style={{fontSize: 20, fontWeight: 700, color: U.ivory, marginTop: 14}}>Paket contoh {n}</div>
              <div style={{fontSize: 16, fontWeight: 700, color: on ? U.goldLight : U.sage, marginTop: 8}}>{on ? 'Dipilih' : 'Lihat detail'}</div>
            </div>
          );
        })}
        {panel > 0.01 ? (
          <div style={abs(36, 346, {width: 672, height: 100, borderRadius: 24, background: U.bg2, border: `2px solid ${U.goldLine}`, boxSizing: 'border-box', opacity: panel, transform: `translateY(${(1 - panel) * 14}px)`})}>
            <div style={abs(22, 12, {fontSize: 17, fontWeight: 700, color: U.sage})}>Untuk siapa?</div>
            {NAMES.map((nm, i) => {
              const on = chip && i === 0;
              return (
                <div key={nm} style={abs(22 + i * 160, 44, {width: 146, height: 42, borderRadius: 999, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, fontWeight: 700, ...(on ? {background: U.gold, color: U.bg} : {border: `2px solid ${U.goldLine}`, color: U.ivory})})}>{nm}</div>
              );
            })}
          </div>
        ) : null}
      </div>
      {order > 0.01 ? (
        <Modal f={f} at={P.order} y={110} h={290}>
          <div style={abs(0, 28, {width: 480, display: 'flex', justifyContent: 'center'})}><Check size={76} /></div>
          <div style={abs(0, 124, {width: 480, textAlign: 'center', fontSize: 28, fontWeight: 700, color: U.ivory})}>Pesanan dibuat</div>
          <div style={abs(0, 170, {width: 480, textAlign: 'center', fontSize: 22, fontWeight: 600, color: U.goldLight})}>Paket contoh B</div>
          <div style={abs(0, 206, {width: 480, textAlign: 'center', fontSize: 22, fontWeight: 600, color: U.ivory2})}>atas nama {NAMES[0]}</div>
          <div style={abs(0, 246, {width: 480, textAlign: 'center', fontSize: 16, fontWeight: 600, color: U.sage})}>contoh</div>
        </Modal>
      ) : null}
    </>
  );
};

const Selesai: React.FC<{f: number}> = ({f}) => {
  const p = interpolate(f, [P.done, P.done + 8, P.done + 13], [0, 1.12, 1], clamp);
  return (
    <div style={abs(0, 92, {width: W, display: 'flex', flexDirection: 'column', alignItems: 'center'})}>
      <div style={{transform: `scale(${p})`}}><Check size={170} /></div>
      <div style={{fontFamily: UF.display, fontWeight: 700, fontSize: 54, color: U.ivory, marginTop: 22, opacity: pin(f, P.done + 6)}}>Selesai</div>
      <div style={{fontSize: 22, fontWeight: 600, color: U.sage, marginTop: 4, opacity: pin(f, P.done + 10)}}>4 anggota, 1 akun</div>
    </div>
  );
};

const Cta: React.FC = () => (
  <div style={abs(0, 70, {width: W, height: H - 70, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24})}>
    <Img src={staticFile('brands/h2c-umroh/logo.jpeg')} style={{width: 150, height: 150, borderRadius: '50%', border: `3px solid ${U.goldLine}`}} />
    <div style={{...BTN, padding: '16px 40px', fontSize: 28, fontWeight: 700}}>umroh.h2c.or.id</div>
  </div>
);

export const Layar: React.FC<{f: number}> = ({f}) => {
  // redup saat angka langkah besar tampil; halaman berganti di balik angka
  const popDim = Math.max(...STEP_AT.map((s) => win(f, s - POP.pre - 9, s - POP.pre + POP.hold + POP.move - 2)));
  const pages: [number, React.ReactNode][] = [
    [win(f, -10, P.clickNav + 2), <Home key="h" />],
    [win(f, P.clickNav + 2, P.masukOpen), <Keluarga key="k" f={f} />],
    [win(f, P.masukOpen, P.paketOpen), <Masuk key="m" f={f} />],
    [win(f, P.paketOpen, P.done), <Paket key="p" f={f} />],
    [win(f, P.done, P.cta), <Selesai key="s" f={f} />],
    [win(f, P.cta, 99999), <Cta key="c" />],
  ];
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: W, height: H, overflow: 'hidden', background: U.bg, fontFamily: UF.text, borderRadius: 14}}>
      <div style={{position: 'absolute', left: -120, top: -160, width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(27,78,56,.9) 0%, rgba(10,31,23,0) 70%)'}} />
      <div style={{position: 'absolute', inset: 0, opacity: 1 - 0.75 * popDim}}>
        {pages.map(([o, node], i) =>
          o > 0.001 ? (
            <div key={i} style={{position: 'absolute', inset: 0, opacity: o}}>
              {node}
            </div>
          ) : null,
        )}
        <TopBar f={f} />
        <div style={abs(W - 104, H - 34, {fontSize: 15, fontWeight: 700, color: U.sage, letterSpacing: 1})}>Simulasi</div>
      </div>
      {/* kilau kaca layar */}
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(125deg, rgba(255,250,240,.07) 0%, rgba(255,250,240,0) 38%)', pointerEvents: 'none'}} />
    </div>
  );
};
