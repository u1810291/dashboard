import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  colorGrey: {
    color: theme.palette.text.main,
  },
  summaryListItem: {
    width: 200,
    marginBottom: 20,
  },
  summaryListItemValue: {
    fontWeight: 700,
    marginBottom: 5,
  },
}));
