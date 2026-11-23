---
name: a2-voiceover-sinkron
description: Membuat voiceover ElevenLabs untuk video A2/H2C dan menyinkronkannya: prompt bertag, ejaan "A Dua", estimasi biaya, timing per kalimat/kata, adegan mengikuti suara. Pakai saat membuat naskah baru, mengganti suara, atau menyelaraskan video dengan audio.
---

# Voiceover dan sinkronisasi

## Menulis naskah untuk suara
- Target ±2,3 kata per detik. Tulis seperti orang bicara: kalimat pendek, satu ide per kalimat.
- **"A2" ditulis "A Dua"** di teks yang dikirim ke TTS ("A2 Automation" → "A Dua Automation"). Di layar tetap "A2".
- Angka dieja bila perlu ("lima puluh", "tiga ratus lima puluh").
- Suara: **cek dulu suara MP3 Bos sebelum membuat kalimat pengganti** (video "Alasan Saya Bikin A2" memakai Bowo `LxiqOV1uxBCgYTeitAHf` di konektor ElevenLabs utama Bos, padahal naskah menulis Jefri; Bos merevisi). Kalimat pengganti disambung ke MP3 Bos: potong di jeda, fade 20–30 ms, samakan volume (volumedetect), jangan dipercepat; unduhan butuh host `elevenlabsusercontent.com`. Pilihan lain: Jefri (`1ijzBXcD3AIVH8RGMcQd`, "Suara Penjelasan Lembut", dipakai Satu Pesanan) atau Alif (`R2tdno8o9nwUiDvfnMIJ`). Model `eleven_v4` dipakai untuk Satu Pesanan. Sejak 2026-11-19 prompt suara memakai Eleven v3 dengan tag audio dalam kurung siku (mis. `[curious]`, `[laugh]`) agar nada lebih hidup; tag tidak diucapkan. Tag nada (dalam kurung siku) hanya dipakai bila Bos meminta, dan contohnya diambil dari prompt yang sudah berhasil di akun Bos; jangan mengarang nama tag. Cek `creative_get_model_guide` untuk model yang dipakai.
- **Prompt suara selalu ditampilkan di chat** (baris pengaturan + satu kode blok siap salin), tidak hanya disimpan di file; di KONSEP ditampilkan sebelum minta persetujuan (aturan Bos 19 Nov 2026).
- Naskah disimpan di `naskah-<video>.md` (tabel: nomor, voiceover, visual), angka contoh ditandai "contoh".

## Menghasilkan suara
1. Dari sesi cloud, ElevenLabs akun gratis Bos terblokir ("aktivitas tidak biasa", proxy/VPN). Jalur: Bos generate sendiri di akun lain/berbayar lalu kirim MP3, atau berlangganan. Berikan prompt siap tempel.
2. Bila konektor berfungsi: `creative_generate_speech` butuh `voice_id` dari `creative_list_voices`. Jangan ulang generate untuk coba lagi (setiap panggilan memakan kredit); tanya Bos sebelum generate panjang.
3. Simpan MP3 di `public/audio/vo-<video>.mp3`, **jangan menimpa VO video lain**.

## Timing
- **Tanpa alat transkripsi** (konektor tak punya alat unggah, huggingface diblokir): pastikan kata yang ragu dengan pencocokan MFCC-DTW (`pip install librosa`): bandingkan potongan kata dengan rekaman pembanding kata yang sama (mis. take lama) dan kata lain sebagai kontrol; jarak terkecil = kata yang diucapkan. Dipakai di revisi 4 "Alasan Saya Bikin A2".
- Bila Bos mengirim MP3 penuh baru, ganti seluruh VO (jangan disambung), ukur ulang timing; adegan ikut bergeser karena semua fase dihitung dari `sf/ef/wf`.
- MP3 baru untuk naskah versi baru tanpa transkripsi (23 Nov 2026, `daftar-dan-masuk-h2c` versi F; konektor ElevenLabs minta izin ulang): cocokkan potongan jeda ke naskah, lalu **bandingkan durasi baris yang tidak berubah dengan timing versi lama** (selisih <0,2 dtk = pemetaan benar). Bila jumlah potongan berubah, semua indeks `sg/wf` di `layout.ts`, Penutup, frames-script dan BROLL ikut digeser: buat peta indeks lama→baru dulu.
- Ada transkrip: `creative_transcribe_audio` (model `eleven_scribe_v1`) memberi timing per kata (dipakai TipsUmroh: `src/data/tips-umroh-words.json`). Biayanya kecil (±344 kredit untuk 25 dtk).
- Tanpa transkrip: `ffmpeg -i vo.mp3 -af silencedetect=noise=-35dB:d=0.25` untuk jeda antarkalimat, dan `-30dB:d=0.12` untuk jeda koma; petakan manual ke urutan kalimat naskah. Simpan di `src/data/vo-timing-<video>.json` (mulai, selesai, teks, `potongan`). Cek pemetaan dengan mendengar atau membandingkan jumlah kalimat.
- **Adegan mengikuti suara.** Jangan mempercepat suara agar muat; perpanjang adegan. Grafis muncul sekitar 4 frame **sebelum** kata yang menjadi pemicunya.
- Video bicara asli: jangan potong atau percepat; grafis menempel pada kata (lihat `src/tips-umroh/timeline.ts`).

## Konversi video masukan
Video WhatsApp (HEVC) → H.264 sebelum dipakai Remotion: `ffmpeg -i in.mp4 -c:v libx264 -crf 19 -pix_fmt yuv420p -c:a aac public/video/<nama>.mp4`.
