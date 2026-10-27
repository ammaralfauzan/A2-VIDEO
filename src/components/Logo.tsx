import React from 'react';
import {Img, staticFile} from 'remotion';
import {color} from '../theme';

// File logo asli 1254x1254 (salinan identik dari asset/logo/). Tidak di-crop atau diwarnai ulang.
const SRC_SIZE = 1254;
// Baris tagline di file asli (piksel sumber), dipakai untuk efek reveal huruf per huruf.
const TAGLINE = {x0: 176, x1: 1080, y0: 884, y1: 916};

// Isi logo berada di x 14.5–85.7% dan y 23.1–72.5% dari file; mask hanya menyentuh area kosong.
const EDGE_MASK =
  'linear-gradient(to right, transparent 2%, black 12%, black 88%, transparent 98%), linear-gradient(to bottom, transparent 6%, black 20%, black 76%, transparent 92%)';

type Props = {size: number; taglineReveal?: number; style?: React.CSSProperties};

export const Logo: React.FC<Props> = ({size, taglineReveal = 1, style}) => {
  const k = size / SRC_SIZE;
  const coverLeft = TAGLINE.x0 + (TAGLINE.x1 - TAGLINE.x0) * taglineReveal;
  return (
    <div style={{position: 'relative', width: size, height: size, ...style}}>
      <Img
        src={staticFile('logo/a2-automation.png')}
        style={{
          width: size,
          height: size,
          display: 'block',
          // Hanya margin kosong file yang dipudarkan agar tepi kotak gambar tidak terlihat.
          WebkitMaskImage: EDGE_MASK,
          WebkitMaskComposite: 'source-in',
          maskImage: EDGE_MASK,
          maskComposite: 'intersect',
        }}
      />
      {taglineReveal < 1 ? (
        // Penutup sewarna kertas logo yang bergeser ke kanan; logonya sendiri tidak diubah.
        <div
          style={{
            position: 'absolute',
            left: coverLeft * k,
            top: TAGLINE.y0 * k,
            width: (TAGLINE.x1 - coverLeft) * k,
            height: (TAGLINE.y1 - TAGLINE.y0) * k,
            background: color.logoPaper,
          }}
        />
      ) : null}
    </div>
  );
};
