import React from 'react';
import clsx from 'clsx';
import { ReactComponent as IconCheckmark } from '../../assets/icon-checkmark.svg';
import { useStyles } from './CheckBox.styles';

export default function CheckBox({ className, name, label, value, checked, onChange }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.checkbox, className)}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={classes.checkboxLabel}>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          value={value}
          onChange={onChange}
        />
        <div className={classes.checkboxIcon}>
          <IconCheckmark />
        </div>
        <span className={classes.checkboxTitle}>{label}</span>
      </label>
    </div>
  );
}
