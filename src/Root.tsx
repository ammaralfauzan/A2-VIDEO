import React from 'react';
import {Composition, staticFile} from 'remotion';
import {loadFont} from '@remotion/fonts';
import {A2Umum} from './A2Umum';
import {Main} from './Main';
import {U_TOTAL_FRAMES} from './data/timeline-a2-umum';
import {V_HEIGHT, V_WIDTH} from './components/Vertical';
import {A2Umum916, JamSembilanMalam916} from './Vertical916';
import {SatuPesanan} from './SatuPesanan';
import {TOTAL_FRAMES as SP_TOTAL_FRAMES} from './data/timeline-satu-pesanan';
import {TOTAL_FRAMES} from './data/timeline';
import {FPS, HEIGHT, WIDTH} from './theme';

for (const weight of ['400', '500', '600']) {
  loadFont({family: 'Geist', url: staticFile(`fonts/geist-sans-latin-${weight}-normal.woff2`), weight});
}

export const Root: React.FC = () => (
  <>
    <Composition id="JamSembilanMalam" component={Main} durationInFrames={TOTAL_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="A2Umum" component={A2Umum} durationInFrames={U_TOTAL_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    {/* Versi 9:16 untuk Reels/TikTok/Shorts (safeGuide: tampilkan area aman saat review). */}
    <Composition
      id="JamSembilanMalam916"
      component={JamSembilanMalam916}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={V_WIDTH}
      height={V_HEIGHT}
      defaultProps={{safeGuide: false}}
    />
    <Composition
      id="A2Umum916"
      component={A2Umum916}
      durationInFrames={U_TOTAL_FRAMES}
      fps={FPS}
      width={V_WIDTH}
      height={V_HEIGHT}
      defaultProps={{safeGuide: false}}
    />
    {/* "Satu Pesanan, Tujuh Langkah": explainer 9:16 dengan maskot Gigi. */}
    <Composition id="SatuPesanan" component={SatuPesanan} durationInFrames={SP_TOTAL_FRAMES} fps={FPS} width={V_WIDTH} height={V_HEIGHT} />
  </>
);
