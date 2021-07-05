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

  return (
    <Box>
      <ExtendedDescription
        title={intl.formatMessage({ id: 'ReVerification.settings.biometrics.title' })}
        text={intl.formatMessage({ id: 'ReVerification.settings.biometrics.description' })}
      >
        <BiometricConfiguration
          biometrics={settings[BiometricVerificationSettingsTypes.Biometrics].value}
          proofOfOwnership={settings[BiometricVerificationSettingsTypes.Biometrics].isCantBeUsedWithOtherSetting}
          onUpdate={handleBiometricsChanges}
        />
      </ExtendedDescription>
    </Box>
  );
}
