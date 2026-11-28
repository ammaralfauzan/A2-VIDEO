import React from 'react';
import {interpolate} from 'remotion';
import {U} from '../../brands/h2c-umroh/theme';
import {clamp, ease} from '../../components/motion';
import {inP} from '../umroh-10-juta/anim';
import {s, sn} from '../../data/timeline-checkout-hajar-aswad';
import {P, WIN} from './layout';
import {Petunjuk, Situs} from './Situs';
import {AngkaBesar} from './Web';

// Lima langkah checkout di web asli umroh.h2c.or.id tampilan HP (dirender dari HTML+CSS situs), mulai dari beranda.
// Petunjuk: cincin emas menyorot elemen yang disebut, titik ketuk menekan tombol, isian terketik, halaman tergulir.

const H = WIN.h / WIN.k; // tinggi layar HP dalam px CSS

// Titik ketuk di frame `at`: muncul 10 frame sebelumnya, menekan, riak, hilang.
const ketuk = (f: number, at: number) => ({
  tekan: inP(f, at - 10, 6) * (1 - inP(f, at + 10, 8)),
  pres: interpolate(f, [at - 3, at, at + 5], [0, 1, 0], clamp),
  riak: f >= at ? interpolate(f, [at, at + 16], [0, 1], clamp) : 0,
});
// Cincin sorot tampil di rentang [a, b].
const cincin = (f: number, a: number, b: number) => inP(f, a, 6) * (1 - inP(f, b, 6));
// Teks terketik: `cpf` huruf per frame mulai `from`.
const ketik = (t: string, f: number, from: number, cpf = 0.6) => t.slice(0, Math.max(0, Math.floor((f - from) * cpf)));

// Bingkai HP: layar web, masuk/keluar (pudar + geser) per halaman di dalam satu langkah.
const Layar: React.FC<{f: number; r: [number, number]; children: React.ReactNode}> = ({f, r, children}) => {
  if (f < r[0] - 1 || f > r[1] + 10) return null;
  const a = inP(f, r[0], 8);
  const b = inP(f, r[1], 8);
  return <div style={{position: 'absolute', inset: 0, opacity: a * (1 - b), transform: `translateX(${(1 - a) * 60 - b * 60}px)`}}>{children}</div>;
};

const Bingkai: React.FC<{f: number; r: [number, number]; children: React.ReactNode}> = ({f, r, children}) => {
  if (f < r[0] - 1 || f > r[1] + 12) return null;
  const a = interpolate(f, [r[0] + 12, r[0] + 24], [1, 0], {...clamp, easing: ease});
  const b = interpolate(f, [r[1], r[1] + 12], [0, 1], {...clamp, easing: ease});
  return (
    <div style={{position: 'absolute', inset: 0, opacity: (1 - a) * (1 - b), transform: `translateX(${a * 140 - b * 140}px)`}}>
      <div style={{position: 'absolute', left: WIN.x, top: WIN.y, width: WIN.w, height: WIN.h, borderRadius: 44, overflow: 'hidden', border: `3px solid ${U.goldLine}`, boxShadow: '0 50px 110px -40px rgba(0,0,0,.8)', background: U.bg}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 390, height: H, transformOrigin: '0 0', transform: `scale(${WIN.k})`}}>{children}</div>
      </div>
    </div>
  );
};

