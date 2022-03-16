import React from 'react';
import { SelectProps as MaterialSelectProps } from '@material-ui/core/Select';
import { FiChevronDown } from 'react-icons/all';
import { useStyles, StyledSelect } from './Select.styles';

export interface SelectProps extends MaterialSelectProps {
  children: React.ReactNode;
}

export function Select({ children, ...props }: SelectProps) {
  const classes = useStyles();
  return (
    <StyledSelect
      IconComponent={() => <FiChevronDown size={25} className={classes.buttonIcon} />}
      {...props}
    >
      {children}
    </StyledSelect>
  );
}
