import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  colorGrey: {
    color: theme.palette.text.main,
  },
  summaryList: {
    height: 270,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    flexBasis: 'calc(100% - 180px - 30px)',
  },
  summaryListItem: {
    width: 200,
    marginBottom: 20,
  },
  summaryListItemValue: {
    fontWeight: 700,
    marginBottom: 5,
  },
  marginBottom10: {
    marginBottom: 10,
  },
  marginRight20: {
    marginRight: 20,
  },
  speedometerWrap: {
    flexBasis: 180,
    marginTop: '15px',
  },
  downloadButtonsBox: {
    width: 'auto',
  },
  manualButtonWrap: {
    maxWidth: 305,
  },
  ultraLargeButton: {
    padding: '16px 82px',
  },
  labelError: {
    color: theme.palette.common.red,
  },
}));
