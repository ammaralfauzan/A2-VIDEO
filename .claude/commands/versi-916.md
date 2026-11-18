---
description: Buat versi 9:16 (Reels/TikTok/Shorts) dari video 16:9 dengan area aman
argument-hint: <IdKomposisi 16:9, mis. A2Umum>
---

Buat versi 9:16 dari: $ARGUMENTS

1. Baca skill `a2-safe-area-sosmed` dan `a2-komposisi-proximity`.
2. Ikuti pola `src/Vertical916.tsx` + `src/components/Vertical.tsx` (kamera menyorot fokus, teks ditata ulang di area aman x 60–900, y 220–1500, teks di x 540 lebar maks 720). Jangan hanya meng-crop.
3. Daftarkan komposisi `<Id>916` di `src/Root.tsx` (dibungkus `withProbe`), `SETS` di `scripts/render-stills.mjs`, skrip di `package.json`.
4. `node scripts/check-collisions.mjs <Id>916 --every=15`, review frame dengan `SAFE_GUIDE=1`, lalu pastikan versi 16:9 tetap identik: `node scripts/cek-regresi.mjs $ARGUMENTS`.
5. Render dan laporkan.
