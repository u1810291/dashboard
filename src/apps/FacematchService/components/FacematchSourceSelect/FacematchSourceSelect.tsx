import React, { ChangeEvent, ReactNode } from 'react';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useStyles } from './FacematchSourceSelect.styles';

export interface IFacematchSourceSelectMenuItem {
  value: string | number;
  title: string;
}

export interface IFacematchSourceSelect {
  onChange: (
    event: ChangeEvent<{ name?: string; value: unknown }>,
    child: ReactNode
  ) => void;
  menuItems: IFacematchSourceSelectMenuItem[];
  value?: number | string;
  displayEmpty?: boolean;
}

export function FacematchSourceSelect({
  value,
  onChange,
  menuItems,
  displayEmpty = true,
}: IFacematchSourceSelect) {
  const classes = useStyles();
  return (
    <FormControl fullWidth variant="outlined">
      <Select
        className={classes.select}
        value={value}
        onChange={onChange}
        displayEmpty={displayEmpty}
      >
        {displayEmpty && (
          <MenuItem value="" disabled>
            Select a source
          </MenuItem>
        )}
        {menuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>{item.title}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
