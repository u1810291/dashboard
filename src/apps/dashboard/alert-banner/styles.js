import {
  Button,
  Paper,
} from '@material-ui/core';

import { withStyles } from '@material-ui/styles';

export const AlertPaper = withStyles(() => ({
  root: {
    display: 'flex',
    height: 50,
    minWidth: 630,
    color: 'white',
    background: '#ff6b00',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))(Paper);

export const AlertDemoButton = withStyles(() => ({
  root: {
    paddingRight: 10,
    color: '#ff6b00',
    backgroundColor: '#fff',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    textTransform: 'inherit',
    marginRight: 10,
    border: 'none',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#fff',
      boxShadow: 'none',
    },
  },
}))(Button);

export const AlertButton = withStyles(() => ({
  root: {
    color: '#fff',
    fontWeight: 400,
    backgroundColor: 'inherit',
    whiteSpace: 'nowrap',
    marginRight: 10,
    border: '1px solid #fff',
    textTransform: 'inherit',
    '&:hover': {
      backgroundColor: 'inherit',
    },
  },
}))(Button);
