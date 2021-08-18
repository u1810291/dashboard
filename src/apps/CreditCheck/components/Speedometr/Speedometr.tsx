import React, { useMemo } from 'react';
import { round } from 'lib/round';
import { ReactComponent as SpeedometrFace } from './assets/speedometr.svg';
import { ReactComponent as SpeedometrCursor } from './assets/speedometr-cursor.svg';
import { useStyles } from './Speedometr.styles';

const cursorRotation = {
  start: 0,
  end: 300,
};

const nativeCursorRange = cursorRotation.end - cursorRotation.start;
const cursorRange = 100;

export function Speedometr({ value }: { value: number }) {
  const valueFromCursorRange = useMemo(() => round(nativeCursorRange / (cursorRange / value), 0), [value]);
  const classes = useStyles({ cursorRotation: valueFromCursorRange });

  if (value < 0 || value > 100) {
    console.error('value must be between [0 - 100]');
  }

  return (
    <div className={classes.root}>
      <SpeedometrFace className={classes.face} />
      <div className={classes.cursor}>
        <SpeedometrCursor className={classes.cursorIcon} />
      </div>
    </div>
  );
}
