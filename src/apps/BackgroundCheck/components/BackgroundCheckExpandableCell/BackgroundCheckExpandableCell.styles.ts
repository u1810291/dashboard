import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';

export const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
  },
  colorGrey: {
    color: theme.palette.text.main,
  },
  tableRow: {
    padding: 0,
    margin: 0,
    '& > *': {
      borderBottom: 'none',
    },
    '& .MuiTableCell-sizeSmall': {
      border: 'none',
    },
    '& .MuiTableCell-root': {
      paddingBottom: '0',
    },
  },
  expandable: {
    width: '30px',
    transition: 'min-height 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
  name: {
    color: theme.palette.text.secondary,
    paddingBottom: '5px',
  },
  tab: {
    color: theme.palette.text.main,
    backgroundColor: theme.palette.common.black7,
    borderRadius: '5px',
    transition: '.2s all ease-in-out',
  },
}));

export const ChecksAccordionStyled = withStyles((theme) => ({
  root: {
    '& .MuiAccordionSummary-root.Mui-expanded': {
      minHeight: '25px',
      height: '25px',
      marginBottom: 10,
    },
    minHeight: '25px',
    height: '25px',
    backgroundColor: theme.palette.common.lightRed,
    color: theme.palette.common.red,
    boxShadow: 'none',
    borderRadius: 5,
    '&:before': {
      display: 'none',
    },
  },
}))(Accordion);

export const AgreementsAccordionStyled = withStyles(() => ({
  root: {
    '& .MuiAccordionSummary-root.Mui-expanded': {
      minHeight: '25px',
      height: '25px',
      marginBottom: 10,
    },
    backgroundColor: 'transparent',
    minHeight: '25px',
    height: '25px',
    boxShadow: 'none',
    borderRadius: 5,
    '&:before': {
      display: 'none',
    },
  },
}))(Accordion);

export const ChecksAccordionSummaryStyled = withStyles((theme) => ({
  root: {
    marginTop: 10,
    marginBottom: 10,
    height: '25px',
    minHeight: '25px',
    '& .MuiSvgIcon-root': {
      fill: theme.palette.common.red,
    },
  },
}))(AccordionSummary);

export const AgreementsAccordionSummaryStyled = withStyles(() => ({
  root: {
    marginTop: 10,
    marginBottom: 10,
    height: '25px',
    minHeight: '25px',
  },
}))(AccordionSummary);
