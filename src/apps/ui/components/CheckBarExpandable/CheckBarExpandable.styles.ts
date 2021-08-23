import { Accordion, AccordionDetails, AccordionSummary, makeStyles, withStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  labelContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 14px',
  },
  label: {
    fontSize: 14,
    color: theme.palette.text.main,
    fontWeight: 'bold',
  },
  warning: {
    margin: 'auto 0 auto auto',
    '&.MuiBox-root div': {
      position: 'static',
      '& svg': {
        color: theme.palette.common.black90,
      },
    },
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
      margin: '0 0 10px',
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
    padding: '4px 10px',
    borderRadius: 5,
    minHeight: 30,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.foreground.main,
    },
    '&$expanded': {
      minHeight: 30,
      margin: 0,
      backgroundColor: theme.palette.foreground.main,
    },
    '&.error': {
      '&:hover, &:focus': {
        backgroundColor: theme.palette.common.redopacity,
        ...(theme.isDarkMode && ({
          backgroundColor: 'rgba(255, 231, 232, .15)',
        })),
      },
      '& .MuiBox-root, & svg': {
        color: theme.palette.common.red,
      },
      '&$expanded': {
        backgroundColor: theme.palette.common.redopacity,
        ...(theme.isDarkMode && ({
          backgroundColor: 'rgba(255, 231, 232, .15)',
        })),
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
    padding: '0 2px',
    color: theme.palette.text.main,
    '& svg': {
      fontSize: 17,
    },
  },
}))(AccordionSummary);

export const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: 0,
    '& [class*="MuiCardContent-root"]': {
      padding: '10px 30px 0 42px',
      color: theme.palette.text.main,
    },
  },
}))(AccordionDetails);
