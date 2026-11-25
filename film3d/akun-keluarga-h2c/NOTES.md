# NOTES · akun-keluarga-h2c (3D)

## v1 · 25 Nov 2026 (room BANGUN 3D, cloud tanpa GPU)
- Dasar: kit `a2-film-3d`, diubah ke 1080x1920 (`lib.js`, `render.mjs`, `index.html`). Di Linux root: `--no-sandbox`, `--use-angle=swiftshader --enable-unsafe-swiftshader` (tanpa itu WebGL tidak jalan dan `__ready` tidak pernah tercapai).
- Suara V3 69,07 dtk; ucapan 0,14-68,80. Film 70,0 dtk. Waktu frasa di `assets/vo-timing.json` (salinan `src/data/vo-timing-akun-keluarga-h2c.json`).
- Set: dinding zamrud 0x0f3a28, meja walnut 0x3a2517, matahari 0xffd0a0 3,3 lewat kisi geometris (jitter 0,05 m; 0,16 menghapus bayangan kisi), lampu kuningan 2,0, monitor tegak 0,34x0,60 m di y 0,44.
- Angka langkah: glyph Anton (dari `recipes/departure-board/src/fonts/Anton-Regular.ttf` lewat opentype.js -> `assets/digits.json`), extrude + bevel, skala 0,21, di alas walnut x -0,155. Logam penuh tanpa env map tampak gelap: metalness 0,35 + emissive.
- Kamera: lensa 40°, KEYS di `film.js` (waktu, pose). Dekat layar `SC(d)`: d 1,24/1,16; ajakan 1,22 -> 1,0. Pose 0,62 terlalu dekat (logo terpotong).
- Subtitle: y 1430 saat kamera dekat layar, y 236 saat kamera jauh (kartu di bawah tidak tertutup); disembunyikan sejak 64,9 dtk (alamat sudah di tombol).
- Debu: 160 titik, hanya dekat dinding (z -0,46..-0,16). Debu dekat kamera jadi cincin bokeh besar.
- Kecepatan di cloud (SwiftShader, 4 inti): n=1 ~2 dtk/frame, n=4 ~5,6 dtk/frame (3 proses paralel ~4 dtk/frame efektif), n=16 still ~20 dtk.
- Suara: `sound/cues.json` (75 lapis, efek dari `public/sfx/` + `sound/key.wav` sintetis), master -14,0 LUFS, true peak -1,3 dBTP.
