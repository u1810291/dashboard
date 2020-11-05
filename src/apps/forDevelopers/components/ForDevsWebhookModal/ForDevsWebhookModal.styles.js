import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  modal: {
    width: 1140,
    padding: [[20, 40]],
    '& .MuiBox-root': {
      background: 'transparent',
    },
    '& .MuiIconButton-root': {
      minHeight: 'initial',
      padding: 0,
    },
  },
  button: {
    minWidth: 230,
  },
  documentation: {
    height: '100%',
    minHeight: 50,
    padding: [[5, 10]],
    fontWeight: 'bold',
    fontSize: 14,
    color: theme.palette.common.black75,
    borderColor: theme.palette.common.black7,
    '& svg': {
      marginLeft: 10,
      fontSize: 17,
    },
  },
  inputWrapper: {
    marginBottom: 50,
    '&:last-of-type': {
      marginBottom: 60,
    },
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
    color: theme.palette.common.black90,
  },
}));
