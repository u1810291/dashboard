import React, { useState } from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import MuiSwitch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';

interface Styles extends Partial<Record<SwitchClassKey, string>> {
    focusVisible?: string;
}

interface Props extends SwitchProps {
    classes: Styles;
}

const StyledSwitch = withStyles((theme: Theme) => createStyles({
  root: {
    width: 30,
    height: 17,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(13px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: theme.palette.common.green,
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 15,
    height: 15,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.common.black50}`,
    backgroundColor: theme.palette.common.black50,
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }: Props) => (
  <MuiSwitch
    focusVisibleClassName={classes.focusVisible}
    disableRipple
    classes={{
      root: classes.root,
      switchBase: classes.switchBase,
      thumb: classes.thumb,
      track: classes.track,
      checked: classes.checked,
    }}
    {...props}
  />
));

export const Switch = ({ onSwitch, checked, ...props }: {
  checked: boolean;
  onSwitch?: (value: boolean, callback?: () => void) => void;
  props?: Props;
}) => {
  const [isChecked, setIsChecked] = useState(checked || false);

  const handleChange = (event) => {
    const { checked: value } = event.target;

    if (value && onSwitch) {
      onSwitch(value, () => setIsChecked(value));
      return;
    }

    setIsChecked(value);
    onSwitch(value);
  };

  if (onSwitch) {
    return <StyledSwitch checked={isChecked} onChange={handleChange} {...props} />;
  }

  return (
    <StyledSwitch checked={checked} {...props} />
  );
};
