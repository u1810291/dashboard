import { createStyles, withStyles } from '@material-ui/styles';
import { makeStyles, Tooltip } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  moneyIcon: {
    marginLeft: 10,
    verticalAlign: 'middle',
  },
  optionMoneyIcon: {
    marginLeft: 3,
  },
  tooltipTitle: {
    fontSize: 14,
    lineHeight: '14px',
    color: theme.palette.common.yellow,
  },
  emailLink: {
    color: '#5082ff',
    textDecoration: 'underline',
    paddingTop: 10,
  },
}));

export const SalesTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    boxShadow: `0px 4px 4px ${theme.palette.common.blackopacity}`,
    borderRadius: 6,
    color: theme.palette.common.slategray,
    width: 195,
    fontSize: 12,
    padding: '13px 6px 15px 18px',
  },
  arrow: {
    color: theme.palette.common.white,
  },
}))(Tooltip);
