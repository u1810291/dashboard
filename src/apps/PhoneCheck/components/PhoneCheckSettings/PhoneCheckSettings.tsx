import { Box, FormControlLabel, RadioGroup, Switch } from '@material-ui/core';
import { BoxBordered, ExtendedDescription, RadioButton, TextFieldName } from 'apps/ui';
import { ONLY_NUMBERS_REG_EXP, validateMaxLength } from 'lib/validations';
import { cloneDeep, debounce } from 'lodash';
import { ProductSettingsProps } from 'models/Product.model';
import React, { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { COMPANY_NAME_LENGTH_LIMIT, getDefaultRiskThresholdMode, PhoneCheckSettingTypes, PhoneOwnershipValidationTypes, PhoneRiskPredefinedThreshold, PhoneRiskThresholdModes, ScoreMapping, validateRiskThreshold } from '../../models/PhoneCheck.model';
import { TextFieldInputScore, useStyles } from './PhoneCheckSettings.styles';

export function PhoneCheckSettings({ settings, onUpdate }: ProductSettingsProps<PhoneCheckSettingTypes>) {
  const intl = useIntl();
  const classes = useStyles();
  const [isPhoneRiskEnabled, setIsPhoneRiskEnabled] = useState<boolean>(settings[PhoneCheckSettingTypes.PhoneRiskValidation].value);
  const [companyName, setCompanyName] = useState<string>(settings[PhoneCheckSettingTypes.CompanyName].value);
  const [riskScore, setRiskScore] = useState<PhoneRiskPredefinedThreshold | number>(settings[PhoneCheckSettingTypes.PhoneRiskThreshold].value);
  const [currentMethod, setCurrentMethod] = useState<PhoneOwnershipValidationTypes>(settings[PhoneCheckSettingTypes.PhoneOwnershipValidation].value);
  const [riskThresholdMode, setRiskThresholdMode] = useState<PhoneRiskThresholdModes>(getDefaultRiskThresholdMode(settings[PhoneCheckSettingTypes.PhoneRiskThreshold].value));
  const [riskThresholdError, setRiskThresholdError] = useState<string>();
  const [companyNameError, setCompanyNameError] = useState<string>('');

  const callbackDebounced = useMemo(() => debounce((action: Function) => action(), 300), []);

  const handleUpdate = useCallback((settingId: PhoneCheckSettingTypes, value: unknown) => {
    const newSettings = cloneDeep(settings);
    newSettings[settingId].value = value;
    onUpdate(newSettings);
  }, [onUpdate, settings]);

  const handleModeChange = useCallback((modeOn: PhoneOwnershipValidationTypes, modeOff?: PhoneOwnershipValidationTypes) => async ({ target: { checked } }) => {
    const value = checked ? modeOn : modeOff;
    setCurrentMethod(value);
    if (value === PhoneOwnershipValidationTypes.None) {
      setIsPhoneRiskEnabled(false);
    }
    handleUpdate(PhoneCheckSettingTypes.PhoneOwnershipValidation, value);
  }, [handleUpdate]);

  const handleCompanyNameChange = useCallback(({ target: { value } }) => {
    const validationError = validateMaxLength(value, COMPANY_NAME_LENGTH_LIMIT);
    if (validationError) {
      setCompanyNameError(`PhoneValidation.companyName.${validationError}`);
      return;
    }
    setCompanyName(value);
    callbackDebounced(() => handleUpdate(PhoneCheckSettingTypes.CompanyName, value));
  }, [handleUpdate, callbackDebounced]);

  const handlePhoneRiskModeChange = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setRiskThresholdMode(value as PhoneRiskThresholdModes);
    setRiskScore(ScoreMapping[value]);
    handleUpdate(PhoneCheckSettingTypes.PhoneRiskThreshold, ScoreMapping[value]);
  }, [handleUpdate]);

  const handlePhoneRiskModeToggle = useCallback(({ target: { checked } }) => {
    setIsPhoneRiskEnabled(checked);
    handleUpdate(PhoneCheckSettingTypes.PhoneRiskValidation, checked);
  }, [handleUpdate]);

  const handleRiskScoreChange = useCallback(({ target: { value } }) => {
    const result: PhoneRiskPredefinedThreshold | string = value ? value.replace(ONLY_NUMBERS_REG_EXP, '') : '';
    setRiskScore(Number(result));
    setRiskThresholdError('');
    callbackDebounced(() => handleUpdate(PhoneCheckSettingTypes.PhoneRiskThreshold, Number(result)));
  }, [handleUpdate, callbackDebounced]);

  const handleRiskScoreBlur = useCallback(({ target: { value } }) => {
    setRiskThresholdError(validateRiskThreshold(parseInt(value, 10)));
    handleUpdate(PhoneCheckSettingTypes.PhoneRiskThreshold, parseInt(value, 10));
  }, [handleUpdate]);

  return (
    <Box>
      <Box mb={4}>
        <ExtendedDescription
          title={intl.formatMessage({ id: 'PhoneCheck.settings.phoneValidation.title' })}
          text={intl.formatMessage({ id: 'PhoneCheck.settings.phoneValidation.description' })}
          postfix={(
            <Switch
              name="phoneValidaiton"
              color="primary"
              size="small"
              checked={currentMethod === PhoneOwnershipValidationTypes.Sms || currentMethod === PhoneOwnershipValidationTypes.SmsOptional}
              onChange={handleModeChange(PhoneOwnershipValidationTypes.Sms, PhoneOwnershipValidationTypes.None)}
            />
          )}
        />
      </Box>
      <Box mb={4}>
        <ExtendedDescription
          title={intl.formatMessage({ id: 'PhoneCheck.settings.optionalStep.title' })}
          text={intl.formatMessage({ id: 'PhoneCheck.settings.optionalStep.description' })}
          postfix={(
            <Switch
              name="makeStepSmsOptional"
              color="primary"
              size="small"
              checked={currentMethod === PhoneOwnershipValidationTypes.SmsOptional}
              onChange={handleModeChange(PhoneOwnershipValidationTypes.SmsOptional, PhoneOwnershipValidationTypes.Sms)}
              disabled={currentMethod === PhoneOwnershipValidationTypes.None}
            />
          )}
        />
      </Box>
      <Box mb={4}>
        <ExtendedDescription
          title={intl.formatMessage({ id: 'PhoneCheck.settings.companyName.title' })}
          text={intl.formatMessage({ id: 'PhoneCheck.settings.companyName.description' })}
        />
        <TextFieldName
          type="text"
          value={companyName}
          onChange={handleCompanyNameChange}
          error={!!companyNameError}
          className={classes.companyName}
          helperText={companyNameError && intl.formatMessage({ id: `Product.PhoneCheck.companyName.${companyNameError}` })}
          disabled={currentMethod === PhoneOwnershipValidationTypes.None}
        />
      </Box>
      <Box mb={4}>
        <ExtendedDescription
          title={intl.formatMessage({ id: 'PhoneCheck.settings.riskAnalysis.title' })}
          text={intl.formatMessage({ id: 'PhoneCheck.settings.riskAnalysis.description' })}
          postfix={(
            <Switch
              name="riskAnalysis"
              color="primary"
              size="small"
              checked={isPhoneRiskEnabled}
              onChange={handlePhoneRiskModeToggle}
              disabled={currentMethod === PhoneOwnershipValidationTypes.None}
            />
          )}
        />
        <RadioGroup
          aria-label="risk-analysis-configuration"
          name="risk-analysis-configuration"
          value={riskThresholdMode}
          onChange={handlePhoneRiskModeChange}
        >
          {Object.keys(PhoneRiskThresholdModes).map((mode) => (
            <BoxBordered key={mode} mt={1} width="100%">
              <FormControlLabel
                value={mode}
                control={<RadioButton color="primary" />}
                className={classes.riskAnalysis}
                label={(
                  <>
                    <Box mb={0.5} color="common.black90" fontWeight="bold">
                      {intl.formatMessage({ id: `PhoneCheck.settings.riskAnalysis.${mode.toLowerCase()}.title` }, {
                        score: ScoreMapping[mode],
                      })}
                    </Box>
                    {mode !== PhoneRiskThresholdModes.Custom && (
                      <Box color="common.black75" lineHeight={1.2}>
                        {intl.formatMessage({ id: `PhoneCheck.settings.riskAnalysis.${mode.toLowerCase()}.description` })}
                      </Box>
                    )}
                    {mode === PhoneRiskThresholdModes.Custom && (
                      <TextFieldInputScore
                        value={riskThresholdMode === mode ? riskScore : ''}
                        onBlur={handleRiskScoreBlur}
                        onChange={handleRiskScoreChange}
                        placeholder={`${PhoneRiskPredefinedThreshold.Min}-${PhoneRiskPredefinedThreshold.Max}`}
                        error={!!riskThresholdError}
                        helperText={riskThresholdError && intl.formatMessage({ id: `Product.PhoneCheck.riskAnalisys.${mode.toLowerCase()}.validations.${riskThresholdError}` })}
                        disabled={!isPhoneRiskEnabled}
                      />
                    )}
                  </>
                )}
                disabled={!isPhoneRiskEnabled}
              />
            </BoxBordered>
          ))}
        </RadioGroup>
      </Box>
    </Box>
  );
}
