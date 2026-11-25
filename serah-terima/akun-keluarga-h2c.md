# Serah-terima: akun-keluarga-h2c

- Judul / brand / format / durasi: Satu Akun untuk Sekeluarga / H2C Umroh (`h2c-umroh`) / 9:16 Reels 1080x1920 / target 55 dtk, hasil 62,5 dtk (suara asli 61,57 dtk, tidak dipercepat)
- Tahap terakhir selesai: BANGUN (25 Nov 2026), tetapi **video 3D dinyatakan gagal oleh Bos**: dibangun 3D semu di Remotion, bukan skill `a2-film-3d`. Berikutnya: menunggu keputusan Bos (pakai 3D semu atau bangun ulang lewat BANGUN 3D).
- Keputusan Bos (disetujui, jangan diubah): ide, konsep, naskah, dan suara (MP3 Jefri dari Bos 25 Nov); hook "Umroh sekeluarga? Cukup satu akun kepala keluarga."; empat langkah; maksimal 4 anggota; kit `h2c-umroh` tanpa maskot; ajakan tombol emas `umroh.h2c.or.id`; tanpa makhluk bernyawa.
- Cara bangun: Bos memberi blok BANGUN (Remotion), bukan BANGUN 3D, jadi visual konsep 3D (meja zamrud, monitor, kartu nama, ponsel, angka besar, kamera mendekat) dibuat sebagai meja 3D semu di Remotion, tanpa PLAN.md/still terpisah dan tanpa render Mac.
- File penting: `naskah-akun-keluarga-h2c.md`, `public/audio/vo-akun-keluarga-h2c.mp3`, `src/data/vo-timing-akun-keluarga-h2c.json`, `src/AkunKeluargaH2C.tsx`, `src/scenes/akun-keluarga-h2c/`, `src/data/timeline-akun-keluarga-h2c.ts`, `out/akun-keluarga-h2c-9x16.mp4`, `out/stills/akun-keluarga-h2c/`
- Status render: selesai, `out/akun-keluarga-h2c-9x16.mp4`
- B-roll: B1-B4 belum dilampirkan; dibangun tanpa B-roll. Titik sisip siap di `layout.ts` (`BROLL`, `src: null`).
- Daftar revisi Bos (belum dikerjakan): -
- Sudah diperiksa: tsc bersih; 24 frame kunci (termasuk tengah transisi) dilihat; pemeriksa tabrakan `--every=15` bersih; render penuh dicek ffprobe, volumedetect, frame meloncat; cek regresi video lain.
- Belum diperiksa / risiko: timing dari silencedetect (bukan transkripsi), belum didengar manusia; durasi 62,5 dtk melebihi target 55 dtk karena suara asli 61,6 dtk; fitur keluarga masih tersembunyi di situs, jangan diposting sebelum dinyalakan; nama tombol dan alur layar belum dicocokkan ke situs; suara menyebut WhatsApp, teks layar ditulis "pesan".
- Caption dan jam posting usulan: - (room RILIS)
- Catatan untuk room berikutnya: data layar fiktif (Aisyah, Hasan, Fatimah, Umar; KLG-2417; melati24) berlabel "contoh". Pelajaran kamera 3D semu ditulis di skill `a2-anti-tabrakan`.
