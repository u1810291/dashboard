import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

export const useStyles = makeStyles(() => ({
  heading: {
    flexBasis: '27%',
    flexShrink: 0,
  },
}));

export const ExpansionPanel = withStyles({
  root: {
    border: 'none',
    boxShadow: 'none',
    margin: 0,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 0,
    },
    '&$disabled': {
      backgroundColor: '#fff !important',
    },
  },
  expanded: {},
  disabled: {},
})(MuiExpansionPanel);

export const ExpansionPanelSummary = withStyles({
  root: {
    border: 'none',
    padding: 0,
    minHeight: 48,
    '&$expanded': {
      minHeight: 48,
      margin: 0,
    },
    '&$focused': {
      backgroundColor: '#FFF',
    },
  },
  content: {
    margin: 0,
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
