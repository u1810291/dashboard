import { Accordion, AccordionDetails, AccordionSummary, makeStyles, withStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  labelContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: [[0, 14]],
  },
  label: {
    fontSize: 14,
    color: theme.palette.common.black75,
    fontWeight: 'bold',
  },
}));

export const ExpansionPanel = withStyles({
  root: {
    width: '100%',
    marginBottom: 10,
    border: 'none',
    borderRadius: 5,
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: [[0, 0, 10]],
    },
    '&$disabled': {
      backgroundColor: '#f7f7fa',
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
  expanded: {},
  disabled: {},
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
    '&.error': {
      '&:hover, &:focus': {
        backgroundColor: theme.palette.common.redopacity,
      },
      '& .MuiBox-root, & svg': {
        color: theme.palette.common.red,
      },
      '&$expanded': {
        backgroundColor: theme.palette.common.redopacity,
      },
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
  focused: {},
  disabled: {
    opacity: '1 !important',
  },
  expandIcon: {
    marginRight: -4,
    padding: [[0, 2]],
    color: theme.palette.common.black75,
    '& svg': {
      fontSize: 17,
    },
  },
}))(AccordionSummary);

export const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: 0,
    '& .MuiCardContent-root': {
      padding: [[10, 30, 0, 42]],
      color: theme.palette.common.black75,
      '&:last-child': {
        paddingBottom: 0,
      },
    },
  },
}))(AccordionDetails);
