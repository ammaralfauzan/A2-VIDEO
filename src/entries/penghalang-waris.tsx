// Entry satu video: memuat hanya "Hubungan Darah Belum Tentu Cukup" agar render/cek tidak ikut gagal
// bila data video lain sedang rusak. Pakai: REMOTION_ENTRY=src/entries/penghalang-waris.tsx
import React from 'react';
import {Composition, registerRoot, staticFile} from 'remotion';
import {loadFont} from '@remotion/fonts';
import {withProbe} from '../dev/CollisionProbe';
import {V_HEIGHT, V_WIDTH} from '../components/Vertical';
import {FPS} from '../theme';
import {PenghalangWaris} from '../PenghalangWaris';
import {TOTAL_FRAMES} from '../data/timeline-penghalang-waris';

loadFont({family: 'Montserrat', url: staticFile('fonts/montserrat-latin.woff2'), weight: '100 900'});
const PPenghalang = withProbe(PenghalangWaris);

const Root: React.FC = () => (
  <Composition id="PenghalangWaris" component={PPenghalang} durationInFrames={TOTAL_FRAMES} fps={FPS} width={V_WIDTH} height={V_HEIGHT} defaultProps={{safeGuide: false}} />
);
registerRoot(Root);
