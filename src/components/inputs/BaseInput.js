import React from 'react'
import { injectIntl } from 'react-intl'
import { withI18nContext } from 'src/components/i18n-context'
import classNames from 'classnames'
import { get } from 'lodash'
import CSS from './Input.css'

export default
@injectIntl
@withI18nContext
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
      ...inputOptions
    } = this.props
    let i18nLabel, i18nPlaceholder

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

    const error = form && field ? get(form.status, field.name) : null

    return (
      <div className={classNames(CSS.input, className)}>
        {!hideLabel && (
          <label className="text-caption">{label || i18nLabel}</label>
        )}
        {renderer({
          placeholder: placeholder || i18nPlaceholder,
          ...field,
          ...inputOptions
        })}
        {error && <p className={CSS.error}>{error}</p>}
      </div>
    )
  }
}
