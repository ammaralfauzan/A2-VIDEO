import React from 'react';
import {useCurrentFrame} from 'remotion';
import {AppScreenUmum} from '../../components/AppScreenUmum';
import {U_SCENES} from '../../data/timeline-a2-umum';

// 20,7–23,6 dtk: tab cair Sekolah -> Klinik -> UKM, isi dashboard berganti.
export const IndustriScene: React.FC = () => {
  const f = useCurrentFrame() + U_SCENES.industri.from;
  return <AppScreenUmum f={f} />;
};
