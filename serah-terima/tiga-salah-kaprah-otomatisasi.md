# Serah-terima: tiga-salah-kaprah-otomatisasi

- Judul / brand / format / durasi target: Tiga Salah Kaprah soal Otomatisasi / A2 Automation / Reels 9:16 / ±40 dtk (ditetapkan di KONSEP; antrean diperbarui dari ±35)
- Tahap terakhir selesai: RILIS (20 Nov 2026): video final (46,5 dtk) disetujui Bos; caption, jam posting, prompt sampul siap; belum diposting (menunggu Bos)
- Keputusan Bos (disetujui, jangan diubah): ide dipilih di IDE (v002-2011). Konsep dan naskah disetujui apa adanya, durasi 40 dtk, suara Jefri (Eleven v3, prompt di naskah). Ajakan: halus, konsultasi gratis a2automate.com. Musik: tidak (efek suara halus saja)
- File penting: `naskah-tiga-salah-kaprah-otomatisasi.md`, `public/audio/vo-tiga-salah-kaprah-otomatisasi.mp3`, `src/data/vo-timing-tiga-salah-kaprah-otomatisasi.json`, `src/data/timeline-tiga-salah-kaprah-otomatisasi.ts`, `src/TigaSalahKaprah.tsx`, `src/scenes/tiga-salah-kaprah-otomatisasi/`, `src/components/GigiPresisi.tsx`, `public/sfx/tiga/` (`scripts/make-sfx-tiga.py`), `out/tiga-salah-kaprah-otomatisasi-9x16.mp4`, frame kunci `out/stills/tiga-salah-kaprah-otomatisasi/`
- Status render: selesai, `out/tiga-salah-kaprah-otomatisasi-9x16.mp4` (1080×1920, 30 fps, 46,5 dtk, H.264 + AAC 48 kHz stereo, 5,9 MB). Durasi lebih dari target 40 dtk karena MP3 Bos 44,51 dtk (suara tidak dipercepat), ditambah logo diam ±2 dtk
- Daftar revisi Bos (belum dikerjakan): -
- Sudah diperiksa: baris #7 di `docs/daftar-konten.md` (konsep disetujui); anti-kembar ke `docs/daftar-konten.md` (terdekat #5 bisa-nggak; beda: menjawab ketakutan, mekanik kartu dibalik, tanpa peragaan); naskah 89 kata ≈ 38,7 dtk + logo ≈ 40 dtk (selisih ±3%); tag audio dari panduan model eleven_v3
- Diperiksa di BANGUN: tsc bersih; 34 frame kunci (termasuk tengah balik kartu dan perpindahan) dilihat; `check-collisions --every=15` bersih (94 frame); ffprobe 46,55 dtk 1080×1920 30 fps; volumedetect puncak -5,8 dB (tidak klip), efek suara memakai SFX_GAIN 0,2 sesuai skill (di bawah suara); tidak ada frame meloncat (beda terbesar = kartu dibalik navy→putih, wajar); `cek-regresi` video lain identik kecuali 3 frame derau lingkungan yang sudah tercatat di skill (dikembalikan). Komponen `Gigi.tsx` hanya diberi `export` (tampilan sama).
- Belum diperiksa / risiko (BANGUN): isi ucapan MP3 tidak ditranskripsi (konektor ElevenLabs tidak bisa mengunggah berkas lokal); 13 potongan ucapan cocok dengan 13 kalimat naskah, timing per kata = perkiraan suku kata di dalam segmen jeda. Durasi 46,5 dtk (target 40). Teks di kartu kecil baris atas kecil (±17 px), hanya rekap.
- Belum diperiksa / risiko (KONSEP): klaim "bagian teknisnya bisa dibantu" umum tanpa janji hasil; MP3 belum ada: Bos generate di ElevenLabs dari prompt di naskah, lalu lampirkan di room BANGUN
- Caption dan jam posting usulan (RILIS, 20 Nov 2026; Metricool belum tersambung, jam tidak berbasis data):
  - Caption (juga `rilis/tiga-salah-kaprah-otomatisasi/caption.txt`):
    ```
    Banyak yang menunda otomatisasi karena tiga anggapan ini:
    1. Harus jago teknis.
    2. Bakal menggantikan karyawan.
    3. Harus diubah semua sekaligus.

    Faktanya, cukup paham alur kerja Anda sendiri. Yang diganti pekerjaan berulangnya, bukan orangnya. Dan bisa mulai dari satu pekerjaan kecil dulu.

    Kalau boleh pilih satu, pekerjaan apa yang ingin Anda lepas duluan? Tulis di komentar.

    Konsultasi gratis di a2automate.com

    #A2Automation #Otomatisasi #PemilikUsaha #UMKM #TipsUsaha
    ```
  - Jam posting: Minggu, 22 Nov 2026, 19.30 WIB (Instagram Reels dan TikTok). Pemilik usaha biasanya menyiapkan minggu depan di Minggu malam, cocok dengan pertanyaan penutup; tidak bentrok dengan Alasan Saya Bikin A2 (Jumat 20 Nov).
  - Prompt desain sampul (juga `rilis/tiga-salah-kaprah-otomatisasi/prompt-sampul.txt`):
    ```
    Vertical cover for a short video, 9:16, 1080x1920 px. Clean, bright, minimalist flat design with soft depth. Background light #F4F6FA, main color navy #13254A, darkest text #0B1630, white cards #FFFFFF with thin border #E3E7EF and radius 16 px, one soft shadow only. Accent gradient 135 degrees from #00A6F4 to #0A3FD6 used on one element only. Green #1FAF6B only for the "FAKTA" label. Font: Geist (weights 400, 500, 600).
    Centered large title (Geist 600, navy #13254A, max 2 lines), placed fully inside the area x 90 to 990 and y 480 to 1440: "Tiga Salah Kaprah Otomatisasi"
    Above the title: three playing-card style cards fanned out. The front card is flipping in mid-air: its back side is navy #13254A with a small pill label "MITOS", its front side is white with a green #1FAF6B pill label "FAKTA". Labels are the only text on the cards.
    Below the title: a friendly gear mascot (navy #13254A gear with 8 square teeth, round white face screen in the exact center, simple dark eyes, relieved gentle smile), floating, perfect circle silhouette, thin precise gear thickness, soft shadow, looking up at the flipping card.
    Calm, reassuring, helpful mood. Generous empty space, all key elements inside the safe area.
    Do not include: emoji, purple or pink gradients, dark neon background, glassmorphism, 3D generic illustration, stock people, robots, third-party logos or brands, any redrawn A2 logo, numbers or claims, any text other than "Tiga Salah Kaprah Otomatisasi", "MITOS", and "FAKTA".
    ```
  - Catatan: tempel logo A2 asli secara manual di desain.
- Catatan untuk room berikutnya: Setiap prompt (suara, sampul, caption) ditampilkan di chat dalam kode blok siap salin (aturan Bos). BANGUN pakai pola explainer kinetik (`a2-explainer-kinetik`): kartu di zona VIS (y 260–1060), teks kinetik di TEXT_BOX (top 1110). Gigi wajib mengikuti "Arahan Bos untuk Gigi berikutnya" di skill `a2-maskot-gigi` (siluet lingkaran, layar wajah di tengah, morf ekspresi halus, lirikan mengikuti kartu). Cek suara MP3 Bos sebelum timing (skill `a2-voiceover-sinkron`).
