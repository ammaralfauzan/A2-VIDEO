import React from 'react';
import {AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import timing from './data/konveksi-timing.json';

const C={navy:'#13254A',ink:'#0B1630',blue:'#0A3FD6',cyan:'#00A6F4',muted:'#6B7385',line:'#E3E7EF',canvas:'#F4F6FA',green:'#1FAF6B'};
export const KONVEKSI_FRAMES=timing.frames;
const F=(s:number)=>Math.round(s*30);
const at=(id:number)=>F(timing.segments[id-1].start);
const cuts=[0,at(3),at(4),at(5),at(6),at(8),at(9),timing.frames];
const shots=['needle','orders','workshop','laptop','workshop','finished','finished'];
const shotSecs=[6,7,7,7,7,7,7];
const ease=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:(v)=>1-Math.pow(1-v,3)});
const card:React.CSSProperties={background:'white',border:`1.5px solid ${C.line}`,borderRadius:22,boxSizing:'border-box',boxShadow:'0 20px 56px rgba(11,22,48,.11)'};

const Backdrop:React.FC<{name:string;frames:number;seconds:number;preview?:boolean}>=({name,frames,seconds,preview})=>{
 const f=useCurrentFrame();
 return <AbsoluteFill>
  {preview?<Img src={staticFile(`konveksi/clean-preview-${name}.png`)} style={{width:'100%',height:'100%',objectFit:'cover'}}/>:<OffthreadVideo src={staticFile(`konveksi/clips/${name}.mp4`)} muted playbackRate={seconds/(frames/30)} style={{width:'100%',height:'100%',objectFit:'cover'}}/>}
  <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(244,246,250,.96) 0%,rgba(244,246,250,.91) 25%,rgba(244,246,250,.06) 43%,rgba(244,246,250,0) 58%,rgba(244,246,250,.25) 68%,rgba(244,246,250,.98) 84%,#F4F6FA 100%)'}}/>
  <AbsoluteFill style={{background:'#F4F6FA',opacity:1-ease(f,0,10)}}/>
 </AbsoluteFill>;
};

const Header:React.FC=()=> <div style={{position:'absolute',left:180,top:238,width:720,display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:22,fontWeight:500,letterSpacing:1.5,color:C.navy}}>
 <span>KONVEKSI / 01</span><span style={{fontSize:19,color:C.muted,letterSpacing:.5}}>Simulasi alur</span>
</div>;

const Heading:React.FC<{children:React.ReactNode;small?:boolean}>=({children,small})=>{
 const f=useCurrentFrame();const p=ease(f,0,12);
 return <div style={{position:'absolute',left:180,top:330,width:720,fontSize:small?58:70,fontWeight:600,lineHeight:1.08,whiteSpace:'pre-line',letterSpacing:-2.3,color:C.navy,opacity:p,transform:`translateY(${(1-p)*14}px)`}}>{children}</div>;
};

const Cursor:React.FC<{x:number;y:number;click?:number}>=({x,y,click=0})=><svg width="46" height="52" viewBox="0 0 46 52" style={{position:'absolute',left:x,top:y,filter:'drop-shadow(0 3px 3px #0003)',transform:`scale(${1-click*.12})`,transformOrigin:'6px 3px'}}><path d="M5 3L6 40L16 31L23 48L31 44L23 28L38 27Z" fill="white" stroke={C.ink} strokeWidth="2.5"/></svg>;

const Order:React.FC<{compact?:boolean}>=({compact})=>{
 const f=useCurrentFrame();const p=ease(f,5,20);
 return <div style={{...card,position:'absolute',left:180,top:compact?720:650,width:720,padding:38,opacity:p,transform:`translateY(${(1-p)*24}px)`}}>
  <div style={{fontSize:24,color:C.muted,marginBottom:14}}>SATU CATATAN PESANAN</div>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:30}}><span style={{fontSize:58,fontWeight:600,color:C.navy}}>K-021</span><span style={{fontSize:24,borderRadius:99,padding:'10px 17px',background:'#EAF5FF',color:C.blue}}>50 kaus navy</span></div>
  {[
   ['Ukuran','S 10 · M 20 · L 15 · XL 5'],
   ['Desain','Versi 02, disetujui'],
   ['Tenggat','Jumat, 27 November'],
   ...(compact?[]:[['Pembayaran','Uang muka tercatat']]),
  ].map(([label,value])=><div key={label} style={{borderTop:`1px solid ${C.line}`,padding:'19px 0',display:'flex',flexDirection:'column',gap:8}}><span style={{fontSize:24,color:C.muted}}>{label}</span><span style={{fontSize:32,fontWeight:500,color:C.navy}}>{value}</span></div>)}
 </div>;
};

