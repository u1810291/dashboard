import React, { Component } from 'react'
import Checkbox from 'components/checkbox'
import CSS from './checkbox-group.module.scss'

export default class CheckboxGroup extends Component {
  constructor(props) {
    super(props)

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
  }

  handleCheckboxChange({ target }) {
    if (target.checked) {
      this.props.onChange([...(this.props.values || []), target.value])
    } else {
      this.props.onChange(this.props.values.filter(v => v !== target.value))
    }
  }

  render() {
    const { label, name, values = [], items = [] } = this.props

    return (
      <fieldset className={CSS.checkboxGroup}>
        {label && <legend className={CSS.checkboxGroupLabel}>{label}</legend>}
        {items.map(({ label, value }) => {
          return (
            <div className={CSS.checkboxGroupItem} key={value}>
              <Checkbox
                checked={values.includes(value)}
                label={label}
                name={name}
                value={value}
                onChange={this.handleCheckboxChange}
              />
            </div>
          )
        })}
      </fieldset>
    )
  }
}
