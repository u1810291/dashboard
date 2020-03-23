import { Items, Text } from 'components';
import ColorCheckButton from 'components/color-check-button';
import cssVariable from 'lib/dom';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { styleUpdate } from 'state/merchant/merchant.actions';
import { selectColor } from 'state/merchant/merchant.selectors';
import { ReactComponent as ColorPicker } from './color-picker.svg';
import CSS from './ConfigureColor.module.css';

function getColorValue(value, presets) {
  const preset = presets.find(([, color]) => color === value);
  return preset ? preset[0] : value;
}

function getPresets() {
  // should be lazy, after document ready
  return [
    [cssVariable('--mgi-theme-palette-lightblue'), 'blue'],
    [cssVariable('--mgi-theme-palette-green'), 'green'],
    [cssVariable('--mgi-theme-palette-red'), 'red'],
    [cssVariable('--mgi-theme-palette-pink'), 'pink'],
    [cssVariable('--mgi-theme-palette-orange'), 'orange'],
    [cssVariable('--mgi-theme-palette-yellow'), 'yellow'],
  ];
}

export function ConfigureColor() {
  const dispatch = useDispatch();
  const [showPicker, setShowPicker] = useState(false);
  const [color, setColor] = useState(null);
  const colorValue = useSelector(selectColor);
  const [presets] = useState(() => getPresets());

  const onBackgroundClick = useCallback(() => {
    setShowPicker(false);
  }, [setShowPicker]);

  const updateColor = useCallback((value) => {
    dispatch(styleUpdate({ color: value }));
  }, [dispatch]);

  const onClickDebounced = useCallback(debounce(updateColor, 600), []);

  const handleChange = useCallback((value) => {
    setColor(getColorValue(value, presets));
    updateColor(value);
  }, [updateColor, setColor, presets]);

  const handlePickerChange = useCallback((value) => {
    setColor(value.hex);
    onClickDebounced(value.hex);
  }, [setColor, onClickDebounced]);

  useEffect(() => {
    window.addEventListener('click', onBackgroundClick, false);
    return () => window.removeEventListener('click', onBackgroundClick);
  }, [onBackgroundClick]);

  useEffect(() => {
    setColor(getColorValue(colorValue, presets));
  }, [color, colorValue, presets]);

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
              key={`${presetName}-${presetColor}`}
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
