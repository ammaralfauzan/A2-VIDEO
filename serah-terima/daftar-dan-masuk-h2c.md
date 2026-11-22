# Serah-terima: daftar-dan-masuk-h2c

- Judul / brand / format / durasi target: Daftar dan Masuk Akun H2C, Satu Video Selesai / H2C Umroh (`h2c-umroh`) / 9:16 (format ISIAN kosong, default 9:16) / 60 dtk (wajib)
- Tahap terakhir selesai: BANGUN (22 Nov 2026), menunggu Bos menonton
- Keputusan Bos (disetujui, jangan diubah): web persis replika repo h2c-umroh; kursor manusiawi; sasaran bapak-ibu gaptek; kit `h2c-umroh` tanpa maskot, ajakan `umroh.h2c.or.id`; data fiktif, tanpa angka/klaim. Disetujui 22 Nov: naskah, hook "Mau pesan umroh lewat web H dua C? Buat akun dulu, sekali saja.", suara Jefri (Suara Penjelasan Lembut), B-roll B1-B4, format 9:16, durasi 60 dtk (target; naskah 143 kata ≈ 62 dtk).
- File penting: `naskah-daftar-dan-masuk-h2c.md`, `public/audio/vo-daftar-dan-masuk-h2c.mp3` (ada, 60,84 dtk), `src/data/vo-timing-daftar-dan-masuk-h2c.json`, `src/DaftarDanMasukH2C.tsx`, `src/scenes/daftar-dan-masuk-h2c/`, `public/broll/daftar-dan-masuk-h2c/B1-B4.mp4` (belum dilampirkan), `out/daftar-dan-masuk-h2c-9x16.mp4` (ada)
- Status render: selesai 22 Nov 2026, komposisi `DaftarDanMasukH2C`, 1080x1920, 30 fps, 61,8 dtk (suara 60,84 dtk tidak dipercepat + logo diam 0,9 dtk). Tanpa B-roll (B1-B4 belum dilampirkan; slot siap di `layout.ts` `BROLL`).
- Daftar revisi Bos (belum dikerjakan): -
- Sudah diperiksa: anti-kembar vs docs/daftar-konten.md (aman); 143 kata ≈ 62,2 dtk. BANGUN: tsc bersih; 33 frame kunci dilihat (termasuk tengah transisi); pemeriksa tabrakan 124 frame bersih; ffprobe 1080x1920 30 fps 61,78 dtk; volume puncak -4,3 dB (tidak pecah); tidak ada frame meloncat; regresi video lain identik dengan render kode HEAD (beda stills lama = derau lingkungan).
- Belum diperiksa / risiko: replika layar (header, tombol, URL /daftar /verifikasi /masuk /akun, isi beranda) dibuat dari Brand Kit, BUKAN dicocokkan ke repo h2c-umroh atau situs hidup (akses repo h2c-umroh ditolak di sesi BANGUN); layar sesudah kode benar; timing kata diperkirakan dari jeda (belum didengar manusia); di layar "Gmail" ditulis "email" (tanpa merek pihak ketiga), suara tetap menyebut Gmail; B-roll B1-B4 belum ada.
- Versi B (ajakan promo): diminta Bos 22 Nov, hanya penutup berbeda (lihat naskah). Detail promo belum diberikan Bos.
- Caption dan jam posting usulan: -
- Catatan untuk room berikutnya: bila Bos mengirim B1-B4, simpan di `public/broll/daftar-dan-masuk-h2c/`, isi `src` di `BROLL` (`layout.ts`), render ulang. Sebelumnya: BANGUN pakai replika layar (tema `src/brands/h2c-umroh/theme.ts`). "H2C" ditulis "H dua C" di suara. Prompt B-roll ada di bawah.

## Prompt B-roll (siap salin; dipakai Bos di generator video AI)
B1 · dipakai saat: "Mau pesan umroh lewat web H dua C? Buat akun dulu, sekali saja." (±3 dtk)
```
B1 · 3 seconds · 9:16 vertical (1080x1920)
Close-up of a person's hands holding a smartphone at a tidy wooden desk, thumb gently scrolling, soft warm window light, shallow depth of field, slow gentle push-in. Realistic, clean look, deep emerald green and warm gold tones, calm and reassuring mood.
Avoid: text, subtitles, logos, brand names, watermark, distorted hands or faces
```
B2 · dipakai saat: "Nanti ada kode enam angka yang dikirim ke email Anda." (±3 dtk)
```
B2 · 3 seconds · 9:16 vertical (1080x1920)
A smartphone lying on a wooden table lights up with a notification, a hand reaches in and picks it up, warm soft lighting, slight camera drift. Realistic, clean look, deep emerald green and warm gold tones, calm mood.
Avoid: text, subtitles, logos, brand names, watermark, distorted hands or faces
```
B3 · dipakai saat: "Selesai. Daftar cukup sekali ini saja." (±3 dtk)
```
B3 · 3 seconds · 9:16 vertical (1080x1920)
Hands resting relaxed on a laptop keyboard next to a cup of tea, a small relieved exhale of steam from the cup, warm daylight, very slow dolly-out. Realistic, clean look, deep emerald green and warm gold tones, peaceful reassuring mood.
Avoid: text, subtitles, logos, brand names, watermark, distorted hands or faces
```
B4 · dipakai saat: "Gampang, kan? Kunjungi umroh titik H dua C titik or titik id." (±4 dtk)
```
B4 · 4 seconds · 9:16 vertical (1080x1920)
A neat desk with a closed laptop, a small green plant and a cup of tea, golden hour light moving slowly across the surface, gentle slow pan upward. Realistic, clean look, deep emerald green and warm gold tones, warm calm mood.
Avoid: text, subtitles, logos, brand names, watermark, distorted hands or faces
```
