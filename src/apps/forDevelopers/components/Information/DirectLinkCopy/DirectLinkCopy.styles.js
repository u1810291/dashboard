import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  resourceUrl: {
    maxWidth: '100%',
    fontSize: 14,
    color: theme.palette.common.green,
    border: `1px solid ${theme.palette.common.black75}`,
    borderRadius: 5,
    '& > .MuiBox-root': {
      '& > .MuiBox-root': {
        wordBreak: 'break-all',
      },
    },
  },
}));
