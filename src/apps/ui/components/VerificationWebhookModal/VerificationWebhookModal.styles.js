import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  modal: {
    width: 1140,
    padding: [[20, 40]],
    background: theme.palette.text.secondary,
    '& .MuiBox-root': {
      background: 'transparent',
      borderColor: theme.palette.text.main,
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
    color: theme.palette.text.main,
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
    border: `1px solid ${theme.palette.text.main}`,
    borderRadius: 5,
    '& > div': {
      justifyContent: 'space-between',
      '& > div': {
        maxWidth: 'calc(100% - 70px)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
  },
}));
