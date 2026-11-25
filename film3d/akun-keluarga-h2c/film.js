// akun-keluarga-h2c · "Satu Akun untuk Sekeluarga" (H2C Umroh), 9:16 1080x1920, 70 s.
// A walnut desk against an emerald wall in late sun through a geometric lattice. A portrait monitor (the head of the
// family's account) fills four standing name cards, step by step. No living beings: only screen, cursor, cards, phone, desk props.
// RULE: everything is a pure function of t (no clocks, no Math.random, nothing carried over from the last frame).
import * as THREE from 'three';
import { FullScreenQuad } from 'three/addons/postprocessing/Pass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { W, H, clamp, lerp, seg, smooth, easeOut, easeInOut, backOut, spring, halton, hash } from './lib.js';

export const total = 70.0;
const SHUTTER = 0.5 / 30;
const V = (x, y, z) => new THREE.Vector3(x, y, z);

// ---------- brand (brands/h2c-umroh/BRAND.md) ----------
const C = { bg: '#0A1F17', bg2: '#0E2A1F', surface: '#123B2A', surface2: '#1B4E38', ivory: '#F4EFE1', ivory2: '#E9E2CD', sage: '#9FB3A6',
  gold: '#D4AF6A', goldLight: '#E3C78C', goldDeep: '#B8872F', leaf: '#8CC63F', leafLight: '#B5E36B', goldLine: 'rgba(212,175,106,.30)' };
const fonts = [['GreatVibes', 'assets/great-vibes-latin.woff2', '400'], ['Anton', 'assets/anton-latin.woff2', '400'],
  ['Amiri', 'assets/amiri-latin-700.woff2', '700'], ['Jakarta', 'assets/plus-jakarta-sans-latin.woff2', '200 800'], ['Brush', 'assets/caveat-brush-latin.woff2', '400']];
for (const [name, url, weight] of fonts) { const f = new FontFace(name, `url(${url})`, { weight }); await f.load(); document.fonts.add(f); }
const logo = await new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = 'assets/logo.jpeg'; });
const DIGITS = await (await fetch('assets/digits.json')).json();
const SUB = await (await fetch('assets/vo-timing.json')).json();
const JK = (w, s) => `${w} ${s}px Jakarta`;

// ---------- renderer ----------
const stage = document.getElementById('stage');
const renderer = new THREE.WebGLRenderer({ canvas: stage, antialias: false, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(1); renderer.setSize(W, H, false);
renderer.toneMapping = THREE.NoToneMapping; renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap;
const rt = new THREE.WebGLRenderTarget(W, H, { type: THREE.HalfFloatType, samples: 4 });
const accum = new THREE.WebGLRenderTarget(W, H, { type: THREE.HalfFloatType, depthBuffer: false });

// ---------- set (metres; y = 0 is the desk top) ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020604);
const mat = (color, roughness = 0.7, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
function add(geo, material, x, y, z, parent = scene) { const m = new THREE.Mesh(geo, material); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; parent.add(m); return m; }
const rbox = (w, h, d, r = 0.004) => new RoundedBoxGeometry(w, h, d, 3, r);

// wall: deep emerald plaster with a faint vertical wainscot line
add(new THREE.PlaneGeometry(8, 5), mat(0x0f3a28, 0.95), 0, 1.2, -0.5);
add(new THREE.BoxGeometry(8, 0.012, 0.012), mat(0x8f6d32, 0.4, 0.8), 0, 0.62, -0.494);   // brass picture rail
// desk: walnut top with a thin brass inlay along the front edge
add(rbox(1.9, 0.045, 0.95, 0.008), mat(0x3a2517, 0.5), 0, -0.0225, -0.02);
add(new THREE.BoxGeometry(1.9, 0.004, 0.006), mat(0xc79a4a, 0.3, 0.9), 0, -0.004, 0.457);
add(new THREE.PlaneGeometry(10, 8), mat(0x140e0a, 0.9), 0, -0.76, 0).rotation.x = -Math.PI / 2;

// monitor, rotated to portrait (pivot): screen 0.34 x 0.60, centre at y 0.44
const SCR_W = 0.34, SCR_H = 0.60, SCR_Y = 0.44, SCR_Z = -0.17;
const dark = mat(0x101412, 0.35, 0.2);
add(new THREE.CylinderGeometry(0.09, 0.1, 0.012, 48), mat(0x8f6d32, 0.32, 0.85), 0, 0.006, SCR_Z - 0.05);   // brass foot
add(rbox(0.05, 0.17, 0.02, 0.006), dark, 0, 0.09, SCR_Z - 0.05);
add(rbox(SCR_W + 0.022, SCR_H + 0.022, 0.024, 0.008), dark, 0, SCR_Y, SCR_Z - 0.012);
const SW = 720, SH = 1270;
const screenCanvas = Object.assign(document.createElement('canvas'), { width: SW, height: SH }), sc = screenCanvas.getContext('2d');
const screenTex = new THREE.CanvasTexture(screenCanvas); screenTex.colorSpace = THREE.SRGBColorSpace; screenTex.anisotropy = 8;
const screenMat = new THREE.MeshBasicMaterial({ map: screenTex, color: new THREE.Color(1.06, 1.06, 1.06) });
const screen = new THREE.Mesh(new THREE.PlaneGeometry(SCR_W, SCR_H), screenMat); screen.position.set(0, SCR_Y, SCR_Z + 0.0005); scene.add(screen);
const SCREEN_CENTER = V(0, SCR_Y, SCR_Z);

// name cards: ivory board with gold edge on a small walnut foot, leaning back slightly
const NAMES = ['Aisyah', 'Hasan', 'Fatimah', 'Umar'];
const CARD_X = [-0.168, -0.056, 0.056, 0.168], CARD_Z = 0.13, CW = 0.096, CH = 0.064;
const cards = [];
function cardFace(name, blank) {
  const cv = Object.assign(document.createElement('canvas'), { width: 384, height: 256 }), g = cv.getContext('2d');
  const gr = g.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, '#FBF7EC'); gr.addColorStop(1, '#EDE5CF'); g.fillStyle = gr; g.fillRect(0, 0, 384, 256);
  g.strokeStyle = C.gold; g.lineWidth = 10; g.strokeRect(5, 5, 374, 246); g.strokeStyle = 'rgba(184,135,47,.5)'; g.lineWidth = 2; g.strokeRect(20, 20, 344, 216);
  if (!blank) {
    g.textAlign = 'center'; g.fillStyle = C.goldDeep; g.font = JK(800, 22); g.fillText('ANGGOTA', 192, 66);
    g.fillStyle = '#123B2A'; g.font = '700 70px Amiri'; g.fillText(name, 192, 150);
    g.fillStyle = '#7d8c82'; g.font = JK(600, 20); g.fillText('contoh', 192, 206);
  } else { g.fillStyle = 'rgba(184,135,47,.35)'; g.fillRect(110, 124, 164, 6); }
  const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; tx.anisotropy = 8; return tx;
}
const blankTex = cardFace('', true);
for (let i = 0; i < 4; i++) {
  const root = new THREE.Group(); root.position.set(CARD_X[i], 0, CARD_Z); scene.add(root);
  add(rbox(0.07, 0.012, 0.028, 0.004), mat(0x3a2214, 0.45), 0, 0.006, 0, root);                       // foot
  const flip = new THREE.Group(); flip.position.y = 0.012; root.add(flip);
  const board = new THREE.Group(); board.rotation.x = -0.18; flip.add(board);
  add(new THREE.BoxGeometry(CW, CH, 0.003), mat(0xe9e2cd, 0.6), 0, CH / 2, 0, board);
  const frontMat = new THREE.MeshStandardMaterial({ map: cardFace(NAMES[i], false), roughness: 0.55, emissive: new THREE.Color(0xffffff), emissiveMap: null, emissiveIntensity: 0 });
  const backMat = new THREE.MeshStandardMaterial({ map: blankTex, roughness: 0.55 });
  const front = new THREE.Mesh(new THREE.PlaneGeometry(CW - 0.002, CH - 0.002), frontMat); front.position.set(0, CH / 2, 0.0016); board.add(front);
  const back = new THREE.Mesh(new THREE.PlaneGeometry(CW - 0.002, CH - 0.002), backMat); back.position.set(0, CH / 2, -0.0016); back.rotation.y = Math.PI; board.add(back);
  frontMat.emissiveMap = frontMat.map;
  cards.push({ root, flip, board, frontMat });
}

// phone, lying flat to the right
const PHONE = V(0.43, 0, 0.12);
const phone = new THREE.Group(); phone.position.copy(PHONE); phone.rotation.y = -0.22; scene.add(phone);
add(rbox(0.074, 0.008, 0.154, 0.006), mat(0x1a1d1c, 0.3, 0.4), 0, 0.004, 0, phone);
const PW = 360, PH = 760;
const phoneCanvas = Object.assign(document.createElement('canvas'), { width: PW, height: PH }), pc = phoneCanvas.getContext('2d');
const phoneTex = new THREE.CanvasTexture(phoneCanvas); phoneTex.colorSpace = THREE.SRGBColorSpace; phoneTex.anisotropy = 8;
const phoneMat = new THREE.MeshBasicMaterial({ map: phoneTex, color: new THREE.Color(1, 1, 1) });
const phoneScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.068, 0.144), phoneMat); phoneScreen.rotation.x = -Math.PI / 2; phoneScreen.position.y = 0.0085; phone.add(phoneScreen);

// tea glass on a brass saucer
add(new THREE.CylinderGeometry(0.05, 0.045, 0.006, 40), mat(0xb8872f, 0.3, 0.9), 0.33, 0.003, -0.2);
add(new THREE.CylinderGeometry(0.03, 0.024, 0.085, 32), new THREE.MeshStandardMaterial({ color: 0x8a3c12, roughness: 0.12, transparent: true, opacity: 0.88 }), 0.33, 0.0485, -0.2);
add(new THREE.TorusGeometry(0.0305, 0.002, 8, 40), mat(0xd4af6a, 0.25, 0.9), 0.33, 0.07, -0.2).rotation.x = Math.PI / 2;

