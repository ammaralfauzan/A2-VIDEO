# Serah-terima: checkout-hajar-aswad

- Judul / brand / format / durasi target: "Cara Checkout Paket Hajar Aswad" (Video 2 promo) / H2C Umroh / Reels 9:16 1080x1920 / suara 67,2 dtk, video ±68,4 dtk
- Tahap terakhir selesai: bangun (draf, 28 Nov 2026)
- Keputusan Bos (disetujui, jangan diubah): konsep dan naskah 27 Nov, alur full visual 28 Nov (teks layar 1-3 kata, tampilan mobile web, gaya web live), suara Jefri MP3 dari Bos, tanpa musik, ajakan tombol emas `umroh.h2c.or.id`
- File penting: `naskah-checkout-hajar-aswad.md`, `public/audio/vo-checkout-hajar-aswad.mp3`, `src/data/vo-timing-checkout-hajar-aswad.json`, `src/data/timeline-checkout-hajar-aswad.ts`, `src/scenes/checkout-hajar-aswad/`, komposisi `CheckoutHajarAswad`, `out/checkout-hajar-aswad-9x16.mp4`
- Aset asli dari repo h2c-umroh (cabang `H2C-Umroh`): gambar paket `public/brands/h2c-umroh/paket/hajar-aswad-{standar,premium}.webp`, lencana tingkat `public/brands/h2c-umroh/lencana/*.svg`, logo `public/brands/h2c-umroh/logo.jpeg`
- Status render: ada (draf), 28 Nov 2026
- Daftar revisi Bos (belum dikerjakan): -
- Sudah diperiksa: tsc, pemeriksa tabrakan (`--every=15`) bersih, 35 frame kunci dilihat
- Belum diperiksa / risiko:
  1. **Timing suara SEMENTARA**: tanpa transkrip, paragraf naskah dipetakan ke jeda panjang MP3 dan kata dibagi menurut suku kata (`scripts/vo-kata-checkout-hajar-aswad.py`). Bila transkrip ElevenLabs Scribe (per kata) sudah ada, tulis ke `vo-timing-checkout-hajar-aswad.json` dengan format `kata: [{w, s, e}]`; timeline mencari kata pemicu sendiri, lalu render ulang.
  2. Teks MP3 belum dicocokkan kata per kata dengan naskah (durasi 67 dtk, naskah target ±55).
  3. Data paket di situs live (Rp100 jt, berangkat 2031) tidak ditampilkan; rapikan sebelum posting. Situs produksi harus sudah memuat paket sebelum posting.
  4. Kode kupon `UND-8F3K2Q7M` dan nomor WhatsApp fiktif, berlabel "contoh".
- Caption dan jam posting usulan: (room RILIS)
- Catatan untuk room berikutnya: komposisi 2D `AkunKeluargaH2C` sempat merusak bundle (JSON timing diganti jalur 3D); diperbaiki dengan `vo-timing-akun-keluarga-h2c-2d.json` (salinan dari commit 1af6d99).
