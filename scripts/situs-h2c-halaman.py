# Rakit potongan halaman web umroh.h2c.or.id (HTML asli dari situs) untuk video checkout-hajar-aswad.
# Masukan: folder HTML mentah (SSR publik lewat curl, halaman akun dari DOM panel browser yang sudah login).
# Keluaran: public/brands/h2c-umroh/situs/halaman/*.html, dirender komponen Situs (iframe + CSS asli situs).
# Pembersihan: tanpa script, tanpa foto orang (slider/pembimbing/flyer), nama/nomor/email pribadi dibuang,
# harga & tanggal sementara (Rp100 jt, 2031) dibungkus .sensor (dikaburkan), data pesanan diganti contoh.
# Pakai: python3 -I scripts/situs-h2c-halaman.py <folder-html-mentah>
import os, re, sys

SRC = sys.argv[1]
OUT = 'public/brands/h2c-umroh/situs/halaman'
os.makedirs(OUT, exist_ok=True)


def baca(n):
    s = open(os.path.join(SRC, n), encoding='utf-8').read()
    s = re.sub(r'<script.*?</script>', '', s, flags=re.S)
    s = re.sub(r'<noscript.*?</noscript>', '', s, flags=re.S)
    s = re.sub(r'<link [^>]*>', '', s)
    return s


def ambil(s, start_pat):
    """Ambil elemen utuh yang dimulai dengan pola start_pat (hitung tag pembuka/penutup)."""
    m = re.search(start_pat, s)
    if not m:
        raise SystemExit(f'pola tidak ada: {start_pat}')
    tag = re.match(r'<(\w+)', s[m.start():]).group(1)
    depth, i = 0, m.start()
    for t in re.finditer(rf'<(/?){tag}\b[^>]*?(/?)>', s[m.start():]):
        if t.group(2):
            continue
        depth += -1 if t.group(1) else 1
        if depth == 0:
            return s[m.start(): m.start() + t.end()]
    raise SystemExit('tag tidak tertutup')


def buang(s, start_pat):
    while re.search(start_pat, s):
        s = s.replace(ambil(s, start_pat), '', 1)
    return s


def bersih(s):
    s = re.sub(r'Ammaar\s+Al\s+Fauzan', 'Jamaah H2C', s, flags=re.I)
    s = re.sub(r'62\d{8,13}|08\d{8,12}', '', s)
    s = re.sub(r'[\w.+-]+@[\w-]+\.[\w.]+', '', s)
    s = re.sub(r'\s(aria-[\w-]+|data-nimg|loading|decoding|srcset|sizes)="[^"]*"', '', s)
    s = re.sub(r'<!--\/?\$?-->|<!-- -->', '', s)
    s = s.replace('?v=92ac526', '')
    for x in ['Rp100.000.000', 'Rp99.500.000', 'November 2031', '20 Nov 2031']:
        s = s.replace(x, f'<span class="sensor">{x}</span>')
    return s


def tulis(n, html):
    html = bersih(html)
    html = re.sub(r'https://assets\.tripay\.co\.id/upload/payment-icon/', '/img/tripay/', html)
    assert 'pembimbing' not in html and 'flyer-' not in html and 'reel-' not in html, n
    open(os.path.join(OUT, n), 'w', encoding='utf-8').write(html)
    print(n, len(html))


# 1. Beranda publik: kepala situs + hero atas (tanpa slider foto & foto latar).
b = baca('beranda-ssr.html')
kepala = buang(ambil(b, r'<header [^>]*class="site-header'), r'<div [^>]*class="mnav"')
hero = ambil(b, r'<section [^>]*class="hero-top')
hero = buang(hero, r'<div [^>]*class="hs"')
hero = buang(hero, r'<div [^>]*class="hero-top-photo')
tulis('beranda.html', kepala + '<main class="travel-home">' + hero + '</main>')

# 2. Halaman masuk.
tulis('masuk.html', ambil(baca('masuk-ssr.html'), r'<div class="txn-shell auth-shell"'))

