import React from 'react';

export function ChartBar({ ...props }) {
  return (
    <rect
      rx={2}
      ry={2}
      stroke="none"
      {...props}
    />
  );
}
