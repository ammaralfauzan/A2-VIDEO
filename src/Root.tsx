import React from 'react';
import {Composition, staticFile} from 'remotion';
import {loadFont} from '@remotion/fonts';
import {A2Umum} from './A2Umum';
import {Main} from './Main';
import {U_TOTAL_FRAMES} from './data/timeline-a2-umum';
import {V_HEIGHT, V_WIDTH} from './components/Vertical';
import {A2Umum916, JamSembilanMalam916} from './Vertical916';
import {SatuPesanan} from './SatuPesanan';
import {TipsUmroh} from './TipsUmroh';
import {TOTAL_FRAMES as TU_TOTAL_FRAMES} from './tips-umroh/timeline';
import {GigiSheet} from './dev/GigiSheet';
import {TOTAL_FRAMES as SP_TOTAL_FRAMES} from './data/timeline-satu-pesanan';
import {TOTAL_FRAMES} from './data/timeline';
import {FPS, HEIGHT, WIDTH} from './theme';
import {withProbe} from './dev/CollisionProbe';
import {Konveksi3D, KONVEKSI_FRAMES} from './Konveksi3D';

// Dibungkus probe pemeriksa tabrakan (aktif hanya lewat scripts/check-collisions.mjs).
const PMain = withProbe(Main);
const PA2Umum = withProbe(A2Umum);
const PJam916 = withProbe(JamSembilanMalam916);
const PA2Umum916 = withProbe(A2Umum916);
const PSatuPesanan = withProbe(SatuPesanan);
const PTipsUmroh = withProbe(TipsUmroh);
const PKonveksi3D = withProbe(Konveksi3D);

for (const weight of ['400', '500', '600']) {
  loadFont({family: 'Geist', url: staticFile(`fonts/geist-sans-latin-${weight}-normal.woff2`), weight});
}
// Fon situs Wakaf H2C (untuk TipsUmroh): Fraunces (judul), Outfit (UI), Plus Jakarta Sans (teks).
loadFont({family: 'Fraunces', url: staticFile('fonts/fraunces-latin-normal.woff2'), weight: '600', style: 'normal'});
loadFont({family: 'Fraunces', url: staticFile('fonts/fraunces-latin-italic.woff2'), weight: '500 600', style: 'italic'});
loadFont({family: 'Outfit', url: staticFile('fonts/outfit-latin.woff2'), weight: '400 700'});
loadFont({family: 'Plus Jakarta Sans', url: staticFile('fonts/plus-jakarta-sans-latin.woff2'), weight: '400 700'});

export const Root: React.FC = () => (
  <>
    <Composition id="Konveksi3D" component={PKonveksi3D} durationInFrames={KONVEKSI_FRAMES} fps={30} width={1080} height={1920} defaultProps={{preview:false,safeGuide:false}} />
    <Composition id="JamSembilanMalam" component={PMain} durationInFrames={TOTAL_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="A2Umum" component={PA2Umum} durationInFrames={U_TOTAL_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    {/* Versi 9:16 untuk Reels/TikTok/Shorts (safeGuide: tampilkan area aman saat review). */}
    <Composition
      id="JamSembilanMalam916"
      component={PJam916}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={V_WIDTH}
      height={V_HEIGHT}
      defaultProps={{safeGuide: false}}
    />
    <Composition
      id="A2Umum916"
      component={PA2Umum916}
      durationInFrames={U_TOTAL_FRAMES}
      fps={FPS}
      width={V_WIDTH}
      height={V_HEIGHT}
      defaultProps={{safeGuide: false}}
    />
    {/* Lembar ekspresi maskot untuk review. */}
    <Composition id="GigiSheet" component={GigiSheet} durationInFrames={1} fps={FPS} width={1400} height={820} />
    {/* "Satu Pesanan, Tujuh Langkah": explainer 9:16 dengan maskot Gigi. */}
    <Composition id="SatuPesanan" component={PSatuPesanan} durationInFrames={SP_TOTAL_FRAMES} fps={FPS} width={V_WIDTH} height={V_HEIGHT} />
    {/* "5 Hal Sebelum Daftar Umroh": video bicara + motion graphic gaya situs Wakaf H2C. */}
    <Composition id="TipsUmroh" component={PTipsUmroh} durationInFrames={TU_TOTAL_FRAMES} fps={FPS} width={V_WIDTH} height={V_HEIGHT} />
  </>
);