# 3. Paket (akun): hanya kartu Hajar Aswad.
pk = baca('akun-paket.html')
semua = re.findall(r'<a class="pk-card" href="/akun/paket/[^"]*">.*?</a>(?=<a class="pk-card"|</section>)', pk, flags=re.S)
for c in semua:
    if 'Hajar Aswad' not in c:
        pk = pk.replace(c, '')
kartu = ''.join(c for c in semua if 'Hajar Aswad' in c)
assert kartu.count('pk-card') == 2
pk = re.sub(r'<p class="fl-count">[^<]*</p>', '<p class="fl-count">2 paket</p>', pk)
tulis('akun-paket.html', pk)

# 4. Beranda akun: tagihan contoh (Rp0, jamaah baru), Paket Unggulan = dua kartu Hajar Aswad, tanpa Pesanan Terbaru.
ak = baca('akun-beranda.html')
sec = re.findall(r'<section class="dh-section">.*?</section>', ak, flags=re.S)
unggulan = re.sub(r'(<section class="dh-section"><div class="dh-head">.*?</div>).*(</section>)', lambda m: m.group(1) + kartu + m.group(2), sec[0], flags=re.S)
ak = ak.replace(sec[0], unggulan).replace(sec[1], '')
ak = re.sub(r'<strong class="dh-balance">[^<]*</strong>', '<strong class="dh-balance">Rp0</strong>', ak)
ak = re.sub(r'<span style="width:\d+%"></span>', '<span style="width:0%"></span>', ak)
ak = re.sub(r'(<div class="dh-progress">.*?<small>).*?(</small>)', r'\g<1>Belum ada tagihan\g<2>', ak, flags=re.S)
tulis('akun-beranda.html', ak)

# 5. Detail + checkout Hajar Aswad Standar (sudah login).
prem = open(os.path.join(OUT, 'dp-premium.html'), encoding='utf-8').read()
tulis('detail-standar.html', baca('detail-standar.html') + '<template id="__dp-premium">' + re.search(r'<div class="pd-dpopsi-row">(.*)</div>$', prem, flags=re.S).group(1) + '</template>')

# 6. Pesanan: kartu pesanan CONTOH (Hajar Aswad Standar, DP Silver) + kartu kupon (kp-card) contoh.
rv = baca('reservasi-main.html')
rv = re.sub(r'<strong>Uji Coba Pembayaran \(Internal\)</strong>', '<strong>Hajar Aswad Standar</strong>', rv)
rv = re.sub(r'(<small><svg.*?</svg>)[^<]*(</small><small>)[^<]*(</small>)', r'\g<1>12 hari · 2 jamaah\g<2>H2C-CONTOH\g<3>', rv, count=1, flags=re.S)
rv = re.sub(r'(<div class="dh-card-r"><strong>)[^<]*', r'\g<1><span class="sensor">Rp00.000.000</span>', rv)
rv = re.sub(r'<span class="cel-pct"><b>\d+%</b> terbayar</span>', '<span class="cel-pct"><b>DP</b> terbayar</span>', rv)
rv = re.sub(r'<span class="cel-amt">.*?</span>(?=<span class="cel-bar">)', '<span class="cel-amt">Rp1.000.000 <small>DP Silver</small></span>', rv, flags=re.S)
rv = re.sub(r'<i style="width:\d+%"></i>', '<i style="width:4%"></i>', rv)
rv = re.sub(r'<small>Sisa [^<]*</small>', '<small>Sisa <span class="sensor">Rp00.000.000</span></small>', rv)
rv = re.sub(r'href="/reservasi/[^"]*"', 'href="#"', rv)
rv = rv.replace('<div class="dh-card">', '<div class="dh-card" id="kartu-pesanan">', 1)
silver = re.search(r'<svg class="ikon-tingkat".*?</svg>', baca('detail-standar.html'), flags=re.S).group(0).replace('width="42" height="42"', 'width="20" height="20"')
top = open(os.path.join(SRC, 'reservasi-top.html'), encoding='utf-8').read()
nav = ambil(pk, r'<nav class="dnav"').replace('class="dnav-i on"', 'class="dnav-i"').replace('<a class="dnav-i" href="/akun/reservasi"', '<a class="dnav-i on" href="/akun/reservasi"')
tulis('pesanan.html', '<div class="txn-shell acct-shell">' + top + '<div class="acct-body"><main class="acct-main">' + rv + '</main></div>' + nav + '</div>')

