import PropTypes from 'prop-types';
import React from 'react';
import Select, { components } from 'react-select';
import classNames from 'classnames';

import CSS from './SelectField.module.scss';
import { ReactComponent as DownArrow } from './downArrow.svg';

const DropdownIndicator = (props) => (
  components.DropdownIndicator && (
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
  return (
    <Select
      className={classNames(CSS.selectField, error && CSS.error, className)}
      classNamePrefix="select-field"
      components={{ DropdownIndicator }}
      onChange={onChange}
      options={options}
      value={value}
      {...inputProps}
    />
  );
}

SelectField.propTypes = {
  error: PropTypes.shape({}),
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({})),
  value: PropTypes.shape({}),
};

SelectField.defaultProps = {
  error: undefined,
  name: '',
  onChange: () => {},
  value: {},
  options: [],
};
