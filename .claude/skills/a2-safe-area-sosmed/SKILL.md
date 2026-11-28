---
name: a2-safe-area-sosmed
description: Area aman 9:16 untuk Reels, TikTok, dan Shorts pada video A2/H2C agar tidak tertutup tombol like/komentar/share, caption, nama akun, dan tab. Pakai setiap membuat atau mengubah versi 9:16 atau video vertikal baru.
---

# Safe area media sosial (1080x1920)

Area aman gabungan TikTok + Reels + Shorts, sudah dipakai di semua video 9:16 repo ini:

| Sisi | Batas | Kenapa |
|---|---|---|
| Kiri | x ≥ 60 | tepi layar |
| Kanan | x ≤ 900 | kolom tombol like, komentar, share (180 px) |
| Atas | y ≥ 220 | tab, judul, status bar |
| Bawah | y ≤ 1500 | caption, nama akun, tombol musik (420 px) |

Konstanta: `SAFE` di `src/components/Vertical.tsx`.

## Aturan
1. **Teks dan elemen penting** semuanya di dalam x 60–900, y 220–1500. Teks ditengahkan di **x 540** dengan lebar maksimal **720** (x 180–900) supaya terlihat seimbang dan sisi kanan berhenti di batas aman. Bos pernah menilai versi yang digeser ke x 480 "kurang ke tengah". Penutup (logo + tombol) juga di tengah x 540: jangan memakai padding kiri/kanan asimetris untuk "menghindari tombol kanan" (Bos 28 Nov 2026: "logonya kenapa ke kiri?").
2. **Latar penuh (video, foto, gradasi) boleh keluar area aman**; hanya teks dan objek informasi yang dibatasi.
3. **Video bicara (talking head):** jaga wajah (kira-kira y 460–860) tetap bersih; kartu penjelas di bawahnya, dasar kartu di y 1480. Daftarkan wajah sebagai area terlindungi di `scripts/collision-config.json`.
4. **B-roll layar penuh:** geser klip agar bagian penting (wajah, makanan, logo) berada di atas kartu (y < 1000). Pangkas ikon UI rekaman layar dan kursor sebelum dipakai.
5. **Versi 9:16 dari video 16:9:** panggung 16:9 dirender dalam "kamera" yang zoom dan menggeser mengikuti fokus (`Camera keys` di `Vertical.tsx`); teks penting ditata ulang di area aman, bukan sekadar di-crop.
6. **Caption besar** maksimal 6 kata, berada di tengah area aman, bukan di dasar layar.

## Cara memeriksa
- `node scripts/check-collisions.mjs <Id> --every=15` otomatis memeriksa area aman untuk komposisi 1080x1920 (`di-luar-area-aman`).
- Tampilkan panduan visual saat review: `SAFE_GUIDE=1 node scripts/render-stills.mjs <Id>` atau props `safeGuide` pada komposisi 9:16.
- Laporkan ke Bos bila ada elemen yang sengaja keluar area aman.
Terkait: `a2-komposisi-proximity`, `a2-anti-tabrakan`.
