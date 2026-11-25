# A2-VIDEO

Video konten motion UI A2 Automation, dibuat dengan [Remotion](https://www.remotion.dev/) mengikuti `DESIGN.md`.

## Video: "Pesanan Sudah Sampai Mana?" — Konveksi 3D

- Komposisi `Konveksi3D`: Reels 1080×1920, 30 fps, sekitar 51 detik; naskah dan caption di `naskah-konveksi-3d.md`.
- Bengkel konveksi dimodelkan khusus dengan Blender 4.3.2: mesin jahit, jarum, jalur benang, kain, gunting, lembar order, lipatan kaus, rak bahan, serta laptop. Lima lintasan kamera asli, render Cycles, denoise Intel OIDN, dan interpolasi gerak kamera ke 30 fps. Grafis serta subtitle dikomposisikan dengan Remotion.
- Audio `public/konveksi/narration.wav`: bahasa Indonesia, suara standar Ardi Neural; suara bengkel dan efek konfirmasi asli di `workshop-sfx.wav`, tanpa musik. Timing kata: `src/data/konveksi-timing.json`.
- Simulasi pesanan K-021. Progres berubah setelah aksi petugas; bukan klaim sistem konveksi klien yang sudah berjalan.
- Hasil: `out/konveksi-3d-9x16.mp4`; model sumber: `public/konveksi/konveksi-workshop.blend`; klip 3D: `public/konveksi/clips/`; frame review: `out/stills/konveksi/`.

Urutan produksi ulang (Python dengan `edge-tts`, `Pillow`, `numpy`, `scipy`; Blender, FFmpeg, dan Intel OIDN tersedia):

```bash
python scripts/konveksi-props.py
python scripts/konveksi-audio.py
blender -b -t 3 -P scripts/konveksi-blender.py -- --render
A2_OIDN=/path/to/oidnDenoise python scripts/konveksi-denoise.py
REMOTION_BROWSER=/usr/bin/chromium node scripts/check-collisions.mjs Konveksi3D --every=15
python scripts/konveksi-release.py
```

Frame 3D antara tidak di-commit; skrip dapat melanjutkan render tanpa menimpa frame yang selesai. Suara dan hasil video lain tetap memakai aset masing-masing.
Skrip rilis memeriksa durasi klip, merender frame kunci dan video, lalu menormalkan audio ke sasaran −16 LUFS / true peak −1,5 dB dengan AAC stereo 48 kHz.

## Video: "Jam 9 Malam di Ruang TU"
- Naskah: `naskah-jam-9-malam.md`
- Hasil: `out/jam-9-malam-16x9.mp4` (1920×1080, 30 fps, 34 detik, dengan voiceover)
- Voiceover: `public/audio/vo.mp3` (33,07 detik)
- Frame kunci yang direview: `out/stills/`

## Video: "Makin Tumbuh, Makin Sibuk" (komposisi `A2Umum`)
- Naskah: `naskah-a2-umum.md`
- Hasil: `out/a2-umum-16x9.mp4` (1920×1080, 30 fps, 34 detik, dengan voiceover)
- Voiceover: `public/audio/vo-a2-umum.mp3` (33,23 detik), timing per kalimat di `src/data/vo-timing-a2-umum.json`
- Timeline: `src/data/timeline-a2-umum.ts`, adegan di `src/scenes/a2-umum/`
- Frame kunci yang direview: `out/stills/a2-umum/`

## Versi 9:16 untuk media sosial (Reels, TikTok, Shorts)
- `out/jam-9-malam-9x16.mp4` (komposisi `JamSembilanMalam916`) dan `out/a2-umum-9x16.mp4` (komposisi `A2Umum916`), 1080×1920
- Frame kunci: `out/stills/jam-9-malam-9x16/` dan `out/stills/a2-umum-9x16/`
- Area aman (`SAFE` di `src/components/Vertical.tsx`): x 60–900, y 220–1500. Kanan 180 px dikosongkan untuk tombol like/komentar/share, bawah 420 px untuk caption, nama akun, dan musik, atas 220 px untuk tab.
- Stage 16:9 dirender di dalam kamera yang zoom dan menggeser mengikuti kursor (`src/Vertical916.tsx`). Caption, jam, island, teks empati, dan penutup ditata ulang di area aman.
- Review area aman: `SAFE_GUIDE=1 STILLS_DIR=<folder> npm run stills:9x16` menandai zona terlarang dengan merah.

## Video: "Satu Pesanan, Tujuh Langkah" (komposisi `SatuPesanan`, 9:16)
- Naskah: `naskah-satu-pesanan.md`. Gaya explainer: teks kinetik kata per kata, diagram simpul yang terus bermorf, maskot Gigi
- Hasil: `out/satu-pesanan-9x16.mp4` (1080×1920, 30 fps, 43,5 detik, dengan voiceover)
- Voiceover: `public/audio/vo-satu-pesanan.mp3` (ElevenLabs, suara Jefri), timing per kalimat dan potongan di `src/data/vo-timing-satu-pesanan.json`
- Maskot Gigi (`src/components/Gigi.tsx`): gear yang sama dengan gear di logo A2, ekspresi lewat mata; lembar ekspresi di komposisi `GigiSheet`
- Efek suara: disintesis sendiri lewat `python3 scripts/make-sfx.py` ke `public/sfx/` (motif 7 langkah = tangga nada D mayor, terselesaikan jadi akor saat hub tersambung); jadwal bunyi di `src/scenes/satu-pesanan/Sfx.tsx`
- Penutup: Gigi turun ke posisi gear huruf A lalu menjadi gear logo. Logo dipisah per bagian dari file asli lewat `python3 scripts/split-logo.py` ke `public/logo/parts/` (tagline tanpa dua garis strip)
- Frame kunci: `out/stills/satu-pesanan/` (frame dihitung otomatis dari timing kalimat)

## Video: "5 Hal Sebelum Daftar Umroh" (komposisi `TipsUmroh`, 9:16)

- Video bicara asli (WhatsApp 28 Okt 2026) di `public/video/tips-umroh.mp4` (dikonversi ke H.264), ditambah motion graphic penjelasan
- Gaya visual mengikuti situs Wakaf H2C: hijau hutan, emas, krem; judul Fraunces dengan sorotan italic emas, kartu kaca, nomor `01` italic, tombol emas berkilau. Token di `src/tips-umroh/theme.ts`
- Transkrip dan timing per kata (ElevenLabs Scribe): `src/data/tips-umroh-words.json`; grafis menempel pada kata yang diucapkan (`src/tips-umroh/timeline.ts`)
- Tata letak: kartu di y 1050–1480, strip progres di y 236; wajah pembicara (y 460–860) tidak tertutup, kanan 180 px dan bawah 420 px bebas untuk tombol sosmed
- Pembuka: aerial Masjidil Haram + judul "Sebelum daftar umroh", lalu lingkaran berbingkai emas membuka dari wajah pembicara (`src/tips-umroh/Intro.tsx`)
- Hook: dua zoom punch-in ke wajah (setelah bukaan dan di kata "harganya"), kembali halus sebelum poin 1
- B-roll: video asli H2C dari rekaman layar Bos, dipotong ke adegan bersih (tanpa ikon UI dan kursor) di `public/broll/`: fasilitas (nampan makanan), manasik (meja pendaftaran), pembimbing (Ustadz Ammikus). Layar penuh dengan whip-zoom, digeser ke atas agar bagian penting berada di atas kartu (`src/tips-umroh/Broll.tsx`)
- Efek suara di `public/sfx/umroh/` lewat `python3 scripts/make-sfx-umroh.py`: wush (kartu/B-roll masuk), ssset (zoom, coretan), ting naik nada (centang), plus angin dan dentum di pembuka
- Ajakan: tombol emas `umroh.h2c.or.id`. Kartu tanpa `backdrop-filter` (di render paralel Chromium kadang menghasilkan frame glitch kotak blur)
- Hasil: `out/tips-umroh-9x16.mp4` (1080×1920, 30 fps, 24,8 detik). Frame kunci: `out/stills/tips-umroh/`

## Video: "Alasan Saya Bikin A2" (komposisi `AlasanSayaBikinA2`, 9:16)

- Naskah: `naskah-alasan-saya-bikin-a2.md`. Cerita asal orang pertama: panggung ilustrasi animasi, satu garis waktu pelan dengan tiga titik cerita (yang dilihat, yang disadari, keputusan), teks kinetik, Gigi menemani di atas garis. Tanpa mockup, kursor, angka, atau ajakan
- Hasil: `out/alasan-saya-bikin-a2-9x16.mp4` (1080×1920, 30 fps, 40,2 detik: suara 35,63 dtk + logo diam)
- Voiceover: `public/audio/vo-alasan-saya-bikin-a2.mp3` (ElevenLabs Eleven v4, suara Jefri - Soft Explanatory Voice, MP3 penuh dari Bos), timing per kalimat dan potongan di `src/data/vo-timing-alasan-saya-bikin-a2.json` (ffmpeg silencedetect)
- Ilustrasi animasi per bagian cerita (revisi 1): toko malam, mengetik ulang, tenaga habis, keluarga menunggu, mesin, fokus ke pelanggan, pulang tepat waktu (`Ilustrasi.tsx`)
- Kode: `src/AlasanSayaBikinA2.tsx`, adegan di `src/scenes/alasan-saya-bikin-a2/` (`Ilustrasi`, `GarisWaktu`, `GigiJalan`, `Judul`, `Penutup`, `Sfx`), timeline di `src/data/timeline-alasan-saya-bikin-a2.ts`
- Penutup: garis memudar, Gigi melompat menjadi gear di huruf A logo asli (tanpa ajakan, keputusan Bos). Revisi 2: kalimat 9 jadi "…kebersamaan keluarga", Gigi menggeleng ala 3D (prop `turn`) dan punya ekspresi `sedih`. Revisi 4: menoleh/mendongak (`turn`, `pitch`) tanpa skala, lewat paralaks + sisi tebal gear; ilustrasi dengan cahaya, vinyet, dan lampu gantung
- Frame kunci: `out/stills/alasan-saya-bikin-a2/` (dihitung dari timing suara, `scripts/alasan-saya-bikin-a2-frames.ts`). Perintah: `npm run stills:alasan`, `npm run render:alasan`

## Video: "Tiga Salah Kaprah soal Otomatisasi" (komposisi `TigaSalahKaprah`, 9:16)

- Naskah: `naskah-tiga-salah-kaprah-otomatisasi.md`. Explainer kinetik: tiga kartu tertutup bertumpuk, satu per satu maju, dibuka (MITOS), dicap, lalu dibalik datar (FAKTA) dan kembali ke baris atas; teks kinetik di bawah; penutup logo + ajakan dua tingkat
- Hasil: `out/tiga-salah-kaprah-otomatisasi-9x16.mp4` (1080×1920, 30 fps, 46,5 detik: suara 44,51 dtk + logo diam ±2 dtk)
- Voiceover: `public/audio/vo-tiga-salah-kaprah-otomatisasi.mp3` (ElevenLabs, suara Jefri - Soft Explanatory Voice, MP3 dari Bos, tidak dipercepat). Timing per kalimat dan segmen jeda di `src/data/vo-timing-tiga-salah-kaprah-otomatisasi.json` (ffmpeg silencedetect; kata disebar per suku kata di dalam segmennya)
- Maskot: `GigiPresisi` (`src/components/GigiPresisi.tsx`) mengikuti arahan Bos 19 Nov 2026: siluet tetap bulat (ketebalan tipis, arah tetap), layar wajah selalu di tengah, ekspresi bermorf (silang-pudar + kelopak menyempit), lirikan mengikuti kartu/kartu tugas yang aktif. `Gigi.tsx` lama tidak berubah tampilannya
- Efek suara: cap dan kartu dibalik disintesis `python3 -I scripts/make-sfx-tiga.py` ke `public/sfx/tiga/`; sisanya palet A2. Jadwal di `src/scenes/tiga-salah-kaprah-otomatisasi/Sfx.tsx`
- Kode: `src/TigaSalahKaprah.tsx`, adegan di `src/scenes/tiga-salah-kaprah-otomatisasi/` (`Kartu`, `GigiMelayang`, `Judul`, `Penutup`, `Sfx`, `layout`), timeline di `src/data/timeline-tiga-salah-kaprah-otomatisasi.ts`
- Frame kunci: `out/stills/tiga-salah-kaprah-otomatisasi/` (dihitung dari timing suara, `scripts/tiga-salah-kaprah-otomatisasi-frames.ts`). Perintah: `npm run stills:tiga-salah-kaprah`, `npm run render:tiga-salah-kaprah`


## Video: "Otomatisasi Itu Seperti Resep" (komposisi `OtomatisasiSepertiResep`, 9:16)
- Naskah: `naskah-otomatisasi-seperti-resep.md`. Ilustrasi garis dapur (panci, kartu resep, bahan, langkah) yang bermorf jadi simpul alur PEMICU, BAHAN, LANGKAH; sisipan B-roll klip Bos (B1, B2, B3); penutup logo A2 + ajakan dua tingkat. Tanpa Gigi, mockup, kursor
- Hasil: `out/otomatisasi-seperti-resep-9x16.mp4` (1080×1920, 30 fps, ±42,6 detik: suara 40,91 dtk + logo diam ±1,7 dtk)
- Voiceover: `public/audio/vo-otomatisasi-seperti-resep.mp3` (Jefri, MP3 dari Bos, tidak dipercepat). Timing di `src/data/vo-timing-otomatisasi-seperti-resep.json` (ffmpeg silencedetect, 21 potongan ucapan dipetakan ke 16 kalimat)
- B-roll: `public/broll/resep-b1-panci.mp4`, `resep-b2-mi-bumbu.mp4`, `resep-b3.mp4` (suara klip dibuang). B4 dan B5 belum ada, adegan itu memakai ilustrasi saja. Titik sisip di `src/scenes/otomatisasi-seperti-resep/layout.ts` (`BROLL`)
- Kode: `src/OtomatisasiResep.tsx`, adegan di `src/scenes/otomatisasi-seperti-resep/` (`Dapur`, `Alur`, `Broll`, `art`, `Judul`, `Penutup`, `Sfx`, `layout`), timeline di `src/data/timeline-otomatisasi-seperti-resep.ts`
- Frame kunci: `out/stills/otomatisasi-seperti-resep/` (`scripts/otomatisasi-seperti-resep-frames.ts`). Perintah: `npm run stills:otomatisasi-resep`, `npm run render:otomatisasi-resep`

## Video: "Tiga Hal Sebelum Waris Dibagi" (komposisi `TigaHalSebelumWaris`, 9:16, brand Tams Consulting)
- Naskah: `naskah-tiga-hal-sebelum-waris-dibagi.md`. Edukasi urutan: satu blok "HARTA ALMARHUM" turun melewati tiga gerbang (perawatan jenazah, utang, wasiat), tiap gerbang melepas potongan berlabel; sisanya mengisi kotak AHLI WARIS; daftar urutan 1-4; penutup "Urutan yang benar, baru dibagi." + logo Tams asli. Bidang rata arang/oranye di latar putih, tanpa orang, angka, atau ajakan. Gaya mengikuti `brands/tams-consulting/BRAND.md`
- Hasil: `out/tiga-hal-sebelum-waris-dibagi-9x16.mp4` (1080x1920, 30 fps, 58,5 detik: suara 56,5 dtk + logo diam 2 dtk). Suara lebih panjang dari target 50 dtk dan tidak dipercepat
- Voiceover: `public/audio/vo-tiga-hal-sebelum-waris-dibagi.mp3` (ElevenLabs, suara Kang Nandar, MP3 dari Bos). Timing: `src/data/vo-timing-tiga-hal-sebelum-waris-dibagi.json` (ffmpeg silencedetect, 25 potongan ke 15 kalimat)
- Kode: `src/TigaHalSebelumWaris.tsx`, adegan di `src/scenes/tiga-hal-sebelum-waris-dibagi/` (`Ilustrasi`, `Stage`, `Daftar`, `Penutup`, `Caption`, `Broll`, `Sfx`, `layout`), timeline di `src/data/timeline-tiga-hal-sebelum-waris-dibagi.ts`
- Revisi 1 (20 Nov 2026): kartu ilustrasi benda per kalimat (`Ilustrasi.tsx`: harta, tiga gerbang, keranda + kafan, surat utang + cap LUNAS, amplop wasiat + SAH, mushaf di rehal, rumah ahli waris), gaya modern bersudut bulat; semua tata letak ditengahkan di x 540
- B-roll: slot B1..B5 sudah disiapkan di `layout.ts` (`BROLL`, `src: null` = belum ada klip). Isi `src` dengan klip di `public/broll/` untuk menyisipkannya
- Revisi 1 (20 Nov 2026): ilustrasi benda per konsep (`Ikon.tsx`: rumah, koin, kunci, kain + sekop, tagihan, amplop; tanpa wajah/figur) dan semua isi ditengahkan di x 540 (`CX` di `layout.ts`)
- Frame kunci: `out/stills/tiga-hal-sebelum-waris-dibagi/` (`scripts/tiga-hal-sebelum-waris-dibagi-frames.ts`). Perintah: `npm run stills:tiga-hal-waris`, `npm run render:tiga-hal-waris`

## Video: "Manual, Template, atau Otomatis?" (komposisi `ManualTemplateOtomatis`, 9:16)
- Naskah: `naskah-manual-template-otomatis.md`. Edukasi teknis ringan marketing digital: tangga tiga tingkat (manual, template, otomatis), tiap tingkat memuat kartu contoh tugas berlabel "contoh"; tingkat 3 = rantai PEMICU, ATURAN, TINDAKAN dengan kartu "Formulir masuk" yang mengalir lalu "Laporan mingguan" terkumpul; Gigi melayang naik anak tangga; ajakan komentar; penutup logo A2 + ajakan follow `@a2automation.official` (tanpa konsultasi, perintah Bos)
- Hasil: `out/manual-template-otomatis-9x16.mp4` (1080x1920, 30 fps, 61,5 detik: suara 60,03 dtk + logo diam ±1,5 dtk)
- Voiceover: `public/audio/vo-manual-template-otomatis.mp3` (ElevenLabs, Jefri - Soft Explanatory Voice, MP3 dari Bos, tidak dipercepat). Timing: `src/data/vo-timing-manual-template-otomatis.json` (ffmpeg silencedetect, 22 kalimat; pemetaan dicek dari durasi dan suku kata, belum didengar)
- B-roll: klip B1 sampai B5 belum dilampirkan, jadi belum ada. Titik sisip terencana di `src/scenes/manual-template-otomatis/layout.ts` (`BROLL_PLAN`); isi `BROLL_CLIPS` dengan `{src: 'broll/...mp4', from, to, shift?}` (pola `src/tips-umroh/Broll.tsx`) lalu render ulang
- Kode: `src/ManualTemplateOtomatis.tsx`, adegan di `src/scenes/manual-template-otomatis/` (`Tangga`, `GigiNaik`, `Judul`, `Penutup`, `Sfx`, `layout`), timeline di `src/data/timeline-manual-template-otomatis.ts`
- Frame kunci: `out/stills/manual-template-otomatis/` (`scripts/manual-template-otomatis-frames.ts`). Perintah: `npm run stills:manual-template-otomatis`, `npm run render:manual-template-otomatis`

## Video: "Daftar dan Masuk Akun H2C" (komposisi `DaftarDanMasukH2C`, 9:16, brand H2C Umroh)
- Naskah: `naskah-daftar-dan-masuk-h2c.md` (dibangun dengan **versi F**: hook "ribet? salah!", OTP salin-tempel, promo di penutup, untuk bapak-ibu sepuh). Panduan untuk bapak-ibu: replika web umroh H2C tampilan HP di jendela peramban (tab situs + tab Email generik), kursor manusiawi, kolom disorot emas, kartu bagian 1 DAFTAR / 2 MASUK, kode 6 angka dari email (fiktif, berlabel "contoh"), hook "Daftar online itu RIBET? SALAH!", menu Salin/Tempel untuk kode, penutup logo asli + chip "ADA PROMO UMROH" (tanpa angka) + tombol emas `umroh.h2c.or.id`. Tampilan sepuh: teks besar 56, kursor lebih besar dan diam sebentar sebelum klik, sorotan emas 6 px. Gaya dari `brands/h2c-umroh/BRAND.md`, tanpa maskot
- Hasil: `out/daftar-dan-masuk-h2c-9x16.mp4` (1080x1920, 30 fps, 64,7 detik: suara 63,79 dtk + logo diam ±0,9 dtk)
- Voiceover: `public/audio/vo-daftar-dan-masuk-h2c.mp3` (ElevenLabs, Jefri - Soft Explanatory Voice, MP3 versi F dari Bos 23 Nov, tidak dipercepat). Timing: `src/data/vo-timing-daftar-dan-masuk-h2c.json` (ffmpeg silencedetect, 31 potongan ke 11 kalimat)
- B-roll: B1 sampai B4 belum dilampirkan. Titik sisip di `src/scenes/daftar-dan-masuk-h2c/layout.ts` (`BROLL`, `src: null`); isi `src` dengan `broll/daftar-dan-masuk-h2c/B1.mp4` dst. lalu render ulang
- Kode: `src/DaftarDanMasukH2C.tsx`, adegan di `src/scenes/daftar-dan-masuk-h2c/` (`Layar`, `Kursor`, `Judul`, `Caption`, `Penutup`, `Sfx`, `layout`), timeline di `src/data/timeline-daftar-dan-masuk-h2c.ts`
- Frame kunci: `out/stills/daftar-dan-masuk-h2c/` (`scripts/daftar-dan-masuk-h2c-frames.ts`). Perintah: `npm run stills:daftar-dan-masuk-h2c`, `npm run render:daftar-dan-masuk-h2c`

## Video: "Satu Akun untuk Sekeluarga" (komposisi `AkunKeluargaH2C`, 9:16, brand H2C Umroh)
- Naskah: `naskah-akun-keluarga-h2c.md`. Lanjutan #11: akun keluarga dalam empat langkah (tambah anggota, kirim ID dan sandi, anggota masuk dengan ID keluarga, belikan paket; maks. 4 anggota). Meja 3D semu di Remotion: monitor di meja zamrud dengan cahaya tirai emas, kamera mendekat ke layar tiap langkah dan pindah ke ponsel (fokus kabur di monitor) saat ID dikirim, angka langkah besar yang mengecil jadi lencana, empat kartu nama berdiri di meja (nama fiktif berlabel "contoh"), penutup logo asli + tombol emas `umroh.h2c.or.id`. Tanpa makhluk bernyawa, tanpa maskot
- Hasil: `out/akun-keluarga-h2c-9x16.mp4` (1080x1920, 30 fps, 62,5 detik: suara 61,57 dtk + logo diam ±0,9 dtk)
- Voiceover: `public/audio/vo-akun-keluarga-h2c.mp3` (ElevenLabs, Jefri - Soft Explanatory Voice, dari Bos 25 Nov, tidak dipercepat). Timing: `src/data/vo-timing-akun-keluarga-h2c.json` (ffmpeg silencedetect, 30 potongan)
- B-roll: B1 sampai B4 belum dilampirkan. Titik sisip di `src/scenes/akun-keluarga-h2c/layout.ts` (`BROLL`, `src: null`)
- Kode: `src/AkunKeluargaH2C.tsx`, adegan di `src/scenes/akun-keluarga-h2c/` (`Meja`, `Layar`, `Kamera`, `Judul`, `Kursor`, `Caption`, `Penutup`, `Sfx`, `layout`), timeline di `src/data/timeline-akun-keluarga-h2c.ts`
- Frame kunci: `out/stills/akun-keluarga-h2c/` (`scripts/akun-keluarga-h2c-frames.ts`). Perintah: `npm run stills:akun-keluarga-h2c`, `npm run render:akun-keluarga-h2c`

## Skill, pemeriksa tabrakan, dan hook penjaga (Fase 1)

- Skill di `.claude/skills/`: `a2-motion-video` (alur umum), `a2-anti-tabrakan`, `a2-komposisi-proximity`, `a2-safe-area-sosmed`, `a2-maskot-gigi`
- Pemeriksa tabrakan: `node scripts/check-collisions.mjs <IdKomposisi> [--every=15] [--frames=..] [--safe=off|x,y,w,h] [--protect=nama:x,y,w,h]`. Mengukur kotak teks sungguhan di Chromium lewat probe `src/dev/CollisionProbe.tsx` (aktif hanya lewat input props, render biasa tidak berubah). Melaporkan teks menimpa teks, teks di luar area aman 9:16, dan teks menutup area terlindungi (bawaan per komposisi di `scripts/collision-config.json`, mis. wajah pembicara). Komposisi baru wajib dibungkus `withProbe` di `src/Root.tsx`.
- Hook penjaga (`.claude/settings.json`, aktif saat sesi Claude Code dibuka di repo ini): menahan `remotion render` / `npm run render:*` bila pemeriksa menemukan masalah (lewati dengan `SKIP_CC=1`), memblokir `rm` pada `00-gigi-ekspresi.png` dan `out/stills/satu-pesanan/*`, dan menjalankan typecheck setelah file `src/` diubah.

## Otomatisasi (Fase 2)

- 6 skill tambahan: `a2-logo-animasi`, `a2-voiceover-sinkron`, `a2-sfx-signature`, `a2-explainer-kinetik`, `a2-mockup-desktop-kursor`, `a2-render-rilis` (total 11 skill di `.claude/skills/`).
- 4 subagent di `.claude/agents/`: `penulis-naskah` (konsep dan naskah, berhenti untuk persetujuan Bos), `pengulas-visual`, `pengulas-audio` (hanya melapor), `perender`.
- 4 slash command di `.claude/commands/`: `/video-baru <ide>`, `/review-frame <Id>`, `/versi-916 <Id>`, `/render-semua <Id ...>`.
- `node scripts/cek-regresi.mjs [Id ...]`: render ulang frame kunci video lama dan pastikan identik dengan yang di-commit (keluar 1 bila ada yang berubah).
- Agen dan perintah baru terbaca saat sesi Claude Code berikutnya dibuka di repo ini.

## Produksi berulang (Fase 3)

- `antrean-ide.md`: antrean ide video (status siap/tahan/selesai), diurus Bos. `/ide-mingguan [nomor]` mengambil satu ide, membuat konsep dan naskah lewat `penulis-naskah`, lalu berhenti menunggu persetujuan Bos.
- Tugas terjadwal mingguan menjalankan alur itu otomatis; tidak pernah merender, membuat suara, atau memposting sendiri.
- Skill `a2-jadwal-posting`: jadwal posting dan analitik via Metricool, **selalu minta persetujuan Bos** dan memakai jalur draf untuk ditinjau. Butuh konektor Metricool yang diotorisasi Bos (saat ini perlu sign-in ulang).

## Struktur
- `src/theme.ts`: token warna, huruf, radius, bayangan, dan spring dari DESIGN.md
- `src/data/timeline.ts`: waktu adegan, caption, jalur kursor, dan klik (frame global)
- `src/data/vo-timing.json`: timestamp per kalimat dari deteksi jeda hening di vo.mp3
- `src/scenes/`: satu komponen per adegan
- `src/components/`: Window, Cursor, Caption, Button, Toggle, ProgressBar, Chart, Island, Logo, Clock, Outro, AppUI (sidebar, header, kartu), AppScreen/AppScreenUmum, MessyDesktop/MessyDesktopUmum
- `public/logo/a2-automation.png`: salinan identik `asset/logo/logo a2 automation.png`
- `public/fonts/`: Geist 400/500/600

## Perintah
```bash
npm install
npm run studio      # pratinjau
npm run stills              # frame kunci "Jam 9 Malam" ke out/stills/
npm run render              # MP4 "Jam 9 Malam" ke out/
npm run stills:a2-umum      # frame kunci A2Umum ke out/stills/a2-umum/
npm run render:a2-umum      # MP4 A2Umum ke out/
npm run stills:9x16 / npm run stills:a2-umum-9x16    # frame kunci 9:16
npm run render:9x16 / npm run render:a2-umum-9x16    # MP4 9:16
npm run stills:satu-pesanan / npm run render:satu-pesanan
npm run stills:tips-umroh / npm run render:tips-umroh
```
Jika Chromium tidak bisa diunduh otomatis, isi `REMOTION_BROWSER` dengan path Chromium lokal.

## Mengganti voiceover
1. Ganti `public/audio/vo.mp3`.
2. Perbarui `src/data/vo-timing.json`, lalu sesuaikan `SCENES`, `CAPTIONS`, klik, dan jalur kursor di `timeline.ts`.
   Jika suara lebih panjang, perpanjang adegan, jangan percepat suara.

Angka di kedua video (mis. 32 siswa, 97 chat, 128 tagihan, Rp123 jt) hanya ilustrasi.

## Video: "Kenapa Wasiat Dibatasi Sepertiga?" (komposisi `WasiatMaksimalSepertiga`, 9:16, brand Tams Consulting)
- Naskah: `naskah-wasiat-maksimal-sepertiga.md`. Edukasi satu dalil: kisah Sa'd bin Abi Waqqash. Satu batang HARTA arang; penanda SELURUH? dan SETENGAH? dicoret, garis oranye terkunci di SEPERTIGA, sisanya meredup (gembok) dan mengalir ke kotak AHLI WARIS; lalu potongan KEWAJIBAN dilepas (SISA HARTA), panah wasiat ke ahli waris ditahan palang, tanda "bagian sudah ditetapkan". Kartu atas: amplop wasiat, kisah, sabda, perbandingan berkecukupan/meminta-minta, sumber hadits bernomor. Penutup "Batas yang menjaga keluarga." + logo Tams asli, tanpa ajakan
- Hasil: `out/wasiat-maksimal-sepertiga-9x16.mp4` (1080x1920, 30 fps, 61,7 detik: suara 59,7 dtk + logo diam 2 dtk). Suara tidak dipercepat
- Voiceover: `public/audio/vo-wasiat-maksimal-sepertiga.mp3` (ElevenLabs, suara Jefri "Suara Penjelasan Lembut", MP3 dari Bos). Timing: `src/data/vo-timing-wasiat-maksimal-sepertiga.json` (ffmpeg silencedetect, 26 potongan ke 15 kalimat)
- Kode: `src/WasiatMaksimalSepertiga.tsx`, adegan di `src/scenes/wasiat-maksimal-sepertiga/` (`Kartu`, `Batang`, `Penutup`, `Caption`, `Broll`, `Sfx`, `layout`), timeline di `src/data/timeline-wasiat-maksimal-sepertiga.ts`. Teks bawah: kata "Nabi" selalu diikuti "shallallahu 'alaihi wa sallam" (aturan Brand Kit)
- B-roll: slot B1..B5 di `layout.ts` (`BROLL`, `src: null` = belum ada klip)
- Frame kunci: `out/stills/wasiat-maksimal-sepertiga/` (`scripts/wasiat-maksimal-sepertiga-frames.ts`). Perintah: `npm run stills:wasiat-sepertiga`, `npm run render:wasiat-sepertiga`

## Video: "Siapa yang Menentukan Bagian Waris?" (komposisi `DuluTakDapatBagian`, slug `dulu-tak-dapat-bagian`, 9:16, brand Tams Consulting)
- Naskah: `naskah-dulu-tak-dapat-bagian.md`. Riwayat Jabir bin Abdullah radhiyallahu 'anhu (HR. Bukhari 4577, Muslim 1616) lalu QS An-Nisa 4:11 dan 4:7. Hook map HARTA + tanda tanya; kartu arang "SEBELUM AYAT TURUN" (meja dan gelas, dua kapsul Rasulullah/Abu Bakar dengan lafaz penghormatan, kendi dan percikan, surat "Hartaku harus diapakan?"); geser sudut daun ke kartu terang "SESUDAH AYAT TURUN" (kartu ayat, dua map setara LAKI-LAKI/PEREMPUAN terisi, pita DITETAPKAN); penutup "Kebiasaan keluarga" dicoret, "Ketetapan Allah subhanahu wa ta'ala", logo Tams asli. Label sumber tampil di atas kartu. Tanpa makhluk bernyawa, tanpa pecahan, tanpa ajakan
- Hasil: `out/dulu-tak-dapat-bagian-9x16.mp4` (1080x1920, 30 fps, 48,1 dtk: suara 46,1 dtk + logo diam 2 dtk; suara tidak dipercepat)
- Voiceover: `public/audio/vo-dulu-tak-dapat-bagian.mp3` (MP3 dari Bos 25 Nov 2026). Timing: `src/data/vo-timing-dulu-tak-dapat-bagian.json` (ffmpeg silencedetect, 17 potongan ke 10 kalimat)
- Kode: `src/DuluTakDapatBagian.tsx`, adegan di `src/scenes/dulu-tak-dapat-bagian/` (`Panggung`, `Penutup`, `Caption`, `Broll`, `Sfx`, `layout`), timeline `src/data/timeline-dulu-tak-dapat-bagian.ts` (penanda `~kata` = lafaz penghormatan kecil di teks bawah)
- B-roll: slot B1..B5 siap di `layout.ts` (`src: null`), klip belum dilampirkan
- Frame kunci: `out/stills/dulu-tak-dapat-bagian/` (`scripts/dulu-tak-dapat-bagian-frames.ts`). Perintah: `npm run stills:dulu-tak-dapat-bagian`, `npm run render:dulu-tak-dapat-bagian`

