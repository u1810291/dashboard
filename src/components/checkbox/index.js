import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import { ReactComponent as IconCheckmark } from '../../assets/icon-checkmark.svg';

import CSS from './checkbox.module.scss';

export default function CheckBox({ className, name, label, value, checked, onChange }) {
  return (
    <div className={classNames(CSS.checkbox, className)}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={CSS.checkboxLabel}>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          value={value}
          onChange={onChange}
        />
        <div className={CSS.checkboxIcon}>
          <IconCheckmark />
        </div>
        <span className={CSS.checkboxTitle}>{label}</span>
      </label>
    </div>
  );
}

CheckBox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

CheckBox.defaultProps = {
  checked: false,
  label: '',
  name: '',
  onChange: () => {},
  value: '',
};
