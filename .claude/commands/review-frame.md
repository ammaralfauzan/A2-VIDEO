---
description: Review frame kunci sebuah komposisi dengan pengulas visual (dan audio bila MP4 sudah ada)
argument-hint: <IdKomposisi, mis. TipsUmroh>
---

Review komposisi: $ARGUMENTS

1. `export REMOTION_BROWSER=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell`
2. Panggil agen `pengulas-visual` untuk $ARGUMENTS (pemeriksa tabrakan, frame kunci, checklist skill).
3. Bila `out/` sudah punya MP4 komposisi ini, panggil juga `pengulas-audio`.
4. Gabungkan hasilnya jadi satu daftar: **wajib diperbaiki** dan **catatan**. Perbaiki yang wajib, ulangi review pada frame yang berubah, baru laporkan ke Bos secara singkat (hasil, risiko, yang belum dicek).
