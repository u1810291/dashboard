import React from 'react'
import classNames from 'classnames'
import CSS from './BooleanField.css'

export default class BooleanField extends React.Component {
  componentDidMount() {
    this.handleIndeterminateState()
  }

  componentDidUpdate() {
    this.handleIndeterminateState()
  }

  handleIndeterminateState() {
    this.refs.input.indeterminate = this.props.indeterminate
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
    } = this.props

    return (
      <label
        className={classNames(CSS.booleanField, className)}
        onClick={event => onClick(event, event.currentTarget.querySelector('input').checked)}
      >
        <input
          ref="input"
          type="checkbox"
          onChange={onChange}
          checked={checked}
          {...inputProps}
        />
        {label && (<span>{label}</span>)}
      </label>
    )
  }
}
