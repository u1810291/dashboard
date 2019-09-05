import PropTypes from 'prop-types';
import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import classNames from 'classnames';
import BaseInput from './BaseInput';
import CSS from '../text-field/TextField.module.css';

export default function Input(props) {
  return (
    <BaseInput
      {...props}
      renderer={(fieldProps) => (
        <DebounceInput
          className={classNames(CSS.textField, fieldProps.error && CSS.error)}
          debounceTimeout={props.debounceTimeout}
          {...fieldProps} // eslint-disable-line react/jsx-props-no-spreading
        />
      )}
    />
  );
}

Input.propTypes = {
  debounceTimeout: PropTypes.number,
};

Input.defaultProps = {
  debounceTimeout: 300,
};
