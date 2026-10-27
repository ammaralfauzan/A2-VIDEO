import React from 'react';
import {useCurrentFrame} from 'remotion';
import {AppScreenUmum} from '../../components/AppScreenUmum';
import {U_SCENES} from '../../data/timeline-a2-umum';

// 18,1–20,7 dtk: grafik penjualan menggambar diri, tooltip mengikuti kursor, jam 07.00.
export const LaporanScene: React.FC = () => {
  const f = useCurrentFrame() + U_SCENES.laporan.from;
  return <AppScreenUmum f={f} />;
};
