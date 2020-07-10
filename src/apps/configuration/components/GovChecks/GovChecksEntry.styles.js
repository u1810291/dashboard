import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  heading: {
    flexBasis: '27%',
    flexShrink: 0,
  },
  entry: {
    marginBottom: 20,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 40,
  },
}));

export const ExpansionPanel = withStyles({
  root: {
    // border: 'none',
    // boxShadow: ,
    // margin: 0,
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
    // padding: 0,
    minHeight: 40,
    '&$expanded': {
      minHeight: 40,
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
    paddingBottom: 20,
  },
}))(MuiExpansionPanelDetails);
