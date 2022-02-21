import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  tag: {
    width: '100%',
    borderRadius: '5px',
    color: theme.palette.common.lightblue,
    display: 'flex',
    flexFlow: 'column',
    verticalAlign: 'top',
  },
  atomicTag: {
    marginBottom: 10,
  },
  tagHeader: {
    width: '100%',
    backgroundColor: `${theme.palette.common.whiteblue} !important`,
    borderRadius: '5px',
    color: theme.palette.common.lightblue,
    display: 'flex',
    flexFlow: 'column',
    verticalAlign: 'top',
  },
}));
