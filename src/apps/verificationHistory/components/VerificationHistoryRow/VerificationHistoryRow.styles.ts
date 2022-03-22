import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  tableRow: {
    [theme.breakpoints.down('md')]: {
      display: 'block',
      marginBottom: 20,
      padding: 20,
      borderRadius: 5,
      backgroundColor: theme.palette.common.white,
      boxShadow: '0px 1px 4px rgba(52, 73, 94, 0.1)',
      '&:last-of-type': {
        marginBottom: 0,
      },
    },
  },
  tableCell: {
    borderColor: theme.palette.common.black7,
    '&:first-child': {
      verticalAlign: 'top',
    },
    [theme.breakpoints.down('md')]: {
      display: 'block',
      marginBottom: 20,
      padding: 0,
      border: 'none',
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
  tableCellExpand: {
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  buttonExpand: {
    fontSize: 14,
    color: theme.palette.text.secondary,
    '& svg': {
      marginLeft: 8,
    },
  },
  loader: {
    background: `linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, ${theme.palette.common.white} 70%)`,
  },
  roundAvatar: {
    height: '100%',
    minHeight: 30,
    minWidth: 30,
    fontWeight: 'bold',
    borderRadius: '50%',
    border: `1px solid ${theme.palette.common.black50}`,
    color: theme.palette.common.white,
    overflow: 'hidden',
    '& svg': {
      maxHeight: '100%',
      maxWidth: '100%',
      width: 22,
      margin: 'auto',
    },
  },
  chevronUp: {
    transform: 'rotate(0.5turn)',
  },
}));
