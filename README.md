# A2-VIDEO

Video konten motion UI A2 Automation, dibuat dengan [Remotion](https://www.remotion.dev/) mengikuti `DESIGN.md`.

## Video: "Jam 9 Malam di Ruang TU"
- Naskah: `naskah-jam-9-malam.md`
- Hasil: `out/jam-9-malam-16x9.mp4` (1920×1080, 30 fps, 30 detik, **tanpa suara**)
- Frame kunci yang direview: `out/stills/`

## Struktur
- `src/theme.ts`: token warna, huruf, radius, bayangan, dan spring dari DESIGN.md
- `src/data/timeline.ts`: waktu adegan, caption, jalur kursor, dan klik (frame global)
- `src/data/vo-timing.json`: timestamp per kalimat (saat ini estimasi dari naskah)
- `src/scenes/`: satu komponen per adegan
- `src/components/`: Window, Cursor, Caption, Button, Toggle, ProgressBar, Chart, Island, Logo, Clock, AppScreen, MessyDesktop
- `public/logo/a2-automation.png`: salinan identik `asset/logo/logo a2 automation.png`
- `public/fonts/`: Geist 400/500/600

## Perintah
```bash
npm install
npm run studio      # pratinjau
npm run stills      # render frame kunci ke out/stills/
npm run render      # render MP4 ke out/
```
Jika Chromium tidak bisa diunduh otomatis, isi `REMOTION_BROWSER` dengan path Chromium lokal.

## Menambahkan voiceover
1. Taruh audio di `public/audio/vo.mp3`.
2. Isi `src/data/vo-timing.json` dari transkripsi, lalu sesuaikan `SCENES`, `CAPTIONS`, dan klik di `timeline.ts`.
   Jika suara lebih panjang, perpanjang adegan, jangan percepat suara.
3. Tambahkan `<Audio src={staticFile('audio/vo.mp3')} />` di `src/Main.tsx`.

Angka di video (32 siswa, 84 chat, 186 wali murid, 38 jam/bulan) hanya ilustrasi.
