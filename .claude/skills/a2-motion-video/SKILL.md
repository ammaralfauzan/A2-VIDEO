---
name: a2-motion-video
description: Buat video konten motion UI A2 Automation (soft selling, voiceover, kursor, mockup desktop) dengan Remotion, mengikuti DESIGN.md brand A2.
---

# A2 Motion Video

Skill untuk membuat video konten A2 Automation: mockup aplikasi desktop dengan kursor nyata, voiceover bahasa Indonesia, caption, dan penutup logo. Output MP4.

## Sebelum mulai
1. Baca `DESIGN.md` di root project. Itu kontrak visual; semua keputusan warna, font, grid, gerak, dan larangan diambil dari sana.
2. Cek folder `references/` (jika ada) untuk contoh gaya. Tiru kualitas dan ritmenya, bukan isinya.
3. Pakai file logo di `assets/logo/`. Jangan menggambar ulang logo; pakai file aslinya.
4. Jika naskah belum ada, tanyakan topik, target penonton, durasi, dan format (16:9 atau 9:16).

## Struktur konten soft selling
1. Hook (0–3 dtk): satu kalimat yang menyentuh rasa sakit penonton. Caption maksimal 6 kata.
2. Masalah (3–9 dtk): tunjukkan pekerjaan manual berulang, bukan dijelaskan.
3. Titik balik (±2 dtk): kekacauan berubah menjadi satu aplikasi bersih, kursor klik satu tombol.
4. Solusi (2–3 momen): satu manfaat per momen, satu interaksi kursor per manfaat.
5. Bukti: grafik atau angka (ilustrasi kecuali ada data nyata).
6. Soft selling: kalimat empatik tentang manusia, bukan fitur.
7. Ajakan: logo, tagline, "Konsultasi gratis · a2automate.com".

## Alur kerja
1. Naskah: tabel waktu, voiceover, caption, visual. Target ±2,3 kata per detik.
2. Voiceover: jika `public/audio/vo.mp3` ada, pakai itu. Buat timestamp per kalimat (transkripsi) di `src/data/vo-timing.json`. Jika belum ada audio, buat versi tanpa suara dengan durasi sesuai naskah dan beri tahu pengguna.
3. Storyboard: petakan setiap kalimat ke adegan. Durasi adegan mengikuti suara.
4. Remotion: satu komponen per adegan di `src/scenes/`. Komponen bersama di `src/components/`: Window, Cursor, Caption, Button, Toggle, ProgressBar, Chart, Island, Logo. Token di `src/theme.ts` dari DESIGN.md.
5. Gerak: `spring()` dengan damping tinggi (overshoot sangat kecil). Kursor ber-easing, mengecil saat klik. Tanpa cut kasar.
6. Render frame kunci (`npx remotion still`) untuk awal setiap adegan, periksa dengan checklist, perbaiki dulu.
7. Render penuh (`npx remotion render`) ke `out/` dalam MP4. Buat versi 9:16 bila diminta.

## Checklist review (wajib sebelum render penuh)
- Warna hanya dari token DESIGN.md; gradasi hanya untuk aksen.
- Maksimal dua keluarga huruf.
- Tanpa emoji, glassmorphism, gradasi ungu, ilustrasi 3D generik, lorem ipsum.
- Tanpa logo atau nama aplikasi pihak lain.
- Caption besar maksimal 6 kata dan sinkron dengan suara.
- Setiap perubahan UI didorong kursor; satu fokus gerak per momen.
- Logo memakai file asli tanpa diubah.
- Teks terbaca di layar ponsel.

## Aturan
- Jangan percepat suara agar muat durasi; perpanjang adegan.
- Angka di video adalah ilustrasi kecuali pengguna memberi data nyata.
- Laporkan path file MP4 dan frame kunci yang sudah direview.
