import React from 'react';
import {interpolate} from 'remotion';
import {clamp, ease} from '../../components/motion';
import {leafRadius, T, TF} from '../../brands/tams-consulting/theme';
import {Ikon, IkonNama} from './Ikon';
import {CX, P} from './layout';

const ITEMS = ['1 · PERAWATAN JENAZAH', '2 · UTANG', '3 · WASIAT', '4 · WARIS'];
const TOPS = [440, 580, 720, 860];
const IKON: IkonNama[] = ['kain', 'tagihan', 'amplop', 'rumah'];

// Empat label berurutan, tiga arang lalu satu oranye; tampil saat kata-katanya diucapkan.
export const Daftar: React.FC<{f: number}> = ({f}) => {
  const out = interpolate(f, [P.listOut, P.listOut + 10], [1, 0], {...clamp, easing: ease});
  if (f < P.list[0] - 2 || out <= 0) return null;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: out}}>
      {ITEMS.map((txt, i) => {
        const p = interpolate(f, [P.list[i], P.list[i] + 12], [0, 1], {...clamp, easing: ease});
        const lineP = i === 0 ? 0 : p;
        const last = i === 3;
        return (
          <React.Fragment key={i}>
            {i > 0 ? <div style={{position: 'absolute', left: CX - 2, top: TOPS[i] - 44, width: 4, height: 44 * lineP, background: T.line2}} /> : null}
            <div
              style={{
                position: 'absolute',
                left: CX - 330,
                top: TOPS[i],
                width: 660,
                height: 96,
                borderRadius: leafRadius(40),
                background: last ? T.orange : T.charcoal,
                color: T.onDark,
                fontFamily: TF.head,
                fontWeight: 800,
                fontSize: 32,
                letterSpacing: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 22,
                opacity: p,
                transform: `translateY(${(1 - p) * 22}px)`,
              }}
            >
              <Ikon nama={IKON[i]} size={76} a={last ? T.charcoal : '#848484'} />
              <span>{txt}</span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
