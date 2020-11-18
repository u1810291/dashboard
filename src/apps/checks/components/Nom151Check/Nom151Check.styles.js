import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.common.black75,
  },
  container: {
    maxWidth: '100%',
  },
  timestampSyntax: {
    maxHeight: '300px',
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.common.black50,
      borderRadius: 10,
    },
  },
  uniqueId: {
    padding: [[15, 20]],
    fontSize: 14,
    color: theme.palette.common.green,
    border: `1px solid ${theme.palette.common.black50}`,
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
