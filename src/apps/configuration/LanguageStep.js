import React from 'react'
import { FormattedMessage } from 'react-intl'
import Select, { components } from 'react-select'
import icons from 'src/assets/language-icons'
import CSS from './LanguageStep.css'

function LanguageLine({ language }) {
  return (
    <div className={CSS.languageLine}>
      <img src={icons[language]} alt="" />
      <FormattedMessage id={`flow.languageStep.${language}`} />
    </div>
  )
}

function Option({ children, ...props }) {
  return (
    <components.Option {...props}>
      <LanguageLine language={props.data.value} />
    </components.Option>
  )
}

function SingleValue({ children, ...props }) {
  return (
    <components.SingleValue {...props}>
      <LanguageLine language={props.data.value} />
    </components.SingleValue>
  )
}

export default function LanguageStep({
  availableLanguages = [],
  style = {},
  onClick = () => {}
}) {
  const options = availableLanguages.map(code => ({ value: code }))
  const handleChange = value => {
    onClick({ style: { ...style, language: value } })
  }
  return (
    <fieldset className="mgi-fieldset configure-flow-card">
      <legend>
        <h3>
          <FormattedMessage id="flow.languageStep.title" />
        </h3>
      </legend>
      <div className={CSS.flowCards}>
        <Select
          onChange={({ value }) => handleChange(value)}
          value={{ value: style.language }}
          options={options}
          components={{ SingleValue, Option }}
        />
      </div>
    </fieldset>
  )
}
