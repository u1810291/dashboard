import { Box, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { useIntl } from 'react-intl';
import { QATags } from 'models/QA.model';
import { ReactComponent as ColorPickerIcon } from '../../assets/color-picker.svg';
import { ColorCheckButton } from '../ColorCheckButton/ColorCheckButton';
import { useStyles } from './ColorPicker.styles';
import { getPresets, getColorValue, Colors } from '../../models/ColorPicker.models';

export function ColorPicker({ activeColor, onChange }: {
  activeColor: string;
  onChange?: (color: string) => void;
}) {
  const intl = useIntl();
  const [showPicker, setShowPicker] = useState(false);
  const [color, setColor] = useState(activeColor);
  const [presets] = useState(getPresets());
  const classes = useStyles({ color });

  const onBackgroundClick = useCallback(() => {
    setShowPicker(false);
  }, [setShowPicker]);

  const handleChange = useCallback((value: Colors) => () => {
    setColor(getColorValue(value, presets));
    if (onChange) {
      onChange(value);
    }
  }, [setColor, presets, onChange]);

  const handlePickerChange = useCallback((value: ColorResult) => {
    setColor(value.hex);
    if (onChange) {
      onChange(value.hex);
    }
  }, [setColor, onChange]);

  useEffect(() => {
    window.addEventListener('click', onBackgroundClick, false);
    return () => window.removeEventListener('click', onBackgroundClick);
  }, [onBackgroundClick]);

  useEffect(() => {
    setColor(getColorValue(activeColor, presets));
  }, [color, activeColor, presets]);

  return (
    <Box className={classes.root}>
      <Box className={classes.checksWrap}>
        {presets.map(([presetName, presetColor]) => (
          <ColorCheckButton
            key={`${presetName}-${presetColor}`}
            color={presetColor}
            checked={presetName === color}
            onChange={handleChange(presetColor)}
          />
        ))}
      </Box>

      <Box
        className={classes.colorPickerContainer}
        onClick={(e) => {
          e.stopPropagation();
          setShowPicker(true);
        }}
      >
        <Box className={classes.selectedColor} />
        <span
          className={classes.colorPickerWrapper}
          onKeyUp={() => {}}
          role="button"
          tabIndex={0}
          data-qa={QATags.MatiButton.ColorPickerButton}
        >
          <ColorPickerIcon
            className={classes.colorPickerButton}
          />
          <Typography variant="body1">
            {intl.formatMessage({ id: 'flow.colorStep.picker' })}
          </Typography>
        </span>
        {showPicker && (
          <Box className={classes.colorPicker}>
            <ChromePicker
              color={color}
              disableAlpha
              onChangeComplete={handlePickerChange}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
