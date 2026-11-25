# Serah-terima: akun-keluarga-h2c

- Judul / brand / format / durasi: Satu Akun untuk Sekeluarga / H2C Umroh (`h2c-umroh`) / Reels 9:16 1080x1920 30 fps / target 55 dtk, hasil **70,0 dtk** (suara V3 asli 69,1 dtk, ucapan sampai 68,8 dtk; tidak dipercepat)
- Tahap terakhir: BANGUN 3D (25 Nov 2026), jalur 3D dengan skill `a2-film-3d`. PLAN disetujui Bos, 3 still disetujui Bos. Pratinjau n=4 dirender di cloud. **Final kualitas penuh dijalankan Bos di Mac** (keputusan Bos).
- Keputusan Bos (disetujui, jangan diubah): ide, konsep, naskah; suara MP3 V3 (lampiran 25 Nov, menggantikan MP3 lama 61,6 dtk); hook "Umroh sekeluarga? Cukup satu akun kepala keluarga."; empat langkah; maksimal 4 anggota; kit `h2c-umroh` tanpa maskot; ajakan tombol emas `umroh.h2c.or.id`; tanpa makhluk bernyawa; PLAN 3D (monitor tegak, subtitle, 70 dtk); final di Mac.
- Versi 3D semu Remotion sebelumnya (`src/AkunKeluargaH2C.tsx`) dinyatakan gagal oleh Bos; tidak dipakai lagi, dibiarkan di repo.
- File penting: `naskah-akun-keluarga-h2c.md`, `public/audio/vo-akun-keluarga-h2c.mp3` (V3), `src/data/vo-timing-akun-keluarga-h2c.json`, `film3d/akun-keluarga-h2c/` (`PLAN.md`, `NOTES.md`, `film.js`, `sound/cues.json`, `sound/mix.wav`), still `out/stills/akun-keluarga-h2c-3d/`, pratinjau `out/akun-keluarga-h2c-9x16-pratinjau.mp4`, final `out/akun-keluarga-h2c-9x16.mp4`.
- Cara render final di Mac: `cd film3d/akun-keluarga-h2c && npm install && npm run final` (n=48 + audio `sound/mix.wav`), lalu salin `out/final.mp4` ke `out/akun-keluarga-h2c-9x16.mp4`.
- Status render: lihat bagian Hasil di bawah.
- B-roll: tidak dipakai (adegan 3D penuh).
- Daftar revisi Bos (belum dikerjakan): -
- Belum diperiksa / risiko: waktu kata dari silencedetect (Whisper diblokir jaringan), bagian langkah tiga 39-49 dtk paling tidak pasti (+-0,5 dtk); durasi 70 dtk melebihi target 55; fitur keluarga masih tersembunyi di situs, jangan diposting sebelum dinyalakan; nama tombol dan alur layar belum dicocokkan ke situs; suara menyebut WhatsApp, layar ditulis "Pesan"; belum didengar di speaker HP oleh manusia.
- Caption dan jam posting usulan: - (room RILIS)
- Catatan untuk room berikutnya: data layar fiktif berlabel "contoh" (Aisyah, Hasan, Fatimah, Umar; KLG-2417; melati24). Logo H2C dari berkas resmi. Efek suara dari `public/sfx/` + klik ketik sintetis `sound/key.wav`.

## Hasil
- (diisi setelah pratinjau)
