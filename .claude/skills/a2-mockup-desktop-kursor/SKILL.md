---
name: a2-mockup-desktop-kursor
description: Mockup aplikasi desktop gaya macOS dengan kursor nyata yang klik dan seret untuk video 16:9 A2 (Jam 9 Malam, A2Umum). Pakai saat membuat adegan demo aplikasi atau menambah interaksi kursor.
---

# Mockup desktop dan kursor

Komponen siap pakai di `src/components/`: `Window` (jendela macOS: title bar, tiga titik, `badge`), `Cursor` (props jalur/klik/seret/fadeOut; `positionAt`, `pressAt`), `AppUI` (Sidebar, Header, Card, Row, Status), `AppScreen` / `AppScreenUmum` (layar aplikasi "A2 Sekolah"/umum), `MessyDesktop` / `MessyDesktopUmum` (kekacauan sebelum), `Clock`, `Island` (notifikasi pil), `Toggle`, `ProgressBar`, `Chart`, `Caption`.

## Aturan
1. **Setiap perubahan UI didorong kursor**: kursor bergerak (ber-easing), mengecil saat klik, lalu UI berubah. Satu fokus gerak per momen.
2. Jalur kursor di `CURSOR_PATH` (frame, x, y) pada `src/data/timeline*.ts`; klik di `CLICKS`/`CLICK_LIST`; seret di `DRAG`. Titik target di `TARGET`. Selalu hitung koordinat dari geometri jendela (`APP`, `APP_CONTENT`), bukan angka buta.
3. **Kursor menyingkir** dari teks setelah klik (lihat `a2-anti-tabrakan`).
4. Nama aplikasi generik, tanpa merek pihak lain. Jam (`Clock`) dan badge sebagai penanda waktu ("jam 9 malam").
5. Titik balik: kekacauan (`MessyDesktop`) berubah jadi satu aplikasi bersih lewat klik satu tombol ("Otomatiskan").
6. Versi 9:16 memakai kamera yang menyorot area aktif (`Vertical.tsx`: `Camera keys`), teks ditata ulang di area aman (`a2-safe-area-sosmed`). Verifikasi 16:9 tetap identik dengan `scripts/cek-regresi.mjs`.
7. Teks UI terbaca di layar ponsel (≥ 28 px pada 1920x1080).