// ---------- Langkah 1: beranda -> Masuk -> akun -> menu Paket ----------
export const Langkah1: React.FC<{f: number}> = ({f}) => {
  const r = P.step1;
  return (
    <>
      <Bingkai f={f} r={r}>
        <Layar f={f} r={[r[0], P.keMasuk]}>
          <Situs page="beranda.html" top={0} height={H} petunjuk={[{sel: '.navcta a.nav-account:not(.nav-wa)', ring: cincin(f, P.keMasuk - 24, P.keMasuk + 4), ...ketuk(f, P.keMasuk - 4), dx: -26}]} />
        </Layar>
        <Layar f={f} r={[P.keMasuk, P.keAkun]}>
          <Situs
            page="masuk.html"
            top={0}
            height={844}
            ubah={(d) => {
              const [em, pw] = [d.querySelector('input[type=email]'), d.querySelector('input[type=password]')] as HTMLInputElement[];
              if (em) em.value = ketik('jamaah@contoh.id', f, P.keMasuk + 8, 0.7);
              if (pw) pw.value = ketik('rahasia123', f, P.keMasuk + 34, 0.7);
            }}
            petunjuk={[
              {sel: 'input[type=email]', ring: cincin(f, P.keMasuk + 6, P.keMasuk + 32)},
              {sel: 'input[type=password]', ring: cincin(f, P.keMasuk + 32, P.keAkun - 14)},
              {sel: 'form button[type=submit]', ring: cincin(f, P.keAkun - 16, P.keAkun + 4), ...ketuk(f, P.keAkun - 4)},
            ]}
          />
        </Layar>
        <Layar f={f} r={[P.keAkun, P.kePaket]}>
          <Situs page="akun-beranda.html" top={0} height={H} petunjuk={[{sel: '.dnav a.dnav-i', nth: 1, ring: cincin(f, P.kePaket - 22, P.kePaket + 4), ...ketuk(f, P.kePaket - 4)}]} />
        </Layar>
        <Layar f={f} r={[P.kePaket, r[1] + 20]}>
          <Situs page="akun-paket.html" top={0} height={H} />
        </Layar>
      </Bingkai>
      <AngkaBesar f={f} k={0} at={r[0]} />
    </>
  );
};

// ---------- Langkah 2: pilih Hajar Aswad Standar/Premium, lalu tingkat DP ----------
export const Langkah2: React.FC<{f: number}> = ({f}) => {
  const r = P.step2;
  const dpOn = P.tierOn.reduce((acc, at, i) => (f >= at ? i : acc), -1);
  const premiumRow = dpOn >= 2;
  return (
    <>
      <Bingkai f={f} r={r}>
        <Layar f={f} r={[r[0] - 20, P.keDetail]}>
          <Situs
            page="akun-paket.html"
            top={0}
            height={H}
            petunjuk={[
              {sel: 'a.pk-card', nth: 0, ring: Math.max(cincin(f, P.pilihPaket, P.standar), cincin(f, P.standar, P.premium)), ...ketuk(f, P.keDetail - 4)},
              {sel: 'a.pk-card', nth: 1, ring: Math.max(cincin(f, P.pilihPaket, P.standar), cincin(f, P.premium, P.keDetail - 12))},
            ]}
          />
        </Layar>
        <Layar f={f} r={[P.keDetail, r[1] + 20]}>
          <Situs
            page="detail-standar.html"
            top={0}
            height={H}
            ke={{sel: '.pd-dpopsi', off: 150, mix: interpolate(f, [P.tingkat + 6, P.tingkat + 26], [0, 1], {...clamp, easing: ease})}}
            ubah={(d) => pilihDp(d, premiumRow, dpOn < 0 ? 0 : dpOn % 2)}
            petunjuk={[
              {sel: '.pd-undian', ring: cincin(f, P.keDetail + 8, P.tingkat + 10)},
              ...[0, 1].map((k) => ({sel: '.pd-dpopsi-row label', nth: k, ring: dpOn >= 0 && dpOn % 2 === k ? cincin(f, P.tierOn[dpOn], P.tierOn[dpOn] + 60) : 0, ...ketuk(f, P.tierOn[premiumRow ? 2 + k : k] + 2)})),
            ]}
          />
        </Layar>
      </Bingkai>
      <AngkaBesar f={f} k={1} at={r[0]} />
    </>
  );
};

