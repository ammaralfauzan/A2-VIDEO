# Brand Kit: A2 Automation

Kode: `a2` · Sumber utama: `DESIGN.md` di root repo (kontrak visual A2) dan skill `a2-*` · Disetujui Bos: dipakai sejak video pertama

## Identitas
- A2 Automation (PT A2 Automate Solutions), otomatisasi alur kerja untuk usaha. Penonton: pemilik usaha dan pengelola operasional.
- Nada: tenang, meyakinkan, membantu. Bukan heboh, bukan menakut-nakuti.
- Nuansa visual: bersih, terang, minimalis.
- Tagline logo: AUTOMATE WORKFLOW. EMPOWER INDUSTRIES. Domain: a2automate.com.

## Warna
| Token | Nilai | Dipakai untuk |
|---|---|---|
| navy | #13254A | teks utama, komponen gelap, huruf A |
| navyInk | #0B1630 | teks paling gelap, bayangan |
| blue1 | #00A6F4 | ujung terang gradasi |
| blue2 | #0A3FD6 | ujung gelap gradasi |
| canvas | #F4F6FA | latar kanvas |
| surface | #FFFFFF | jendela, kartu |
| line | #E3E7EF | garis dan border |
| muted | #6B7385 | teks sekunder |
| success | #1FAF6B | status berhasil (hemat) |
| alert | #E5484D | badge notifikasi di adegan masalah saja |

Gradasi (135°, blue1 ke blue2) hanya untuk aksen, maksimal satu elemen besar per frame. Latar selalu terang.

## Huruf
- Geist 400, 500, 600. Maksimal dua keluarga huruf per video.
- Skala 1080x1920 mengikuti `src/theme.ts`.

## Bentuk dan nuansa
- Grid 8 px. Radius: jendela 20, kartu 16, tombol pill penuh, input 12. Satu tingkat bayangan `0 24px 60px rgba(11,22,48,0.12)`.
- Ikon garis 2 px yang konsisten. Mockup jendela gaya macOS dengan kursor nyata untuk video 16:9.
- Gerak: spring dengan overshoot sangat kecil, transisi 300 sampai 500 ms, tanpa cut kasar, teks masuk blur ke tajam naik 8 px. Satu fokus gerak per momen.

## Maskot
- **Gigi**, gear yang sama dengan gear di logo. Spesifikasi lengkap: skill `a2-maskot-gigi`, komponen `src/components/Gigi.tsx`. Hanya brand A2 yang memakainya.

## Logo
- `public/logo/a2-automation.png` (dan lapisan di `public/logo/parts/`). Tidak digambar ulang, tidak diputar, diregangkan, atau diwarnai ulang. Area kosong minimal setinggi gear.

## Suara dan ajakan
- Suara Jefri (ElevenLabs, "Suara Penjelasan Lembut"), Eleven v3 dengan tag audio. "A2" diucapkan "A Dua". Tempo ±2,3 kata per detik.
- Ajakan: "Konsultasi gratis di a2automate.com".

## Larangan khas brand
- Tanpa gradasi ungu atau pink, tanpa latar gelap neon, tanpa glassmorphism, tanpa emoji, tanpa ilustrasi 3D generik atau orang stok atau robot, tanpa logo atau nama aplikasi pihak lain, tanpa angka klaim yang tidak bisa dipertanggungjawabkan (angka ilustrasi berlabel "contoh"), caption besar maksimal 6 kata.

## Sumber dan contoh
- `DESIGN.md`, video: Jam 9 Malam, A2Umum, Satu Pesanan. Token di kode: `src/theme.ts`.

## Belum ditentukan
- Tidak ada yang tercatat.
