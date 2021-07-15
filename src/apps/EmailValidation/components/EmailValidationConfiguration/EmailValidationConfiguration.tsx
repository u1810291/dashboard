import { Box, Button, FormControl, Grid, RadioGroup, Switch, Typography } from '@material-ui/core';
import { BoxBordered, notification, TextFieldName } from 'apps/ui';
import { ONLY_NUMBERS_REG_EXP, validateMaxLength } from 'lib/validations';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import React, { useCallback, useMemo, useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { merchantUpdateFlow } from 'state/merchant/merchant.actions';
import { HOCIsAccessAllowed } from 'apps/merchant';
import { EmailRiskPredefinedThreshold, EmailRiskThresholdModes, EmailValidationStepModes, getDefaultRiskThresholdMode, ScoreMapping, SENDER_NAME_LENGTH_LIMIT, validateRiskThreshold } from '../../models/EmailValidation.model';
import { selectEmailRiskValidationMode, selectEmailValidationMode, selectEmailValidationThreshold, selectSenderName, selectCanUseEmailValidation } from '../../state/EmailValidation.selectors';
import { EmailRiskLevelOption } from '../EmailRiskLevelOption/EmailRiskLevelOption';
import { TextFieldInputScore, useStyles } from './EmailValidationConfiguration.styles';

export function EmailValidationConfiguration() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const initialRiskScore = useSelector(selectEmailValidationThreshold);

  const [riskThresholdMode, setRiskThresholdMode] = useState(getDefaultRiskThresholdMode(initialRiskScore));
  const [senderName, setSenderName] = useState(useSelector(selectSenderName));
  const [riskScore, setRiskScore] = useState(initialRiskScore);
  const [isCanUseEmailValidation] = useState(useSelector(selectCanUseEmailValidation));
  const [senderNameError, setSenderNameError] = useState(null);
  const [riskThresholdError, setRiskThresholdError] = useState(null);
  const [emailValidationMode, setEmailValidationMode] = useState(useSelector(selectEmailValidationMode));
  const [isEmailRiskEnabled, setIsEmailRiskEnabled] = useState(useSelector(selectEmailRiskValidationMode));
  const [isLoading, setIsLoading] = useState(false);
  const isEmailValidationEnabled = useMemo(() => (emailValidationMode !== EmailValidationStepModes.None), [emailValidationMode]);
  const handleSenderNameChange = useCallback(({ target: { value } }) => {
    const validationError = validateMaxLength(value, SENDER_NAME_LENGTH_LIMIT);
    setSenderNameError(validationError);
    if (validationError) {
      return;
    }
    setSenderName(value);
  }, []);

  const handleEmailRiskCheckChange = useCallback(async ({ target: { checked } }) => {
    try {
      await dispatch(merchantUpdateFlow({
        emailRiskThreshold: riskScore,
        verificationPatterns: {
          [VerificationPatternTypes.EmailRiskValidation]: checked,
        },
      }));
      setIsEmailRiskEnabled(checked);
    } catch (e) {
      notification.error(intl.formatMessage({ id: 'Error.common' }));
    }
  }, [intl, riskScore, dispatch]);

  const handleEmailValidationChange = useCallback(async ({ target: { checked } }) => {
    try {
      const mode = checked ? EmailValidationStepModes.Forced : EmailValidationStepModes.None;
      const riskMode = mode === EmailValidationStepModes.None && false;
      await dispatch(merchantUpdateFlow({
        verificationPatterns: {
          [VerificationPatternTypes.EmailOwnershipValidation]: mode,
          [VerificationPatternTypes.EmailRiskValidation]: riskMode,
        },
      }));
      setEmailValidationMode(mode);
      setIsEmailRiskEnabled(riskMode);
    } catch (e) {
      notification.error(intl.formatMessage({ id: 'Error.common' }));
    }
  }, [intl, dispatch]);

  const handleEmailValidationStepOptional = useCallback(async ({ target: { checked } }) => {
    const mode = checked ? EmailValidationStepModes.Optional : EmailValidationStepModes.Forced;
    try {
      await dispatch(merchantUpdateFlow({
        verificationPatterns: {
          [VerificationPatternTypes.EmailOwnershipValidation]: mode,
        },
      }));
      setEmailValidationMode(mode);
    } catch (e) {
      notification.error(intl.formatMessage({ id: 'Error.common' }));
    }
  }, [dispatch, intl]);

  const handleEmailRiskModeChange = useCallback(({ target: { value } }) => {
    setRiskThresholdMode(value);
    setRiskScore(ScoreMapping[value] || riskScore || EmailRiskPredefinedThreshold.Default);
  }, [riskScore]);

  const handleRiskScoreChange = useCallback(({ target: { value } }) => {
    const result = value ? value.replace(ONLY_NUMBERS_REG_EXP, '') : '';
    setRiskScore(result);
    setRiskThresholdError(null);
  }, []);

  const handleBlur = useCallback(({ target: { value } }) => {
    setRiskThresholdError(validateRiskThreshold(parseInt(value, 10)));
  }, []);

  const handleSaveChanges = useCallback(async () => {
    const riskThresholdAsNumber = parseInt(riskScore, 10);
    if (riskThresholdError || senderNameError) {
      return;
    }
    try {
      setIsLoading(true);
      await dispatch(merchantUpdateFlow({
        emailRiskThreshold: riskThresholdAsNumber,
        emailOwnership: {
          companyName: senderName,
        },
        verificationPatterns: {
          [VerificationPatternTypes.EmailOwnershipValidation]: emailValidationMode,
          [VerificationPatternTypes.EmailRiskValidation]: isEmailRiskEnabled,
        },
      }));
    } catch (e) {
      notification.error(intl.formatMessage({ id: 'Error.common' }));
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, emailValidationMode, isEmailRiskEnabled, riskScore, senderName, intl, riskThresholdError, senderNameError]);

  return (
    <FormControl component="fieldset">
      <HOCIsAccessAllowed isAccessAllowed={isCanUseEmailValidation}>
        <Grid container direction="row">
          <Grid container item direction="row" spacing={1}>
            <BoxBordered mb={3}>
              <Grid container direction="row" spacing={1}>
                <Grid item xs={12}>
                  <Box className={classes.titleContainer}>
                    <Box>
                      <Typography variant="h4">
                        {intl.formatMessage({ id: 'EmailValidation.title' })}
                      </Typography>
                    </Box>
                    <Box>
                      <Switch
                        name="emailValidaiton"
                        color="primary"
                        size="small"
                        onChange={handleEmailValidationChange}
                        checked={isEmailValidationEnabled}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box className={classes.boxBlack}>
                    <Typography variant="body1">
                      {intl.formatMessage({ id: 'EmailValidation.subtitle' })}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className={classes.titleContainer} pt={2}>
                    <Box>
                      <Typography variant="h5">
                        {intl.formatMessage({ id: 'EmailValidation.makeStepOptional.title' })}
                      </Typography>
                    </Box>
                    <Box>
                      <Switch
                        name="makeStepOptional"
                        color="primary"
                        size="small"
                        onChange={handleEmailValidationStepOptional}
                        checked={emailValidationMode === EmailValidationStepModes.Optional}
                        disabled={isLoading || !isEmailValidationEnabled || !isCanUseEmailValidation}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box className={classes.boxBlack}>
                    <Typography variant="body1">
                      {intl.formatMessage({ id: 'EmailValidation.makeStepOptional.subtitle' })}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Box mt={1} mb={0.5}>
                    <Typography variant="h5">
                      {intl.formatMessage({ id: 'EmailValidation.companyName.title' })}
                    </Typography>
                  </Box>
                  <Box className={classes.boxBlack} mb={1}>
                    <Typography variant="body1">
                      {intl.formatMessage({ id: 'EmailValidation.companyName.subtitle' })}
                    </Typography>
                  </Box>
                  <TextFieldName
                    type="text"
                    value={senderName}
                    onChange={handleSenderNameChange}
                    placeholder=""
                    error={!!senderNameError}
                    helperText={senderNameError && intl.formatMessage({ id: `EmailValidation.senderName.${senderNameError}` })}
                    className={classes.input}
                    disabled={isLoading || !isEmailValidationEnabled || !isCanUseEmailValidation}
                  />
                </Grid>
              </Grid>
            </BoxBordered>
          </Grid>
          <Grid container item direction="row" spacing={1}>
            <BoxBordered mb={3}>
              <Grid container direction="row" spacing={1}>
                <Grid item xs={12}>
                  <Box className={classes.titleContainer}>
                    <Box>
                      <Typography variant="h4">
                        {intl.formatMessage({ id: 'EmailValidation.riskAnalisys.title' })}
                      </Typography>
                    </Box>
                    <Box>
                      <Switch
                        name="emailRisk"
                        color="primary"
                        size="small"
                        onChange={handleEmailRiskCheckChange}
                        checked={isEmailRiskEnabled}
                        disabled={isLoading || !isEmailValidationEnabled || !isCanUseEmailValidation}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box className={classes.boxBlack}>
                    <Typography variant="body1">
                      {intl.formatMessage({ id: 'EmailValidation.riskAnalisys.subtitle' })}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item className={classes.fullWidth}>
                  <RadioGroup
                    aria-label="email-validation-configuration"
                    name="email-validation-configuration"
                    value={riskThresholdMode}
                    onChange={handleEmailRiskModeChange}
                  >
                    <Grid container spacing={2}>
                      {Object.values(EmailRiskThresholdModes).map((mode) => (
                        <EmailRiskLevelOption
                          isDisabled={isLoading || !isEmailRiskEnabled || !isCanUseEmailValidation}
                          value={mode}
                          title={`EmailValidation.riskAnalisys.subtitle.${mode}`}
                          subtitle={`EmailValidation.riskAnalisys.selection.${mode}`}
                          key={mode}
                        >
                          {mode === EmailRiskThresholdModes.Custom
                            && (
                            <TextFieldInputScore
                              disabled={isLoading || !isEmailRiskEnabled || riskThresholdMode !== mode || !emailValidationMode || !isCanUseEmailValidation}
                              value={riskThresholdMode === mode ? riskScore : ''}
                              onBlur={handleBlur}
                              onChange={handleRiskScoreChange}
                              placeholder={`${EmailRiskPredefinedThreshold.Min}-${EmailRiskPredefinedThreshold.Max}`}
                              error={!!riskThresholdError}
                              helperText={riskThresholdError && intl.formatMessage({ id: `EmailValidation.riskAnalisys.${mode}.validations.${riskThresholdError}` })}
                            />
                            )}
                        </EmailRiskLevelOption>
                      ))}
                    </Grid>
                  </RadioGroup>
                </Grid>
              </Grid>
            </BoxBordered>
          </Grid>
          <Box>
            <Button
              className={classes.submitButton}
              variant="contained"
              color="primary"
              startIcon={isLoading && <FiLoader />}
              onClick={handleSaveChanges}
              disabled={isLoading || !isEmailValidationEnabled || !isCanUseEmailValidation}
            >
              {intl.formatMessage({ id: 'EmailValidation.save' })}
            </Button>
          </Box>
        </Grid>
      </HOCIsAccessAllowed>
    </FormControl>
  );
}
