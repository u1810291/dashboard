import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme, { color?: string; width?: string; height?: string; }>((theme) => ({
  circledContent: ({ color, width, height }) => ({
    // @ts-ignore
    width: width || '50px',
    height: height || '50px',
    backgroundColor: color || theme.palette.button.document.main,
    color: theme.palette.common.lightblue,
    borderRadius: '50%',
    overflow: 'hidden',
  }),
}));
