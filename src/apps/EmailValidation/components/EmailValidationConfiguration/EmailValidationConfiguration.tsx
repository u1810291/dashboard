import { Box, Button, FormControl, Grid, RadioGroup, Switch, Typography } from '@material-ui/core';
import { BoxBordered, notification, TextFieldName } from 'apps/ui';
import { ONLY_NUMBERS_REG_EXP, validateMaxLength } from 'lib/validations';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import React, { useCallback, useMemo, useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { merchantUpdateFlow } from 'state/merchant/merchant.actions';
import { EmailRiskPredefinedThreshold, EmailRiskThresholdModes, EmailValidationStepModes, getDefaultRiskThresholdMode, ScoreMapping, SENDER_NAME_LENGTH_LIMIT, validateRiskThreshold } from '../../models/EmailValidation.model';
import { selectEmailRiskValidationMode, selectEmailValidationMode, selectEmailValidationThreshold, selectSenderName } from '../../state/EmailValidation.selectors';
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
      <Grid container direction="row" spacing={3}>
        <Grid container item direction="row" spacing={1}>
          <BoxBordered>
            <Grid container direction="row" spacing={1}>
              <Grid item xs={12}>
                <Box className={classes.titleContainer}>
                  <Box>
                    <Typography variant="h4">
                      {intl.formatMessage({ id: 'Product.EmailValidation.title' })}
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
                    {intl.formatMessage({ id: 'Product.EmailValidation.subtitle' })}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className={classes.titleContainer} pt={2}>
                  <Box>
                    <Typography variant="h5">
                      {intl.formatMessage({ id: 'Product.EmailValidation.makeStepOptional.title' })}
                    </Typography>
                  </Box>
                  <Box>
                    <Switch
                      name="makeStepOptional"
                      color="primary"
                      size="small"
                      onChange={handleEmailValidationStepOptional}
                      checked={emailValidationMode === EmailValidationStepModes.Optional}
                      disabled={isLoading || !isEmailValidationEnabled}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item>
                <Box className={classes.boxBlack}>
                  <Typography variant="body1">
                    {intl.formatMessage({ id: 'Product.EmailValidation.makeStepOptional.subtitle' })}
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box mt={1} mb={0.5}>
                  <Typography variant="h5">
                    {intl.formatMessage({ id: 'Product.EmailValidation.companyName.title' })}
                  </Typography>
                </Box>
                <Box className={classes.boxBlack} mb={1}>
                  <Typography variant="body1">
                    {intl.formatMessage({ id: 'Product.EmailValidation.companyName.subtitle' })}
                  </Typography>
                </Box>
                <TextFieldName
                  type="text"
                  value={senderName}
                  onChange={handleSenderNameChange}
                  placeholder=""
                  error={!!senderNameError}
                  helperText={senderNameError && intl.formatMessage({ id: `Product.EmailValidation.senderName.${senderNameError}` })}
                  className={classes.input}
                  disabled={isLoading || !isEmailValidationEnabled}
                />
              </Grid>
            </Grid>
          </BoxBordered>
        </Grid>
        <Grid container item direction="row" spacing={1}>
          <BoxBordered>
            <Grid container direction="row" spacing={1}>
              <Grid item xs={12}>
                <Box className={classes.titleContainer}>
                  <Box>
                    <Typography variant="h4">
                      {intl.formatMessage({ id: 'Product.EmailValidation.riskAnalisys.title' })}
                    </Typography>
                  </Box>
                  <Box>
                    <Switch
                      name="emailRisk"
                      color="primary"
                      size="small"
                      onChange={handleEmailRiskCheckChange}
                      checked={isEmailRiskEnabled}
                      disabled={isLoading || !isEmailValidationEnabled}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item>
                <Box className={classes.boxBlack}>
                  <Typography variant="body1">
                    {intl.formatMessage({ id: 'Product.EmailValidation.riskAnalisys.subtitle' })}
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
                    {Object.keys(EmailRiskThresholdModes).map((mode) => (
                      <EmailRiskLevelOption
                        isDisabled={isLoading || !isEmailRiskEnabled}
                        value={mode}
                        title={`Product.EmailValidation.riskAnalisys.subtitle.${mode.toLowerCase()}`}
                        subtitle={`Product.EmailValidation.riskAnalisys.selection.${mode.toLowerCase()}`}
                        key={mode}
                      >
                        {mode === EmailRiskThresholdModes.Custom
                            && (
                            <TextFieldInputScore
                              disabled={isLoading || !isEmailRiskEnabled || riskThresholdMode !== mode || !emailValidationMode}
                              value={riskThresholdMode === mode ? riskScore : ''}
                              onBlur={handleBlur}
                              onChange={handleRiskScoreChange}
                              placeholder={`${EmailRiskPredefinedThreshold.Min}-${EmailRiskPredefinedThreshold.Max}`}
                              error={!!riskThresholdError}
                              helperText={riskThresholdError && intl.formatMessage({ id: `Product.EmailValidation.riskAnalisys.${mode.toLowerCase()}.validations.${riskThresholdError}` })}
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
            disabled={isLoading || !isEmailValidationEnabled}
          >
            {intl.formatMessage({ id: 'Product.EmailValidation.save' })}
          </Button>
        </Box>
      </Grid>
    </FormControl>
  );
}
