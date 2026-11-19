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

## Aturan
- Angka ilustratif selalu berlabel "contoh". Tanpa emoji, merek pihak ketiga, gradasi ungu.
- Setiap elemen pakai gerak masuk yang sama (spring, blur→tajam, geser kecil).
- Wajib melewati `a2-anti-tabrakan`, `a2-safe-area-sosmed`, dan `a2-komposisi-proximity` sebelum render. Maskot: `a2-maskot-gigi`.
