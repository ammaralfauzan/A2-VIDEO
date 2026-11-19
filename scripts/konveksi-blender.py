"""Original modeled garment-workshop, camera animation and physically based materials.

Usage: blender -b -t 3 -P scripts/konveksi-blender.py -- --preview
       blender -b -t 3 -P scripts/konveksi-blender.py -- --render
"""
import bpy, math, random, sys, json, time
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/konveksi'; OUT.mkdir(parents=True,exist_ok=True)
ARGS=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
random.seed(12)
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
S=bpy.context.scene
S.render.engine='CYCLES'; S.cycles.device='CPU';S.cycles.samples=24
S.cycles.use_denoising=False;S.cycles.max_bounces=5;S.cycles.diffuse_bounces=3;S.cycles.glossy_bounces=3
S.cycles.use_adaptive_sampling=True;S.cycles.adaptive_threshold=.065
S.render.threads_mode='FIXED';S.render.threads=3
S.render.resolution_x=720;S.render.resolution_y=1280;S.render.resolution_percentage=100
S.render.image_settings.file_format='PNG';S.render.image_settings.color_mode='RGB'
S.render.film_transparent=False;S.render.use_persistent_data=True
S.view_settings.view_transform='AgX';S.view_settings.look='AgX - Medium High Contrast';S.view_settings.exposure=.55
S.world.color=(.5,.55,.65)
S.world.use_nodes=True;S.world.node_tree.nodes['Background'].inputs[0].default_value=(.72,.78,.9,1);S.world.node_tree.nodes['Background'].inputs[1].default_value=.25

def mat(name,color,rough=.5,metal=0):
 m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True
 p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*color,1);p.inputs['Roughness'].default_value=rough;p.inputs['Metallic'].default_value=metal
 return m
def texture(m,scale=160,strength=.15,distance=.012):
 n=m.node_tree.nodes;l=m.node_tree.links
 t=n.new('ShaderNodeTexNoise');t.inputs['Scale'].default_value=scale;t.inputs['Detail'].default_value=2
 b=n.new('ShaderNodeBump');b.inputs['Strength'].default_value=strength;b.inputs['Distance'].default_value=distance
 l.new(t.outputs['Fac'],b.inputs['Height']);l.new(b.outputs['Normal'],n.get('Principled BSDF').inputs['Normal'])
def fabric(name,color):
 m=mat(name,color,.84);p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Sheen Weight'].default_value=.18
 n=m.node_tree.nodes;l=m.node_tree.links
 tex=n.new('ShaderNodeTexNoise');tex.inputs['Scale'].default_value=430;tex.inputs['Detail'].default_value=2
 bump=n.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.28;bump.inputs['Distance'].default_value=.006
 l.new(tex.outputs['Fac'],bump.inputs['Height']);l.new(bump.outputs['Normal'],p.inputs['Normal'])
 return m
ivory=mat('Powder coated industrial enamel',(.74,.76,.72),.32);texture(ivory,210,.08,.002)
navy=fabric('Navy cotton weave',(.022,.049,.10)); blue=fabric('Blue cotton weave',(.04,.16,.28));cream=fabric('Natural cotton',(.61,.56,.44));cotton=fabric('Off white thread',(.81,.79,.69))
metal=mat('Brushed steel',(.45,.49,.53),.23,.84);black=mat('Rubber and graphite',(.026,.03,.034),.55);chrome=mat('Polished presser foot',(.66,.7,.73),.18,.96)
wood=mat('Birch worktop',(.49,.37,.23),.62);texture(wood,18,.14,.008)
white=mat('Warm wall',(.78,.79,.76),.8);texture(white,90,.08,.008)
floor=mat('Concrete',(.32,.34,.34),.8);texture(floor,35,.19,.015)
paper=mat('Paper edge',(.82,.82,.78),.92);yellow=mat('Tailor measuring tape',(.77,.57,.18),.76)

