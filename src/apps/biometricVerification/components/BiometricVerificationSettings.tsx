import React, { useCallback } from 'react';
import { Box } from '@material-ui/core';
import { ExtendedDescription } from 'apps/ui';
import { useIntl } from 'react-intl';
import { BiometricVerificationSettingsTypes } from 'apps/biometricVerification/models/BiometricVerification.model';
import cloneDeep from 'lodash/cloneDeep';
import { ProductSettingsProps } from 'models/Product.model';
import { BiometricConfiguration } from './BiometricConfiguration/BiometricConfiguration';

export function BiometricVerificationSettings({ settings, onUpdate }: ProductSettingsProps<BiometricVerificationSettingsTypes>) {
  const intl = useIntl();

  const handleBiometricsChanges = useCallback((biometrics: string | null): void => {
    const newSettings = cloneDeep(settings);
    newSettings.biometrics.value = biometrics;
    onUpdate(newSettings);
  }, [settings, onUpdate]);

  const handlePatternsChange = useCallback(() => {
    const newSettings = cloneDeep(settings);
    newSettings[BiometricVerificationSettingsTypes.DuplicateFaceDetection].value = !settings[BiometricVerificationSettingsTypes.DuplicateFaceDetection].value;
    onUpdate(newSettings);
  }, [onUpdate, settings]);

  return (
    <Box>
      <ExtendedDescription
        title={intl.formatMessage({ id: 'ReVerification.settings.biometrics.title' })}
        text={intl.formatMessage({ id: 'ReVerification.settings.biometrics.description' })}
      >
        <BiometricConfiguration
          duplicateFaceDetection={settings[BiometricVerificationSettingsTypes.DuplicateFaceDetection].value}
          biometrics={settings[BiometricVerificationSettingsTypes.Biometrics].value}
          proofOfOwnership={settings[BiometricVerificationSettingsTypes.Biometrics].isCantBeUsedWithOtherSetting}
          onUpdate={handleBiometricsChanges}
          onPatternsChange={handlePatternsChange}
        />
      </ExtendedDescription>
    </Box>
  );
}
