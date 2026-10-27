# DESIGN.md — A2 Automation

Kontrak visual untuk semua video, UI mockup, dan materi A2 Automation. Setiap frame wajib mengikuti file ini.

## Identitas
- Nama brand: **A2 Automation** (badan hukum: PT A2 Automate Solutions)
- Tagline: **AUTOMATE WORKFLOW. EMPOWER INDUSTRIES.**
- Domain: a2automate.com
- Nada: tenang, meyakinkan, membantu. Bukan heboh, bukan menakut-nakuti.

## Logo
- Mark: huruf **A** navy dengan gear kecil di kaki kiri, angka **2** bergradasi biru.
- Wordmark: "A2" biru + "AUTOMATION" navy, huruf lebar geometris.
- Tagline di bawah, huruf kapital tipis berjarak lebar, diapit dua garis tipis.
- Area kosong minimal di sekitar logo = tinggi gear.
- Jangan: memutar, meregangkan, mengganti warna, memberi bayangan tebal, atau menaruh di latar ramai.

## Warna
| Token | Nilai | Pemakaian |
| --- | --- | --- |
| `--navy` | #13254A | Teks utama, komponen gelap, huruf A |
| `--navy-ink` | #0B1630 | Teks paling gelap, bayangan |
| `--blue-1` | #00A6F4 | Ujung terang gradasi |
| `--blue-2` | #0A3FD6 | Ujung gelap gradasi |
| `--gradient` | linear 135°, #00A6F4 → #0A3FD6 | Aksen: progress, slider aktif, tab, garis grafik, centang |
| `--canvas` | #F4F6FA | Latar kanvas |
| `--surface` | #FFFFFF | Jendela, kartu |
| `--line` | #E3E7EF | Garis pemisah, border |
| `--muted` | #6B7385 | Teks sekunder |
| `--success` | #1FAF6B | Status berhasil (hemat, kecil saja) |
| `--alert` | #E5484D | Badge notifikasi di adegan "masalah" saja |

Aturan: gradasi hanya untuk aksen, maksimal 1 elemen bergradasi besar per frame. Latar selalu terang.

## Tipografi
- UI dan caption: **Geist** (400, 500, 600).
- Wordmark dan judul penutup: huruf lebar geometris (Michroma, atau Geist 600 dengan letter-spacing 0.12em).
- Skala (video 1920×1080): caption hook 96px, caption 56px, judul UI 40px, teks UI 28px, label 22px.
- Maksimal dua keluarga huruf dalam satu video.

## Grid dan bentuk
- Grid 8px. Padding jendela 48px, kartu 32px.
- Radius: jendela 20px, kartu 16px, tombol pill penuh, input 12px.
- Bayangan: `0 24px 60px rgba(11,22,48,0.12)`. Satu tingkat bayangan saja.
- Jendela bergaya macOS: tiga titik kiri atas, judul tengah, tanpa toolbar palsu yang ramai.

## Gerak
- Semua transisi pakai spring, overshoot sangat kecil (damping ≥ 0.8).
- Durasi transisi 300–500 ms. Tidak ada cut kasar antar adegan; adegan berubah lewat morf atau zoom.
- Kursor nyata: bergerak dengan easing, mengecil sedikit saat klik, ada jeda singkat sebelum klik.
- Teks masuk: blur ke tajam + naik 8px, 250 ms.
- Satu fokus gerak per momen. Jangan dua animasi besar bersamaan.

## Larangan (anti "AI slop")
- Tanpa gradasi ungu/pink, tanpa latar gelap neon.
- Tanpa glassmorphism, tanpa blur latar berlebihan.
- Tanpa ikon emoji; pakai ikon garis 2px yang konsisten.
- Tanpa ilustrasi 3D generik, orang stok, atau robot.
- Tanpa lorem ipsum; semua teks berbahasa Indonesia dan masuk akal.
- Tanpa logo atau nama aplikasi pihak lain (Excel, WhatsApp, dsb). Pakai versi generik.
- Tanpa angka klaim yang tidak bisa dipertanggungjawabkan di materi resmi.
- Tanpa lebih dari 6 kata per caption besar.

## Suara (voiceover)
- Bahasa Indonesia, suara dewasa, hangat, tempo sedang (±2,3 kata per detik).
- Musik latar tipis, volume musik −18 dB di bawah suara.
- Caption mengikuti suara, bukan sebaliknya.
