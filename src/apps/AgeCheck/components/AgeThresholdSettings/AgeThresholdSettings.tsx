import React, { useCallback, useEffect, useState } from 'react';
import { Box, FormControl, FormControlLabel, Grid, Radio, RadioGroup } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { BoxBordered } from 'apps/ui';
import { AGE_CHECK_DEFAULT_THRESHOLD, AGE_CHECK_MAX_THRESHOLD, AGE_CHECK_MIN_THRESHOLD, AgeCheckThresholdModes, validateAgeThreshold } from 'apps/AgeCheck/models/AgeCheck.model';
import { InputScore } from './AgeThresholdSettings.styles';

export function AgeThresholdSettings({ ageThreshold, onUpdate }: { ageThreshold: number; onUpdate: (age: number) => void }) {
  const intl = useIntl();

  const [mode, setMode] = useState(ageThreshold ? AgeCheckThresholdModes.Custom : AgeCheckThresholdModes.Default);
  const [score, setScore] = useState(ageThreshold);
  const [error, setError] = useState(validateAgeThreshold(score, mode));

  const handleScoreSubmit = useCallback((value: string) => {
    const scoreAsNumber = parseInt(value, 10);
    const validationError = validateAgeThreshold(scoreAsNumber, mode);
    if (validationError) {
      setError(validationError);
    }
    if (scoreAsNumber) {
      onUpdate(scoreAsNumber);
    }
  }, [mode, onUpdate]);

  const handleModeChange = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setMode(value as AgeCheckThresholdModes);
    setScore(AGE_CHECK_DEFAULT_THRESHOLD);
    setError(null);
    handleScoreSubmit(String(AGE_CHECK_DEFAULT_THRESHOLD));
  }, [handleScoreSubmit]);

  const handleScoreChange = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setScore(parseInt(value, 10));
    setError(null);
    handleScoreSubmit(value);
  }, [handleScoreSubmit]);

  const handleBlur = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setError(validateAgeThreshold(parseInt(value, 10), mode));
  }, [mode]);

  useEffect(() => {
    const ageThresholdMode = !ageThreshold || ageThreshold === AGE_CHECK_DEFAULT_THRESHOLD ? AgeCheckThresholdModes.Default : AgeCheckThresholdModes.Custom;
    setMode(ageThresholdMode);
    setScore(ageThreshold);
    setError(validateAgeThreshold(ageThreshold, ageThresholdMode));
  }, [ageThreshold]);

  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="age-check-configuration"
        name="age-check-configuration"
        value={mode}
        onChange={handleModeChange}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <BoxBordered>
              <FormControlLabel
                control={<Radio color="primary" />}
                label={(
                  <Box color="common.black90" fontWeight="bold">
                    {intl.formatMessage({ id: 'Product.configuration.ageCheck.default.title' })}
                  </Box>
                )}
                value={AgeCheckThresholdModes.Default}
              />
              <Box pl={3} color="common.black75">
                {intl.formatMessage({ id: 'Product.configuration.ageCheck.default.subtitle' })}
              </Box>
            </BoxBordered>
          </Grid>
          <Grid item xs={12}>
            <BoxBordered>
              <FormControlLabel
                control={<Radio color="primary" />}
                label={(
                  <Box color="common.black90" fontWeight="bold">
                    {intl.formatMessage({ id: 'Product.configuration.ageCheck.custom.title' })}
                  </Box>
                )}
                value={AgeCheckThresholdModes.Custom}
              />
              <Box pb={1}>
                <Grid container alignItems="center">
                  <Box ml={3} width={80}>
                    <InputScore
                      type="number"
                      disabled={mode !== AgeCheckThresholdModes.Custom}
                      value={mode === AgeCheckThresholdModes.Custom ? score : ''}
                      onBlur={handleBlur}
                      onChange={handleScoreChange}
                      placeholder={`${AGE_CHECK_MIN_THRESHOLD}-${AGE_CHECK_MAX_THRESHOLD}`}
                      error={!!error}
                      helperText={error && intl.formatMessage({ id: `Product.configuration.ageCheck.custom.${error}` })}
                    />
                  </Box>
                  <Box ml={1} color="common.black75">
                    {intl.formatMessage({ id: 'Product.configuration.ageCheck.custom.subtitle' })}
                  </Box>
                </Grid>
              </Box>
            </BoxBordered>
          </Grid>
        </Grid>
      </RadioGroup>
    </FormControl>
  );
}
