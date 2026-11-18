---
name: a2-logo-animasi
description: Animasi logo A2 Automation di penutup video dari lapisan piksel asli (tanpa menggambar ulang), termasuk Gigi menjadi gear di huruf A. Pakai saat membuat atau mengubah penutup/outro video A2.
---

# Logo animasi

## Aturan logo (DESIGN.md)
Jangan memutar, meregangkan, mewarnai ulang, memberi bayangan tebal, atau menggambar ulang logo. Selalu pakai piksel file asli.

## Lapisan
`python3 scripts/split-logo.py` memecah `public/logo/a2-automation.png` (1254x1254) menjadi lapisan transparan di `public/logo/parts/`: `a` (huruf A tanpa gear), `two` (angka 2), `gear`, `word` ("A2 AUTOMATION"), `tag` (tagline). Tagline diambil hanya teksnya (x 270–990), **tanpa dua garis strip** di kiri-kanan (permintaan Bos). Semua lapisan berukuran kanvas sama, jadi ditumpuk di posisi yang sama.
Gear di file asli: pusat (520, 641), ujung gigi r 70.

## Urutan penutup (contoh: `src/scenes/satu-pesanan/Ajakan.tsx`)
1. Gigi turun ke posisi gear (`GEAR_TARGET`), huruf A (tanpa gear) masuk dari bawah, angka 2 dari kanan.
2. Gigi menutup mata dan berputar pas ke kelipatan 45°, gear asli langsung penuh di bawahnya, Gigi memudar di atasnya. Detail di skill `a2-maskot-gigi`.
3. Wordmark masuk (`textIn`), lalu tagline terbuka huruf per huruf lewat `clipPath: inset(0 X% 0 0)` bertahap.
4. Ajakan dua tingkat: "Konsultasi gratis di" lalu tombol `a2automate.com` (`Button`), cincin biru berdenyut. Lihat `a2-komposisi-proximity`.

## Yang jangan ada
- Teks "A2 Automate" tambahan di bawah logo, titik "·" di tombol, watermark URL di pojok, gear ganda (gear di A harus hilang sebelum Gigi mendarat).
- Gaya masuk yang tidak seragam: semua elemen memakai spring + blur ke tajam + geser kecil (`enter()` di `Ajakan.tsx`).

## Untuk video 16:9
Pakai komponen `Logo` (`src/components/Logo.tsx`, `taglineReveal` untuk reveal tagline) dan `Outro.tsx`.
