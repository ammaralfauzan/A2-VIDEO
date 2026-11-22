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
import {GigiSheet, GigiSheet3D} from './dev/GigiSheet';
import {TOTAL_FRAMES as SP_TOTAL_FRAMES} from './data/timeline-satu-pesanan';
import {TOTAL_FRAMES} from './data/timeline';
import {FPS, HEIGHT, WIDTH} from './theme';
import {withProbe} from './dev/CollisionProbe';
import {Konveksi3D, KONVEKSI_FRAMES} from './Konveksi3D';
import {AlasanSayaBikinA2} from './AlasanSayaBikinA2';
import {TOTAL_FRAMES as ASB_TOTAL_FRAMES} from './data/timeline-alasan-saya-bikin-a2';
import {TigaSalahKaprah} from './TigaSalahKaprah';
import {TOTAL_FRAMES as TSK_TOTAL_FRAMES} from './data/timeline-tiga-salah-kaprah-otomatisasi';
import {OtomatisasiResep} from './OtomatisasiResep';
import {TOTAL_FRAMES as OSR_TOTAL_FRAMES} from './data/timeline-otomatisasi-seperti-resep';
import {TigaHalSebelumWaris} from './TigaHalSebelumWaris';
import {TOTAL_FRAMES as TH_TOTAL_FRAMES} from './data/timeline-tiga-hal-sebelum-waris-dibagi';
import {ManualTemplateOtomatis} from './ManualTemplateOtomatis';
import {TOTAL_FRAMES as MTO_TOTAL_FRAMES} from './data/timeline-manual-template-otomatis';
import {DaftarDanMasukH2C} from './DaftarDanMasukH2C';
import {TOTAL_FRAMES as DMH_TOTAL_FRAMES} from './data/timeline-daftar-dan-masuk-h2c';
import {BrandSample as TamsBrandSample} from './brands/tams-consulting/BrandSample';
import {BrandSample as H2cUmrohBrandSample} from './brands/h2c-umroh/BrandSample';

// Dibungkus probe pemeriksa tabrakan (aktif hanya lewat scripts/check-collisions.mjs).
const PMain = withProbe(Main);
const PA2Umum = withProbe(A2Umum);
const PJam916 = withProbe(JamSembilanMalam916);
const PA2Umum916 = withProbe(A2Umum916);
const PSatuPesanan = withProbe(SatuPesanan);
const PTipsUmroh = withProbe(TipsUmroh);
const PKonveksi3D = withProbe(Konveksi3D);
const PAlasanSayaBikinA2 = withProbe(AlasanSayaBikinA2);
const PTigaSalahKaprah = withProbe(TigaSalahKaprah);
const POtomatisasiResep = withProbe(OtomatisasiResep);
const PTigaHal = withProbe(TigaHalSebelumWaris);
const PManualTemplateOtomatis = withProbe(ManualTemplateOtomatis);
const PDaftarDanMasukH2C = withProbe(DaftarDanMasukH2C);

for (const weight of ['400', '500', '600']) {
  loadFont({family: 'Geist', url: staticFile(`fonts/geist-sans-latin-${weight}-normal.woff2`), weight});
}
// Fon situs Wakaf H2C (untuk TipsUmroh): Fraunces (judul), Outfit (UI), Plus Jakarta Sans (teks).
loadFont({family: 'Fraunces', url: staticFile('fonts/fraunces-latin-normal.woff2'), weight: '600', style: 'normal'});
loadFont({family: 'Fraunces', url: staticFile('fonts/fraunces-latin-italic.woff2'), weight: '500 600', style: 'italic'});
loadFont({family: 'Outfit', url: staticFile('fonts/outfit-latin.woff2'), weight: '400 700'});
loadFont({family: 'Plus Jakarta Sans', url: staticFile('fonts/plus-jakarta-sans-latin.woff2'), weight: '400 700'});
// Fon Tams Consulting (Brand Kit): Montserrat.
loadFont({family: 'Montserrat', url: staticFile('fonts/montserrat-latin.woff2'), weight: '100 900'});
// Fon H2C Umroh (Brand Kit, dari situs umroh): Great Vibes (skrip), Anton (judul kapital), Amiri (judul serif).
loadFont({family: 'Great Vibes', url: staticFile('fonts/great-vibes-latin.woff2'), weight: '400'});
loadFont({family: 'Anton', url: staticFile('fonts/anton-latin.woff2'), weight: '400'});
loadFont({family: 'Amiri', url: staticFile('fonts/amiri-latin-700.woff2'), weight: '700'});

