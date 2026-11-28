# Serah-terima: checkout-hajar-aswad

- Judul / brand / format / durasi target: "Cara Checkout Paket Hajar Aswad" (Video 2 promo) / H2C Umroh / Reels 9:16 1080x1920 / suara 67,2 dtk, video ±68,4 dtk
- Tahap terakhir selesai: revisi-2 (28 Nov 2026)
- Keputusan Bos (disetujui, jangan diubah): konsep dan naskah 27 Nov, alur full visual 28 Nov (teks layar 1-3 kata, tampilan mobile web, gaya web live), suara Jefri MP3 dari Bos, tanpa musik, ajakan tombol emas `umroh.h2c.or.id`
- File penting: `naskah-checkout-hajar-aswad.md`, `public/audio/vo-checkout-hajar-aswad.mp3`, `src/data/vo-timing-checkout-hajar-aswad.json`, `src/data/timeline-checkout-hajar-aswad.ts`, `src/scenes/checkout-hajar-aswad/`, komposisi `CheckoutHajarAswad`, `out/checkout-hajar-aswad-9x16.mp4`
- Aset asli dari repo h2c-umroh (cabang `H2C-Umroh`): gambar paket `public/brands/h2c-umroh/paket/hajar-aswad-{standar,premium}.webp`, lencana tingkat `public/brands/h2c-umroh/lencana/*.svg`, logo `public/brands/h2c-umroh/logo.jpeg`
- Status render: ada (draf), 28 Nov 2026
- Revisi 1 Bos (28 Nov, sudah dikerjakan): subtitle penuh tetap dipakai; layar cara checkout = web asli tampilan mobile; logo penutup ditengahkan; "9D" tidak mepet bingkai.
- Revisi 2 Bos (28 Nov, sudah dikerjakan): langkah dimulai dari beranda; semua layar langkah 1-5 dirender dari HTML+CSS+font asli umroh.h2c.or.id (iframe, `src/scenes/checkout-hajar-aswad/Situs.tsx`) dengan petunjuk animasi (cincin sorot, titik ketuk, ketikan, gulir); demo pembayaran Silver (data contoh, tanpa transaksi): Reservasi -> pilih QRIS -> Bayar DP Sekarang -> Selesaikan pembayaran -> Pesanan -> kartu Kupon Silver berisi kode unik.
- Sumber halaman: `scripts/situs-h2c-halaman.py` merakit `public/brands/h2c-umroh/situs/halaman/*.html` dari HTML mentah (SSR publik + DOM akun Bos yang login, dibersihkan dari nama/nomor/email/token). Halaman bayar & Reservasi demo dirakit dari markup asli /reservasi/[token] + JSX situs (TransactionShell, PaymentTube, PayButton, KuponUndian). Daftar metode & biaya TriPay asli (QRIS Rp750 + 0,7%). Format kode kupon asli `H2C-XXXXXXXX`.
- Fakta situs: paket Standar = DP Silver/Gold, Premium = Platinum/Diamond; video mengikuti.
- Daftar revisi Bos (belum dikerjakan): -
- Sudah diperiksa: tsc, pemeriksa tabrakan (`--every=15`) bersih, 35 frame kunci dilihat
- Belum diperiksa / risiko:
  1. Timing per kata dari transkrip ElevenLabs Scribe (132 kata). Teks MP3 berbeda dari naskah (lebih panjang, mis. "Langkah satu, masuk ke akun H2C Anda"); subtitle mengikuti transkrip.
  2. Layar web asli ditangkap 28 Nov (`public/brands/h2c-umroh/web/`, `scripts/tangkap-web-mobile.mjs`); harga Rp100 jt dan "November 2031" dikaburkan. Tangkap ulang bila situs berubah.
  3. Data paket di situs live (Rp100 jt, berangkat 2031) tidak ditampilkan; rapikan sebelum posting. Situs produksi harus sudah memuat paket sebelum posting.
  4. Kode reservasi/kupon (H2C-5E8A1C3D / H2C-B71F04A9), nomor WA, email masuk, QR: fiktif, label "demo · data contoh". QR tidak bisa dipakai bayar.
  5. Halaman disalin 28 Nov; bila tampilan situs berubah, ambil ulang HTML lalu jalankan skrip perakit.
- Caption dan jam posting usulan: (room RILIS)
- Catatan untuk room berikutnya: komposisi 2D `AkunKeluargaH2C` sempat merusak bundle (JSON timing diganti jalur 3D); diperbaiki dengan `vo-timing-akun-keluarga-h2c-2d.json` (salinan dari commit 1af6d99).
