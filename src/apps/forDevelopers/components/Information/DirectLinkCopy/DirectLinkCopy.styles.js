import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  resourceUrl: {
    padding: [[15, 20]],
    fontSize: 14,
    color: theme.palette.common.green,
    border: `1px solid ${theme.palette.common.black75}`,
    borderRadius: 5,
    '& > .MuiBox-root': {
      justifyContent: 'space-between',
      '& > .MuiBox-root': {
        maxWidth: 'calc(100% - 70px)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
  },
}));
