import { Accordion, AccordionDetails, AccordionSummary, makeStyles, withStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    '&:hover, &:focus': {
      '& $controlTrash': {
        opacity: 1,
        visibility: 'visible',
      },
    },
  },
  iconWrapper: {
    flexShrink: 0,
    width: 50,
    height: 50,
    borderRadius: '50%',
    fontSize: 20,
    color: theme.palette.common.lightblue,
    backgroundColor: theme.palette.common.whiteblue,
  },
  icon: {
    strokeWidth: 1.5,
  },
  integrationType: {
    display: 'inline-block',
    padding: '3px 10px',
    fontSize: 12,
    fontWeight: 'bold',
    borderRadius: 30,
    color: theme.palette.common.lightblue,
    backgroundColor: theme.palette.common.whiteblue,
  },
  control: {
    position: 'absolute',
    width: 25,
    minWidth: 'auto',
    height: 25,
    padding: 0,
    borderRadius: '50%',
  },
  controlTrash: {
    top: '50%',
    right: 10,
    color: theme.palette.common.red,
    backgroundColor: theme.palette.common.white,
    transform: 'translateY(-50%)',
    opacity: 0,
    visibility: 'hidden',
    transition: '.2s all ease-in-out',
  },
  controlIssues: {
    top: 0,
    left: 0,
    color: theme.palette.common.yellow,
    backgroundColor: theme.palette.common.white,
    transform: 'translate(-50%, -5px)',
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.black7,
    },
  },
  modal: {
    minHeight: 'auto',
    padding: 25,
    '& > div': {
      position: 'static',
      transform: 'none',
    },
  },
}));

export const ExpansionPanel = withStyles((theme) => ({
  root: {
    width: '100%',
    padding: 15,
    border: `1px solid ${theme.palette.common.black7}`,
    borderRadius: 10,
    boxShadow: 'none',
    transition: '.2s all ease-in-out',
    '&:before': {
      display: 'none',
    },
    '&.Mui-expanded': {
      margin: '0 0 10px',
      '&:last-child': {
        marginBottom: 10,
      },
    },
  },
  rounded: {
    '&:first-child, &:last-child': {
      borderRadius: 10,
    },
  },
}))(Accordion);

export const ExpansionPanelSummary = withStyles((theme) => ({
  root: {
    padding: 0,
    border: 'none',
    minHeight: 'auto',
    '&$expanded': {
      minHeight: 'auto',
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
    margin: '0 -4px 0 10px',
    padding: 0,
    fontSize: 17,
    color: theme.palette.text.main,
  },
}))(AccordionSummary);

export const ExpansionPanelDetails = withStyles(() => ({
  root: {
    display: 'block',
    padding: 0,
  },
}))(AccordionDetails);
