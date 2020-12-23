import React from 'react';

const HEIGHT_MIN = 5;
const RADIUS = 5;

export function ChartBar({ height, y, fillBar, fillBgBar, ...props }) {
  return (
    <g>
      <rect
        rx={RADIUS}
        ry={RADIUS}
        stroke="none"
        y={0}
        height={!height ? y : y + HEIGHT_MIN}
        fill={fillBgBar}
        {...props}
      />
      <rect
        rx={RADIUS}
        ry={RADIUS}
        stroke="none"
        y={!height ? y - HEIGHT_MIN : y}
        height={height || HEIGHT_MIN}
        fill={fillBar}
        {...props}
      />
    </g>
  );
}