// plant in a brass pot (left, behind)
const plant = new THREE.Group(); plant.position.set(-0.42, 0, -0.26); scene.add(plant);
add(new THREE.CylinderGeometry(0.065, 0.05, 0.1, 32), mat(0xa07a36, 0.4, 0.7), 0, 0.05, 0, plant);
const leafMat = mat(0x3f7a34, 0.55), leaves = [];
for (let i = 0; i < 13; i++) {
  const pivot = new THREE.Group(); pivot.position.y = 0.095; pivot.rotation.y = i * 2.4; plant.add(pivot);
  const leaf = add(new THREE.SphereGeometry(1, 16, 10), leafMat, 0, 0, 0.075, pivot); leaf.scale.set(0.022, 0.006, 0.08);
  pivot.userData.tilt = 0.35 + 0.5 * hash(i); leaves.push(pivot);
}

// brass desk lamp (right, behind), head aimed at the cards
function rod(a, b, r, material, parent) { const d = b.clone().sub(a), m = add(new THREE.CylinderGeometry(r, r, d.length(), 12), material, 0, 0, 0, parent); m.position.copy(a).lerp(b, 0.5); m.quaternion.setFromUnitVectors(V(0, 1, 0), d.normalize()); return m; }
const brass = mat(0xb8872f, 0.28, 0.9), lamp = new THREE.Group(); lamp.position.set(0.56, 0, -0.3); scene.add(lamp);
const ELBOW = V(0.04, 0.33, -0.02), HEAD = V(-0.12, 0.42, 0.14);
add(new THREE.CylinderGeometry(0.06, 0.07, 0.018, 32), brass, 0, 0.009, 0, lamp);
rod(V(0, 0.018, 0), ELBOW, 0.007, brass, lamp); rod(ELBOW, HEAD, 0.007, brass, lamp);
const head = add(new THREE.ConeGeometry(0.055, 0.1, 32, 1, true), new THREE.MeshStandardMaterial({ color: 0xb8872f, roughness: 0.3, metalness: 0.9, side: THREE.DoubleSide }), HEAD.x, HEAD.y, HEAD.z, lamp);
head.rotation.set(-0.5, 0, -0.75);
const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffffff }), bulb = new THREE.Mesh(new THREE.SphereGeometry(0.016, 16, 12), bulbMat); bulb.position.set(0, -0.035, 0); head.add(bulb);

// gold step numerals (Anton glyphs, extruded and bevelled), standing to the left in front of the monitor
const goldMat = new THREE.MeshStandardMaterial({ color: 0xe2ba6c, roughness: 0.3, metalness: 0.35, emissive: new THREE.Color(0x6a4a14), emissiveIntensity: 0.55 });
const NUM_POS = V(-0.155, 0, 0.055);
const numerals = {};
for (const ch of '1234') {
  const sp = new THREE.ShapePath(); const S = 0.21;
  for (const c of DIGITS[ch].cmds) {
    const [ty, ...v] = c; const p = v.map((n, k) => (k % 2 ? -n : n) * S);
    if (ty === 'M') sp.moveTo(p[0], p[1]); else if (ty === 'L') sp.lineTo(p[0], p[1]);
    else if (ty === 'Q') sp.quadraticCurveTo(p[0], p[1], p[2], p[3]); else if (ty === 'C') sp.bezierCurveTo(p[0], p[1], p[2], p[3], p[4], p[5]);
  }
  const shapes = sp.toShapes(true);
  const geo = new THREE.ExtrudeGeometry(shapes, { depth: 0.022, bevelEnabled: true, bevelThickness: 0.003, bevelSize: 0.0025, bevelSegments: 3, curveSegments: 10 });
  geo.computeBoundingBox(); const bb = geo.boundingBox; geo.translate(-(bb.min.x + bb.max.x) / 2, -bb.min.y, -0.011);
  const g = new THREE.Group(); g.position.copy(NUM_POS); g.rotation.y = 0.32; scene.add(g);
  add(rbox(0.13, 0.07, 0.07, 0.006), mat(0x2a1a10, 0.4), 0, 0.035, 0, g); add(new THREE.BoxGeometry(0.132, 0.004, 0.072), brass, 0, 0.07, 0, g);   // walnut plinth, brass cap
  const gl = add(geo, goldMat, 0, 0.072, 0, g); g.visible = false; numerals[ch] = g;
}
const STEPS = [['1', 12.41], ['2', 26.70], ['3', 36.40], ['4', 49.02]];
// hero objects on layer 1: the caption mask (type can sit behind them)
for (const o of [...cards.map((c) => c.root), phone, ...Object.values(numerals)]) o.traverse((m) => { if (m.isMesh) m.layers.enable(1); });

// geometric lattice between the sun and the room (out of frame): its shadow paints a star grid on wall and desk
const SUN_POS = V(-2.4, 2.1, 1.5), SUN_AT = V(0.05, 0.3, -0.5);
const lattice = new THREE.Group(); lattice.position.copy(SUN_AT).lerp(SUN_POS, 0.42); lattice.lookAt(SUN_AT); scene.add(lattice);
{ const m = mat(0x000000), bar = new THREE.BoxGeometry(2.6, 0.018, 0.01);
  for (let i = -9; i <= 9; i++) for (const r of [0, Math.PI / 2, Math.PI / 4, -Math.PI / 4]) {
    if (Math.abs(r) === Math.PI / 4 && i % 2) continue;
    const s = new THREE.Mesh(bar, m); s.rotation.z = r; const off = i * (Math.abs(r) === Math.PI / 4 ? 0.085 : 0.12);
    s.position.set(-Math.sin(r) * off, Math.cos(r) * off, 0); s.castShadow = true; lattice.add(s);
  } }

// dust in the light
const DUST = 160, dustPos = new Float32Array(DUST * 3), dustGeo = new THREE.BufferGeometry();
dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
scene.add(new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: new THREE.Color(1.6, 1.3, 0.85), size: 0.0018, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false })));

// ---------- lights ----------
const sun = new THREE.DirectionalLight(0xffd0a0, 3.3); sun.target.position.copy(SUN_AT); scene.add(sun, sun.target);
sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -1.6, right: 1.6, top: 1.6, bottom: -1.6, near: 0.5, far: 8 }); sun.shadow.bias = -0.0004;
const sky = new THREE.DirectionalLight(0xa9c9ff, 0.45); sky.target.position.set(0, 0.2, 0); scene.add(sky, sky.target);
sky.castShadow = true; sky.shadow.mapSize.set(1024, 1024); Object.assign(sky.shadow.camera, { left: -1.4, right: 1.4, top: 1.4, bottom: -1.4, near: 0.5, far: 10 }); sky.shadow.bias = -0.0006;
const lampLight = new THREE.SpotLight(0xffb066, 0, 2.5, 0.7, 0.6, 2); scene.add(lampLight, lampLight.target);
lampLight.castShadow = true; lampLight.shadow.mapSize.set(1024, 1024); lampLight.shadow.bias = -0.0005;
const screenGlow = new THREE.PointLight(0xd9e8c8, 0.25, 1.2, 2); screenGlow.position.set(0, SCR_Y, SCR_Z + 0.2); scene.add(screenGlow);
scene.add(new THREE.AmbientLight(0x1c2a24, 0.35));

