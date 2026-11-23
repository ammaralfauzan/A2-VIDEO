import React from 'react';
import {Img, interpolate, staticFile} from 'remotion';
import {BIG_GRADIENT, BTN, GOLD_LEAF, RIBBON, U, UF} from '../../brands/h2c-umroh/theme';
import {clamp, ease} from '../../components/motion';
import {
  ADDR_H,
  BOX,
  BOX_X0,
  CONTENT_Y,
  COPY_MENU,
  DATA,
  EYE,
  F,
  FIELD_H,
  FRAME,
  HEADER_BTN,
  IN_W,
  IN_X,
  MAIL,
  P,
  PASTE_MENU,
  Screen,
  SCREENS,
  TAB1,
  TAB2,
  TABS_H,
  TYPE,
} from './layout';

// Replika web umroh H2C (tampilan HP) di dalam jendela peramban dengan dua tab: "H2C Wisata Mandiri" dan "Email".
// Semua elemen memakai koordinat global 1080x1920 (lapisan dalam digeser -FRAME.x/-FRAME.y).
// Data fiktif. Aplikasi email generik tanpa merek pihak ketiga.

type TypeSpec = {from: number; text: string; cpf: number};
// Ketikan tidak rata seperti orang sungguhan (jeda acak tetap per huruf).
export const typed = (f: number, s: TypeSpec) => {
  let t = s.from;
  let n = 0;
  for (let i = 0; i < s.text.length; i++) {
    const jitter = ((i * 7919) % 5) * 0.35 + (s.text[i] === '@' || s.text[i] === '.' ? 2 : 0);
    t += 1 / s.cpf + jitter;
    if (f >= t) n = i + 1;
  }
  return s.text.slice(0, n);
};
export const typedEnd = (s: TypeSpec) => {
  let t = s.from;
  for (let i = 0; i < s.text.length; i++) t += 1 / s.cpf + ((i * 7919) % 5) * 0.35 + (s.text[i] === '@' || s.text[i] === '.' ? 2 : 0);
  return Math.ceil(t);
};

const A = (style: React.CSSProperties): React.CSSProperties => ({position: 'absolute', ...style});
const lab: React.CSSProperties = {fontFamily: UF.text, fontWeight: 700, fontSize: 24, color: U.sage, letterSpacing: 0.3};

const Field: React.FC<{
  f: number;
  y: number;
  label: string;
  value: string;
  placeholder: string;
  focusFrom: number;
  focusTo: number;
  password?: boolean;
  shown?: boolean;
  eye?: boolean;
  eyePulse?: number;
}> = ({f, y, label, value, placeholder, focusFrom, focusTo, password, shown, eye, eyePulse = 0}) => {
  const fIn = interpolate(f, [focusFrom, focusFrom + 6], [0, 1], {...clamp, easing: ease});
  const fOut = interpolate(f, [focusTo, focusTo + 8], [0, 1], {...clamp, easing: ease});
  const focus = fIn * (1 - fOut);
  const caretOn = focus > 0.5 && Math.floor(f / 9) % 2 === 0;
  const shownValue = password && !shown ? '•'.repeat(value.length) : value;
  const e = EYE(y);
  return (
    <>
      <div style={A({left: IN_X, top: y - 36, ...lab})}>{label}</div>
      <div
        style={A({
          left: IN_X,
          top: y,
          width: IN_W,
          height: FIELD_H,
          borderRadius: 24,
          background: U.bg2,
          border: `${focus > 0.02 ? 6 : 3}px solid ${focus > 0.02 ? U.goldLight : U.goldLine}`,
          boxShadow: focus > 0.02 ? `0 0 0 ${7 * focus}px rgba(212,175,106,${0.3 * focus})` : 'none',
          boxSizing: 'border-box',
        })}
      />
      <div
        style={A({
          left: IN_X + 28,
          top: y,
          height: FIELD_H,
          display: 'flex',
          alignItems: 'center',
          fontFamily: UF.text,
          fontWeight: 600,
          fontSize: password && !shown && value ? 34 : 30,
          letterSpacing: password && !shown ? 3 : 0,
          color: value ? U.ivory : 'rgba(159,179,166,.6)',
          whiteSpace: 'nowrap',
        })}
      >
        {value ? shownValue : placeholder}
        <span style={{display: 'inline-block', width: 3, height: 36, marginLeft: 3, background: U.gold, opacity: caretOn ? 1 : 0}} />
      </div>
      {eye ? (
        <svg width={56} height={56} viewBox="0 0 24 24" style={A({left: e.x - 28, top: e.y - 28})}>
          <circle cx={12} cy={12} r={11.5} fill={`rgba(212,175,106,${0.18 * eyePulse})`} />
          <path d="M2.5 12 C5 7 8.5 5 12 5 C15.5 5 19 7 21.5 12 C19 17 15.5 19 12 19 C8.5 19 5 17 2.5 12 Z" fill="none" stroke={shown ? U.gold : U.sage} strokeWidth={1.8} strokeLinejoin="round" />
          <circle cx={12} cy={12} r={3.2} fill={shown ? U.gold : U.sage} />
          {shown ? null : <line x1={4} y1={4} x2={20} y2={20} stroke={U.sage} strokeWidth={1.8} strokeLinecap="round" />}
        </svg>
      ) : null}
    </>
  );
};

