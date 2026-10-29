"""Efek suara TipsUmroh (public/sfx/umroh/), disintesis dari noise dan parsial bel.

angin (pembuka), dentum (bukaan lingkaran), wush / wush-besar (kartu dan B-roll masuk),
sset (coretan, zoom), ting dan ting-1..5 (centang, naik nada).

Pakai: python3 scripts/make-sfx-umroh.py
"""
import wave
from pathlib import Path

import numpy as np

SR = 44100
OUT = Path(__file__).resolve().parent.parent / 'public' / 'sfx' / 'umroh'
OUT.mkdir(parents=True, exist_ok=True)
rng = np.random.default_rng(29)


def save(name, x, peak_db=-3.0):
    x = np.asarray(x, dtype=np.float64)
    x = x / (np.max(np.abs(x)) + 1e-9) * 10 ** (peak_db / 20)
    fade = int(0.004 * SR)
    x[:fade] *= np.linspace(0, 1, fade)
    x[-fade:] *= np.linspace(1, 0, fade)
    with wave.open(str(OUT / f'{name}.wav'), 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())


def band(x, lo, hi, soft=0.15):
    """Saring pita lo–hi Hz lewat FFT dengan tepi lembut."""
    n = len(x)
    f = np.fft.rfftfreq(n, 1 / SR)
    X = np.fft.rfft(x)
    g = np.ones_like(f)
    if lo > 0:
        g *= 1 / (1 + np.exp(np.clip(-(f - lo) / (lo * soft), -60, 60)))
    if hi < SR / 2:
        g *= 1 / (1 + np.exp(np.clip((f - hi) / (hi * soft), -60, 60)))
    return np.fft.irfft(X * g, n)


def env(n, attack, release, shape=2.0):
    t = np.arange(n) / SR
    a = np.clip(t / max(attack, 1e-4), 0, 1)
    r = np.clip((t[-1] - t) / max(release, 1e-4), 0, 1)
    return (a * r) ** shape


def noise(sec):
    return rng.standard_normal(int(sec * SR))


def sweep_band(x, lo0, lo1, hi0, hi1, steps=24):
    """Pita yang bergeser pelan (angin, desir): saring per potongan lalu sambung silang."""
    n = len(x)
    seg = n // steps
    y = np.zeros(n)
    win = np.hanning(seg * 2)
    for i in range(steps):
        a = max(0, i * seg - seg // 2)
        b = min(n, a + seg * 2)
        k = i / (steps - 1)
        part = band(x[a:b], lo0 + (lo1 - lo0) * k, hi0 + (hi1 - hi0) * k)
        y[a:b] += part * win[: b - a]
    return y


# --- angin gurun yang naik pelan (pembuka, di atas aerial Masjidil Haram)
n = noise(1.6)
x = sweep_band(n, 180, 420, 900, 2600) * env(len(n), 0.9, 0.5, 1.5)
x += 0.35 * band(noise(1.6), 60, 180) * env(len(n), 1.1, 0.4, 2)
save('angin', x, -6)

# --- dentum felt hangat saat pembicara terbuka (sinus turun + transien kain)
t = np.arange(int(0.7 * SR)) / SR
f0 = 72 * np.exp(-t * 2.2) + 46
body = np.sin(2 * np.pi * np.cumsum(f0) / SR) * np.exp(-t * 7)
felt = band(noise(0.7), 200, 1200) * np.exp(-t * 60) * 0.5
save('dentum', body + felt, -4)

# --- wush: udara lewat cepat; pita naik lalu turun (kartu dan B-roll masuk)
def wush(sec, peak_at, lo, hi, seed):
    r = np.random.default_rng(seed)
    n = int(sec * SR)
    x = r.standard_normal(n)
    steps = 32
    seg = n // steps
    y = np.zeros(n)
    win = np.hanning(seg * 2)
    for i in range(steps):
        a = max(0, i * seg - seg // 2)
        b = min(n, a + seg * 2)
        k = i / (steps - 1)
        c = lo + (hi - lo) * np.exp(-((k - peak_at) / 0.28) ** 2)  # pusat pita mengikuti kurva lonceng
        y[a:b] += band(x[a:b], c * 0.55, c * 1.6) * win[: b - a]
    t = np.arange(n) / SR
    e = np.where(t < peak_at * sec, (t / (peak_at * sec)) ** 2.2, np.exp(-(t - peak_at * sec) / (sec * 0.16)))
    return y * e
save('wush', wush(0.55, 0.55, 350, 2600, 7), -4)
save('wush-besar', wush(0.8, 0.5, 220, 3200, 8) + 0.4 * band(noise(0.8), 50, 160) * env(int(0.8 * SR), 0.35, 0.4, 2), -3)

# --- ssset: desis tipis yang cepat naik (coretan, zoom)
n = int(0.22 * SR)
x = np.zeros(n)
steps = 12
seg = n // steps
win = np.hanning(seg * 2)
src_n = noise(0.22)
for i in range(steps):
    a = max(0, i * seg - seg // 2)
    b = min(n, a + seg * 2)
    c = 3000 + 6000 * i / (steps - 1)
    x[a:b] += band(src_n[a:b], c * 0.6, min(c * 1.5, 16000)) * win[: b - a]
save('sset', x * env(n, 0.03, 0.12, 1.3), -5)


# --- ting: bel kecil yang jernih (parsial tak harmonis seperti bel logam), cepat padam
def ting(f0, sec=0.9):
    t = np.arange(int(sec * SR)) / SR
    parts = [(1.0, 1.0, 3.2), (2.76, 0.42, 6.0), (5.4, 0.18, 10.0), (8.93, 0.07, 16.0)]
    y = sum(a * np.sin(2 * np.pi * f0 * m * t) * np.exp(-t * d) for m, a, d in parts)
    y += 0.25 * band(noise(sec), 4000, 12000) * np.exp(-t * 90)  # ketukan awal
    return y * np.clip(t / 0.002, 0, 1)


save('ting', ting(1760), -4)
# rangkaian centang naik nada (pentatonik mayor dari E6)
for i, semi in enumerate([0, 2, 4, 7, 9]):
    save(f'ting-{i + 1}', ting(1318.5 * 2 ** (semi / 12), 0.6), -5)

print('ok', sorted(f.name for f in OUT.iterdir()))
