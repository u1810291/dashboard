import { Box, RadioGroup, FormControlLabel, TextField } from '@material-ui/core';
import { BoxBordered, RadioButton } from 'apps/ui';
import React, { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './FaceMatchingThreshold.styles';
import { FACEMATCH_DEFAULT_THRESHOLD, FACEMATCH_THRESHOLDS, FacematchThresholdModes, validateScore } from '../../models/facematch.model';

export function FaceMatchingThreshold({ defaultThreshold = FACEMATCH_DEFAULT_THRESHOLD, thresholds = FACEMATCH_THRESHOLDS, facematchThreshold, onUpdate }: {
  defaultThreshold?: number;
  thresholds?: any;
  facematchThreshold: number | null;
  onUpdate: (value: number | null) => void;
}) {
  const intl = useIntl();
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [score, setScore] = useState(facematchThreshold);
  const mode = useMemo(() => (facematchThreshold ? FacematchThresholdModes.Custom : FacematchThresholdModes.Recommended), [facematchThreshold]);
  const handleUpdate = useCallback((value: number) => {
    onUpdate(value);
  }, [onUpdate]);
  const handleModeChange = useCallback(({ target: { value } }) => {
    setError(null);
    const updatedScore = (FacematchThresholdModes.Custom === value) ? defaultThreshold : null;
    setScore(updatedScore);
    handleUpdate(updatedScore);
  }, [defaultThreshold, handleUpdate]);
  const handleScoreChange = useCallback(({ target: { value } }) => {
    const parsed = parseInt(value, 10);
    setScore(parsed);
  }, [setScore]);
  const handleValidation = useCallback(() => {
    const validationError = validateScore(score, mode, thresholds);
    setError(validationError);
    if (!validationError) {
      handleUpdate(score);
    }
  }, [score, mode, handleUpdate, thresholds]);

  return (
    <Box>
      <RadioGroup
        aria-label="facematch-configuration"
        name="facematch-configuration"
        value={mode}
        onChange={handleModeChange}
      >
        <BoxBordered mb={2} className={classes.wrapper}>
          <FormControlLabel
            value={FacematchThresholdModes.Recommended}
            control={<RadioButton color="primary" />}
            label={(
              <>
                <Box mb={0.5} color="common.black90" fontWeight="bold">
                  {intl.formatMessage({
                    id: 'Facematch.settings.recommended',
                  },
                  {
                    percentage: defaultThreshold,
                  })}
                </Box>
                <Box color="common.black75" lineHeight={1.2}>
                  {intl.formatMessage({
                    id: 'Facematch.settings.recommended.description',
                  },
                  {
                    percentage: defaultThreshold,
                  })}
                </Box>
              </>
            )}
          />
        </BoxBordered>
        <BoxBordered className={classes.wrapper}>
          <FormControlLabel
            value={FacematchThresholdModes.Custom}
            control={<RadioButton color="primary" />}
            label={(
              <Box>
                <Box mb={1} color="common.black90" fontWeight="bold">
                  {intl.formatMessage({ id: 'Facematch.settings.custom' })}
                </Box>
                <Box mb={1} width={80} className={classes.field}>
                  <TextField
                    disabled={FacematchThresholdModes.Custom !== mode}
                    type="number"
                    variant="outlined"
                    value={score || ''}
                    onChange={handleScoreChange}
                    onBlur={handleValidation}
                    placeholder={`${thresholds.LOW.MIN}-${thresholds.HIGH.MAX}`}
                    error={!!error}
                    helperText={error && intl.formatMessage({
                      id: `Product.configuration.facematch.mode.custom.errors.${error}`,
                    }, {
                      min: thresholds.LOW.MIN,
                      max: thresholds.HIGH.MAX,
                    })}
                  />
                </Box>
                <Box mb={2} color="common.black75" lineHeight={1.2}>
                  {intl.formatMessage({
                    id: 'Facematch.settings.custom.low',
                  },
                  {
                    min: thresholds.LOW.MIN,
                    max: thresholds.LOW.MAX,
                  })}
                </Box>
                <Box color="common.black75" lineHeight={1.2}>
                  {intl.formatMessage({
                    id: 'Facematch.settings.custom.high',
                  },
                  {
                    min: thresholds.HIGH.MIN,
                    max: thresholds.HIGH.MAX,
                  })}
                </Box>
              </Box>
            )}
          />
        </BoxBordered>
      </RadioGroup>
    </Box>
  );
}
