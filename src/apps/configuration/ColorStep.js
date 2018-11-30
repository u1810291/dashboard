import React from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import ColorCheckButton from 'src/components/color-check-button'
import CSS from './ColorStep.css'

export default function ColorStep({
  availableButtonColors = [],
  currentColor,
  onClick = () => {}
}) {
  return (
    <div>
      <h4>
        <FormattedMessage id="flow.colorStep.title" />
      </h4>
      <div className={classNames('mgi-items', CSS.buttons)}>
        {availableButtonColors.map(color => (
          <ColorCheckButton
            key={color}
            color={color}
            checked={color === currentColor}
            onChange={() => onClick({ color })}
          />
        ))}
      </div>
    </div>
  )
}
