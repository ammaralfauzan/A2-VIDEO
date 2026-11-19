# Alur baku produksi video

Satu video = empat room pendek. Room tidak saling ingat; yang menyambung hanya **berkas di repo**. Konteks pendek = murah. Satu model per room, jangan diganti di tengah.

| # | Room | Model | Isi | Keluaran (di repo) | Setelah itu |
|---|---|---|---|---|---|
| 1 | **KONSEP** | Sonnet | Brief → konsep + naskah + prompt suara | `naskah-<slug>.md`, `serah-terima/<slug>.md` | **Bos setujui**, lalu generate MP3 di ElevenLabs |
| 2 | **BANGUN** | Opus | Naskah + MP3 → komposisi, review, render, kirim MP4 | kode, `out/<slug>-9x16.mp4`, serah-terima diperbarui | Bos menonton |
| 3 | **REVISI** (bila perlu) | Sonnet (kecil) / Opus (tata letak, animasi) | Satu daftar revisi dari Bos, selesaikan, render ulang | MP4 baru, **skill diperbarui bila ada pelajaran** | ulangi sampai Bos puas |
| 4 | **RILIS** | Sonnet | Caption, jam posting, catat ke vault | caption di serah-terima, catatan Obsidian | Bos posting |

## Aturan baku
- **Prompt inti** (`docs/prompt-inti.md`) disalin apa adanya ke setiap room. Hanya blok TAHAP dan isian `<slug>`/brief yang berbeda.
- **Serah-terima** (`serah-terima/<slug>.md`, dari `_template.md`) adalah satu-satunya jembatan antar room: status, keputusan Bos, file penting, revisi, yang belum dicek. Setiap room membacanya di awal dan memperbaruinya di akhir.
- **Revisi dikumpulkan satu daftar**, bukan dikirim satu-satu: satu room revisi, satu kali render.
- **Pelajaran masuk skill.** Revisi yang mungkin terulang ditulis ke `.claude/skills/*` (bukan hanya diperbaiki di video itu).
- **Obsidian** hanya untuk riwayat dan keputusan (dicatat di room RILIS), bukan pengatur gaya.
- Room ditutup setelah keluarannya di-push. Jangan dilanjutkan untuk video lain.
