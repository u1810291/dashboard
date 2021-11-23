import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.up('md')]: {
      paddingBottom: 10,
      borderBottom: `1px solid ${theme.palette.common.black7}`,
    },
  },
  wrapperWithPadding: {
    [theme.breakpoints.up('md')]: {
      paddingBottom: 10,
      paddingTop: 20,
      borderBottom: `1px solid ${theme.palette.common.black7}`,
    },
  },
  inputWrapper: {
    paddingBottom: 20,
    fontSize: 24,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 20,
      paddingBottom: 20,
      borderBottom: `1px solid ${theme.palette.common.black7}`,
    },
  },
  dateWrapper: {
    paddingBottom: 20,
  },
  fieldWrapper: {
    marginBottom: 20,
    [theme.breakpoints.up('md')]: {
      flexWrap: 'nowrap',
    },
  },
  passwordWrapper: {
    [theme.breakpoints.up('md')]: {
      flexWrap: 'nowrap',
    },
  },
  title: {
    fontSize: 14,
    color: theme.palette.text.main,
  },
  value: {
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
  },
  button: {
    minWidth: 120,
    padding: 4,
    borderColor: theme.palette.common.lightblue,
    color: theme.palette.common.lightblue,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.whiteblue,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 6,
    },
  },
}));
