---
name: brand-kit
description: Memakai atau membuat Brand Kit per brand agar video brand lain tidak terlihat seperti A2 (warna, huruf, bentuk, maskot, suara, ajakan, larangan). Pakai di awal setiap video dan saat ada brand baru.
---

# Brand Kit

Satu folder per brand: `brands/<kode>/BRAND.md`. Daftar dan aturan: `brands/README.md`. Template: `brands/_template.md`.

## Memakai (setiap video)
1. Cocokkan brand di isian ke folder `brands/` (A2 Automation = `a2`, H2C Umroh / konten umroh = `h2c-umroh`, H2C Wakaf = `h2c`). Tidak ada folder: berhenti dan minta Bos menjalankan tahap BRAND.
2. Baca `BRAND.md`. Itu satu-satunya sumber warna, huruf, bentuk, gerak, maskot, suara, ajakan, dan larangan. Kolom "belum ditentukan" jangan diisi tebakan; tanyakan Bos.
3. Token di kode: A2 di `src/theme.ts`, H2C Wakaf di `src/tips-umroh/theme.ts` (nama folder warisan), H2C Umroh di `src/brands/h2c-umroh/theme.ts`. Brand baru memakai `src/brands/<kode>/theme.ts` dan komposisinya mengimpor token brand sendiri, bukan token A2.
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

## Video edukasi 2D: judul tanpa kotak + panggung ilustrasi (revisi Bos `wasiat-maksimal-sepertiga`, 25 Nov 2026)
Keluhan Bos: "kurang ilustrasi", "tatanan berantakan", "kurang estetik/modern", "teks atas kenapa pakai frame kotak". Pola yang dipakai dan berlaku untuk video edukasi 2D berikutnya:
- **Judul atas tanpa bingkai.** Jangan membungkus teks atas dalam kartu/kotak. Tipografi bebas di latar: label kecil oranye bertitik (huruf besar renggang), judul besar 60–64 tebal 800, garis aksen pendek, isi abu. Masuk bertahap (label → judul → isi), blur ke tajam.
- **Tiga zona tetap 9:16:** judul y 240–590, panggung ilustrasi y 620–1190, teks bawah y 1250+. Tiap zona punya satu fungsi; tidak ada elemen kecil mengambang di antara zona.
- **Satu adegan benda per bagian cerita** (bukan satu diagram kecil sepanjang video): mis. kamar sunyi (meja samping, lampu, gelas, obat, jendela bulan), toples penuh vs mangkuk kosong, rak kitab bernama, palang penahan, bingkisan bersegel, rumah dinaungi lengkung. Benda muncul dengan pegas bertahap dan melayang pelan. Diagram (batang harta) dibuat besar dan diisi benda, bukan batang polos.
- Bentuk dasar yang bisa dipakai ulang (benda saja, aman untuk brand tanpa makhluk bernyawa): `src/scenes/wasiat-maksimal-sepertiga/Ilustrasi.tsx`; panggung bergantian: `Panggung.tsx`.
- Label di bawah batang: label lama hilang dulu, baru label baru masuk (pernah tertangkap "HARTA" menimpa "AHLI WARIS" di frame transisi).

## Pelajaran `penghalang-waris` (BANGUN, 25 Nov 2026)
- **Shalawat/doa sahabat yang diucapkan** ditulis di timeline dengan penanda `~` (mis. `~shallallahu`): teks bawah menampilkannya kecil abu dan tidak menambah shalawat otomatis lagi setelah "Nabi" (kalau tidak, tertulis dua kali).
- **Garis aksen di bawah judul penutup** dihitung dari tinggi judul sungguhan: judul 3 baris pernah membuat garis menembus baris ketiga. Tentukan pemenggalan baris dengan `<br />` sendiri dan letakkan garis di bawah baris terakhir.
- **Kutipan panjang di zona judul**: penggal baris sendiri (ukuran ±44), jangan biarkan kata pendek ("kafir,") tersisa sendirian di satu baris.


