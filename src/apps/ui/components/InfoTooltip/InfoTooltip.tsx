import { IconButton, Tooltip } from '@material-ui/core';
import { RiErrorWarningLine } from 'react-icons/all';
import React from 'react';

export function InfoTooltip({ title }: { title?: React.ReactNode }) {
  return (
    <Tooltip
      placement="top"
      arrow
      title={title}
    >
      <IconButton size="small">
        <RiErrorWarningLine />
      </IconButton>
    </Tooltip>
  );
}
