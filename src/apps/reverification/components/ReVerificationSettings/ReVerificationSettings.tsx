import Box from '@material-ui/core/Box';
import { BiometricConfiguration } from 'apps/biometricVerification';
import { FaceMatchingThreshold } from 'apps/facematch';
import { appPalette } from 'apps/theme';
import { ReVerificationSettingTypes } from 'apps/reverification/models/ReVerification.model';
import { FACEMATCH_DEFAULT_REVERIFICATION_THRESHOLD, REVERIFICATION_FACEMATCH_THRESHOLDS } from 'apps/facematch/models/facematch.model';
import { ExtendedDescription, BoxBordered, Warning, WarningSize, WarningTypes } from 'apps/ui';
import cloneDeep from 'lodash/cloneDeep';
import { ProductSettingsProps } from 'models/Product.model';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

export function ReVerificationSettings({ settings, onUpdate }: ProductSettingsProps<ReVerificationSettingTypes>) {
  const intl = useIntl();
  const handleReFacematchChanges = useCallback((reFacematchThreshold: number | null): void => {
    const newSettings = cloneDeep(settings);
    newSettings.reFacematchThreshold.value = reFacematchThreshold;
    onUpdate(newSettings);
  }, [settings, onUpdate]);
  const handleBiometricsChanges = useCallback((biometrics: string | null): void => {
    const newSettings = cloneDeep(settings);
    newSettings.biometrics.value = biometrics;
    onUpdate(newSettings);
  }, [settings, onUpdate]);

  return (
    <Box>
      <Box mb={4}>
        <BoxBordered borderColor={appPalette.yellow} mt={1}>
          <Warning
            type={WarningTypes.Warning}
            size={WarningSize.Large}
            label={intl.formatMessage({ id: 'ReVerification.settings.mobileSdk.warning' })}
          />
        </BoxBordered>
      </Box>
      <Box mb={4}>
        <ExtendedDescription
          title={intl.formatMessage({ id: 'ReVerification.settings.biometrics.title' })}
          text={intl.formatMessage({ id: 'ReVerification.settings.biometrics.description' })}
        >
          <BiometricConfiguration
            isReVerification
            biometrics={settings.biometrics.value}
            proofOfOwnership={settings.proofOfOwnership.value}
            onUpdate={handleBiometricsChanges}
          />
        </ExtendedDescription>
      </Box>
      <Box mb={4}>
        <ExtendedDescription
          title={intl.formatMessage({ id: 'ReVerification.settings.facematch.title' })}
          text={intl.formatMessage({ id: 'ReVerification.settings.facematch.description' })}
        >
          <FaceMatchingThreshold
            defaultThreshold={FACEMATCH_DEFAULT_REVERIFICATION_THRESHOLD}
            thresholds={REVERIFICATION_FACEMATCH_THRESHOLDS}
            facematchThreshold={settings.reFacematchThreshold.value}
            onUpdate={handleReFacematchChanges}
          />
        </ExtendedDescription>
      </Box>
    </Box>
  );
}
