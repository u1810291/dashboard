import PropTypes from 'prop-types';
import React from 'react';
import Select, { components } from 'react-select';
import classNames from 'classnames';

import CSS from './SelectField.module.scss';
import { ReactComponent as DownArrow } from './downArrow.svg';

const DropdownIndicator = (props) => (
  components.DropdownIndicator && (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <components.DropdownIndicator {...props}>
    <DownArrow />
  </components.DropdownIndicator>
  )
);

export default function SelectField({
  className,
  error,
  onChange,
  value,
  options,
  ...inputProps
}) {
  function onSelectChange({ value: nextValue }) {
    onChange({
      target: {
        name: inputProps.name,
        value: nextValue,
      },
    });
  }
  return (
    <Select
      className={classNames(CSS.selectField, error && CSS.error, className)}
      classNamePrefix="select-field"
      components={{ DropdownIndicator }}
      onChange={onSelectChange}
      options={options}
      value={options.find((o) => o.value === value)}
      {...inputProps} // eslint-disable-line react/jsx-props-no-spreading
    />
  );
}

SelectField.propTypes = {
  error: PropTypes.shape({}),
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({})),
  value: PropTypes.string,
};

SelectField.defaultProps = {
  error: undefined,
  name: '',
  onChange: () => {},
  options: [],
  value: '',
};
