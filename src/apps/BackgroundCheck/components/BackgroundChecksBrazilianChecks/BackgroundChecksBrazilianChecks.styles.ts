import { makeStyles, Theme } from '@material-ui/core/styles';
import { BackgroundCheckStatusesTypes } from 'models/BackgroundCheck.model';

export const useStyles = makeStyles((theme: Theme) => ({
  colorGrey: {
    color: theme.palette.text.main,
  },
  checkboxLabel: {
    fontSize: '0.875rem',
  },
  marginBottom10: {
    marginBottom: 10,
  },
  marginBottom20: {
    marginBottom: 20,
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
  label: {
    color: theme.palette.text.main,
  },
  scoreValueContainer: {
    marginRight: '20px',
  },
  scoreValue: {
    fontSize: '37px',
    lineHeight: '44px',
    fontWeight: 700,
  },
  [BackgroundCheckStatusesTypes.Approved]: {
    color: theme.palette.common.green,
  },
  [BackgroundCheckStatusesTypes.HighRisk]: {
    color: theme.palette.common.red,
  },
  [BackgroundCheckStatusesTypes.LowRisk]: {
    color: theme.palette.common.yellow,
  },
  statusValue: {
    margin: '20px 0 5px 0',
    fontWeight: 700,
  },
  summary: {
    height: 270,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    flexBasis: 'calc(100% - 281px - 30px)',
  },
  description: {
    gridGap: '10px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    width: '100%',
  },
  content: {
    width: '100%',
  },
}));
