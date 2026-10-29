# A2-VIDEO

Video konten motion UI A2 Automation, dibuat dengan [Remotion](https://www.remotion.dev/) mengikuti `DESIGN.md`.

## Video: "Jam 9 Malam di Ruang TU"
- Naskah: `naskah-jam-9-malam.md`
- Hasil: `out/jam-9-malam-16x9.mp4` (1920×1080, 30 fps, 34 detik, dengan voiceover)
- Voiceover: `public/audio/vo.mp3` (33,07 detik)
- Frame kunci yang direview: `out/stills/`

## Video: "Makin Tumbuh, Makin Sibuk" (komposisi `A2Umum`)
- Naskah: `naskah-a2-umum.md`
- Hasil: `out/a2-umum-16x9.mp4` (1920×1080, 30 fps, 34 detik, dengan voiceover)
- Voiceover: `public/audio/vo-a2-umum.mp3` (33,23 detik), timing per kalimat di `src/data/vo-timing-a2-umum.json`
- Timeline: `src/data/timeline-a2-umum.ts`, adegan di `src/scenes/a2-umum/`
- Frame kunci yang direview: `out/stills/a2-umum/`

## Versi 9:16 untuk media sosial (Reels, TikTok, Shorts)
- `out/jam-9-malam-9x16.mp4` (komposisi `JamSembilanMalam916`) dan `out/a2-umum-9x16.mp4` (komposisi `A2Umum916`), 1080×1920
- Frame kunci: `out/stills/jam-9-malam-9x16/` dan `out/stills/a2-umum-9x16/`
- Area aman (`SAFE` di `src/components/Vertical.tsx`): x 60–900, y 220–1500. Kanan 180 px dikosongkan untuk tombol like/komentar/share, bawah 420 px untuk caption, nama akun, dan musik, atas 220 px untuk tab.
- Stage 16:9 dirender di dalam kamera yang zoom dan menggeser mengikuti kursor (`src/Vertical916.tsx`). Caption, jam, island, teks empati, dan penutup ditata ulang di area aman.
- Review area aman: `SAFE_GUIDE=1 STILLS_DIR=<folder> npm run stills:9x16` menandai zona terlarang dengan merah.

## Video: "Satu Pesanan, Tujuh Langkah" (komposisi `SatuPesanan`, 9:16)
- Naskah: `naskah-satu-pesanan.md`. Gaya explainer: teks kinetik kata per kata, diagram simpul yang terus bermorf, maskot Gigi
- Hasil: `out/satu-pesanan-9x16.mp4` (1080×1920, 30 fps, 43,5 detik, dengan voiceover)
- Voiceover: `public/audio/vo-satu-pesanan.mp3` (ElevenLabs, suara Jefri), timing per kalimat dan potongan di `src/data/vo-timing-satu-pesanan.json`
- Maskot Gigi (`src/components/Gigi.tsx`): gear yang sama dengan gear di logo A2, ekspresi lewat mata; lembar ekspresi di komposisi `GigiSheet`
- Efek suara: disintesis sendiri lewat `python3 scripts/make-sfx.py` ke `public/sfx/` (motif 7 langkah = tangga nada D mayor, terselesaikan jadi akor saat hub tersambung); jadwal bunyi di `src/scenes/satu-pesanan/Sfx.tsx`
- Penutup: Gigi turun ke posisi gear huruf A lalu menjadi gear logo. Logo dipisah per bagian dari file asli lewat `python3 scripts/split-logo.py` ke `public/logo/parts/` (tagline tanpa dua garis strip)
- Frame kunci: `out/stills/satu-pesanan/` (frame dihitung otomatis dari timing kalimat)

## Video: "5 Hal Sebelum Daftar Umroh" (komposisi `TipsUmroh`, 9:16)

- Video bicara asli (WhatsApp 28 Okt 2026) di `public/video/tips-umroh.mp4` (dikonversi ke H.264), ditambah motion graphic penjelasan
- Gaya visual mengikuti situs Wakaf H2C: hijau hutan, emas, krem; judul Fraunces dengan sorotan italic emas, kartu kaca, nomor `01` italic, tombol emas berkilau. Token di `src/tips-umroh/theme.ts`
- Transkrip dan timing per kata (ElevenLabs Scribe): `src/data/tips-umroh-words.json`; grafis menempel pada kata yang diucapkan (`src/tips-umroh/timeline.ts`)
- Tata letak: kartu di y 1050–1480, strip progres di y 236; wajah pembicara (y 460–860) tidak tertutup, kanan 180 px dan bawah 420 px bebas untuk tombol sosmed
- Hasil: `out/tips-umroh-9x16.mp4` (1080×1920, 30 fps, 24,8 detik). Frame kunci: `out/stills/tips-umroh/`

## Struktur
- `src/theme.ts`: token warna, huruf, radius, bayangan, dan spring dari DESIGN.md
- `src/data/timeline.ts`: waktu adegan, caption, jalur kursor, dan klik (frame global)
- `src/data/vo-timing.json`: timestamp per kalimat dari deteksi jeda hening di vo.mp3
- `src/scenes/`: satu komponen per adegan
- `src/components/`: Window, Cursor, Caption, Button, Toggle, ProgressBar, Chart, Island, Logo, Clock, Outro, AppUI (sidebar, header, kartu), AppScreen/AppScreenUmum, MessyDesktop/MessyDesktopUmum
- `public/logo/a2-automation.png`: salinan identik `asset/logo/logo a2 automation.png`
- `public/fonts/`: Geist 400/500/600

## Perintah
```bash
npm install
npm run studio      # pratinjau
npm run stills              # frame kunci "Jam 9 Malam" ke out/stills/
npm run render              # MP4 "Jam 9 Malam" ke out/
npm run stills:a2-umum      # frame kunci A2Umum ke out/stills/a2-umum/
npm run render:a2-umum      # MP4 A2Umum ke out/
npm run stills:9x16 / npm run stills:a2-umum-9x16    # frame kunci 9:16
npm run render:9x16 / npm run render:a2-umum-9x16    # MP4 9:16
npm run stills:satu-pesanan / npm run render:satu-pesanan
npm run stills:tips-umroh / npm run render:tips-umroh
```
Jika Chromium tidak bisa diunduh otomatis, isi `REMOTION_BROWSER` dengan path Chromium lokal.

## Mengganti voiceover
1. Ganti `public/audio/vo.mp3`.
2. Perbarui `src/data/vo-timing.json`, lalu sesuaikan `SCENES`, `CAPTIONS`, klik, dan jalur kursor di `timeline.ts`.
   Jika suara lebih panjang, perpanjang adegan, jangan percepat suara.

Angka di kedua video (mis. 32 siswa, 97 chat, 128 tagihan, Rp123 jt) hanya ilustrasi.
