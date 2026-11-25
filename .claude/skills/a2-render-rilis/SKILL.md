---
name: a2-render-rilis
description: Alur render dan rilis video A2/H2C: stills → review → pemeriksa tabrakan → render penuh → cek regresi video lama → commit/push → kirim file → README. Pakai di akhir setiap video atau revisi.
---

# Render dan rilis

## Lingkungan cloud
- Unduhan Chromium Remotion diblokir: `export REMOTION_BROWSER=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell`.
- Render: `npx remotion render <Id> out/<nama>.mp4 --concurrency=4`. Frame kunci: `node scripts/render-stills.mjs <Id> [awalan...]` (`SAFE_GUIDE=1` menandai area aman 9:16). Daftar frame tiap komposisi ada di `scripts/render-stills.mjs` (`SETS`).
- Komposisi baru: daftarkan di `src/Root.tsx` (dibungkus `withProbe`), tambah `SETS` di `render-stills.mjs`, skrip `stills:*`/`render:*` di `package.json`, dan bagian di `README.md`.

- `node_modules` bawaan container bisa rusak sebagian (mis. `remotion/dist/esm` hilang, `tsx` tidak ada, tsc mengeluh `useVideoConfig`): perbaiki dengan `rm -rf node_modules && npm ci`.

- 25 Nov 2026: bila bundle gagal (`Cannot read properties of undefined`) karena berkas video LAIN rusak di cabang (mis. JSON timing diganti format baru oleh room lain), jangan mengubah video itu: tambal lokal sementara (mis. arahkan impor ke salinan JSON lama dari `git show`), render, lalu kembalikan dengan `git checkout HEAD -- <berkas>` sebelum commit, dan laporkan ke Bos dan serah-terima.

## Urutan wajib
1. `npx tsc --noEmit -p .` bersih.
2. **Frame kunci** tiap adegan, termasuk frame di tengah transisi; lihat di ukuran penuh dan lewati checklist `a2-motion-video`.
3. **Pemeriksa tabrakan**: `node scripts/check-collisions.mjs <Id> --every=15` harus bersih (hook penjaga juga menjalankannya sebelum render).
4. Render penuh. Lalu cek:
   - `ffprobe` durasi dan resolusi; `ffmpeg -af volumedetect` (tidak ada klip, SFX di bawah narator).
   - **Kedipan/frame meloncat** (lihat pelajaran glitch di vault: bandingkan beda antarframe; tidak boleh ada frame yang beda jauh dari kedua tetangganya).
5. **Regresi**: setelah mengubah komponen bersama, `node scripts/cek-regresi.mjs` (semua video) atau dengan Id video lama; harus "Identik".
   - 22 Nov 2026: 7 frame `tiga-salah-kaprah-otomatisasi/01b..03d` (kartu dibuka/dicap) juga beda di container baru, padahal render kode `HEAD` (git worktree + symlink node_modules) identik dengan render sesi: derau lingkungan, kembalikan dengan `git checkout HEAD -- out/stills/...`.
   - Di container cloud (19 Nov 2026) tiga frame selalu sedikit beda walau kodenya asli: `a2-umum-9x16/06-laporan-f600`, `jam-9-malam-9x16/07-laporan-f712`, `tips-umroh/00b-pembuka-buka-f033` (beda <60/255 pada beberapa puluh piksel). Buktikan dengan merender ulang frame itu memakai kode `HEAD`; bila tetap beda, itu derau lingkungan: kembalikan dengan `git checkout HEAD -- out/stills/...` dan jangan di-commit.
6. Commit pesan jelas + atribusi sesi; `git push -u origin <cabang kerja>`. Cabang kerja repo: `claude/inspiring-keller-3vz48r`. **Tidak ada PR** kecuali diminta; jangan menyentuh `main`.
7. Kirim MP4 ke Bos (`SendUserFile`) dan jelaskan perubahan singkat, risiko, dan yang belum dicek.
8. Perbarui README dan catat pekerjaan besar ke vault Obsidian-SB (aturan di `CLAUDE.md`).

## Jangan
- Menghapus file kerja dengan pola `rm` lebar: `00-gigi-ekspresi.png` pernah ikut terhapus (hook kini memblokirnya). Hapus per nama, dan ingat bahwa tidak semua file di `out/stills/` dihasilkan `render-stills.mjs`.
- Menimpa VO/aset video lain; memakai `backdrop-filter`; membiarkan frame video lama berubah tanpa sengaja.
- Mengirim hasil tanpa melihat frame yang dirender.
