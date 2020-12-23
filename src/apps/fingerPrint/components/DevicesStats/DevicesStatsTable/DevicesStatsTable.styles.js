import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  tableCell: {
    padding: 10,
    color: theme.palette.common.black75,
    borderBottom: 'none',
    verticalAlign: 'baseline',
    '@media (min-width: 375px)': {
      paddingLeft: 20,
      '&:nth-child(2n)': {
        padding: [[10, 20, 10, 10]],
      },
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
