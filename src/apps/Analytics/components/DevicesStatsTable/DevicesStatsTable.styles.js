import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  tableCell: {
    padding: 10,
    color: theme.palette.text.main,
    borderBottom: 'none',
    verticalAlign: 'baseline',
    '&:nth-child(2n + 1)': {
      paddingLeft: 0,
    },
  },
  tableCellHead: {
    padding: [[0, 0, 10]],
  },
  tableIcon: {
    width: 17,
    height: 17,
    marginRight: 10,
    verticalAlign: 'text-top',
  },
}));
