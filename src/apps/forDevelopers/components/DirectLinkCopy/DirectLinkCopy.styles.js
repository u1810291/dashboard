import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  resourceUrl: {
    maxWidth: '100%',
    fontSize: 14,
    color: theme.palette.common.green,
    border: `1px solid ${theme.palette.text.main}`,
    borderRadius: 5,
    '& > div': {
      '& > div': {
        wordBreak: 'break-all',
      },
    },
  },
}));
