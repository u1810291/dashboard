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
    '&:first-child': {
      marginTop: 10,
    },
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
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
    marginLeft: 0,
    padding: 0,
    '&$expanded': {
      minHeight: 48,
    },
    '&$focused': {
      backgroundColor: '#FFF',
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
  focused: {},
  disabled: {
    opacity: '1 !important',
  },
})(MuiExpansionPanelSummary);

export const ExpansionPanelDetails = withStyles(() => ({
  root: {
    padding: 0,
  },
}))(MuiExpansionPanelDetails);
