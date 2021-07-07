import { Box, Typography } from '@material-ui/core';
import { useDebounce } from 'lib/debounce.hook';
import cssVariable from 'lib/dom';
import { QATags } from 'models/QA.model';
import React, { useCallback, useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { flowStyleUpdate } from 'state/merchant/merchant.actions';
import { selectColor } from 'state/merchant/merchant.selectors';
import { ColorCheckButton } from '../ColorCheckButton/ColorCheckButton';
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
  const intl = useIntl();
  const debounced = useDebounce(500);
  const [showPicker, setShowPicker] = useState(false);
  const colorValue = useSelector(selectColor);
  const [presets] = useState(getPresets());
  const [color, setColor] = useState(getColorValue(colorValue, presets));

  const onBackgroundClick = useCallback(() => {
    setShowPicker(false);
  }, [setShowPicker]);

  const updateColor = useCallback((value) => {
    dispatch(flowStyleUpdate({ color: value }));
  }, [dispatch]);

  const handleChange = useCallback((value) => {
    setColor(getColorValue(value, presets));
    debounced(() => updateColor(value));
  }, [presets, debounced, updateColor]);

  const handlePickerChange = useCallback((value) => {
    setColor(value.hex);
    debounced(() => updateColor(value.hex));
  }, [debounced, updateColor]);

  useEffect(() => {
    window.addEventListener('click', onBackgroundClick, false);
    return () => window.removeEventListener('click', onBackgroundClick);
  }, [onBackgroundClick]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {intl.formatMessage({ id: 'flow.colorStep.title' })}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {intl.formatMessage({ id: 'flow.colorStep.description' })}
      </Typography>

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
          data-qa={QATags.MatiButton.ColorPickerButton}
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
        <Typography variant="body1">
          {intl.formatMessage({ id: 'flow.colorStep.picker' })}
        </Typography>
      </div>
    </Box>
  );
}
