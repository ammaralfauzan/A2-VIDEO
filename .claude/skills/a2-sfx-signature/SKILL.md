---
name: a2-sfx-signature
description: Efek suara untuk video A2/H2C yang tidak pasaran: sintesis lokal, motif nada, peta bunyi ke kejadian visual, volume di bawah narator. Pakai saat menambah atau mengubah efek suara video.
---

# Efek suara khas

Bos meminta efek yang "bukan pasaran" dan tidak terdengar seperti AI. Semua bunyi dibuat sendiri (tanpa sampel pihak lain) dan menempel pada kejadian visual.

## Dua palet
1. **A2 (video Gigi)** `scripts/make-sfx.py` → `public/sfx/*.wav`: marimba kaca lembut; 7 langkah = tangga nada D mayor naik, saat A2 menyambungkan semuanya motif "terselesaikan" jadi akor D mayor 9. Bunyi: `step-1..7`, `chip`, `badge`, `kaget`, `whoosh`, `cascade`, `tick`, `pile`, `connect`, `card-1..4`, `human-1..3`, `tanya`, `ting`, `outro`. Jadwal: `src/scenes/satu-pesanan/Sfx.tsx`.
2. **H2C (TipsUmroh)** `scripts/make-sfx-umroh.py` → `public/sfx/umroh/*.wav`: `wush`/`wush-besar` (kartu dan B-roll masuk), `sset` (coretan, zoom), `ting` dan `ting-1..5` (bel kecil tak harmonis, centang naik nada pentatonik), `angin`, `dentum` (pembuka). Jadwal: konstanta `SFX` di `src/TipsUmroh.tsx`.

## Aturan
- **Volume:** `SFX_GAIN` ≈ 0.22–0.25 kali per-bunyi `v` → sekitar 10–12 dB di bawah suara narator. Jangan pernah menutupi suara.
- Satu bunyi per kejadian visual; bunyi jatuh pada frame kejadian (±2 frame). Jangan menambah bunyi pada gerak kecil.
- Bunyi pendek (<1 dtk), tanpa ekor panjang; normalkan puncak (-3 s/d -6 dB) dan beri fade 4 ms agar tidak klik.
- Hindari bunyi pasaran: "ding" sintetis lurus, whoosh stok, "pop" generik. Bila memakai ElevenLabs Sound Effects (`eleven_text_to_sound_v2`): satu bunyi per prompt, sebutkan teksturnya ("kertas tebal bergeser di meja kayu"), hindari kata visual/sinematik; server gratis sering penuh dan bunyi yang gagal tidak memotong kredit.
- Tambah bunyi baru di skrip sintesis (bukan file biner tak berdokumen) agar bisa dibuat ulang: `python3 -I scripts/make-sfx-umroh.py`.
- Cek: `ffmpeg -i out/<video>.mp4 -af volumedetect -f null -` dan dengar bagian paling ramai.
