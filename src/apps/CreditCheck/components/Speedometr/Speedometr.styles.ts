import { createStyles } from '@material-ui/styles';
import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme, { cursorRotation: number }>(() => createStyles({
  root: {
    position: 'relative',
    width: 180,
    height: 180,
    overflow: 'hidden',
  },
  face: {
    position: 'absolute',
  },
  cursor: ({ cursorRotation }) => ({
    top: '-50%',
    left: '-50%',
    position: 'absolute',
    width: '200%',
    height: '200%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: `rotate(${cursorRotation}deg)`,
    transformOrigin: '50%',
  }),
  cursorIcon: {
    top: '14px',
    left: '-8px',
    position: 'relative',
    transform: 'rotate(304deg)',
  },
}));
