"""Efek suara foley untuk TipsUmroh (public/sfx/umroh/).

Tiga bunyi rekaman-gaya dari ElevenLabs Sound Effects (kartu bergeser, goresan spidol, buku dibuka)
dirapikan dari scratchpad; sisanya disintesis dari noise berbentuk (tanpa nada "ding" sintetis):
angin pembuka, dentum felt saat transisi, centang pensil, halaman kalender, gemuruh pesawat jauh,
sobekan struk, klik tombol kayu, desir foto keluar dari amplop.

Pakai: python3 scripts/make-sfx-umroh.py [folder-mp3-elevenlabs]
"""
import subprocess
import sys
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

# --- centang pensil: goresan turun pendek lalu naik lebih panjang (grafit di kertas)
def pencil(seed):
    r = np.random.default_rng(seed)
    def stroke(sec, lo, hi):
        s = r.standard_normal(int(sec * SR))
        s = band(s, lo, hi)
        grain = 1 + 0.6 * band(r.standard_normal(len(s)), 20, 90) / 3
        return s * grain * env(len(s), 0.006, sec * 0.6, 1.2)
    gap = np.zeros(int(0.025 * SR))
    return np.concatenate([stroke(0.045, 2200, 7000), gap, stroke(0.11, 1800, 6500), np.zeros(int(0.05 * SR))])
for i in range(4):
    save(f'centang-{i + 1}', pencil(100 + i), -6)

# --- halaman kalender dibalik: desir kertas bergetar + tepukan kecil di akhir
n = noise(0.42)
flutter = 1 + 0.8 * np.sin(2 * np.pi * np.cumsum(np.linspace(38, 12, len(n))) / SR)
x = band(n, 900, 7000) * flutter * env(len(n), 0.05, 0.12, 1.4)
slap = band(noise(0.06), 300, 3000) * env(int(0.06 * SR), 0.002, 0.05, 2)
x[-len(slap):] += slap * 1.8
save('halaman', x, -5)

# --- pesawat melintas jauh: gemuruh rendah dengan pita yang turun (doppler halus)
n = noise(1.8)
x = sweep_band(n, 90, 60, 700, 380) * env(len(n), 0.6, 0.9, 1.6)
save('pesawat', x, -8)

# --- sobekan struk: kresek granular pendek
n = int(0.32 * SR)
clicks = np.zeros(n)
pos = np.sort(rng.integers(0, n, 140))
clicks[pos] = rng.uniform(0.3, 1.0, len(pos))
x = band(clicks + 0.25 * rng.standard_normal(n), 1500, 9000) * env(n, 0.01, 0.12, 1.2)
save('sobek', x, -5)

# --- klik tombol kayu: transien + dua resonansi pendek (bukan nada lonceng)
t = np.arange(int(0.12 * SR)) / SR
x = band(noise(0.12), 800, 6000) * np.exp(-t * 180)
x += 0.5 * np.sin(2 * np.pi * 1350 * t) * np.exp(-t * 90) + 0.25 * np.sin(2 * np.pi * 2900 * t) * np.exp(-t * 140)
save('klik', x, -5)

# --- desir foto keluar dari amplop
n = noise(0.5)
x = sweep_band(n, 1500, 700, 8000, 4000, 12) * env(len(n), 0.12, 0.25, 1.5)
save('foto', x, -6)

# --- rapikan bunyi ElevenLabs: potong ke bagian inti, normalkan
src = Path(sys.argv[1]) if len(sys.argv) > 1 else None
TRIM = {'card': ('kartu', 0.70, 1.75), 'marker': ('coret', 0.0, 0.98), 'book': ('buku', 0.0, 0.46)}
if src:
    for stem, (name, a, b) in TRIM.items():
        p = src / f'{stem}.mp3'
        raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(a), '-to', str(b), '-i', str(p), '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
        save(name, np.frombuffer(raw, np.float32).copy(), -3)
print('ok', sorted(f.name for f in OUT.iterdir()))
