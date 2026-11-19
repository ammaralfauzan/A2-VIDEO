---
name: a2-maskot-gigi
description: Spesifikasi dan cara menganimasikan maskot Gigi (gear A2) di video Remotion: bentuk, 8 ekspresi, aturan gerak, dan peralihan menjadi gear di logo. Pakai setiap video yang melibatkan Gigi agar tidak perlu mengulang revisi desain dan gerak.
---

# Maskot Gigi

Gigi adalah **gear yang sama dengan gear di logo A2** (huruf A). Komponen: `src/components/Gigi.tsx`. Lembar ekspresi untuk review: komposisi `GigiSheet` (`00-gigi-ekspresi.png`).

## Bentuk (jangan diubah)
- Proporsi diukur dari logo asli: ujung gigi r 70, badan r 58, lubang r 39, 8 gigi persegi bersudut tumpul (lebar ±20°), warna `color.navy`, lubang putih jadi "layar wajah".
- **Tanpa kaki.** Melayang. Ekspresi hanya lewat mata/alis/mulut kecil, mengacu lembar referensi mata dari Bos.
- Mata diperbesar ×1.3 dan sedikit diturunkan agar imut.
- **Bayangan lembut di belakang badan** (`shadow`), bukan elips di lantai.
- **Satu tetes keringat besar** (`sweat`, `sweatPhase`), bukan banyak tetes kecil; hanya untuk `cemas` dan `lelah`.
- Logo tidak digambar ulang: lapisan piksel asli ada di `public/logo/parts/` (dibuat `scripts/split-logo.py`).

## Ekspresi (`mood`)
`biasa` (■ ■) · `sedih` (alis melengkung tegas ujung dalam naik, mata sayu dengan sudut luar turun, mulut melengkung turun tipis; untuk momen haru, misalnya "waktu untuk keluarga", sambil mendongak menatap ilustrasi lewat `pitch`) · `senang` (^ ^) · `puas` (‿ ‿) · `kaget` (alis naik, mata bulat, mulut "o") · `cemas` (alis miring ujung dalam naik, mata kecil, mulut bergelombang, keringat) · `lelah` (> <, cemberut, keringat) · `mikir` (lirik atas, satu alis naik) · `kedip` (satu mata terpejam). `cemas`, `kaget`, `lelah` harus tegas; Bos pernah meminta diperkuat.

## Tampilan 3D (revisi 5 Bos, 19 Nov 2026)
Bos ingin Gigi **2D tetapi terlihat 3D**. Hanya menggeser wajah/menambah sisi gelap tipis (navy vs navyInk) tidak cukup terlihat. Pakai prop `volume={1}`: ketebalan gear (10 lapis siluet bergeser, ikut `turn`/`pitch`), bevel (tepi kiri-atas terang, kanan-bawah gelap), muka atas lebih kecil dengan kilau biru (blue1→blue2) dari kiri atas, bayangan kanan bawah, layar wajah cekung berbentuk kubah. Cahaya tetap, tidak ikut berputar. `volume` 0 = tampilan datar lama (identik). Saat menyatu ke gear logo (datar), pudarkan `volume` ke 0. Lembar uji: komposisi `GigiSheet3D` (`out/stills/00-gigi-3d.png`).
- Jebakan: `clipPath` SVG tidak boleh berisi `<g>`; bentuk pemotong harus `rect`/`circle` langsung dengan transform di tiap bentuk, kalau tidak, lapisan cahaya diam-diam tidak tergambar.

