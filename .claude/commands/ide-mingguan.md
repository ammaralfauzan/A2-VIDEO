---
description: Ambil satu ide siap dari antrean-ide.md, buat konsep dan naskah, lalu berhenti minta persetujuan Bos
argument-hint: [nomor ide, kosong = yang siap paling atas]
---

Produksi ide mingguan. Argumen (opsional): $ARGUMENTS

1. Baca `antrean-ide.md`. Pilih ide bernomor $ARGUMENTS, atau bila kosong ide berstatus `siap` paling atas. Bila tidak ada yang `siap`, lapor ke Bos dan berhenti.
2. Panggil agen `penulis-naskah` dengan ide itu (brand, format, catatan). Naskah disimpan `naskah-<slug>.md`.
3. Di `antrean-ide.md` pindahkan ide itu ke "Sedang berjalan" dengan keterangan "menunggu persetujuan Bos".
4. Commit dan push ke cabang kerja repo ini (bukan `main`, tanpa PR). **Jangan render, jangan membuat VO, jangan memposting.**
5. Laporan ke Bos, singkat: ide yang dipilih, ringkasan konsep (2–3 kalimat), durasi, siapa pengisi suara, dan keputusan yang ia perlu jawab. Bila ada data pendukung dari Metricool (skill `a2-jadwal-posting`) dan konektornya aktif, sebut singkat; bila tidak, lewati.