const GoldButton: React.FC<{f: number; y: number; h: number; label: string; press: number}> = ({f, y, h, label, press}) => {
  const p = interpolate(f, [press - 3, press, press + 7], [0, 1, 0], clamp);
  return (
    <div
      style={A({
        left: IN_X,
        top: y,
        width: IN_W,
        height: h,
        ...BTN,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: UF.text,
        fontWeight: 700,
        fontSize: 34,
        transform: `scale(${1 - p * 0.04})`,
        boxShadow: '0 18px 40px -18px rgba(212,175,106,.7)',
      })}
    >
      {label}
    </div>
  );
};

const Title: React.FC<{title: string; sub: string}> = ({title, sub}) => (
  <>
    <div style={A({left: IN_X, top: 456, fontFamily: UF.display, fontWeight: 700, fontSize: 58, lineHeight: 1.1, color: U.ivory})}>{title}</div>
    <div style={A({left: IN_X, top: 536, width: IN_W, fontFamily: UF.text, fontWeight: 500, fontSize: 27, lineHeight: 1.35, color: U.ivory2})}>{sub}</div>
  </>
);

const SiteHeader: React.FC<{f: number}> = ({f}) => {
  const p = interpolate(f, [P.clickDaftar1 - 3, P.clickDaftar1, P.clickDaftar1 + 7], [0, 1, 0], clamp);
  const hover = interpolate(f, [P.clickDaftar1 - 14, P.clickDaftar1 - 6], [0, 1], clamp);
  return (
    <>
      <Img src={staticFile('brands/h2c-umroh/logo.jpeg')} style={A({left: IN_X - 4, top: 458, width: 64, height: 64, borderRadius: '50%', border: `2px solid ${U.goldLine}`})} />
      <div style={A({left: IN_X + 72, top: 462, fontFamily: UF.text, fontWeight: 700, fontSize: 26, color: U.ivory, lineHeight: 1.1})}>H2C</div>
      <div style={A({left: IN_X + 72, top: 492, fontFamily: UF.text, fontWeight: 600, fontSize: 20, color: U.sage, lineHeight: 1.1})}>Wisata Mandiri</div>
      <div
        style={A({
          left: HEADER_BTN.masuk.x,
          top: HEADER_BTN.masuk.y,
          width: HEADER_BTN.masuk.w,
          height: HEADER_BTN.masuk.h,
          borderRadius: 999,
          border: `2px solid ${U.goldLine}`,
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: UF.text,
          fontWeight: 700,
          fontSize: 24,
          color: U.ivory,
        })}
      >
        Masuk
      </div>
      <div
        style={A({
          left: HEADER_BTN.daftar.x,
          top: HEADER_BTN.daftar.y,
          width: HEADER_BTN.daftar.w,
          height: HEADER_BTN.daftar.h,
          ...BTN,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: UF.text,
          fontWeight: 700,
          fontSize: 24,
          transform: `scale(${1 + hover * 0.05 - p * 0.08})`,
          boxShadow: hover > 0 ? `0 0 0 ${8 * hover}px rgba(212,175,106,.25)` : 'none',
        })}
      >
        Daftar
      </div>
    </>
  );
};

