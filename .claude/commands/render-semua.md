---
description: Render video (dan versi 16:9/9:16 bila ada) lengkap dengan pemeriksaan, commit, push, dan kirim ke Bos
argument-hint: <IdKomposisi ... (satu atau beberapa)>
---

Render dan rilis: $ARGUMENTS

Ikuti skill `a2-render-rilis`:
1. Panggil agen `pengulas-visual`; perbaiki temuan wajib.
2. Panggil agen `perender` untuk $ARGUMENTS.
3. Panggil agen `pengulas-audio` pada MP4 hasil.
4. Bila ada komponen bersama berubah: `node scripts/cek-regresi.mjs`.
5. Perbarui README, commit dan push ke cabang kerja (bukan `main`, tanpa PR kecuali diminta), kirim MP4 ke Bos, dan catat pekerjaan besar ke vault Obsidian-SB sesuai `CLAUDE.md`.
6. Laporan ke Bos singkat: file, durasi, apa yang berubah, risiko, keputusan yang menunggu.
