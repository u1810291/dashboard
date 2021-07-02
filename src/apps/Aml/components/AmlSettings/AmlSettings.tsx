import { Box, Switch, Typography } from '@material-ui/core';
import { BoxBordered, ExtendedDescription } from 'apps/ui';
import { cloneDeep } from 'lodash';
import { ProductSettingsProps } from 'models/Product.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { AmlCheckTypes, AmlSettingsTypes } from '../../models/Aml.model';
import { useStyles } from './AmsSettings.styles';

export function AmlSettings({ settings, onUpdate }: ProductSettingsProps<AmlSettingsTypes>) {
  const intl = useIntl();
  const classes = useStyles();
  const [search, setSearch] = useState<boolean>(false);
  const [monitoring, setMonitoring] = useState<boolean>(false);

  useEffect(() => {
    setSearch(settings[AmlSettingsTypes.Search].value);
    setMonitoring(settings[AmlSettingsTypes.Monitoring].value);
  }, [settings]);

  const handleSearchToggle = useCallback((e) => {
    const newSettings = cloneDeep(settings);
    const newValue = e.target.checked;
    newSettings[AmlSettingsTypes.Search].value = newValue;
    if (!newValue) {
      newSettings[AmlSettingsTypes.Monitoring].value = false;
    }
    onUpdate(newSettings);
  }, [onUpdate, settings]);

  const handleMonitoringToggle = useCallback((e) => {
    const newSettings = cloneDeep(settings);
    const newValue = e.target.checked;
    if (!newValue) {
      newSettings[AmlSettingsTypes.Search].value = false;
    }
    newSettings[AmlSettingsTypes.Monitoring].value = newValue;
    onUpdate(newSettings);
  }, [onUpdate, settings]);

  return (
    <Box>
      <Box mb={1}>
        <Typography variant="subtitle2" color="textPrimary" gutterBottom>
          {intl.formatMessage({ id: 'AmlCheck.settings.watchlist.title' })}
        </Typography>
        <Box color="common.black75">
          {intl.formatMessage({ id: 'AmlCheck.settings.watchlist.description' })}
        </Box>
      </Box>
      <BoxBordered px={2}>
        <ExtendedDescription
          title={intl.formatMessage({ id: `AmlCheck.settings.${AmlCheckTypes.Search}.title` })}
          text={intl.formatMessage({ id: `AmlCheck.settings.${AmlCheckTypes.Search}.description` })}
          postfix={(
            <Switch
              checked={search}
              onClick={handleSearchToggle}
              color="primary"
            />
          )}
        >
          <Box display="flex">
            <Box className={classes.arrow} />
            <Box ml={0.5}>
              <ExtendedDescription
                title={intl.formatMessage({ id: `AmlCheck.settings.${AmlCheckTypes.Monitoring}.title` })}
                text={intl.formatMessage({ id: `AmlCheck.settings.${AmlCheckTypes.Monitoring}.description` })}
                postfix={(
                  <Switch
                    checked={monitoring}
                    onClick={handleMonitoringToggle}
                    color="primary"
                  />
                )}
              />
            </Box>
          </Box>
        </ExtendedDescription>
      </BoxBordered>
    </Box>
  );
}
