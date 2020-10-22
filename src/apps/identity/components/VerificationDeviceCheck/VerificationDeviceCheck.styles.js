import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  wrapper: () => ({
    minHeight: 200,
    width: '100%',
    height: '100%',
    padding: [[0, 20]],
    backgroundColor: theme.palette.common.white,
    '& > *': {
      marginBottom: 20,
      '&:last-child': {
        marginBottom: 0,
      },
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  }),
  labelWrap: () => ({
    display: 'flex',
    alignItems: 'center',
  }),
  titleIcon: () => ({
    flexShrink: 0,
    width: 17,
    height: 17,
    marginRight: 23,
  }),
  label: () => ({
    color: theme.palette.common.black75,
    lineHeight: '1.1',
  }),
  value: () => ({
    color: theme.palette.common.black90,
    lineHeight: '1.1',
    textAlign: 'right',
  }),
}));
