# Timing kata SEMENTARA "checkout-hajar-aswad": paragraf naskah dipetakan ke potongan ucapan
# (ffmpeg silencedetect -30 dB / 0,12 dtk), kata dibagi menurut suku kata di dalam waktu ucap (jeda dilewati).
# Dipakai hanya bila transkrip ElevenLabs Scribe belum ada.
import json, re, subprocess, sys
mp3 = 'public/audio/vo-checkout-hajar-aswad.mp3'
out = subprocess.run(['ffmpeg','-hide_banner','-i',mp3,'-af','silencedetect=noise=-30dB:d=0.12','-f','null','-'],capture_output=True,text=True).stderr
st=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',out)]; en=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',out)]
dur=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',mp3],capture_output=True,text=True).stdout)
ch=[];t=0.0
for a,b in zip(st,en):
    if a-t>0.05: ch.append([t,a])
    t=b
if dur-t>0.05: ch.append([t,dur])
PAR=[(0.0,3.0,"Mau ikut promo Hajar Aswad?"),(3.4,6.5,"Harga spesial, lima langkah saja."),(6.9,10.7,"Satu: masuk, buka Paket."),
(11.2,21.1,"Dua: pilih Hajar Aswad Standar atau Premium, lalu pilih tingkat DP:"),(21.4,22.0,"Silver,"),(22.3,22.7,"Gold,"),(23.0,23.6,"Platinum,"),(23.7,24.5,"Diamond."),
(25.0,31.0,"Tiga: isi jumlah jamaah, pilih Bayar DP, cek WhatsApp."),(31.4,38.7,"Empat: Checkout dan bayar. Sisanya bisa dicicil, mulai sepuluh ribu."),
(39.1,45.7,"Lima: setelah DP dicek, kode kupon unik muncul di Pesanan. Simpan ya."),(46.1,60.1,"Pemenang tahap satu diumumkan satu Januari dua ribu dua puluh tujuh. Bebas pilih paket promo atau reguler sembilan hari bintang tiga, berangkat dua ribu dua puluh tujuh."),
(60.4,63.2,"Ikuti semua tingkatnya."),(63.4,dur,"Kunjungi umroh titik H dua C titik or titik id.")]
def syl(w):
    w=w.lower(); w={'dp':'depe','dp:':'depe','dp.':'depe','whatsapp.':'watsap','checkout':'cekaut','h':'ha','c':'se','id.':'ide'}.get(w,w)
    return max(1,len(re.findall(r'[aiueo]+',w)))+(0.6 if re.search(r'[,:.?]$',w) else 0)
kata=[]
for a,b,txt in PAR:
    segs=[[max(a,x),min(b,y)] for x,y in ch if y>a and x<b]
    sp=sum(y-x for x,y in segs); ws=txt.split(); wt=[syl(w) for w in ws]; tot=sum(wt)
    def tm(u):  # u = detik ucap -> detik audio
        for x,y in segs:
            if u<=y-x: return x+u
            u-=y-x
        return segs[-1][1]
    acc=0
    for w,k in zip(ws,wt):
        s=tm(sp*acc/tot); acc+=k; e=tm(sp*acc/tot)
        kata.append({'w':w,'s':round(s,2),'e':round(e,2)})
json.dump({'audio':mp3,'durasi':round(dur,2),'suara':'Jefri - Suara Penjelasan Lembut (ElevenLabs v4, s50 sim75), MP3 dari Bos 28 Nov 2026, tidak dipercepat',
 'metode':'SEMENTARA: ffmpeg silencedetect -30 dB/0,12 dtk, paragraf naskah dipetakan ke jeda panjang, kata dibagi menurut suku kata. Belum didengar manusia.','kata':kata},
 open('src/data/vo-timing-checkout-hajar-aswad.json','w'),ensure_ascii=False,indent=1)
print(len(kata),'kata')
