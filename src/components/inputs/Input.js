import React from 'react'
import { injectIntl } from 'react-intl'
import { TextField } from 'mgi-ui-components'
import { withI18nContext } from 'src/components/i18n-context'
import { get } from 'lodash'
import CSS from './Input.css'

@injectIntl
@withI18nContext
export default class Input extends React.Component {
  render() {
    const {
      field,
      form,
      label,
      placeholder,
      type = 'text',
      intl,
      i18nContext,
      ...inputOptions
    } = this.props

    const i18nLabel = intl.formatMessage({
      id: [i18nContext, 'labels', field.name].filter(a => a).join('.')
    })
    const i18nPlaceholder = intl.formatMessage({
      id: [i18nContext, 'placeholders', field.name].filter(a => a).join('.')
    })
    const error = get(form.status, field.name)

    return (
      <div className={CSS.input}>
        <label>{label || i18nLabel}</label>
        <TextField
          type={type}
          placeholder={placeholder || i18nPlaceholder}
          {...field}
          {...inputOptions}
        />
        {error && (
          <p className={CSS.error}>{error}</p>
        )}
      </div>
    )
  }
}
