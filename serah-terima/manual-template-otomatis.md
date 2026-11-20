# Serah-terima: manual-template-otomatis

- Judul / brand / format / durasi: Manual, Template, atau Otomatis? / A2 Automation / Reels 9:16 / 61,5 dtk (suara 60,03 dtk + logo ±1,5 dtk)
- Tahap terakhir selesai: RILIS (20 Nov 2026), video final disetujui Bos; caption, jam posting, prompt sampul siap; belum diposting
- Keputusan Bos (disetujui, jangan diubah): konsep tangga tiga tingkat, naskah, suara Jefri Eleven v3 (MP3 dari Bos), ajakan penutup "Suka dengan konten seperti ini? Follow @a2automation.official" (TANPA konsultasi gratis), tanpa musik
- File penting: `out/manual-template-otomatis-9x16.mp4`, `public/audio/vo-manual-template-otomatis.mp3`, `src/ManualTemplateOtomatis.tsx`, `src/scenes/manual-template-otomatis/`, `src/data/timeline-manual-template-otomatis.ts`, `src/data/vo-timing-manual-template-otomatis.json`, `out/stills/manual-template-otomatis/`
- Status render: selesai (tsc bersih, pemeriksa tabrakan bersih 124 frame, tanpa frame meloncat, ffprobe 1080x1920 30 fps 61,53 dtk, audio rata-rata -26,2 dB maks -6,5 dB, setara video lain)
- B-roll: B1 sampai B5 BELUM dilampirkan, dibangun tanpa klip. Slot sudah disiapkan (`BROLL_PLAN`, `BROLL_CLIPS` di `layout.ts`); revisi cukup mengisi klip lalu render ulang
- Daftar revisi Bos (belum dikerjakan): -
- Sudah diperiksa: tiap adegan dilihat di frame kunci (34 frame, termasuk tengah transisi); `cek-regresi` video lain identik kecuali 9 frame derau lingkungan (2 frame yang sudah dikenal + 7 frame kartu dibalik Tiga Salah Kaprah; terbukti derau: render ulang tanpa perubahan saya menghasilkan berkas yang sama), file stills lama dikembalikan, tidak ikut commit
- Belum diperiksa / risiko: timing suara dari jeda (ffmpeg), pemetaan potongan ke kalimat belum didengar manusia (transkripsi ElevenLabs tidak dipakai karena butuh unggah berkas); area atas tangga agak lega saat hook; Gigi usulan tambahan (Brand Kit menyebutnya)
- Caption dan jam posting (arsip, tahap RILIS 20 Nov 2026): isi persis di `rilis/manual-template-otomatis/caption.txt`; prompt sampul di `rilis/manual-template-otomatis/prompt-sampul.txt` (judul sampul "Kamu di Tingkat Berapa?"). Jam usulan: Kamis 26 Nov 2026, 19.30 WIB, IG Reels dan TikTok (malam hari pemilik usaha santai; berjarak dari video lain yang sudah dijadwalkan usul: 20, 22, 25 Nov; usulan umum, belum berbasis data karena konektor Metricool tidak aktif). Belum diposting, belum dijadwalkan.
- Catatan untuk room berikutnya: RILIS: caption + jam posting, catat ke Obsidian-SB (`proyek/`), baris `docs/daftar-konten.md` #10 sudah ditambah
