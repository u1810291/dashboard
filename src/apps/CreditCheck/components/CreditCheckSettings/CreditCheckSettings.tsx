import React, { useCallback } from 'react';
import { Box, Link } from '@material-ui/core';
import { ExtendedDescription } from 'apps/ui';
import { useIntl } from 'react-intl';
import { ProductSettingsProps } from 'models/Product.model';
import { VerificationPatterns } from 'models/VerificationPatterns.model';
import { cloneDeep } from 'lodash';
import { CreditCheckSettingTypes } from '../../models/CreditCheck.model';
import { CreditCheckCountriesSettings } from '../CreditCheckCountriesSettings/CreditCheckCountriesSettings';

export function CreditCheckSettings({ settings, onUpdate }: ProductSettingsProps) {
  const intl = useIntl();

  const handleUpdate = useCallback((settingId: CreditCheckSettingTypes) => (newValue: VerificationPatterns) => {
    const newSettings = cloneDeep(settings);
    if (settingId === CreditCheckSettingTypes.CountriesCreditChecks) {
      newSettings[settingId].value = { ...newSettings[settingId].value, ...newValue };
    }

    onUpdate(newSettings);
  }, [onUpdate, settings]);

  return (
    <Box>
      <ExtendedDescription
        title={intl.formatMessage({ id: `CreditCheck.settings.title.${CreditCheckSettingTypes.CountriesCreditChecks}` })}
        text={intl.formatMessage({ id: 'CreditCheck.settings.description.countriesCreditChecks' }, {
          email: <Link href="mailto:support@metamap.com">support@metamap.com</Link>,
        })}
      >
        <CreditCheckCountriesSettings
          verificationPattern={settings[CreditCheckSettingTypes.CountriesCreditChecks]?.value}
          onChange={handleUpdate(CreditCheckSettingTypes.CountriesCreditChecks)}
        />
      </ExtendedDescription>
    </Box>
  );
}
