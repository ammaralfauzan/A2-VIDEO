# Serah-terima: daftar-dan-masuk-h2c

- Judul / brand / format / durasi target: Daftar dan Masuk Akun H2C, Satu Video Selesai / H2C Umroh (`h2c-umroh`) / 9:16 (format ISIAN kosong, default 9:16) / 60 dtk (wajib)
- Tahap terakhir selesai: REVISI 2 (23 Nov 2026, room R4): teks layar penutup diselaraskan ulang ke suara. Menunggu Bos menonton.
- Keputusan Bos (disetujui, jangan diubah): web persis replika repo h2c-umroh; kursor manusiawi; sasaran bapak-ibu gaptek; kit `h2c-umroh` tanpa maskot, ajakan `umroh.h2c.or.id`; data fiktif, tanpa angka/klaim. Disetujui 22 Nov: naskah, hook "Mau pesan umroh lewat web H dua C? Buat akun dulu, sekali saja.", suara Jefri (Suara Penjelasan Lembut), B-roll B1-B4, format 9:16, durasi 60 dtk (target; naskah 143 kata ≈ 62 dtk).
- Versi yang dibangun: **F** (hook "Daftar online itu ribet? Salah!", OTP salin-tempel, promo di penutup; teks di naskah bagian "Versi F"). MP3 versi F dari Bos 23 Nov (63,79 dtk) menggantikan MP3 versi E.
- File penting: `naskah-daftar-dan-masuk-h2c.md`, `public/audio/vo-daftar-dan-masuk-h2c.mp3` (versi F, 63,79 dtk), `src/data/vo-timing-daftar-dan-masuk-h2c.json`, `src/DaftarDanMasukH2C.tsx`, `src/scenes/daftar-dan-masuk-h2c/`, `public/broll/daftar-dan-masuk-h2c/B1-B4.mp4` (belum dilampirkan), `out/daftar-dan-masuk-h2c-9x16.mp4` (ada)
- Status render: selesai 23 Nov 2026 (versi F), komposisi `DaftarDanMasukH2C`, 1080x1920, 30 fps, 64,7 dtk (suara 63,79 dtk tidak dipercepat + logo diam 0,9 dtk). Hook layar: "Daftar online itu RIBET?" dicoret, cap "SALAH!", pita "Bapak, Ibu juga bisa". OTP: angka disorot, menu "Salin" ditekan, toast "Kode disalin", kembali ke tab H2C, menu "Tempel" ditekan, 6 angka masuk sekaligus. Penutup chip "ADA PROMO UMROH" + tombol emas. Tanpa B-roll (B1-B4 belum dilampirkan).
- Daftar revisi Bos: REVISI 1 (23 Nov) ganti ke MP3 versi F: selesai. REVISI 2 (23 Nov) "dari Yuk Bapak Ibu sampai akhir, subtitle terlambat": selesai (penutup dipecah 4 potongan suara: 56,47 / 57,33 / 58,66 / 60,06 dtk; dulu salah digabung sehingga teks telat ±1 dtk; tombol URL kini muncul saat "lihat"). Belum ada revisi baru.
- Sudah diperiksa (REVISI 2): tsc bersih; 6 frame penutup dilihat; pemeriksa tabrakan bersih; 64,7 dtk; puncak -4,6 dB; tidak ada frame meloncat. Komponen bersama tidak disentuh (regresi tidak diulang).
- Sudah diperiksa (REVISI 1, versi F): tsc bersih; 40 frame kunci dilihat (termasuk tengah transisi hook, salin, tempel); pemeriksa tabrakan 130 frame bersih; ffprobe 1080x1920 30 fps 64,7 dtk; puncak -4,6 dB; tidak ada frame meloncat; regresi: 10 frame beda = daftar derau lingkungan di skill a2-render-rilis (komponen bersama tidak disentuh), dipulihkan.
- Sudah diperiksa (BANGUN versi E): tsc bersih; 35 frame kunci dilihat (termasuk tengah transisi), 2 temuan diperbaiki (cahaya sorotan menyentuh label, teks penutup menggantung "di"); pemeriksa tabrakan 129 frame bersih; ffprobe 1080x1920 30 fps 64,17 dtk; puncak -5,3 dB; tidak ada frame meloncat; regresi: 10 frame beda = daftar derau lingkungan di skill a2-render-rilis, dipulihkan.
- Sudah diperiksa sebelumnya: anti-kembar vs docs/daftar-konten.md (aman); 143 kata ≈ 62,2 dtk. BANGUN: tsc bersih; 33 frame kunci dilihat (termasuk tengah transisi); pemeriksa tabrakan 124 frame bersih; ffprobe 1080x1920 30 fps 61,78 dtk; volume puncak -4,3 dB (tidak pecah); tidak ada frame meloncat; regresi video lain identik dengan render kode HEAD (beda stills lama = derau lingkungan).
- Belum diperiksa / risiko: timing versi F dari jeda suara (konektor ElevenLabs minta izin ulang, transkripsi tidak bisa); 31 potongan cocok dengan urutan naskah, baris yang sama dengan versi E berdurasi hampir sama (selisih <0,15 dtk), tetapi belum didengar manusia; transkrip MP3 tidak dicek kata per kata (diasumsikan sama dengan naskah versi F); durasi 64,7 dtk (+8% dari target 60, karena suara tidak dipercepat); replika layar (header, tombol, URL /daftar /verifikasi /masuk /akun, isi beranda) dibuat dari Brand Kit, BUKAN dicocokkan ke repo h2c-umroh atau situs hidup (akses repo h2c-umroh ditolak di sesi BANGUN); layar sesudah kode benar; timing kata diperkirakan dari jeda (belum didengar manusia); di layar "Gmail" ditulis "email" (tanpa merek pihak ketiga), suara tetap menyebut Gmail; B-roll B1-B4 belum ada; prompt B-roll di bawah masih menyebut kalimat versi lama (B1 kini di hook "ribet? salah!", B2 di "Nanti ada kode", B3 di "Daftar cukup sekali", B4 di "Yuk, Bapak, Ibu").
- Versi B (ajakan promo): diminta Bos 22 Nov, hanya penutup berbeda (lihat naskah). Detail promo belum diberikan Bos.
- Caption dan jam posting usulan: -
- Catatan untuk room berikutnya: format 9:16 Reels. Bila Bos mengirim B1-B4, simpan di `public/broll/daftar-dan-masuk-h2c/`, isi `src` di `BROLL` (`layout.ts`), render ulang. Sebelumnya: BANGUN pakai replika layar (tema `src/brands/h2c-umroh/theme.ts`). "H2C" ditulis "H dua C" di suara. Prompt B-roll ada di bawah.

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
