import React, { useMemo } from 'react';
import classnames from 'classnames';
import { Box } from '@material-ui/core';
import { round } from 'lib/round';
import { ReactComponent as SpeedometerCursor } from './assets/speedometer-cursor.svg';
import { useStyles } from './Speedometer.styles';

const cursorRotation = {
  start: 0,
  end: 300,
};

const nativeCursorRange = cursorRotation.end - cursorRotation.start;
const cursorRange = 100;

export function Speedometer({ value }: { value: number }) {
  const valueFromCursorRange = useMemo(() => round(nativeCursorRange / (cursorRange / value), 0), [value]);
  const classes = useStyles({ cursorRotation: valueFromCursorRange });

  if (value < 0 || value > 100) {
    console.error('value must be between [0 - 100]');
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.faceWrap}>
        <Box className={classes.faceBox}>
          <Box className={classnames(classes.part, classes.partItem)} />
          <Box className={classnames(classes.part, classes.partItem)} />
          <Box className={classnames(classes.part, classes.partItem)} />
          <Box className={classnames(classes.part, classes.partItem)} />
        </Box>
        <Box className={classes.faceCenter} />
      </Box>
      <Box className={classes.cursor}>
        <SpeedometerCursor className={classes.cursorIcon} />
      </Box>
      <Box className={classes.valueWrap}>
        <Box className={classes.value}>{value}</Box>
      </Box>
    </Box>
  );
}
