---
name: a2-explainer-kinetik
description: Format explainer teks kinetik A2 (kata muncul saat diucapkan, morf tanpa cut, diagram simpul, kartu hasil) mengikuti referensi Bos, lengkap dengan kerangka alur cerita. Pakai saat membuat video konsep/penjelasan 9:16 baru.
---

# Explainer kinetik

Referensi gaya dari Bos: teks besar kata per kata, elemen yang terus bermorf (tanpa cut kasar), diagram simpul, maskot. Contoh jadi: "Satu Pesanan, Tujuh Langkah" (`src/SatuPesanan.tsx`, `src/scenes/satu-pesanan/`).

## Kerangka cerita (soft selling, 40–45 dtk)
1. **Pemicu** (≤3 dtk): satu kejadian sederhana ("Satu pesanan masuk").
2. **Beban**: pecah jadi langkah-langkah yang tumbuh satu per satu, maskot makin lelah.
3. **Skala**: kalikan (contoh angka, diberi label "contoh") sampai terasa berat.
4. **Reframe**: masalahnya bukan manusia, tapi jumlah langkah.
5. **Solusi**: hub "Alur otomatis" menyambung semua; kartu hasil muncul mengikuti suara.
6. **Manusia**: tim mengurus yang butuh manusia.
7. **Pertanyaan**: "Mau tahu langkah mana yang bisa otomatis?"
8. **Ajakan**: logo dan "Konsultasi gratis di a2automate.com".
Konsep baru wajib disetujui Bos dulu (aturan Bos), jangan langsung dieksekusi. Gunakan agen `penulis-naskah`.

## Mesin teks
- `SENTENCES` di `src/data/timeline-satu-pesanan.ts`: `*kata*` = kata kunci (tebal), `|` = pindah potongan (maks 6 kata per potongan). Waktu dari `vo-timing-<video>.json`. `KineticText` memunculkan kata tepat saat diucapkan (blur → tajam, naik 8 px), abu sebentar lalu menggelap.
- Kotak teks tetap: `TEXT_BOX {left 180, width 720, top 1110}`; area visual di atasnya (`VIS`, y 260–1060). Teks tidak pernah bertabrakan dengan visual karena beda zona.

## Morf, bukan cut
Node dan elemen berpindah bentuk lewat `nodeState` (pohon → ubin → tumpukan → cincin hub). Bila perlu elemen baru, ubah dari elemen yang ada dulu ("ubah yang sudah ada sebelum menambah"). Fase tata letak dikumpulkan di satu objek `P` (frame dari timing kalimat), bukan angka di tiap komponen.

## Garis menjadi lingkaran (pelajaran "Alasan Saya Bikin A2")
Jangan menggeser tiap titik garis lurus ke titik lingkaran (lerp titik per titik): hasil tengahnya berpilin aneh. Pakai lengkung **berkelengkungan tetap dengan panjang tetap** (panjang garis = keliling lingkaran, kelengkungan naik 0 → 2π/panjang). Contoh `morphPath` di `src/scenes/alasan-saya-bikin-a2/GarisWaktu.tsx`. Teks kinetik juga bisa dipakai ulang tanpa mengubah komponen bersama: buat timeline sendiri dengan tipe `Chunk` yang sama.