const Workflow:React.FC=()=>{
 const f=useCurrentFrame();const global=cuts[4]+f;
 const changed=global>=at(7)+65;
 const names=['Desain disetujui','Potong','Jahit','Pemeriksaan','Siap kirim'];
 const active=changed?3:Math.min(2,Math.floor(f/50));
 const p=ease(f,0,14);
 return <div style={{position:'absolute',left:180,top:570,width:720,opacity:p,transform:`translateY(${(1-p)*20}px)`}}>
  <div style={{...card,padding:32}}>
   <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',paddingBottom:23,borderBottom:`1px solid ${C.line}`}}><span style={{fontSize:42,fontWeight:600}}>K-021</span><span style={{fontSize:25,color:C.muted}}>50 kaus navy</span></div>
   <div style={{paddingTop:18}}>{names.map((name,i)=><div key={name} style={{display:'flex',gap:22,alignItems:'center',minHeight:88,borderBottom:i<4?`1px solid ${C.line}`:'none'}}>
    <div style={{width:42,height:42,borderRadius:99,background:i<active?C.green:i===active?C.blue:C.canvas,border:i>active?`1.5px solid ${C.line}`:'none',display:'flex',alignItems:'center',justifyContent:'center',fontSize:23,color:i<=active?'white':C.muted}}>{i<active?'✓':i+1}</div>
    <span style={{fontSize:30,fontWeight:i===active?600:400,color:i>active?C.muted:C.navy}}>{name}</span>
    {i===active?<span style={{marginLeft:'auto',fontSize:21,color:C.blue}}>Dikerjakan</span>:null}
   </div>)}</div>
  </div>
  <div style={{...card,marginTop:20,padding:'22px 28px',fontSize:26,color:C.navy,display:'flex',alignItems:'center',justifyContent:'space-between'}}><span>{changed?'Status diperbarui petugas':'Tahap saat ini: '+names[active]}</span><span style={{width:11,height:11,borderRadius:99,background:changed?C.green:C.cyan}}/></div>
  {global>=at(7)?<Cursor x={interpolate(global,[at(7),at(7)+45,at(7)+75,at(7)+100],[570,610,610,646],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})} y={interpolate(global,[at(7),at(7)+45,at(7)+100],[510,438,530],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})} click={Math.max(0,1-Math.abs(global-at(7)-65)/6)}/>:null}
 </div>;
};

