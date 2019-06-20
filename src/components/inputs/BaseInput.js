import React from 'react'
import { injectIntl } from 'react-intl'
import fp from 'lodash/fp'
import { withI18nContext } from 'components/i18n-context'
import classNames from 'classnames'
import { get } from 'lodash'
import CSS from './Input.module.css'

class BaseInput extends React.Component {
  render() {
    const {
      field,
      form,
      label,
      placeholder,
      intl,
      i18nContext,
      hideLabel = false,
      renderer = () => {},
      className,
      error,
      ...inputOptions
    } = this.props
    let i18nLabel, i18nPlaceholder
    let validationError

    if (!hideLabel && !label && i18nContext && field) {
      i18nLabel = intl.formatMessage({
        id: [i18nContext, 'labels', field.name].filter(a => a).join('.')
      })
    }

    if (!placeholder && i18nContext && field) {
      i18nPlaceholder = intl.formatMessage({
        id: [i18nContext, 'placeholders', field.name].filter(a => a).join('.')
      })
    }

    if (error) {
      validationError = intl.formatMessage({ id: error })
    } else {
      validationError = form && field ? get(form.status, field.name) : null
    }

    return (
      <div className={classNames(CSS.input, className)}>
        {!hideLabel && <label>{label || i18nLabel}</label>}
        {renderer({
          placeholder: placeholder || i18nPlaceholder,
          error: validationError,
          ...field,
          ...inputOptions
        })}
        {validationError && <p className={CSS.error}>{validationError}</p>}
      </div>
    )
  }
}

export default fp.flowRight(
  injectIntl,
  withI18nContext
)(BaseInput)