export const Root: React.FC = () => (
  <>
    {/* Frame contoh Brand Kit Tams Consulting (disetujui Bos 20 Nov 2026). */}
    <Composition id="TamsBrandSample" component={TamsBrandSample} durationInFrames={1} fps={30} width={1080} height={1920} />
    {/* Frame contoh Brand Kit H2C Umroh (disetujui Bos 22 Nov 2026). */}
    <Composition id="H2cUmrohBrandSample" component={H2cUmrohBrandSample} durationInFrames={1} fps={30} width={1080} height={1920} />
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
    <Composition id="GigiSheet3D" component={GigiSheet3D} durationInFrames={1} fps={FPS} width={1400} height={820} />
    {/* "Satu Pesanan, Tujuh Langkah": explainer 9:16 dengan maskot Gigi. */}
    <Composition id="SatuPesanan" component={PSatuPesanan} durationInFrames={SP_TOTAL_FRAMES} fps={FPS} width={V_WIDTH} height={V_HEIGHT} />
    {/* "5 Hal Sebelum Daftar Umroh": video bicara + motion graphic gaya situs Wakaf H2C. */}
    <Composition id="TipsUmroh" component={PTipsUmroh} durationInFrames={TU_TOTAL_FRAMES} fps={FPS} width={V_WIDTH} height={V_HEIGHT} />
    {/* "Alasan Saya Bikin A2": cerita asal 9:16, garis waktu + teks kinetik + Gigi, tanpa ajakan. */}
    <Composition id="AlasanSayaBikinA2" component={PAlasanSayaBikinA2} durationInFrames={ASB_TOTAL_FRAMES} fps={FPS} width={V_WIDTH} height={V_HEIGHT} defaultProps={{safeGuide: false}} />
    {/* "Tiga Salah Kaprah soal Otomatisasi": kartu MITOS dibalik jadi FAKTA, teks kinetik, Gigi presisi, ajakan halus. */}
    <Composition id="TigaSalahKaprah" component={PTigaSalahKaprah} durationInFrames={TSK_TOTAL_FRAMES} fps={FPS} width={V_WIDTH} height={V_HEIGHT} defaultProps={{safeGuide: false}} />
    {/* "Otomatisasi Itu Seperti Resep": ilustrasi garis dapur bermorf jadi alur kerja + B-roll, 9:16, tanpa Gigi. */}
    <Composition id="OtomatisasiSepertiResep" component={POtomatisasiResep} durationInFrames={OSR_TOTAL_FRAMES} fps={FPS} width={V_WIDTH} height={V_HEIGHT} defaultProps={{safeGuide: false}} />
    {/* "Tiga Hal Sebelum Waris Dibagi" (Tams Consulting): blok harta melewati tiga gerbang, 9:16, tanpa ajakan. */}
    <Composition id="TigaHalSebelumWaris" component={PTigaHal} durationInFrames={TH_TOTAL_FRAMES} fps={FPS} width={V_WIDTH} height={V_HEIGHT} defaultProps={{safeGuide: false}} />
    {/* "Manual, Template, atau Otomatis?": tangga tiga tingkat + contoh tugas marketing digital, Gigi naik, 9:16. */}
    <Composition id="ManualTemplateOtomatis" component={PManualTemplateOtomatis} durationInFrames={MTO_TOTAL_FRAMES} fps={FPS} width={V_WIDTH} height={V_HEIGHT} defaultProps={{safeGuide: false}} />
    {/* "Daftar dan Masuk Akun H2C": replika web umroh H2C + kursor manusiawi, brand H2C Umroh, 9:16. */}
    <Composition id="DaftarDanMasukH2C" component={PDaftarDanMasukH2C} durationInFrames={DMH_TOTAL_FRAMES} fps={FPS} width={V_WIDTH} height={V_HEIGHT} defaultProps={{safeGuide: false}} />
  </>
);
