import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { ChromePicker } from 'react-color';

import ColorCheckButton from 'components/color-check-button';
import { Text, Items } from 'components';
import { ReactComponent as ColorPicker } from './color-picker.svg';
import CSS from './ConfigureColor.module.css';

function getColorValue(value, presets) {
  const preset = presets.find(([, color]) => color === value);
  return preset ? preset[0] : value;
}

export default function ConfigureColor({
  presets = [],
  style = {},
  onClick = () => {},
}) {
  const [showPicker, setShowPicker] = useState(false);
  const [color, setColor] = useState(null);

  const onClickDebounced = debounce(onClick, 600);

  const onBackgroundClick = () => {
    setShowPicker(false);
  };

  const handleChange = (value) => {
    setColor(getColorValue(value, presets));
    onClick({ style: { ...style, color: value } });
  };

  const handlePickerChange = (value) => {
    setColor(value.hex);
    onClickDebounced({ style: { ...style, color: value.hex } });
  };

  useEffect(() => {
    window.addEventListener('click', onBackgroundClick, false);
    return function cleanup() {
      window.removeEventListener('click', onBackgroundClick);
    };
  }, []);

  useEffect(() => {
    if (!color) setColor(getColorValue(style.color, presets));
  }, [style.color, color, presets]);

  return (
    <fieldset className="mgi-fieldset">
      <Items gap={1} flow="row" justifyContent="start">
        <Text size={2.5} weight={4}>
          <FormattedMessage id="flow.colorStep.title" />
        </Text>
        <Text lineHeight={1.3} className={CSS.textBlock}>
          <FormattedMessage id="flow.colorStep.description" />
        </Text>
        <Items gap={0} flow="row" justifyContent="start" templateColumns="100%">
          {presets.map(([presetName, presetColor]) => (
            <ColorCheckButton
              key={presetName}
              color={presetColor}
              checked={presetName === color}
              onChange={() => handleChange(presetColor, presetName)}
            />
          ))}
          <div className={CSS.colorPickerContainer}>
            <span
              className={CSS.colorPickerWrapper}
              onClick={(e) => e.stopPropagation()}
              onKeyUp={() => {}}
              role="button"
              tabIndex="0"
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
            </span>
            <Text>
              <FormattedMessage id="flow.colorStep.picker" />
            </Text>
          </div>
        </Items>
      </Items>
    </fieldset>
  );
}

ConfigureColor.propTypes = {
  onClick: PropTypes.func,
  presets: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  style: PropTypes.shape(),
};

ConfigureColor.defaultProps = {
  onClick: () => {},
  presets: [],
  style: {},
};
