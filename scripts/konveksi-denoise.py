"""Denoise original Blender frames with Intel OIDN, then interpolate slow camera moves."""
import subprocess,sys,tempfile,os,time
from pathlib import Path
import numpy as np
from PIL import Image
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'public/konveksi'
OIDN=Path(os.environ.get('A2_OIDN','/workspace/a2-video-tools/oidn-2.5.1.x86_64.linux/bin/oidnDenoise'))
def write_pfm(path,a):
 with open(path,'wb') as f:
  f.write(f'PF\n{a.shape[1]} {a.shape[0]}\n-1.0\n'.encode());np.flipud(a).astype('<f4').tofile(f)
def read_pfm(path):
 with open(path,'rb') as f:
  assert f.readline().strip()==b'PF'
  w,h=map(int,f.readline().split());scale=float(f.readline());a=np.frombuffer(f.read(),'<f4' if scale<0 else '>f4').reshape(h,w,3)
 return np.flipud(a)
def denoise(src,dst):
 if dst.exists():return
 a=np.array(Image.open(src).convert('RGB'),np.float32)/255
 with tempfile.TemporaryDirectory(prefix='a2-oidn-') as temp:
  inp=Path(temp)/'in.pfm';op=Path(temp)/'out.pfm';write_pfm(inp,a)
  subprocess.run([str(OIDN),'--ldr',str(inp),'--srgb','--threads','3','--affinity','0','-o',str(op)],check=True,stdout=subprocess.DEVNULL)
  result=np.clip(read_pfm(op),0,1)
  dst.parent.mkdir(parents=True,exist_ok=True);Image.fromarray((result*255+.5).astype('uint8')).save(dst)
 print('DENOISED',dst.name,flush=True)
if '--previews' in sys.argv:
 for p in OUT.glob('preview-*.png'):denoise(p,p.with_name('clean-'+p.name))
else:
 for name,secs in [('needle',6),('orders',7),('workshop',7),('laptop',7),('finished',7)]:
  only=next((a.split('=',1)[1] for a in sys.argv if a.startswith('--only=')),None)
  if only and name!=only:continue
  if '--watch' in sys.argv:
   while True:
    try:
     pending=sorted((OUT/'frames'/name).glob('*.png'))
     if len(pending)==6:
      for p in pending:
       with Image.open(p) as im:im.verify()
      break
    except (OSError,SyntaxError):pass
    time.sleep(3)
  frames=sorted((OUT/'frames'/name).glob('*.png'))
  if len(frames)!=6:raise RuntimeError(f'{name}: expected six completed native camera frames, got {len(frames)}')
  for p in frames:denoise(p,OUT/'clean-frames'/name/p.name)
  clips=OUT/'clips';clips.mkdir(exist_ok=True)
  target=clips/f'{name}.rendering.mp4'
  # Very slow native 3D camera moves: dense optical interpolation gives a 30fps clip.
  subprocess.run(['ffmpeg','-y','-v','error','-filter_threads','2','-framerate',str((len(frames)-1)/secs),'-i',str(OUT/'clean-frames'/name/'%04d.png'),'-vf',f'minterpolate=fps=30:mi_mode=mci:mc_mode=obmc:me_mode=bidir:me=epzs:mb_size=16:search_param=16:vsbmc=0,fps=30,tpad=stop_mode=clone:stop=300,trim=duration={secs},setpts=PTS-STARTPTS,format=yuv420p','-c:v','libx264','-threads','2','-preset','fast','-crf','19','-movflags','+faststart',str(target)],check=True)
  target.replace(clips/f'{name}.mp4')
  print('CLIP_READY',name,flush=True)
