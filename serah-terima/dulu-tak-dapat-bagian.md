# Serah-terima: dulu-tak-dapat-bagian

- Judul / brand / format / durasi target: Dulu Mereka Tidak Dapat Bagian / Tams Consulting (`tams-consulting`) / 9:16 / 40 dtk (ISIAN kosong, ditetapkan di KONSEP; antrean #16 semula ±35 dtk, sudah diperbarui) / jalur 2D
- Tahap terakhir selesai: KONSEP versi 2 DISETUJUI Bos (25 Nov 2026, room R2): naskah dan judul "Siapa yang Menentukan Bagian Waris?", tambah radhiyallahu 'anhu untuk Jabir dan Abu Bakar, suara Kang Nandar, 9:16, 40 dtk (naskah 93 kata ≈ 40,4 dtk). Bos memilih "2": ganti ke riwayat Bukhari 4577 / Muslim 1616 (Jabir sakit) + QS An-Nisa 4:7 dan 4:11; judul usulan "Siapa yang Menentukan Bagian Waris?", slug tetap
- Keputusan Bos (disetujui, jangan diubah): ide dipilih Bos (ISIAN 25 Nov): hook "Dulu, anak perempuan bisa tidak dapat apa-apa dari warisan ayahnya.", riwayat Jabir, QS An-Nisa 4:11, pesan "waris ketetapan Allah, bukan kebiasaan keluarga", pola dua kartu Sebelum/Sesudah dengan geser sudut daun, label "Riwayat hadits", tanpa orang/siluet, tanpa pecahan bagian. Konsep, naskah, suara: BELUM disetujui. Arahan Bos 25 Nov (revisi naskah): sumber riwayat ditampilkan di layar; shalawat setelah menyebut Nabi, "subhanahu wa ta'ala" setelah menyebut Allah; utamakan Bukhari-Muslim, selain itu boleh bila dari Rumaysho (dicatat di BRAND.md Tams).
- File penting: `naskah-dulu-tak-dapat-bagian.md`; nanti `public/audio/vo-dulu-tak-dapat-bagian.mp3`, `src/data/vo-timing-dulu-tak-dapat-bagian.json`, klip `B1..B5.mp4`, `out/dulu-tak-dapat-bagian-9x16.mp4`
- Status render: BANGUN selesai 25 Nov 2026 (R3): `out/dulu-tak-dapat-bagian-9x16.mp4`, 48,1 dtk (suara 46,1 + logo 2), 1080x1920 30 fps, tanpa B-roll (klip B1..B5 belum dilampirkan; slot siap di `src/scenes/dulu-tak-dapat-bagian/layout.ts`). Cek: tsc bersih untuk kode video ini, 20 frame kunci dilihat, tabrakan bersih (97 frame), tanpa frame meloncat, volume max -7,7 dB, regresi video lain identik (selain derau lingkungan yang tercatat di skill). Catatan awal BANGUN: label sumber "HR. Bukhari 4577, Muslim 1616" dan QS 4:11, 4:7; cocokkan nomor hadits ke teks asli sebelum rilis.
- Daftar revisi Bos (belum dikerjakan): - (menunggu Bos menonton)
- Sudah diperiksa: anti-kembar ke `docs/daftar-konten.md` (beda dari #9: topik sejarah ayat, bukan urutan pembagian; hook dan pola beda); jumlah kata 93 ≈ 40,4 dtk; tag audio dari panduan model eleven_v3
- Belum diperiksa / risiko: (BANGUN) MP3 bernama berkas "Jefri - Suara Penjelasan Lembut", bukan Kang Nandar seperti tertulis di naskah; dipakai apa adanya karena dikirim Bos. Durasi suara 46,1 dtk, lebih dari target 40 dtk (tidak dipercepat). Bundle Remotion di cabang rusak oleh `src/data/timeline-akun-keluarga-h2c.ts` (JSON timing diganti format 3D oleh room lain); BANGUN ini memakai tambalan lokal sementara (tidak di-commit) untuk merender; room akun-keluarga-h2c perlu memperbaikinya. Lama: riwayat Jabir di luar Bukhari-Muslim dan BELUM dipastikan ada di Rumaysho (sunnah.com dan rumaysho.com sudah diizinkan di jaringan, tetapi tertahan pemeriksa robot situs); nomor dari pencarian Tirmidzi 2092, Ibnu Majah 2720, Abu Dawud belum pasti; derajat hadits Tirmidzi (hasan gharib vs hasan shahih antar cetakan) dan nomor hadits, cek kitab asli; perlu telaah TAMS sebelum rilis; suara Tams belum ditetapkan Brand Kit (usul Kang Nandar seperti video #9); pelafalan "Sa'd bin Rabi'"; Brand Kit video memakai sudut bulat penuh, sedangkan ISIAN meminta geser sudut daun untuk transisi (dipakai hanya pada transisi kartu)
- Caption dan jam posting usulan: RILIS selesai 25 Nov 2026 (R5). Jam usulan: Kamis 26 Nov 2026, 19.30 WIB, IG Reels @tams.consulting. Caption dan prompt sampul diarsipkan di bawah dan di `rilis/dulu-tak-dapat-bagian/*.txt`. Belum diposting, menunggu Bos; Metricool tidak dipakai.
- ISIAN UNTUK RILIS: slug dulu-tak-dapat-bagian · brand Tams Consulting · format 9:16 Reels (1080x1920) · durasi 48 dtk
- Catatan untuk room berikutnya: baris #13 sudah ditambahkan ke `docs/daftar-konten.md` (konsep disetujui). BANGUN butuh MP3 dan klip B1..B5 dari Bos. Tanpa Gigi, tanpa ajakan, tanpa makhluk bernyawa (juga di B-roll).

## Telaah sanad riwayat Jabir (25 Nov 2026, dari pencarian; kitab asli belum dibuka)
- Takhrij: Tirmidzi 2092 (Tirmidzi: "hasan shahih", hanya lewat Abdullah bin Muhammad bin 'Aqil), Ibnu Majah 2720, Abu Dawud 2891-2892 (satu jalur keliru menyebut "Tsabit bin Qais"; yang terjaga Sa'd bin Rabi', kata Al-Albani), Ahmad.
- Titik lemah: Abdullah bin Muhammad bin 'Aqil, perawi diperselisihkan. Menghasankan: Tirmidzi, Al-Albani (Shahih Tirmidzi: hasan), Ibnu Hajar diam di Fathul Bari. Melemahkan: Musthafa Al-'Adawi, Zubair Ali Zai (Ibnu Majah: dha'if).
- Ibnu Hajar: ayat 4:11 turun untuk dua kisah, dua putri Sa'd dan sakitnya Jabir (HR Bukhari 4577, Muslim 1616, sahih).
- Kesimpulan kerja: hasan menurut banyak ulama, bukan sahih setingkat Bukhari-Muslim; belum dipastikan dibahas Rumaysho. Menunggu keputusan Bos.
- Sumber pencarian (tidak dicetak di konten): dorar.net/hadith/sharh/41049, almanhaj.or.id/2021-pembagian-harta-waris.html, islamweb.net/ar/article/205507, shamela.ws/book/7695/53, hadits.tazkia.ac.id/hadits/bab/6:967

## RILIS (25 Nov 2026, arsip)
### Caption
```
Siapa yang berhak menentukan bagian waris dalam keluarga?

Jabir bin Abdullah radhiyallahu 'anhu pernah sakit parah. Ia bertanya kepada Rasulullah shallallahu 'alaihi wa sallam tentang hartanya, lalu turun ayat waris. Bagian untuk laki-laki dan perempuan sudah ditetapkan Allah subhanahu wa ta'ala.

Waris bukan soal kebiasaan keluarga, tetapi ketetapan Allah subhanahu wa ta'ala.

Dasar: HR. Bukhari 4577, Muslim 1616; QS An-Nisa ayat 11 dan 7. Informasi umum; kasus tiap keluarga bisa berbeda.

Simpan dan bagikan ke keluarga yang sedang mengurus waris. Ikuti @tams.consulting untuk edukasi waris berikutnya.

#TamsConsulting #Waris #HukumWaris #EdukasiWaris #Faraid
```
### Prompt sampul
```
Vertical cover for a short video, 9:16, 1080x1920 px. Clean, bright, professional flat design, solid flat colors only, no gradients, no heavy shadows, no blur. Background off-white #FEFEFE, light cards #F3F3F1 with a thin border rgba(10,10,10,0.10), main text black #0A0A0A, dark charcoal #2B2B2B for large blocks, single accent orange #E55B03 used for one highlight only. Font: Montserrat ExtraBold (weight 800). Fully rounded modern corners on every shape (large radius, no sharp corners).
Centered large title in Montserrat 800, three lines, black #0A0A0A with the word "Waris" in orange #E55B03, placed fully inside the area x 90 to 990 and y 480 to 1440: "Siapa yang Menentukan Bagian Waris?"
Illustration below the title: two equal light rounded folders side by side, labelled in small Montserrat 700 capitals "LAKI-LAKI" and "PEREMPUAN", both filled and equal in size, with a short charcoal #2B2B2B rounded ribbon across them reading "DITETAPKAN"; behind them a small closed old book on a wooden stand drawn as a flat charcoal shape. Objects and shapes only, flat vector, calm and reassuring, generous empty space, all key elements inside the safe area.
Do not include: people, hands, faces, silhouettes or human icons, emoji, third-party logos or brands, any redrawn Tams Consulting logo, numbers or claims, gradients, glassmorphism, 3D, mascots, any text other than "Siapa yang Menentukan Bagian Waris?", "LAKI-LAKI", "PEREMPUAN" and "DITETAPKAN".
```
