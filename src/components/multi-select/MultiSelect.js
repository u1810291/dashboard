import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Select from 'react-select';
import { useStyles } from './MultiSelect.styles';

export function MultiSelect({
  onChange = () => {},
  range = [],
  className,
  valuesClassName,
  selectClassName,
  ...props
}) {
  const [value, setValue] = useState();
  const classes = useStyles();

  useEffect(() => {
    setValue(range);
  }, [range]);

  function onChangeHandler(changes) {
    setValue(changes);
    onChange(changes);
  }

  function deleteOption(optionIndex) {
    const rest = value.filter((option, index) => index !== optionIndex);
    setValue(rest);
    onChange(rest);
  }

  return (
    <div className={clsx(classes.multiSelect, className)}>
      <Select
        isMulti
        {...props}
        className={clsx(classes.select, selectClassName)}
        value={value}
        isSearchable
        controlShouldRenderValue={false}
        onChange={onChangeHandler}
      />
      <div className={valuesClassName}>
        {(value || []).map((option, index) => (
          <button
            className={classes.valueItem}
            key={index} // eslint-disable-line react/no-array-index-key
            onClick={() => deleteOption(index)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
