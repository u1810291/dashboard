import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';
import { BackgroundCheckStatusesTypes } from 'models/BackgroundCheck.model';

export const useStyles = makeStyles((theme) => createStyles({
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
}));
