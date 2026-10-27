import React from 'react';
import {useCurrentFrame} from 'remotion';
import {MessyDesktopUmum} from '../../components/MessyDesktopUmum';
import {U_SCENES} from '../../data/timeline-a2-umum';

// 0–3,7 dtk: desktop penuh jendela, badge inbox 12 -> 48 -> 97, jam 21.30.
export const HookScene: React.FC = () => {
  const f = useCurrentFrame() + U_SCENES.hook.from;
  return <MessyDesktopUmum f={f} />;
};
