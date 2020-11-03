import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  modal: {
    width: 1140,
    padding: [[20, 40]],
    background: theme.palette.common.black90,
    '& .MuiBox-root': {
      background: 'transparent',
      borderColor: theme.palette.common.black75,
    },
    '& .MuiIconButton-root': {
      minHeight: 'initial',
      padding: 0,
      color: theme.palette.common.black7,
    },
  },
  title: {
    color: theme.palette.common.black7,
  },
  subtitle: {
    marginBottom: 20,
    color: theme.palette.common.black75,
    lineHeight: '1.2',
    fontSize: 18,
  },
  webhookSyntax: {
    height: 490,
    maxHeight: 'calc(100vh - 340px)',
  },
  button: {
    minWidth: 230,
  },
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
