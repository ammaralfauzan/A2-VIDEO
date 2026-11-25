---
name: a2-anti-tabrakan
description: Cegah elemen saling menimpa di video Remotion A2/H2C (teks, label, garis, kursor, maskot, kartu). Pakai setiap membuat atau mengubah tata letak adegan, sebelum render penuh. Menjalankan pemeriksa tabrakan otomatis.
---

# Anti-tabrakan

Bos paling sering merevisi karena elemen saling menimpa. Aturan ini sudah dipelajari dari revisi nyata; ikuti sejak awal supaya tidak ada putaran revisi.

## Aturan
1. **Teks tidak boleh berada di atas teks lain atau di bawah garis/ikon/maskot.** Jika dua elemen harus berdekatan, beri jarak minimal 24 px (1080 lebar) atau pisahkan waktunya (satu keluar sebelum yang lain masuk).
2. **Label di atas garis penghubung** ditaruh dalam kapsul berbingkai berlatar solid (`StepNode`: kapsul putih, border `color.line`) agar garis lewat di belakang, bukan menembus huruf. Garis dimulai setelah label, bukan dari pusat simpul.
3. **Kursor** pindah menjauh dari teks setelah klik; jangan diam di atas tulisan yang sedang dibaca.
4. **Maskot Gigi** tidak melewati kartu, chip hari, hub, atau teks. Rancang jalurnya (`GigiTrack.tsx` keys) dulu, lalu susun elemen lain di sekitarnya. Lihat `a2-maskot-gigi`.
5. **Transisi konten**: elemen lama selesai memudar (±8 frame) sebelum elemen baru berada di posisi yang sama. Dua kartu tidak boleh sama-sama terlihat di tempat yang sama.
6. **Teks dalam kartu** harus muat di dalam kartu pada lebar penuh; uji kata terpanjang. Judul dua baris memakai `line-height` ≥ 1.1.
7. **Kartu muncul dengan isi redup**, bukan kosong menunggu kata (kartu kosong terlihat seperti glitch).
8. **Jangan pakai `backdrop-filter`** di video: render paralel kadang menggambar kotak blur kosong pada satu frame.

## Pemeriksa otomatis (wajib sebelum render penuh)
```
node scripts/check-collisions.mjs <IdKomposisi> --every=15
```
Mengukur kotak teks sungguhan di Chromium pada frame terpilih. Melaporkan `teks-menimpa-teks`, `di-luar-area-aman` (otomatis untuk 9:16), dan `menutup-area-terlindungi` (mis. wajah pembicara; area bawaan per komposisi ada di `scripts/collision-config.json`). Opsi: `--frames=10,50`, `--from/--to`, `--safe=off`, `--protect=nama:x,y,w,h`.
- Kode keluar 1 = ada temuan: perbaiki tata letak, jangan dilewati.
- Komposisi baru harus dibungkus `withProbe(...)` di `src/Root.tsx` (lihat `src/dev/CollisionProbe.tsx`), kalau tidak, skrip berhenti dengan pesan.
- Hook penjaga di `.claude/settings.json` menjalankan pemeriksa otomatis sebelum `remotion render` dan menahan render bila ada temuan. Lewati hanya dengan `SKIP_CC=1` bila temuan memang disengaja, dan sebutkan alasannya ke Bos.
- Pemeriksa hanya melihat teks. Tabrakan teks dengan gambar/ikon/maskot tetap dicek dengan mata di frame kunci.

## Review visual
Render frame kunci (`node scripts/render-stills.mjs <Id>`), lihat satu per satu pada ukuran penuh, termasuk frame di tengah transisi (bukan hanya frame akhir tiap adegan). Frame yang paling sering bermasalah: saat dua adegan bertukar dan saat maskot melintas.

## Kamera bergerak di meja 3D semu (pelajaran `akun-keluarga-h2c`, 25 Nov 2026)
- Saat kamera mendekat ke benda lain (mis. ponsel), teks benda yang tergeser ke luar area aman (monitor, kartu) ikut dihitung pemeriksa. Redupkan benda itu ke opacity < 0.45 **lebih cepat dari gerak kamera** (`1 - 0.62 * min(1, dof * 2.5)`) dan beri blur fokus; jangan menunggu kamera tiba.
- Angka/judul besar di atas layar: redupkan isi layar **sebelum** angka muncul (±9 frame lebih awal) dan tahan redup sampai angka selesai pindah ke lencana; ganti halaman di balik angka.
- Isi layar benda yang keluar bingkai (ponsel) dipadamkan sebelum benda keluar, bukan sesudahnya.
- Kursor jangan diam di atas teks tombol saat klik: klik di sisi kanan tombol, lalu geser menjauh.