# ---------------------------------------------------------------------------------------------
# 7-9. Demo pembayaran (data CONTOH), dirakit dari markup asli halaman /reservasi/[token] (pesanan uji
# di akun Bos, diambil dari DOM) dan JSX situs (app/reservasi/[token]/page.tsx, bayar/page.tsx,
# PayButton, PaymentChannel, PaymentTube, KuponUndian). Tidak ada transaksi nyata.
rt = open(os.path.join(SRC, 'reservasi-token.html'), encoding='utf-8').read()
dd = open(os.path.join(SRC, 'dd-metode.html'), encoding='utf-8').read()
KODE_R = 'H2C-5E8A1C3D'   # reservationCode contoh
KODE_K = 'H2C-B71F04A9'   # kodeKupon contoh
svg_ext = re.search(r'Hubungi admin (<svg.*?</svg>)', rt, flags=re.S).group(1)
header = re.search(r'<header class="txn-header">.*?</header>', rt, flags=re.S).group(0)
cel = re.search(r'<figure class="celengan">.*?</figure>', rt, flags=re.S).group(0)
silver20 = silver  # ikon tingkat Silver 20 px (dari halaman detail)


def jar(pct):
    """Port fungsi Jar di components/booking/PaymentTube.tsx (x 10, y 34, w 74, h 104)."""
    x, y, w, h = 10, 34, 74, 104
    bottom, inner = y + h - 6, h - 14
    level = bottom - (inner * pct) / 100
    rows = int((bottom - level) // 6)
    P = f'M{x + 6} {y + 8} Q{x} {y + 12} {x} {y + 24} V{y + h - 12} Q{x} {y + h} {x + 12} {y + h} H{x + w - 12} Q{x + w} {y + h} {x + w} {y + h - 12} V{y + 24} Q{x + w} {y + 12} {x + w - 6} {y + 8} Z'
    g = [f'<g><defs><clipPath id="cel-glass"><path d="{P}"></path></clipPath></defs>',
         f'<ellipse cx="{x + w / 2:g}" cy="{y + h + 3}" rx="{w / 2 + 4:g}" ry="4" fill="#000" opacity=".35"></ellipse>',
         f'<path d="{P}" fill="#bfe6d6" opacity=".07"></path>',
         f'<g clip-path="url(#cel-glass)"><g class="cel-isi" style="--naik:{bottom - level + 8:g}px"><rect x="{x}" y="{level:g}" width="{w}" height="{bottom - level + 8:g}" fill="url(#cel-emas)"></rect>']
    g += [f'<path d="M{x} {bottom - r * 6} h{w}" stroke="#8a6a2c" stroke-opacity=".35" stroke-width=".8"></path>' for r in range(rows)]
    if pct > 0:
        g += [f'<ellipse cx="{x + 8 + i * 12 + (i % 2) * 2}" cy="{level + (1.5 if i % 2 else -0.5):g}" rx="7" ry="2.6" fill="#f6e2ad" stroke="#a37a34" stroke-width=".7"></ellipse>' for i in range(6)]
    if pct > 15:
        g.append(f'<ellipse cx="{x + w * 0.62:g}" cy="{level + 12:g}" rx="5" ry="5" fill="#f3dca4" stroke="#a37a34" stroke-width=".7"></ellipse>')
    g.append('</g></g>')
    rest = re.search(r'<g clip-path="url\(#cel-glass\)">.*?</g></g>(.*)</g>\s*$', re.search(r'<g transform="translate\(0 4\)">(.*?)</g><g class="cel-pasir">', cel, flags=re.S).group(1), flags=re.S)
    tail = rest.group(1) if rest else ''
    return ''.join(g) + tail + '</g>'


def celengan(paid, total, compact=False):
    pct = max(0, min(100, int(paid * 100 / total + 0.5))) if total else 0
    f = re.sub(r'(<g transform="translate\(0 4\)">).*?(</g><g class="cel-pasir">)', lambda m: m.group(1) + jar(pct) + m.group(2), cel, flags=re.S)
    note = ('Alhamdulillah, lunas. Siap berangkat.' if pct >= 100 else 'Sedikit lagi, pesawat sudah menunggu.' if pct >= 75 else 'Separuh jalan menuju Tanah Suci.' if pct >= 50 else 'Terus isi celengannya, Tanah Suci makin dekat.' if pct >= 25 else 'Setiap cicilan mengisi celengan umroh Anda.')
    cap = (f'<figcaption><span class="cel-pct"><b>{pct}%</b> terbayar</span><span class="cel-amt">{paid_s(paid)} <small>dari {paid_s(total)}</small></span>'
           f'<span class="cel-bar"><i style="width:{pct}%"></i></span>' + ('' if compact else f'<small class="cel-note">{note}</small>') + '</figcaption>')
    f = re.sub(r'<figcaption>.*?</figcaption>', cap, f, flags=re.S)
    return f.replace('class="celengan"', 'class="celengan celengan-c"') if compact else f


def rp(n):
    return 'Rp' + f'{n:,}'.replace(',', '.')


def paid_s(n):
    return rp(n) if n < 100_000_000 else f'<span class="sensor">{rp(n)}</span>'


def shell(title, eyebrow, body):
    return (f'<div class="txn-shell">{header}<main class="txn-main txn-lebar"><section class="txn-card">'
            f'<p class="txn-eyebrow">{eyebrow}</p><h1>{title}</h1>{body}</section></main></div>')


TOTAL, DP = 200_000_000, 1_000_000  # 2 jamaah x Rp100 jt (harga sementara di situs, dikaburkan), DP Silver 2 x Rp500.000


def kiri(status, paid, amount_label, amount):
    return (f'<div class="byr-kiri"><div class="txn-meta"><span>Jamaah H2C · 2 jamaah</span><span class="txn-status">{status}</span></div>'
            f'<p class="txn-muted"><span class="sensor">20 Nov 2031</span> · 12 hari</p>'
            f'<div class="txn-amount"><span>{amount_label}</span><strong>{paid_s(amount)}</strong></div>'
            f'<div class="txn-stats"><div><span>Total biaya</span><strong>{paid_s(TOTAL)}</strong></div><div><span>Sudah dibayar</span><strong>{paid_s(paid)}</strong></div>'
            f'<div><span>Sisa</span><strong>{paid_s(TOTAL - paid)}</strong></div></div>{celengan(paid, TOTAL)}'
            f'<details class="txn-detail"><summary>Rincian pesanan</summary><dl><div><dt>Pemesan</dt><dd>Jamaah H2C</dd></div><div><dt>Pilihan bayar</dt><dd>DP lalu pelunasan</dd></div><div><dt>Kode</dt><dd>{KODE_R}</dd></div></dl></details></div>')


bantuan = f'<div class="txn-actions txn-bantuan"><a href="#">Hubungi admin {svg_ext}</a></div>'
kupon_judul = f'<b class="kp-judul">{silver20} Kupon Silver</b>'

# Menu metode: tertutup (asli), terbuka dengan grup QRIS terbuka, dan QRIS terpilih (markup asli PaymentChannel).
ICO_QRIS = 'https://assets.tripay.co.id/upload/payment-icon/8ewGzP6SWe1649667701.png'
ICO_SPAY = 'https://assets.tripay.co.id/upload/payment-icon/BpE4BPVyIw1605597490.png'
opt = lambda ico, nama: (f'<button type="button" role="option" class="pp-opt"><span class="dd-val"><span class="dd-ico"><img alt="" referrerpolicy="no-referrer" src="{ico}"></span>'
                         f'<span>{nama}<small class="dd-hint">Biaya Rp750 + 0.7%</small></span></span></button>')
buka = dd.replace('<div class="pp-grp">', '<div class="pp-grp open">', 1)
i = buka.find('</button>', buka.find('pp-grp open')) + len('</button>')
buka = buka[:i] + '<div class="pp-items">' + opt(ICO_SPAY, 'QRIS by ShopeePay') + opt(ICO_QRIS, 'QRIS') + '</div>' + buka[i:]
open(os.path.join(OUT, 'dd-buka.html'), 'w', encoding='utf-8').write(re.search(r'<div class="dd pp">(.*)</div>$', buka, flags=re.S).group(1))
pilih = re.sub(r'<span class="dd-val dd-ph">Pilih metode pembayaran</span>', f'<span class="dd-val"><span class="dd-ico"><img alt="" referrerpolicy="no-referrer" src="{ICO_QRIS}"></span>QRIS</span>', dd)
pilih = re.sub(r'<div class="dd-list.*$', '</div>', pilih, flags=re.S).replace('pp-chev up', 'pp-chev')
open(os.path.join(OUT, 'dd-pilih.html'), 'w', encoding='utf-8').write(re.search(r'<div class="dd pp">(.*)</div>$', pilih, flags=re.S).group(1))
dd = re.sub(r'<div class="dd-list.*$', '</div>', dd, flags=re.S).replace('pp-chev up', 'pp-chev')  # tertutup

# 7. Reservasi baru (menunggu pembayaran DP): pilih metode TriPay, "Bayar DP Sekarang".
pay_form = (f'<form class="pay-form txn-form"><div class="field"><label for="payment-channel">Metode pembayaran</label>{dd}'
            f'<p class="field-hint">Biaya kanal, jika ada, ditampilkan sebelum pembayaran di TriPay.</p></div>'
            f'<button type="submit" class="btn btn-gold btn-block" disabled="">Bayar DP Sekarang{svg_ext}</button></form>')
kanan_dp = (f'<div class="byr-kanan"><p class="txn-notice">Bayar sebelum <strong>29 Nov 2026, 12.10 WIB</strong>. Kursi ditahan selama masa reservasi atau tagihan masih aktif.</p>'
            f'{pay_form}<section class="kp-card">{kupon_judul}<p class="kp-ket">Kode kupon Silver muncul di sini setelah DP terbayar penuh.</p></section>{bantuan}</div>')
tpl = lambda n: f'<template id="__{n}">' + open(os.path.join(OUT, f'{n}.html'), encoding='utf-8').read() + '</template>'
tulis('reservasi-dp.html', shell('Hajar Aswad Standar', f'Reservasi {KODE_R}', f'<div class="byr-grid">{kiri("Menunggu pembayaran", 0, "Bayar sekarang", DP)}{kanan_dp}</div>') + tpl('dd-buka') + tpl('dd-pilih'))


# 8. Selesaikan pembayaran (QRIS): biaya kanal asli Rp750 + 0,7%.
fee = 750 + round(DP * 0.007)
import random, urllib.parse
rnd = random.Random(7); N = 29
mod = [[rnd.random() < 0.5 for _ in range(N)] for _ in range(N)]
def finder(r0, c0):
    for r in range(-1, 8):
        for c in range(-1, 8):
            rr, cc = r0 + r, c0 + c
            if 0 <= rr < N and 0 <= cc < N:
                mod[rr][cc] = (0 <= r <= 6 and 0 <= c <= 6) and (r in (0, 6) or c in (0, 6) or (2 <= r <= 4 and 2 <= c <= 4))
for r0, c0 in [(0, 0), (0, N - 7), (N - 7, 0)]: finder(r0, c0)
for r in range(11, 18):
    for c in range(9, 20): mod[r][c] = False  # ruang tulisan CONTOH
rects = ''.join(f'<rect x="{c}" y="{r}" width="1" height="1"/>' for r in range(N) for c in range(N) if mod[r][c])
qr_svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 {N + 4} {N + 4}" shape-rendering="crispEdges"><rect x="-2" y="-2" width="{N + 4}" height="{N + 4}" fill="#fff"/>'
          f'<g fill="#111">{rects}</g><text x="{N / 2}" y="15.6" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="3.4" fill="#111">CONTOH</text></svg>')
