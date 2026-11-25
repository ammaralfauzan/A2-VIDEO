import React from 'react';
import {interpolate} from 'remotion';
import {clamp} from '../../components/motion';
import {Batang, Txt} from './Batang';
import {Arch, At, Badge, Barrier, Books, Bowl, C, Coins, Envelope, GoldStack, GREY, House, Jar, L, MoonWindow, Nightstand, O, Parcel, bob, pop} from './Ilustrasi';
import {P, STAGE} from './layout';

// Panggung ilustrasi (x 180–900, y 620–1190): satu adegan benda per bagian cerita, bergantian
// (lama memudar 8 frame, baru masuk dengan pegas). Koordinat SVG: x 0 = tengah layar (540), y 0 = layar 620.
type Scene = {from: number; render: (f: number) => React.ReactNode};

const SCENES: Scene[] = [
  {
    // Hook: semua harta (rumah, emas, koin) dan surat wasiat; "jangan" = tanda silang + getar.
    from: 0,
    render: (f) => {
      const sh = f >= P.jangan && f < P.jangan + 16 ? Math.sin((f - P.jangan) * 1.5) * 12 * (1 - (f - P.jangan) / 16) : 0;
      const x = pop(f, P.jangan - 2);
      return (
        <g transform={`translate(${sh} 0)`}>
          <At x={-200} y={430 + bob(f, 0, 3)} s={1.05 * pop(f, 6)}>
            <House lit={0.6} />
          </At>
          <At x={190} y={400} s={pop(f, 12)}>
            <GoldStack />
          </At>
          <At x={300} y={470 + bob(f, 1.2, 3)} s={0.9 * pop(f, 18)}>
            <Coins n={5} />
          </At>
          <At x={-10} y={560 + bob(f, 2.4, 4)} s={1.1 * pop(f, 26)}>
            <Envelope label="SURAT WASIAT" />
          </At>
          {x > 0 ? (
            <At x={112} y={392} s={1.2 * x}>
              <Badge ok={false} />
            </At>
          ) : null}
        </g>
      );
    },
  },
  {
    // Sa'd sakit keras: kamar sunyi malam hari (jendela bulan, meja samping, lampu menyala, gelas air, obat).
    from: P.cardSad,
    render: (f) => (
      <>
        <At x={150} y={250} s={pop(f, P.cardSad + 6)}>
          <MoonWindow />
        </At>
        <At x={-10} y={548} s={pop(f, P.cardSad + 2)}>
          <Nightstand f={f} glow={L(f, P.cardSad + 10, P.cardSad + 40)} />
        </At>
      </>
    ),
  },
  {from: P.mSeluruh - 6, render: (f) => <Batang f={f} v={1} />},
  {
    // Berkecukupan (toples penuh koin) lebih baik daripada miskin (mangkuk kosong).
    from: P.cardBanding,
    render: (f) => {
      const a = pop(f, P.cardBanding + 2);
      const b = pop(f, P.miskin - 12);
      return (
        <>
          <At x={-180} y={470 + bob(f, 0, 3)} s={a}>
            <Jar fill={L(f, P.cukup - 4, P.cukup + 34)} />
          </At>
          <At x={-100} y={250} s={1.1 * pop(f, P.cukup + 6)}>
            <Badge ok />
          </At>
          <Txt x={-180} y={540} c={O} o={L(f, P.cukup, P.cukup + 10)}>
            BERKECUKUPAN
          </Txt>
          <Txt x={0} y={360} c={GREY} size={44} o={L(f, P.cukup + 8, P.cukup + 18)}>
            {'>'}
          </Txt>
          <At x={180} y={470 + bob(f, 1.5, 3)} s={b} o={Math.min(1, b)}>
            <Bowl />
          </At>
          <At x={260} y={300} s={1.1 * pop(f, P.miskin + 2)}>
            <Badge ok={false} />
          </At>
          <Txt x={180} y={540} c={C} o={L(f, P.miskin, P.miskin + 10)}>
            MEMINTA-MINTA
          </Txt>
        </>
      );
    },
  },
  {
    // Sumber: kitab Bukhari dan Muslim di rak.
    from: P.cardSumber1,
    render: (f) => (
      <At x={0} y={520} s={1}>
        <Books a={pop(f, P.cardSumber1 + 4)} b={pop(f, P.cardSumber1 + 10)} open={Math.min(1, pop(f, P.cardSumber1 + 18))} />
      </At>
    ),
  },
  {from: P.reset, render: (f) => <Batang f={f} v={2} />},
  {
    // Tidak ada wasiat untuk ahli waris: panah dari surat wasiat ke rumah ahli waris, ditahan palang oranye.
    from: P.cardLarang,
    render: (f) => {
      const ar = L(f, P.arrow, P.arrow + 18);
      const drop = pop(f, P.block);
      const len = 300;
      return (
        <>
          <At x={-235} y={430 + bob(f, 0, 3)} s={0.95 * pop(f, P.cardLarang + 2)}>
            <Envelope label="WASIAT" />
          </At>
          <Txt x={-235} y={500} c={O} o={L(f, P.cardLarang + 8, P.cardLarang + 18)}>
            WASIAT
          </Txt>
          <At x={240} y={430} s={0.9 * pop(f, P.cardLarang + 8)}>
            <House lit={1} />
          </At>
          <Txt x={240} y={500} c={C} o={L(f, P.cardLarang + 14, P.cardLarang + 24)}>
            AHLI WARIS
          </Txt>
          <path d="M-150 240 Q0 150 150 240" fill="none" stroke={C} strokeWidth={8} strokeLinecap="round" strokeDasharray={`${len * ar} ${len}`} />
          {ar > 0.95 ? <path d="M128 214 L152 242 L118 250" fill="none" stroke={C} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" /> : null}
          {drop > 0 ? (
            <At x={0} y={330 - (1 - Math.min(1, drop)) * 120} s={0.72} o={Math.min(1, drop * 1.5)}>
              <Barrier />
            </At>
          ) : null}
        </>
      );
    },
  },
  {
    // Bagian ahli waris sudah ditetapkan: rumah dan tiga bingkisan bersegel, masing-masing dicentang.
    from: P.cardBagian,
    render: (f) => (
      <>
        <At x={0} y={330} s={0.95 * pop(f, P.cardBagian + 2)}>
          <House lit={1} />
        </At>
        {[-220, 0, 220].map((x, i) => (
          <React.Fragment key={x}>
            <At x={x} y={540} s={pop(f, P.cardBagian + 8 + i * 5)}>
              <Parcel w={130} h={100} />
            </At>
            <At x={x + 62} y={420} s={pop(f, P.badge + i * 4)}>
              <Badge ok r={24} />
            </At>
          </React.Fragment>
        ))}
      </>
    ),
  },
  {
    // Penutup: rumah dinaungi lengkung oranye (batas yang menjaga keluarga).
    from: P.stageOut,
    render: (f) => (
      <>
        <At x={0} y={330} s={1.05 * pop(f, P.stageOut + 2)}>
          <Arch p={L(f, P.headline + 4, P.headline + 34)} />
          <House lit={L(f, P.headline + 20, P.headline + 40)} />
        </At>
      </>
    ),
  },
];

export const Panggung: React.FC<{f: number}> = ({f}) => (
  <svg width={STAGE.w} height={STAGE.h} viewBox={`${-STAGE.w / 2} 0 ${STAGE.w} ${STAGE.h}`} style={{position: 'absolute', left: STAGE.x, top: STAGE.y, overflow: 'visible'}}>
    {SCENES.map((sc, i) => {
      const end = i + 1 < SCENES.length ? SCENES[i + 1].from : Infinity;
      if (f < sc.from || f >= end) return null;
      const o = Number.isFinite(end) ? interpolate(f, [end - 8, end], [1, 0], clamp) : 1;
      return (
        <g key={i} opacity={o}>
          {sc.render(f)}
        </g>
      );
    })}
  </svg>
);
