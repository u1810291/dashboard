import React, { useCallback } from 'react';
import { Box, Link } from '@material-ui/core';
import { ExtendedDescription } from 'apps/ui';
import { useIntl } from 'react-intl';
import { ProductSettingsProps } from 'models/Product.model';
import { cloneDeep } from 'lodash';
import { GovernmentCheckSettingTypes } from '../../models/GovCheck.model';
import { GovCheckTimeoutSettings } from '../GovCheckTimeoutSettings/GovCheckTimeoutSettings';
import { GovCheckCountriesSettings } from '../GovCheckCountriesSettings/GovCheckCountriesSettings';
import { useStyles } from './GovCheckSettings.styles';

export function GovCheckSettings({ settings, onUpdate }: ProductSettingsProps) {
  const intl = useIntl();
  const classes = useStyles();

  const handleUpdate = useCallback((settingId: GovernmentCheckSettingTypes) => (newValue: any) => {
    const newSettings = cloneDeep(settings);
    if (settingId === GovernmentCheckSettingTypes.CountriesGovChecks) {
      newSettings[settingId].value = { ...newSettings[settingId].value, ...newValue };
    }
    if (settingId === GovernmentCheckSettingTypes.PostponedTimeout) {
      newSettings[settingId].value = newValue;
    }

    onUpdate(newSettings);
  }, [onUpdate, settings]);

  return (
    <Box>
      <Box mb={4}>
        <ExtendedDescription
          title={intl.formatMessage({ id: `GovernmentCheck.settings.title.${GovernmentCheckSettingTypes.PostponedTimeout}` })}
          text={intl.formatMessage({ id: `GovernmentCheck.settings.description.${GovernmentCheckSettingTypes.PostponedTimeout}` })}
          className={classes.setting}
        >
          <GovCheckTimeoutSettings onChange={handleUpdate(GovernmentCheckSettingTypes.PostponedTimeout)} postponedTimeout={settings[GovernmentCheckSettingTypes.PostponedTimeout]?.value} />
        </ExtendedDescription>
      </Box>
      <Box>
        <ExtendedDescription
          title={intl.formatMessage({ id: `GovernmentCheck.settings.title.${GovernmentCheckSettingTypes.CountriesGovChecks}` })}
          text={(
            <>
              {intl.formatMessage({ id: `GovernmentCheck.settings.description.${GovernmentCheckSettingTypes.CountriesGovChecks}` })}
              &nbsp;
              <Link href="mailto:support@mati.io">support@mati.io</Link>
            </>
          )}
          className={classes.setting}
        >
          <GovCheckCountriesSettings
            verificationPatterns={settings[GovernmentCheckSettingTypes.CountriesGovChecks]?.value}
            onChange={handleUpdate(GovernmentCheckSettingTypes.CountriesGovChecks)}
          />
        </ExtendedDescription>
      </Box>
    </Box>
  );
}