// ---------- 2D drawing helpers ----------
function rr(g, x, y, w, h, r) { g.beginPath(); g.roundRect(x, y, w, h, r); }
function fillRR(g, x, y, w, h, r, fill, stroke, lw = 2) { rr(g, x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.strokeStyle = stroke; g.lineWidth = lw; g.stroke(); } }
function goldText(g, text, x, y, size, font = 'Anton') {
  g.font = `${size}px ${font}`; const gr = g.createLinearGradient(0, y - size * 0.85, 0, y + size * 0.1);
  gr.addColorStop(0, '#FFFAF0'); gr.addColorStop(0.45, '#F3E3C0'); gr.addColorStop(1, '#D4AF6A'); g.fillStyle = gr; g.fillText(text, x, y);
}
function goldPill(g, x, y, w, h, text, size = 34) {
  const gr = g.createLinearGradient(0, y, 0, y + h); gr.addColorStop(0, '#E3C78C'); gr.addColorStop(1, '#C9A25A');
  fillRR(g, x, y, w, h, h / 2, gr); g.fillStyle = C.bg; g.font = JK(800, size); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, x + w / 2, y + h / 2 + 1); g.textBaseline = 'alphabetic';
}
function ribbon(g, cx, cy, w, h, text) {
  g.save(); g.translate(cx, cy); g.rotate(-2 * Math.PI / 180);
  const gr = g.createLinearGradient(-w / 2, 0, w / 2, 0); gr.addColorStop(0, '#C18A36'); gr.addColorStop(0.5, '#D9AB5B'); gr.addColorStop(1, '#B67D2C');
  g.beginPath(); g.roundRect(-w / 2, -h / 2, w, h, [6, 14, 6, 14]); g.fillStyle = gr; g.fill();
  g.fillStyle = C.bg; g.font = `${h * 0.62}px GreatVibes`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, 0, 2); g.restore(); g.textBaseline = 'alphabetic';
}
const typed = (s, t, a, b) => s.slice(0, Math.floor(seg(t, a, b) * s.length + 1e-6));
function field(g, x, y, w, label, value, active, caret, mask) {
  g.textAlign = 'left'; g.fillStyle = C.sage; g.font = JK(700, 24); g.fillText(label, x, y);
  fillRR(g, x, y + 14, w, 76, 22, C.bg2, active ? C.gold : C.goldLine, active ? 3 : 2);
  g.fillStyle = C.ivory; g.font = JK(600, 34); const v = mask ? value : value; g.fillText(v, x + 26, y + 64);
  if (caret) { const cw = g.measureText(v).width; g.fillStyle = C.goldLight; g.fillRect(x + 28 + cw, y + 36, 16, 36); }   // full-cell block caret
}
function header(g, step, title) {
  fillRR(g, 0, 0, SW, 120, 0, C.bg2);
  g.save(); g.beginPath(); g.arc(70, 60, 34, 0, Math.PI * 2); g.clip(); g.drawImage(logo, 36, 26, 68, 68); g.restore();
  g.strokeStyle = C.gold; g.lineWidth = 2; g.beginPath(); g.arc(70, 60, 35, 0, Math.PI * 2); g.stroke();
  g.textAlign = 'left'; g.fillStyle = C.ivory; g.font = JK(800, 26); g.fillText('H2C Wisata Mandiri', 122, 56); g.fillStyle = C.sage; g.font = JK(600, 20); g.fillText('umroh.h2c.or.id', 122, 84);
  if (step) {
    g.textAlign = 'left'; g.fillStyle = C.gold; g.font = JK(800, 26); g.fillText(`LANGKAH ${step}`, 56, 196);
    g.fillStyle = C.ivory; g.font = JK(800, 46); g.fillText(title, 56, 252);
    const lg = g.createLinearGradient(56, 0, 300, 0); lg.addColorStop(0, C.gold); lg.addColorStop(1, C.leaf); g.fillStyle = lg; g.fillRect(56, 274, 180, 5);
  }
}
function cursor(g, x, y, press) {
  g.save(); g.translate(x, y); const s = 1.5 * (1 - 0.15 * press); g.scale(s, s);
  g.beginPath(); g.moveTo(0, 0); g.lineTo(0, 30); g.lineTo(7.5, 23); g.lineTo(12.5, 34); g.lineTo(17, 32); g.lineTo(12, 21.5); g.lineTo(22, 21.5); g.closePath();
  g.fillStyle = '#fff'; g.fill(); g.strokeStyle = '#0A1F17'; g.lineWidth = 2; g.stroke(); g.restore();
  if (press > 0) { g.strokeStyle = `rgba(227,199,140,${0.8 * press})`; g.lineWidth = 3; g.beginPath(); g.arc(x, y, 18 + 26 * (1 - press), 0, Math.PI * 2); g.stroke(); }
}
// cursor path: [time, x, y]; clicks: times. Pure function of t.
function cursorAt(t, path) {
  if (t <= path[0][0]) return [path[0][1], path[0][2]];
  for (let i = 0; i < path.length - 1; i++) { const a = path[i], b = path[i + 1]; if (t <= b[0]) { const k = easeInOut(seg(t, a[0], b[0])); return [lerp(a[1], b[1], k), lerp(a[2], b[2], k)]; } }
  const l = path[path.length - 1]; return [l[1], l[2]];
}
const pressAt = (t, clicks) => { let p = 0; for (const c of clicks) p = Math.max(p, Math.exp(-((t - c) ** 2) / 0.006) * (t > c - 0.12 ? 1 : 0)); return p; };
function sim(g) { fillRR(g, SW - 170, SH - 64, 140, 38, 19, 'rgba(10,31,23,.7)', C.goldLine); g.fillStyle = C.sage; g.font = JK(700, 20); g.textAlign = 'center'; g.fillText('Simulasi', SW - 100, SH - 38); }

