# Pesanan Sudah Sampai Mana? — Konveksi 3D

19 November 2026. Reels 1080 × 1920, 30 fps, sekitar 51 detik.

Tujuan: pendiri A2 memperlihatkan cara memahami alur bisnis konveksi, dari informasi pesanan sampai progres produksi. Adegan bengkel dibuat sebagai model 3D asli di Blender, dengan kamera bergerak lambat. Detail pesanan dan antarmuka adalah simulasi. Petugas tetap memperbarui pekerjaan fisik.

| Bagian | Narasi | Visual |
|---|---|---|
| 1 | Pesanan sudah sampai mana? | Detail jarum, kain, dan mesin jahit 3D. Pertanyaan pelanggan. |
| 2 | Di konveksi, pertanyaan ini bisa membuat admin mencari chat dan menanyakan ulang ke produksi. | Gerak kamera mesin dan meja kerja; pertanyaan tetap menjadi fokus. |
| 3 | Ukuran, revisi desain, tenggat, dan catatan uang muka perlu terhubung. | Meja dengan lembar order, gunting, kain, dan kartu rincian pesanan K-021. |
| 4 | Kalau saya merapikan alurnya, saya mulai dari satu nomor pesanan. | Tampak bengkel, satu nomor K-021 menyatukan detail, progres, dan tenggat. |
| 5 | A Dua Automation dapat membantu menyusun detail order dan papan progres produksi. | Laptop di meja konveksi dan penjelasan bantuan A2. |
| 6 | Dari desain disetujui, potong, jahit, pemeriksaan, sampai siap kirim. | Lima tahap dengan fokus yang berpindah mengikuti narasi. |
| 7 | Petugas memperbarui tahap yang selesai. Admin kemudian melihat status terakhir, dan pemilik memeriksa tenggat. | Kursor memperbarui tahap jahit; admin melihat pemeriksaan sebagai tahap berikutnya. |
| 8 | Di konveksimu, informasi apa yang paling sering ditanyakan ulang? | Hasil lipatan kaus 3D. Pilihan: ukuran, revisi, progres. |
| 9 | A Dua Automation. Kita mulai dari alur kerjamu. | Logo asli, konsultasi gratis, a2automate.com. |

Audio: narasi bahasa Indonesia, suara standar id-ID-ArdiNeural, tanpa kloning suara. Suasana bengkel, mekanisme jahit pendek, dan efek konfirmasi disintesis lokal; tanpa musik. Timing kata dan durasi ada di `src/data/konveksi-timing.json`. Adegan mengikuti durasi suara.

Gaya: warna navy–biru A2 pada grafis, ruang kerja dengan bahan netral, teks Geist, label simulasi, subtitle lima kata per potongan, area aman x 60–900 dan y 220–1500.

Caption:

> Satu pesanan konveksi membawa ukuran, revisi desain, tenggat, dan catatan pembayaran. A2 Automation dapat membantu merancang satu catatan order dan papan progres yang bisa dilihat tim. Petugas memperbarui tahap yang selesai; admin memantau statusnya.
>
> Ini simulasi penerapan. Di konveksimu, informasi apa yang paling sering ditanyakan ulang?
>
> #A2Automation #Konveksi #OtomasiBisnis

Produksi: `scripts/konveksi-props.py`, `konveksi-audio.py`, `konveksi-blender.py`, dan `konveksi-denoise.py`. Komposisi Remotion: `Konveksi3D`. Sumber model tersimpan di `public/konveksi/konveksi-workshop.blend`; hasil video di `out/konveksi-3d-9x16.mp4`.