// Baris DP: Standar = Silver/Gold, Premium = Platinum/Diamond (sesuai situs). Judul/gambar ikut paketnya.
let rowStandar: string | null = null;
const pilihDp = (d: Document, premium: boolean, on: number) => {
  const row = d.querySelector('.pd-dpopsi-row');
  const prem = d.getElementById('__dp-premium') as HTMLTemplateElement | null;
  if (!row) return;
  if (rowStandar === null) rowStandar = row.innerHTML;
  const want = premium ? prem?.innerHTML ?? rowStandar : rowStandar;
  if (row.getAttribute('data-paket') !== (premium ? 'p' : 's')) {
    row.innerHTML = want;
    row.setAttribute('data-paket', premium ? 'p' : 's');
  }
  row.querySelectorAll('label').forEach((l, i) => {
    l.classList.toggle('on', i === on);
    const inp = l.querySelector('input') as HTMLInputElement | null;
    if (inp) inp.checked = i === on;
  });
  const h2 = d.querySelector('.pd-title h2');
  if (h2) h2.textContent = premium ? 'Hajar Aswad Premium' : 'Hajar Aswad Standar';
  const img = d.querySelector('img.pd-flyer') as HTMLImageElement | null;
  if (img) img.src = img.src.replace(premium ? 'standar' : 'premium', premium ? 'premium' : 'standar');
  const btn = d.querySelector('.pd-form button[type=submit]');
  btn?.setAttribute('data-tier', ['silver', 'gold', 'platinum', 'diamond'][(premium ? 2 : 0) + on]);
};

// ---------- Langkah 3: jumlah jamaah, Bayar DP, nomor WhatsApp ----------
export const Langkah3: React.FC<{f: number}> = ({f}) => {
  const r = P.step3;
  return (
    <>
      <Bingkai f={f} r={r}>
        <Situs
          page="detail-standar.html"
          top={0}
          height={H}
          ke={{sel: '.pd-form', off: 14, mix: 1}}
          ubah={(d) => {
            pilihDp(d, false, 0);
            const b = d.querySelector('.pd-step b');
            if (b) b.textContent = f >= P.tapPlus ? '2' : '1';
            const minus = d.querySelector('.pd-step button') as HTMLButtonElement | null;
            if (minus) minus.disabled = f < P.tapPlus;
            const wa = d.querySelector('#pd-phone') as HTMLInputElement | null;
            if (wa) wa.value = ketik('0812-0000-0000', f, P.tapWa + 6, 0.8);
            const hint = d.querySelector('#pd-phone + .field-hint');
            if (hint) hint.textContent = f >= P.tapWa + 6 ? 'Nomor contoh.' : 'Diisi dari pesanan sebelumnya. Ubah bila perlu.';
          }}
          petunjuk={[
            {sel: '.pd-row', ring: cincin(f, P.tapPlus - 16, P.tapPlus + 24)},
            {sel: '.pd-step button', nth: 1, ...ketuk(f, P.tapPlus)},
            {sel: '.pd-pay label', nth: 0, ring: cincin(f, P.tapDp - 6, P.tapDp + 40), ...ketuk(f, P.tapDp)},
            {sel: '#pd-phone', ring: cincin(f, P.tapWa - 6, r[1]), ...ketuk(f, P.tapWa)},
          ]}
        />
      </Bingkai>
      <AngkaBesar f={f} k={2} at={r[0]} />
    </>
  );
};

