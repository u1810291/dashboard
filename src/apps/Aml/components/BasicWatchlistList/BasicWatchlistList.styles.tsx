import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: '17px',
    textOverflow: 'ellipsis',
    width: 140,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  content: {
    fontSize: 14,
    lineHeight: '17px',
    color: theme.palette.common.black75,
  },
  accordionWrap: {
    marginBottom: 12,
    background: theme.palette.common.gray,
    boxShadow: 'none',
    borderRadius: 5,

    '&:before': {
      display: 'none',
    },

    '&.MuiAccordion-root.Mui-expanded': {
      margin: 0,
      marginBottom: 10,
    },

    '& .MuiAccordionSummary-root': {
      padding: '0px 10px',
      minHeight: 20,
    },

    '& .MuiAccordionSummary-content': {
      margin: 0,
    },
  },
  accordionDetails: {
    padding: '0 10px',
  },
  marginBottom10: {
    marginBottom: 10,
  },
  groupItemTitle: {
    color: theme.palette.common.black75,
    fontWeight: 'bold',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  button: {
    width: 20,
    height: 20,
    padding: 0,

    '& svg': {
      width: 14,
      height: 14,
    },
  },
  buttonEdit: {
    color: theme.palette.common.lightblue,
    backgroundColor: theme.palette.common.whiteblue,
  },
  buttonRefresh: {
    color: theme.palette.common.lightblue,
    backgroundColor: theme.palette.common.whiteblue,
    marginRight: 5,
  },
  buttonTrash: {
    marginLeft: 5,
    marginRight: 5,
    color: theme.palette.common.red,
    backgroundColor: theme.palette.common.redopacity,
  },
  paddingRight10: {
    paddingRight: 10,
  },
}));
