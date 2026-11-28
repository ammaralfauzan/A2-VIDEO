import React from 'react';
import {Img, interpolate, staticFile} from 'remotion';
import {CARD, RIBBON, U, UF} from '../../brands/h2c-umroh/theme';
import {clamp, ease} from '../../components/motion';
import {inP, pop, rise} from '../umroh-10-juta/anim';
import {COL, P, STAGE, TIER_RIM, TIERS, WIN} from './layout';
import {AngkaBesar, big, Contoh, IkonWa, Lencana, Tiket, Tombol} from './Web';

// Halaman di panggung: masuk dari kanan, keluar ke kiri (seperti pindah halaman di HP).
const Halaman: React.FC<{f: number; r: [number, number]; children: React.ReactNode}> = ({f, r, children}) => {
  if (f < r[0] - 1 || f > r[1] + 12) return null;
  const a = interpolate(f, [r[0], r[0] + 12], [1, 0], {...clamp, easing: ease});
  const b = interpolate(f, [r[1], r[1] + 12], [0, 1], {...clamp, easing: ease});
  return <div style={{position: 'absolute', inset: 0, opacity: (1 - a) * (1 - b), transform: `translateX(${a * 140 - b * 140}px)`}}>{children}</div>;
};

const Judul: React.FC<{kecil: string; skrip?: string; besar: string; y: number; p: number}> = ({kecil, skrip, besar, y, p}) => (
  <div style={{position: 'absolute', left: COL.x, width: COL.w, top: y, display: 'flex', flexDirection: 'column', alignItems: 'center', ...rise(p, 20)}}>
    <div style={{fontFamily: UF.text, fontWeight: 700, fontSize: 24, letterSpacing: 4, color: U.gold}}>✦ {kecil} ✦</div>
    {skrip ? <div style={{fontFamily: UF.script, fontSize: 84, color: U.ivory, lineHeight: 1.15}}>{skrip}</div> : null}
    <div style={{...big, fontSize: 118}}>{besar}</div>
  </div>
);

// ---------- Pembuka: judul, dua paket, lima titik ----------
export const Pembuka: React.FC<{f: number}> = ({f}) => {
  const out = 1 - inP(f, P.hook[1], 10);
  if (out <= 0.001) return null;
  const t = inP(f, P.titleIn, 14);
  const c = (k: number) => inP(f, P.cards + k * 6, 14);
  const rb = pop(f, P.ribbon);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: out, transform: `translateX(${-(1 - out) * 140}px)`}}>
      <Judul kecil="PROMO UMROH" skrip="Paket" besar="Hajar Aswad" y={STAGE.y + 10} p={t} />
      {[0, 1].map((k) => (
        <div key={k} style={{position: 'absolute', left: COL.x + 15 + k * 375, top: 760, ...rise(c(k), 80), transform: `${rise(c(k), 80).transform} rotate(${(k ? 1.5 : -1.5) * c(k)}deg)`}}>
          <Tiket jenis={k ? 'premium' : 'standar'} w={345} />
        </div>
      ))}
      {rb > 0 ? (
        <div style={{position: 'absolute', left: COL.cx - 190, top: 700, width: 380, padding: '14px 0', textAlign: 'center', ...RIBBON, fontFamily: UF.text, fontWeight: 800, fontSize: 36, transform: `${RIBBON.transform} scale(${rb})`}}>HARGA SPESIAL</div>
      ) : null}
    </div>
  );
};

// ---------- Langkah 1: masuk, buka Paket ----------
export const Langkah1: React.FC<{f: number}> = ({f}) => {
  const r = P.step1;
  const typed = (n: number, from: number) => Math.max(0, Math.min(n, Math.floor((f - from) / 1.5)));
  const ke = inP(f, P.drawer, 12);
  return (
    <Halaman f={f} r={r}>
      <AngkaBesar f={f} k={0} at={r[0]} />
      <div style={{position: 'absolute', inset: 0, opacity: inP(f, r[0] + 14, 10)}}>
        {/* halaman Masuk asli (umroh.h2c.or.id/akun/masuk, mobile) */}
        <WebLayar src="masuk.png" top={40} opacity={1 - ke}>
          {[0, 1].map((k) => (
            <div key={k} style={{position: 'absolute', left: 78, top: k ? 245 : 166, fontFamily: UF.text, fontWeight: 800, fontSize: 16, letterSpacing: 4, color: '#1f2d27'}}>
              {'•'.repeat(typed(k ? 9 : 12, P.type1 + k * 18))}
            </div>
          ))}
          <Sorot f={f} at={P.type1} until={P.type1 + 16} box={[35, 156, 320, 40]} />
          <Sorot f={f} at={P.type1 + 18} until={P.tapMasuk - 4} box={[35, 236, 320, 40]} />
        </WebLayar>
        {/* menu Paket: halaman Paket asli */}
        {ke > 0.001 ? <WebLayar src="paket-atas.png" top={0} opacity={ke} dx={(1 - ke) * 120} /> : null}
      </div>
    </Halaman>
  );
};

