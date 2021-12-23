import { withStyles } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

export const AccordionStyled = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.lightRed,
    color: theme.palette.common.red,
    marginTop: 10,
    boxShadow: 'none',
    borderRadius: 5,
    '&:before': {
      display: 'none',
    },
  },
}))(Accordion);

export const AccordionSummaryStyled = withStyles(({
  root: {
    minHeight: 'auto',
    padding: '0 10px',
  },
}))(AccordionSummary);

export const AccordionDetailsStyled = withStyles(({
  root: {
    padding: '0 10px 10px',
  },
}))(AccordionDetails);
