import { makeStyles } from '@material-ui/core/styles';
import { AppTheme } from 'apps/theme';

export const useStyles = makeStyles<typeof AppTheme, {color: string}>((theme) => ({
  marker: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 30,
    padding: 0,
    paddingBottom: 5,
    color: (props) => props.color || theme.palette.common.gray,
  },
  icon: {
    height: 19,
    width: 19,
  },
  tooltip: {
    '& .MuiTooltip-tooltip': {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.slategray,
      fontSize: 12,
      marginBottom: 3,
    },
    '& .MuiTooltip-arrow::before': {
      backgroundColor: theme.palette.common.white,
    },
  },
}));
