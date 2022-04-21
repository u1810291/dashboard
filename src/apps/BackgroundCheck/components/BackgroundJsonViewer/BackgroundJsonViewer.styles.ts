import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  tableContainer: {
    paddingBottom: 10,
    marginBottom: 10,
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
      paddingBottom: 0,
      marginBottom: 10,
    },
  },
  count: {
    color: theme.palette.text.main,
  },
  tableRowV2: {
    padding: 0,
    margin: 0,
    '& > *': {
      borderBottom: 'none',
    },
    '& .MuiTableCell-sizeSmall': {
      border: 'none',
    },
    '& .MuiTableCell-root': {
      paddingBottom: 0,
      marginBottom: 10,
    },
  },
}));
