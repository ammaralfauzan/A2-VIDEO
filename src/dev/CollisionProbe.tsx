import React from 'react';
import {continueRender, delayRender, getInputProps, useCurrentFrame, useVideoConfig} from 'remotion';

// Probe pemeriksa tabrakan (dipakai scripts/check-collisions.mjs). Hanya aktif bila inputProps.collisionProbe = true,
// jadi render video biasa tidak berubah. Mengukur kotak teks sungguhan di Chromium pada frame yang sedang dirender
// dan mencetak hasilnya ke console dengan awalan CC_REPORT; skrip membacanya lewat onBrowserLog.

type Box = {x: number; y: number; w: number; h: number};
type Item = Box & {text: string};

const effectiveOpacity = (el: Element | null) => {
  let o = 1;
  for (let e = el; e; e = e.parentElement) {
    const s = getComputedStyle(e);
    o *= parseFloat(s.opacity || '1');
    if (s.visibility === 'hidden' || s.display === 'none') return 0;
  }
  return o;
};

const collect = (root: Element): Item[] => {
  const items: Item[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const text = (n.textContent ?? '').trim();
    if (!text) continue;
    if (effectiveOpacity(n.parentElement) < 0.45) continue; // sedang memudar: bukan tabrakan nyata
    const range = document.createRange();
    range.selectNode(n);
    const r = range.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    // Kotak baris lebih tinggi dari tinta huruf (line-height); pakai ±70% tengahnya agar baris yang rapat tidak dianggap bertabrakan.
    items.push({text: text.slice(0, 40), x: r.left, y: r.top + r.height * 0.15, w: r.width, h: r.height * 0.7});
  }
  return items;
};

const inter = (a: Box, b: Box) => {
  const w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
  const h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
  return w > 0 && h > 0 ? w * h : 0;
};

export const withProbe = <P extends object>(Component: React.ComponentType<P>): React.FC<P> => {
  const Wrapped: React.FC<P> = (props) => {
    const frame = useCurrentFrame();
    const {width, height} = useVideoConfig();
    const ref = React.useRef<HTMLDivElement>(null);
    const on = Boolean((getInputProps() as {collisionProbe?: boolean}).collisionProbe);
    const [handle] = React.useState(() => (on ? delayRender('collision probe') : null));

    React.useEffect(() => {
      if (!on || handle === null || !ref.current) return;
      const root = ref.current;
      let cancelled = false;
      (async () => {
        await document.fonts.ready;
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        await new Promise((r) => setTimeout(r, 120));
        if (cancelled) return;
        const cfg = (getInputProps() as {probeConfig?: {safe?: Box | null; protect?: (Box & {name: string})[]}}).probeConfig ?? {};
        const items = collect(root);
        const issues: {kind: string; detail: string}[] = [];
        for (let i = 0; i < items.length; i++) {
          for (let j = i + 1; j < items.length; j++) {
            const a = items[i];
            const b = items[j];
            const area = inter(a, b);
            const small = Math.min(a.w * a.h, b.w * b.h);
            if (area > 0.12 * small && area > 60) issues.push({kind: 'teks-menimpa-teks', detail: `"${a.text}" x "${b.text}"`});
          }
        }
        const safe = cfg.safe;
        if (safe) {
          for (const it of items) {
            if (it.x < safe.x - 1 || it.y < safe.y - 1 || it.x + it.w > safe.x + safe.w + 1 || it.y + it.h > safe.y + safe.h + 1) {
              issues.push({kind: 'di-luar-area-aman', detail: `"${it.text}" (${Math.round(it.x)},${Math.round(it.y)} ${Math.round(it.w)}x${Math.round(it.h)})`});
            }
          }
        }
        for (const p of cfg.protect ?? []) {
          for (const it of items) {
            if (inter(it, p) > 0.1 * it.w * it.h) issues.push({kind: 'menutup-area-terlindungi', detail: `"${it.text}" menutup ${p.name}`});
          }
        }
        // eslint-disable-next-line no-console
        console.log('CC_REPORT ' + JSON.stringify({frame, width, height, texts: items.length, issues}));
        continueRender(handle);
      })();
      return () => {
        cancelled = true;
      };
    }, [on, handle, frame, width, height]);

    return (
      <div ref={ref} style={{display: 'contents'}}>
        <Component {...props} />
      </div>
    );
  };
  return Wrapped;
};
