import { Box, FormControlLabel, RadioGroup, Switch } from '@material-ui/core';
import { BoxBordered, ExtendedDescription, RadioButton, TextFieldName } from 'apps/ui';
import { useDebounce } from 'lib/debounce.hook';
import { ONLY_NUMBERS_REG_EXP, validateMaxLength } from 'lib/validations';
import { cloneDeep } from 'lodash';
import { ProductSettingsProps } from 'models/Product.model';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { COMPANY_NAME_LENGTH_LIMIT, getDefaultRiskThresholdMode, PhoneCheckSettingTypes, PhoneOwnershipValidationTypes, PhoneRiskPredefinedThreshold, PhoneRiskThresholdModes, ScoreMapping, validateRiskThreshold } from '../../models/PhoneCheck.model';
import { TextFieldInputScore, useStyles } from './PhoneCheckSettings.styles';
import { selectCanUsePhoneValidation } from '../../state/PhoneCheck.selectors';
import { ProductCanUseContainer } from '../../../merchant';

export function PhoneCheckSettings({ settings, onUpdate }: ProductSettingsProps<PhoneCheckSettingTypes>) {
  const intl = useIntl();
  const classes = useStyles();
  const debounced = useDebounce();
  const [isPhoneRiskEnabled, setIsPhoneRiskEnabled] = useState<boolean>(settings[PhoneCheckSettingTypes.PhoneRiskValidation].value);
  const [companyName, setCompanyName] = useState<string>(settings[PhoneCheckSettingTypes.CompanyName].value);
  const [riskScore, setRiskScore] = useState<PhoneRiskPredefinedThreshold | number>(settings[PhoneCheckSettingTypes.PhoneRiskThreshold].value);
  const [currentMethod, setCurrentMethod] = useState<PhoneOwnershipValidationTypes>(settings[PhoneCheckSettingTypes.PhoneOwnershipValidation].value);
  const [isCanUsePhoneValidation] = useState<boolean>(useSelector(selectCanUsePhoneValidation));
  const [riskThresholdMode, setRiskThresholdMode] = useState<PhoneRiskThresholdModes>(getDefaultRiskThresholdMode(settings[PhoneCheckSettingTypes.PhoneRiskThreshold].value));
  const [riskThresholdError, setRiskThresholdError] = useState<string>();
  const [companyNameError, setCompanyNameError] = useState<string>('');

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
    debounced(() => handleUpdate(PhoneCheckSettingTypes.CompanyName, value));
  }, [handleUpdate, debounced]);

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
    debounced(() => handleUpdate(PhoneCheckSettingTypes.PhoneRiskThreshold, Number(result)));
  }, [handleUpdate, debounced]);

  const handleRiskScoreBlur = useCallback(({ target: { value } }) => {
    setRiskThresholdError(validateRiskThreshold(parseInt(value, 10)));
    handleUpdate(PhoneCheckSettingTypes.PhoneRiskThreshold, parseInt(value, 10));
  }, [handleUpdate]);

  return (
    <ProductCanUseContainer isCanUseProduct={isCanUsePhoneValidation}>
      <Box>
        <Box mb={4}>
          <ExtendedDescription
            title={intl.formatMessage({ id: 'PhoneCheck.settings.phoneValidation.title' })}
            text={intl.formatMessage({ id: 'PhoneCheck.settings.phoneValidation.description' })}
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
                disabled={currentMethod === PhoneOwnershipValidationTypes.None || !isCanUsePhoneValidation}
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
            helperText={companyNameError && intl.formatMessage({ id: `PhoneCheck.settings.companyName.${companyNameError}` })}
            disabled={currentMethod === PhoneOwnershipValidationTypes.None || !isCanUsePhoneValidation}
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
                disabled={currentMethod === PhoneOwnershipValidationTypes.None || !isCanUsePhoneValidation}
              />
          )}
          />
          <RadioGroup
            aria-label="risk-analysis-configuration"
            name="risk-analysis-configuration"
            value={riskThresholdMode}
            onChange={handlePhoneRiskModeChange}
          >
            {Object.values(PhoneRiskThresholdModes).map((mode) => (
              <BoxBordered key={mode} mt={1} width="100%">
                <FormControlLabel
                  value={mode}
                  control={<RadioButton color="primary" />}
                  className={classes.riskAnalysis}
                  label={(
                    <>
                      <Box mb={0.5} color="common.black90" fontWeight="bold">
                        {intl.formatMessage({ id: `PhoneCheck.settings.riskAnalysis.${mode}.title` }, {
                          score: ScoreMapping[mode],
                        })}
                      </Box>
                      {mode !== PhoneRiskThresholdModes.Custom && (
                      <Box color="common.black75" lineHeight={1.2}>
                        {intl.formatMessage({ id: `PhoneCheck.settings.riskAnalysis.${mode}.description` })}
                      </Box>
                      )}
                      {mode === PhoneRiskThresholdModes.Custom && (
                      <TextFieldInputScore
                        value={riskThresholdMode === mode ? riskScore : ''}
                        onBlur={handleRiskScoreBlur}
                        onChange={handleRiskScoreChange}
                        placeholder={`${PhoneRiskPredefinedThreshold.Min}-${PhoneRiskPredefinedThreshold.Max}`}
                        error={!!riskThresholdError}
                        helperText={riskThresholdError && intl.formatMessage({ id: `PhoneCheck.settings.riskAnalysis.${mode}.validations.${riskThresholdError}` })}
                        disabled={!isPhoneRiskEnabled || !isCanUsePhoneValidation}
                      />
                      )}
                    </>
                )}
                  disabled={!isPhoneRiskEnabled || !isCanUsePhoneValidation}
                />
              </BoxBordered>
            ))}
          </RadioGroup>
        </Box>
      </Box>
    </ProductCanUseContainer>
  );
}
