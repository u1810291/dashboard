import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme, { disabled: boolean }>((theme) => ({
  icon: ({ disabled }) => ({
    // @ts-ignore
    stroke: disabled ? theme.palette.success.disabled : theme.palette.success.main,
  }),
  text: ({ disabled }) => ({
    fontSize: 12,
    // @ts-ignore
    color: disabled ? theme.palette.success.disabled : theme.palette.success.main,
  }),
}));