// ---------- screen pages ----------
function pageHome(g, t) {
  g.fillStyle = C.bg; g.fillRect(0, 0, SW, SH);
  const rg = g.createRadialGradient(SW / 2, 380, 40, SW / 2, 380, 560); rg.addColorStop(0, 'rgba(212,175,106,.18)'); rg.addColorStop(1, 'rgba(212,175,106,0)'); g.fillStyle = rg; g.fillRect(0, 0, SW, SH);
  header(g);
  g.textAlign = 'center'; const a = easeOut(seg(t, 0, 0.5));
  g.globalAlpha = a; g.fillStyle = C.goldLight; g.font = '112px GreatVibes'; g.fillText('Umroh', SW / 2, 290 + 20 * (1 - a));
  goldText(g, 'SEKELUARGA', SW / 2, 420 + 20 * (1 - a), 118); g.globalAlpha = 1;
  ribbon(g, SW / 2, 500, 440, 70, 'cukup satu akun');
  // the head-of-family account card
  const k = backOut(seg(t, 2.72, 3.12));
  if (t > 2.72) {
    g.save(); g.globalAlpha = clamp(k); g.translate(0, 40 * (1 - k));
    fillRR(g, 60, 590, SW - 120, 220, 44, C.surface, C.goldLine);
    g.save(); g.beginPath(); g.arc(150, 700, 52, 0, Math.PI * 2); g.fillStyle = C.surface2; g.fill(); g.strokeStyle = C.gold; g.lineWidth = 3; g.stroke(); g.restore();
    g.fillStyle = C.gold; g.font = JK(800, 46); g.textAlign = 'center'; g.fillText('KK', 150, 717);
    g.textAlign = 'left'; g.fillStyle = C.sage; g.font = JK(700, 24); g.fillText('SATU AKUN', 228, 676); g.fillStyle = C.ivory; g.font = JK(800, 40); g.fillText('Kepala keluarga', 228, 726);
    g.fillStyle = C.ivory2; g.font = JK(500, 26); g.fillText('untuk semua anggota', 228, 766);
    g.restore();
  }
  if (t > 4.95) {   // "tidak perlu semua daftar sendiri": four member chips without their own sign-up
    const ka = easeOut(seg(t, 4.95, 5.4)); g.globalAlpha = ka;
    for (let i = 0; i < 4; i++) { const x = 60 + i * 152; fillRR(g, x, 850, 140, 64, 32, C.bg2, C.goldLine); g.fillStyle = C.ivory2; g.font = JK(700, 22); g.textAlign = 'center'; g.fillText(NAMES[i], x + 70, 890); }
    g.fillStyle = C.sage; g.font = JK(600, 24); g.fillText('tanpa daftar sendiri-sendiri', SW / 2, 960); g.globalAlpha = 1;
  }
  // four step dots
  if (t > 6.8) {
    const dotT = [7.06, 7.7, 8.35, 9.0]; g.textAlign = 'center';
    g.globalAlpha = easeOut(seg(t, 6.8, 7.1)); g.fillStyle = C.sage; g.font = JK(800, 24); g.fillText('4 LANGKAH', SW / 2, 1030);
    for (let i = 0; i < 4; i++) {
      const on = backOut(seg(t, dotT[i], dotT[i] + 0.3)), x = SW / 2 + (i - 1.5) * 130, y = 1100;
      g.strokeStyle = C.goldLine; g.lineWidth = 3; if (i < 3) { g.beginPath(); g.moveTo(x + 34, y); g.lineTo(x + 96, y); g.stroke(); }
      g.beginPath(); g.arc(x, y, 32, 0, Math.PI * 2); g.fillStyle = C.bg2; g.fill(); g.stroke();
      if (on > 0) { g.beginPath(); g.arc(x, y, 32 * Math.min(on, 1.1), 0, Math.PI * 2); g.fillStyle = C.gold; g.fill(); }
      g.fillStyle = on > 0.5 ? C.bg : C.sage; g.font = '40px Anton'; g.fillText(String(i + 1), x, y + 15);
    }
    g.globalAlpha = 1;
  }
}
const ADD = [20.95, 23.40, 24.20, 25.00];   // member i appears in the list (and its card flips)
function pageFamily(g, t) {
  g.fillStyle = C.bg; g.fillRect(0, 0, SW, SH); header(g, 1, 'Tambah anggota');
  g.textAlign = 'left'; g.fillStyle = C.sage; g.font = JK(700, 24); g.fillText('HALAMAN KELUARGA', 56, 340);
  let n = 0; for (const a of ADD) if (t >= a) n++;
  g.textAlign = 'right'; g.fillStyle = C.gold; g.font = JK(800, 26); g.fillText(`${n} / 4 anggota`, SW - 56, 340);
  for (let i = 0; i < 5; i++) {
    const y = 370 + i * 112, k = i < 4 ? backOut(seg(t, ADD[i], ADD[i] + 0.35)) : easeOut(seg(t, 25.6, 26.0));
    fillRR(g, 56, y, SW - 112, 96, 30, C.bg2, 'rgba(212,175,106,.16)');
    if (i < 4 && t >= ADD[i]) {
      g.save(); g.globalAlpha = clamp(k); g.translate(30 * (1 - k), 0);
      fillRR(g, 56, y, SW - 112, 96, 30, C.surface, C.goldLine);
      g.beginPath(); g.arc(112, y + 48, 26, 0, Math.PI * 2); g.fillStyle = C.leaf; g.fill();
      g.fillStyle = C.bg; g.font = JK(800, 26); g.textAlign = 'center'; g.fillText(NAMES[i][0], 112, y + 57);
      g.textAlign = 'left'; g.fillStyle = C.ivory; g.font = JK(800, 34); g.fillText(NAMES[i], 158, y + 46);
      g.fillStyle = C.sage; g.font = JK(600, 22); g.fillText('sandi tersimpan · contoh', 158, y + 78); g.restore();
    } else if (i === 4 && t > 25.6) {
      g.globalAlpha = k; g.fillStyle = 'rgba(159,179,166,.55)'; g.font = JK(700, 26); g.textAlign = 'center'; g.fillText('Maks. 4 anggota', SW / 2, y + 58); g.globalAlpha = 1;
    } else { g.fillStyle = 'rgba(159,179,166,.4)'; g.font = JK(600, 24); g.textAlign = 'center'; g.fillText('kosong', SW / 2, y + 56); }
  }
  // the four lime progress dots
  for (let i = 0; i < 4; i++) { const on = t >= ADD[i]; g.beginPath(); g.arc(SW / 2 + (i - 1.5) * 44, 960, 13, 0, Math.PI * 2); g.fillStyle = on ? C.leaf : C.bg2; g.fill(); g.strokeStyle = on ? C.leafLight : C.goldLine; g.lineWidth = 2; g.stroke(); }
  // add button
  const bp = pressAt(t, [14.35]); g.save(); g.translate(SW / 2, 1050); g.scale(1 - 0.05 * bp, 1 - 0.05 * bp); goldPill(g, -230, -42, 460, 84, '+ Tambah anggota', 32); g.restore();
  // form sheet: open 14.4 .. 21.0
  const open = easeOut(seg(t, 14.45, 14.85)) * (1 - easeInOut(seg(t, 20.95, 21.3)));
  if (open > 0.001) {
    g.fillStyle = `rgba(2,8,6,${0.55 * open})`; g.fillRect(0, 0, SW, SH);
    const y0 = 470 + 500 * (1 - open);
    fillRR(g, 40, y0, SW - 80, 560, 44, C.surface, C.gold, 2);
    g.textAlign = 'left'; g.fillStyle = C.ivory; g.font = JK(800, 38); g.fillText('Anggota baru', 84, y0 + 74);
    const nm = typed('Aisyah', t, 18.4, 19.1), pw = typed('melati24', t, 19.55, 20.45);
    field(g, 84, y0 + 130, SW - 168, 'Nama', nm, t < 19.4, t > 18.2 && t < 19.4 && Math.floor(t * 3) % 2 === 0);
    field(g, 84, y0 + 270, SW - 168, 'Sandi (contoh)', pw, t >= 19.4, t >= 19.4 && t < 20.6 && Math.floor(t * 3) % 2 === 0);
    const sp = pressAt(t, [20.8]); g.save(); g.translate(SW / 2, y0 + 476); g.scale(1 - 0.05 * sp, 1 - 0.05 * sp); goldPill(g, -150, -38, 300, 76, 'Simpan', 32); g.restore();
  }
  const [cx, cy] = cursorAt(t, [[12.6, 560, 1200], [13.9, 420, 1062], [14.6, 430, 1070], [15.3, 470, 760], [18.2, 470, 760], [18.4, 450, 720], [19.3, 470, 880], [20.5, 470, 900], [20.75, 380, 950], [21.2, 380, 950], [22.0, 610, 1180]]);
  cursor(g, cx, cy, pressAt(t, [14.35, 18.3, 19.45, 20.8]));
}
function pageSend(g, t) {
  g.fillStyle = C.bg; g.fillRect(0, 0, SW, SH); header(g, 2, 'Kirim ID dan sandi');
  fillRR(g, 56, 330, SW - 112, 230, 40, C.surface, C.goldLine);
  g.textAlign = 'left'; g.fillStyle = C.sage; g.font = JK(700, 24); g.fillText('ID KELUARGA', 96, 392);
  g.fillStyle = C.ivory; g.font = '72px Anton'; g.fillText('KLG-2417', 96, 480); g.fillStyle = C.sage; g.font = JK(600, 22); g.fillText('contoh', 96, 526);
  fillRR(g, 56, 590, SW - 112, 200, 40, C.surface, C.goldLine);
  g.fillStyle = C.sage; g.font = JK(700, 24); g.fillText('SANDI · AISYAH', 96, 650);
  g.fillStyle = C.ivory; g.font = JK(800, 50); g.fillText('melati24', 96, 718); g.fillStyle = C.sage; g.font = JK(600, 22); g.fillText('contoh', 96, 758);
  const p = pressAt(t, [30.45]); g.save(); g.translate(SW / 2, 900); g.scale(1 - 0.05 * p, 1 - 0.05 * p); goldPill(g, -230, -44, 460, 88, 'Salin ID dan sandi', 32); g.restore();
  const toast = easeOut(seg(t, 30.5, 30.8)) * (1 - easeOut(seg(t, 32.6, 32.9)));
  if (toast > 0) {
    g.globalAlpha = toast; fillRR(g, SW / 2 - 150, 1000 + 20 * (1 - toast), 300, 72, 36, C.leaf);
    g.fillStyle = C.bg; g.font = JK(800, 30); g.textAlign = 'center'; g.fillText('Tersalin', SW / 2 + 16, 1047 + 20 * (1 - toast));
    g.strokeStyle = C.bg; g.lineWidth = 5; g.beginPath(); g.moveTo(SW / 2 - 104, 1036); g.lineTo(SW / 2 - 92, 1048); g.lineTo(SW / 2 - 70, 1024); g.stroke(); g.globalAlpha = 1;
  }
  const [cx, cy] = cursorAt(t, [[27.0, 600, 1180], [29.9, 470, 920], [30.6, 470, 920], [31.6, 620, 1150]]);
  cursor(g, cx, cy, pressAt(t, [30.45]));
}
function pageLogin(g, t) {
  g.fillStyle = C.bg; g.fillRect(0, 0, SW, SH); header(g, 3, 'Anggota masuk');
  const choose = t < 39.75;
  if (choose) {
    g.textAlign = 'center'; g.fillStyle = C.ivory; g.font = JK(800, 44); g.fillText('Masuk', SW / 2, 400);
    fillRR(g, 90, 470, SW - 180, 88, 44, null, C.goldLine, 2); g.fillStyle = C.sage; g.font = JK(700, 30); g.fillText('Masuk dengan email', SW / 2, 526);
    const p = pressAt(t, [39.55]); g.save(); g.translate(SW / 2, 650); g.scale(1 - 0.05 * p, 1 - 0.05 * p); goldPill(g, -270, -46, 540, 92, 'Masuk dengan ID keluarga', 32); g.restore();
  } else {
    const k = easeOut(seg(t, 39.75, 40.15)); g.save(); g.globalAlpha = k; g.translate(0, 30 * (1 - k));
    g.textAlign = 'left'; g.fillStyle = C.ivory; g.font = JK(800, 40); g.fillText('Masuk dengan ID keluarga', 56, 380);
    field(g, 56, 440, SW - 112, 'ID keluarga', typed('KLG-2417', t, 42.4, 43.3), t < 43.4, t > 41.4 && t < 43.4 && Math.floor(t * 3) % 2 === 0);
    field(g, 56, 590, SW - 112, 'Sandi (contoh)', typed('melati24', t, 43.5, 44.3), t >= 43.4 && t < 44.6, t >= 43.4 && t < 44.5 && Math.floor(t * 3) % 2 === 0);
    const p = pressAt(t, [44.75]); g.save(); g.translate(SW / 2, 800); g.scale(1 - 0.05 * p, 1 - 0.05 * p); goldPill(g, -150, -42, 300, 84, 'Masuk', 32); g.restore();
    g.restore();
    const w = easeOut(seg(t, 44.95, 45.4));
    if (w > 0) {
      g.fillStyle = `rgba(2,8,6,${0.6 * w})`; g.fillRect(0, 0, SW, SH);
      g.save(); g.globalAlpha = w; g.translate(0, 40 * (1 - w)); fillRR(g, 56, 380, SW - 112, 470, 44, C.surface, C.gold);
      g.beginPath(); g.arc(SW / 2, 500, 62, 0, Math.PI * 2); g.fillStyle = C.leaf; g.fill();
      g.strokeStyle = C.bg; g.lineWidth = 10; g.lineCap = 'round'; g.beginPath(); g.moveTo(SW / 2 - 28, 502); g.lineTo(SW / 2 - 6, 524); g.lineTo(SW / 2 + 30, 482); g.stroke(); g.lineCap = 'butt';
      g.textAlign = 'center'; g.fillStyle = C.sage; g.font = JK(700, 26); g.fillText('Selamat datang', SW / 2, 620); g.fillStyle = C.ivory; g.font = '700 74px Amiri'; g.fillText('Aisyah', SW / 2, 706);
      g.fillStyle = C.sage; g.font = JK(600, 24); g.fillText('anggota keluarga KLG-2417 · contoh', SW / 2, 770); g.restore();
    }
    const b = backOut(seg(t, 47.45, 47.8));
    if (t > 47.45) { g.save(); g.globalAlpha = clamp(b); g.translate(SW / 2, 940); g.scale(b, b); fillRR(g, -250, -40, 500, 80, 40, C.bg2, C.gold, 2); g.fillStyle = C.goldLight; g.font = JK(800, 30); g.textAlign = 'center'; g.fillText('Tidak perlu daftar lagi', 0, 11); g.restore(); }
  }
  const [cx, cy] = cursorAt(t, [[37.0, 600, 1180], [39.1, 470, 664], [39.9, 480, 670], [41.3, 470, 530], [43.35, 470, 530], [43.6, 470, 680], [44.5, 460, 808], [45.2, 470, 820], [46.2, 640, 1180]]);
  cursor(g, cx, cy, pressAt(t, [39.55, 41.35, 43.45, 44.75]));
}
function pageShop(g, t) {
  g.fillStyle = C.bg; g.fillRect(0, 0, SW, SH); header(g, 4, 'Belikan paket');
  const pk = [['Paket Umroh A', 'reguler · contoh'], ['Paket Umroh B', 'keluarga · contoh']];
  for (let i = 0; i < 2; i++) {
    const y = 330 + i * 250, sel = i === 0 && t > 52.35;
    fillRR(g, 56, y, SW - 112, 220, 40, C.surface, sel ? C.gold : C.goldLine, sel ? 4 : 2);
    fillRR(g, 92, y + 36, 150, 150, 28, C.surface2); g.strokeStyle = C.gold; g.lineWidth = 3;   // a simple suitcase icon
    rr(g, 120, y + 80, 94, 78, 12); g.stroke(); rr(g, 145, y + 62, 44, 20, 8); g.stroke(); g.beginPath(); g.moveTo(167, y + 92); g.lineTo(167, y + 146); g.stroke();
    g.textAlign = 'left'; g.fillStyle = C.ivory; g.font = JK(800, 38); g.fillText(pk[i][0], 272, y + 100); g.fillStyle = C.sage; g.font = JK(600, 26); g.fillText(pk[i][1], 272, y + 146);
  }
  const op = easeOut(seg(t, 52.5, 52.9)) * (1 - easeInOut(seg(t, 56.3, 56.6)));
  if (op > 0.001) {
    g.fillStyle = `rgba(2,8,6,${0.6 * op})`; g.fillRect(0, 0, SW, SH);
    const y0 = 330 + 500 * (1 - op); fillRR(g, 40, y0, SW - 80, 720, 44, C.surface, C.gold);
    g.textAlign = 'left'; g.fillStyle = C.ivory; g.font = JK(800, 40); g.fillText('Untuk siapa?', 84, y0 + 80); g.fillStyle = C.sage; g.font = JK(600, 24); g.fillText('Paket Umroh A · contoh', 84, y0 + 122);
    for (let i = 0; i < 4; i++) {
      const y = y0 + 160 + i * 100, on = i === 0 && t > 54.85;
      fillRR(g, 84, y, SW - 168, 84, 26, on ? 'rgba(212,175,106,.18)' : C.bg2, on ? C.gold : C.goldLine, on ? 3 : 2);
      g.beginPath(); g.arc(130, y + 42, 16, 0, Math.PI * 2); g.strokeStyle = on ? C.leaf : C.sage; g.lineWidth = 3; g.stroke(); if (on) { g.beginPath(); g.arc(130, y + 42, 9, 0, Math.PI * 2); g.fillStyle = C.leaf; g.fill(); }
      g.fillStyle = C.ivory; g.font = JK(700, 32); g.fillText(NAMES[i], 166, y + 53);
    }
    const p = pressAt(t, [55.85]); g.save(); g.translate(SW / 2, y0 + 640); g.scale(1 - 0.05 * p, 1 - 0.05 * p); goldPill(g, -150, -40, 300, 80, 'Pesan', 32); g.restore();
  }
  const ok = backOut(seg(t, 56.5, 56.9));
  if (t > 56.5) {
    g.save(); g.globalAlpha = clamp(ok); g.translate(0, 40 * (1 - ok)); fillRR(g, 56, 860, SW - 112, 230, 40, C.surface2, C.leaf, 3);
    g.beginPath(); g.arc(130, 975, 36, 0, Math.PI * 2); g.fillStyle = C.leaf; g.fill(); g.strokeStyle = C.bg; g.lineWidth = 7; g.lineCap = 'round'; g.beginPath(); g.moveTo(114, 976); g.lineTo(127, 989); g.lineTo(148, 962); g.stroke(); g.lineCap = 'butt';
    g.textAlign = 'left'; g.fillStyle = C.sage; g.font = JK(700, 24); g.fillText('PESANAN DIBUAT', 192, 950); g.fillStyle = C.ivory; g.font = JK(800, 36); g.fillText('atas nama Aisyah', 192, 998);
    g.fillStyle = C.sage; g.font = JK(600, 22); g.fillText('diatur dari akun kepala keluarga', 192, 1038); g.restore();
  }
  const [cx, cy] = cursorAt(t, [[49.5, 620, 1180], [52.0, 470, 450], [52.7, 470, 450], [54.5, 330, 548], [55.2, 330, 548], [55.65, 380, 1135], [56.2, 380, 1135], [57.4, 640, 1200]]);
  cursor(g, cx, cy, pressAt(t, [52.35, 54.85, 55.85]));
}
function pageDone(g, t) {
  g.fillStyle = C.bg; g.fillRect(0, 0, SW, SH); header(g);
  const rg = g.createRadialGradient(SW / 2, 560, 30, SW / 2, 560, 520); rg.addColorStop(0, 'rgba(140,198,63,.2)'); rg.addColorStop(1, 'rgba(140,198,63,0)'); g.fillStyle = rg; g.fillRect(0, 0, SW, SH);
  const k = backOut(seg(t, 59.0, 59.45));
  g.save(); g.translate(SW / 2, 520); g.scale(k, k); g.beginPath(); g.arc(0, 0, 150, 0, Math.PI * 2); g.fillStyle = C.leaf; g.fill();
  g.strokeStyle = C.bg; g.lineWidth = 26; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(-64, 4); g.lineTo(-16, 52); g.lineTo(70, -44); g.stroke(); g.restore();
  g.textAlign = 'center'; const a = easeOut(seg(t, 59.3, 59.7)); g.globalAlpha = a; goldText(g, 'SELESAI', SW / 2, 820, 120); g.globalAlpha = 1;
  if (t > 60.0) { const b = easeOut(seg(t, 60.0, 60.4)); g.globalAlpha = b; g.fillStyle = C.ivory; g.font = JK(800, 44); g.fillText('Satu akun,', SW / 2, 930); g.fillStyle = C.goldLight; g.font = '84px GreatVibes'; g.globalAlpha = easeOut(seg(t, 61.0, 61.4)); g.fillText('untuk seluruh keluarga', SW / 2, 1030); g.globalAlpha = 1; }
}
function pageCta(g, t) {
  g.fillStyle = C.bg; g.fillRect(0, 0, SW, SH);
  const rg = g.createRadialGradient(SW / 2, 420, 30, SW / 2, 420, 600); rg.addColorStop(0, 'rgba(212,175,106,.22)'); rg.addColorStop(1, 'rgba(212,175,106,0)'); g.fillStyle = rg; g.fillRect(0, 0, SW, SH);
  const k = backOut(seg(t, 62.75, 63.15));
  g.save(); g.translate(SW / 2, 330); g.scale(k, k); g.beginPath(); g.arc(0, 0, 130, 0, Math.PI * 2); g.save(); g.clip(); g.drawImage(logo, -130, -130, 260, 260); g.restore();
  g.strokeStyle = C.gold; g.lineWidth = 5; g.beginPath(); g.arc(0, 0, 134, 0, Math.PI * 2); g.stroke(); g.restore();
  g.textAlign = 'center'; const a = easeOut(seg(t, 63.1, 63.6)); g.globalAlpha = a;
  g.fillStyle = C.goldLight; g.font = '100px GreatVibes'; g.fillText('Rencanakan', SW / 2, 590); goldText(g, 'UMROH', SW / 2, 720, 130); goldText(g, 'SEKELUARGA', SW / 2, 840, 110); g.globalAlpha = 1;
  const b = backOut(seg(t, 65.0, 65.45)), pulse = 1 + 0.05 * Math.exp(-((t - 66.6) ** 2) / 0.05);
  if (t > 65.0) { g.save(); g.translate(SW / 2, 990); g.scale(b * pulse, b * pulse); goldPill(g, -280, -56, 560, 112, 'umroh.h2c.or.id', 44); g.restore(); }
}
const PAGES = [[0, pageHome], [12.45, pageFamily], [26.75, pageSend], [36.45, pageLogin], [49.06, pageShop], [58.95, pageDone], [62.7, pageCta]];
const tmpCanvas = Object.assign(document.createElement('canvas'), { width: SW, height: SH }), tg = tmpCanvas.getContext('2d');
function drawScreen(t) {
  let i = 0; while (i < PAGES.length - 1 && t >= PAGES[i + 1][0]) i++;
  PAGES[i][1](sc, t);
  const k = i > 0 ? easeInOut(seg(t, PAGES[i][0], PAGES[i][0] + 0.35)) : 1;   // new page slides up over the old one
  if (k < 1) { PAGES[i - 1][1](tg, t); sc.save(); sc.globalAlpha = 1; sc.drawImage(tmpCanvas, 0, -60 * k); sc.restore(); PAGES[i][1](tg, t); sc.globalAlpha = k; sc.drawImage(tmpCanvas, 0, 80 * (1 - k)); sc.globalAlpha = 1; }
  sim(sc); screenTex.needsUpdate = true;
}
function drawPhone(t) {
  const g = pc; g.fillStyle = '#0c1411'; g.fillRect(0, 0, PW, PH);
  const on = smooth(seg(t, 32.5, 32.8));
  g.globalAlpha = 0.15 + 0.85 * on;
  g.fillStyle = C.bg2; g.fillRect(0, 0, PW, 96); g.fillStyle = C.ivory; g.font = JK(800, 30); g.textAlign = 'left'; g.fillText('Pesan', 28, 64);
  g.fillStyle = C.sage; g.font = JK(600, 18); g.textAlign = 'right'; g.fillText('Simulasi', PW - 24, 62);
  fillRR(g, 24, 130, 220, 62, 22, '#1d3a2d'); g.fillStyle = C.ivory2; g.font = JK(600, 20); g.textAlign = 'left'; g.fillText('Assalamualaikum', 42, 168);
  const b = backOut(seg(t, 33.9, 34.3));
  if (t > 33.9) {
    g.save(); g.globalAlpha *= clamp(b); g.translate(0, 30 * (1 - b));
    fillRR(g, 70, 230, PW - 94, 250, 26, C.gold); g.fillStyle = C.bg; g.textAlign = 'left';
    g.font = JK(700, 18); g.fillText('ID KELUARGA', 94, 272); g.font = '44px Anton'; g.fillText('KLG-2417', 94, 322);
    g.font = JK(700, 18); g.fillText('SANDI', 94, 366); g.font = JK(800, 32); g.fillText('melati24', 94, 404); g.font = JK(600, 16); g.fillText('contoh', 94, 440);
    const tk = seg(t, 34.5, 34.7); if (tk > 0) { g.strokeStyle = C.bg; g.lineWidth = 4; g.globalAlpha *= tk; g.beginPath(); g.moveTo(PW - 80, 452); g.lineTo(PW - 70, 462); g.lineTo(PW - 52, 442); g.stroke(); g.beginPath(); g.moveTo(PW - 66, 452); g.lineTo(PW - 56, 462); g.lineTo(PW - 38, 442); g.stroke(); }
    g.restore();
  }
  g.globalAlpha = 1; phoneMat.color.setScalar(0.25 + 0.95 * on); phoneTex.needsUpdate = true;
}

