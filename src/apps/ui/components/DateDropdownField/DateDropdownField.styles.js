import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  control: {
    width: '100%',
    color: theme.palette.common.black90,
    '& .MuiInputBase-input': {
      padding: [[6, 24, 7, 10]],
    },
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    color: theme.palette.common.black90,
    transform: 'translate(0, 1.5px)',
    '&.Mui-focused': {
      color: theme.palette.common.black90,
    },
    '& + .MuiInput-formControl': {
      marginTop: 22,
    },
  },
  select: {
    border: [[1, 'solid', theme.palette.common.black75]],
    borderRadius: 5,
    '&::before, &::after': {
      display: 'none',
    },
    '&.Mui-focused, &:hover': {
      borderColor: theme.palette.common.lightblue,
    },
    '& .MuiSelect-select': {
      backgroundColor: 'transparent',
    },
    '& .MuiSelect-icon': {
      top: 'auto',
      right: 5,
      fontSize: 17,
      color: theme.palette.common.black75,
    },
  },
  selectMenu: {
    '& .MuiMenu-list': {
      maxHeight: 240,
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      '&::-webkit-scrollbar': {
        height: 5,
        width: 5,
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
      },
      '&::-webkit-scrollbar-corner': {
        backgroundColor: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.common.black7,
        borderRadius: 10,
      },
    },
  },
  selectItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.palette.common.black90,
    '&.Mui-selected': {
      backgroundColor: theme.palette.common.whiteblue,
    },
  },
}));
