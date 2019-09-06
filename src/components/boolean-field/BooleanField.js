import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import CSS from './BooleanField.module.css';

export default class BooleanField extends React.Component {
  static defaultProps = {
    checked: false,
    indeterminate: false,
    label: '',
    onChange: () => {},
    onClick: () => {},
  }

  static propTypes = {
    checked: PropTypes.bool,
    indeterminate: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
  }

  componentDidMount() {
    this.handleIndeterminateState();
  }

  componentDidUpdate() {
    this.handleIndeterminateState();
  }

  handleIndeterminateState() {
    const { refs: { input }, props: { indeterminate } } = this;
    input.indeterminate = indeterminate;
  }

  render() {
    const {
      label,
      className,
      onChange = () => {},
      onClick = () => {},
      checked = false,
      // eslint-disable-next-line no-unused-vars
      indeterminate = false, // excludes the boolean value from inputProps
      ...inputProps
    } = this.props;

    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label
        className={classNames(CSS.booleanField, className)}
        onClick={(event) => onClick(event, event.currentTarget.querySelector('input').checked)}
      >
        <input
          ref="input" // eslint-disable-line react/no-string-refs
          type="checkbox"
          onChange={onChange}
          checked={checked}
          {...inputProps} // eslint-disable-line react/jsx-props-no-spreading
        />
        {label && <span>{label}</span>}
      </label>
    );
  }
}
