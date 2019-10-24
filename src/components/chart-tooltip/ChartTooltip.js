import React from 'react';
import CSS from './ChartTooltip.module.scss';

// use this tooltip with className='custom-tooltip' on Chart comp
export function ChartTooltip({ external }) {
  const { x, width, y } = external || {};
  const isHidden = !external;

  const tooltip = external
    ? external.tooltip || external.label
    : null;

  const style = {
    display: isHidden ? 'none' : 'block',
    left: `${(x + width / 2)}px`,
    top: `${y}px`,
  };

  return (
    <div style={style} className={CSS.tooltip}>
      {tooltip}
    </div>
  );
}
