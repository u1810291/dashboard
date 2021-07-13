import { Box, FormControlLabel, RadioGroup, Switch } from '@material-ui/core';
import { BoxBordered, ExtendedDescription, RadioButton, TextFieldName } from 'apps/ui';
import { useSelector } from 'react-redux';
import { useDebounce } from 'lib/debounce.hook';
import { ONLY_NUMBERS_REG_EXP, validateMaxLength } from 'lib/validations';
import { cloneDeep } from 'lodash';
import { ProductSettingsProps } from 'models/Product.model';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { EmailCheckSettingTypes, EmailCheckStepModes, EmailRiskPredefinedThreshold, EmailRiskThresholdModes, getDefaultRiskThresholdMode, ScoreMapping, SENDER_NAME_LENGTH_LIMIT, validateRiskThreshold } from '../../models/EmailCheck.model';
import { TextFieldInputScore, useStyles } from './EmailCheckSettings.style';
import { selectCanUseEmailValidation } from '../../state/EmaiCheck.selectors';
import { ProductCanUseContainer } from '../../../merchant';

export function EmailCheckSettings({ settings, onUpdate }: ProductSettingsProps<EmailCheckSettingTypes>) {
  const intl = useIntl();
  const classes = useStyles();
  const debounced = useDebounce();
  const [senderName, setSenderName] = useState<string>(settings[EmailCheckSettingTypes.CompanyName].value);
  const [companyNameError, setCompanyNameError] = useState<string>('');
  const [currentMethod, setCurrentMethod] = useState<EmailCheckStepModes>(settings[EmailCheckSettingTypes.EmailOwnershipValidation].value);
  const [isCanUseEmailValidation] = useState<boolean>(useSelector(selectCanUseEmailValidation));
  const [riskThresholdMode, setRiskThresholdMode] = useState<EmailRiskThresholdModes>(getDefaultRiskThresholdMode(settings[EmailCheckSettingTypes.EmailRiskThreshold].value));
  const [riskScore, setRiskScore] = useState<EmailRiskPredefinedThreshold | number>(settings[EmailCheckSettingTypes.EmailRiskThreshold].value);
  const [riskThresholdError, setRiskThresholdError] = useState<string>();
  const [isEmailRiskEnabled, setIsEmailRiskEnabled] = useState<boolean>(settings[EmailCheckSettingTypes.EmailRiskValidation].value);

  const handleUpdate = useCallback((settingId: EmailCheckSettingTypes, value: unknown) => {
    const newSettings = cloneDeep(settings);
    newSettings[settingId].value = value;

    onUpdate(newSettings);
  }, [onUpdate, settings]);

  const handleChangeMode = useCallback((modeOn: EmailCheckStepModes, modeOff?: EmailCheckStepModes) => async ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
    const value = checked ? modeOn : modeOff;
    setCurrentMethod(value);

    if (value === EmailCheckStepModes.None) {
      setIsEmailRiskEnabled(false);
    }

    handleUpdate(EmailCheckSettingTypes.EmailOwnershipValidation, value);
  }, [handleUpdate]);

  const handleSenderNameChange = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    const validationError = validateMaxLength(value, SENDER_NAME_LENGTH_LIMIT);
    if (validationError) {
      setCompanyNameError(validationError);
      return;
    }
    setSenderName(value);
    debounced(() => handleUpdate(EmailCheckSettingTypes.CompanyName, value));
  }, [handleUpdate, debounced]);

  const handleEmailRiskModeChange = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setRiskThresholdMode(value as EmailRiskThresholdModes);
    setRiskScore(ScoreMapping[value]);
    handleUpdate(EmailCheckSettingTypes.EmailRiskThreshold, ScoreMapping[value]);
  }, [handleUpdate]);

  const handleEmailRiskCheckChange = useCallback(({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmailRiskEnabled(checked);
    handleUpdate(EmailCheckSettingTypes.EmailRiskValidation, checked);
  }, [handleUpdate]);

  const handleRiskScoreChange = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    const result: EmailRiskPredefinedThreshold | string = value ? value.replace(ONLY_NUMBERS_REG_EXP, '') : '';
    setRiskScore(Number(result));
    setRiskThresholdError('');
    debounced(() => handleUpdate(EmailCheckSettingTypes.EmailRiskThreshold, Number(result)));
  }, [handleUpdate, debounced]);

  const handleRiskScoreBlur = useCallback(({ target: { value } }: React.FocusEvent<HTMLInputElement>) => {
    setRiskThresholdError(validateRiskThreshold(parseInt(value, 10)));
    handleUpdate(EmailCheckSettingTypes.EmailRiskThreshold, parseInt(value, 10));
  }, [handleUpdate]);

  return (
    <ProductCanUseContainer isCanUseProduct={isCanUseEmailValidation}>
      <Box>
        <Box mb={4}>
          <ExtendedDescription
            title={intl.formatMessage({ id: 'EmailCheck.settings.emailValidation.title' })}
            text={intl.formatMessage({ id: 'EmailCheck.settings.emailValidation.description' })}
          />
        </Box>
        <Box mb={4}>
          <ExtendedDescription
            title={intl.formatMessage({ id: 'EmailCheck.settings.optionalStep.title' })}
            text={intl.formatMessage({ id: 'EmailCheck.settings.optionalStep.description' })}
            postfix={(
              <Switch
                name="makeStepOptional"
                color="primary"
                size="small"
                checked={currentMethod === EmailCheckStepModes.Optional}
                onChange={handleChangeMode(EmailCheckStepModes.Optional, EmailCheckStepModes.Forced)}
                disabled={currentMethod === EmailCheckStepModes.None || !isCanUseEmailValidation}
              />
          )}
          />
        </Box>
        <Box mb={4}>
          <ExtendedDescription
            title={intl.formatMessage({ id: 'EmailCheck.settings.companyName.title' })}
            text={intl.formatMessage({ id: 'EmailCheck.settings.companyName.description' })}
          />
          <TextFieldName
            type="text"
            value={senderName}
            onChange={handleSenderNameChange}
            placeholder=""
            error={!!companyNameError}
            className={classes.senderName}
            helperText={companyNameError && intl.formatMessage({ id: `EmailCheck.settings.companyName.${companyNameError}` })}
            disabled={currentMethod === EmailCheckStepModes.None || !isCanUseEmailValidation}
          />
        </Box>
        <Box mb={4}>
          <ExtendedDescription
            title={intl.formatMessage({ id: 'EmailCheck.settings.riskAnalysis.title' })}
            text={intl.formatMessage({ id: 'EmailCheck.settings.riskAnalysis.description' })}
            postfix={(
              <Switch
                name="riskAnalysis"
                color="primary"
                size="small"
                checked={isEmailRiskEnabled}
                onChange={handleEmailRiskCheckChange}
                disabled={currentMethod === EmailCheckStepModes.None || !isCanUseEmailValidation}
              />
          )}
          />
          <RadioGroup
            aria-label="risk-analysis-configuration"
            name="risk-analysis-configuration"
            value={riskThresholdMode}
            onChange={handleEmailRiskModeChange}
          >
            {Object.values(EmailRiskThresholdModes).map((mode) => (
              <BoxBordered key={mode} mt={1} width="100%">
                <FormControlLabel
                  value={mode}
                  control={<RadioButton color="primary" />}
                  className={classes.riskAnalysis}
                  label={(
                    <>
                      <Box mb={0.5} color="common.black90" fontWeight="bold">
                        {intl.formatMessage({ id: `EmailCheck.settings.riskAnalysis.${mode}.title` })}
                      </Box>
                      {mode !== EmailRiskThresholdModes.Custom && (
                      <Box color="common.black75" lineHeight={1.2}>
                        {intl.formatMessage({ id: `EmailCheck.settings.riskAnalysis.${mode}.description` })}
                      </Box>
                      )}
                      {mode === EmailRiskThresholdModes.Custom && (
                      <TextFieldInputScore
                        value={riskThresholdMode === mode ? riskScore : ''}
                        onBlur={handleRiskScoreBlur}
                        onChange={handleRiskScoreChange}
                        placeholder={`${EmailRiskPredefinedThreshold.Min}-${EmailRiskPredefinedThreshold.Max}`}
                        error={!!riskThresholdError}
                        helperText={riskThresholdError && intl.formatMessage({ id: `EmailCheck.settings.riskAnalysis.${mode}.validations.${riskThresholdError}` })}
                        disabled={!isEmailRiskEnabled || !isCanUseEmailValidation}
                      />
                      )}
                    </>
                )}
                  disabled={!isEmailRiskEnabled || !isCanUseEmailValidation}
                />
              </BoxBordered>
            ))}
          </RadioGroup>
        </Box>
      </Box>
    </ProductCanUseContainer>
  );
}
