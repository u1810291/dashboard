import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  colorGrey: {
    color: theme.palette.text.main,
  },
  paper: {
    marginTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
  },
  tableRow: {
    padding: 0,
    margin: 0,
    '& > *': {
      borderBottom: 'none',
    },
    '& .MuiTableCell-sizeSmall': {
      border: 'none',
    },
    '& .MuiTableCell-root': {
      paddingBottom: '0',
    },
  },
  name: {
    color: theme.palette.text.secondary,
    paddingBottom: '5px',
  },
  nameFailed: {
    color: theme.palette.error.main,
  },
}));
