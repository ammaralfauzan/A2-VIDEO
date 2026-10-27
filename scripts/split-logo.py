"""Pisahkan file logo asli menjadi lapisan transparan untuk animasi penutup (tanpa menggambar ulang).

Piksel diambil dari public/logo/a2-automation.png; latar putih dijadikan transparan
("color to alpha"), lalu dibagi per bagian: huruf A, angka 2, gear, wordmark, tagline.
Jalankan: python3 scripts/split-logo.py  -> public/logo/parts/*.png (ukuran kanvas sama 1254x1254)
"""
import os

import numpy as np
from PIL import Image

HERE = os.path.dirname(__file__)
SRC = os.path.join(HERE, '..', 'public', 'logo', 'a2-automation.png')
OUT = os.path.join(HERE, '..', 'public', 'logo', 'parts')

GEAR = (520, 641, 76)  # pusat dan jari-jari gear di file asli (piksel)
MARK_BOTTOM = 760  # batas bawah huruf A dan angka 2
WORD = (770, 860)  # baris wordmark "A2 AUTOMATION"
TAG = (870, 930)  # baris tagline
TAG_TEXT_X = (270, 990)  # hanya teks tagline; dua garis strip di kiri-kanan tidak diambil (permintaan Bos)


def main():
    os.makedirs(OUT, exist_ok=True)
    rgb = np.array(Image.open(SRC).convert('RGB')).astype(float)
    # color to alpha terhadap putih
    alpha = np.clip((255 - rgb.min(axis=2)) / 255, 0, 1)
    alpha[alpha < 0.03] = 0
    safe = np.maximum(alpha, 1e-6)[..., None]
    color = np.clip((rgb - 255 * (1 - safe)) / safe, 0, 255)

    h, w = alpha.shape
    yy, xx = np.mgrid[0:h, 0:w]
    gear = (xx - GEAR[0]) ** 2 + (yy - GEAR[1]) ** 2 <= GEAR[2] ** 2
    mark = yy < MARK_BOTTOM
    blue = (color[..., 2] - color[..., 0] > 110) & (color[..., 2] > 150)

    masks = {
        'gear': gear & mark,
        'two': mark & ~gear & blue,
        'a': mark & ~gear & ~blue,
        'word': (yy >= WORD[0]) & (yy < WORD[1]),
        'tag': (yy >= TAG[0]) & (yy < TAG[1]) & (xx >= TAG_TEXT_X[0]) & (xx <= TAG_TEXT_X[1]),
    }
    for name, m in masks.items():
        a = (alpha * m * 255).astype(np.uint8)
        img = np.dstack([color.astype(np.uint8), a])
        Image.fromarray(img, 'RGBA').save(os.path.join(OUT, f'{name}.png'), optimize=True)
        print(name, int((a > 0).sum()), 'piksel')


if __name__ == '__main__':
    main()
