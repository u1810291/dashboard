import React, { useCallback, useEffect, useState } from 'react';
import Select from 'react-select';
import { useStyles } from './MultiSelect.styles';

export function MultiSelect({ range = [], options, onChange }) {
  const [value, setValue] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setValue(range);
  }, [range]);

  const handleChange = useCallback((values) => {
    setValue(values);
    onChange(values);
  }, [onChange]);

  const handleDelete = useCallback((optionIndex) => () => {
    const rest = value.filter((option, index) => index !== optionIndex);
    setValue(rest);
    onChange(rest);
  }, [onChange, value]);

  return (
    <div className={classes.multiSelect}>
      <Select
        isMulti
        options={options}
        className={classes.select}
        value={value}
        isSearchable
        controlShouldRenderValue={false}
        onChange={handleChange}
      />
      <div>
        {(value || []).map((option, index) => (
          <button
            className={classes.valueItem}
            key={index}
            onClick={handleDelete(index)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
