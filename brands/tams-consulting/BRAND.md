# Brand Kit: Tams Consulting

Kode: `tams-consulting` · Disetujui Bos: ya, 20 Nov 2026 (frame contoh `TamsBrandSample`)

## Identitas
- Nama resmi: TAMS CONSULTING. Bidang: konsultasi dan hitung waris (keterangan di posting Bos: "Konsultasi & Hitung Waris"). Penonton: keluarga dan pewaris yang perlu menyelesaikan pembagian waris.
- Nada bicara (3 kata): tegas, meyakinkan, menenangkan (jawaban Bos: tegas dan meyakinkan).
- Nuansa visual (3 kata): bersih, terang, profesional (dari posting Bos).

## Warna (token, hex)
Diambil langsung dari piksel logo Bos.

| Token | Nilai | Dipakai untuk |
|---|---|---|
| bg | #FEFEFE | latar utama (putih latar logo) |
| bg2 | #F3F3F1 | kartu terang |
| ink | #0A0A0A | teks utama (hitam huruf TAMS) |
| charcoal | #2B2B2B | panel judul, kartu gelap (arang lingkaran logo) |
| orange | #E55B03 | aksen, sorotan kata kunci, tombol (oranye logo) |
| onDark | #FEFEFE | teks di atas arang atau oranye |
| line | rgba(10,10,10,.10) | garis halus |

Latar terang (keputusan Bos). Tanpa gradasi: warna logo rata, jadi video juga rata. Oranye hanya untuk satu sorotan atau tombol per layar.

## Huruf
- Judul / UI / teks: Montserrat (geometris, paling dekat dengan huruf logo; huruf asli logo belum diketahui). Satu keluarga huruf.
- Skala di 1080x1920: judul 74 tebal 800, isi 32 tebal 500, label 26 tebal 700 huruf besar renggang (meniru "CONSULTING" di logo).

## Bentuk dan nuansa
- Bentuk khas "sudut daun": satu sudut kiri atas membulat besar (56 px untuk kartu, 32 px tombol), sudut lain hampir siku (4 px). Diambil dari bidang oranye logo.
- Kartu: panel arang rata untuk judul, kartu abu terang dengan garis tipis untuk ilustrasi. Tanpa bayangan berat, tanpa blur.
- Susunan dari posting Bos: logo di atas tengah, judul di tengah (baris pembuka hitam, kata kunci oranye), teks isi abu tengah, garis oranye pendek di bawah judul ajakan, dekor lingkaran atau seperempat lingkaran pudar di sudut. Di video, "tengah" berarti tengah area aman (x 480).
- **Tanpa makhluk bernyawa** (arahan Bos 18 Nov 2026, dari vault `proyek/tams-consulting.md`): tanpa orang, tangan, siluet, figur, atau ikon manusia. Visual hanya benda: dokumen, map, kalkulator, miniatur rumah, kunci, emas, buku tabungan, diagram kotak. Foto lama berisi orang tidak dipakai.
- Variasi: palet dan logo tetap, tetapi warna dominan dan susunan antar konten boleh berganti (putih, ivory, oranye, arang) agar feed tidak seragam.
- Ilustrasi: bidang rata arang dan oranye (mis. bagan pewaris ke ahli waris), sorotan memakai sudut daun.
- Gerak: belum ditentukan.
- **Revisi Bos 20 Nov 2026 (video waris):** ilustrasi dan elemen video memakai sudut membulat penuh agar modern (kartu, label kapsul, baris daftar); sudut daun tetap untuk materi statis/posting bila tidak diminta lain. Gaya ilustrasi: lihat skill `brand-kit` bagian Gaya ilustrasi.

## Maskot
- Tidak ada (belum ditentukan Bos). Jangan meminjam maskot brand lain.

## Logo
- Berkas: `public/brands/tams-consulting/logo-lengkap.png` (ikon + tulisan, latar putih) dan `logo-ikon.png` (ikon saja, latar transparan).
- Logo lengkap hanya di atas latar putih #FEFEFE. Di latar gelap pakai ikon saja, tetapi lingkaran arang kurang terbaca di latar hitam: beri jarak atau latar terang.
- Tidak digambar ulang, diputar, diregangkan, atau diwarnai ulang. Area kosong minimal setinggi huruf T di ikon.

## Suara dan ajakan
- Pengisi suara: belum ditentukan. Nada narasi dari draf lama di vault: hangat, jelas, natural, tidak seperti iklan; model dengan tag ekspresi (Eleven v3). Uji pelafalan "TAMS"; bila meleset pakai alias "Tam(s)" hanya di teks suara.
- Kalimat ajakan dan URL: belum ada (jawaban Bos). Posting lama memakai "Jadwalkan Konsultasi" lewat WhatsApp; jangan dipakai di video sebelum Bos menentukan.

## Larangan khas brand
- Tanpa warna di luar token (tanpa biru navy A2, tanpa hijau dan emas H2C). Tanpa gradasi pada logo atau tombol. Tanpa emoji, merek pihak ketiga, backdrop-filter. Angka contoh berlabel "contoh". Tanpa klaim hasil atau jaminan yang tidak diberikan Bos. Tanpa hitungan bagian waris nyata kecuali dari Bos; angka bagian selalu berlabel "contoh". Tanpa nomor telepon di video sebelum Bos menentukan ajakan. Konten utamanya edukasi, bukan jualan; tidak semua video diakhiri ajakan WhatsApp (draf lama memakai "Ikuti @tams.consulting"). Cerita rekaan diberi label kecil "Cerita ilustrasi", bukan kasus klien. Materi hukum (mis. KHI) tidak ditampilkan sebagai kepastian tanpa telaah TAMS; tanpa persentase bagian umum tanpa konteks.

## Sumber dan contoh
- Bahan Bos: logo (2 gambar) dan contoh posting "Konsultasi Waris" (20 Nov 2026), "hitam-oren". Situs: tidak ditemukan saat dicari. Instagram: `@tams.consulting`. Arahan lama Bos: vault Obsidian-SB `proyek/tams-consulting.md`. Pesan brand awal: "Warisan tertata. Keluarga terjaga."
- Token di kode: `src/brands/tams-consulting/theme.ts`. Frame contoh: komposisi `TamsBrandSample`, `out/brand-tams-consulting-sample.png`.

## Belum ditentukan
- Gaya gerak, suara narasi, ajakan dan URL, maskot.
