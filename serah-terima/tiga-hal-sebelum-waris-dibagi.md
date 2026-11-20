# Serah-terima: tiga-hal-sebelum-waris-dibagi

- Judul / brand / format / durasi target: Tiga Hal Sebelum Waris Dibagi / Tams Consulting (`tams-consulting`) / 9:16 (ISIAN kosong, ikut antrean #13) / 50 dtk (wajib, menimpa ±40 dtk antrean)
- Tahap terakhir selesai: RILIS (20 Nov 2026, room R5; video final disetujui Bos, belum diposting)
- Keputusan Bos (disetujui, jangan diubah): Brand Kit Tams disetujui 20 Nov 2026; arahan edukasi murni tanpa selling; tanpa orang/tangan; tanpa angka atau bagian waris; sumber di caption. Konsep, naskah, suara Jefri, dan 5 prompt B-roll DISETUJUI Bos (20 Nov 2026).
- File penting: `src/scenes/tiga-hal-sebelum-waris-dibagi/Ilustrasi.tsx` (revisi 1), `naskah-tiga-hal-sebelum-waris-dibagi.md`, (nanti) `public/audio/vo-tiga-hal-sebelum-waris-dibagi.mp3`, klip B-roll `B1..B5.mp4`, komposisi `TigaHalSebelumWaris` (`src/TigaHalSebelumWaris.tsx`), `out/tiga-hal-sebelum-waris-dibagi-9x16.mp4` (58,5 dtk), `public/audio/vo-tiga-hal-sebelum-waris-dibagi.mp3` (suara Kang Nandar), timing `src/data/vo-timing-tiga-hal-sebelum-waris-dibagi.json`
- Status render: revisi 1 dirender 20 Nov 2026 (58,5 dtk; tsc bersih, 29 frame kunci dilihat, pemeriksa tabrakan bersih 118 frame, tanpa frame meloncat, volume -24 dB / puncak -6,2 dB; regresi: hanya derau lingkungan di video lain, kode bersama tidak diubah)
- Daftar revisi Bos: revisi 1 SELESAI (20 Nov 2026): (a) ilustrasi jelas per penjelasan, benda saja tanpa wajah/orang -> kartu ilustrasi `Ilustrasi.tsx` (harta + BELUM DIBAGI, ikhtisar tiga gerbang, keranda + kafan + biaya, surat utang + cap LUNAS + HAK ORANG LAIN, amplop wasiat + SAH, mushaf di rehal + QS An-Nisa 4:11-12, rumah ahli waris); (b) tata letak di tengah -> semua di x 540 (lebar 720); (c) susulan Bos: ilustrasi lebih modern dan sudut bulat -> gaya bulat tanpa garis hitam tebal, kartu/label/baris/blok dibulatkan. Belum ada revisi baru. Catatan: sesi R4 lain (commit 6722e04, `Ikon.tsx`) mengerjakan revisi yang sama bersamaan tanpa permintaan susulan "modern + sudut bulat"; versinya digantikan commit 87996b9 dan sesudahnya.
- Sudah diperiksa: cek anti-kembar ke `docs/daftar-konten.md` (aman); jumlah kata 113 ≈ 49 dtk
- Belum diperiksa / risiko: Brand Kit Tams menulis sudut daun; revisi Bos meminta sudut bulat (dicatat di BRAND.md untuk video). Teks bawah muncul kata per kata di posisi akhir baris, jadi kata pertama sempat tampak di kiri sebelum baris lengkap (perilaku lama, tidak diubah). DURASI 58,5 dtk (suara 56,5 dtk) melebihi target 50 dtk; suara tidak dipercepat, perlu keputusan Bos (potong naskah atau terima). B-roll B1..B5 BELUM dilampirkan (juga di room R3 kedua, hanya MP3 yang sama), jadi dibangun tanpa klip (slot siap di `layout.ts`). Regresi video lain: 9 frame beda, semuanya derau lingkungan (terbukti dengan kode HEAD), tidak di-commit. urutan biaya jenazah dari fikih umum, bukan ayat (naskah menulis "menurut para ulama"); perlu telaah TAMS; suara Tams belum ditentukan (Jefri usulan); pelafalan "Al-Qur'an", "An-Nisa"; format 9:16 diasumsikan
- Caption dan jam posting usulan: lihat bagian RILIS di bawah.
- Catatan untuk room berikutnya: setelah Bos setuju, tambah baris #9 ke `docs/daftar-konten.md` (status "konsep disetujui") dan isi ISIAN UNTUK BANGUN. Tanpa Gigi, tanpa ajakan.


## RILIS (20 Nov 2026, room R5)

### Caption (siap tempel)
```
Harta almarhum belum boleh langsung dibagi. Ada tiga hal yang harus beres dulu:
1. Biaya perawatan jenazah.
2. Utang almarhum.
3. Wasiat yang sah.

Baru setelah itu, sisanya sampai ke ahli waris. Waris bukan soal cepat membagi, tetapi membagi dengan urutan yang benar.

Dasar: QS An-Nisa ayat 11-12 (waris dibagi setelah wasiat ditunaikan dan utang dilunasi). Biaya perawatan jenazah didahulukan menurut para ulama. Informasi umum; kasus tiap keluarga bisa berbeda.

Simpan dan bagikan ke keluarga yang sedang mengurus waris. Ikuti @tams.consulting untuk edukasi waris berikutnya.

#TamsConsulting #Waris #HukumWaris #EdukasiWaris #Faraid
```

### Jam posting (usulan)
Minggu 19.30 WIB, Instagram Reels. Alasan: keluarga berkumpul malam hari dan topiknya urusan keluarga. Usulan umum, belum berdasar data analitik (Metricool tidak terpasang).

### Prompt sampul (siap tempel)
```
Vertical cover for a short video, 9:16, 1080x1920 px. Clean, bright, professional flat design, solid flat colors only, no gradients, no heavy shadows, no blur. Background off-white #FEFEFE, light cards #F3F3F1 with a thin border rgba(10,10,10,0.10), main text black #0A0A0A, dark charcoal #2B2B2B for large blocks, single accent orange #E55B03 used for one highlight only. Font: Montserrat ExtraBold (weight 800). Fully rounded modern corners on every shape (large radius, no sharp corners).
Centered large title in Montserrat 800, two lines, black #0A0A0A with the word "Waris" in orange #E55B03, placed fully inside the area x 90 to 990 and y 480 to 1440: "Tiga Hal Sebelum Waris Dibagi"
Illustration below the title: one big charcoal #2B2B2B rounded block (the estate) flowing down through three rounded outlined gates stacked in a row, the gates drawn as simple charcoal outlines, the last gate lit orange #E55B03, ending in an empty light rounded box at the bottom. Objects and shapes only, flat vector, calm and reassuring, generous empty space, all key elements inside the safe area.
Do not include: people, hands, faces, silhouettes or human icons, emoji, third-party logos or brands, any redrawn Tams Consulting logo, numbers or claims, gradients, glassmorphism, 3D, mascots, any text other than "Tiga Hal Sebelum Waris Dibagi".
```
Tempel logo Tams Consulting yang asli secara manual di desain.

Berkas polos: `rilis/tiga-hal-sebelum-waris-dibagi/caption.txt`, `prompt-sampul.txt`.
Catatan: urutan biaya jenazah berasal dari fikih umum; perlu telaah TAMS sebelum posting. Durasi 58,5 dtk (target 50 dtk) diterima Bos dengan menyetujui video final.
