import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

export const useStyles = makeStyles(() => ({
  labelContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: [[0, 12]],
  },
  label: {
    height: 43,
    fontSize: 14,
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));

export const ExpansionPanel = withStyles({
  root: {
    width: '100%',
    border: 'none',
    borderRadius: 14,
    boxShadow: 'none',
    backgroundColor: '#f7f7fa',
    '&:not(:last-child)': {
      marginBottom: 20,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      marginBottom: 20,
    },
    '&$disabled': {
      backgroundColor: '#fff !important',
    },
  },
  rounded: {
    '&:first-child': {
      borderRadius: 14,
    },
    '&:last-child': {
      borderRadius: 14,
    },
  },
  expanded: {},
  disabled: {},
})(MuiExpansionPanel);

export const ExpansionPanelSummary = withStyles({
  root: {
    border: 'none',
    padding: [[15, 20]],
    borderRadius: 14,
    minHeight: 48,
    '&$expanded': {
      minHeight: 48,
      margin: 0,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    },
    '&$focused': {
      backgroundColor: '#FFF',
    },
  },
  content: {
    margin: 0,
    borderRadius: 15,
    '&$expanded': {
      margin: 0,
    },
  },
  expanded: {
    margin: 0,
  },
  focused: {},
  disabled: {
    opacity: '1 !important',
  },
  expandIcon: {
    marginRight: -12,
  },
})(MuiExpansionPanelSummary);

export const ExpansionPanelDetails = withStyles(() => ({
  root: {
    padding: 0,
  },
}))(MuiExpansionPanelDetails);
