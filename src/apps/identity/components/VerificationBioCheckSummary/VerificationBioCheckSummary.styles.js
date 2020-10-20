import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: '100%',
    padding: 12,
    [theme.breakpoints.up('md')]: {
      padding: 30,
    },
  },
  container: {
    height: '100%',
  },
  title: {
    color: theme.palette.common.black75,
    lineHeight: '1.1',
  },
  data: {
    lineHeight: '1.1',
    color: theme.palette.common.black90,
    textTransform: 'uppercase',
    '& .MuiIconButton-root': {
      color: theme.palette.common.black90,
    },
  },
  biometricText: {
    width: '100%',
    wordBreak: 'break-word',
    textAlign: 'center',
    '& > *': {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: 'calc(100% - 124px)',
      textAlign: 'left',
    },
  },
  image: {
    borderRadius: 5,
    lineHeight: 0,
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: 5,
    },
  },
  imageEmpty: {
    borderRadius: 5,
  },
  imageBiometric: {
    width: 104,
    height: 140,
    margin: [[0, 'auto', 14]],
    [theme.breakpoints.up('md')]: {
      margin: [[0, 20, 0, 0]],
    },
  },
  emptyCaption: {
    width: '100%',
    fontWeight: 'bold',
    fontSize: 12,
    color: theme.palette.common.black75,
  },
  emptyText: {
    color: theme.palette.common.black50,
    lineHeight: '1.1',
  },
  skeleton: {
    [theme.breakpoints.down('sm')]: {
      '& span': {
        margin: [[0, 'auto']],
      },
    },
  },
}));
