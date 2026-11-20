---
name: a2-komposisi-proximity
description: Susun tata letak video 9:16 A2/H2C dengan prinsip proximity: elemen yang berhubungan dikelompokkan rapat, antar kelompok diberi jarak lega, kelompok ditengahkan di area aman, ruang kosong diisi dengan pengelompokan bukan dekorasi. Pakai saat menata adegan, terutama penutup/ajakan.
---

# Komposisi dan proximity

Prinsip dari revisi penutup "Satu Pesanan": ruang kosong dibereskan dengan **mengelompokkan dan menengahkan**, bukan menambah hiasan.

## Aturan
1. **Satu kelompok = satu makna.** Logo + ajakan + URL adalah satu kelompok. Jarak di dalam kelompok kecil dan konsisten; jarak antar kelompok minimal 2x jarak di dalamnya.
2. **Tengahkan kelompok secara vertikal di area aman** (pusat y 860 untuk 9:16, area y 220–1500) dan horizontal di x 540. Hitung tinggi kelompok lalu `top = 860 - tinggi/2`; jangan menebak. Contoh di `src/scenes/satu-pesanan/Ajakan.tsx` (`GROUP_H`, `LOGO_CONTENT_TOP`).
3. **Ajakan dua tingkat:** label kecil ("Konsultasi gratis di") lalu URL besar di pil/tombol yang disorot (gradasi biru atau emas aksen, cincin berdenyut pelan). Satu sorotan per frame.
4. **Isi ruang kosong dengan membesarkan atau mendekatkan elemen utama**, bukan menambah elemen baru. Jika sebuah elemen tidak punya fungsi jelas, jangan dibuat (prinsip minimalis DESIGN.md).
5. **Maksimal satu gradasi besar per frame.** Sisanya warna datar dari token.
6. **Satu fokus per momen.** Elemen pendukung redup (opacity ±0.3) sampai kata yang bersangkutan diucapkan.
7. **Urutan baca dari atas ke bawah** untuk 9:16: strip/judul, ilustrasi, kartu/teks. Teks utama di tengah, rata tengah; lebar teks maksimal 720 (x 180–900).
8. **Spasi dalam kelipatan 8.** Radius dan bayangan dari `src/theme.ts` (A2) atau `src/tips-umroh/theme.ts` (gaya Wakaf), tidak membuat nilai baru.

## Cara memeriksa
- Lihat frame akhir adegan di ukuran penuh: apakah ada "lubang" besar di atas atau bawah kelompok? Jika ya, kelompok belum ditengahkan atau terlalu kecil.
- Jalankan `a2-anti-tabrakan` (pemeriksa tabrakan) lalu `a2-safe-area-sosmed`.
- Untuk video bergaya Wakaf (TipsUmroh): kartu di y 1050–1480, strip progres di y 236, wajah pembicara y 460–860 bebas.


## Pelajaran revisi (Tams, 20 Nov 2026)
- **Tengah = tengah bingkai (x 540), bukan tengah area aman (x 480).** Menengahkan di x 480 terlihat condong ke kiri. Pusatkan di x 540 dan jaga isi tetap di x 180-900 (lebar 720, simetris), jadi tidak masuk kolom tombol kanan. Satu konstanta `CX = 540` di `layout.ts`, semua posisi dihitung darinya.
- **Diagram abstrak butuh ilustrasi benda.** Kotak dan garis saja kurang jelas bagi penonton awam: beri tiap konsep satu benda sederhana (ubin terang bersudut-daun berisi gambar SVG rata). Contoh: `src/scenes/tiga-hal-sebelum-waris-dibagi/Ikon.tsx` (rumah, koin, kunci, kain + sekop, tagihan, amplop). Brand tanpa orang: tanpa wajah, figur, atau siluet; kain kafan digambar sebagai lipatan kain, bukan sosok terbungkus.
- Ikon redup abu saat belum aktif, berwarna hanya saat gilirannya (tetap satu sorotan oranye per layar). Ikon di atas blok arang pakai aksen abu, bukan oranye.
- Ukuran: ikon di panggung >= 128 px, label >= 22 px; gambar kecil (<100 px) terbaca seperti simbol UI, bukan ilustrasi.
