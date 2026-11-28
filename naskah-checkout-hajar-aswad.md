# Naskah Video 2: "Cara Checkout Paket Hajar Aswad"

Format: Reels 9:16 (1080x1920), target 55 dtk · Brand: H2C Umroh (kit `h2c-umroh`, tanpa maskot) · Jalur: layar web asli (replika dari repo h2c-umroh) + kursor bergerak seperti tangan manusia, langkah bernomor besar (pola #23 `daftar-dan-masuk-h2c`, skill `a2-mockup-desktop-kursor` dan `a2-explainer-kinetik`). Bukan 3D semu (pelajaran akun-keluarga-h2c).
Suara: usulan Jefri (Suara Penjelasan Lembut) seperti Video 1; Eleven v3 dengan tag audio. Tanpa musik. Pasangan Video 1 `naskah-umroh-10-juta.md`.

**STATUS: konsep dan naskah disetujui Bos (27 Nov 2026). Alur visual direvisi full visual (28 Nov 2026, menunggu persetujuan). Situs sudah siap (PR #3 merged). Berikutnya: MP3 suara dari Bos, lalu BANGUN.**

## Konsep
Panduan untuk bapak-ibu: lima langkah dari masuk akun sampai kode kupon. Layar akun pelanggan H2C (latar zamrud, kartu paket, panel Checkout seperti situs) ditampilkan penuh; kursor bergerak pelan, angka langkah emas besar di atas layar, kolom yang diisi disorot. Kupon muncul di akhir sebagai kartu berkode unik. Tanpa orang, tangan, atau wajah; hanya layar, kursor, kartu. Ajakan tombol emas `umroh.h2c.or.id`.

## Fakta layar (dibaca dari repo h2c-umroh, cabang `H2C-Umroh`, commit 030e4b2, 28 Nov 2026; PR #3 "Paket berkupon Hajar Aswad" sudah merged)
- Situs sudah punya: paket Hajar Aswad (dua gambar paket), pilihan DP bertingkat dengan lencana tingkat, kartu kupon dengan kode otomatis, admin kupon (`/admin/kupon`). Label asli di checkout: "Checkout", "Jumlah jamaah", "Pembayaran" (Bayar DP / Bayar Lunas), "Nominal DP / jamaah" (chip Rp + lencana + nama tingkat), catatan "DP berlencana dapat kode kupon setelah terbayar penuh", "Nomor WhatsApp", tombol emas "Checkout & bayar".
- Kartu kupon di halaman Pesanan: judul "Kupon Silver" (sesuai tingkat) + lencana kecil, kode `UND-XXXXXXXX`, catatan "Simpan kode kupon ini". Sebelum DP terbayar: "Kode kupon ... muncul di sini setelah DP terbayar penuh".
- Cicilan: setelah DP, sisa dicicil nominal bebas (minimum Rp10.000) dari halaman Pesanan (teks situs).
- Pembayaran online belum aktif bila gateway mati: situs mengarahkan ke WhatsApp admin; layar bayar di video dibuat generik tanpa merek.
- Checkout web Wakaf (H2C-Wakaf) berbeda: 3 langkah Data, Bayar, Selesai untuk donasi (chip nominal, minimal Rp10.000). Tidak dipakai di video ini; hanya pola "3 titik langkah" yang bisa jadi inspirasi.

## Aset visual (ambil dari repo h2c-umroh, jangan digambar ulang; BANGUN yang mengekstrak)
| Aset | Sumber | Catatan |
| --- | --- | --- |
| Gambar paket Hajar Aswad Standar (Ka'bah emas di kotak oranye) | `public/img/hajar-aswad-standar.webp` | tanpa makhluk bernyawa |
| Gambar paket Hajar Aswad Premium (batu hitam berbingkai perak di lencana ungu) | `public/img/hajar-aswad-premium.webp` | tanpa makhluk bernyawa |
| Lencana tingkat Silver, Gold (mahkota), Platinum (bintang), Diamond (berlian) | `components/IkonTingkat.tsx` (SVG, warna: biru, emas, hijau limau, ungu) | render ke SVG/PNG; ukuran kecil dan besar |
| Lencana "Promo Undian" bergerigi | `components/UndianSeal.tsx` | opsional; undian publik tetap tersembunyi, jangan menonjolkan kata undian |
| Logo bulat H2C | `public/logo.jpeg` | logo resmi saja |
| Panel Checkout, chip DP, kartu kupon | tata letak dari `PaketCheckout.tsx` dan `KuponUndian.tsx` | dibuat ulang sebagai replika berlabel "contoh" |
JANGAN dipakai: `public/img/pembimbing-*.webp` (foto orang; aturan tanpa makhluk bernyawa).

## Tabel alur (FULL VISUAL: teks layar maksimal 1-3 kata per adegan, selebihnya ikon, gambar, gerak)
| Waktu | Suara (tetap, disetujui) | Visual (2D, layar replika + kursor) | Teks layar |
| --- | --- | --- | --- |
| 0-5 hook | Mau ikut promo Hajar Aswad? Checkout-nya cuma lima langkah. | Dua gambar paket (Ka'bah emas dan batu hitam berbingkai perak) masuk dari kiri-kanan dan bertemu; lima titik langkah menyala berurutan di bawahnya | - (hanya angka 5) |
| 5-11 | Langkah satu: masuk ke akun H2C Anda, lalu buka menu Paket. | Angka "1". Ikon kunci dan layar masuk (kolom diisi titik-titik, fiktif); kursor menekan tombol; menu samping: ikon tas "Paket" menyala | "Masuk", "Paket" |
| 11-22 | Langkah dua: pilih paket Hajar Aswad. Ada dua pilihan: Hajar Aswad Standar dan Hajar Aswad Premium. Lalu pilih tingkat DP-nya: Silver, Gold, Platinum, atau Diamond. | Angka "2". Dua gambar paket berdampingan; label "Standar" menyala saat kata Standar, "Premium" saat kata Premium; kursor memilih satu (membesar, bingkai emas); di bawahnya empat lencana tingkat muncul satu per satu tepat pada nama yang disebut (biru, emas, hijau, ungu), tiap lencana dengan angka DP kecil | nama tingkat saja, angka DP |
| 19-27 | Langkah tiga: isi jumlah jamaah, pilih bayar DP, lalu cek nomor WhatsApp Anda. | Angka "3". Tombol +/- jumlah jamaah berubah; kartu "Bayar DP" terpilih (radio terisi); ikon ponsel dengan nomor fiktif tersorot emas | "Jamaah", "DP", "WhatsApp" |
| 27-37 | Langkah empat: tekan Checkout dan bayar. Sisanya bisa dicicil dengan nominal bebas, mulai sepuluh ribu rupiah. | Angka "4". Tombol emas "Checkout & bayar" ditekan; layar bayar generik tanpa merek dengan centang limau; bilah sisa pelunasan terisi sedikit demi sedikit (animasi cicilan) dan angka "10.000" muncul | "Checkout", "10.000" |
| 37-47 | Langkah lima: setelah DP terbayar dan dicek, kode kupon unik muncul di halaman pesanan. Simpan kodenya ya. | Angka "5". Ikon menu Pesanan menyala; kartu kupon berlencana tingkat terpilih (kode contoh `UND-XXXXXXXX`, label "contoh") jatuh pelan dan berkilau; ikon simpan/bintang kecil | "Kupon", kode contoh |
| 47-60 | Pengumuman pemenang tahap satu: satu Januari dua ribu dua puluh tujuh. Pemenang bebas memilih paket, baik promo maupun reguler sembilan hari bintang tiga, untuk keberangkatan dua ribu dua puluh tujuh. Ingin berkesempatan besar dapat umroh murah? Ikuti saja semua paketnya. | Ikon kalender dengan "01 JAN 2027" berdenyut; dua kartu paket "Promo" dan "Reguler 9D" dengan tiga bintang emas, kartu kupon melayang di antaranya; lalu empat lencana tingkat berjajar rapi (isyarat ikut semua) | "01 JAN 2027", "9D", bintang |
| 60-68 ajakan | Yuk, ikut promonya. Kunjungi umroh titik H dua C titik or titik id. | Semua kartu menyusut ke tengah; logo bulat asli + tombol emas `umroh.h2c.or.id` mengisi bingkai | `umroh.h2c.or.id` |

Waktu perkiraan (durasi ±68 dtk setelah tambahan Bos 28 Nov); adegan mengikuti MP3 asli (suara tidak dipercepat). Kursor tidak melompat, berhenti sejenak sebelum klik. Data fiktif berlabel "contoh".

## Prompt suara ElevenLabs (siap salin)
Suara: Jefri (Suara Penjelasan Lembut), usulan · Eleven v3 · Nada: sabar, hangat, jelas · Target ±55 dtk

```
[warmly] Mau ikut promo Hajar Aswad untuk mendapatkan harga spesial? Checkout-nya cuma lima langkah.

[slowly] Langkah satu: masuk ke akun H2C Anda, lalu buka menu Paket.

[slowly] Langkah dua: pilih paket Hajar Aswad. Ada dua pilihan: Hajar Aswad Standar dan Hajar Aswad Premium. Lalu pilih tingkat DP-nya: Silver, Gold, Platinum, atau Diamond.

[slowly] Langkah tiga: isi jumlah jamaah, pilih bayar DP, lalu cek nomor WhatsApp Anda.

[slowly] Langkah empat: tekan Checkout dan bayar. Sisanya bisa dicicil dengan nominal bebas, mulai sepuluh ribu rupiah.

[warmly] Langkah lima: setelah DP terbayar dan dicek, kode kupon unik muncul di halaman pesanan. Simpan kodenya ya.

[excited] Pengumuman pemenang tahap satu: satu Januari dua ribu dua puluh tujuh. Pemenang bebas memilih paket, baik promo maupun reguler sembilan hari bintang tiga, untuk keberangkatan dua ribu dua puluh tujuh.

[warmly] Ingin berkesempatan besar dapat umroh murah? Ikuti saja semua paketnya.

[excited] Yuk, ikut promonya. Kunjungi umroh titik H dua C titik or titik id.
```

## Risiko / asumsi
1. Situs sudah memuat paket, tingkat, dan kupon (commit 030e4b2), tetapi belum saya lihat di situs live; cocokkan layar replika dengan situs saat BANGUN dan pastikan produksi sudah ter-deploy sebelum posting.
2. "Dicek": siapa yang mengecek (admin manual atau otomatis) ikut keputusan sesi situs; naskah memakai kata Bos "dicek" tanpa janji waktu.
3. Layar bayar dibuat generik tanpa merek (metode bayar belum dipastikan); tanpa nama bank atau gateway.
4. Tangkapan Bos memuat nama dan nomor WhatsApp asli: JANGAN dipakai di video; gunakan data fiktif berlabel "contoh".
5. Situs live (dicek 28 Nov): dua paket bernama "Hajar Aswad Standar" dan "Hajar Aswad Premium", keduanya 12 hari, tertulis berangkat November 2031, Rp100.000.000, sisa 1000 kursi (tampak data sementara). JANGAN tampilkan harga/tanggal itu di video: bertentangan dengan harga pemenang Rp10-20 jt dan keberangkatan 2027; minta Bos/admin merapikan data paket sebelum posting.
6. Pengumuman pemenang tahap 1 (01 Jan 2027) dan "bebas pilih paket promo atau reguler 9D bintang 3, keberangkatan 2027" dari Bos 28 Nov; Video 1 belum menyebut tanggal ini.
7. Tanpa harga paket selain angka DP dan cicilan minimum dari situs; tanpa janji kemenangan.
