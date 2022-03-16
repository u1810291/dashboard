import React from 'react';
import Select from '@material-ui/core/Select';
import withStyles from '@material-ui/core/styles/withStyles';
import { FiChevronDown } from 'react-icons/fi';
import { SelectProps } from '@material-ui/core/Select/Select';

export const SelectUI = withStyles((theme) => ({
  select: {
    minHeight: 50,
    borderRadius: '4px',
    border: `1px solid ${theme.palette.common.black75}`,
    padding: '0 22px 0 10px',
    color: theme.palette.common.verydarkgray,
    lineHeight: '17px',
    '&:hover': {
      cursor: 'pointer',
      borderColor: theme.palette.common.lightblue,
    },
    input: {
      display: 'none',
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: theme.palette.common.white,
    },
    '& .MuiOutlinedInput-input': {
      display: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.common.black75,
    },
    '& .MuiSelect-icon': {
      marginTop: 3,
      fontSize: 17,
      right: '12px',
      color: theme.palette.common.black75,
    },
  },
}))(({ classes, ...props }: SelectProps & {classes: {select: string}}) => (
  <Select
    fullWidth
    className={classes.select}
    disableUnderline
    IconComponent={FiChevronDown}
    {...props}
  />
));
