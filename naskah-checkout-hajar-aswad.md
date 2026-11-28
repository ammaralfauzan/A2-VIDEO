# Naskah Video 2: "Cara Checkout Paket Hajar Aswad"

Format: Reels 9:16 (1080x1920), target ±58 dtk · Brand: H2C Umroh (kit `h2c-umroh`, tanpa maskot) · Jalur: tampilan mobile web asli (replika dari repo h2c-umroh) + titik ketuk emas, langkah bernomor besar, full visual (pola #23 `daftar-dan-masuk-h2c`, skill `a2-mockup-desktop-kursor` dan `a2-explainer-kinetik`). Bukan 3D semu (pelajaran akun-keluarga-h2c).
Suara: usulan Jefri (Suara Penjelasan Lembut) seperti Video 1; Eleven v3 dengan tag audio. Tanpa musik. Pasangan Video 1 `naskah-umroh-10-juta.md`.

**STATUS: konsep dan naskah disetujui Bos (27 Nov 2026). Alur visual direvisi full visual (28 Nov 2026, menunggu persetujuan). Situs sudah siap (PR #3 merged). Berikutnya: MP3 suara dari Bos, lalu BANGUN.**

## Konsep (revisi Bos 28 Nov: sedikit kata, full visual, tampilan mobile, gaya persis web)
Seluruh bingkai 9:16 diisi **tampilan mobile web umroh.h2c.or.id** (lebar 375 diskalakan ke 1080, replika dari kode, bukan tangkapan layar), bergerak mengikuti lima langkah. Suara singkat; layar hampir tanpa kalimat: ikon, gambar paket, lencana tingkat, angka langkah, kursor/jari-ketuk berupa titik emas (bukan tangan). Ajakan tombol emas `umroh.h2c.or.id`.

## Gaya visual (dari web live, tampilan mobile 375x812, dicek 28 Nov 2026; kode yang benar tetap repo h2c-umroh)
- Latar zamrud gelap bergradasi (#0A1F17 ke #0E2A1F), kartu zamrud (#123B2A) radius besar (24) bergaris emas tipis; teks gading, label sage.
- Header: logo bulat H2C + "H2C / WISATA MANDIRI" di kiri; tombol bulat WhatsApp (hijau), pil "Masuk", tombol menu (hamburger) bergaris.
- Judul seksi: label kecil kapital berhias bintang emas ("✦ PAKET UMROH"), baris skrip Great Vibes gading, lalu kapital tegak Anton bergradasi emas ("SESUAI KEBUTUHAN").
- Kartu paket gaya tiket: lekuk bulat di tepi, garis putus-putus, "IDN ---✈--- KSA", pil badge emas, harga serif emas (Amiri), titik hijau limau untuk "Sisa kursi", centang emas untuk fasilitas. Tombol emas pil rata (teks zamrud).
- Ikon: heksagon lencana tingkat (`IkonTingkat.tsx`), gambar paket Hajar Aswad (`public/img/hajar-aswad-*.webp`).
- Gerak: masuk bertahap (stagger), ease-out lembut, sedikit pegas untuk tombol.
- Catatan: data paket di web (harga Rp100 jt, berangkat 2031) TIDAK ditampilkan; kartu paket di video memakai nama dan gambar saja.

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

## Tabel alur (FULL VISUAL, tampilan mobile; teks layar maksimal 1-3 kata)
| Waktu | Suara | Visual (bingkai = layar mobile web H2C) | Teks layar |
| --- | --- | --- | --- |
| 0-5 | Mau ikut promo Hajar Aswad? Harga spesial, lima langkah saja. | Header web mobile (logo, WhatsApp, Masuk) menyala; dua kartu paket Hajar Aswad (Ka'bah emas dan batu hitam berbingkai perak) meluncur masuk; lima titik langkah menyala berurutan | angka 5 |
| 5-9 | Satu: masuk, buka Paket. | Angka "1". Ikon kunci, kolom masuk terisi titik-titik; titik emas (ketukan) pada "Masuk"; menu bawah/samping: ikon tas "Paket" menyala | "Masuk", "Paket" |
| 9-19 | Dua: pilih Hajar Aswad Standar atau Premium, lalu pilih tingkat DP: Silver, Gold, Platinum, Diamond. | Angka "2". Dua kartu paket berdampingan, label "Standar" dan "Premium" menyala saat disebut; satu dipilih (bingkai emas); empat lencana tingkat jatuh satu per satu pada nama yang disebut, tiap lencana dengan angka DP kecil | "Standar", "Premium", nama tingkat |
| 19-25 | Tiga: isi jumlah jamaah, pilih Bayar DP, cek WhatsApp. | Angka "3". Stepper +/- berubah; kartu "Bayar DP" terpilih; ikon ponsel dengan nomor fiktif tersorot emas | "Jamaah", "DP", "WhatsApp" |
| 25-32 | Empat: Checkout dan bayar. Sisanya bisa dicicil, mulai sepuluh ribu. | Angka "4". Tombol emas pil "Checkout & bayar" ditekan; layar bayar generik tanpa merek dengan centang limau; bilah sisa pelunasan terisi pelan, angka "10.000" muncul | "Checkout", "10.000" |
| 32-38 | Lima: setelah DP dicek, kode kupon unik muncul di Pesanan. Simpan ya. | Angka "5". Ikon Pesanan menyala; kartu kupon berlencana tingkat terpilih (kode contoh `UND-XXXXXXXX`, label "contoh") jatuh dan berkilau; ikon simpan | "Kupon", kode contoh |
| 38-48 | Pemenang tahap satu diumumkan satu Januari dua ribu dua puluh tujuh. Bebas pilih paket promo atau reguler sembilan hari bintang tiga, berangkat dua ribu dua puluh tujuh. | Ikon kalender "01 JAN 2027" berdenyut; dua kartu "Promo" dan "Reguler 9D" berbintang tiga emas; kartu kupon melayang di antaranya | "01 JAN 2027", "9D", bintang |
| 48-53 | Ikuti semua tingkatnya. | Empat lencana tingkat berjajar rapi, menyala berurutan dengan kilau | - |
| 53-58 ajakan | Kunjungi umroh titik H dua C titik or titik id. | Semua menyusut ke tengah; logo bulat asli + tombol emas `umroh.h2c.or.id` mengisi bingkai | `umroh.h2c.or.id` |

Waktu perkiraan (±58 dtk); adegan mengikuti MP3 asli (suara tidak dipercepat). Titik ketukan tidak melompat, berhenti sejenak sebelum menekan. Data fiktif berlabel "contoh".

## Prompt suara ElevenLabs (siap salin)
Suara: Jefri (Suara Penjelasan Lembut), usulan · Eleven v3 · Nada: sabar, hangat, jelas · Target ±55 dtk

```
[warmly] Mau ikut promo Hajar Aswad? Harga spesial, lima langkah saja.

[slowly] Satu: masuk, buka Paket.

[slowly] Dua: pilih Hajar Aswad Standar atau Premium, lalu pilih tingkat DP: Silver, Gold, Platinum, Diamond.

[slowly] Tiga: isi jumlah jamaah, pilih Bayar DP, cek WhatsApp.

[slowly] Empat: Checkout dan bayar. Sisanya bisa dicicil, mulai sepuluh ribu.

[warmly] Lima: setelah DP dicek, kode kupon unik muncul di Pesanan. Simpan ya.

[excited] Pemenang tahap satu diumumkan satu Januari dua ribu dua puluh tujuh. Bebas pilih paket promo atau reguler sembilan hari bintang tiga, berangkat dua ribu dua puluh tujuh.

[warmly] Ikuti semua tingkatnya.

[excited] Kunjungi umroh titik H dua C titik or titik id.
```

## Risiko / asumsi
1. Situs sudah memuat paket, tingkat, dan kupon (commit 030e4b2), tetapi belum saya lihat di situs live; cocokkan layar replika dengan situs saat BANGUN dan pastikan produksi sudah ter-deploy sebelum posting.
2. "Dicek": siapa yang mengecek (admin manual atau otomatis) ikut keputusan sesi situs; naskah memakai kata Bos "dicek" tanpa janji waktu.
3. Layar bayar dibuat generik tanpa merek (metode bayar belum dipastikan); tanpa nama bank atau gateway.
4. Tangkapan Bos memuat nama dan nomor WhatsApp asli: JANGAN dipakai di video; gunakan data fiktif berlabel "contoh".
5. Situs live (dicek 28 Nov): dua paket bernama "Hajar Aswad Standar" dan "Hajar Aswad Premium", keduanya 12 hari, tertulis berangkat November 2031, Rp100.000.000, sisa 1000 kursi (tampak data sementara). JANGAN tampilkan harga/tanggal itu di video: bertentangan dengan harga pemenang Rp10-20 jt dan keberangkatan 2027; minta Bos/admin merapikan data paket sebelum posting.
6. Pengumuman pemenang tahap 1 (01 Jan 2027) dan "bebas pilih paket promo atau reguler 9D bintang 3, keberangkatan 2027" dari Bos 28 Nov; Video 1 belum menyebut tanggal ini.
7. Tanpa harga paket selain angka DP dan cicilan minimum dari situs; tanpa janji kemenangan.