const Beranda: React.FC<{f: number}> = ({f}) => (
  <>
    <SiteHeader f={f} />
    <div style={A({left: IN_X, top: 572, display: 'flex', alignItems: 'center', gap: 12, padding: '10px 22px 10px 16px', borderRadius: 999, border: `2px solid ${U.goldLine}`, fontFamily: UF.text, fontWeight: 700, fontSize: 22, color: U.ivory})}>
      <span style={{width: 12, height: 12, borderRadius: '50%', background: U.gold, boxShadow: `0 0 0 6px ${U.goldSoft}`}} />
      Umroh Aman &amp; Amanah
    </div>
    <div style={A({left: IN_X, top: 640, fontFamily: UF.script, fontSize: 80, lineHeight: 1, color: U.ivory})}>Niat baik,</div>
    <div style={A({left: IN_X, top: 728, fontFamily: UF.big, fontSize: 104, lineHeight: 0.95, textTransform: 'uppercase', whiteSpace: 'nowrap', background: BIG_GRADIENT, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'})}>Umroh Tenang</div>
    <div style={A({left: IN_X, top: 846, ...RIBBON, fontFamily: UF.script, fontSize: 44, lineHeight: 1, padding: '4px 24px 10px'})}>dari niat sampai pulang</div>
    <div style={A({left: IN_X, top: 936, width: IN_W, fontFamily: UF.text, fontWeight: 500, fontSize: 28, lineHeight: 1.45, color: U.ivory2})}>Melayani dengan sepenuh hati, dari niat sampai pulang ke rumah.</div>
    <div style={A({left: IN_X, top: 1070, ...BTN, padding: '20px 40px', fontFamily: UF.text, fontWeight: 700, fontSize: 28})}>Lihat Paket Umroh</div>
    <div style={A({left: FRAME.x, top: FRAME.y + FRAME.h - 8, width: FRAME.w * 0.6, height: 8, background: GOLD_LEAF})} />
  </>
);

const Daftar: React.FC<{f: number}> = ({f}) => {
  const shown = f >= P.clickEye + 2;
  return (
    <>
      <Title title="Buat Akun" sub="Daftar sekali, lalu masuk kapan saja." />
      <Field f={f} y={F.nama.y} label="Nama Lengkap" value={typed(f, TYPE.nama)} placeholder="Nama sesuai KTP" focusFrom={P.clickNama} focusTo={P.clickEmail - 2} />
      <Field f={f} y={F.email.y} label="Email" value={typed(f, TYPE.email)} placeholder="nama@email.com" focusFrom={P.clickEmail} focusTo={P.clickPass - 2} />
      <Field
        f={f}
        y={F.pass.y}
        label="Password"
        value={typed(f, TYPE.pass)}
        placeholder="Minimal 8 huruf atau angka"
        focusFrom={P.clickPass}
        focusTo={P.clickDaftar2 - 4}
        password
        shown={shown}
        eye
        eyePulse={interpolate(f, [P.eyeHint, P.eyeHint + 8, P.clickEye + 10, P.clickEye + 20], [0, 1, 1, 0], clamp)}
      />
      <GoldButton f={f} y={F.daftarBtn.y} h={F.daftarBtn.h} label="Daftar" press={P.clickDaftar2} />
      <div style={A({left: IN_X, top: 1176, width: IN_W, textAlign: 'center', fontFamily: UF.text, fontWeight: 600, fontSize: 24, color: U.sage})}>
        Sudah punya akun? <span style={{color: U.goldLight}}>Masuk</span>
      </div>
    </>
  );
};

// Menu kecil gelap seperti menu salin/tempel di HP; berkedip emas saat ditekan.
const Menu: React.FC<{label: string; box: {x: number; y: number; w: number; h: number}; p: number; press: number; f: number}> = ({label, box, p, press, f}) => {
  const hit = interpolate(f, [press - 2, press, press + 6], [0, 1, 0], clamp);
  return (
    <div
      style={A({
        left: box.x,
        top: box.y + (1 - p) * 10,
        width: box.w,
        height: box.h,
        borderRadius: 18,
        background: hit > 0.3 ? U.gold : U.bg,
        border: `2px solid ${U.gold}`,
        boxSizing: 'border-box',
        opacity: p,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: UF.text,
        fontWeight: 700,
        fontSize: 32,
        color: hit > 0.3 ? U.bg : U.ivory,
        boxShadow: '0 16px 34px -12px rgba(0,0,0,.55)',
      })}
    >
      {label}
    </div>
  );
};

const Kode: React.FC<{f: number}> = ({f}) => {
  const n = f < P.digitsFrom ? 0 : Math.min(6, 1 + Math.floor(((f - P.digitsFrom) / Math.max(1, P.digitsTo - P.digitsFrom)) * 6));
  const doneP = interpolate(f, [P.digitsTo + 2, P.digitsTo + 10], [0, 1], {...clamp, easing: ease});
  const focusBox = f >= P.clickBox ? Math.min(5, n) : -1;
  const notif = interpolate(f, [P.notif, P.notif + 8, P.clickTabMail - 4, P.clickTabMail + 2], [0, 1, 1, 0], {...clamp, easing: ease});
  const pasteMenu = interpolate(f, [P.clickBox + 3, P.clickBox + 9, P.pasteClick + 4, P.pasteClick + 10], [0, 1, 1, 0], clamp);
  return (
    <>
      <Title title="Masukkan Kode" sub="Kode 6 angka sudah dikirim ke email Anda." />
      {Array.from({length: 6}).map((_, i) => {
        const filled = i < n;
        const pop = filled ? interpolate(f, [P.digitsFrom + (i * (P.digitsTo - P.digitsFrom)) / 6, P.digitsFrom + (i * (P.digitsTo - P.digitsFrom)) / 6 + 6], [0, 1], clamp) : 0;
        const active = i === focusBox && n < 6;
        return (
          <div
            key={i}
            style={A({
              left: BOX_X0 + i * (BOX.w + BOX.gap),
              top: BOX.y,
              width: BOX.w,
              height: BOX.h,
              borderRadius: 24,
              background: U.bg2,
              border: `3px solid ${doneP > 0.5 ? U.leaf : active || filled ? U.gold : U.goldLine}`,
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: UF.big,
              fontSize: 60,
              color: U.goldLight,
              boxShadow: active ? '0 0 0 8px rgba(212,175,106,.2)' : 'none',
            })}
          >
            <span style={{transform: `scale(${0.6 + 0.4 * pop})`, opacity: pop}}>{filled ? DATA.kode[i] : ''}</span>
          </div>
        );
      })}
      <GoldButton f={f} y={862} h={84} label="Verifikasi" press={-99} />
      <div style={A({left: IN_X, top: 976, width: IN_W, textAlign: 'center', fontFamily: UF.text, fontWeight: 600, fontSize: 24, color: U.sage})}>
        Belum dapat kode? <span style={{color: U.goldLight}}>Kirim ulang</span>
      </div>
      {doneP > 0 ? (
        <div style={A({left: 540 - 44, top: 1060, width: 88, height: 88, borderRadius: '50%', background: U.leaf, transform: `scale(${doneP})`, display: 'flex', alignItems: 'center', justifyContent: 'center'})}>
          <svg width={50} height={50} viewBox="0 0 24 24">
            <path d="M5 12.5 L10 17 L19 7" fill="none" stroke={U.bg} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ) : null}
      {pasteMenu > 0 ? <Menu label="Tempel" box={PASTE_MENU} p={pasteMenu} press={P.pasteClick} f={f} /> : null}
      {notif > 0 ? (
        <div style={A({left: IN_X, top: 1110 + (1 - notif) * 30, width: IN_W, height: 100, borderRadius: 999, background: U.surface2, border: `2px solid ${U.goldLine}`, boxSizing: 'border-box', opacity: notif, display: 'flex', alignItems: 'center', gap: 18, padding: '0 28px'})}>
          <MailIcon size={44} color={U.gold} />
          <div style={{fontFamily: UF.text, fontWeight: 700, fontSize: 26, color: U.ivory}}>
            Email baru: <span style={{color: U.goldLight}}>H2C Travel</span>
          </div>
        </div>
      ) : null}
    </>
  );
};

const MailIcon: React.FC<{size: number; color: string}> = ({size, color}) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <rect x={2.5} y={5} width={19} height={14} rx={3.5} fill="none" stroke={color} strokeWidth={2} />
    <path d="M3.5 7 L12 13 L20.5 7" fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

// Aplikasi email generik (latar gading agar beda dari situs H2C).
const Email: React.FC<{f: number}> = ({f}) => {
  const open = f >= P.clickItem + 4;
  const openP = interpolate(f, [P.clickItem + 4, P.clickItem + 12], [0, 1], {...clamp, easing: ease});
  const spam = interpolate(f, [P.spam - 2, P.spam + 4, P.spam + 12, P.spam + 20], [0, 1, 1, 0], clamp);
  const hover = interpolate(f, [P.clickItem - 10, P.clickItem - 4], [0, 1], clamp);
  const sel = interpolate(f, [P.selFrom, P.selTo], [0, 1], clamp);
  const menu = interpolate(f, [P.selTo - 2, P.selTo + 4, P.copyClick + 4, P.copyClick + 10], [0, 1, 1, 0], clamp);
  const toast = interpolate(f, [P.copyClick + 4, P.copyClick + 10, P.clickTabH2C - 6, P.clickTabH2C], [0, 1, 1, 0], {...clamp, easing: ease});
  const ink = U.bg;
  const pill = (label: string, x: number, w: number, active: boolean, glow = 0) => (
    <div
      style={A({
        left: x,
        top: MAIL.pillsY,
        width: w,
        height: 64,
        borderRadius: 999,
        background: active ? U.surface : glow > 0 ? `rgba(212,175,106,${0.25 + 0.5 * glow})` : 'rgba(10,31,23,.06)',
        border: `2px solid ${glow > 0 ? U.goldDeep : 'rgba(10,31,23,.12)'}`,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: UF.text,
        fontWeight: 700,
        fontSize: 25,
        color: active ? U.ivory : ink,
        transform: `scale(${1 + glow * 0.06})`,
      })}
    >
      {label}
    </div>
  );
  return (
    <>
      <div style={A({left: FRAME.x, top: CONTENT_Y, width: FRAME.w, height: FRAME.y + FRAME.h - CONTENT_Y, background: U.ivory})} />
      {pill('Kotak Masuk', IN_X, 220, true)}
      {pill('Spam', IN_X + 236, 130, false, spam)}
      {!open || openP < 1 ? (
        <div style={{opacity: 1 - openP}}>
          {[
            {from: 'H2C Travel', sub: 'Kode verifikasi akun Anda', bold: true},
            {from: 'Info Toko', sub: 'Katalog minggu ini', bold: false},
            {from: 'Keluarga', sub: 'Foto acara kemarin', bold: false},
          ].map((m, i) => (
            <div key={i} style={A({left: FRAME.x + 16, top: MAIL.itemY + i * MAIL.itemH, width: FRAME.w - 32, height: MAIL.itemH - 10, borderRadius: 24, background: i === 0 ? `rgba(212,175,106,${0.12 + 0.2 * hover})` : 'transparent'})}>
              <div style={A({left: 24, top: 26, width: 60, height: 60, borderRadius: '50%', background: i === 0 ? U.surface : 'rgba(10,31,23,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: UF.text, fontWeight: 700, fontSize: 26, color: i === 0 ? U.gold : ink})}>
                {m.from[0]}
              </div>
              <div style={A({left: 104, top: 20, fontFamily: UF.text, fontWeight: 700, fontSize: 28, color: ink, opacity: m.bold ? 1 : 0.55})}>{m.from}</div>
              <div style={A({left: 104, top: 60, fontFamily: UF.text, fontWeight: m.bold ? 700 : 500, fontSize: 24, color: ink, opacity: m.bold ? 0.85 : 0.45})}>{m.sub}</div>
              {m.bold ? <div style={A({right: 28, top: 46, width: 16, height: 16, borderRadius: '50%', background: U.goldDeep})} /> : null}
            </div>
          ))}
        </div>
      ) : null}
      {open ? (
        <div style={{opacity: openP}}>
          <div style={A({left: IN_X, top: MAIL.itemY + 6, width: IN_W, fontFamily: UF.text, fontWeight: 700, fontSize: 32, lineHeight: 1.25, color: ink})}>Kode verifikasi akun Anda</div>
          <Img src={staticFile('brands/h2c-umroh/logo.jpeg')} style={A({left: IN_X, top: MAIL.itemY + 66, width: 52, height: 52, borderRadius: '50%'})} />
          <div style={A({left: IN_X + 66, top: MAIL.itemY + 76, fontFamily: UF.text, fontWeight: 700, fontSize: 25, color: ink})}>H2C Travel</div>
          <div style={A({left: IN_X, top: MAIL.itemY + 150, width: IN_W, fontFamily: UF.text, fontWeight: 500, fontSize: 26, lineHeight: 1.4, color: ink, opacity: 0.8})}>Assalamu&apos;alaikum. Ini kode verifikasi akun Anda:</div>
          <div style={A({left: IN_X, top: MAIL.codeY, width: IN_W, height: 136, borderRadius: 28, background: 'rgba(10,31,23,.06)', border: `2px solid rgba(10,31,23,.12)`, boxSizing: 'border-box'})} />
          <div style={A({left: 540 - (IN_W - 80) / 2, top: MAIL.codeY + 24, width: (IN_W - 80) * sel, height: 88, borderRadius: 14, background: 'rgba(212,175,106,.45)'})} />
          <div style={A({left: IN_X, top: MAIL.codeY + 18, width: IN_W, textAlign: 'center', fontFamily: UF.big, fontSize: 84, letterSpacing: 22, lineHeight: 1.15, color: ink})}>{DATA.kode}</div>
          <div style={A({left: IN_X, top: MAIL.codeY + 150, width: IN_W, textAlign: 'right', fontFamily: UF.text, fontWeight: 600, fontSize: 22, color: ink, opacity: 0.5})}>contoh</div>
          <div style={A({left: IN_X, top: MAIL.codeY + 200, width: IN_W, fontFamily: UF.text, fontWeight: 500, fontSize: 24, lineHeight: 1.4, color: ink, opacity: 0.6})}>Jangan bagikan kode ini kepada siapa pun.</div>
        </div>
      ) : null}
      {menu > 0 ? <Menu label="Salin" box={COPY_MENU} p={menu} press={P.copyClick} f={f} /> : null}
      {toast > 0 ? (
        <div style={A({left: IN_X + 60, top: 1130 + (1 - toast) * 24, width: IN_W - 120, height: 84, borderRadius: 999, background: U.bg, opacity: toast, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontFamily: UF.text, fontWeight: 700, fontSize: 28, color: U.ivory})}>
          <span style={{width: 34, height: 34, borderRadius: '50%', background: U.leaf, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <svg width={22} height={22} viewBox="0 0 24 24"><path d="M5 12.5 L10 17 L19 7" fill="none" stroke={U.bg} strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          Kode disalin
        </div>
      ) : null}
    </>
  );
};

const Masuk: React.FC<{f: number}> = ({f}) => (
  <>
    <Title title="Masuk" sub="Cukup email dan password Anda." />
    <Field f={f} y={F.mEmail.y} label="Email" value={typed(f, TYPE.mEmail)} placeholder="nama@email.com" focusFrom={P.clickMEmail} focusTo={P.clickMPass - 2} />
    <Field f={f} y={F.mPass.y} label="Password" value={typed(f, TYPE.mPass)} placeholder="Password Anda" focusFrom={P.clickMPass} focusTo={P.clickMasuk - 4} password eye />
    <GoldButton f={f} y={F.masukBtn.y} h={F.masukBtn.h} label="Masuk" press={P.clickMasuk} />
    <div style={A({left: IN_X, top: 1032, width: IN_W, textAlign: 'center', fontFamily: UF.text, fontWeight: 600, fontSize: 24, color: U.sage})}>
      Belum punya akun? <span style={{color: U.goldLight}}>Daftar</span>
    </div>
  </>
);

const Akun: React.FC<{f: number}> = ({f}) => {
  const chip = (label: string, x: number, w: number, at: number) => {
    const p = interpolate(f, [at - 2, at + 6], [0, 1], {...clamp, easing: ease});
    return (
      <div
        style={A({
          left: x,
          top: 1010,
          width: w,
          height: 76,
          borderRadius: 999,
          background: p > 0.5 ? U.gold : 'transparent',
          border: `3px solid ${p > 0.02 ? U.gold : U.goldLine}`,
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: UF.text,
          fontWeight: 700,
          fontSize: 30,
          color: p > 0.5 ? U.bg : U.sage,
          transform: `scale(${1 + 0.08 * Math.sin(Math.PI * p)})`,
          boxShadow: p > 0.5 ? '0 0 0 10px rgba(212,175,106,.18)' : 'none',
        })}
      >
        {label}
      </div>
    );
  };
  const lp = interpolate(f, [P.chipLangsung, P.chipLangsung + 8], [0, 1], {...clamp, easing: ease});
  return (
    <>
      <div style={A({left: IN_X, top: 450, fontFamily: UF.script, fontSize: 66, lineHeight: 1.1, color: U.ivory})}>Assalamu&apos;alaikum,</div>
      <div style={A({left: IN_X, top: 532, fontFamily: UF.display, fontWeight: 700, fontSize: 56, color: U.goldLight})}>Bapak Ahmad</div>
      <div style={A({left: IN_X, top: 640, width: IN_W, height: 300, borderRadius: 44, background: U.surface, border: `2px solid ${U.goldLine}`, boxSizing: 'border-box'})} />
      <div style={A({left: IN_X + 36, top: 666, ...lab})}>AKUN SAYA</div>
      {['Paket Umroh', 'Pesanan Saya', 'Profil'].map((t, i) => (
        <div key={t} style={A({left: IN_X + 36, top: 716 + i * 70, fontFamily: UF.text, fontWeight: 600, fontSize: 30, color: U.ivory})}>
          <span style={{display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: U.gold, marginRight: 18, verticalAlign: 'middle'}} />
          {t}
        </div>
      ))}
      {chip('Email', IN_X + 40, 250, P.chipEmail)}
      <div style={A({left: 540 - 15, top: 1020, fontFamily: UF.text, fontWeight: 700, fontSize: 44, color: U.gold})}>+</div>
      {chip('Password', IN_X + IN_W - 290, 250, P.chipPass)}
      <div style={A({left: IN_X, top: 1118, width: IN_W, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: lp, transform: `translateY(${(1 - lp) * 10}px)`})}>
        <div style={{width: 46, height: 46, borderRadius: '50%', background: U.leaf, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg width={28} height={28} viewBox="0 0 24 24">
            <path d="M5 12.5 L10 17 L19 7" fill="none" stroke={U.bg} strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span style={{fontFamily: UF.text, fontWeight: 700, fontSize: 32, color: U.leafLight}}>Langsung masuk</span>
      </div>
    </>
  );
};

const renderScreen = (s: Screen, f: number) => {
  switch (s) {
    case 'beranda':
      return <Beranda f={f} />;
    case 'daftar':
      return <Daftar f={f} />;
    case 'kode':
      return <Kode f={f} />;
    case 'email':
      return <Email f={f} />;
    case 'masuk':
      return <Masuk f={f} />;
    case 'akun':
      return <Akun f={f} />;
  }
};

const URL_OF: Record<Screen, string> = {
  beranda: 'umroh.h2c.or.id',
  daftar: 'umroh.h2c.or.id/daftar',
  kode: 'umroh.h2c.or.id/verifikasi',
  email: 'Kotak Masuk',
  masuk: 'umroh.h2c.or.id/masuk',
  akun: 'umroh.h2c.or.id/akun',
};

export const screenIndex = (f: number) => {
  let i = 0;
  while (i < SCREENS.length - 1 && SCREENS[i + 1][0] <= f) i++;
  return i;
};

export const Layar: React.FC<{f: number}> = ({f}) => {
  const i = screenIndex(f);
  const [start, cur] = SCREENS[i];
  const prev = i > 0 ? SCREENS[i - 1][1] : null;
  const outP = interpolate(f, [start, start + 5], [1, 0], clamp);
  const inP = interpolate(f, [start + 3, start + 10], [0, 1], {...clamp, easing: ease});
  const mailTab = cur === 'email';
  const tab = (x: number, w: number, active: boolean, icon: React.ReactNode, label: string) => (
    <div
      style={A({
        left: x,
        top: FRAME.y + 10,
        width: w,
        height: TABS_H - 10,
        borderRadius: '22px 22px 0 0',
        background: active ? U.surface2 : 'transparent',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '0 18px',
        boxSizing: 'border-box',
        fontFamily: UF.text,
        fontWeight: 700,
        fontSize: 22,
        color: active ? U.ivory : U.sage,
        whiteSpace: 'nowrap',
      })}
    >
      {icon}
      {label}
    </div>
  );
  return (
    <div style={A({left: FRAME.x, top: FRAME.y, width: FRAME.w, height: FRAME.h, borderRadius: 44, overflow: 'hidden', background: U.bg, border: `2px solid ${U.goldLine}`, boxShadow: '0 40px 100px -40px rgba(0,0,0,.7)'})}>
      <div style={A({left: -FRAME.x - 2, top: -FRAME.y - 2, width: 1080, height: 1920})}>
        {/* bilah tab */}
        <div style={A({left: FRAME.x, top: FRAME.y, width: FRAME.w, height: TABS_H, background: U.bg2})} />
        {tab(TAB1.x, TAB1.w, !mailTab, <Img src={staticFile('brands/h2c-umroh/logo.jpeg')} style={{width: 30, height: 30, borderRadius: '50%'}} />, 'H2C Wisata Mandiri')}
        {tab(TAB2.x, TAB2.w, mailTab, <MailIcon size={30} color={mailTab ? U.gold : U.sage} />, 'Email')}
        {/* bilah alamat */}
        <div style={A({left: FRAME.x, top: FRAME.y + TABS_H, width: FRAME.w, height: ADDR_H, background: U.surface2})} />
        <div style={A({left: FRAME.x + 18, top: FRAME.y + TABS_H + 8, width: FRAME.w - 36, height: ADDR_H - 16, borderRadius: 999, background: U.bg2, display: 'flex', alignItems: 'center', gap: 12, padding: '0 22px', boxSizing: 'border-box', fontFamily: UF.text, fontWeight: 600, fontSize: 22, color: U.ivory2})}>
          <svg width={20} height={22} viewBox="0 0 20 22">
            <rect x={2} y={9} width={16} height={12} rx={3} fill={U.sage} />
            <path d="M6 9 V6 a4 4 0 0 1 8 0 V9" fill="none" stroke={U.sage} strokeWidth={2.4} />
          </svg>
          {URL_OF[cur]}
        </div>
        {/* isi layar */}
        {prev && outP > 0 ? <div style={{opacity: outP}}>{renderScreen(prev, f)}</div> : null}
        <div style={{opacity: i === 0 ? 1 : inP, transform: `translateY(${i === 0 ? 0 : (1 - inP) * 16}px)`}}>{renderScreen(cur, f)}</div>
      </div>
    </div>
  );
};
