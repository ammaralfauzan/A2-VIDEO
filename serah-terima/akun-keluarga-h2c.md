# Serah-terima: akun-keluarga-h2c

- Judul / brand / format / durasi: Satu Akun untuk Sekeluarga / H2C Umroh (`h2c-umroh`) / Reels 9:16 1080x1920 30 fps / target 55 dtk, hasil **70,0 dtk** (suara V3 asli 69,1 dtk, ucapan sampai 68,8 dtk; tidak dipercepat)
- Tahap terakhir: BANGUN 3D (25 Nov 2026), jalur 3D dengan skill `a2-film-3d`. PLAN disetujui Bos, 3 still disetujui Bos. Pratinjau n=4 dirender di cloud. **Final kualitas penuh dijalankan Bos di Mac** (keputusan Bos).
- Keputusan Bos (disetujui, jangan diubah): ide, konsep, naskah; suara MP3 V3 (lampiran 25 Nov, menggantikan MP3 lama 61,6 dtk); hook "Umroh sekeluarga? Cukup satu akun kepala keluarga."; empat langkah; maksimal 4 anggota; kit `h2c-umroh` tanpa maskot; ajakan tombol emas `umroh.h2c.or.id`; tanpa makhluk bernyawa; PLAN 3D (monitor tegak, subtitle, 70 dtk); final di Mac.
- Versi 3D semu Remotion sebelumnya (`src/AkunKeluargaH2C.tsx`) dinyatakan gagal oleh Bos; tidak dipakai lagi, dibiarkan di repo.
- File penting: `naskah-akun-keluarga-h2c.md`, `public/audio/vo-akun-keluarga-h2c.mp3` (V3), `src/data/vo-timing-akun-keluarga-h2c.json`, `film3d/akun-keluarga-h2c/` (`PLAN.md`, `NOTES.md`, `film.js`, `sound/cues.json`, `sound/mix.wav`), still `out/stills/akun-keluarga-h2c-3d/`, video `out/akun-keluarga-h2c-9x16.mp4` (final n=8, render cloud 26 Nov 2026), sampul `out/akun-keluarga-h2c-sampul.png`.
- Cara render final di Mac: `cd film3d/akun-keluarga-h2c && npm install && npm run final` (n=48 + audio `sound/mix.wav`), lalu salin `out/final.mp4` ke `out/akun-keluarga-h2c-9x16.mp4`.
- Status render: lihat bagian Hasil di bawah.
- B-roll: tidak dipakai (adegan 3D penuh).
- Daftar revisi Bos (belum dikerjakan): -
- Belum diperiksa / risiko: waktu kata dari silencedetect (Whisper diblokir jaringan), bagian langkah tiga 39-49 dtk paling tidak pasti (+-0,5 dtk); durasi 70 dtk melebihi target 55; fitur keluarga masih tersembunyi di situs, jangan diposting sebelum dinyalakan; nama tombol dan alur layar belum dicocokkan ke situs; suara menyebut WhatsApp, layar ditulis "Pesan"; belum didengar di speaker HP oleh manusia.
- Caption dan jam posting usulan: - (room RILIS)
- Catatan untuk room berikutnya: data layar fiktif berlabel "contoh" (Aisyah, Hasan, Fatimah, Umar; KLG-2417; melati24). Logo H2C dari berkas resmi. Efek suara dari `public/sfx/` + klik ketik sintetis `sound/key.wav`.

## Hasil
- 25 Nov 2026: pratinjau n=4 jadi, `out/akun-keluarga-h2c-9x16.mp4` (versi Remotion lama ditimpa). Cek: 70,0 dtk, 2100 frame, 30 fps, 1080x1920, -14,1 LUFS, true peak -1,3 dBTP, tanpa lompatan frame, 18 frame kunci diperiksa satu per satu. 13,6 MB (dikompres ulang CRF 24 agar muat di repo).
- Perbaikan saat pratinjau: subtitle menimpa UI layar di 13-58 dtk; kini posisi subtitle per pose kamera dan meloncat di tengah gerak (tidak meluncur). Dicatat ke skill `a2-film-3d`.
- Render cloud dipecah 14 potongan 5 dtk (container sempat restart dan merusak render pertama).
- Kualitas pratinjau: blur gerak masih bertangga (n=4), bintik grain. Final n=48 di Mac menghaluskannya.
- 25 Nov 2026 revisi Bos: caption kinetik baru (Jakarta 800 + Caveat Brush, pil lime, kata muncul satu-satu dengan blur halus), boleh di belakang kartu/angka/ponsel lewat masker siluet tapi tetap terbaca; posisi dihitung dari proyeksi kamera agar tidak menutup layar. Bayangan ganda (ghosting) diganti blur gerak adaptif. Caption ajakan akhir dihapus (layar sudah memuat teksnya).
- 26 Nov 2026: **final n=8 dirender di cloud** (Mac tidak diperlukan), 14 potongan 5 dtk, digabung dengan `sound/mix.wav`. Cek: 70,0 dtk, 2100 frame, 30 fps, 1080x1920, -14,0 LUFS, 11 frame kunci diperiksa. 18,4 MB (CRF 22). Sampul diambil ulang dari 67,5 dtk.
- Risiko: waktu langkah tiga ±0,5 dtk; 70 dtk vs target 55; fitur keluarga masih tersembunyi di situs (jangan posting sebelum live); suara/caption menyebut WhatsApp, layar menulis "Pesan"; belum didengar di speaker ponsel; n=8 mungkin sedikit grain.
- Status: **menunggu Bos** menilai final dan memberi lampu hijau rilis.
