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

## Skill pendukung (wajib dibaca saat relevan)
- `a2-anti-tabrakan`: cegah elemen saling menimpa; menjalankan `scripts/check-collisions.mjs` sebelum render penuh.
- `a2-komposisi-proximity`: pengelompokan, penengahan, ajakan dua tingkat.
- `a2-safe-area-sosmed`: area aman 9:16 (x 60–900, y 220–1500).
- `a2-maskot-gigi`: bentuk, ekspresi, dan gerak maskot.
- `a2-logo-animasi`: penutup dengan lapisan logo asli dan Gigi menjadi gear.
- `a2-voiceover-sinkron`: naskah untuk suara, ElevenLabs, timing, adegan mengikuti suara.
- `a2-sfx-signature`: efek suara sintesis dan jadwalnya.
- `a2-explainer-kinetik`: format explainer 9:16 teks kinetik dan kerangka cerita.
- `a2-mockup-desktop-kursor`: demo aplikasi desktop 16:9 dengan kursor.
- `a2-render-rilis`: stills → review → render → regresi → commit → kirim.
- `a2-jadwal-posting`: jadwal posting dan analitik via Metricool (selalu minta persetujuan Bos).
Agen di `.claude/agents/`: `penulis-naskah`, `pengulas-visual`, `pengulas-audio`, `perender`. Perintah: `/video-baru`, `/review-frame`, `/versi-916`, `/render-semua`, `/ide-mingguan`.
Hook penjaga di `.claude/settings.json` menahan `remotion render` bila pemeriksa tabrakan menemukan masalah dan menjalankan typecheck setelah file `src/` diubah.

## Aturan
- Jangan percepat suara agar muat durasi; perpanjang adegan.
- Angka di video adalah ilustrasi kecuali pengguna memberi data nyata.
- Laporkan path file MP4 dan frame kunci yang sudah direview.
