import React from 'react';
import {Composition, staticFile} from 'remotion';
import {loadFont} from '@remotion/fonts';
import {A2Umum} from './A2Umum';
import {Main} from './Main';
import {U_TOTAL_FRAMES} from './data/timeline-a2-umum';
import {TOTAL_FRAMES} from './data/timeline';
import {FPS, HEIGHT, WIDTH} from './theme';

for (const weight of ['400', '500', '600']) {
  loadFont({family: 'Geist', url: staticFile(`fonts/geist-sans-latin-${weight}-normal.woff2`), weight});
}

export const Root: React.FC = () => (
  <>
    <Composition id="JamSembilanMalam" component={Main} durationInFrames={TOTAL_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="A2Umum" component={A2Umum} durationInFrames={U_TOTAL_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
  </>
);