// ---------- Langkah 4: Checkout & bayar -> halaman Reservasi -> pilih QRIS -> Bayar DP Sekarang ----------
// Demo pembayaran (data contoh) dirakit dari markup asli /reservasi/[token]; tidak ada transaksi nyata.
const T4 = {
  keReservasi: s('checkout') + 12, // sesudah tombol Checkout & bayar ditekan
  bukaMenu: sn('sepuluh', -1) - 20, // "mulai"
  pilihQris: sn('sepuluh', 0) + 4,
  bayarDp: sn('sepuluh', 2) + 2, // "rupiah"
};
const ddState = (d: Document, st: 'tutup' | 'buka' | 'pilih') => {
  const dd = d.querySelector('.pay-form .dd.pp');
  if (!dd) return;
  if (!dd.hasAttribute('data-asli')) dd.setAttribute('data-asli', dd.innerHTML);
  if (dd.getAttribute('data-st') !== st) {
    dd.innerHTML = st === 'tutup' ? (dd.getAttribute('data-asli') as string) : (d.getElementById(`__dd-${st}`) as HTMLTemplateElement).innerHTML;
    dd.setAttribute('data-st', st);
  }
  const btn = d.querySelector('.pay-form button[type=submit]') as HTMLButtonElement | null;
  if (btn) btn.disabled = st !== 'pilih';
};
export const Langkah4: React.FC<{f: number}> = ({f}) => {
  const r = P.step4;
  return (
    <>
      <Bingkai f={f} r={r}>
        <Layar f={f} r={[r[0] - 20, T4.keReservasi]}>
          <Situs
            page="detail-standar.html"
            top={0}
            height={H}
            ke={{sel: '.pd-form button[type=submit]', off: H - 170, mix: 1}}
            ubah={(d) => {
              pilihDp(d, false, 0);
              const b = d.querySelector('.pd-step b');
              if (b) b.textContent = '2';
              const wa = d.querySelector('#pd-phone') as HTMLInputElement | null;
              if (wa) wa.value = '0812-0000-0000';
            }}
            petunjuk={[{sel: '.pd-form button[type=submit]', ring: cincin(f, P.tapCheckout - 24, T4.keReservasi), ...ketuk(f, P.tapCheckout)}]}
          />
        </Layar>
        <Layar f={f} r={[T4.keReservasi, r[1] + 20]}>
          <Situs
            page="reservasi-dp.html"
            top={0}
            height={H}
            ke={{sel: '.pay-form', off: 120, mix: interpolate(f, [T4.bukaMenu - 24, T4.bukaMenu - 6], [0, 1], {...clamp, easing: ease})}}
            ubah={(d) => ddState(d, f >= T4.pilihQris ? 'pilih' : f >= T4.bukaMenu ? 'buka' : 'tutup')}
            petunjuk={[
              {sel: '.txn-amount', ring: cincin(f, T4.keReservasi + 8, P.sisa)},
              {sel: '.txn-stats div', nth: 2, ring: cincin(f, P.sisa, T4.bukaMenu - 26)},
              {sel: '#payment-channel', ring: cincin(f, T4.bukaMenu - 10, T4.pilihQris - 4), ...ketuk(f, T4.bukaMenu)},
              {sel: '.pp-opt', nth: 1, ring: cincin(f, T4.pilihQris - 10, T4.pilihQris + 4), ...ketuk(f, T4.pilihQris)},
              {sel: '.pay-form button[type=submit]', ring: cincin(f, T4.pilihQris + 6, r[1] + 10), ...ketuk(f, T4.bayarDp)},
            ]}
          />
        </Layar>
      </Bingkai>
      <Demo f={f} r={[T4.keReservasi, r[1]]} />
      <AngkaBesar f={f} k={3} at={r[0]} />
    </>
  );
};

