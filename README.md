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
```
Jika Chromium tidak bisa diunduh otomatis, isi `REMOTION_BROWSER` dengan path Chromium lokal.

## Mengganti voiceover
1. Ganti `public/audio/vo.mp3`.
2. Perbarui `src/data/vo-timing.json`, lalu sesuaikan `SCENES`, `CAPTIONS`, klik, dan jalur kursor di `timeline.ts`.
   Jika suara lebih panjang, perpanjang adegan, jangan percepat suara.

Angka di kedua video (mis. 32 siswa, 97 chat, 128 tagihan, Rp123 jt) hanya ilustrasi.
