import React from 'react';
import {useCurrentFrame} from 'remotion';
import {AppScreenUmum} from '../../components/AppScreenUmum';
import {U_SCENES} from '../../data/timeline-a2-umum';

// 12,5–15,6 dtk: chat dibalas dan diberi label otomatis, badge 97 -> 0.
export const InboxScene: React.FC = () => {
  const f = useCurrentFrame() + U_SCENES.inbox.from;
  return <AppScreenUmum f={f} />;
};