## Ilustrasi cerita (pelajaran revisi "Alasan Saya Bikin A2")
Untuk cerita orang pertama, Bos meminta **ilustrasi animasi tiap bagian cerita** (bukan hanya teks + garis). Pola: panggung kartu di zona visual (x 180–900, y 360–700), satu adegan datar per bagian cerita, berganti pudar (lama habis dulu, baru masuk). Contoh dan bentuk dasar yang bisa dipakai ulang (`Person`, `HomeWindow`, `Clock`, `Cog`, `Table`, `Bubble`, `Heart`): `src/scenes/alasan-saya-bikin-a2/Ilustrasi.tsx`.
- Di latar gelap, kepala/kaki orang jangan navy (tak terlihat): pakai `ink` terang.
- Orang duduk di belakang meja: panel depan meja menutup sampai dasar panggung, dan dasar kaki dinaikkan agar badan terlihat di atas meja.
- Simbol yang muncul belakangan (hati, bohlam) jangan menimpa jam/jendela; cek di frame kunci.
- Revisi 2 (Bos): ilustrasi harus **dramatis dan mengundang perasaan**: suasana dari lapisan token beropasitas (hujan, lampu jalan, kerucut cahaya lampu meja, ruangan meredup, makanan mendingin vs hangat, berkas cahaya senja), wajah tokoh ikut merasakan (senang/sedih/lelah/pejam), kamera mendorong pelan (`Push`), benda kunci digambar detail (`Bulb`, `DeskLamp`).
- Revisi 4 (Bos, permintaan diulang = belum cukup): drama datang dari **kontras cahaya**, bukan menambah benda. Pakai pendar `radialGradient` (`il-glow-w`/`il-glow-b`), kerucut cahaya `il-cone` yang memudar ke bawah, vinyet tepi (`Vignette`: garis tebal navyInk diburamkan), sorotan ke benda yang menyimpan emosi (lampu gantung menyorot kursi kosong), air mata kecil, pipi merona saat bahagia, bayangan kaki, debu melayang di cahaya. Lampu digambar sampai detail fisiknya (ulir, filamen dengan tiang, sendi berbaut, pegas, sakelar, bibir kap). Elemen penting (awan pikiran) ditaruh di atas lapisan gelap agar tetap terbaca. Gradasi hanya untuk cahaya (aksen).
- Antar-adegan pakai **pudar silang** (adegan baru di atas masuk 8 frame, lama tetap penuh di bawah); pudar-keluar lalu pudar-masuk menimbulkan kedip putih di antara dua adegan gelap (tertangkap pemeriksa frame meloncat).
- Garis waktu di akhir cerita cukup memudar; Bos tidak mau garis berubah jadi lingkaran.

## Kartu dibalik (pelajaran "Tiga Salah Kaprah")
- Mekanik mitos-fakta: kartu (`Kartu.tsx`) bergerak antar keadaan lewat daftar kunci posisi (tumpukan → merenggang → tengah → slot kecil di baris atas), dibalik datar dengan `rotateY` (wajah ditukar di 90°). Contoh `src/scenes/tiga-salah-kaprah-otomatisasi/`.
- **Cap tidak boleh menyentuh teks kartu**: cap diputar sehingga kotaknya lebih tinggi; taruh di kanan bawah dengan jarak, dan uji isi kartu terpanjang (2 baris). Pemeriksa tabrakan menangkapnya.
- Kartu yang kembali ke baris jangan melintasi kartu kecil lain: kecilkan dulu di tempat/ke samping, baru naik.
- Tanda tanya di punggung kartu digambar (path SVG), bukan teks, agar kartu bertumpuk tidak dianggap teks bertabrakan.
- Timing tanpa transkrip: simpan `segmen` (ucapan di antara jeda + jumlah kata) per kalimat; kata disebar hanya di dalam segmennya (`timeline-tiga-salah-kaprah-otomatisasi.ts`).

## Tangga tiga tingkat (pelajaran "Manual, Template, atau Otomatis?")
- Pola: tiga blok anak tangga (zona y 700–1050), panel contoh di atasnya (y 330–600) yang berganti per tingkat, Gigi melayang di atas anak tangga aktif (pegas teredam kritis, tanpa lompat). Anak tangga aktif = satu-satunya elemen bergradasi. Contoh `src/scenes/manual-template-otomatis/`.
- Caption pill kecil di atas harus di y ≤ 232 agar tidak menyentuh panel (y 330).
- Kalimat ajakan yang diucapkan bersamaan dengan logo (penutup mulai 12 frame sebelum kalimat): jangan jadwalkan label/tombol dari kata ucapan; hitung dari awal penutup (`start + 46/60`) agar muncul SETELAH huruf A, angka 2, wordmark tersusun. Pemeriksa frame meloncat menangkap tombol yang muncul sebelum logo.
- Perubahan warna kotak (mis. simpul menyala) dihaluskan 8 frame (lapisan beropasitas), bukan ditukar mendadak: pemeriksa frame meloncat menandainya.
- Elemen yang berpindah (kartu tugas) tidak boleh muncul di jalur Gigi yang sedang melayang; tunda kemunculan ±20 frame setelah Gigi berangkat.

## Aturan
- Angka ilustratif selalu berlabel "contoh". Tanpa emoji, merek pihak ketiga, gradasi ungu.
- Setiap elemen pakai gerak masuk yang sama (spring, blur→tajam, geser kecil).
- Wajib melewati `a2-anti-tabrakan`, `a2-safe-area-sosmed`, dan `a2-komposisi-proximity` sebelum render. Maskot: `a2-maskot-gigi`.
