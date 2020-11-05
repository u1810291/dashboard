import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  modal: {
    width: 670,
    padding: [[35, 20, 20]],
    '& .MuiIconButton-root': {
      minHeight: 'initial',
      padding: 0,
    },
  },
  button: {
    minWidth: 200,
    '& svg': {
      marginRight: 5,
      fontSize: 16,
    },
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
  video: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  label: {
    '&.MuiInputLabel-root': {
      marginBottom: 8,
      fontWeight: 'bold',
      color: theme.palette.common.black75,
    },
  },
  input: {
    '& .MuiInputBase-root': {
      color: theme.palette.common.black75,
    },
  },
}));
