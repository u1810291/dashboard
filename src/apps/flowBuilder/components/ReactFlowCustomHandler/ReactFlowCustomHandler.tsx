import React from 'react';
import { Handle, HandleType, Position } from 'react-flow-renderer';
import { useStyles } from './ReactFlowCustomHandler.styles';

export interface ReactFlowCustomHandlerProps {
  type: HandleType,
  position: Position,
}

export function ReactFlowCustomHandler({ type, position }: ReactFlowCustomHandlerProps) {
  const classes = useStyles();

  return (
    <Handle
      type={type}
      position={position}
      id={type}
      className={classes.handle}
      style={{ borderRadius: 0, width: 0, height: 0 }}
    />
  );
}