// ---------- animation ----------
const lampOn = (t) => (t < 1.0 ? 0 : t < 1.12 ? (Math.floor(t * 60) % 2) * 0.6 : t < 1.2 ? 0.2 : smooth(seg(t, 1.2, 1.4)));
function pose(t) {
  const on = lampOn(t);
  lampLight.intensity = 2.0 * on * (1 + 0.25 * smooth(seg(t, 59.0, 60.0))); bulbMat.color.setScalar(0.12 + 5 * on);
  for (let i = 0; i < 4; i++) {
    const c = cards[i];
    // hook: pop in from frame 0 (grow, squash on landing, settle), 0.2 s apart
    const a = i * 0.2, k = seg(t, a, a + 0.28), sq = 0.16 * spring(t, a + 0.28, 5, 8);
    const s = t < a ? 0.001 : backOut(k, 2.2);
    c.root.scale.set(Math.max(0.001, s * (1 + sq * 0.5)), Math.max(0.001, s * (1 - sq)), Math.max(0.001, s));
    // flip from the blank back to the name when the member is added
    const f = easeInOut(seg(t, ADD[i], ADD[i] + 0.45));
    c.flip.rotation.y = Math.PI * (1 - f); c.flip.position.y = 0.012 + 0.03 * Math.sin(Math.PI * f);
    // step 3: Aisyah lights and moves forward; step 4: slides toward the screen while being chosen; done: all glow and hop
    let z = 0, glow = 0, hop = 0;
    if (i === 0) {
      const fw = easeInOut(seg(t, 45.0, 45.6)) * (1 - easeInOut(seg(t, 48.4, 49.0)));
      const toS = easeInOut(seg(t, 54.85, 55.5)) * (1 - easeInOut(seg(t, 57.6, 58.3)));
      z = 0.06 * fw - 0.06 * toS; glow = Math.max(fw, toS);
    }
    const d = 59.1 + i * 0.12; hop = 0.018 * Math.sin(Math.PI * seg(t, d, d + 0.3)); glow = Math.max(glow, smooth(seg(t, 59.1, 59.6)));
    c.root.position.z = CARD_Z + z; c.root.position.y = hop; c.frontMat.emissiveIntensity = 0.22 * glow;
  }
  for (const [ch, at] of STEPS) {
    const g = numerals[ch], up = backOut(seg(t, at - 0.05, at + 0.3), 2.0), down = easeInOut(seg(t, at + 2.2, at + 2.7));
    g.visible = t > at - 0.05 && t < at + 2.7;
    const s = Math.max(0.001, up * (1 - down)); g.scale.set(s, s, s); g.rotation.y = 0.32 + 0.25 * (1 - clamp(up)) + 0.03 * Math.sin(t * 1.3);
  }
  // phone buzz when the message arrives (small, damped, machine-like)
  phone.position.x = PHONE.x + 0.0015 * spring(t, 33.95, 28, 10);
  for (let i = 0; i < leaves.length; i++) leaves[i].rotation.x = -leaves[i].userData.tilt - 0.04 * Math.sin(t * 1.05 + i * 0.9);
  for (let i = 0; i < DUST; i++) {
    const a = hash(i) * 6.28, s = 0.15 + 0.2 * hash(i + 99);
    dustPos[i * 3] = -0.8 + 1.6 * hash(i + 1) + 0.03 * Math.sin(t * s + a);
    const dir = hash(i + 5) < 0.33 ? -1 : 1;
    dustPos[i * 3 + 1] = 0.03 + 1.0 * hash(i + 2) + (((dir * t * 0.022 * (0.5 + hash(i + 3))) % 0.4) + 0.4) % 0.4;
    dustPos[i * 3 + 2] = -0.46 + 0.3 * hash(i + 4) + 0.03 * Math.cos(t * s * 0.8 + a);
  }
  dustGeo.attributes.position.needsUpdate = true;
  screenGlow.intensity = 0.25;
}