## Revisi `penghalang-waris` (REVISI, 25 Nov 2026)
Keluhan Bos: teks/elemen menabrak frame (padding), ilustrasi kurang menarik/minimalis, garis bagan lancip padahal kotak bulat, gembok/kunci kurang detail, warna terkunci kurang jelas, mau ikon bukan bagan polos.
- **Bentuk konsisten:** kotak bulat (rx 34–36) berarti garis penghubung juga bulat: siku melengkung (`Q`), ujung `strokeLinecap="round"`, `strokeLinejoin="round"`. Jangan campur siku tajam dengan kotak bulat.
- **Padding dalam bingkai:** kartu latar bulat di panggung, isi minimal 36 px dari tepi kartu; label di kotak diukur (mis. "ORANG TUA" 16 px di kotak 144 px = ±18 px tiap sisi). Cek di frame penuh, bukan hanya pemeriksa tabrakan (ia tidak menangkap teks yang mepet garis kotak).
- **Ikon benda tanpa makhluk bernyawa** untuk peran keluarga: ANAK tunas, SAUDARA batang bercabang, ORANG TUA pohon cemara, PASANGAN dua cincin, PEWARIS rumah (`Ikon.tsx`).
- **Warna status:** terkunci merah, berhak hijau (token Tams `red`/`green`). Gembok digambar dengan badan bulat, lengkung tebal berujung bulat, lubang kunci, kilap tipis; membuka = lengkung naik dan miring. Garis menyala animasikan dengan `pathLength=1` + `strokeDashoffset`, bukan potongan garis.
- Garis yang memerah hanya segmen vertikal di bawah gembok; jangan menimpa batang/garis mendatar yang dipakai cabang lain.

## Revisi 2 `penghalang-waris` (REVISI, 25 Nov 2026): bukan bagan, tanpa kartu
Keluhan Bos (diulang = revisi 1 belum cukup): "jangan seperti bagan, mau motion graphic", "tanpa frame/kartu di belakang", rumah aneh, kunci/gembok kurang realistis, ikon kurang menggambarkan, label "HUBUNGAN DARAH" menabrak bingkai.
- **Konsep keluarga/waris = adegan benda, bukan bagan kotak-garis.** Pewaris = rumah detail di atas; ahli waris = benda melayang tanpa kotak (bayangan elips di bawah saja); hubungan = **aliran cahaya lengkung** (kurva kubik) dengan titik cahaya bergerak, muncul setelah kunci membuka pintu. Hindari kotak + garis siku: itu langsung terbaca "bagan".
- **Tanpa kartu latar di panggung** (diagram maupun rak kitab). Pendar di belakang benda pakai `radialGradient` memudar ke 0 (cahaya), bukan lingkaran rata berbatas (terbaca bingkai).
- **Realistis = volume dari lapisan token**, bukan gradasi: kilap `rgba(254,254,254,.38)`, bayangan sisi `rgba(10,10,10,.20)`, pinggir timbul, paku keling, kusen, genteng berbaris, tulang daun. Gembok: lengkung baja abu bertepi terang/gelap, badan merah berpinggir, pelat lubang kunci. Kunci: gagang tiga lengkung berlubang, kerah, batang berkilap, mata bergigi; "berputar" = skala vertikal mata kunci `cos(t·π)`.
- **Gembok muncul padat** (opasitas 0→1 dalam 4 frame + pegas jatuh), jangan bayangan transparan yang menunggu lama; tutup = lengkung turun "klik" + cincin + percik pendek.
- **Label menempel benda**, bukan kapsul berbingkai: mis. label kertas tergantung di kunci, legenda status hanya ikon + teks. Benda yang terkunci: filter `feColorMatrix saturate 0` + opasitas, label merah.
- Komponen: `src/scenes/penghalang-waris/Ikon.tsx` (Rumah, Kunci, LabelGantung, Gembok, ikon tunas/dua tunas/pohon/cincin), aliran `flowPath`/`flowAt` di `layout.ts`.
