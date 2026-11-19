# A2-VIDEO

Video konten motion UI A2 Automation, dibuat dengan [Remotion](https://www.remotion.dev/) mengikuti `DESIGN.md`.

## Video: "Pesanan Sudah Sampai Mana?" — Konveksi 3D

- Komposisi `Konveksi3D`: Reels 1080×1920, 30 fps, sekitar 51 detik; naskah dan caption di `naskah-konveksi-3d.md`.
- Bengkel konveksi dimodelkan khusus dengan Blender 4.3.2: mesin jahit, jarum, jalur benang, kain, gunting, lembar order, lipatan kaus, rak bahan, serta laptop. Lima lintasan kamera asli, render Cycles, denoise Intel OIDN, dan interpolasi gerak kamera ke 30 fps. Grafis serta subtitle dikomposisikan dengan Remotion.
- Audio `public/konveksi/narration.wav`: bahasa Indonesia, suara standar Ardi Neural; suara bengkel dan efek konfirmasi asli di `workshop-sfx.wav`, tanpa musik. Timing kata: `src/data/konveksi-timing.json`.
- Simulasi pesanan K-021. Progres berubah setelah aksi petugas; bukan klaim sistem konveksi klien yang sudah berjalan.
- Hasil: `out/konveksi-3d-9x16.mp4`; model sumber: `public/konveksi/konveksi-workshop.blend`; klip 3D: `public/konveksi/clips/`; frame review: `out/stills/konveksi/`.

Urutan produksi ulang (Python dengan `edge-tts`, `Pillow`, `numpy`, `scipy`; Blender, FFmpeg, dan Intel OIDN tersedia):

```bash
python scripts/konveksi-props.py
python scripts/konveksi-audio.py
blender -b -t 3 -P scripts/konveksi-blender.py -- --render
A2_OIDN=/path/to/oidnDenoise python scripts/konveksi-denoise.py
REMOTION_BROWSER=/usr/bin/chromium node scripts/check-collisions.mjs Konveksi3D --every=15
python scripts/konveksi-release.py
```

Frame 3D antara tidak di-commit; skrip dapat melanjutkan render tanpa menimpa frame yang selesai. Suara dan hasil video lain tetap memakai aset masing-masing.
Skrip rilis memeriksa durasi klip, merender frame kunci dan video, lalu menormalkan audio ke sasaran −16 LUFS / true peak −1,5 dB dengan AAC stereo 48 kHz.

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
- Pembuka: aerial Masjidil Haram + judul "Sebelum daftar umroh", lalu lingkaran berbingkai emas membuka dari wajah pembicara (`src/tips-umroh/Intro.tsx`)
- Hook: dua zoom punch-in ke wajah (setelah bukaan dan di kata "harganya"), kembali halus sebelum poin 1
- B-roll: video asli H2C dari rekaman layar Bos, dipotong ke adegan bersih (tanpa ikon UI dan kursor) di `public/broll/`: fasilitas (nampan makanan), manasik (meja pendaftaran), pembimbing (Ustadz Ammikus). Layar penuh dengan whip-zoom, digeser ke atas agar bagian penting berada di atas kartu (`src/tips-umroh/Broll.tsx`)
- Efek suara di `public/sfx/umroh/` lewat `python3 scripts/make-sfx-umroh.py`: wush (kartu/B-roll masuk), ssset (zoom, coretan), ting naik nada (centang), plus angin dan dentum di pembuka
- Ajakan: tombol emas `umroh.h2c.or.id`. Kartu tanpa `backdrop-filter` (di render paralel Chromium kadang menghasilkan frame glitch kotak blur)
- Hasil: `out/tips-umroh-9x16.mp4` (1080×1920, 30 fps, 24,8 detik). Frame kunci: `out/stills/tips-umroh/`

## Video: "Alasan Saya Bikin A2" (komposisi `AlasanSayaBikinA2`, 9:16)

- Naskah: `naskah-alasan-saya-bikin-a2.md`. Cerita asal orang pertama: panggung ilustrasi animasi, satu garis waktu pelan dengan tiga titik cerita (yang dilihat, yang disadari, keputusan), teks kinetik, Gigi menemani di atas garis. Tanpa mockup, kursor, angka, atau ajakan
- Hasil: `out/alasan-saya-bikin-a2-9x16.mp4` (1080×1920, 30 fps, 48,0 detik: suara 43,42 dtk + logo diam)
- Voiceover: `public/audio/vo-alasan-saya-bikin-a2.mp3` (ElevenLabs Eleven v3, suara Bowo, dibuat Bos; kalimat 9 dibuat ulang dengan Bowo), timing per kalimat dan potongan di `src/data/vo-timing-alasan-saya-bikin-a2.json` (ffmpeg silencedetect)
- Ilustrasi animasi per bagian cerita (revisi 1): toko malam, mengetik ulang, tenaga habis, keluarga menunggu, mesin, fokus ke pelanggan, pulang tepat waktu (`Ilustrasi.tsx`)
- Kode: `src/AlasanSayaBikinA2.tsx`, adegan di `src/scenes/alasan-saya-bikin-a2/` (`Ilustrasi`, `GarisWaktu`, `GigiJalan`, `Judul`, `Penutup`, `Sfx`), timeline di `src/data/timeline-alasan-saya-bikin-a2.ts`
- Penutup: garis memudar, Gigi melompat menjadi gear di huruf A logo asli (tanpa ajakan, keputusan Bos). Revisi 2: kalimat 9 jadi "…kebersamaan keluarga", Gigi menggeleng ala 3D (prop `turn`) dan punya ekspresi `sedih`
- Frame kunci: `out/stills/alasan-saya-bikin-a2/` (dihitung dari timing suara, `scripts/alasan-saya-bikin-a2-frames.ts`). Perintah: `npm run stills:alasan`, `npm run render:alasan`

## Skill, pemeriksa tabrakan, dan hook penjaga (Fase 1)

- Skill di `.claude/skills/`: `a2-motion-video` (alur umum), `a2-anti-tabrakan`, `a2-komposisi-proximity`, `a2-safe-area-sosmed`, `a2-maskot-gigi`
- Pemeriksa tabrakan: `node scripts/check-collisions.mjs <IdKomposisi> [--every=15] [--frames=..] [--safe=off|x,y,w,h] [--protect=nama:x,y,w,h]`. Mengukur kotak teks sungguhan di Chromium lewat probe `src/dev/CollisionProbe.tsx` (aktif hanya lewat input props, render biasa tidak berubah). Melaporkan teks menimpa teks, teks di luar area aman 9:16, dan teks menutup area terlindungi (bawaan per komposisi di `scripts/collision-config.json`, mis. wajah pembicara). Komposisi baru wajib dibungkus `withProbe` di `src/Root.tsx`.
- Hook penjaga (`.claude/settings.json`, aktif saat sesi Claude Code dibuka di repo ini): menahan `remotion render` / `npm run render:*` bila pemeriksa menemukan masalah (lewati dengan `SKIP_CC=1`), memblokir `rm` pada `00-gigi-ekspresi.png` dan `out/stills/satu-pesanan/*`, dan menjalankan typecheck setelah file `src/` diubah.

## Otomatisasi (Fase 2)

- 6 skill tambahan: `a2-logo-animasi`, `a2-voiceover-sinkron`, `a2-sfx-signature`, `a2-explainer-kinetik`, `a2-mockup-desktop-kursor`, `a2-render-rilis` (total 11 skill di `.claude/skills/`).
- 4 subagent di `.claude/agents/`: `penulis-naskah` (konsep dan naskah, berhenti untuk persetujuan Bos), `pengulas-visual`, `pengulas-audio` (hanya melapor), `perender`.
- 4 slash command di `.claude/commands/`: `/video-baru <ide>`, `/review-frame <Id>`, `/versi-916 <Id>`, `/render-semua <Id ...>`.
- `node scripts/cek-regresi.mjs [Id ...]`: render ulang frame kunci video lama dan pastikan identik dengan yang di-commit (keluar 1 bila ada yang berubah).
- Agen dan perintah baru terbaca saat sesi Claude Code berikutnya dibuka di repo ini.

## Produksi berulang (Fase 3)

- `antrean-ide.md`: antrean ide video (status siap/tahan/selesai), diurus Bos. `/ide-mingguan [nomor]` mengambil satu ide, membuat konsep dan naskah lewat `penulis-naskah`, lalu berhenti menunggu persetujuan Bos.
- Tugas terjadwal mingguan menjalankan alur itu otomatis; tidak pernah merender, membuat suara, atau memposting sendiri.
- Skill `a2-jadwal-posting`: jadwal posting dan analitik via Metricool, **selalu minta persetujuan Bos** dan memakai jalur draf untuk ditinjau. Butuh konektor Metricool yang diotorisasi Bos (saat ini perlu sign-in ulang).

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
