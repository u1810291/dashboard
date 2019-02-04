import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import Button from 'src/components/button'
import TextField from 'src/components/text-field'
import CSS from './TextEditable.css'
import TextFieldCSS from 'src/components/text-field/TextField.css'
import EditIcon from './icon-edit.svg'
import Spinner from 'src/components/spinner'

export default class TextEditable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: this.props.isEditing || false,
      savedText: this.props.text || '',
      editingText: this.props.text || '',
      doNotBlur: false
    }
  }

  onMouseEnter = () => {
    this.setState({ doNotBlur: true })
  }

  onMouseLeave = () => {
    this.setState({ doNotBlur: false })
  }

  onBlur = () => {
    if (this.state.doNotBlur) return
    this.setState({
      editingText: this.state.savedText,
      isEditing: false
    })
  }

  onFocus = () => {
    this.setState({ isEditing: true })
  }

  onChange = (e) => {
    this.setState({ editingText: e.target.value })
  }

  onKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      return
    }
    if (e.key === 'Enter') {
      this.onSubmit()
      e.stopPropagation()
    }
  }

  onSubmit = () => {
    this.setState({ savedText: this.state.editingText })
    this.setState({ isEditing: false })
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.editingText)
    }
  }

  render() {
    const {
      className,
      inputClassName,
      textClassName,
      isLoading,
      ...inputOptions
    } = this.props

    if (this.state.isEditing) {
      return (
        <div className={className}>
          <div
            className={CSS.inputWrapper}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          >
            <TextField
              className={classNames(CSS.textEditable, inputClassName)}
              type="text"
              value={this.state.editingText}
              onBlur={this.onBlur}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              autoFocus
              {...inputOptions}
            />
            <div>
              <Button
                buttonStyle="primary"
                className={CSS.okButton}
                onClick={this.onSubmit}
              >
              <FormattedMessage id="ok" />
            </Button>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className={className}>
        <div
          className={classNames(
            TextFieldCSS.textField,
            CSS.textWrapper,
            textClassName
          )}
          onClick={this.onFocus}
        >
          <span>{(this.props.error ? this.props.text : this.state.savedText) || '—'}</span>
          {isLoading ? <Spinner className={CSS.spinner} /> : <EditIcon className={CSS.editIcon} />}
        </div>
      </div>
    )
  }
}

TextEditable.propTypes = {
  className: PropTypes.string,
  isEditing: PropTypes.bool,
  textClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  text: PropTypes.string,
  onSubmit: PropTypes.func
}
