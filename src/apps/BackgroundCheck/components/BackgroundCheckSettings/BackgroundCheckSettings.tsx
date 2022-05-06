import React, { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import { ExtendedDescription } from 'apps/ui';
import { useIntl } from 'react-intl';
import { ProductSettingsProps } from 'models/Product.model';
import { VerificationPatterns } from 'models/VerificationPatterns.model';
import { cloneDeep } from 'lodash';
import { BackgroundCheckSettingTypes } from 'models/BackgroundCheck.model';
import { BackgroundCheckCountriesSettings } from '../BackgroundCheckCountriesSettings/BackgroundCheckCountriesSettings';

export function BackgroundCheckSettings({ settings, onUpdate }: ProductSettingsProps) {
  const intl = useIntl();

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
          title={intl.formatMessage({ id: 'BackgroundCheck.card.check.condition.title' })}
          text={intl.formatMessage({ id: 'BackgroundCheck.card.check.condition.subTitle' })}
        />
      </Box>
      <ExtendedDescription
        title={intl.formatMessage({ id: 'BackgroundCheck.card.check.availableCountries.title' })}
        text={intl.formatMessage({ id: 'BackgroundCheck.card.check.availableCountries.subTitle' })}
      >
        <BackgroundCheckCountriesSettings
          verificationPattern={settings[BackgroundCheckSettingTypes.BackgroundChecksSetting]?.value}
          onChange={handleUpdate(BackgroundCheckSettingTypes.BackgroundChecksSetting)}
        />
      </ExtendedDescription>
    </Box>
  );
}
