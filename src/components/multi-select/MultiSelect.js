import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';

import CSS from './MultiSelect.module.scss';

export default class MultiSelect extends React.Component {
  static defaultProps = {
    onChange: () => {},
    value: [],
  }

  constructor(props) {
    super(props);
    const { value } = this.props;
    this.state = { value };
  }

  onChange = (value) => {
    this.setState({ value });
    this.props.onChange(value);
  }

  deleteOption = (optionIndex) => {
    this.setState(
      (state) => ({
        value: state.value.filter((option, index) => index !== optionIndex),
      }),
      () => this.props.onChange && this.props.onChange(this.state.value),
    );
  }

  render() {
    const {
      className,
      selectClassName,
      valuesClassName,
      ...inputOptions
    } = this.props;
    const { value } = this.state;

    return (
      <div className={classNames(CSS.multiSelect, className)}>
        <Select
          isMulti
          {...inputOptions} // eslint-disable-line react/jsx-props-no-spreading
          className={classNames(CSS.select, selectClassName)}
          value={value}
          isSearchable
          controlShouldRenderValue={false}
          onChange={this.onChange}
        />
        <div className={valuesClassName}>
          {(value || []).map((option, index) => (
            <button
              className={CSS.valueItem}
              key={index} // eslint-disable-line react/no-array-index-key
              onClick={() => this.deleteOption(index)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
