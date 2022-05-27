import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  buttonSave: {
    minWidth: 220,
    minHeight: 43,
    fontSize: 14,
    fontWeight: 'bold',
    '& svg': {
      marginRight: 5,
    },
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.lightbluehover,
    },
    '&:disabled': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.common.lightblue,
      opacity: 0.5,
    },
  },
  issues: {
    color: theme.palette.common.red,
    position: 'absolute !important' as any,
    right: 345,
    top: 17,
  },
  issuesNotCreated: {
    color: theme.palette.common.red,
    position: 'absolute !important' as any,
    right: 235,
    top: 17,
  },
  unsavedChangesNotCreated: {
    position: 'absolute !important' as any,
    right: 235,
    top: 17,
  },
  unsavedChanges: {
    position: 'absolute !important' as any,
    right: 345,
    top: 17,
  },
}));
