# PLAN · akun-keluarga-h2c (BANGUN 3D)

Brand H2C Umroh (`brands/h2c-umroh/BRAND.md`, tanpa maskot) · Reels 9:16 1080x1920, 30 fps · durasi 70,0 dtk (suara V3 asli 68,8 dtk, tidak dipercepat; target ISIAN 55 dtk tidak terkejar tanpa mempercepat suara).

## Ide (satu baris)
Satu meja kerja zamrud-emas di sore hari: satu monitor milik kepala keluarga mengatur empat kartu nama anggota, langkah demi langkah, sampai semua siap berangkat.

## Tampilan
- Warna: dinding zamrud tua #0A1F17/#123B2A, meja kayu walnut gelap, aksen emas #D4AF6A (lampu kuningan, bingkai kartu, angka langkah), limau #8CC63F sedikit (titik kemajuan, centang).
- Cahaya: matahari sore hangat lewat kisi jendela kayu bermotif geometris (bayangan garis di dinding dan meja), lampu meja kuningan yang menyala di awal, cahaya layar. Sudut gelap dibiarkan.
- Tekstur: kartu nama kertas gading tebal bertepi emas, kayu walnut, kuningan halus.
- Benda: monitor diputar tegak (portrait, pas untuk 9:16), empat kartu nama berdiri (Aisyah, Hasan, Fatimah, Umar, label "contoh"), ponsel tergeletak, pot tanaman kecil, gelas teh. Tanpa manusia, tangan, hewan, atau siluet.
- Layar: UI generik bergaya kit H2C (zamrud, emas, gading; Great Vibes, Anton, Plus Jakarta Sans), label "Simulasi" di pojok, nama dan sandi berlabel "contoh", tanpa harga, tanpa merek pihak ketiga (aplikasi pesan ditulis "Pesan"). Logo H2C asli dari berkas resmi.
- Teks penting di area aman 9:16 (x 60-900, y 220-1500). Subtitle per frasa di bawah (gading di pil zamrud).

## Tabel shot (waktu dari suara V3)
| Waktu | Suara | Yang terlihat | Kamera | Gerak di adegan | Suara efek |
|---|---|---|---|---|---|
| 0-2,7 | Umroh sekeluarga? | Meja, monitor tegak: beranda H2C (logo, "Umroh" skrip + "SEKELUARGA" emas) | Bidikan sedang, dorong pelan | Frame 0: empat kartu nama kosong memantul muncul berurutan di depan monitor (jeda 0,2 dtk), lampu meja menyala | pop x4, klik saklar |
| 2,7-7,0 | Cukup satu akun kepala keluarga. Tidak perlu semua daftar sendiri. | Layar: satu kartu "Akun kepala keluarga" | Lanjut dorong pelan, sedikit mengorbit | Kartu akun di layar muncul; empat kartu nama bergoyang kecil | chip |
| 7,0-12,4 | Ikuti empat langkahnya ya, Bapak, Ibu. Pelan-pelan saja. | Empat titik langkah di atas layar menyala satu-satu | Mundur sedikit ke meja utuh | Tanaman bergoyang, debu di cahaya | tick x4 |
| 12,4-21,4 | Langkah satu: tambah anggota ... isi nama dan sandi setiap anggota. | Angka "1" emas besar berdiri di samping monitor; layar halaman Keluarga, tombol Tambah anggota, kolom nama "Aisyah" dan sandi "melati24" (contoh) | Dorong ke layar | Kursor menekan tombol, ketikan terisi; kartu nama pertama berbalik menampilkan "Aisyah" dan menyala | step-1, klik, ketik |
| 21,4-26,7 | Sandi itu kata rahasia. Satu akun bisa menampung sampai empat anggota. | Daftar anggota di layar terisi 4; slot kelima abu-abu "Maks. 4 anggota" | Tarik ke kartu-kartu di meja | Kartu 2, 3, 4 berbalik bergantian (Hasan, Fatimah, Umar); empat titik limau terisi | card-1..3 |
| 26,7-36,4 | Langkah dua: kirim ID dan sandinya ... kirim lewat WhatsApp. | Angka "2"; tombol Salin, toast "Tersalin"; lalu ponsel di meja: layar "Pesan" generik menerima kartu ID KLG-2417 + sandi (contoh), centang terkirim | Ke layar, lalu meluncur turun ke ponsel | Ponsel menyala dan bergetar kecil di meja, gelembung masuk | step-2, klik, ting, whoosh |
| 36,4-49,0 | Langkah tiga: anggota masuk ... Tidak perlu daftar lagi. | Angka "3"; halaman Masuk, tombol "Masuk dengan ID keluarga", ID dan sandi terketik, tombol Masuk; label "Tidak perlu daftar lagi" | Kembali ke monitor, dorong ke layar | Kartu "Aisyah" menyala dan maju ke depan monitor | step-3, klik, ketik, badge |
| 49,0-59,0 | Langkah empat: belikan paket ... Semua diatur dari satu akun. | Angka "4"; daftar paket "Paket Umroh A/B (contoh)" tanpa harga; jendela "Untuk siapa?" memilih Aisyah; "Pesanan atas nama Aisyah" | Dorong ke layar, lalu sedikit mengorbit | Kartu nama meluncur ke depan layar saat dipilih | step-4, klik, chip |
| 59,0-62,7 | Selesai. Satu akun, untuk seluruh keluarga. | Centang limau besar di layar; empat kartu berbaris rapi menyala | Mundur ke meja utuh | Kartu memantul kecil bergantian, cahaya emas menguat | ting, cascade |
| 62,7-70,0 | Yuk, rencanakan umroh sekeluarga. Kunjungi umroh.h2c.or.id | Layar: logo H2C asli + tombol emas "umroh.h2c.or.id" | Dorong pelan terakhir ke layar sampai tombol mengisi bingkai | Tombol emas berdenyut sekali | outro |

## Ajakan akhir
Ditulis di dalam adegan (di layar monitor, bukan stiker): logo bulat asli H2C, lalu tombol pill emas berteks zamrud `umroh.h2c.or.id`, kamera berakhir mendorong pelan ke tombol.

## Teknis
- Kit `a2-film-3d`: three.js, sub-frame (blur gerak, kedalaman bidang, bayangan lembut), satu lensa 40°, setiap gerak kamera satu kurva Bezier.
- Suara: MP3 V3 asli + efek dari `public/sfx/`, tanpa musik (sesuai naskah), master -14 LUFS.
- Render di sesi ini tanpa GPU (SwiftShader). Perkiraan: pratinjau n=4 sekitar 1,5-2 jam; final n=48 sekitar 15+ jam, jadi final disarankan di Mac lokal (`npm run final`). Pilihan cepat di cloud: final n=8.