// ---------- camera: one lens; every move is one cubic Bezier with one eased progress value ----------
const camera = new THREE.PerspectiveCamera(40, W / H, 0.02, 30);
const SC = (d, dx = 0.022, dy = -0.04) => ({ eye: V(dx, SCR_Y + dy, SCR_Z + d), look: V(dx, SCR_Y + dy, SCR_Z), focus: SCREEN_CENTER, capY: 1430 });
const P = {
  hookA: { eye: V(0.30, 0.66, 1.78), look: V(0.0, 0.30, 0.0), focus: V(0, 0.3, 0.0) },
  hookB: { eye: V(0.13, 0.55, 1.42), look: V(0.0, 0.31, -0.02), focus: V(0, 0.3, 0.0) },
  wide: { eye: V(-0.06, 0.6, 1.62), look: V(0.0, 0.29, -0.02), focus: V(0, 0.28, 0.0) },
  med: { eye: V(-0.12, 0.42, 1.25), look: V(-0.04, 0.27, 0.0), focus: V(-0.17, 0.12, 0.04), capY: 1420, capX: 655, capW: 420 },   // desk band right of the gold numeral
  scr: SC(1.32, 0.022, -0.075), scr2: SC(1.24, 0.022, -0.07),   // screen sits high: the foot of the frame stays free for captions
  cards: { eye: V(0.06, 0.15, 0.78), look: V(0.0, 0.08, 0.1), focus: V(0, 0.04, 0.13), capY: 730 },
  cards2: { eye: V(-0.04, 0.14, 0.72), look: V(0.0, 0.08, 0.1), focus: V(0, 0.04, 0.13), capY: 730 },
  phone: { eye: V(0.36, 0.33, 0.36), look: V(0.43, 0.0, 0.11), focus: V(0.43, 0.0, 0.12) },
  phone2: { eye: V(0.39, 0.30, 0.33), look: V(0.43, 0.0, 0.11), focus: V(0.43, 0.0, 0.12) },
  medlow: { eye: V(0.08, 0.32, 1.1), look: V(0.0, 0.25, 0.0), focus: V(0, 0.06, 0.1), capY: 1370 },
  cta: SC(1.22, 0.02, -0.02), ctaEnd: SC(1.0, 0.012, -0.03),
};
// [start time, pose]; between two keys the camera travels; a key repeated = hold
const KEYS = [[0, 'hookA'], [7.0, 'hookB'], [11.2, 'wide'], [12.6, 'wide'], [13.3, 'med'], [13.8, 'med'], [15.0, 'scr'], [20.9, 'scr2'], [22.3, 'cards'], [26.3, 'cards2'],
  [27.3, 'med'], [28.6, 'med'], [29.8, 'scr'], [32.5, 'scr2'], [33.7, 'phone'], [36.0, 'phone2'], [37.2, 'med'], [38.4, 'med'], [39.4, 'scr'], [44.8, 'scr2'],
  [45.9, 'medlow'], [48.5, 'medlow'], [49.6, 'med'], [51.0, 'med'], [52.0, 'scr'], [54.6, 'scr2'], [55.4, 'medlow'], [58.4, 'medlow'], [59.6, 'wide'], [62.4, 'wide'],
  [64.0, 'cta'], [69.2, 'ctaEnd'], [70.0, 'ctaEnd']];
let capY = 1430, capX = 480, capW = 800, curPose = 'hookA'; const eye = V(0, 0, 0), look = V(0, 0, 0), focus = V(0, 0, 0), right = V(0, 0, 0), up = V(0, 0, 0), tmp = V(0, 0, 0);
const curve = new THREE.CubicBezierCurve3(V(0, 0, 0), V(0, 0, 0), V(0, 0, 0), V(0, 0, 0));
function camPose(t) {
  let i = 0; while (i < KEYS.length - 2 && t >= KEYS[i + 1][0]) i++;
  const [t0, a] = KEYS[i], [t1, b] = KEYS[i + 1], A = P[a], B = P[b];
  const long = t1 - t0 > 2.5, p = long ? smooth(seg(t, t0, t1)) * 0.0 + seg(t, t0, t1) * 0.15 + smooth(seg(t, t0, t1)) * 0.85 : easeInOut(seg(t, t0, t1));
  // curved path: control points pushed sideways a little (a dolly with a touch of orbit)
  const d = B.eye.clone().sub(A.eye), side = V(-d.z, 0, d.x).normalize().multiplyScalar(d.length() * 0.12);
  curve.v0.copy(A.eye); curve.v3.copy(B.eye);
  curve.v1.copy(A.eye).addScaledVector(d, 0.33).add(side); curve.v2.copy(A.eye).addScaledVector(d, 0.67).add(side);
  if (d.lengthSq() < 1e-8) eye.copy(A.eye); else curve.getPoint(p, eye);
  look.copy(A.look).lerp(B.look, p); focus.copy(A.focus).lerp(B.focus, p); const C0 = p < 0.5 ? A : B; curPose = p < 0.5 ? a : b; capY = C0.capY ?? 236; capX = C0.capX ?? 480; capW = C0.capW ?? 800;   // snap at mid-move: a sliding caption crosses the screen UI
}
function shoot(t, k, n) {
  camPose(t);
  camera.position.copy(eye); camera.up.set(0, 1, 0); camera.lookAt(look); camera.updateMatrixWorld(); camera.updateProjectionMatrix();
  if (n === 1) return;
  const F = eye.distanceTo(focus), lens = clamp(0.0025 + 0.004 * F, 0.003, 0.009);
  const a = Math.sqrt(halton(k + 1, 2)) * lens, b = halton(k + 1, 3) * Math.PI * 2, lx = Math.cos(b) * a, ly = Math.sin(b) * a;
  right.setFromMatrixColumn(camera.matrixWorld, 0); up.setFromMatrixColumn(camera.matrixWorld, 1);
  camera.position.addScaledVector(right, lx).addScaledVector(up, ly); camera.updateMatrixWorld();
  const e = camera.projectionMatrix.elements, jx = halton(k + 1, 5) - 0.5, jy = halton(k + 1, 7) - 0.5;
  e[8] += -e[0] * lx / F + 2 * jx / W; e[9] += -e[5] * ly / F + 2 * jy / H;
  camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
}
function jitterLights(k, n) {
  const s = n > 1 ? 0.05 : 0;
  sun.position.set(SUN_POS.x + (halton(k + 1, 11) - 0.5) * s, SUN_POS.y + (halton(k + 1, 13) - 0.5) * s, SUN_POS.z + (halton(k + 1, 17) - 0.5) * s);
  const h1 = n > 1 ? halton(k + 1, 19) : 0.5, h2 = n > 1 ? halton(k + 1, 23) : 0.3, phi = h2 * Math.PI * 2, c = Math.sqrt(h1), r = Math.sqrt(1 - h1);
  sky.position.set(Math.cos(phi) * r * 4, c * 4 + 0.3, Math.sin(phi) * r * 4 + 1.0);
  bulb.getWorldPosition(lampLight.position); const j = n > 1 ? 0.02 : 0;
  lampLight.position.x += (halton(k + 1, 29) - 0.5) * j; lampLight.position.z += (halton(k + 1, 31) - 0.5) * j;
  lampLight.target.position.set(0.0, 0.03, 0.13);
}

