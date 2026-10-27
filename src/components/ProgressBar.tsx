import React from 'react';
import {color, gradient, radius} from '../theme';

export const ProgressBar: React.FC<{value: number; width: number}> = ({value, width}) => (
  <div style={{width, height: 16, borderRadius: radius.pill, background: color.line, overflow: 'hidden'}}>
    <div style={{width: width * Math.max(0, Math.min(1, value)), height: 16, borderRadius: radius.pill, background: gradient}} />
  </div>
);
