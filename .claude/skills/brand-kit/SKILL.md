---
name: brand-kit
description: Memakai atau membuat Brand Kit per brand agar video brand lain tidak terlihat seperti A2 (warna, huruf, bentuk, maskot, suara, ajakan, larangan). Pakai di awal setiap video dan saat ada brand baru.
---

# Brand Kit

Satu folder per brand: `brands/<kode>/BRAND.md`. Daftar dan aturan: `brands/README.md`. Template: `brands/_template.md`.

## Memakai (setiap video)
1. Cocokkan brand di isian ke folder `brands/` (A2 Automation = `a2`, H2C = `h2c`). Tidak ada folder: berhenti dan minta Bos menjalankan tahap BRAND.
2. Baca `BRAND.md`. Itu satu-satunya sumber warna, huruf, bentuk, gerak, maskot, suara, ajakan, dan larangan. Kolom "belum ditentukan" jangan diisi tebakan; tanyakan Bos.
3. Token di kode: A2 di `src/theme.ts`, H2C di `src/tips-umroh/theme.ts`. Brand baru memakai `src/brands/<kode>/theme.ts` dan komposisinya mengimpor token brand sendiri, bukan token A2.
4. Skill `a2-*` hanya untuk A2. Untuk brand lain pakai aturan umum (area aman, anti-tabrakan, render) dan gaya dari kit.

## Membuat (brand baru, sekali)
1. Kumpulkan fakta dari bahan Bos: situs atau akun brand (ambil warna dan huruf yang benar-benar dipakai), logo, contoh yang disuka. Jangan mengarang.
2. Tanyakan maksimal 5 hal penting dengan pilihan jawaban: maskot ada atau tidak, mode terang atau gelap, bentuk tajam atau bulat, nada bicara, ajakan dan URL.
3. Isi `BRAND.md` dari template, buat `src/brands/<kode>/theme.ts` (pola `src/tips-umroh/theme.ts`), render satu frame contoh, kirim ke Bos.
4. Setelah Bos setuju, tandai tanggal persetujuan di kit dan tambahkan baris di `brands/README.md`.

## Menjaga keunikan antar brand
- Warna dan huruf utama tidak boleh sama dengan brand lain tanpa alasan.
- Satu brand, satu gaya gerak dan satu bentuk khas; jangan menyalin pola visual video brand lain kecuali Bos memintanya.
- Maskot milik satu brand tidak dipinjam brand lain.

## Gaya ilustrasi (arahan Bos 20 Nov 2026, berlaku semua brand kecuali kit menulis lain)
- **Modern dan bulat:** semua sudut membulat (kartu 44, kapsul/label `border-radius: 999`, baris daftar 48, ikon `rx` 8–24, poligon atap/emas lewat garis tebal warna sama `strokeLinejoin="round"`). Tanpa garis hitam tebal; tepi lembut `rgba(ink,.12)`, bidang rata + rona (tint) dari token, bayangan elips lembut di bawah benda, lingkaran latar pudar.
- **Detail kecil yang menjelaskan** (ikatan kain, cap, segel, pita buku, label "LUNAS"/"SAH") lebih penting daripada banyak benda.
- **Wajah:** hindari. Bila sosok benar-benar perlu (dan Brand Kit mengizinkan), muka dibuat rata tanpa mata/mulut. Brand tanpa makhluk bernyawa (mis. Tams) tetap memakai benda saja.
