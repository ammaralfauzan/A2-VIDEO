---
name: a2-jadwal-posting
description: Menyiapkan jadwal posting video A2/H2C ke media sosial lewat Metricool dan membaca analitik untuk menentukan ide berikutnya. Selalu minta persetujuan Bos sebelum menjadwalkan atau memposting. Pakai setelah video selesai direview.
---

# Jadwal posting dan analitik (Metricool)

**Posting ke media sosial adalah tindakan keluar: tidak pernah otomatis.** Selalu tunjukkan ke Bos (akun, waktu, teks, file) dan tunggu persetujuan eksplisit. Metricool menyediakan jalur "kirim untuk ditinjau" (`createScheduledPostForReview`/`sendScheduledPostForReview`): pakai itu sebagai default, bukan jadwal langsung.

## Prasyarat
- Konektor Metricool harus sudah diotorisasi Bos di pengaturan konektor claude.ai. Bila ditolak ("perlu sign-in"), berhenti dan beri tahu Bos; jangan meminta kode/token lewat chat.
- Video final sudah lolos `/review-frame` dan `/render-semua`, dan Bos sudah melihatnya.

## Alur
1. `getBrandSettings` untuk melihat akun/brand yang terhubung. Jangan menebak: pilih brand sesuai video (A2 Automation vs H2C), dan tanyakan Bos bila ambigu.
2. `getBestTimeToPostByNetwork` untuk saran jam per jaringan; sajikan sebagai usulan.
3. Siapkan: teks caption (singkat, bahasa Indonesia, ajakan sama dengan video: a2automate.com atau umroh.h2c.or.id), hashtag secukupnya, jaringan (Instagram Reels, TikTok, YouTube Shorts), file MP4 9:16.
4. Tunjukkan ke Bos. Setelah setuju: buat sebagai **draf untuk ditinjau**; jadwal langsung hanya bila Bos menyebutnya.
5. Konten H2C (umroh/wakaf): jangan memuat harga, izin, atau jaminan yang tidak diberikan Bos.

## Analitik → ide berikutnya
`getAnalyticsAvailableMetrics` lalu `getAnalyticsDataByMetrics` (mis. views, retensi, interaksi per post). Ringkas dalam beberapa baris: video mana yang unggul, dugaan sebabnya (hook, durasi, gaya), dan usulan ide untuk `antrean-ide.md`. Jangan menyimpulkan dari data yang sedikit; sebut ukuran sampelnya.

## Batas
- Jangan menyimpan token atau kredensial di repo. Jangan menyebut data pribadi pelanggan atau jamaah di caption.
- Catat keputusan Bos (jam terbaik, jaringan yang dipakai) ke vault Obsidian-SB sesuai `CLAUDE.md`.
