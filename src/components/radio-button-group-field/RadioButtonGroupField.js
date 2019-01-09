import React, { Component } from 'react'
import CSS from './RadioButtonGroupField.scss'

export default class RadioButtonGroupField extends Component {
  render() {
    const { options, name, value, ...radioProps } = this.props

    const radioButtons = options && options.map((item, index) => (
      <label className={CSS.itemWrapper} key={index}>
        {item.label}
        <input
          type="radio"
          name={name}
          value={item.value}
          defaultChecked={value === item.value}
        />
        <span className={CSS.checkmark} />
      </label>
    ))

    return <div {...radioProps}>{radioButtons}</div>
  }
}
