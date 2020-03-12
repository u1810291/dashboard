import { makeStyles, withStyles, Chip, Tooltip } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  tooltip: {
    fontSize: 18,
    color: '#bbbbbe',
    '&:hover': {
      color: '#4a4a4a',
    },
  },
  tipMessage: {
    padding: [[6, 10]],
    borderRadius: 5,
    marginTop: 15,
  },
  tipMessageSuccess: {
    color: '#2ADA9A',
    backgroundColor: 'rgba(42, 218, 154, 0.1)',
  },
  tipMessageFailure: {
    color: '#ff0000',
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
  },
  tipMessageChecking: {
    border: '1px solid #0a0a0a',
  },
}));

export const CheckBarChip = withStyles({
  root: {
    height: 'auto',
    width: '100%',
    minWidth: 260,
    borderRadius: 14,
    padding: [[15, 20]],
    backgroundColor: '#f7f7fa',
    justifyContent: 'space-between',
    '&:focus': {
      backgroundColor: '#f7f7fa',
    },
  },
  label: {
    height: 43,
    fontSize: 14,
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  icon: {
    margin: 0,
  },
  deleteIcon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 0,
    marginLeft: 10,
  },
})(Chip);

export const MyTooltip = withStyles({
  tooltip: {
    padding: 20,
    fontSize: 12,
    lineHeight: '1.3',
    color: '#242424',
    backgroundColor: '#fff',
    boxShadow: '5px 5px 14px rgba(0, 0, 0, 0.15)',
  },
  arrow: {
    color: 'white',
  },
})(Tooltip);
