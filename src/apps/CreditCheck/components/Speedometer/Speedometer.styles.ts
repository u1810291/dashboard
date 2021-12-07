import { createStyles } from '@material-ui/styles';
import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme, { cursorRotation: number }>((theme) => createStyles({
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
    zIndex: 10,
  }),
  cursorIcon: {
    top: '14px',
    left: '-8px',
    position: 'relative',
    transform: 'rotate(304deg)',
  },
  valueWrap: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    zIndex: 10,
  },
  value: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },

  faceWrap: {
    width: 180,
    height: 180,
    borderRadius: '50%',
    position: 'relative',
    overflow: 'hidden',
  },
  faceCenter: {
    color: theme.palette.common.black,
    width: '60%',
    height: '60%',
    background: theme.palette.common.brightgray,
    borderRadius: 100,
    position: 'absolute',
    boxShadow: `0 -13px 15px -10px ${theme.palette.common.grayopacity}`,
    right: '21%',
    top: '20%',
    zIndex: 10,

    '&:after': {
      content: '""',
      display: 'block',
      top: -18,
      left: -33,
      position: 'absolute',
      bottom: 0,
      border: '90px solid transparent',
      borderBottom: `90px solid ${theme.palette.common.brightgray}`,
    },
  },
  faceBox: {
    height: '100%',
    backgroundColor: theme.palette.common.brightorange,
  },
  part: {
    position: 'absolute',
    top: 0,
    width: 0,
    height: 0,
    border: '90px solid transparent',
  },
  partItem: {
    '&:nth-child(2)': {
      borderTop: `90px ${theme.palette.common.yellow} solid`,
      transform: 'rotate(69deg)',
    },
    '&:nth-child(3)': {
      transform: 'rotate(117deg)',
      borderRight: `155px ${theme.palette.common.lightgreen} solid`,
      left: 62,
      top: -44,
    },
    '&:nth-child(4)': {
      left: '50%',
      borderBottom: `90px ${theme.palette.common.brightgreen} solid`,
      transform: 'rotate(45deg)',
    },
  },
}));
