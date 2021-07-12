import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  extendedDescription: {
    maxWidth: '300px',
    transition: '.2s all ease-in-out',
    '& .MuiSwitch-root': {
      width: 30,
      height: 17,
      padding: 0,
      '& .MuiSwitch-colorPrimary': {
        padding: 1,
        color: theme.palette.common.white,
        '&.Mui-checked': {
          transform: 'translateX(13px)',
          color: theme.palette.common.white,
          '& + .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: theme.palette.common.green,
            border: 'none',
          },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
          color: theme.palette.common.green,
          border: `6px solid ${theme.palette.common.white}`,
        },
        '& .MuiSwitch-thumb': {
          width: 15,
          height: 15,
        },
      },
      '& .MuiSwitch-track': {
        borderRadius: 13,
        border: `1px solid ${theme.palette.common.black50}`,
        backgroundColor: theme.palette.common.black50,
        opacity: 1,
      },
    },
  },
  disabled: {
    opacity: 0.3,
  },
  badge: {
    padding: '3px 10px',
    color: theme.palette.common.lightblue,
    backgroundColor: theme.palette.common.whiteblue,
    borderRadius: 30,
    whiteSpace: 'nowrap',
  },
}));
