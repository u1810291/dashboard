import React, { useCallback } from 'react';
import { Box } from '@material-ui/core';
import { ExtendedDescription } from 'apps/ui';
import { ProductSettingsProps } from 'models/Product.model';
import { VerificationPatterns } from 'models/VerificationPatterns.model';
import cloneDeep from 'lodash/cloneDeep';
import { BackgroundCheckSettingTypes } from 'models/BackgroundCheck.model';
import { useFormatMessage } from 'apps/intl';
import { BackgroundCheckCountriesSettings } from '../BackgroundCheckCountriesSettings/BackgroundCheckCountriesSettings';

export function BackgroundCheckSettings({ settings, onUpdate }: ProductSettingsProps) {
  const formatMessage = useFormatMessage();
  const handleUpdate = useCallback((settingId: BackgroundCheckSettingTypes) => (newValue: VerificationPatterns) => {
    const newSettings = cloneDeep(settings);
    if (settingId === BackgroundCheckSettingTypes.BackgroundChecksSetting) {
      newSettings[settingId].value = { ...newSettings[settingId].value, ...newValue };
    }
    onUpdate(newSettings);
  }, [onUpdate, settings]);

  return (
    <Box>
      <Box mb={1}>
        <ExtendedDescription
          title={formatMessage('BackgroundCheck.card.check.condition.title')}
          text={formatMessage('BackgroundCheck.card.check.condition.subTitle')}
        />
      </Box>
      <ExtendedDescription
        title={formatMessage('BackgroundCheck.card.check.availableCountries.title')}
        text={formatMessage('BackgroundCheck.card.check.availableCountries.subTitle')}
      >
        <BackgroundCheckCountriesSettings
          verificationPattern={settings[BackgroundCheckSettingTypes.BackgroundChecksSetting]?.value}
          onChange={handleUpdate(BackgroundCheckSettingTypes.BackgroundChecksSetting)}
        />
      </ExtendedDescription>
    </Box>
  );
}
