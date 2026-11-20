import React from 'react';
import {interpolate} from 'remotion';
import {clamp, ease} from '../../components/motion';
import {T, TF} from '../../brands/tams-consulting/theme';
import {CX, P} from './layout';
import {IconKind, MiniIcon} from './Ilustrasi';

const ITEMS = ['1 · PERAWATAN JENAZAH', '2 · UTANG', '3 · WASIAT', '4 · WARIS'];
const TOPS = [440, 580, 720, 860];
const ICONS: IconKind[] = ['kafan', 'utang', 'wasiat', 'rumah'];
const ROW_W = 680;

// Empat label berurutan, tiga arang lalu satu oranye, masing-masing dengan ikon bendanya; ditengahkan di x 540.
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
                left: CX - ROW_W / 2,
                top: TOPS[i],
                width: ROW_W,
                height: 96,
                borderRadius: 48,
                background: last ? T.orange : T.charcoal,
                color: T.onDark,
                fontFamily: TF.head,
                fontWeight: 800,
                fontSize: 32,
                letterSpacing: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: p,
                transform: `translateY(${(1 - p) * 22}px)`,
              }}
            >
              <svg width={64} height={64} viewBox="0 0 100 100" style={{position: 'absolute', left: 22, top: 16}}>
                <circle cx={50} cy={50} r={50} fill={T.bg} />
                <g transform="translate(12 12) scale(0.76)">
                  <MiniIcon kind={ICONS[i]} />
                </g>
              </svg>
              <span style={{paddingLeft: 60}}>{txt}</span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
