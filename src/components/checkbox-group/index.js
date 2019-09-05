import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Checkbox from 'components/checkbox';

import CSS from './checkbox-group.module.scss';

export default class CheckboxGroup extends Component {
  static defaultProps = {
    items: [],
    label: '',
    name: '',
    onChange: () => {},
    values: [],
  }

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({})),
    label: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string,
    ]),
    name: PropTypes.string,
    onChange: PropTypes.func,
    values: PropTypes.arrayOf(PropTypes.string),
  }

  constructor(props) {
    super(props);

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleCheckboxChange({ target }) {
    const { onChange, values } = this.props;
    if (target.checked) {
      onChange([...(values || []), target.value]);
    } else {
      onChange(values.filter((value) => value !== target.value));
    }
  }

  render() {
    const { label, name, values = [], items = [] } = this.props;

    return (
      <fieldset className={CSS.checkboxGroup}>
        {label && <legend className={CSS.checkboxGroupLabel}>{label}</legend>}
        {/* eslint-disable-next-line no-shadow */}
        {items.map(({ label, value }) => (
          <div className={CSS.checkboxGroupItem} key={value}>
            <Checkbox
              checked={values.includes(value)}
              label={label}
              name={name}
              value={value}
              onChange={this.handleCheckboxChange}
            />
          </div>
        ))}
      </fieldset>
    );
  }
}
