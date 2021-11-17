import { Box } from '@material-ui/core';
import { ExtendedDescription, CountrySwitch } from 'apps/ui';
import cloneDeep from 'lodash/cloneDeep';
import { CountryCodes } from 'models/Country.model';
import { ProductSettingsProps } from 'models/Product.model';
import React, { useMemo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { WorkAccountDataSettingTypes, SUPPORTED_COUNTRIES } from '../../models/WorkAccountData.model';

interface Country {
  code: CountryCodes;
  selected: boolean;
}

export function WorkAccountDataSettings({ settings, onUpdate }: ProductSettingsProps<WorkAccountDataSettingTypes>) {
  const intl = useIntl();
  const countries: Country[] = useMemo(() => SUPPORTED_COUNTRIES.map((country: CountryCodes) => ({
    code: country,
    selected: settings.countryCodes.value.includes(country),
  })), [settings]);

  const handleCountryUpdate = useCallback((code: CountryCodes) => () => {
    const newSettings = cloneDeep(settings);
    if (newSettings.countryCodes.value.includes(code)) {
      newSettings.countryCodes.value = newSettings.countryCodes.value.filter((countryCode: CountryCodes) => countryCode !== code);
    } else {
      newSettings.countryCodes.value.push(code);
    }
    onUpdate(newSettings);
  }, [settings, onUpdate]);

  return (
    <Box>
      <Box mb={2}>
        <ExtendedDescription
          title={intl.formatMessage({ id: 'WorkAccountData.settings.title' })}
          text={intl.formatMessage({ id: 'WorkAccountData.settings.description' })}
        />
      </Box>

      <Box>
        {countries.map((country: Country) => (
          <CountrySwitch
            key={country.code}
            country={country.code}
            value={country.selected}
            onChange={handleCountryUpdate(country.code)}
          />
        ))}
      </Box>
    </Box>
  );
}