qr = urllib.parse.quote(qr_svg)
langkah = ['Buka aplikasi m-Banking atau e-wallet yang mendukung QRIS.', 'Pilih menu bayar atau pindai QR.', 'Pindai kode QR di halaman ini.',
           'Periksa nama merchant dan nominal, lalu konfirmasi.', 'Pembayaran selesai. Status di halaman ini diperbarui otomatis.']
bayar = (f'<div class="byr-grid"><div class="byr-kiri"><div class="byr-head"><span class="byr-metode">QRIS</span><span>Batas bayar <span class="byr-timer">23:59:59</span></span></div>'
         f'<section class="byr-inv"><div><span>DP · Hajar Aswad Standar</span><b>{rp(DP)}</b></div><div><span>Biaya layanan</span><b>{rp(fee)}</b></div>'
         f'<div class="byr-inv-total"><span>Total dibayar</span><strong>{rp(DP + fee)}</strong></div></section>'
         f'<section class="byr-qr"><img src="data:image/svg+xml;utf8,{qr}" alt="" width="240" height="240"><p>Pindai dengan aplikasi m-Banking atau e-wallet apa pun yang mendukung QRIS.</p></section>'
         f'<p class="byr-status"><span class="byr-dot"></span>Menunggu pembayaran · status diperbarui otomatis</p>{celengan(0, TOTAL, True)}</div>'
         f'<div class="byr-kanan"><section class="byr-cara"><h2>Cara bayar</h2><details class="byr-acc" open=""><summary>QRIS</summary><ol>' + ''.join(f'<li>{l}</li>' for l in langkah) + '</ol></details></section>'
         f'<form class="ganti"><button type="button" class="ganti-btn">Ganti metode atau nominal pembayaran</button></form>'
         f'<div class="txn-actions txn-bantuan"><a href="#">Buka halaman TriPay</a><a href="#">Hubungi admin</a></div></div></div>')
