# Serah-terima: wasiat-maksimal-sepertiga

- Judul / brand / format / durasi target: Kenapa Wasiat Dibatasi Sepertiga? / Tams Consulting (`tams-consulting`) / 9:16, jalur 2D / target 50 dtk; hasil 61,7 dtk (suara Bos 59,7 dtk, tidak dipercepat)
- Tahap terakhir selesai: RILIS (25 Nov 2026, room R5); video final disetujui Bos. Tinggal posting oleh Bos
- Keputusan Bos (disetujui, jangan diubah): Brand Kit Tams (20 Nov 2026); edukasi murni tanpa selling; tanpa makhluk bernyawa; tanpa nominal/persentase; konsep, naskah, dan suara (MP3 Jefri 25 Nov 2026) disetujui
- File penting: `naskah-wasiat-maksimal-sepertiga.md`, `public/audio/vo-wasiat-maksimal-sepertiga.mp3`, `src/data/vo-timing-wasiat-maksimal-sepertiga.json`, komposisi `WasiatMaksimalSepertiga`, `out/wasiat-maksimal-sepertiga-9x16.mp4`
- Status render: ada (revisi 1), 61,7 dtk, 1080x1920 30 fps, 25 Nov 2026
- Daftar revisi Bos:
  - Revisi 1 (SELESAI 25 Nov 2026): kurang ilustrasi, tatanan berantakan, kurang estetik/modern, teks atas jangan pakai kotak. Dikerjakan: judul atas tanpa kotak (tipografi bebas, label oranye bertitik); tiga zona tetap (judul / panggung ilustrasi / teks bawah); 9 adegan ilustrasi benda (harta+surat wasiat, kamar sunyi Sa'd, batang harta besar berisi rumah-emas-koin dengan gembok, toples penuh vs mangkuk kosong, rak kitab Bukhari-Muslim, potongan kewajiban lepas, palang penahan wasiat ke ahli waris, bingkisan bagian bersegel, rumah dinaungi lengkung di penutup); "radhiyallahu 'anhu" ditambah di layar setelah nama Sa'd. Naskah, suara, timing tidak diubah.
- Sudah diperiksa (revisi 1): tsc bersih, 28 frame kunci dilihat, pemeriksa tabrakan --every=15 bersih (124 frame), ffprobe 61,7 dtk 1080x1920, volumedetect rata -27,5 / puncak -6,2 dB, tanpa kedipan/frame meloncat. Regresi video lain TIDAK bisa dijalankan (bundel utuh gagal karena data akun-keluarga-h2c); perubahan hanya di berkas video ini + opsi REMOTION_ENTRY di dua skrip (bawaan tidak berubah)
- Sudah diperiksa (bangun): tsc (bersih untuk video ini), 27 frame kunci dilihat, pemeriksa tabrakan `--every=15` bersih (124 frame), ffprobe, volumedetect (rata -27,5 dB, puncak -6,2 dB), tanpa kedipan/frame meloncat, regresi video lain identik (9 frame derau lingkungan yang sudah tercatat di skill dikembalikan)
- Belum diperiksa / risiko:
  - B-roll B1..B5 belum dilampirkan: dibangun tanpa klip (slot siap di `layout.ts`)
  - Suara tidak mengucapkan "shallallahu 'alaihi wa sallam" (prompt suara dibuat sebelum aturan Brand Kit 25 Nov); di layar sudah ditulis setiap kata "Nabi"
  - Nomor hadits di layar (Bukhari 2742, Muslim 1628, Abu Dawud 2870, Ibnu Majah 2713) dari naskah; perlu telaah TAMS sebelum rilis
  - Timing dari silencedetect (konektor ElevenLabs tanpa alat unggah); pemetaan 26 potongan cocok semua, belum didengar langsung
  - Data timing `akun-keluarga-h2c` diubah room 3D (5a02c61) sehingga bundel Remotion gagal; untuk render dipulihkan sementara di lokal, TIDAK di-commit. Room akun-keluarga-h2c perlu memperbaikinya
- Caption dan jam posting usulan: lihat bagian RILIS di bawah (arsip; teks polos di `rilis/wasiat-maksimal-sepertiga/`)
- Catatan untuk room berikutnya: render/cek video ini pakai entry `src/entries/wasiat-maksimal-sepertiga.tsx` (REMOTION_ENTRY=...), tidak perlu memulihkan berkas akun-keluarga.  format 9:16, durasi 61,7 dtk. Bila Bos mengirim klip B-roll, isi `src` di `BROLL` lalu render ulang. Bila bundel gagal karena `timeline-akun-keluarga-h2c.ts`, pulihkan sementara `git show 5a02c61^:src/data/vo-timing-akun-keluarga-h2c.json` dan kembalikan sebelum commit.


## RILIS (25 Nov 2026)
- Jam usulan: Jumat 27 Nov 2026, 10.00 WIB, IG Reels akun Tams (data Metricool: Jumat 10.00 tertinggi minggu itu; sehari setelah dulu-tak-dapat-bagian di Kamis 26 Nov). Cadangan: Rabu 2 Des 10.00.
- Caption: `rilis/wasiat-maksimal-sepertiga/caption.txt`. Prompt sampul: `rilis/wasiat-maksimal-sepertiga/prompt-sampul.txt` (judul "Kenapa Wasiat Dibatasi Sepertiga?").
- Risiko: nomor hadits (Bukhari 2742, Muslim 1628, Abu Dawud 2870, Ibnu Majah 2713) belum dicocokkan ke kitab asli, perlu telaah TAMS. Handle di caption sengaja tidak ditulis: Brand Kit mencatat @tams.consulting, tetapi Metricool menunjukkan akun terhubung tams.syariahconsulting; Bos tentukan.
- Draf Metricool: belum dibuat (menunggu Bos melihat caption dan jam). Belum diposting.
