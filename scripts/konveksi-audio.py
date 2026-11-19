"""Generate Indonesian narration, word timings, and a quiet workshop sound bed."""
import asyncio, json, math, os, subprocess, wave
from pathlib import Path
import numpy as np
import edge_tts
import edge_tts.communicate as edge_communicate

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'konveksi'
OUT.mkdir(parents=True, exist_ok=True)
edge_communicate._SSL_CTX.load_default_certs()
LINES = [
    'Pesanan sudah sampai mana?',
    'Di konveksi, pertanyaan ini bisa membuat admin mencari chat dan menanyakan ulang ke produksi.',
    'Ukuran, revisi desain, tenggat, dan catatan uang muka perlu terhubung.',
    'Kalau saya merapikan alurnya, saya mulai dari satu nomor pesanan.',
    'A Dua Automation dapat membantu menyusun detail order dan papan progres produksi.',
    'Dari desain disetujui, potong, jahit, pemeriksaan, sampai siap kirim.',
    'Petugas memperbarui tahap yang selesai. Admin kemudian melihat status terakhir, dan pemilik memeriksa tenggat.',
    'Di konveksimu, informasi apa yang paling sering ditanyakan ulang?',
    'A Dua Automation. Kita mulai dari alur kerjamu.',
]

def duration(path):
    return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',str(path)]))

async def main():
    pieces, timings, offset = [], [], 0.2
    rate = 48000
    pieces.append(np.zeros(round(offset*rate), np.float32))
    for i, line in enumerate(LINES):
        path = OUT / f'voice-{i+1:02}.mp3'
        metadata = OUT / f'voice-{i+1:02}.json'
        if not path.exists() or not metadata.exists():
            comm = edge_tts.Communicate(line, 'id-ID-ArdiNeural', rate='-3%', boundary='WordBoundary', proxy=os.environ.get('HTTPS_PROXY') or os.environ.get('HTTP_PROXY'))
            words=[]
            with path.open('wb') as f:
                async for part in comm.stream():
                    if part['type']=='audio': f.write(part['data'])
                    elif part['type']=='WordBoundary':
                        words.append({'text':part['text'],'start':part['offset']/1e7,'end':(part['offset']+part['duration'])/1e7})
            metadata.write_text(json.dumps(words,ensure_ascii=False,indent=2))
        words=json.loads(metadata.read_text())
        raw=subprocess.check_output(['ffmpeg','-v','error','-i',str(path),'-ar',str(rate),'-ac','1','-f','f32le','-'])
        samples=np.frombuffer(raw,dtype=np.float32).copy()
        dur=len(samples)/rate
        timings.append({'id':i+1,'text':line,'start':offset,'end':offset+dur,'words':[{**w,'start':w['start']+offset,'end':w['end']+offset} for w in words]})
        pieces.extend([samples,np.zeros(round(.16*rate),np.float32)])
        offset+=dur+.16
        print(f'VOICE {i+1}: {dur:.2f}s',flush=True)
    pieces.append(np.zeros(round(1.15*rate),np.float32))
    voice=np.concatenate(pieces)
    voice*=.88/max(np.max(np.abs(voice)),.001)
    def write(path,data):
        with wave.open(str(path),'wb') as w:
            w.setnchannels(1);w.setsampwidth(2);w.setframerate(rate)
            w.writeframes((np.clip(data,-1,1)*32767).astype('<i2').tobytes())
    write(OUT/'narration.wav',voice)
    total=len(voice)/rate
    t=np.arange(len(voice))/rate
    rng=np.random.default_rng(218)
    # Low workshop motor/room bed, with a short soft needle mechanism at the opening.
    noise=rng.normal(size=len(t))
    from scipy.signal import butter,sosfilt
    air=sosfilt(butter(2,[110,1800],btype='bandpass',fs=rate,output='sos'),noise)
    bed=.0035*air + .0015*np.sin(2*np.pi*98*t)+.001*np.sin(2*np.pi*196*t)
    pulse=np.exp(-((t*9)%1)*26)*(t<5.5)
    mechanism=pulse*(.015*np.sin(2*np.pi*800*t)+.008*noise)
    fx=bed+mechanism
    # Original restrained paper, confirmation, and closing sounds; no music.
    for at,kind in [(timings[2]['start'],'paper'),(timings[3]['start'],'confirm'),(timings[5]['start'],'confirm'),(timings[8]['start'],'outro')]:
        pos=round(at*rate);length=min(round(.55*rate),len(t)-pos)
        u=np.arange(length)/rate
        if kind=='paper': sig=.012*rng.normal(size=length)*np.sin(np.pi*np.minimum(u/.45,1))**2*np.exp(-u*8)
        else:
            sig=.026*(np.sin(2*np.pi*587.33*u)*np.exp(-u*14)+.45*np.sin(2*np.pi*880*u)*np.exp(-u*18))
            sig*=np.minimum(u/.008,1)
        fx[pos:pos+length]+=sig
    fade=np.minimum(t/.5,1)*np.minimum((total-t)/.9,1)
    write(OUT/'workshop-sfx.wav',fx*fade*4.0)
    result={'fps':30,'duration':total,'frames':math.ceil(total*30),'voice':'id-ID-ArdiNeural','music':False,'segments':timings}
    (ROOT/'src/data/konveksi-timing.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
    print(json.dumps({'duration':total,'frames':result['frames'],'segments':len(timings)}))

if __name__=='__main__': asyncio.run(main())
