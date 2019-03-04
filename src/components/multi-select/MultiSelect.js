import React from 'react'
import classNames from 'classnames'
import CSS from './MultiSelect.scss'
import Select from 'react-select'

export default class MultiSelect extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: this.props.value || []
    }
  }

  onChange = (value) => {
    this.setState({
      value
    })
    this.props.onChange && this.props.onChange(value)
  }

  deleteOption = (optionIndex) => {
    this.setState(
      { value: this.state.value.filter((option, index) => index !== optionIndex) },
      () => this.props.onChange && this.props.onChange(this.state.value)
    )
  }

  render() {
    const {
      className,
      selectClassName,
      valuesClassName,
      ...inputOptions
    } = this.props
    const { value } = this.state

    return (
      <div className={classNames(CSS.multiSelect, className)}>
        <Select
          isMulti
          {...inputOptions}
          className={classNames(CSS.select, selectClassName)}
          value={value}
          isSearchable
          controlShouldRenderValue={false}
          onChange={this.onChange}
        />
        <div className={valuesClassName}>
          {value.map((option, index) =>
            <button
              key={index}
              className={CSS.valueItem}
              onClick={() => this.deleteOption(index)}
            >{option.label}</button>
          )}
        </div>
      </div>
    )
  }
}