def cube(name,loc,dim,m,bevel=.015):
 bpy.ops.mesh.primitive_cube_add(size=1,location=loc);o=bpy.context.object;o.name=name;o.dimensions=dim;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 o.data.materials.append(m)
 if bevel:
  b=o.modifiers.new('Machined rounded edges','BEVEL');b.width=bevel;b.segments=3
  o.modifiers.new('Weighted normals','WEIGHTED_NORMAL')
 return o
def cyl(name,loc,r,depth,m,rot=None,verts=48):
 bpy.ops.mesh.primitive_cylinder_add(vertices=verts,radius=r,depth=depth,location=loc);o=bpy.context.object;o.name=name
 if rot:o.rotation_euler=rot
 o.data.materials.append(m);b=o.modifiers.new('Edge bevel','BEVEL');b.width=min(.006,r/5);b.segments=2
 for p in o.data.polygons:p.use_smooth=True
 return o
def curve(name,pts,r,m,cyclic=False):
 c=bpy.data.curves.new(name,'CURVE');c.dimensions='3D';c.resolution_u=12;c.bevel_depth=r;c.bevel_resolution=3
 p=c.splines.new('POLY');p.points.add(len(pts)-1)
 for q,v in zip(p.points,pts):q.co=(*v,1)
 p.use_cyclic_u=cyclic;o=bpy.data.objects.new(name,c);bpy.context.collection.objects.link(o);o.data.materials.append(m);return o
def image_mat(name,path,emission=0):
 m=mat(name,(1,1,1),.8);n=m.node_tree.nodes;p=n.get('Principled BSDF');im=n.new('ShaderNodeTexImage');im.image=bpy.data.images.load(str(path));m.node_tree.links.new(im.outputs['Color'],p.inputs['Base Color'])
 if emission:m.node_tree.links.new(im.outputs['Color'],p.inputs['Emission Color']);p.inputs['Emission Strength'].default_value=emission
 return m
def textured_plane(name,verts,m):
 mesh=bpy.data.meshes.new(name);mesh.from_pydata(verts,[],[(0,1,2,3)]);mesh.update();uv=mesh.uv_layers.new()
 for i,v in enumerate([(0,0),(1,0),(1,1),(0,1)]):uv.data[i].uv=v
 o=bpy.data.objects.new(name,mesh);bpy.context.collection.objects.link(o);o.data.materials.append(m);return o

# Workshop architecture and worktable.
cube('Concrete floor',(0,0,-.055),(11,9,.1),floor)
cube('Workshop rear wall',(0,2.15,1.7),(9,.12,3.5),white)
cube('Side wall',(-3.6,.6,1.7),(.12,4,3.5),white)
cube('Large birch workbench',(0,0,.78),(2.8,1.28,.095),wood,.025)
for x in [-1.2,1.2]:
 for y in [-.48,.48]:cube('Steel table leg',(x,y,.37),(.052,.052,.74),metal,.008)
curve('Lower steel table brace',[(-1.2,.48,.2),(1.2,.48,.2)],.025,metal)
for x in [-2.2,-.7,.8,2.3]:
 cube('Window pane',(x,2.07,2.28),(1.32,.025,1.40),mat('Window sky '+str(x),(.71,.78,.83),.6))
 for dx in [-.70,.70]:cube('Window upright',(x+dx,2.02,2.28),(.045,.06,1.55),ivory,.003)
 cube('Window crosspiece',(x,2.01,2.25),(1.4,.06,.035),ivory,.003)
 cube('Window sill',(x,1.98,1.54),(1.42,.16,.06),white,.008)

