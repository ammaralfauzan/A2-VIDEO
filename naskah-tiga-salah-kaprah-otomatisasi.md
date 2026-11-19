# Naskah Video: "Tiga Salah Kaprah soal Otomatisasi"

Format: Reels 9:16 (1080×1920), target ±40 detik · Gaya: explainer kinetik + maskot Gigi, tanpa mockup, tanpa kursor · Brand: A2 Automation
Pola: tiga kartu "MITOS" muncul satu per satu di zona visual, dicap, lalu dibalik (putar 3D datar) menjadi kartu "FAKTA". Teks kinetik kata per kata di bawah kartu. Tanpa harga, angka, atau klaim hemat.
Suara: ElevenLabs, Jefri (Suara Penjelasan Lembut), Eleven v3 dengan tag audio; "A2" diucapkan "A Dua". Tanpa musik, efek suara halus (cap, kartu dibalik).

**STATUS: menunggu persetujuan Bos. Belum boleh dieksekusi.**

## Konsep
Video edukasi mitos-fakta yang menenangkan orang yang ragu memulai otomatisasi. Tiga anggapan umum (harus jago teknis, menggantikan karyawan, harus sekaligus) muncul sebagai kartu "MITOS", dicap, lalu dibalik menjadi kartu "FAKTA" dengan satu kalimat jawaban. Gigi mulai ragu dan cemas, makin lega di tiap kartu yang terbalik, dan puas di akhir. Pesan tunggal: otomatisasi bisa dimulai dari satu pekerjaan kecil, oleh siapa saja, tanpa menyingkirkan orang. Penutup halus: pertanyaan untuk penonton, lalu Gigi menjadi gear di logo A2 dan ajakan konsultasi gratis a2automate.com.

## Tabel naskah
| Waktu | Suara | Visual | Gigi |
| --- | --- | --- | --- |
| 0–5 hook | Tiga hal ini bikin orang takut otomatisasi. Padahal, belum tentu benar. | Tiga kartu tertutup bertumpuk di zona visual, bergoyang pelan; kata "takut" menebal. Saat "belum tentu benar", tumpukan merenggang. Caption "Tiga salah kaprah otomatisasi" | ragu (cemas ringan, menatap tumpukan) |
| 5–13 mitos 1 | Pertama, katanya harus jago teknis. Faktanya, tidak. Cukup paham alur kerja Anda sendiri. Bagian teknisnya bisa dibantu. | Kartu 1 maju: "MITOS · Harus jago teknis". Cap "MITOS" menghentak (bunyi cap). Saat "Faktanya", kartu dibalik: "FAKTA · Cukup paham alur kerja sendiri". Kata "alur kerja" menebal | cemas → mikir → sedikit lega |
| 13–21 mitos 2 | Kedua, katanya otomatisasi menggantikan karyawan. Faktanya, yang diganti pekerjaan berulangnya, bukan orangnya. Tim jadi punya waktu untuk pelanggan. | Kartu 1 bergeser kecil ke atas-kiri (menumpuk rapi). Kartu 2: "MITOS · Menggantikan karyawan" → dicap → dibalik: "FAKTA · Yang diganti pekerjaan berulang, bukan orangnya". Kata "bukan orangnya" menebal | kaget → senang |
| 21–30 mitos 3 | Ketiga, katanya harus diubah semua sekaligus. Faktanya, bisa mulai dari satu pekerjaan kecil dulu. Setelah terasa ringan, baru tambah pelan-pelan. | Kartu 3: "MITOS · Harus sekaligus" → dicap → dibalik: "FAKTA · Mulai dari satu pekerjaan kecil". Kata "satu" menebal; satu kartu tugas kecil generik (tanpa nama/angka) menyala, lalu satu lagi menyusul pelan | lega (napas lega), menatap kartu kecil |
| 30–35 pertanyaan | Jadi, kalau boleh pilih satu, pekerjaan apa yang ingin Anda lepas duluan? | Tiga kartu FAKTA merapat jadi satu baris rapi lalu memudar; tersisa satu kartu kecil kosong bertanda tanya | mikir, lirik ke penonton |
| 35–40 ajakan | A Dua Automation. Konsultasi gratis di a dua automate titik com. | Gigi melayang ke posisi gear di huruf A, menjadi gear logo asli; wordmark lalu tombol `a2automate.com` (ajakan dua tingkat) | puas, lalu menyatu ke logo |

Waktu di atas perkiraan; adegan nanti mengikuti MP3 asli (suara tidak dipercepat).
Total 89 kata ≈ 38,7 dtk ucapan (2,3 kata/dtk) + ±1,5 dtk logo diam ≈ 40 dtk. Selisih dari target 40 dtk: ±3% (aman).

Tulisan di kartu (layar): "MITOS" / "FAKTA" sebagai label, isi maksimal 6 kata per kartu.

## Ajakan
Halus: pertanyaan "pekerjaan apa yang ingin Anda lepas duluan?", lalu logo dan "Konsultasi gratis · a2automate.com".

## Beda dari konten lama (cek `docs/daftar-konten.md`)
- Terdekat: #5 "Bisa nggak diotomatisasi?" (stempel "BISA." + peragaan kemampuan). Bedanya: ini menjawab **ketakutan/keberatan**, bukan kemampuan; tanpa peragaan alur kerja; mekanik utamanya **kartu dibalik** (cap hanya penanda "MITOS"). Hook dan pembuka berbeda.
- Tidak memakai alur 7 langkah (#3), tanpa mockup (#1, #2), tanpa garis waktu (#6).

## Risiko / asumsi
- "Bagian teknisnya bisa dibantu" dan "yang diganti pekerjaan berulangnya" adalah klaim umum layanan A2, tanpa janji hasil, angka, atau hemat.
- Kartu tugas kecil di mitos 3 generik (mis. "rekap harian · contoh"), tanpa nama klien atau angka.
- Gigi memakai arahan Gigi terbaru di skill `a2-maskot-gigi` (siluet tetap lingkaran, layar wajah di tengah, ekspresi morf halus, lirikan mengikuti kartu).

## Prompt suara ElevenLabs (siap salin)
Suara: Jefri (Suara Penjelasan Lembut) · Model: Eleven v3 (mendukung tag audio) · Nada: tenang, meyakinkan, menenangkan · Target: ±40 dtk

```
[curious] Tiga hal ini bikin orang takut otomatisasi.

[warmly] Padahal, belum tentu benar.

[cautiously] Pertama, katanya harus jago teknis.

[warmly] Faktanya, tidak. Cukup paham alur kerja Anda sendiri. Bagian teknisnya bisa dibantu.

[cautiously] Kedua, katanya otomatisasi menggantikan karyawan.

[warmly] Faktanya, yang diganti pekerjaan berulangnya, bukan orangnya. Tim jadi punya waktu untuk pelanggan.

[cautiously] Ketiga, katanya harus diubah semua sekaligus.

[softly] Faktanya, bisa mulai dari satu pekerjaan kecil dulu. Setelah terasa ringan, baru tambah pelan-pelan.

[curious] Jadi, kalau boleh pilih satu, pekerjaan apa yang ingin Anda lepas duluan?

[warmly] A Dua Automation. Konsultasi gratis di a dua automate titik com.
```
