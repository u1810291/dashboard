import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { debounce } from 'lodash'
import { FormattedMessage } from 'react-intl'
import { ChromePicker } from 'react-color'
import ColorCheckButton from 'src/components/color-check-button'
import { ReactComponent as ColorPicker } from './color-picker.svg'
import CSS from './ConfigureColor.css'

export default function ConfigureColor({ presets = [], style = {}, onClick = () => {} }) {
  const [showPicker, setShowPicker] = useState(false)
  const [color, setColor] = useState(null)

  const onClickDebounced = debounce(onClick, 600)

  const getColorValue = value => {
    const preset = presets.find(([, preset]) => preset === value)
    return preset ? preset[0] : value
  }

  const onBackgroundClick = () => {
    setShowPicker(false)
  }

  const handleChange = value => {
    setColor(getColorValue(value))
    onClick({ style: { ...style, color: value } })
  }

  const handlePickerChange = value => {
    setColor(value.hex)
    onClickDebounced({ style: { ...style, color: value.hex } })
  }

  useEffect(() => {
    window.addEventListener('click', onBackgroundClick, false)
    return function cleanup() {
      window.removeEventListener('click', onBackgroundClick)
    }
  }, [])

  useEffect(
    () => {
      if (!color) setColor(getColorValue(style.color))
    },
    [style.color]
  )

  return (
    <fieldset className="mgi-fieldset">
      <legend>
        <h3>
          <FormattedMessage id="flow.colorStep.title" />
        </h3>
      </legend>
      <div className={classNames('mgi-items', CSS.buttons)}>
        {presets.map(([presetName, presetColor]) => (
          <ColorCheckButton
            key={presetName}
            color={presetColor}
            checked={presetName === color}
            onChange={() => handleChange(presetColor, presetName)}
          />
        ))}
        <div className={CSS.colorPickerWrapper} onClick={e => e.stopPropagation()}>
          <ColorPicker
            className={CSS.colorPickerButton}
            stroke={color}
            onClick={() => setShowPicker(true)}
          />
          {showPicker && (
            <div className={CSS.colorPicker}>
              <ChromePicker color={color} disableAlpha onChangeComplete={handlePickerChange} />
            </div>
          )}
        </div>
      </div>
    </fieldset>
  )
}