# Industrial straight-stitch machine: cantilever, needle, foot, plate, flywheel.
cube('Sewing machine base',(-.34,.08,.87),(.86,.39,.085),ivory,.045)
cube('Needle steel plate',(-.66,-.01,.918),(.24,.22,.008),chrome,.006)
cube('Drive column',(-.02,.15,1.13),(.205,.285,.52),ivory,.055)
cube('Cantilever arm',(-.36,.15,1.39),(.81,.25,.21),ivory,.06)
cube('Needle head',(-.71,.12,1.24),(.155,.23,.36),ivory,.045)
cube('Arm cover seam',(-.34,.023,1.393),(.44,.002,.003),metal,.001)
cyl('Hand wheel',(.12,.15,1.385),.135,.095,black,(0,math.pi/2,0))
cyl('Hand wheel metal face',(.171,.15,1.385),.112,.007,metal,(0,math.pi/2,0))
cyl('Wheel hub',(.184,.15,1.385),.033,.016,black,(0,math.pi/2,0))
cyl('Needle bar',(-.71,.025,1.065),.010,.18,chrome)
needle=cyl('Sewing needle',(-.71,.025,.965),.0023,.055,chrome,verts=16)
cube('Presser foot',(-.71,-.007,.936),(.057,.065,.008),chrome,.004)
for x in [-.765,-.655]:cyl('Needleplate screw',(x,-.072,.924),.009,.004,metal,verts=24)
for z in [1.16,1.29]:cyl('Head adjustment screw',(-.713,-.005,z),.017,.014,metal,(math.pi/2,0,0),24)
cyl('Tension dial',(-.53,-.004,1.27),.035,.035,chrome,(math.pi/2,0,0))
for j in range(4):curve('Thread guide groove',[(-.53+.028*math.cos(k*2*math.pi/32),-.027-j*.003,1.27+.028*math.sin(k*2*math.pi/32)) for k in range(33)],.001,black)
for i in range(6):cube('Feed guide groove',(-.63+i*.018,.01,.924),(.001,.10,.001),black,.0002)
cube('Reverse stitch lever',(-.08,-.016,1.15),(.031,.04,.10),metal,.008)

# Thread stand and cones, with actual thread path.
cyl('Thread stand foot',(.16,.41,.85),.105,.025,black)
cyl('Thread stand post',(.16,.41,1.35),.009,1,metal)
curve('Thread stand top',[(-.09,.41,1.84),(.41,.41,1.84)],.008,metal)
for x in [-.05,.35]:
 cyl('Thread cone flange',(x,.43,.865),.074,.012,black)
 bpy.ops.mesh.primitive_cone_add(vertices=64,radius1=.065,radius2=.042,depth=.21,location=(x,.43,.98));o=bpy.context.object;o.data.materials.append(cotton)
 for p in o.data.polygons:p.use_smooth=True
 cyl('Thread spool core',(x,.43,1.10),.018,.04,paper)
curve('Visible sewing thread',[(-.05,.43,1.10),(-.05,.41,1.84),(-.52,.18,1.52),(-.53,-.03,1.27),(-.71,.01,1.12),(-.71,.025,.95)],.0014,cotton)

# Soft, irregular cloth on the machine bed, with a subtle stitched seam.
N=44;M=35;verts=[];faces=[]
for j in range(M):
 for i in range(N):
  x=-1.03+i*.019;y=-.45+j*.021
  z=.931+.005*math.sin(i*.35+j*.12)+.011*math.exp(-((i-33)/8)**2)*math.sin(j*.20)+.008*math.sin(j*.24)
  verts.append((x,y,z))
for j in range(M-1):
 for i in range(N-1):a=j*N+i;faces.append((a,a+1,a+N+1,a+N))
mesh=bpy.data.meshes.new('Woven cloth drape');mesh.from_pydata(verts,[],faces);mesh.update();ob=bpy.data.objects.new('Navy material under presser foot',mesh);bpy.context.collection.objects.link(ob);ob.data.materials.append(navy)
so=ob.modifiers.new('Cotton thickness','SOLIDIFY');so.thickness=.002
for p in mesh.polygons:p.use_smooth=True
for j in range(25):
 y=-.42+j*.018;z=.939+.005*math.sin(17*.35+j*.12)+.008*math.sin(j*.24)
 curve('Stitch '+str(j),[(-.71,y,z),(-.71,y+.009,z)],.0008,cotton)

