import Tooltip from '@material-ui/core/Tooltip';
import { RiErrorWarningLine } from 'react-icons/all';
import React, { ReactNode } from 'react';

type placementToolTipType =
| 'bottom-end'
| 'bottom-start'
| 'bottom'
| 'left-end'
| 'left-start'
| 'left'
| 'right-end'
| 'right-start'
| 'right'
| 'top-end'
| 'top-start'
| 'top';

export function InfoTooltip({ title, placement = 'top', children = <RiErrorWarningLine /> }: { title?: React.ReactNode; placement?: placementToolTipType; children?: ReactNode }) {
  return (
    <Tooltip
      placement={placement}
      arrow
      title={title}
    >
      <span>
        {children}
      </span>
    </Tooltip>
  );
}