## Aturan gerak
00. **Gigi mengambang, tidak memantul (revisi Bos, 19 Nov 2026).** Sejak awal Gigi melayang, jadi tidak ada lompatan, pendaratan, atau pantulan. Perpindahan memakai pegas teredam kritis (tujuan berganti di awal perpindahan; mulai pelan, meluncur, melambat sampai diam, tanpa lewat batas), ditambah naik-turun mengambang pelan yang terus berjalan. Ke logo: melayang dengan lengkung landai, sampai dengan kecepatan nol. Contoh `simulate()` di `src/scenes/alasan-saya-bikin-a2/GigiJalan.tsx`. Saat berpindah dari satu lapisan gerak ke lapisan lain (mis. ke penutup), teruskan offset ayunan lalu redakan agar posisi tidak meloncat.
0. **Jangan gepeng (revisi Bos, 19 Nov 2026).** Gigi 2D tetapi harus terasa 3D: badan tidak dipipihkan/diregangkan untuk emosi atau perpindahan. Pakai prop `turn` (-1..1, menoleh) dan `pitch` (-1..1, mendongak/menunduk): **tanpa skala apa pun** (revisi 4 Bos: wajah yang menyempit saat menoleh tetap terbaca gepeng). Trik 3D-nya paralaks: layar wajah bergeser sedikit, mata bergeser lebih jauh, gigi gear ikut berputar sedikit, dan salinan gear `navyInk` di belakang bergeser ke arah berlawanan sehingga sisi tebal gear mengintip (seperti koin berputar). Saat menonton sesuatu di atas, pakai `pitch` negatif (mendongak), dirata-rata beberapa frame agar halus. Cemas = **menggeleng** realistis (revisi 4): ancang-ancang kecil ke arah berlawanan, ayunan pertama paling lebar, tiap ayunan ease sinus masuk-keluar (cepat di tengah, berhenti sesaat di ujung), amplitudo dan tempo mereda seperti bandul teredam, jeda, ulang lebih pelan dan kecil. Badan menyusul ±4 frame terlambat (follow-through) dan mata tetap menatap ke depan (bergerak berlawanan arah kepala). Contoh `SHAKE` di `src/scenes/alasan-saya-bikin-a2/GigiJalan.tsx`. Berpindah = menoleh ke arah tujuan. Ganti ekspresi = menoleh sekejap, ekspresi ditukar saat wajah paling menyamping (bukan memencet mata). Ekspresi yang punya alis/mulut jangan dikedipkan dengan `eyeOpen` (wajah jadi gepeng). `turn` 0 menghasilkan tampilan lama yang identik (video lama tidak berubah). Aturan regang-pipih di bawah hanya berlaku untuk video lama.
1. **Ekspresif dan halus:** ganti ekspresi dengan kelopak menutup lalu membuka (`eyeOpen`), bukan pindah mendadak.
2. **Bahasa badan mengikuti ekspresi:** `tilt` (miring), `squash` (regang/pipih; pipih saat mendarat), `spin` (cincin gear berputar, wajah tetap tegak).
3. **Kedip** berkala dengan jeda bergantian (`BLINK_GAPS` di `GigiTrack.tsx`), hanya pada ekspresi yang mata terbuka.
4. **Lirikan** mengikuti objek yang sedang dibicarakan (`look`).
5. **Jalur gerak dirancang dulu** (`keys` di `GigiTrack.tsx`) agar tidak melintasi kartu, chip, hub, atau teks. Lihat `a2-anti-tabrakan`.
6. Spring dengan damping tinggi (lihat DESIGN.md); tanpa pantulan berlebihan.

## Penutup: Gigi menjadi gear di logo
1. Gigi turun ke posisi gear di huruf A (`GEAR_TARGET` di `Ajakan.tsx`: pusat (520, 641), ukuran = 160/1254 × `LOGO_SIZE` pada file logo 1254 px).
2. Huruf A (tanpa gear) dan angka 2 masuk mengelilinginya; Gigi menutup mata (`eyesOpacity` → 0) dan berputar pas ke kelipatan 45°.
3. Gear asli langsung penuh di bawah Gigi, lalu Gigi memudar di atasnya (bentuk identik, tidak ada frame setengah transparan yang pucat).
4. Wordmark, ajakan, dan tombol URL menyusul. Tanpa teks "A2 Automate" tambahan, tanpa garis strip pada tagline, tanpa watermark URL.

## Suara
Efek suara dibuat dari `scripts/make-sfx.py` dan menempel pada kejadian visual (`Sfx.tsx`), volume ±12 dB di bawah suara pengisi.
Terkait: `a2-komposisi-proximity`, `a2-safe-area-sosmed`.
