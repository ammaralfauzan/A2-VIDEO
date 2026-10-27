import React from 'react';
import {useCurrentFrame} from 'remotion';
import {MessyDesktop} from '../components/MessyDesktop';
import {SCENES} from '../data/timeline';

// 0–3 dtk: desktop penuh jendela, badge chat naik 12 -> 37 -> 84, jam 21.07.
export const HookScene: React.FC = () => {
  const f = useCurrentFrame() + SCENES.hook.from;
  return <MessyDesktop f={f} />;
};
