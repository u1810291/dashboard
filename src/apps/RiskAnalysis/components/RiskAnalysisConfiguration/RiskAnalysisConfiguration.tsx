import { Box, FormControlLabel, Grid, Radio, RadioGroup, Switch, Typography } from '@material-ui/core';
import { BoxBordered } from 'apps/ui';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { PhoneOwnershipValidationMethodTypes } from 'apps/PhoneValidation/models/PhoneValidation.model';
import { selectPhoneValidationMode } from 'apps/PhoneValidation/state/PhoneValidation.selectors';
import { ONLY_NUMBERS_REG_EXP } from 'lib/validations';
import { selectPhoneRiskValidation } from '../../state/RiskAnalysis.selectors';
import { getRiskScoreThresholdError, getScoreTypeByValue, RiskScoreTypes } from '../../models/RiskAnalysis.model';
import { TextFieldRiskThreshold, useStyles } from './RiskAnalysisConfiguration.styles';

export interface RiskAnalysisConfigurationProps {
  riskScore?: number;
  onChangeRiskScore: (value: number) => void;
  onEnableRiskAnalysis: (method: PhoneOwnershipValidationMethodTypes, checked: boolean) => void;
  isLoading: boolean;
}

export function RiskAnalysisConfiguration({ riskScore, onChangeRiskScore, onEnableRiskAnalysis, isLoading }: RiskAnalysisConfigurationProps) {
  const intl = useIntl();
  const classes = useStyles();
  const isRiskAnalysis = useSelector(selectPhoneRiskValidation);
  const currentMethod = useSelector(selectPhoneValidationMode);
  const [riskScoreType, setRiskScoreType] = useState(getScoreTypeByValue(riskScore));
  const [error, setError] = useState(getRiskScoreThresholdError(riskScore, riskScoreType));

  const handleRiskScoreTypeChange = useCallback(({ target: { value } }) => {
    const scoreType = parseInt(value, 10);
    const score = RiskScoreTypes.Custom === scoreType ? RiskScoreTypes.Minimum : value;
    setRiskScoreType(scoreType);
    onChangeRiskScore(score);
    setError(null);
  }, [onChangeRiskScore]);

  const handleRiskScoreChange = useCallback(({ target: { value } }) => {
    const result = value ? value.replace(ONLY_NUMBERS_REG_EXP, '') : '';
    onChangeRiskScore(result);
    setError(null);
  }, [onChangeRiskScore]);

  const handleBlur = useCallback(({ target: { value } }) => {
    setError(getRiskScoreThresholdError(parseInt(value, 10), riskScoreType));
  }, [riskScoreType]);

  const handleToggle = useCallback(({ target: { checked } }) => {
    const newMethod = (currentMethod === PhoneOwnershipValidationMethodTypes.None && checked) ? PhoneOwnershipValidationMethodTypes.Sms : currentMethod;
    onEnableRiskAnalysis(newMethod, checked);
  }, [currentMethod, onEnableRiskAnalysis]);

  return (
    <BoxBordered mt={2}>
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h5">
            {intl.formatMessage({ id: 'RiskAnalysis.title' })}
          </Typography>
        </Box>
        <Box flexGrow={0}>
          <Switch
            name="riskAnalysis"
            color="primary"
            size="small"
            checked={isRiskAnalysis}
            disabled={isLoading}
            onChange={handleToggle}
          />
        </Box>
      </Box>
      <Box mt={1}>
        <Typography variant="body1" color="textSecondary">
          {intl.formatMessage({ id: 'RiskAnalysis.description' })}
        </Typography>
      </Box>
      <RadioGroup
        aria-label="age-check-configuration"
        name="age-check-configuration"
        value={riskScoreType}
        onChange={handleRiskScoreTypeChange}
      >
        <Grid container spacing={2}>
          <Grid item className={classes.fullWidth}>
            <BoxBordered>
              <FormControlLabel
                control={<Radio color="default" disabled={isLoading || !isRiskAnalysis} />}
                label={(
                  <Typography variant="h5" color="textSecondary">
                    {intl.formatMessage({ id: 'RiskAnalysis.scoreType.low.title' })}
                  </Typography>
                )}
                value={RiskScoreTypes.Low}
              />
              <Box pl={3}>
                <Typography component="div" variant="body2" color="textSecondary">
                  {intl.formatMessage({ id: 'RiskAnalysis.scoreType.low.description' })}
                </Typography>
              </Box>
            </BoxBordered>
          </Grid>
          <Grid item className={classes.fullWidth}>
            <BoxBordered>
              <FormControlLabel
                control={<Radio color="default" disabled={isLoading || !isRiskAnalysis} />}
                label={(
                  <Typography variant="h5" color="textSecondary">
                    {intl.formatMessage({ id: 'RiskAnalysis.scoreType.medium.title' })}
                  </Typography>
                )}
                value={RiskScoreTypes.Medium}
              />
              <Box pl={3}>
                <Typography component="div" variant="body2" color="textSecondary">
                  {intl.formatMessage({ id: 'RiskAnalysis.scoreType.medium.description' })}
                </Typography>
              </Box>
            </BoxBordered>
          </Grid>
          <Grid item className={classes.fullWidth}>
            <BoxBordered>
              <FormControlLabel
                control={<Radio color="default" disabled={isLoading || !isRiskAnalysis} />}
                label={(
                  <Typography variant="h5" color="textSecondary">
                    {intl.formatMessage({ id: 'RiskAnalysis.scoreType.high.title' })}
                  </Typography>
                )}
                value={RiskScoreTypes.High}
              />
              <Box pl={3}>
                <Typography component="div" variant="body2" color="textSecondary">
                  {intl.formatMessage({ id: 'RiskAnalysis.scoreType.high.description' })}
                </Typography>
              </Box>
            </BoxBordered>
          </Grid>
          <Grid item className={classes.fullWidth}>
            <BoxBordered>
              <FormControlLabel
                control={<Radio color="default" disabled={isLoading || !isRiskAnalysis} />}
                label={(
                  <Typography variant="h5" color="textSecondary">
                    {intl.formatMessage({ id: 'RiskAnalysis.scoreType.custom.title' })}
                  </Typography>
                )}
                value={RiskScoreTypes.Custom}
              />
              <Box className={classes.flexContainer} pb={1}>
                <Box pl={3} height="50px">
                  <TextFieldRiskThreshold
                    disabled={riskScoreType !== RiskScoreTypes.Custom || isLoading || !isRiskAnalysis}
                    value={riskScoreType === RiskScoreTypes.Custom ? riskScore : ''}
                    onBlur={handleBlur}
                    onChange={handleRiskScoreChange}
                    placeholder={`${RiskScoreTypes.Minimum}-${RiskScoreTypes.Maximum}`}
                    error={!!error}
                    helperText={error && intl.formatMessage({ id: `RiskAnalysis.scoreType.custom.${error}` })}
                  />
                </Box>
              </Box>
            </BoxBordered>
          </Grid>
        </Grid>
      </RadioGroup>
    </BoxBordered>
  );
}
