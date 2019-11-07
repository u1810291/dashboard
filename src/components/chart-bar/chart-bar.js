import React from 'react';

const HEIGHT_MIN = 2;
const RADIUS = 2;

export function ChartBar({ height, y, ...props }) {
  return (
    <rect
      rx={RADIUS}
      ry={RADIUS}
      stroke="none"
      y={!height ? y - HEIGHT_MIN : y}
      height={height || HEIGHT_MIN}
      {...props}
    />
  );
}
