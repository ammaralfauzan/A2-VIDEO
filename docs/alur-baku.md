# Alur baku produksi video

Satu video = lima room pendek (IDE → KONSEP → BANGUN → REVISI bila perlu → RILIS), lalu siklus mulai lagi dari IDE. Semua ide dan konsep dicek ke `docs/daftar-konten.md` agar tidak kembar. Room tidak saling ingat; yang menyambung hanya **berkas di repo**. Konteks pendek = murah. Satu model per room, jangan diganti di tengah.

| # | Room | Model | Isi | Keluaran (di repo) | Setelah itu |
|---|---|---|---|---|---|
| 0 | **IDE** | Sonnet | Usul 5 ide baru yang beda dari semua konten lama | ide terpilih di `antrean-ide.md` | Bos memilih satu |
| 1 | **KONSEP** | Sonnet | Brief → konsep + naskah + prompt suara | `naskah-<slug>.md`, `serah-terima/<slug>.md` | **Bos setujui**, lalu generate MP3 di ElevenLabs |
| 2 | **BANGUN** | Opus | Naskah + MP3 → komposisi, review, render, kirim MP4 | kode, `out/<slug>-9x16.mp4`, serah-terima diperbarui | Bos menonton |
| 3 | **REVISI** (bila perlu) | Sonnet (kecil) / Opus (tata letak, animasi) | Satu daftar revisi dari Bos, selesaikan, render ulang | MP4 baru, **skill diperbarui bila ada pelajaran** | ulangi sampai Bos puas |
| 4 | **RILIS** | Sonnet | Caption, jam posting, catat ke vault | caption di serah-terima, catatan Obsidian | Bos posting |

## Aturan tampil dan serah-terima (diperbarui 2026-11-19)
- **Tampil di chat, bukan tautan.** Naskah, prompt suara, blok isian, caption, prompt sampul: semuanya tertulis di chat; yang perlu disalin ada dalam kode blok siap salin. Berkas repo hanya arsip.
- **Tampilkan dulu, baru minta setuju.** Room KONSEP menampilkan naskah dan prompt suara lebih dulu, baru bertanya persetujuan.
- **Isian untuk langkah berikutnya** keluar di akhir tiap room sebagai blok siap tempel: IDE menulis `ISIAN UNTUK KONSEP`, KONSEP menulis `ISIAN UNTUK BANGUN`, BANGUN menulis `ISIAN UNTUK RILIS`. Bos menempelkannya di halaman Putaran Video A2 dan kolom lain terisi sendiri.
- **Durasi di isian adalah target wajib** dan menimpa durasi lain.

## Aturan baku
- **Tampilkan dulu, baru minta setuju (aturan Bos, 19 Nov 2026).** Di room KONSEP, sebelum meminta persetujuan, dialog/naskah suara lengkap dan prompt suara ElevenLabs (siap salin) wajib sudah tampil di chat. Setiap prompt untuk langkah berikutnya (suara, sampul, caption) selalu ditampilkan di chat dalam kode blok siap salin, bukan hanya disebut lokasi filenya.
- **Prompt inti** (`docs/prompt-inti.md`) disalin apa adanya ke setiap room. Hanya blok TAHAP dan isian `<slug>`/brief yang berbeda.
- **Serah-terima** (`serah-terima/<slug>.md`, dari `_template.md`) adalah satu-satunya jembatan antar room: status, keputusan Bos, file penting, revisi, yang belum dicek. Setiap room membacanya di awal dan memperbaruinya di akhir.
- **Revisi dikumpulkan satu daftar**, bukan dikirim satu-satu: satu room revisi, satu kali render.
- **Pelajaran masuk skill.** Revisi yang mungkin terulang ditulis ke `.claude/skills/*` (bukan hanya diperbaiki di video itu).
- **Obsidian** hanya untuk riwayat dan keputusan (dicatat di room RILIS), bukan pengatur gaya.
- Room ditutup setelah keluarannya di-push. Jangan dilanjutkan untuk video lain.
