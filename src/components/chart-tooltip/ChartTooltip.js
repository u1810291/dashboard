import React from 'react';
import { useStyles } from './ChartTooltip.styles';

// use this tooltip with className='custom-tooltip' on Chart comp
export function ChartTooltip({ external }) {
  const classes = useStyles();
  const { x, width, y } = external || {};
  const isHidden = !external;

  const tooltip = external ? external.value : null;

  const style = {
    display: isHidden ? 'none' : 'block',
    left: `${(x + width / 2)}px`,
    top: `${y}px`,
  };

  return (
    <div style={style} className={classes.tooltip}>
      {tooltip}
    </div>
  );
}