tulis('bayar.html', shell('Selesaikan pembayaran', f'Reservasi {KODE_R}', bayar))

# 9. Reservasi setelah DP diterima: sisa bisa dicicil (min Rp10.000), kartu Kupon Silver berisi kode unik.
sisa = TOTAL - DP
separuh = max(10_000, round(sisa / 2 / 100000) * 100000)
cicil = (f'<form class="pay-form txn-form"><fieldset class="sc-amount"><legend>Nominal cicilan</legend><div class="sc-chips">'
         f'<button type="button">{rp(10_000)}</button><button type="button"><span class="sensor">{rp(separuh)}</span></button><button type="button">Lunasi <span class="sensor">{rp(sisa)}</span></button></div>'
         f'<div class="field"><label for="cicil-amount">Atau isi sendiri</label><div class="goal-money"><span>Rp</span><input id="cicil-amount" type="text" value="10.000"></div>'
         f'<p class="field-hint">Minimal {rp(10_000)}, maksimal <span class="sensor">{rp(sisa)}</span> (sisa tagihan).</p></div></fieldset>'
         f'<div class="field"><label for="payment-channel">Metode pembayaran</label>' + re.sub(r'<div class="dd-list.*$', '</div>', dd, flags=re.S) +
         f'<p class="field-hint">Biaya kanal, jika ada, ditampilkan sebelum pembayaran di TriPay.</p></div>'
         f'<button type="submit" class="btn btn-gold btn-block" disabled="">Bayar Cicilan {rp(10_000)}{svg_ext}</button></form>')
kanan_ok = (f'<div class="byr-kanan">{cicil}<section class="kp-card">{kupon_judul}<p class="kp-kode">{KODE_K}</p>'
            f'<p class="kp-ket">Simpan kode kupon ini. Kupon berlaku selama pesanan tidak dibatalkan.</p></section>{bantuan}</div>')
tulis('reservasi-lunas.html', shell('Hajar Aswad Standar', f'Reservasi {KODE_R}', f'<div class="byr-grid">{kiri("DP diterima", DP, "Sisa tagihan (bisa dicicil)", sisa)}{kanan_ok}</div>'))
