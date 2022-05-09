import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  colorGrey: {
    color: theme.palette.text.main,
  },
  checkboxLabel: {
    fontSize: '0.875rem',
  },
  summaryList: {
    height: 270,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    flexBasis: 'calc(100% - 281px - 30px)',
  },
  marginBottom10: {
    marginBottom: 10,
  },
  marginBottom20: {
    marginBottom: 20,
  },
  marginRight20: {
    marginRight: 20,
  },
  shieldIconWrap: {
    flexBasis: 281,
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& svg': {
      marginTop: '-40px',
    },
  },
  downloadButtonsBox: {
    width: 'auto',
  },
  manualButtonWrap: {
    maxWidth: 514,
  },
  reportTitle: {
    fontSize: 27,
    fontWeight: 'bold',
  },
  reportSubTitle: {
    maxWidth: 376,
  },
  ultraLargeButton: {
    padding: '16px 65px',
    fontSize: '14px',
  },
  labelError: {
    color: theme.palette.common.red,
  },
  summaryContianer: {
    width: '100%',
  },
}));