// ---------- captions: kinetic type (motion overlay, not 3D). Big lime words, ivory lead-ins, a brush-hand accent, a lime pill.
// Each phrase sits in a free zone of the camera pose it starts in; "behind" zones tuck the type behind the hero objects
// (monitor, cards, numeral, phone) with a silhouette mask, so nothing that must be seen is covered.
const capCanvas = Object.assign(document.createElement('canvas'), { width: W, height: H }), cg = capCanvas.getContext('2d');
const capTex = new THREE.CanvasTexture(capCanvas); capTex.colorSpace = THREE.SRGBColorSpace; capTex.flipY = true;
const PHR = SUB.potongan;
// m = lead-in (ivory), b = big (lime), h = brush hand (white, tilted, lime squiggle), p = pill (lime, dark text). null = no caption.
const SPEC = [
  'm:umroh|b:sekeluarga?', 'm:cukup|b:satu akun|p:kepala keluarga', 'm:tidak perlu semua|h:daftar sendiri.', 'm:ikuti empat|b:langkahnya|h:ya,',
  'h:Bapak, Ibu.', 'b:pelan-pelan|h:saja.', 'p:langkah satu', 'b:tambah|h:anggota.', 'p:kepala keluarga|m:buka halaman keluarga,',
  'm:lalu isi|b:nama & sandi|m:setiap anggota.', 'm:sandi itu|h:kata rahasia.', 'm:satu akun bisa menampung|m:sampai|b:empat anggota.', 'p:langkah dua',
  'b:kirim|m:ID dan sandinya.', 'm:salin|b:ID keluarga|m:dan sandi anggota,', 'm:lalu kirim lewat|h:WhatsApp.', 'p:langkah tiga', 'm:anggota|b:masuk.',
  'm:pilih masuk dengan|b:ID keluarga,', 'm:lalu ketik|b:ID dan sandi', 'h:yang dikirim tadi.', 'm:tidak perlu|b:daftar lagi.', 'p:langkah empat',
  'b:belikan|h:paket.', 'p:kepala keluarga|m:memilih paket umroh,', 'm:lalu memilih|b:nama anggota|m:yang dibelikan.', 'm:semua diatur dari|b:satu akun.',
  'h:selesai.', 'b:satu akun,', 'm:untuk seluruh|h:keluarga.', null, null, null,   // CTA: the screen already says it
].map((s) => s && s.split('|').map((l) => ({ st: l[0], tx: l.slice(2) })));
// free zone per pose: cx, y (top or bottom edge), scale, max line width, behind = tuck behind hero objects
const ZONE = {
  hookA: { cx: 540, y: 1365, anchor: 'bottom', s: 0.74, maxw: 900, behind: true },
  hookB: { cx: 540, y: 1490, anchor: 'bottom', s: 0.74, maxw: 900, behind: true },
  wide: { cx: 540, y: 1395, anchor: 'bottom', s: 0.72, maxw: 900, behind: true },
  med: { cx: 655, y: 1470, anchor: 'bottom', s: 0.6, maxw: 470, behind: true },
  scr: { cx: 420, y: 1500, anchor: 'bottom', s: 0.56, maxw: 640, behind: false }, scr2: { cx: 420, y: 1500, anchor: 'bottom', s: 0.56, maxw: 640, behind: false },
  cards: { cx: 540, y: 745, anchor: 'top', s: 0.8, maxw: 900, behind: true }, cards2: { cx: 540, y: 745, anchor: 'top', s: 0.8, maxw: 900, behind: true },
  phone: { cx: 540, y: 250, anchor: 'top', s: 0.82, maxw: 900, behind: true }, phone2: { cx: 540, y: 250, anchor: 'top', s: 0.82, maxw: 900, behind: true },
  medlow: { cx: 540, y: 1470, anchor: 'bottom', s: 0.68, maxw: 900, behind: true },
  cta: { cx: 420, y: 1500, anchor: 'bottom', s: 0.56, maxw: 640, behind: false }, ctaEnd: { cx: 420, y: 1500, anchor: 'bottom', s: 0.56, maxw: 640, behind: false },
};
const STY = {
  m: { font: (z) => JK(800, z), size: 66, lead: 0.98, color: C.ivory, track: -0.02 },
  b: { font: (z) => JK(800, z), size: 132, lead: 0.86, color: C.leafLight, track: -0.05 },
  h: { font: (z) => `400 ${z}px Brush`, size: 120, lead: 0.9, color: '#FFFFFF', track: 0 },
  p: { font: (z) => JK(800, z), size: 56, lead: 1.0, color: C.bg, track: -0.01 },
};
let capBehind = 1;
// where the type goes: the desk band between the monitor's lower edge and the card tops (type tucks a little behind
// the cards), right of a gold numeral when one stands there; above the phone; or the empty foot of a screen that fills the frame
const pj = V(0, 0, 0), toPx = (w) => { pj.copy(w).project(camera); return [(pj.x + 1) * W / 2, (1 - pj.y) * H / 2]; };
function bandAt(t) { pose(t); camPose(t); shoot(t, 0, 1);
  return { monB: toPx(V(0, SCR_Y - SCR_H / 2 - 0.011, SCR_Z))[1], cardT: Math.min(...cards.map((c) => toPx(c.board.localToWorld(V(0, CH, 0)))[1])),
    numOn: Object.values(numerals).some((g) => g.visible), phone: curPose.startsWith('phone') }; }
// type and size are fixed per phrase (read at its middle); the band edge is read every frame so the type rides with the set
function zoneFor(p, lines, t) {
  const tm = Math.min(p.mulai + 0.6, (p.mulai + p.selesai) / 2), A = bandAt(tm);
  const h1 = lines.map((l) => lineSize(l, 1, 1e9).h), H1 = h1.reduce((a, b) => a + b, 0), last = lines[lines.length - 1].st;
  const tuck = (last === 'b' || last === 'm' ? 0.1 : 0) * h1[h1.length - 1];
  if (A.phone) { const k = KEYS.find((q) => q[1] === 'phone' && q[0] > p.mulai - 3); return { cx: 540, y: 250, anchor: 'top', s: 1.0, maxw: 900, behind: true, minT: k ? k[0] - 0.25 : 0 }; }
  // cards in frame at any moment of the phrase: the type sits on the cards for the whole phrase (sized for the tightest moment)
  const looks = [p.mulai, tm, p.selesai].map(bandAt).filter((b) => b.cardT < 1560);
  if (looks.length) {
    const numOn = looks.some((b) => b.numOn), cx = numOn ? 660 : 540, maxw = numOn ? 470 : 900;
    let s = 0.95; for (const L of looks) {
      const bot = Math.min(L.cardT, 1500); let k = (bot - Math.max(235, L.monB - 40) + tuck * 0.95) / H1;
      if (k < 0.62) k = (bot - Math.max(235, L.monB - 230) + tuck * 0.95) / H1; s = Math.min(s, k);
    }
    s = Math.max(s, 0.5);
    const B = bandAt(t), y = clamp(Math.min(B.cardT, 1500) + tuck * s, 235 + H1 * s, 1500 + tuck * s);
    return { cx, y, anchor: 'bottom', s, maxw, behind: true };
  }
  return { cx: 440, y: 1495, anchor: 'bottom', s: 0.7, maxw: 700, behind: false };
}