// ---------- Langkah 5: halaman bayar QRIS -> DP diterima -> Pesanan -> kode kupon unik ----------
const T5 = {
  terbayar: s('terbayar') - 4,
  kePesanan: s('dicek') - 2,
  bukaPesanan: s('kode') - 2,
  keKupon: s('kode') + 6,
};
const KODE = 'H2C-B71F04A9'; // kodeKupon contoh (format asli H2C- + 8 karakter)
export const Langkah5: React.FC<{f: number}> = ({f}) => {
  const r = P.step5;
  const detik = Math.max(0, 86399 - Math.floor((f - r[0]) / 30));
  const timer = `${String(Math.floor(detik / 3600)).padStart(2, '0')}:${String(Math.floor((detik % 3600) / 60)).padStart(2, '0')}:${String(detik % 60).padStart(2, '0')}`;
  return (
    <>
      <Bingkai f={f} r={r}>
        <Layar f={f} r={[r[0] - 20, T5.kePesanan]}>
          <Situs
            page="bayar.html"
            top={0}
            height={H}
            ke={{sel: '.byr-qr', off: 60, mix: interpolate(f, [r[0] + 20, r[0] + 40], [0, 1], {...clamp, easing: ease})}}
            ubah={(d) => {
              const t = d.querySelector('.byr-timer');
              if (t) t.textContent = timer;
            }}
            petunjuk={[
              {sel: '.byr-qr img', ring: cincin(f, r[0] + 30, T5.terbayar)},
              {sel: '.byr-status', ring: cincin(f, T5.terbayar, T5.kePesanan + 4)},
            ]}
          />
        </Layar>
        <Layar f={f} r={[T5.kePesanan, T5.keKupon]}>
          <Situs
            page="pesanan.html"
            top={0}
            height={H}
            petunjuk={[
              {sel: '.chip-dp_paid', ring: cincin(f, T5.kePesanan + 4, T5.bukaPesanan - 2)},
              {sel: '#kartu-pesanan', ring: cincin(f, T5.bukaPesanan - 8, T5.keKupon), ...ketuk(f, T5.bukaPesanan), dy: -60},
            ]}
          />
        </Layar>
        <Layar f={f} r={[T5.keKupon, r[1] + 20]}>
          <Situs
            page="reservasi-lunas.html"
            top={0}
            height={H}
            ke={{sel: '.kp-card', off: 150, mix: interpolate(f, [T5.keKupon + 4, T5.keKupon + 22], [0, 1], {...clamp, easing: ease})}}
            ubah={(d) => {
              const k = d.querySelector('.kp-kode');
              if (k) k.textContent = KODE.slice(0, Math.max(0, Math.floor((f - T5.keKupon - 18) / 1.4))) || '\u00a0';
            }}
            petunjuk={[
              {sel: '.txn-status', ring: cincin(f, T5.keKupon + 2, T5.keKupon + 16)},
              {sel: '.kp-card', ring: cincin(f, T5.keKupon + 18, P.simpan - 2)},
              {sel: '.kp-kode', ring: cincin(f, P.simpan - 2, r[1] + 10)},
            ]}
          />
        </Layar>
      </Bingkai>
      <Demo f={f} r={r} />
      <AngkaBesar f={f} k={4} at={r[0]} />
    </>
  );
};

// Label demo di luar bingkai HP (di atas sudut kanan bingkai), hanya saat layar pembayaran contoh tampil.
const Demo: React.FC<{f: number; r: [number, number]}> = ({f, r}) => {
  const p = inP(f, r[0], 8) * (1 - inP(f, r[1], 8));
  if (p <= 0.01) return null;
  return (
    <div style={{position: 'absolute', right: 1080 - (WIN.x + WIN.w), top: WIN.y - 36, padding: '4px 14px', borderRadius: 999, border: `2px solid ${U.goldLine}`, background: 'rgba(10,31,23,.85)', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 20, color: U.sage, opacity: p}}>
      demo · data contoh
    </div>
  );
};

// Frame ketukan (untuk efek suara klik), urut.
export const TAP_FRAMES: number[] = [
  P.keMasuk - 4, P.keAkun - 4, P.kePaket - 4, P.keDetail - 4,
  P.tierOn[0] + 2, P.tierOn[1] + 2, P.tierOn[2] + 2, P.tierOn[3] + 2,
  P.tapPlus, P.tapDp, P.tapWa, P.tapCheckout,
  T4.bukaMenu, T4.pilihQris, T4.bayarDp, T5.bukaPesanan,
].sort((a, b) => a - b);
