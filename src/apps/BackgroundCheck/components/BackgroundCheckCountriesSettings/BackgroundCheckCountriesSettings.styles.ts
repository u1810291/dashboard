import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  control: {
    display: 'block',
  },
  wrapper: {
    backgroundColor: theme.palette.common.gray,
    borderRadius: 10,
    display: 'grid',
    'grid-template-columns': 'repeat(1fr, 2)',
    'grid-template-areas': `
                    'title checkbox'
                    'doubly doubly'
    `,
  },
  icon: {
    height: 17,
    '& svg': {
      width: 17,
      height: 17,
    },
  },
  title: {
    'grid-area': 'title',
  },
  check: {
    paddingLeft: 27,
    'grid-area': 'checkbox',
    display: 'flex',
    justifyContent: 'flex-end',
    '& label': {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      margin: 0,
    },
    '& .MuiSwitch-root': {
      order: 1,
    },
  },
  extendedDescription: {
    padding: '10px 0 0 27px',
    flexDirection: 'column',
    'grid-area': 'doubly',
    bottom: 0,
    '& label': {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      margin: 0,
    },
    '& .MuiSwitch-root': {
      order: 1,
    },
  },
}));
