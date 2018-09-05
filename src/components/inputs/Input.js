import React from 'react'
import { injectIntl } from 'react-intl'
import { withI18nContext } from 'src/components/i18n-context'

@injectIntl
@withI18nContext
export default class Input extends React.Component {
  render() {
    const {
      field,
      form,
      label,
      type='text',
      intl,
      i18nContext,
      ...inputOptions
    } = this.props

    const i18nLabel = intl.formatMessage({ id: [i18nContext, field.name].filter(a => a).join('.') })

    return (
      <div>
        <label>
          {label || i18nLabel}
        </label>
        <input
          type={type}
          {...field}
          {...inputOptions}
        />
      </div>
    )
  }
}