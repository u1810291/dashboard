import { Box, FormControl, Switch, Grid, Typography, Button } from '@material-ui/core';
import { BoxBordered, notification, TextFieldName, Warning } from 'apps/ui';
import { PageLoader } from 'apps/layout';
import { VerificationPatternTypes } from 'models/Step.model';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { merchantUpdateFlow } from 'state/merchant/merchant.actions';
import { validateMaxLength } from 'lib/validations';
import { KeyboardKeyCodes } from 'models/Keyboard.model';
import { selectCanUseRiskPhoneAnalysis, selectPhoneRiskAnalysisThreshold } from 'state/merchant/merchant.selectors';
import { RiskAnalysisConfiguration } from 'apps/RiskAnalysis';
import { appPalette } from 'apps/theme';
import { selectPhoneRiskValidation } from 'apps/RiskAnalysis/state/RiskAnalysis.selectors';
import { selectSenderName, selectPhoneValidationMode } from '../../state/PhoneValidation.selectors';
import { SENDER_NAME_LENGTH_LIMIT, PhoneOwnershipValidationMethodTypes } from '../../models/PhoneValidation.model';
import { useStyles } from './PhoneValidationConfiguration.styles';

export function PhoneValidationConfiguration() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const isRiskAnalysis = useSelector(selectPhoneRiskValidation);
  const [senderName, setSenderName] = useState(useSelector(selectSenderName));
  const [riskScore, setRiskScore] = useState(useSelector(selectPhoneRiskAnalysisThreshold));
  const [currentMethod, setModeCurrentMethod] = useState(useSelector(selectPhoneValidationMode));
  const canUseRiskPhoneAnalysis = useSelector(selectCanUseRiskPhoneAnalysis);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = useCallback(({ target: { value } }) => {
    const errorMsg = validateMaxLength(value, SENDER_NAME_LENGTH_LIMIT);
    if (errorMsg) {
      setError(`PhoneValidation.senderName.${errorMsg}`);
    }
    setSenderName(value);
  }, []);

  const handleSave = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(merchantUpdateFlow({
        phoneOwnership: {
          companyName: senderName,
        },
        phoneRiskAnalysisThreshold: riskScore,
      }));
    } catch (e) {
      console.error('error', e.message);
      notification.error(intl.formatMessage({ id: 'Error.common' }));
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, senderName, riskScore, intl]);

  const handleKeyDown = useCallback((e) => {
    if (e.keyCode === KeyboardKeyCodes.Enter) {
      handleSave();
    }
  }, [handleSave]);

  const handleChangeMode = useCallback((mode: PhoneOwnershipValidationMethodTypes, isOptionalMethod = false) => async ({ target: { checked } }) => {
    const method = isOptionalMethod ? PhoneOwnershipValidationMethodTypes.Sms : PhoneOwnershipValidationMethodTypes.None;
    const phoneOwnershipValidationValue = checked ? mode : method;
    const phoneRiskValidationValue = checked ? isRiskAnalysis : false;
    const payload = {
      phoneRiskAnalysisThreshold: riskScore,
      verificationPatterns: {
        [VerificationPatternTypes.PhoneOwnershipValidation]: phoneOwnershipValidationValue,
        [VerificationPatternTypes.PhoneRiskValidation]: phoneRiskValidationValue,
      },
    };
    try {
      await dispatch(merchantUpdateFlow(payload));
      setModeCurrentMethod(phoneOwnershipValidationValue);
    } catch (e) {
      console.error('error', e.message);
      notification.error(intl.formatMessage({ id: 'Error.common' }));
    }
  }, [isRiskAnalysis, riskScore, dispatch, intl]);

  const handleEnableRiskAnalysis = useCallback(async (method: PhoneOwnershipValidationMethodTypes, checked) => {
    setIsLoading(true);
    try {
      await dispatch(merchantUpdateFlow({
        phoneRiskAnalysisThreshold: riskScore,
        verificationPatterns: {
          [VerificationPatternTypes.PhoneOwnershipValidation]: method,
          [VerificationPatternTypes.PhoneRiskValidation]: checked,
        },
      }));
      setModeCurrentMethod(method);
    } catch (e) {
      console.error('error', e.message);
      notification.error(intl.formatMessage({ id: 'Error.common' }));
    }
    setIsLoading(false);
  }, [dispatch, intl, riskScore]);

  return (
    <FormControl component="fieldset">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box className={classes.titleContainer}>
            <Box>
              <Typography variant="h4">
                {intl.formatMessage({ id: 'PhoneValidation.title' })}
              </Typography>
            </Box>
            <Box>
              <Switch
                name="phoneSms"
                color="primary"
                size="small"
                checked={(currentMethod === PhoneOwnershipValidationMethodTypes.SmsOptional) || (currentMethod === PhoneOwnershipValidationMethodTypes.Sms)}
                onChange={handleChangeMode(PhoneOwnershipValidationMethodTypes.Sms)}
                disabled={isLoading}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item className={classes.itemMargin}>
          <Box color="common.black75">
            <Typography variant="body1">
              {intl.formatMessage({ id: 'PhoneValidation.subtitle' })}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} className={classes.itemPadding}>
          <Box className={classes.titleContainer}>
            <Box>
              <Typography variant="h5">
                {intl.formatMessage({ id: 'PhoneValidation.makeOptionalStep' })}
              </Typography>
            </Box>
            <Box>
              <Switch
                name="optionalPhoneSms"
                color="primary"
                size="small"
                checked={currentMethod === PhoneOwnershipValidationMethodTypes.SmsOptional}
                onChange={handleChangeMode(PhoneOwnershipValidationMethodTypes.SmsOptional, true)}
                disabled={isLoading || currentMethod === PhoneOwnershipValidationMethodTypes.None}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item className={classes.itemPaddingSubTitle}>
          <Box color="common.black75">
            <Typography variant="body1">
              {intl.formatMessage({ id: 'PhoneValidation.makeOptionalStep.subtitle' })}
            </Typography>
          </Box>
        </Grid>
        <Grid item className={classes.itemMargin}>
          <BoxBordered borderColor={appPalette.yellow}>
            <Warning label={intl.formatMessage({ id: 'Product.configuration.phoneValidation.webSdkOnlyWarning' })} />
          </BoxBordered>
        </Grid>
        <Grid item>
          <Box mb={0.5}>
            <Typography variant="h5">
              {intl.formatMessage({ id: 'PhoneValidation.senderName' })}
            </Typography>
          </Box>
          <Box color="common.black75" mb={1}>
            <Typography variant="body1">
              {intl.formatMessage({ id: 'PhoneValidation.senderName.subtitle' })}
            </Typography>
          </Box>
          <TextFieldName
            type="text"
            value={senderName}
            onChange={handleNameChange}
            onKeyDown={handleKeyDown}
            error={!!error}
            helperText={error && intl.formatMessage({ id: error.toString() })}
            className={classes.input}
            disabled={isLoading || currentMethod === PhoneOwnershipValidationMethodTypes.None}
          />

        </Grid>
        {canUseRiskPhoneAnalysis && (
          <RiskAnalysisConfiguration
            isLoading={isLoading}
            riskScore={riskScore}
            onChangeRiskScore={setRiskScore}
            onEnableRiskAnalysis={handleEnableRiskAnalysis}
          />
        )}
        <Grid item className={classes.buttonContainer}>
          <Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={isLoading && <PageLoader size={14} />}
              onClick={handleSave}
              disabled={isLoading || currentMethod === PhoneOwnershipValidationMethodTypes.None}
            >
              {intl.formatMessage({ id: 'PhoneValidation.save' })}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </FormControl>
  );
}