# Folded finished tees with collar ribs and fabric edges.
def folded(x,y,z,m):
 b=cube('Folded cotton tee',(x,y,z),(.48,.48,.064),m,.025)
 b.rotation_euler[2]=-.05
 curve('Folded fabric hem',[(x-.22,y-.224,z+.018),(x+.22,y-.224,z+.018)],.0015,cotton)
 pts=[(x+.078*math.cos(t),y+.15+.043*math.sin(t),z+.037) for t in [k*2*math.pi/48 for k in range(49)]]
 curve('Ribbed collar',pts,.007,m)
 return b
for i,m in enumerate([cream,blue,navy]):folded(.83,-.13,.87+i*.066,m)

# An open tailor's scissors and measuring tape.
for dx,ang in [(0,.13),(.09,-.13)]:
 pts=[(-.14+dx+.042*math.cos(k*math.pi/20),-.46+.062*math.sin(k*math.pi/20),.846) for k in range(41)]
 curve('Scissor handle',pts,.008,metal,True)
curve('Scissor blade A',[(-.13,-.41,.85),(.03,-.17,.85),(.09,-.08,.85)],.009,chrome)
curve('Scissor blade B',[(-.04,-.41,.858),(-.02,-.17,.858),(-.055,-.06,.858)],.009,chrome)
cyl('Scissors pivot',(-.02,-.21,.865),.013,.012,metal)
for k in range(24):
 a=k*.017;x=.32+a;y=-.43+.016*math.sin(k*.16)
 cube('Tailor tape segment',(x,y,.837),(.019,.026,.002),yellow,.0005)
 if k%2==0:cube('Tape measurement mark',(x,y-.007,.839),(.001,.009,.0008),black,0)

# Order card on the foreground tabletop.
card=image_mat('Order form print',OUT/'order-paper.png')
textured_plane('Printed order form',[(-.09,-.48,.849),(.30,-.48,.849),(.30,.04,.849),(-.09,.04,.849)],card)
cube('Order form paper stack',(.105,-.22,.844),(.39,.52,.007),paper,.002)
curve('Pen on form',[(.19,-.36,.864),(.21,-.10,.864)],.007,black)

# Laptop on an adjacent desk, screen carrying the original illustrative workflow.
cube('Office workbench',(.76,1.02,.79),(1.55,.65,.07),wood,.02)
for x in [.12,1.40]:cube('Office table leg',(x,1.05,.39),(.04,.045,.77),metal,.005)
cube('Laptop aluminium base',(.71,.91,.848),(.65,.41,.019),metal,.01)
for row in range(5):
 for col in range(12):cube('Keyboard key',(.445+col*.044,.88+row*.030,.863),(.035,.022,.002),black,.002)
cube('Trackpad',(.71,.772,.862),(.18,.082,.001),black,.005)
cube('Laptop screen bezel',(.71,1.10,1.07),(.65,.022,.42),black,.016)
screen=image_mat('Production board screen',OUT/'screen-board.png',.22)
textured_plane('Laptop display',[(.405,1.085,.877),(1.015,1.085,.877),(1.015,1.085,1.258),(.405,1.085,1.258)],screen)
cyl('Desk cup',(.14,1.03,.91),.046,.15,ivory)
cyl('Cup coffee',(.14,1.03,.987),.038,.001,mat('Coffee',(.035,.019,.012),.13))

# Industrial shelving and believable rolls/stock in the background.
for x in [-1.48,1.85]:
 for y in [1.47,1.88]:cube('Shelving post',(x,y,.9),(.045,.045,1.8),metal,.004)
for z in [.23,.74,1.27]:cube('Stock shelf',(.185,1.68,z),(3.4,.50,.037),ivory,.006)
for row,z in enumerate([.43,.94]):
 for i in range(9):
  x=-1.25+i*.35
  m=[cream,navy,blue][(i+row)%3]
  cyl('Rolled fabric',(x,1.66,z),.13,.37,m,(math.pi/2,0,0))
  cyl('Cardboard roll core',(x,1.467,z),.024,.012,paper,(math.pi/2,0,0),24)
for i in range(4):folded(-1.05+i*.71,1.68,1.34,[navy,cream,blue,navy][i])