export const Ikon: React.FC<{id: string; size: number; color: string}> = ({id, size, color}) => {
  const st = {fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round'} as const;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {id === 'beranda' ? <path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z" {...st} /> : null}
      {id === 'paket' ? (
        <>
          <path d="M5 8h14l-1 12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1Z" {...st} />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" {...st} />
        </>
      ) : null}
      {id === 'pesanan' ? (
        <>
          <rect x="5" y="3" width="14" height="18" rx="2" {...st} />
          <path d="M9 8h6M9 12h6M9 16h4" {...st} />
        </>
      ) : null}
      {id === 'akun' ? (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" {...st} />
          <path d="M7 10h6M7 14h10" {...st} />
        </>
      ) : null}
      {id === 'simpan' ? <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" {...st} /> : null}
      {id === 'kalender' ? (
        <>
          <rect x="3" y="5" width="18" height="16" rx="2" {...st} />
          <path d="M3 10h18M8 3v4M16 3v4" {...st} />
        </>
      ) : null}
    </svg>
  );
};

// ---------- Langkah 2: pilih paket, lalu tingkat DP ----------
export const Langkah2: React.FC<{f: number}> = ({f}) => {
  const r = P.step2;
  // daftar paket asli, digulir ke Hajar Aswad Standar lalu Premium
  const top = interpolate(f, [P.premium - 4, P.premium + 12], [0, 658], {...clamp, easing: ease});
  const det = inP(f, P.tingkat - 2, 12);
  const gS = inP(f, P.standar, 8) * (1 - inP(f, P.premium, 8));
  const gP = inP(f, P.premium + 8, 8);
  return (
    <Halaman f={f} r={r}>
      <AngkaBesar f={f} k={1} at={r[0]} />
      <div style={{position: 'absolute', inset: 0, opacity: inP(f, r[0] + 14, 10)}}>
        <WebLayar src="paket-hajar-aswad.png" top={top} opacity={1 - det} masks={[[95, 130, 170, 24], [40, 162, 165, 48], [95, 788, 170, 24], [40, 820, 165, 48]]}>
          <Bingkai box={[18, 36, 354, 630]} p={gS} />
          <Bingkai box={[18, 694, 354, 630]} p={gP} />
        </WebLayar>
        {det > 0.001 ? (
          <WebLayar src="detail-standar.png" top={70} opacity={det} dx={(1 - det) * 120} masks={[[226, 165, 64, 22], [178, 184, 102, 22], [58, 269, 106, 26]]}>
            <Bingkai box={[37, 331, 316, 108]} p={inP(f, P.tingkat, 8)} />
          </WebLayar>
        ) : null}
        {det > 0.001 ? <TingkatDp f={f} /> : null}
      </div>
    </Halaman>
  );
};

// Empat tingkat DP jatuh satu per satu tepat saat disebut (lencana asli), di bawah kotak "Kupon Hajar Aswad".
const TingkatDp: React.FC<{f: number}> = ({f}) => {
  const active = P.tierOn.reduce((acc, at, i) => (f >= at ? i : acc), -1);
  return (
    <div style={{position: 'absolute', left: WIN.x + 24, width: WIN.w - 48, top: 1010, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
      {TIERS.map((t, i) => {
        const d = pop(f, P.tierOn[i]);
        const on = active === i ? 1 : 0;
        return (
          <div
            key={t.id}
            style={{
              height: 116,
              borderRadius: 24,
              boxSizing: 'border-box',
              background: on ? U.surface2 : U.surface,
              border: `3px solid ${on ? TIER_RIM[i] : U.goldLine}`,
              boxShadow: `0 20px 40px -20px rgba(0,0,0,.7)${on ? `, 0 0 0 8px ${U.goldSoft}` : ''}`,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '0 16px',
              opacity: f >= P.tierOn[i] ? 1 : 0,
              transform: `translateY(${(1 - Math.min(1, d)) * -50}px) scale(${d || 0})`,
            }}
          >
            <Lencana i={i} size={84} />
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <span style={{fontFamily: UF.text, fontWeight: 800, fontSize: 30, color: TIER_RIM[i]}}>{t.name}</span>
              <span style={{fontFamily: UF.display, fontWeight: 700, fontSize: 30, color: U.ivory}}>{t.dp}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Jendela HP berisi tangkapan web asli. top = posisi gulir (px CSS). masks = [x, y, w, h] px CSS yang dikaburkan
// (harga/tanggal sementara di situs live tidak ditampilkan). children memakai koordinat px CSS halaman.
export const WebLayar: React.FC<{src: string; top: number; opacity?: number; dx?: number; masks?: [number, number, number, number][]; children?: React.ReactNode}> = ({src, top, opacity = 1, dx = 0, masks = [], children}) => (
  <div style={{position: 'absolute', left: WIN.x, top: WIN.y, width: WIN.w, height: WIN.h, borderRadius: 44, overflow: 'hidden', border: `3px solid ${U.goldLine}`, boxShadow: '0 50px 110px -40px rgba(0,0,0,.8)', background: U.bg, opacity, transform: `translateX(${dx}px)`}}>
    <div style={{position: 'absolute', left: 0, top: 0, width: 390, transformOrigin: '0 0', transform: `scale(${WIN.k}) translateY(${-top}px)`}}>
      <Img src={staticFile(`brands/h2c-umroh/web/${src}`)} style={{width: 390, display: 'block'}} />
      {masks.map(([x, y, w, h], i) => (
        <div key={i} style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 8, backdropFilter: 'blur(7px)', WebkitBackdropFilter: 'blur(7px)', background: 'rgba(18,59,42,.55)'}} />
      ))}
      {children}
    </div>
  </div>
);

// Bingkai emas di sekitar bagian halaman (px CSS).
const Bingkai: React.FC<{box: [number, number, number, number]; p: number}> = ({box: [x, y, w, h], p}) =>
  p > 0.001 ? <div style={{position: 'absolute', left: x - 4, top: y - 4, width: w + 8, height: h + 8, borderRadius: 26, border: `3px solid ${U.gold}`, boxShadow: `0 0 0 ${8 * p}px rgba(212,175,106,${0.22 * p})`, opacity: p}} /> : null;

// Sorotan kolom isian saat diketik (px CSS).
const Sorot: React.FC<{f: number; at: number; until: number; box: [number, number, number, number]}> = ({f, at, until, box}) => {
  const p = inP(f, at, 5) * (1 - inP(f, until, 5));
  return <Bingkai box={box} p={p} />;
};

// ---------- Langkah 3: jumlah jamaah, Bayar DP, WhatsApp ----------
export const Langkah3: React.FC<{f: number}> = ({f}) => {
  const r = P.step3;
  const p = inP(f, r[0] + 14, 12);
  const n = f >= P.tapPlus ? 2 : 1;
  const bump = pop(f, P.tapPlus);
  const dp = inP(f, P.tapDp, 6);
  const wa = inP(f, P.tapWa, 8);
  return (
    <Halaman f={f} r={r}>
      <AngkaBesar f={f} k={2} at={r[0]} />
      <div style={{position: 'absolute', left: COL.x, width: COL.w, top: 500, padding: '40px 40px', ...CARD, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 34, ...rise(p, 50)}}>
        <span style={{fontFamily: UF.display, fontWeight: 700, fontSize: 52, color: U.ivory}}>Checkout</span>
        {/* jumlah jamaah */}
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <svg width={70} height={70} viewBox="0 0 24 24" fill="none" stroke={U.sage} strokeWidth={1.8} strokeLinecap="round">
            <rect x="4" y="6" width="16" height="13" rx="2" />
            <path d="M9 6V4h6v2M4 11h16" />
          </svg>
          <div style={{display: 'flex', alignItems: 'center', gap: 26, padding: '10px 14px', borderRadius: 999, border: `2px solid ${U.goldLine}`}}>
            {['−', String(n), '+'].map((c, k) => (
              <span
                key={k}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: UF.text,
                  fontWeight: 800,
                  fontSize: k === 1 ? 52 : 46,
                  color: k === 1 ? U.goldLight : U.ivory,
                  background: k === 1 ? 'transparent' : U.surface2,
                  transform: k === 1 && bump ? `scale(${bump})` : undefined,
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        {/* pembayaran */}
        <div style={{display: 'flex', gap: 22}}>
          {['Bayar DP', 'Lunas'].map((t, k) => {
            const on = k === 0 ? dp : 0;
            return (
              <div key={t} style={{flex: 1, height: 150, borderRadius: 28, boxSizing: 'border-box', border: `3px solid ${on > 0.05 ? U.gold : U.line}`, background: on > 0.05 ? U.goldSoft : 'transparent', display: 'flex', alignItems: 'center', gap: 14, padding: '0 20px', transform: `scale(${1 + 0.03 * on})`}}>
                <span style={{width: 40, height: 40, borderRadius: '50%', border: `4px solid ${on > 0.05 ? U.gold : U.sage}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <span style={{width: 18 * on, height: 18 * on, borderRadius: '50%', background: U.gold}} />
                </span>
                <span style={{fontFamily: UF.text, fontWeight: 800, fontSize: 36, whiteSpace: 'nowrap', color: on > 0.05 ? U.goldLight : U.ivory2}}>{t}</span>
                {k === 0 ? <Lencana i={0} size={46} style={{marginLeft: 'auto', opacity: on}} /> : null}
              </div>
            );
          })}
        </div>
        {/* WhatsApp */}
        <div style={{height: 120, borderRadius: 28, boxSizing: 'border-box', border: `3px solid ${wa > 0.05 ? U.gold : U.line}`, display: 'flex', alignItems: 'center', gap: 22, padding: '0 28px', boxShadow: `0 0 0 ${12 * wa}px ${U.goldSoft}`}}>
          <span style={{width: 74, height: 74, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <IkonWa size={42} color="#FFFFFF" />
          </span>
          <span style={{fontFamily: UF.text, fontWeight: 700, fontSize: 40, color: U.ivory, letterSpacing: 1}}>0812-0000-0000</span>
          <Contoh style={{marginLeft: 'auto'}} />
        </div>
      </div>
    </Halaman>
  );
};

// ---------- Langkah 4: Checkout & bayar, sisanya dicicil ----------
export const Langkah4: React.FC<{f: number}> = ({f}) => {
  const r = P.step4;
  const btn = inP(f, r[0] + 14, 12) * (1 - inP(f, P.paid, 10));
  const press = interpolate(f, [P.tapCheckout - 3, P.tapCheckout, P.tapCheckout + 6], [0, 1, 0], clamp);
  const paid = inP(f, P.paid, 12);
  const chk = pop(f, P.paid + 6);
  const sisa = inP(f, P.sisa, 12);
  const fill = interpolate(f, [P.cicil, P.cicil + 60], [0.12, 0.72], {...clamp, easing: ease});
  const chips = [0, 1, 2].map((k) => pop(f, P.cicil + 4 + k * 12));
  return (
    <Halaman f={f} r={r}>
      <AngkaBesar f={f} k={3} at={r[0]} />
      {btn > 0.001 ? (
        <div style={{position: 'absolute', left: COL.cx - 300, top: 832, opacity: btn, transform: `scale(${0.9 + 0.1 * btn})`}}>
          <Tombol text="Checkout & bayar" w={600} h={110} fs={42} press={press} />
        </div>
      ) : null}
      {paid > 0.001 ? (
        <div style={{position: 'absolute', inset: 0, opacity: paid}}>
          {/* layar bayar generik tanpa merek */}
          <div style={{position: 'absolute', left: COL.x + 75, width: COL.w - 150, top: 500, height: 380, ...CARD, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, transform: `translateY(${(1 - paid) * 40}px)`}}>
            <div style={{width: 170, height: 170, borderRadius: '50%', background: U.leaf, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${chk})`, boxShadow: `0 0 0 18px rgba(140,198,63,.18)`}}>
              <svg width={96} height={96} viewBox="0 0 24 24" fill="none" stroke={U.bg} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </div>
            <span style={{fontFamily: UF.text, fontWeight: 800, fontSize: 44, color: U.ivory}}>DP</span>
          </div>
          {/* sisa pelunasan dicicil */}
          <div style={{position: 'absolute', left: COL.x, width: COL.w, top: 940, opacity: sisa, transform: `translateY(${(1 - sisa) * 40}px)`}}>
            <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: UF.text, fontWeight: 700, fontSize: 32, color: U.sage, marginBottom: 16}}>
              <span>Sisa</span>
              <span style={{color: U.leafLight}}>cicil</span>
            </div>
            <div style={{height: 46, borderRadius: 999, background: U.surface, border: `2px solid ${U.goldLine}`, overflow: 'hidden'}}>
              <div style={{width: `${fill * 100}%`, height: '100%', borderRadius: 999, background: `linear-gradient(90deg, ${U.gold}, ${U.leaf})`}} />
            </div>
            <div style={{display: 'flex', justifyContent: 'center', gap: 22, marginTop: 34}}>
              {chips.map((c, k) => (
                <div key={k} style={{padding: '16px 26px', borderRadius: 999, border: `2px solid ${U.gold}`, background: U.goldSoft, fontFamily: UF.display, fontWeight: 700, fontSize: 40, color: U.goldLight, transform: `scale(${c})`, opacity: c > 0 ? 1 : 0}}>
                  +10.000
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </Halaman>
  );
};

// ---------- Langkah 5: kode kupon muncul di Pesanan ----------
const KODE = 'UND-8F3K2Q7M';
export const Langkah5: React.FC<{f: number}> = ({f}) => {
  const r = P.step5;
  const p = inP(f, r[0] + 14, 12);
  const cek = pop(f, P.dicek);
  const kodeN = Math.max(0, Math.min(KODE.length, Math.floor((f - P.kode) / 1.6)));
  const shine = interpolate(f, [P.kode + 22, P.kode + 46], [-0.3, 1.3], clamp);
  const ps = inP(f, P.pesanan, 8);
  const sv = pop(f, P.simpan + 2);
  return (
    <Halaman f={f} r={r}>
      <AngkaBesar f={f} k={4} at={r[0]} />
      <div style={{position: 'absolute', left: COL.x, width: COL.w, top: STAGE.y + 20, display: 'flex', alignItems: 'center', gap: 20, ...rise(p, 20)}}>
        <div style={{width: 84, height: 84, borderRadius: 24, background: ps > 0.05 ? U.surface2 : U.surface, border: `3px solid ${ps > 0.05 ? U.gold : U.goldLine}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + 0.08 * ps})`}}>
          <Ikon id="pesanan" size={50} color={ps > 0.05 ? U.goldLight : U.sage} />
        </div>
        <span style={{fontFamily: UF.display, fontWeight: 700, fontSize: 52, color: U.ivory}}>Pesanan</span>
      </div>
      {/* kartu kupon (kp-card) */}
      <div style={{position: 'absolute', left: COL.x, width: COL.w, top: 640, padding: '44px 40px', ...CARD, border: `3px solid ${kodeN > 0 ? TIER_RIM[0] : U.goldLine}`, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 30, overflow: 'hidden', ...rise(inP(f, r[0] + 22, 12), 60)}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
          <Lencana i={0} size={110} />
          <span style={{fontFamily: UF.display, fontWeight: 700, fontSize: 56, color: U.ivory}}>Kupon Silver</span>
          <div style={{marginLeft: 'auto', width: 74, height: 74, borderRadius: '50%', background: cek > 0 ? U.leaf : 'transparent', border: `3px solid ${cek > 0 ? U.leaf : U.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${cek > 0 ? cek : 1})`}}>
            {cek > 0 ? (
              <svg width={44} height={44} viewBox="0 0 24 24" fill="none" stroke={U.bg} strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            ) : (
              <span style={{fontSize: 34, color: U.sage}}>⧗</span>
            )}
          </div>
        </div>
        <div style={{position: 'relative', height: 150, borderRadius: 26, background: U.bg2, border: `2px dashed ${U.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
          <span style={{fontFamily: UF.text, fontWeight: 800, fontSize: 66, letterSpacing: 4, color: U.goldLight}}>
            {KODE.slice(0, kodeN)}
            <span style={{opacity: 0.25}}>{kodeN > 0 ? '' : '•••-••••••••'}</span>
          </span>
          <div style={{position: 'absolute', top: 0, bottom: 0, width: 120, left: `${shine * 100}%`, background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,248,234,.35), rgba(255,255,255,0))', transform: 'skewX(-20deg)'}} />
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Contoh />
          <div style={{width: 96, height: 96, borderRadius: '50%', background: sv > 0 ? U.gold : U.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${sv > 0 ? sv : 1})`}}>
            <Ikon id="simpan" size={52} color={sv > 0 ? U.bg : U.sage} />
          </div>
        </div>
      </div>
    </Halaman>
  );
};
