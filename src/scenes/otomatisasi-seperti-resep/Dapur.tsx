import React from 'react';
import {interpolate} from 'remotion';
import {clamp, ease, sp} from '../../components/motion';
import {color, font, radius, shadow} from '../../theme';
import {IconBowl, IconNoodle, IconSachet, IconWater, Pot, RecipeCard, StepMi, StepPour, StepWait} from './art';
import {brollOn} from './Broll';
import {P} from './layout';

// Panggung ilustrasi garis (y 580–1010): panci + kartu resep, tiga bahan, tiga langkah, alur sendiri
// (panci memudar), kartu kosong bertanda tanya. Tiap blok keluar sebelum blok berikutnya masuk.
const pop = (f: number, at: number): React.CSSProperties => {
  const p = sp(f, at, 14);
  return {opacity: interpolate(p, [0, 0.5], [0, 1], clamp), transform: `translateY(${(1 - p) * 16}px) scale(${0.94 + 0.06 * p})`, filter: `blur(${(1 - p) * 6}px)`};
};
const fadeBetween = (f: number, a: number, b: number) => interpolate(f, [a, a + 8, b, b + 8], [0, 1, 1, 0], clamp);

const Abs: React.FC<{left: number; top: number; style?: React.CSSProperties; children: React.ReactNode}> = ({left, top, style, children}) => (
  <div style={{position: 'absolute', left, top, ...style}}>{children}</div>
);

export const Dapur: React.FC<{f: number; end: number}> = ({f, end}) => {
  const on = 1 - brollOn(f);
  const potVis = interpolate(f, [P.potDraw, P.potDraw + 4, P.stageOut1, P.stageOut1 + 8], [0, 1, 1, 0], clamp);
  const shiftP = interpolate(f, [P.potShift, P.potShift + 14], [0, 1], {...clamp, easing: ease});
  const boil = interpolate(f, [P.bubbles, P.bubbles + 20], [0, 1], clamp);
  const mark = interpolate(f, [P.bolt, P.bolt + 8], [0, 1], clamp);
  const ghost = interpolate(f, [P.ghost, P.ghost + 12, P.ghostOut, P.ghostOut + 20], [0, 0.32, 0.32, 0], clamp);
  const ingr = fadeBetween(f, P.ingr[0] - 4, P.flyBahan - 8);
  const cards = fadeBetween(f, P.dataCards - 4, P.stageOut2 - 8);
  const steps = fadeBetween(f, P.steps[0] - 4, P.flyLangkah - 8);
  const ask = f >= P.ask && f < end ? 1 : 0;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: on}}>
      {/* panci + kartu resep */}
      {potVis > 0 ? (
        <div style={{opacity: potVis}}>
          <Abs left={300} top={608} style={{transform: `translateX(${-215 * shiftP}px) scale(${1 - 0.14 * shiftP})`}}>
            <Pot t={f - P.potDraw} clock={f} boil={boil} width={480} />
          </Abs>
          {f >= P.cardIn ? (
            <Abs left={565} top={630} style={pop(f, P.cardIn)}>
              <RecipeCard t={f - P.cardIn} marks={[mark, 0, 0]} />
            </Abs>
          ) : null}
        </div>
      ) : null}

      {/* tiga bahan */}
      {ingr > 0 ? (
        <div style={{opacity: ingr}}>
          <Abs left={230} top={670} style={pop(f, P.ingr[0])}><IconNoodle p={interpolate(f, [P.ingr[0], P.ingr[0] + 14], [0, 1], clamp)} size={170} /></Abs>
          <Abs left={455} top={670} style={pop(f, P.ingr[1])}><IconSachet p={interpolate(f, [P.ingr[1], P.ingr[1] + 14], [0, 1], clamp)} size={170} /></Abs>
          <Abs left={680} top={670} style={pop(f, P.ingr[2])}><IconWater p={interpolate(f, [P.ingr[2], P.ingr[2] + 14], [0, 1], clamp)} size={170} /></Abs>
          <Abs left={340} top={890} style={pop(f, P.ingr[2] + 6)}><IconBowl p={interpolate(f, [P.ingr[2] + 6, P.ingr[2] + 22], [0, 1], clamp)} size={400} /></Abs>
        </div>
      ) : null}

      {/* bahan = data (contoh) */}
      {cards > 0 ? (
        <div style={{opacity: cards}}>
          <Abs left={330} top={602} style={{...pop(f, P.dataCards)}}>
            <div style={{fontFamily: font.family, fontSize: 28, fontWeight: 500, color: color.muted, padding: '6px 22px', border: `2px solid ${color.line}`, borderRadius: radius.pill, background: color.surface}}>contoh</div>
          </Abs>
          {['Nama pelanggan', 'Pesanan', 'Tanggal'].map((t, i) => (
            <Abs key={t} left={290} top={684 + i * 104} style={pop(f, P.dataCards + 4 + i * 8)}>
              <div
                style={{
                  width: 500,
                  height: 80,
                  borderRadius: radius.card,
                  background: color.surface,
                  border: `2px solid ${color.line}`,
                  boxShadow: shadow,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 28px',
                  gap: 18,
                  fontFamily: font.family,
                  fontSize: 34,
                  fontWeight: 500,
                  color: color.navy,
                }}
              >
                <div style={{width: 14, height: 14, borderRadius: 7, background: color.blue1}} />
                {t}
              </div>
            </Abs>
          ))}
        </div>
      ) : null}

      {/* tiga langkah */}
      {steps > 0 ? (
        <div style={{opacity: steps}}>
          {[StepMi, StepWait, StepPour].map((C, i) => (
            <Abs key={i} left={190 + i * 240} top={670} style={pop(f, P.steps[i])}>
              <C p={interpolate(f, [P.steps[i], P.steps[i] + 16], [0, 1], clamp)} size={170} />
              <div style={{position: 'absolute', left: 64, top: 182, width: 42, height: 42, borderRadius: 21, border: `3px solid ${color.navy}`, color: color.navy, fontFamily: font.family, fontWeight: 600, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', background: color.surface}}>{i + 1}</div>
            </Abs>
          ))}
          {[0, 1].map((i) => (
            <Abs key={i} left={360 + i * 240} top={740} style={pop(f, P.steps[i + 1] - 4)}>
              <svg width={70} height={30} viewBox="0 0 70 30"><path d="M6 15 H60 M48 5 L60 15 L48 25" fill="none" stroke={color.muted} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Abs>
          ))}
        </div>
      ) : null}

      {/* dapur memudar di bawah alur */}
      {ghost > 0 ? (
        <Abs left={390} top={868} style={{opacity: ghost}}>
          <Pot t={60} clock={f} boil={1} width={300} />
        </Abs>
      ) : null}

      {/* kartu kosong bertanda tanya */}
      {ask ? (
        <Abs left={390} top={600} style={pop(f, P.ask)}>
          <div
            style={{
              width: 300,
              height: 380,
              borderRadius: radius.card,
              background: color.surface,
              border: `3px dashed ${color.navy}`,
              boxShadow: shadow,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: font.family,
              fontWeight: 600,
              fontSize: 200,
              color: color.navy,
            }}
          >
            ?
          </div>
        </Abs>
      ) : null}
    </div>
  );
};
