import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {continueRender, delayRender, IFrame, staticFile} from 'remotion';

// Halaman web umroh.h2c.or.id dirender dari HTML + CSS + font asli situs (scripts/situs-h2c-halaman.py),
// di dalam iframe selebar layar HP (390 px CSS). Gulir dan perubahan isi (ketik, pilih, tambah jamaah) dilakukan
// per frame lewat `ubah`; petunjuk (cincin sorot, titik ketuk, riak) digambar di atas elemen aslinya.

// CSS per halaman, urutan sama dengan tag <link> di situs.
const css = (...h: string[]) => h.map((x) => staticFile(`brands/h2c-umroh/situs/css/${x}.css`));
const CSS_AKUN = css('63066817b6a7ab5c', '79b873eb8dc4c36f', '46f6f95cee69285b');
const CSS_HALAMAN: Record<string, string[]> = {
  'beranda.html': css('63066817b6a7ab5c', '79b873eb8dc4c36f', '1368617af6f30593', 'd149f7770a5d0df4'),
  'masuk.html': css('63066817b6a7ab5c', '79b873eb8dc4c36f', '46f6f95cee69285b', 'dd37f9a5e4d57ad8'),
};
const CLS = '__variable_1bdae5 __variable_64a611 __variable_78724b __variable_3c58c0 __variable_c8e612 __variable_353f1a';
const EXTRA = `
html,body{margin:0;background:#0a1f17;scrollbar-width:none}
html{scroll-behavior:auto!important}
::-webkit-scrollbar{display:none}
*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}
.hero-in,.hero-pop{opacity:1!important;transform:none!important}
.hero-top{background-image:none!important}
.sensor{filter:blur(6px)}
#__petunjuk{position:fixed;inset:0;pointer-events:none;z-index:2147483647}
`;

const cache: Record<string, string> = {};

export type Petunjuk = {
  sel: string; // pemilih CSS elemen asli
  nth?: number; // indeks bila pemilih cocok dengan beberapa elemen
  ring?: number; // 0..1 cincin sorot emas
  tekan?: number; // 0..1 titik ketuk tampil
  pres?: number; // 0..1 sedang ditekan (mengecil)
  riak?: number; // 0..1 riak sesudah ketuk (0 = tidak ada)
  dx?: number; // titik ketuk digeser dari tengah (px CSS)
  dy?: number;
};

export const Situs: React.FC<{
  page: string;
  top: number;
  height: number;
  ubah?: (doc: Document) => void;
  petunjuk?: Petunjuk[];
  // gulir menuju elemen: posisi = top*(1-mix) + (puncak elemen - off)*mix
  ke?: {sel: string; off: number; mix: number};
}> = ({page, top, height, ubah, petunjuk = [], ke}) => {
  const [html, setHtml] = useState<string | null>(cache[page] ?? null);
  const [handle] = useState(() => (cache[page] ? null : delayRender(`halaman ${page}`)));
  const [fontHandle] = useState(() => delayRender(`font ${page}`));
  const ref = useRef<HTMLIFrameElement>(null);
  const [siap, setSiap] = useState(false);
  const dilepas = useRef(false);

  useEffect(() => {
    if (cache[page]) return;
    fetch(staticFile(`brands/h2c-umroh/situs/halaman/${page}`))
      .then((r) => r.text())
      .then((t) => {
        cache[page] = t.replace(/(src|href)="\/img\//g, `$1="${staticFile('brands/h2c-umroh/situs/img/')}`);
        setHtml(cache[page]);
        if (handle !== null) continueRender(handle);
      });
  }, [page, handle]);

  const srcDoc = html
    ? `<!doctype html><html lang="id" class="${CLS}"><head><meta charset="utf-8"><meta name="viewport" content="width=390">${(CSS_HALAMAN[page] ?? CSS_AKUN).map((c) => `<link rel="stylesheet" href="${c}">`).join('')}<style>${EXTRA}</style></head><body>${html}<div id="__petunjuk"></div></body></html>`
    : undefined;

  const onLoad = () => {
    const doc = ref.current?.contentDocument;
    if (!doc) return;
    doc.fonts.ready.then(() => setSiap(true));
  };

  useLayoutEffect(() => {
    const doc = ref.current?.contentDocument;
    if (!siap || !doc) return;
    ubah?.(doc);
    const win = doc.defaultView as Window;
    let y = top;
    const el = ke ? (doc.querySelector(ke.sel) as HTMLElement | null) : null;
    if (ke && el) y = top * (1 - ke.mix) + (el.getBoundingClientRect().top + win.scrollY - ke.off) * ke.mix;
    win.scrollTo({top: Math.max(0, y), behavior: 'instant' as ScrollBehavior});
    gambar(doc, petunjuk);
    // frame baru boleh diambil setelah gulir + perubahan + petunjuk benar-benar diterapkan
    if (!dilepas.current) {
      dilepas.current = true;
      continueRender(fontHandle);
    }
  });

  if (!srcDoc) return null;
  return <IFrame ref={ref} srcDoc={srcDoc} onLoad={onLoad} style={{width: 390, height, border: 0, display: 'block', background: '#0a1f17'}} />;
};

const EMAS = '#D4AF6A';
const gambar = (doc: Document, list: Petunjuk[]) => {
  const box = doc.getElementById('__petunjuk');
  if (!box) return;
  box.innerHTML = '';
  for (const h of list) {
    const el = doc.querySelectorAll(h.sel)[h.nth ?? 0] as HTMLElement | undefined;
    if (!el) continue;
    const r = el.getBoundingClientRect();
    const rad = parseFloat(doc.defaultView?.getComputedStyle(el).borderRadius || '12') || 12;
    if ((h.ring ?? 0) > 0.01) {
      const d = doc.createElement('div');
      const p = h.ring as number;
      Object.assign(d.style, {
        position: 'absolute',
        left: `${r.left - 5}px`,
        top: `${r.top - 5}px`,
        width: `${r.width + 10}px`,
        height: `${r.height + 10}px`,
        borderRadius: `${Math.min(rad + 5, 999)}px`,
        border: `2.5px solid ${EMAS}`,
        boxShadow: `0 0 0 ${6 * p}px rgba(212,175,106,${0.25 * p}), 0 0 24px rgba(212,175,106,${0.35 * p})`,
        opacity: String(p),
        boxSizing: 'border-box',
      });
      box.appendChild(d);
    }
    const cx = r.left + r.width / 2 + (h.dx ?? 0);
    const cy = r.top + r.height / 2 + (h.dy ?? 0);
    if ((h.riak ?? 0) > 0 && (h.riak as number) < 1) {
      const q = h.riak as number;
      const d = doc.createElement('div');
      Object.assign(d.style, {position: 'absolute', left: `${cx - 26}px`, top: `${cy - 26}px`, width: '52px', height: '52px', borderRadius: '50%', border: `3px solid ${EMAS}`, transform: `scale(${0.3 + q * 1.1})`, opacity: String(1 - q), boxSizing: 'border-box'});
      box.appendChild(d);
    }
    if ((h.tekan ?? 0) > 0.01) {
      const d = doc.createElement('div');
      Object.assign(d.style, {position: 'absolute', left: `${cx - 13}px`, top: `${cy - 13}px`, width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(227,199,140,.92)', border: '2.5px solid #FFF8EA', boxShadow: '0 4px 12px rgba(0,0,0,.45)', opacity: String(h.tekan), transform: `scale(${1 - 0.25 * (h.pres ?? 0)})`, boxSizing: 'border-box'});
      box.appendChild(d);
    }
  }
};
