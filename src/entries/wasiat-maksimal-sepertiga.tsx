// Entry satu video: memuat hanya "Kenapa Wasiat Dibatasi Sepertiga?" agar render/cek tidak ikut gagal
// bila data video lain sedang rusak. Pakai: REMOTION_ENTRY=src/entries/wasiat-maksimal-sepertiga.tsx
import React from 'react';
import {Composition, registerRoot, staticFile} from 'remotion';
import {loadFont} from '@remotion/fonts';
import {withProbe} from '../dev/CollisionProbe';
import {V_HEIGHT, V_WIDTH} from '../components/Vertical';
import {FPS} from '../theme';
import {WasiatMaksimalSepertiga} from '../WasiatMaksimalSepertiga';
import {TOTAL_FRAMES} from '../data/timeline-wasiat-maksimal-sepertiga';

loadFont({family: 'Montserrat', url: staticFile('fonts/montserrat-latin.woff2'), weight: '100 900'});
const PWasiat = withProbe(WasiatMaksimalSepertiga);

const Root: React.FC = () => (
  <Composition id="WasiatMaksimalSepertiga" component={PWasiat} durationInFrames={TOTAL_FRAMES} fps={FPS} width={V_WIDTH} height={V_HEIGHT} defaultProps={{safeGuide: false}} />
);
registerRoot(Root);
