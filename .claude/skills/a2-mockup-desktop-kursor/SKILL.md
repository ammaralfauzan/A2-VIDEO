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

## Replika web brand lain + kursor manusiawi (contoh: `DaftarDanMasukH2C`, H2C Umroh)
- Jendela peramban tampilan HP (720x990 di x 180–900) dengan dua tab (situs brand + "Email" generik) dan bilah alamat; pindah aplikasi = klik tab. Aplikasi email tanpa merek pihak ketiga (narasi boleh menyebut "Gmail", layar menulis "email").
- Kursor manusiawi (`src/scenes/daftar-dan-masuk-h2c/Kursor.tsx`): bezier kuadrat dengan lengkung berganti sisi, easing cepat-lalu-melambat, jeda sebelum klik, goyang kecil saat diam, riak emas saat klik. Titik kunci harus berurutan (skrip frame kunci memeriksanya).
- Ketikan tidak rata (jeda tetap per huruf, lebih lama di `@` dan `.`); kolom aktif disorot garis emas + cahaya; password titik-titik lalu terlihat lewat ikon mata.
- **Versi untuk penonton sepuh/gaptek** (Bos, 22 Nov 2026, `DaftarDanMasukH2C` versi E): teks layar 56 px, kursor 66x78, kursor tiba ±10 frame sebelum klik lalu diam (`dwell` di `Kursor.tsx`), sorotan kolom 6 px. Cahaya sorotan maks. ±7 px: lebih lebar menyentuh label kolom di atasnya.
- Teks layar yang berakhir sebelum URL jangan menggantung ("lalu lihat promonya di"): taruh kata sambung bersama URL di potongan yang disembunyikan.
- Narasi "lihat lalu ketik" (bukan "salin"): jangan tampilkan toast "Disalin"; layar harus cocok dengan kata kerja di suara.
- **Narasi "salin ... tempel"** (versi F `DaftarDanMasukH2C`, 23 Nov 2026): angka di email disorot (sapuan emas ±12 frame) saat kata "Salin", menu kecil gelap "Salin" muncul di atas kode dan ditekan saat "copy", toast "Kode disalin" sampai pindah tab; di layar kode, klik kotak pertama lalu menu "Tempel" di atas kotak ditekan saat "tempel", 6 angka masuk sekaligus (±8 frame, satu bunyi). Komponen `Menu` di `src/scenes/daftar-dan-masuk-h2c/Layar.tsx`, posisi `COPY_MENU`/`PASTE_MENU` di `layout.ts`.
- Bila hook diganti dan jarak hook→kartu bagian memendek, titik kursor awal bisa terbalik urutan: `scripts/<slug>-frames.ts` memeriksa urutan dan gagal; buang titik kursor di beranda dan munculkan kursor setelah kartu bagian.
- Kartu bagian/selesai di tengah layar: jendela di belakangnya dipudarkan **penuh** dan judul baru masuk ±6 frame kemudian; jendela yang hanya diredupkan terlihat menumpuk dengan judul besar.
