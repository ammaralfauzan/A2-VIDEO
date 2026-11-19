"""Efek suara tambahan untuk "Tiga Salah Kaprah" (sintesis sendiri, tanpa sampel pihak lain).

cap.wav     : cap karet menghentak kertas tebal (dentum rendah pendek + tepukan kertas)
balik-0.wav : kartu dibalik (kibasan kertas kartu, tanpa nada)
balik-1..3  : kartu dibalik ke FAKTA = kibasan + nada marimba kaca naik (D5, F#5, A5; palet A2)
Jalankan: python3 -I scripts/make-sfx-tiga.py  -> public/sfx/tiga/*.wav (48 kHz, mono, 16-bit)
Berkas sfx lama tidak disentuh.
"""
import math
import os
import wave

import numpy as np

SR = 48000
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'sfx', 'tiga')
rng = np.random.default_rng(11)


def t_axis(dur):
    return np.arange(int(SR * dur)) / SR


def env(t, attack=0.004, tau=0.2):
    a = np.clip(t / attack, 0, 1)
    return a * np.exp(-np.maximum(t - attack, 0) / tau)


def lowpass(x, cutoff):
    cutoff = np.broadcast_to(cutoff, x.shape)
    y = np.zeros_like(x)
    acc = 0.0
    for i in range(len(x)):
        a = 1 - math.exp(-2 * math.pi * cutoff[i] / SR)
        acc += a * (x[i] - acc)
        y[i] = acc
    return y


def save(name, x, peak_db=-6.0):
    x = x - np.mean(x)
    x = x / (np.max(np.abs(x)) + 1e-9) * (10 ** (peak_db / 20))
    fi = int(0.004 * SR)
    x[:fi] *= np.linspace(0, 1, fi)
    fo = min(len(x), int(0.01 * SR))
    x[-fo:] *= np.linspace(1, 0, fo)
    with wave.open(os.path.join(OUT, name), 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((x * 32767).astype('<i2').tobytes())


def glass_marimba(f, dur=0.6, bright=1.0):
    t = t_axis(dur)
    x = np.sin(2 * np.pi * f * t) * env(t, 0.003, 0.22)
    x += 0.35 * bright * np.sin(2 * np.pi * 4.0 * f * t) * env(t, 0.002, 0.05)
    x += 0.18 * bright * np.sin(2 * np.pi * 2.76 * f * t) * env(t, 0.002, 0.09)
    return x


def flick(dur=0.22):
    # kibasan kartu: derau tersaring yang naik lalu turun cepat, dua lapis (ujung kartu + udara)
    t = t_axis(dur)
    n = rng.standard_normal(len(t))
    cut = 900 + 3800 * np.sin(np.pi * np.clip(t / 0.12, 0, 1)) ** 2
    body = (lowpass(n, cut) - lowpass(n, 400)) * np.sin(np.pi * np.clip(t / dur, 0, 1)) ** 1.2
    snap = lowpass(rng.standard_normal(len(t)), 2500) * env(t - 0.09, 0.001, 0.012) * (t > 0.09)
    return body + 0.6 * snap


def main():
    os.makedirs(OUT, exist_ok=True)
    # cap: dentum rendah pendek + tepukan kertas
    t = t_axis(0.35)
    f = 70 * np.exp(-t / 0.08) + 60
    thud = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(t, 0.002, 0.07)
    slap = (lowpass(rng.standard_normal(len(t)), 3200) - lowpass(rng.standard_normal(len(t)), 300)) * env(t, 0.0008, 0.018)
    save('cap.wav', thud + 0.7 * slap, -6)

    save('balik-0.wav', flick(), -10)
    for k, fr in enumerate([587.33, 739.99, 880.0]):
        x = np.zeros(int(SR * 0.7))
        fl = flick()
        x[: len(fl)] += fl * 0.8
        g = glass_marimba(fr, 0.55, 0.7) * 0.9
        i = int(0.1 * SR)
        x[i: i + len(g)] += g
        save(f'balik-{k + 1}.wav', x, -8)


if __name__ == '__main__':
    main()
