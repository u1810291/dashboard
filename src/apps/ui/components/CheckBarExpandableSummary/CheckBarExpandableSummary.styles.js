import { Accordion, AccordionDetails, AccordionSummary, makeStyles, withStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  label: {
    color: theme.palette.common.black75,
    lineHeight: '1.1',
  },
  labelIcon: {
    flexShrink: 0,
    color: theme.palette.common.green,
  },
}));

export const ExpansionPanel = withStyles({
  root: {
    width: '100%',
    border: 'none',
    borderRadius: 5,
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: [[0, 0, 10]],
    },
    '& svg': {
      fontSize: 17,
    },
  },
  rounded: {
    '&:first-child': {
      borderRadius: 5,
    },
    '&:last-child': {
      borderRadius: 5,
    },
  },
})(Accordion);

export const ExpansionPanelSummary = withStyles((theme) => ({
  root: {
    border: 'none',
    padding: [[4, 10]],
    borderRadius: 5,
    minHeight: 30,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.black7opacity,
    },
    '&$expanded': {
      minHeight: 30,
      margin: 0,
      backgroundColor: theme.palette.common.black7opacity,
    },
    '&$focused': {
      backgroundColor: '#FFF',
    },
  },
  content: {
    margin: 0,
    borderRadius: 5,
    '&$expanded': {
      margin: 0,
    },
  },
  expanded: {
    margin: 0,
  },
  expandIcon: {
    marginRight: -4,
    padding: 0,
    color: theme.palette.common.black75,
  },
}))(AccordionSummary);

export const ExpansionPanelDetails = withStyles(() => ({
  root: {
    display: 'block',
    padding: 0,
  },
}))(AccordionDetails);
