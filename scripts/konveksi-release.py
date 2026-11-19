"""Validate the five 3D clips, review layout, render the Reel, and master its audio."""
import json,subprocess,os
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
os.chdir(ROOT)
def run(args):subprocess.run([str(x) for x in args],check=True)
def probe(path):
 return json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(path)]))

print('PHASE 1: Validate and finalize exact clip durations',flush=True)
for name,secs in [('needle',6),('orders',7),('workshop',7),('laptop',7),('finished',7)]:
 path=ROOT/'public/konveksi/clips'/f'{name}.mp4'
 p=probe(path)
 assert p['streams'][0]['width']==720
 if abs(float(p['format']['duration'])-secs)>.04:
  temp=path.with_name(f'{name}.duration.mp4')
  run(['ffmpeg','-y','-v','error','-i',path,'-vf',f'fps=30,tpad=stop_mode=clone:stop=300,trim=duration={secs},setpts=PTS-STARTPTS','-c:v','libx264','-threads','2','-preset','fast','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',temp])
  temp.replace(path)
 p=probe(path);assert abs(float(p['format']['duration'])-secs)<.04
 run(['ffmpeg','-v','error','-i',path,'-f','null','-'])
 print('VALID_CLIP',name,p['format']['duration'],flush=True)

print('PHASE 2: Check updated brand subtitle frames and render key stills',flush=True)
os.environ['REMOTION_BROWSER']='/usr/bin/chromium'
run(['node','scripts/check-collisions.mjs','Konveksi3D','--frames=630,660,1395,1430,1490'])
run(['node','scripts/render-stills.mjs','Konveksi3D'])

print('PHASE 3: Render complete 1080x1920 Reel',flush=True)
master=ROOT/'out/konveksi-3d-master.mp4';final=ROOT/'out/konveksi-3d-9x16.mp4'
run(['./node_modules/.bin/remotion','render','Konveksi3D',master,'--browser-executable=/usr/bin/chromium','--concurrency=2','--crf=19'])

print('PHASE 4: Master audio and validate deliverable',flush=True)
run(['ffmpeg','-y','-v','error','-i',master,'-t','51.1','-c:v','copy','-af','loudnorm=I=-16:TP=-1.5:LRA=8','-ar','48000','-ac','2','-c:a','aac','-b:a','192k','-movflags','+faststart',final])
p=probe(final);v=next(s for s in p['streams'] if s['codec_type']=='video');a=next(s for s in p['streams'] if s['codec_type']=='audio')
assert (v['width'],v['height'],v['codec_name'])==(1080,1920,'h264')
assert v['r_frame_rate']=='30/1'
assert a['codec_name']=='aac' and int(a['sample_rate'])==48000
assert abs(float(p['format']['duration'])-51.1)<.1
run(['ffmpeg','-v','error','-i',final,'-f','null','-'])
run(['ffmpeg','-y','-v','error','-ss','1.5','-i',final,'-frames:v','1',ROOT/'out/konveksi-cover.png'])
(ROOT/'out/konveksi-validation.json').write_text(json.dumps(p,indent=2))
print('DELIVERABLE_READY',final,'duration',p['format']['duration'],'bytes',p['format']['size'],flush=True)
