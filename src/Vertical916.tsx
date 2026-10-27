import React from 'react';
import {A2UmumStage} from './A2Umum';
import {T} from './components/AppScreen';
import {UT} from './components/AppScreenUmum';
import {CameraKey, VerticalConfig, VerticalVideo} from './components/Vertical';
import {CAPTIONS} from './data/timeline';
import {U_CAPTIONS, U_CLOCK, U_OUTRO} from './data/timeline-a2-umum';
import {MainStage} from './Main';

// Kamera: (x, y) titik stage 1920x1080 yang diletakkan di pusat fokus layar, z = zoom.
// Zoom 0,87 memperlihatkan seluruh area konten aplikasi (x 628–1592) di dalam lebar aman 840 px;
// kamera bergeser ke sidebar (x 760) setiap kali kursor mengklik menu.
const WIDE = {y: 470, z: 0.6};
const content = (f: number): CameraKey => ({f, x: 1110, y: 470, z: 0.87});
const sidebar = (f: number): CameraKey => ({f, x: 760, y: 470, z: 0.87});

const JAM9_CAMERA: CameraKey[] = [
  {f: 0, x: 960, y: 480, z: 0.55},
  {f: 100, x: 960, y: 480, z: 0.55},
  // Masalah: ikuti kursor antara rekap nilai dan chat
  {f: 116, x: 600, y: 420, z: 0.82},
  {f: 146, x: 600, y: 420, z: 0.82},
  {f: 163, x: 1290, y: 420, z: 0.82},
  {f: 240, x: 1290, y: 420, z: 0.82},
  {f: 257, x: 600, y: 420, z: 0.82},
  {f: 276, x: 600, y: 420, z: 0.82},
  {f: 293, x: 1290, y: 420, z: 0.82},
  {f: 312, x: 1290, y: 420, z: 0.82},
  // Titik balik: lebar untuk jendela tersedot, lalu zoom ke Otomatiskan
  {f: 330, x: 960, ...WIDE},
  {f: 344, x: 960, ...WIDE},
  content(360),
  content(553),
  sidebar(566),
  sidebar(576),
  content(590),
  content(636),
  sidebar(646),
  sidebar(654),
  content(668),
  content(712),
  {f: 730, x: 960, ...WIDE},
];

const A2UMUM_CAMERA: CameraKey[] = [
  {f: 0, x: 960, y: 490, z: 0.55},
  {f: 110, x: 960, y: 490, z: 0.55},
  // Masalah: chat -> seret invoice (lebar) -> spreadsheet
  {f: 127, x: 1300, y: 420, z: 0.82},
  {f: 160, x: 1300, y: 420, z: 0.82},
  {f: 176, x: 860, y: 540, z: 0.72},
  {f: 202, x: 860, y: 540, z: 0.72},
  {f: 216, x: 560, y: 420, z: 0.82},
  {f: 278, x: 560, y: 420, z: 0.82},
  {f: 296, x: 960, ...WIDE},
  {f: 312, x: 960, ...WIDE},
  content(328),
  // Tahan sampai status "Otomatis" terlihat, baru geser ke menu Pesan.
  content(369),
  sidebar(379),
  sidebar(386),
  content(398),
  content(460),
  sidebar(469),
  sidebar(476),
  content(490),
  content(534),
  sidebar(543),
  sidebar(550),
  content(562),
  content(614),
  sidebar(622),
  sidebar(628),
  content(644),
  content(700),
  {f: 718, x: 960, ...WIDE},
];

const JAM9: VerticalConfig = {
  Stage: MainStage,
  audio: 'audio/vo.mp3',
  captions: CAPTIONS,
  camera: JAM9_CAMERA,
  island: {start: T.island, end: T.islandEnd, text: '32 rapor terkirim'},
  empati: {small: 'Kami tidak mengganti tim Anda.', smallAt: 727, big: 'Memberi mereka waktu pulang.', bigAt: 786, out: [832, 844]},
  outro: {logoIn: 846, tagline: [856, 884], pillIn: 900},
  toWhite: [830, 844],
};

const A2UMUM: VerticalConfig = {
  Stage: A2UmumStage,
  audio: 'audio/vo-a2-umum.mp3',
  captions: U_CAPTIONS,
  camera: A2UMUM_CAMERA,
  clock: U_CLOCK,
  island: {start: UT.island, end: UT.islandEnd, text: '128 tagihan terkirim'},
  empati: {small: 'Kami tidak mengganti tim Anda.', smallAt: 712, big: 'Waktu untuk yang lebih penting.', bigAt: 767, out: [848, 860]},
  outro: U_OUTRO,
  toWhite: [846, 860],
};

export type VerticalProps = {safeGuide?: boolean};

export const JamSembilanMalam916: React.FC<VerticalProps> = ({safeGuide}) => <VerticalVideo config={JAM9} safeGuide={safeGuide} />;
export const A2Umum916: React.FC<VerticalProps> = ({safeGuide}) => <VerticalVideo config={A2UMUM} safeGuide={safeGuide} />;
