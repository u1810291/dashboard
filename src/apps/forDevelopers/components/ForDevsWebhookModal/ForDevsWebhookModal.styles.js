import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  modal: {
    width: 670,
    padding: [[35, 20, 20]],
    '& .MuiBox-root': {
      background: 'transparent',
      borderColor: theme.palette.common.black75,
    },
    '& .MuiIconButton-root': {
      minHeight: 'initial',
      padding: 0,
      color: theme.palette.common.black7,
    },
  },
  title: {
    color: theme.palette.common.black90,
  },
  subtitle: {
    marginBottom: 20,
    color: theme.palette.common.black75,
    lineHeight: '1.2',
    fontSize: 18,
  },
  button: {
    minWidth: 230,
  },
}));
