import React, { useState } from 'react';
import MuiSwitch, { SwitchProps } from '@material-ui/core/Switch';
import { useStyles } from './Switch.styles';

export const Switch = ({ onSwitch, checked, ...props }: {
  checked: boolean;
  onSwitch?: (value: boolean, callback?: () => void) => void;
  props?: SwitchProps;
}) => {
  const classes = useStyles();
  const [isChecked, setIsChecked] = useState<boolean>(checked || false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked: value } = event.target;

    if (value && onSwitch) {
      onSwitch(value, () => setIsChecked(value));
      return;
    }

    setIsChecked(value);
    onSwitch(value);
  };

  if (onSwitch) {
    return (
      <MuiSwitch
        checked={isChecked}
        onChange={handleChange}
        {...props}
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
      />
    );
  }

  return (
    <MuiSwitch
      {...props}
      checked={checked}
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
    />
  );
};
