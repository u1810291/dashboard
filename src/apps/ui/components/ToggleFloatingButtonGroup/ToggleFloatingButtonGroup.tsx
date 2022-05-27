import React from 'react';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { useStyles, StyledToggleButtonGroup } from './ToggleFloatingButtonGroup.styles';

export function ToggleFloatingButtonGroup({ value, options, onChange }: {
    value: string;
    options: { name: string; value: unknown }[];
    onChange: (option: string) => void;
}) {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.searchModeWrapper}>
      <StyledToggleButtonGroup
        color="secondary"
        exclusive
        onChange={(_, mode) => onChange(mode)}
        value={value}
        className={classes.searchModeToggle}
      >
        {options.map((option) => (
          <ToggleButton value={option.value} key={option.name}>{option.name}</ToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </Paper>
  );
}