def light(name,loc,target,power,size,color):
 data=bpy.data.lights.new(name,'AREA');data.energy=power;data.shape='DISK';data.size=size;data.color=color
 o=bpy.data.objects.new(name,data);bpy.context.collection.objects.link(o);o.location=loc;o.rotation_euler=(Vector(target)-o.location).to_track_quat('-Z','Y').to_euler()
light('Large daylight window',(-2.3,.9,3.8),(-.2,0,.9),550,3.0,(.85,.92,1.0))
light('Soft front fill',(1.8,-2.5,2.8),(0,0,1),180,2.2,(1,.94,.85))
light('Window edge light',(2,1.9,2.5),(0,0,1),260,1.7,(1,.96,.88))

camdata=bpy.data.cameras.new('Portrait cinematic camera');cam=bpy.data.objects.new('Portrait cinematic camera',camdata);bpy.context.collection.objects.link(cam);S.camera=cam
camdata.sensor_width=36;camdata.lens=50;camdata.dof.use_dof=True;camdata.dof.aperture_fstop=7.1
focus=bpy.data.objects.new('Focus point',None);bpy.context.collection.objects.link(focus);camdata.dof.focus_object=focus
SHOTS=[
 {'name':'needle','secs':6,'a':(-1.18,-1.10,1.37),'b':(-.98,-1.16,1.31),'target':(-.64,.02,1.06),'lens':62},
 {'name':'orders','secs':7,'a':(.35,-1.32,1.99),'b':(.12,-1.18,2.03),'target':(.17,-.15,.86),'lens':54},
 {'name':'workshop','secs':7,'a':(-1.93,-2.80,2.10),'b':(-1.62,-2.85,2.03),'target':(-.02,.35,1.04),'lens':49},
 {'name':'laptop','secs':7,'a':(1.62,-.63,1.62),'b':(1.48,-.68,1.56),'target':(.68,1.06,1.065),'lens':55},
 {'name':'finished','secs':7,'a':(1.57,-1.19,1.58),'b':(1.39,-1.24,1.54),'target':(.81,-.08,1.00),'lens':66},
]

def setup(shot,p):
 p=p*p*(3-2*p);cam.location=Vector(shot['a']).lerp(Vector(shot['b']),p)
 focus.location=shot['target'];cam.rotation_euler=(focus.location-cam.location).to_track_quat('-Z','Y').to_euler();camdata.lens=shot['lens']

if '--eevee-test' in ARGS:
 S.render.engine='BLENDER_EEVEE_NEXT';S.eevee.taa_render_samples=4
 S.render.resolution_percentage=75
 for i in range(2):
  setup(SHOTS[0],i);S.render.filepath=str(OUT/f'eevee-test-{i}.png');t=time.time();bpy.ops.render.render(write_still=True);print('EEVEE_TIME',time.time()-t,flush=True)
elif '--preview' in ARGS:
 S.render.resolution_percentage=75;S.cycles.samples=32
 for sh in SHOTS:
  setup(sh,.5);S.render.filepath=str(OUT/f"preview-{sh['name']}.png");t=time.time();bpy.ops.render.render(write_still=True);print('PREVIEW_DONE',sh['name'],round(time.time()-t,2),flush=True)
else:
 S.render.resolution_percentage=100;S.cycles.samples=6
 S.cycles.max_bounces=3;S.cycles.diffuse_bounces=2;S.cycles.glossy_bounces=2
 S.cycles.seed=12;S.cycles.use_animated_seed=False
 camdata.dof.aperture_fstop=11
 for sh in SHOTS:
  folder=OUT/'frames'/sh['name'];folder.mkdir(parents=True,exist_ok=True)
  count=6
  for i in range(count):
   path=folder/f'{i:04}.png'
   if path.exists():continue
   setup(sh,i/max(count-1,1));S.render.filepath=str(path);bpy.ops.render.render(write_still=True)
   print('FRAME_DONE',sh['name'],i+1,count,flush=True)
 setup(SHOTS[2],.5)
 bpy.ops.file.pack_all()
 bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'konveksi-workshop.blend'))
 (OUT/'shots.json').write_text(json.dumps(SHOTS,indent=2))
