import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { makeStyles } from '@material-ui/styles';

export const Accordion = withStyles(() => ({
  root: {
    border: 'none',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: '0 auto',
    },
  },
  expanded: {},
}))(MuiAccordion);

export const AccordionSummary = withStyles(() => ({
  // todo @maslennikov: Pavel asked to use fade-in fade-out effect for content
  root: {
    backgroundColor: 'none',
    minHeight: 17,
    padding: 0,
    paddingTop: 20,
    marginRight: 20,
    '&$expanded': {
      minHeight: 17,
      padding: 0,
      paddingTop: 20,
      marginRight: 20,
    },
  },
  expandIcon: {
    padding: '0 12px',
  },
  content: {
    margin: 0,
    '&$expanded': {
      opacity: 1,
      margin: 0,
      padding: 0,
    },
  },
  expanded: {
    padding: [[0, 12, 0, 12]],
  },
}))(MuiAccordionSummary);

export const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: [[10, 94, 10, 0]],
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.common.black75,
  },
}))(MuiAccordionDetails);

export const useStyles = makeStyles({
  question: {
    color: '#507DED',
    fontSize: '14px',
  },
});
