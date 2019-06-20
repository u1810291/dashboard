import React, { useState, useEffect } from 'react'
import { debounce } from 'lodash'
import { FormattedMessage } from 'react-intl'
import { ChromePicker } from 'react-color'
import ColorCheckButton from 'components/color-check-button'
import Items from 'components/items'
import { ReactComponent as ColorPicker } from './color-picker.svg'
import CSS from './ConfigureColor.module.css'

function getColorValue(value, presets) {
  const preset = presets.find(([, preset]) => preset === value)
  return preset ? preset[0] : value
}

export default function ConfigureColor({
  presets = [],
  style = {},
  onClick = () => {}
}) {
  const [showPicker, setShowPicker] = useState(false)
  const [color, setColor] = useState(null)

  const onClickDebounced = debounce(onClick, 600)

  const onBackgroundClick = () => {
    setShowPicker(false)
  }

  const handleChange = value => {
    setColor(getColorValue(value, presets))
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

  useEffect(() => {
    if (!color) setColor(getColorValue(style.color, presets))
  }, [style.color, color, presets])

  return (
    <fieldset className="mgi-fieldset">
      <legend>
        <h3>
          <FormattedMessage id="flow.colorStep.title" />
        </h3>
      </legend>
      <Items gap={1} justifyContent="start">
        {presets.map(([presetName, presetColor]) => (
          <ColorCheckButton
            key={presetName}
            color={presetColor}
            checked={presetName === color}
            onChange={() => handleChange(presetColor, presetName)}
          />
        ))}
        <div
          className={CSS.colorPickerWrapper}
          onClick={e => e.stopPropagation()}
        >
          <ColorPicker
            className={CSS.colorPickerButton}
            stroke={color}
            onClick={() => setShowPicker(true)}
          />
          {showPicker && (
            <div className={CSS.colorPicker}>
              <ChromePicker
                color={color}
                disableAlpha
                onChangeComplete={handlePickerChange}
              />
            </div>
          )}
        </div>
      </Items>
    </fieldset>
  )
}
