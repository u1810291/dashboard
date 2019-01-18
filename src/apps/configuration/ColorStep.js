import React from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import ColorCheckButton from 'src/components/color-check-button'
import CSS from './ColorStep.css'

export default function ColorStep({
  availableButtonColors = [],
  style = {},
  onClick = () => {}
}) {
  const handleChange = value => {
    onClick({ style: { ...style, color: value } })
  }
  return (
    <fieldset className="mgi-fieldset">
      <legend>
        <h3>
          <FormattedMessage id="flow.colorStep.title" />
        </h3>
      </legend>
      <div className={classNames('mgi-items', CSS.buttons)}>
        {availableButtonColors.map(color => (
          <ColorCheckButton
            key={color}
            color={color}
            checked={color === style.color}
            onChange={() => handleChange(color)}
          />
        ))}
      </div>
    </fieldset>
  )
}
