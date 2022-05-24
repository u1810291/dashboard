import React, { useCallback } from 'react';
import { Box } from '@material-ui/core';
import { ExtendedDescription } from 'apps/ui';
import { BiometricVerificationSettingsTypes } from 'apps/biometricVerification/models/BiometricVerification.model';
import cloneDeep from 'lodash/cloneDeep';
import { ProductSettingsProps } from 'models/Product.model';
import { useFormatMessage } from 'apps/intl';
import { BiometricConfiguration } from './BiometricConfiguration/BiometricConfiguration';

export function BiometricVerificationSettings({ settings, onUpdate }: ProductSettingsProps<BiometricVerificationSettingsTypes>) {
  const formatMessage = useFormatMessage();

  const handleBiometricsChanges = useCallback((biometrics: Nullable<string>): void => {
    const newSettings = cloneDeep(settings);
    newSettings.biometrics.value = biometrics;
    onUpdate(newSettings);
  }, [settings, onUpdate]);

  const handleBiometricsDuplicateUserThresholdChanges = useCallback((threshold: Nullable<number>): void => {
    const newSettings = cloneDeep(settings);
    newSettings[BiometricVerificationSettingsTypes.DuplicateFaceDetectionThreshold].value = threshold;
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
        title={formatMessage('ReVerification.settings.biometrics.title')}
        text={formatMessage('ReVerification.settings.biometrics.description')}
      >
        <BiometricConfiguration
          duplicateFaceDetection={settings[BiometricVerificationSettingsTypes.DuplicateFaceDetection].value}
          duplicateFaceDetectionThreshold={settings[BiometricVerificationSettingsTypes.DuplicateFaceDetectionThreshold].value}
          biometrics={settings[BiometricVerificationSettingsTypes.Biometrics].value}
          proofOfOwnership={settings[BiometricVerificationSettingsTypes.Biometrics].isCantBeUsedWithOtherSetting}
          onUpdate={handleBiometricsChanges}
          onThresholdChange={handleBiometricsDuplicateUserThresholdChanges}
          onPatternsChange={handlePatternsChange}
        />
      </ExtendedDescription>
    </Box>
  );
}
