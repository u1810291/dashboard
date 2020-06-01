import React from 'react';
import Checkbox from 'components/checkbox';
import { useStyles } from './CheckboxGroup.styles';

export default function CheckboxGroup({
  items = [],
  values = [],
  onChange = () => {},
  label = '',
  name = '',
}) {
  const classes = useStyles();

  function handleCheckboxChange({ target }) {
    if (target.checked) {
      onChange([...(values || []), target.value]);
    } else {
      onChange(values.filter((value) => value !== target.value));
    }
  }

  return (
    <fieldset className={classes.checkboxGroup}>
      {label && <legend className={classes.checkboxGroupLabel}>{label}</legend>}
      {/* eslint-disable-next-line no-shadow */}
      {items.map(({ label, value }) => (
        <div className={classes.checkboxGroupItem} key={value}>
          <Checkbox
            checked={values.includes(value)}
            label={label}
            name={name}
            value={value}
            onChange={handleCheckboxChange}
          />
        </div>
      ))}
    </fieldset>
  );
}
