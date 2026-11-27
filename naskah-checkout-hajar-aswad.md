# Naskah Video 2: "Cara Checkout Paket Hajar Aswad"

Format: Reels 9:16 (1080x1920), target 55 dtk · Brand: H2C Umroh (kit `h2c-umroh`, tanpa maskot) · Jalur: layar web asli (replika dari repo h2c-umroh) + kursor bergerak seperti tangan manusia, langkah bernomor besar (pola #23 `daftar-dan-masuk-h2c`, skill `a2-mockup-desktop-kursor` dan `a2-explainer-kinetik`). Bukan 3D semu (pelajaran akun-keluarga-h2c).
Suara: usulan Jefri (Suara Penjelasan Lembut) seperti Video 1; Eleven v3 dengan tag audio. Tanpa musik. Pasangan Video 1 `naskah-umroh-10-juta.md`.

**STATUS: konsep menunggu persetujuan Bos (27 Nov 2026).**

## Konsep
Panduan untuk bapak-ibu: lima langkah dari masuk akun sampai kode kupon. Layar akun pelanggan H2C (latar zamrud, kartu paket, panel Checkout seperti situs) ditampilkan penuh; kursor bergerak pelan, angka langkah emas besar di atas layar, kolom yang diisi disorot. Kupon muncul di akhir sebagai kartu berkode unik. Tanpa orang, tangan, atau wajah; hanya layar, kursor, kartu. Ajakan tombol emas `umroh.h2c.or.id`.

## Fakta layar (dari tangkapan situs Bos 27 Nov dan repo h2c-umroh)
- Halaman paket: kartu paket (nama, durasi, harga, DP, sisa kursi), panel "Checkout": Jumlah jamaah (- / +), Pembayaran (Bayar DP atau Bayar Lunas), Nomor WhatsApp, ringkasan (Harga, Dibayar sekarang, Sisa pelunasan), tombol emas "Checkout & bayar".
- Teks situs: setelah DP, sisa biaya dicicil dengan nominal bebas (minimum Rp10.000) dari halaman pesanan sampai lunas.
- Menu samping: Beranda, Paket, Pesanan.
- **Belum ada di situs (sedang disiapkan di sesi cloud `h2c-hajar-aswad`):** paket bernama Hajar Aswad, pilihan DP bertingkat Silver/Gold/Platinum/Diamond, kartu kode kupon unik di halaman pesanan. Sampai jadi, ketiganya dibuat replika berlabel "contoh".

## Tabel naskah
| Waktu | Suara | Visual |
| --- | --- | --- |
| 0-5 hook | Mau ikut promo Hajar Aswad? Checkout-nya cuma lima langkah. | Layar akun H2C sudah bergerak di frame pertama: kartu paket Hajar Aswad masuk, lima titik langkah menyala berurutan di atas layar |
| 5-11 | Langkah satu: masuk ke akun H2C Anda, lalu buka menu Paket. | Angka "1" emas. Kursor menekan Masuk (data fiktif), lalu menu Paket di sisi kiri ikut menyala |
| 11-19 | Langkah dua: pilih paket Hajar Aswad, lalu pilih tingkat DP-nya: Silver, Gold, Platinum, atau Diamond. | Angka "2". Kursor membuka kartu paket Hajar Aswad; empat chip tingkat (DP 500 rb / 1 jt / 2,5 jt / 5 jt) tampil; kursor memilih satu, chip menyala |
| 19-27 | Langkah tiga: isi jumlah jamaah, pilih bayar DP, lalu cek nomor WhatsApp Anda. | Angka "3". Tombol + menekan jumlah jamaah; kartu Bayar DP terpilih; kolom WhatsApp (nomor fiktif) disorot emas |
| 27-37 | Langkah empat: tekan Checkout dan bayar. Sisanya bisa dicicil dengan nominal bebas, mulai sepuluh ribu rupiah. | Angka "4". Ringkasan Dibayar sekarang dan Sisa pelunasan disorot; kursor menekan "Checkout & bayar"; layar bayar generik tanpa merek lewat dengan centang "terbayar"; kartu Sisa pelunasan menyala dengan teks cicilan |
| 37-47 | Langkah lima: setelah DP terbayar dan dicek, kode kupon unik muncul di halaman pesanan. Simpan kodenya ya. | Angka "5". Menu Pesanan menyala; kartu kupon berkode unik (contoh `UND-XXXXXXXX`, label "contoh") jatuh pelan ke halaman dan berkilau; chip tingkat sama dengan yang dipilih |
| 47-55 ajakan | Yuk, ikut promonya. Kunjungi umroh titik H dua C titik or titik id. | Layar mengecil ke tengah; logo bulat asli + tombol emas `umroh.h2c.or.id` mengisi bingkai |

Waktu perkiraan; adegan mengikuti MP3 asli (suara tidak dipercepat). Layar dan kursor: kursor tidak melompat, berhenti sejenak sebelum klik; isi layar fiktif berlabel "contoh".

Jumlah kata teks suara ≈ 100 ≈ 44 dtk + jeda antar langkah ≈ 55 dtk.

## Beda dari konten lama
- Video 1 menjelaskan promo dan tingkat (3D meja); Video 2 menunjukkan cara checkout di layar. Topik berdekatan dengan #23 (daftar dan masuk) tapi isi beda: paket, DP, kupon. Hook beda.

## Prompt suara ElevenLabs (siap salin)
Suara: Jefri (Suara Penjelasan Lembut), usulan · Eleven v3 · Nada: sabar, hangat, jelas · Target ±55 dtk

```
[warmly] Mau ikut promo Hajar Aswad? Checkout-nya cuma lima langkah.

[slowly] Langkah satu: masuk ke akun H2C Anda, lalu buka menu Paket.

[slowly] Langkah dua: pilih paket Hajar Aswad, lalu pilih tingkat DP-nya: Silver, Gold, Platinum, atau Diamond.

[slowly] Langkah tiga: isi jumlah jamaah, pilih bayar DP, lalu cek nomor WhatsApp Anda.

[slowly] Langkah empat: tekan Checkout dan bayar. Sisanya bisa dicicil dengan nominal bebas, mulai sepuluh ribu rupiah.

[warmly] Langkah lima: setelah DP terbayar dan dicek, kode kupon unik muncul di halaman pesanan. Simpan kodenya ya.

[excited] Yuk, ikut promonya. Kunjungi umroh titik H dua C titik or titik id.
```

## Risiko / asumsi
1. Paket Hajar Aswad, pilihan tingkat, dan kartu kupon belum ada di situs; urutan dan nama tombol final mengikuti hasil sesi situs. Cocokkan ulang sebelum BANGUN; jangan diposting sebelum situsnya hidup.
2. "Dicek": siapa yang mengecek (admin manual atau otomatis) ikut keputusan sesi situs; naskah memakai kata Bos "dicek" tanpa janji waktu.
3. Layar bayar dibuat generik tanpa merek (metode bayar belum dipastikan); tanpa nama bank atau gateway.
4. Tangkapan Bos memuat nama dan nomor WhatsApp asli: JANGAN dipakai di video; gunakan data fiktif berlabel "contoh".
5. Tanpa harga paket selain angka DP dan cicilan minimum dari situs; tanpa janji kemenangan.
