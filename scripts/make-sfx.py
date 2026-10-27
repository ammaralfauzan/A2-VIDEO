"""Sintesis efek suara khas A2 untuk video "Satu Pesanan" (tanpa sampel pihak lain).

Motif: 7 langkah = tangga nada D mayor naik (marimba kaca); saat A2 menyambungkan semuanya,
motif itu "terselesaikan" menjadi akor D mayor 9. Semua bunyi lembut, pendek, minimalis.
Jalankan: python3 scripts/make-sfx.py  -> public/sfx/*.wav (48 kHz, mono, 16-bit)
"""
import math
import os
import random
import wave

import numpy as np

SR = 48000
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'sfx')
rng = np.random.default_rng(7)


def t_axis(dur):
    return np.arange(int(SR * dur)) / SR


def env(t, attack=0.004, tau=0.2):
    a = np.clip(t / attack, 0, 1)
    return a * np.exp(-np.maximum(t - attack, 0) / tau)


def lowpass(x, cutoff):
    # satu kutub; cutoff boleh array (sapuan)
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
    fade = min(len(x), int(0.01 * SR))
    x[-fade:] *= np.linspace(1, 0, fade)
    data = (x * 32767).astype('<i2').tobytes()
    with wave.open(os.path.join(OUT, name), 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(data)


def glass_marimba(f, dur=0.6, bright=1.0):
    t = t_axis(dur)
    x = np.sin(2 * np.pi * f * t) * env(t, 0.003, 0.22)
    x += 0.35 * bright * np.sin(2 * np.pi * 4.0 * f * t) * env(t, 0.002, 0.05)
    x += 0.18 * bright * np.sin(2 * np.pi * 2.76 * f * t) * env(t, 0.002, 0.09)
    click = rng.standard_normal(len(t)) * env(t, 0.0005, 0.003) * 0.25
    return x + lowpass(click, 4000)


def bell(f, dur=1.0):
    t = t_axis(dur)
    x = np.sin(2 * np.pi * f * t) * env(t, 0.002, 0.35)
    x += 0.4 * np.sin(2 * np.pi * 2.41 * f * t) * env(t, 0.002, 0.16)
    x += 0.2 * np.sin(2 * np.pi * 5.43 * f * t) * env(t, 0.001, 0.05)
    return x


def pad(freqs, dur, attack=0.25, release=0.9):
    t = t_axis(dur)
    x = np.zeros_like(t)
    for f in freqs:
        for det in (-0.6, 0.6):  # chorus tipis
            x += np.sin(2 * np.pi * (f + det) * t + rng.uniform(0, 6.28))
    shape = np.clip(t / attack, 0, 1) * np.clip((dur - t) / release, 0, 1)
    return x * shape / len(freqs)


NOTE = {'D4': 293.66, 'F#4': 369.99, 'A4': 440.0, 'C#5': 554.37, 'D5': 587.33, 'E5': 659.26, 'F#5': 739.99,
        'A5': 880.0, 'B5': 987.77, 'D6': 1174.66, 'E6': 1318.51, 'F#6': 1479.98}
MOTIF = ['D5', 'E5', 'F#5', 'A5', 'B5', 'D6', 'E6']


def main():
    os.makedirs(OUT, exist_ok=True)

    # 7 langkah: marimba kaca naik
    for i, n in enumerate(MOTIF):
        save(f'step-{i + 1}.wav', glass_marimba(NOTE[n]), -7)

    # chip pesanan: letupan gelembung + nada A5
    t = t_axis(0.45)
    sweep = 380 + 620 * np.clip(t / 0.06, 0, 1)
    pop = np.sin(2 * np.pi * np.cumsum(sweep) / SR) * env(t, 0.002, 0.05)
    save('chip.wav', pop + 0.6 * glass_marimba(NOTE['A5'], 0.45, 0.6), -7)

    # badge "7 langkah": dua ketukan kecil
    tick = glass_marimba(1600, 0.12, 0.3) * 0.8
    x = np.zeros(int(SR * 0.3))
    x[: len(tick)] += tick
    x[int(0.07 * SR): int(0.07 * SR) + len(tick)] += tick * 0.7
    save('badge.wav', x, -10)

    # ketukan kayu (hari)
    t = t_axis(0.12)
    wood = np.sin(2 * np.pi * 1250 * t) * env(t, 0.001, 0.022) + 0.3 * lowpass(rng.standard_normal(len(t)), 3000) * env(t, 0.0005, 0.006)
    save('tick.wav', wood, -10)

    # kaget: "boing" lembut naik
    t = t_axis(0.22)
    f = 300 + 520 * (1 - np.exp(-t / 0.05))
    boing = np.sin(2 * np.pi * np.cumsum(f) / SR + 2.0 * np.sin(2 * np.pi * 18 * t)) * env(t, 0.003, 0.07)
    save('kaget.wav', boing, -9)

    # rentetan 50 ubin: ketukan mikro mempercepat, nada naik
    dur = 1.35
    x = np.zeros(int(SR * dur))
    for k in range(50):
        u = k / 49
        pos = (u ** 0.75) * (dur - 0.12)
        g = glass_marimba(900 + 700 * u + rng.uniform(-30, 30), 0.1, 0.4) * (0.35 + 0.3 * u)
        i = int(pos * SR)
        x[i: i + len(g)] += g[: len(x) - i]
    save('cascade.wav', x, -9)

    # desir udara: noise tersaring dengan sapuan
    t = t_axis(0.6)
    n = rng.standard_normal(len(t))
    cut = 600 + 3400 * np.sin(np.pi * t / 0.6) ** 2
    w = lowpass(n, cut) - lowpass(n, 250)
    save('whoosh.wav', w * np.sin(np.pi * t / 0.6) ** 1.5, -12)

    # menumpuk: dentum lembut + simpul berjatuhan
    t = t_axis(0.7)
    f = 95 * np.exp(-t / 0.3) + 55
    thud = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(t, 0.004, 0.14)
    x = thud + 0.25 * lowpass(rng.standard_normal(len(t)), 900) * env(t, 0.002, 0.05)
    for k, d in enumerate([0.08, 0.15, 0.21, 0.3, 0.36, 0.44, 0.5]):
        g = glass_marimba(NOTE[MOTIF[6 - k]] * 0.5, 0.15, 0.3) * 0.22
        i = int(d * SR)
        x[i: i + len(g)] += g[: len(x) - i]
    save('pile.wav', x, -8)

    # tersambung: akor D mayor 9 mekar + motif turun-naik cepat yang "terselesaikan"
    dur = 2.6
    x = pad([NOTE['D4'], NOTE['F#4'], NOTE['A4'], NOTE['C#5'], NOTE['E5']], dur, 0.35, 1.2) * 0.9
    for k, nme in enumerate(['A5', 'D6', 'F#6', 'D6']):
        g = glass_marimba(NOTE[nme], 0.7, 0.7) * 0.45
        i = int((0.15 + k * 0.11) * SR)
        x[i: i + len(g)] += g[: len(x) - i]
    save('connect.wav', x, -7)

    # kartu hasil: denting kaca naik
    for k, nme in enumerate(['A5', 'B5', 'D6', 'E6']):
        save(f'card-{k + 1}.wav', bell(NOTE[nme], 0.9), -9)

    # sisi manusia: marimba hangat rendah
    for k, nme in enumerate(['D4', 'F#4', 'A4']):
        save(f'human-{k + 1}.wav', glass_marimba(NOTE[nme], 0.8, 0.5), -8)

    # bertanya: dua nada naik "hm?"
    t = t_axis(0.5)
    f = np.where(t < 0.18, 440, 440 + 147 * np.clip((t - 0.18) / 0.1, 0, 1))
    hm = np.sin(2 * np.pi * np.cumsum(f * (1 + 0.01 * np.sin(2 * np.pi * 6 * t))) / SR) * (np.clip(t / 0.02, 0, 1) * np.exp(-t / 0.25))
    save('tanya.wav', hm, -9)

    # penutup: kilau + akor D mayor yang mengembang lalu reda
    dur = 3.2
    x = pad([NOTE['D4'], NOTE['A4'], NOTE['D5'], NOTE['F#5']], dur, 0.6, 1.6) * 0.8
    for k in range(9):
        g = bell(NOTE[random.Random(k).choice(['D6', 'E6', 'F#6', 'A5'])], 0.6) * 0.15
        i = int((0.1 + k * 0.09) * SR)
        x[i: i + len(g)] += g[: len(x) - i]
    save('outro.wav', x, -8)

    # sapaan akhir: ting kecil
    save('ting.wav', bell(NOTE['F#6'], 0.6), -12)


if __name__ == '__main__':
    main()