function lineSize(l, s, maxw) {
  const S = STY[l.st]; let z = S.size * s; cg.font = S.font(z); cg.letterSpacing = `${S.track * z}px`;
  let w = cg.measureText(l.tx).width + (l.st === 'p' ? z * 1.1 : 0); if (w > maxw) { z *= maxw / w; w = maxw; }
  return { z, w, h: l.st === 'p' ? z * 1.75 : z * S.lead };
}
function drawCaption(t) {
  cg.clearRect(0, 0, W, H);
  let ci = -1, end = 0;
  for (let i = 0; i < PHR.length; i++) { const p = PHR[i], nx = PHR[i + 1]; const e = Math.min(nx ? nx.mulai - 0.04 : 1e9, p.selesai + 0.45); if (t >= p.mulai - 0.08 && t < e) { ci = i; end = e; } }
  if (ci < 0 || !SPEC[ci] || window.NOCAP) { capTex.needsUpdate = true; return; }
  const p = PHR[ci], lines = SPEC[ci];
  const Z = zoneFor(p, lines, t); capBehind = Z.behind ? 1 : 0; camPose(t);
  const sz = lines.map((l) => lineSize(l, Z.s, Z.maxw)), Ht = sz.reduce((a, b) => a + b.h, 0);
  let y = Z.anchor === 'top' ? Z.y : Z.y - Ht;
  const chars = lines.map((l) => l.tx.length), tot = chars.reduce((a, b) => a + b, 0); let acc = 0;
    lines.forEach((l, i) => {
    const S = STY[l.st], { z, w, h } = sz[i];
    const t0 = Math.max(Z.minT || 0, p.mulai - 0.06) + (acc / tot) * (p.selesai - Math.max(Z.minT || 0, p.mulai)) * 0.85; acc += chars[i];   // phone shots wait for the camera to land
    if (t < t0) { y += h; return; }
    const dx = lines.length > 1 ? (i % 2 ? 1 : -1) * Math.min(36, (Z.maxw - w) * 0.2) * Z.s : 0, cx = Z.cx + dx;
    const fl = Math.sin(t * 1.3 + i * 1.7) * 2.5 * Z.s;   // a slow breath so held type is never frozen
    cg.save(); cg.font = S.font(z); cg.letterSpacing = `${S.track * z}px`; cg.textBaseline = 'alphabetic'; cg.textAlign = 'left';
    cg.shadowColor = 'rgba(0,0,0,.6)'; cg.shadowBlur = 28 * Z.s; cg.shadowOffsetY = 6 * Z.s;
    const ex = (j) => seg(t, end - 0.3 + j * 0.03, end - 0.08 + j * 0.03);   // exit: words drift up and soften, one after another
    if (l.st === 'b' || l.st === 'm') {
      // words land one by one: rise, settle with a little spring, sharpen out of a soft blur
      const words = l.tx.split(' '), sp = cg.measureText(' ').width; let x = cx - w / 2;
      const base = y + h * 0.8 + fl;
      words.forEach((wd, j) => {
        const ww = cg.measureText(wd).width, k = seg(t, t0 + j * 0.07, t0 + j * 0.07 + (l.st === 'b' ? 0.42 : 0.32)), o = ex(j);
        if (k > 0) {
          const e = l.st === 'b' ? backOut(k) : easeOut(k), sc = 0.9 + 0.1 * e, blur = (1 - easeOut(k)) * 10 * Z.s + o * 8 * Z.s;
          cg.save(); cg.globalAlpha = Math.min(1, k * 1.8) * (1 - o); if (blur > 0.3) cg.filter = `blur(${blur.toFixed(1)}px)`;
          cg.translate(x + ww / 2, base + (1 - e) * 34 * Z.s - o * 20 * Z.s); cg.scale(sc, sc); cg.fillStyle = S.color; cg.fillText(wd, -ww / 2, 0); cg.restore();
        }
        x += ww + sp;
      });
    } else if (l.st === 'h') {
      // brush hand writes itself left to right, then a lime squiggle underlines it
      const k = seg(t, t0, t0 + 0.55), o = ex(0); cg.globalAlpha = 1 - o; if (o > 0) cg.filter = `blur(${(o * 8 * Z.s).toFixed(1)}px)`;
      cg.translate(cx, y + h * 0.68 + fl - o * 20 * Z.s); cg.rotate(-0.06);
      cg.save(); cg.beginPath(); cg.rect(-w / 2 - 30, -z * 1.3, (w + 60) * easeInOut(k), z * 1.8); cg.clip(); cg.fillStyle = S.color; cg.fillText(l.tx, -w / 2, 0); cg.restore();
      const u = seg(t, t0 + 0.4, t0 + 0.8); if (u > 0) {
        cg.shadowBlur = 0; cg.strokeStyle = C.leafLight; cg.lineWidth = 7 * Z.s; cg.lineCap = 'round'; cg.beginPath();
        const x0 = -w * 0.44, x1 = x0 + w * 0.88 * easeOut(u);
        for (let x = x0; x <= x1; x += 6) cg.lineTo(x, z * 0.22 + Math.sin((x - x0) / (w * 0.88) * Math.PI * 2.2) * 5 * Z.s);
        cg.stroke();
      }
    } else if (l.st === 'p') {
      // pill pops with a spring, its label slides in a beat later
      const k = seg(t, t0, t0 + 0.4), q = seg(t, t0 + 0.12, t0 + 0.4), o = ex(0), e = backOut(k), ph = z * 1.6, pw = w * (0.75 + 0.25 * e);
      cg.globalAlpha = Math.min(1, k * 2) * (1 - o); cg.translate(cx, y + h / 2 + fl - o * 20 * Z.s); cg.rotate(-0.035); cg.scale(0.7 + 0.3 * e, 0.7 + 0.3 * e);
      fillRR(cg, -pw / 2, -ph / 2, pw, ph, ph / 2, C.leafLight);
      cg.shadowColor = 'transparent'; cg.globalAlpha *= q; cg.fillStyle = S.color; cg.textBaseline = 'middle'; cg.textAlign = 'center'; cg.fillText(l.tx, (1 - easeOut(q)) * 14, 2);
    }
    cg.restore(); y += h;
  });
  cg.letterSpacing = '0px';
  capTex.needsUpdate = true;
}

// ---------- post ----------
const vert = 'varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }';
const addPass = new FullScreenQuad(new THREE.ShaderMaterial({ uniforms: { tex: { value: null }, w: { value: 1 } }, vertexShader: vert,
  fragmentShader: 'uniform sampler2D tex; uniform float w; varying vec2 vUv; void main() { gl_FragColor = vec4(texture2D(tex, vUv).rgb * w, 1.0); }',
  blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneFactor, blendEquation: THREE.AddEquation, depthTest: false, depthWrite: false, transparent: true }));
const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), 0.18, 0.4, 0.92);
const grade = new FullScreenQuad(new THREE.ShaderMaterial({ uniforms: { tex: { value: accum.texture }, cap: { value: capTex }, occ: { value: null }, behind: { value: 1 }, showOcc: { value: 0 }, seed: { value: 0 }, exposure: { value: 1 } }, vertexShader: vert,
  fragmentShader: `uniform sampler2D tex, cap, occ; uniform float seed, exposure, behind, showOcc; varying vec2 vUv;
    float h(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233)) + seed) * 43758.5453); }
    vec3 aces(vec3 x) { return clamp(x * (2.51 * x + 0.03) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0); }
    vec3 srgb(vec3 c) { return mix(c * 12.92, 1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c)); }
    void main() {
      vec2 d = vUv - 0.5; float ca = dot(d, d) * 0.006;
      vec3 c = vec3(texture2D(tex, vUv + d * ca).r, texture2D(tex, vUv).g, texture2D(tex, vUv - d * ca).b) * exposure;
      c = aces(c);
      c *= mix(1.0, 0.62, smoothstep(0.35, 0.95, length(d * vec2(0.8, 1.0)) * 1.45));
      c = srgb(c);
      c += (h(vUv * 1000.0) - 0.5) * 0.025 * (1.0 - 0.55 * dot(c, vec3(0.33)));
      vec4 k = texture2D(cap, vUv) * (1.0 - behind * texture2D(occ, vUv).r); c = c * (1.0 - k.a) + k.rgb;
      c = mix(c, vec3(1.0, 0.0, 0.0), showOcc * 0.5 * texture2D(occ, vUv).r);
      gl_FragColor = vec4(c, 1.0); }`, depthTest: false, depthWrite: false }));
capTex.premultiplyAlpha = true;

const occRT = new THREE.WebGLRenderTarget(W / 2, H / 2, { samples: 4 }), occMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
function renderOcc(t) {   // silhouette of the hero objects at t (sharp, no jitter)
  pose(t); shoot(t, 0, 1); camera.layers.set(1); scene.overrideMaterial = occMat; const bg = scene.background; scene.background = new THREE.Color(0x000000);
  const su = renderer.shadowMap.autoUpdate; renderer.shadowMap.autoUpdate = false;
  renderer.setRenderTarget(occRT); renderer.render(scene, camera);
  renderer.shadowMap.autoUpdate = su; scene.background = bg; scene.overrideMaterial = null; camera.layers.set(0);
}
// motion blur without ghosts: enough sub-frames that no point moves more than ~2 px between two of them
const probe = [V(0, SCR_Y, SCR_Z), V(-SCR_W / 2, SCR_Y + SCR_H / 2, SCR_Z), V(SCR_W / 2, SCR_Y - SCR_H / 2, SCR_Z), PHONE.clone()], pv = V(0, 0, 0);
function shotPts(ts) {
  pose(ts); shoot(ts, 0, 1); const pts = [];
  const add2 = (w) => { pv.copy(w).project(camera); pts.push([(pv.x + 1) * W / 2, (1 - pv.y) * H / 2]); };
  probe.forEach(add2); for (const c of cards) add2(c.board.localToWorld(V(0, CH, 0)));
  for (const g of Object.values(numerals)) if (g.visible) add2(g.localToWorld(V(0, 0.2, 0)));
  return pts;
}
const NMAX = 40, STEP_PX = 2.0;
export function renderAt(t, n = 1) {
  drawScreen(t); drawPhone(t); drawCaption(t); renderOcc(t);
  grade.material.uniforms.occ.value = occRT.texture; grade.material.uniforms.behind.value = capBehind; grade.material.uniforms.showOcc.value = window.SHOWOCC ? 1 : 0;
  let shut = SHUTTER;
  if (n > 1) {
    const a = shotPts(t - SHUTTER / 2), b = shotPts(t + SHUTTER / 2); let D = 0;
    for (let i = 0; i < Math.min(a.length, b.length); i++) D = Math.max(D, Math.hypot(a[i][0] - b[i][0], a[i][1] - b[i][1]));
    const need = Math.ceil(D / STEP_PX); if (need > NMAX) shut *= NMAX * STEP_PX / D; n = clamp(Math.max(n, need), n, NMAX);
    window.__lastN = n;
  }
  renderer.setRenderTarget(accum); renderer.setClearColor(0x000000, 1); renderer.clear();
  for (let k = 0; k < n; k++) {
    const ts = n === 1 ? t : t + ((k + 0.5) / n - 0.5) * shut;
    pose(ts); shoot(ts, k, n); jitterLights(k, n);
    renderer.setRenderTarget(rt); renderer.render(scene, camera);
    addPass.material.uniforms.tex.value = rt.texture; addPass.material.uniforms.w.value = 1 / n;
    renderer.setRenderTarget(accum); renderer.autoClear = false; addPass.render(renderer); renderer.autoClear = true;
  }
  bloom.render(renderer, accum, accum, 0, false);
  grade.material.uniforms.seed.value = (t * 30) % 97;
  grade.material.uniforms.exposure.value = 1.0 * (0.35 + 0.65 * smooth(seg(t, 0, 0.2))) * (1 - smooth(seg(t, total - 0.35, total)));
  renderer.setRenderTarget(null); grade.render(renderer);
}
window.renderAt = renderAt; window.total = total;