const Subtitle:React.FC=()=>{
 const f=useCurrentFrame(),t=f/30;
 const seg=timing.segments.find(s=>t>=s.start&&t<s.end);
 if(!seg)return null;
 const words=seg.words.flatMap((w,i,all)=>{
  if(w.text==='A'&&all[i+1]?.text==='Dua')return [{...w,text:'A2',end:all[i+1].end}];
  if(w.text==='Dua'&&all[i-1]?.text==='A')return [];
  return [w];
 });
 let index=words.findIndex(w=>t>=w.start&&t<w.end);
 if(index<0){index=words.findIndex(w=>w.start>t);if(index>0)index--;if(index<0)index=words.length-1;}
 if(index<0)return null;
 const chunk=Math.floor(index/5)*5;
 const text=words.slice(chunk,chunk+5).map(w=>w.text).join(' ').replace(/A Dua/g,'A2');
 return <div style={{position:'absolute',left:180,top:1346,width:720,minHeight:106,padding:'20px 27px',boxSizing:'border-box',background:'rgba(255,255,255,.97)',borderRadius:17,border:`1px solid ${C.line}`,fontSize:35,fontWeight:500,lineHeight:1.25,color:C.navy,textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center'}}>{text}</div>;
};

const Scene:React.FC<{index:number;preview?:boolean}>=({index,preview})=>{
 const f=useCurrentFrame();
 return <AbsoluteFill>
  <Backdrop name={shots[index]} frames={cuts[index+1]-cuts[index]} seconds={shotSecs[index]} preview={preview}/>
  {index===4?<AbsoluteFill style={{background:C.canvas,opacity:.93}}/>:null}
  {index===6?<AbsoluteFill style={{background:'#FFFFFF',opacity:ease(f,0,14)}}/>:null}
  {index<6?<Header/>:null}
  {index===0?<><Heading>Pesanan sudah<br/>sampai mana?</Heading><div style={{...card,position:'absolute',left:240,top:1060,width:600,padding:28,opacity:ease(f,34,48),transform:`translateY(${(1-ease(f,34,48))*14}px)`}}><div style={{fontSize:22,color:C.muted,marginBottom:10}}>PERTANYAAN PELANGGAN</div><div style={{fontSize:32,fontWeight:500}}>“Sudah masuk tahap jahit?”</div></div></>:null}
  {index===1?<><Heading>Detail order<br/>perlu terhubung.</Heading><Order compact/></>:null}
  {index===2?<><Heading>Mulai dari<br/>satu nomor.</Heading><div style={{...card,position:'absolute',left:180,top:1040,width:720,padding:34,display:'flex',alignItems:'center',justifyContent:'space-between'}}><span style={{fontSize:66,fontWeight:600,color:C.blue}}>K-021</span><div style={{fontSize:29,lineHeight:1.5,color:C.navy}}>Detail, progres,<br/>dan tenggat.</div></div></>:null}
  {index===3?<><Heading small>Alur konveksi,<br/>lebih mudah diikuti.</Heading><div style={{...card,position:'absolute',left:180,top:1000,width:720,padding:32}}><div style={{fontSize:23,color:C.muted,marginBottom:15}}>CONTOH BANTUAN A2</div><div style={{fontSize:37,fontWeight:500}}>Detail order + progres produksi</div></div></>:null}
  {index===4?<><Heading small>{f<at(7)-cuts[4]?'Setiap tahap terlihat.':'Tim memperbarui.\nAdmin memantau.'}</Heading><Workflow/></>:null}
  {index===5?<><Heading small>Yang paling sering<br/>ditanyakan ulang?</Heading><div style={{...card,position:'absolute',left:180,top:1050,width:720,padding:31,fontSize:33,fontWeight:500,color:C.navy}}>Ukuran · revisi · progres</div></>:null}
  {index===6?<div style={{position:'absolute',left:180,top:440,width:720,display:'flex',flexDirection:'column',alignItems:'center',opacity:ease(f,8,24),transform:`translateY(${(1-ease(f,8,24))*10}px)`}}><Img src={staticFile('logo/a2-automation.png')} style={{width:610,height:610,objectFit:'contain',mixBlendMode:'multiply'}}/><div style={{fontSize:40,fontWeight:600,lineHeight:1.25,textAlign:'center',marginTop:-60}}>Kita mulai dari<br/>alur kerjamu.</div><div style={{fontSize:28,color:C.muted,marginTop:28}}>Konsultasi gratis</div><div style={{background:C.blue,color:'white',borderRadius:99,padding:'17px 34px',fontSize:35,fontWeight:500,marginTop:20}}>a2automate.com</div></div>:null}
 </AbsoluteFill>;
};

export const Konveksi3D:React.FC<{preview?:boolean;safeGuide?:boolean}>=({preview=false,safeGuide=false})=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{fontFamily:'Geist, sans-serif',color:C.navy,background:C.canvas}}>
  {shots.map((_,i)=><Sequence key={i} from={cuts[i]} durationInFrames={cuts[i+1]-cuts[i]}><Scene index={i} preview={preview}/></Sequence>)}
  <Subtitle/>
  <Audio src={staticFile('konveksi/narration.wav')} volume={.95}/>
  <Audio src={staticFile('konveksi/workshop-sfx.wav')} volume={.85}/>
  <div style={{position:'absolute',left:180,top:1490,height:3,width:720,background:'#13254a12'}}><div style={{height:'100%',width:`${100*f/timing.frames}%`,background:C.cyan}}/></div>
  {safeGuide?<AbsoluteFill style={{pointerEvents:'none',border:'1px solid transparent'}}><div style={{position:'absolute',left:60,top:220,width:840,height:1280,border:'3px dashed #d33'}}/></AbsoluteFill>:null}
 </AbsoluteFill>;
};
