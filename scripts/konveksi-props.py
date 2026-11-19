"""Original printable props and a screen texture for the Blender garment workshop."""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
R=Path(__file__).resolve().parents[1]
O=R/'public/konveksi';O.mkdir(parents=True,exist_ok=True)
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
def font(s):return ImageFont.truetype(FONT,s)
im=Image.new('RGB',(1200,1600),'#f9f8f4');d=ImageDraw.Draw(im)
d.text((100,110),'LEMBAR PESANAN',font=font(57),fill='#13254a')
d.text((100,200),'K-021   /   CONTOH DATA',font=font(29),fill='#687383')
d.line((100,280,1100,280),fill='#a8b2be',width=3)
for i,(a,b) in enumerate([('Produk','Kaus navy'),('Jumlah','50 potong'),('Desain','Versi 02 - disetujui'),('Tenggat','Jumat, 27 November'),('Pembayaran','Uang muka tercatat')]):
 y=335+i*130;d.text((100,y),a,font=font(27),fill='#687383');d.text((100,y+45),b,font=font(35),fill='#13254a');d.line((100,y+105,1100,y+105),fill='#d8dce3',width=2)
d.text((100,1050),'RINCIAN UKURAN',font=font(31),fill='#13254a')
for i,(a,b) in enumerate([('S','10'),('M','20'),('L','15'),('XL','5')]):
 x=100+i*255;d.rectangle((x,1120,x+225,1270),outline='#b9c3ce',width=2);d.text((x+22,1140),a,font=font(28),fill='#687383');d.text((x+22,1190),b,font=font(37),fill='#13254a')
d.text((100,1410),'Periksa desain sebelum produksi.',font=font(27),fill='#687383')
im.save(O/'order-paper.png')
im=Image.new('RGB',(1600,1000),'#f4f6fa');d=ImageDraw.Draw(im)
d.rounded_rectangle((30,30,1570,970),radius=30,fill='white')
d.text((90,90),'PROGRES PRODUKSI',font=font(45),fill='#13254a')
d.text((90,165),'Contoh alur konveksi',font=font(26),fill='#6b7385')
for i,lab in enumerate(['Desain','Potong','Jahit','Periksa','Kirim']):
 x=85+i*290;d.rounded_rectangle((x,270,x+265,890),radius=20,fill='#f4f6fa');d.text((x+22,300),lab,font=font(29),fill='#13254a')
 if i==2:
  d.rounded_rectangle((x+14,375,x+251,630),radius=14,fill='white',outline='#00a6f4',width=3)
  d.text((x+35,405),'K-021',font=font(38),fill='#13254a');d.text((x+35,470),'50 kaus',font=font(29),fill='#6b7385');d.text((x+35,545),'Jumat',font=font(27),fill='#0a3fd6')
im.save(O/'screen-board.png')
print('Created two original scene textures.')
