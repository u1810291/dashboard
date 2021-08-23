import { Box, Switch, Typography, Slider } from '@material-ui/core';
import { BoxBordered, ExtendedDescription } from 'apps/ui';
import { cloneDeep } from 'lodash';
import { useDebounce } from 'lib/debounce.hook';
import classnames from 'classnames';
import { ProductSettingsProps } from 'models/Product.model';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { AmlCheckTypes, AmlSettingsTypes } from '../../models/Aml.model';
import { useStyles } from './AmsSettings.styles';

export function AmlSettings({ settings, onUpdate }: ProductSettingsProps<AmlSettingsTypes>) {
  const intl = useIntl();
  const classes = useStyles();
  const debounced = useDebounce();
  const [search, setSearch] = useState<boolean>(settings[AmlSettingsTypes.Search].value);
  const [monitoring, setMonitoring] = useState<boolean>(settings[AmlSettingsTypes.Monitoring].value);
  const [amlThreshold, setAmlThreshold] = useState<number>(settings[AmlSettingsTypes.AmlThreshold].value);

  useEffect(() => {
    setSearch(settings[AmlSettingsTypes.Search].value);
    setMonitoring(settings[AmlSettingsTypes.Monitoring].value);
    setAmlThreshold(settings[AmlSettingsTypes.AmlThreshold].value);
  }, [settings]);

  const handleSearchToggle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = cloneDeep(settings);
    const newValue = e.target.checked;
    newSettings[AmlSettingsTypes.Search].value = newValue;
    if (!newValue) {
      newSettings[AmlSettingsTypes.Monitoring].value = false;
    }
    onUpdate(newSettings);
  }, [onUpdate, settings]);

  const handleMonitoringToggle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = cloneDeep(settings);
    const newValue = e.target.checked;
    if (!newValue) {
      newSettings[AmlSettingsTypes.Search].value = false;
    }
    newSettings[AmlSettingsTypes.Monitoring].value = newValue;
    onUpdate(newSettings);
  }, [onUpdate, settings]);

  const handleSliderChange = useCallback(
    (_: Object, value: number | number[]) => {
      const newSettings = cloneDeep(settings);
      newSettings[AmlSettingsTypes.AmlThreshold].value = value;
      debounced(() => onUpdate(newSettings));
    },
    [onUpdate, settings, debounced],
  );

  const marks = useMemo(() => {
    const result: { value: number; label?: React.ReactNode }[] = new Array(11).fill(1).map((_: number, index: number) => ({ value: index * 10 }));
    result[0].label = (
      <>
        <span className={classes.sliderPointValue}>0</span>
        <span className={classnames(classes.sliderPointText, classes.sliderPointFirst)}>{intl.formatMessage({ id: 'AmlCheck.settings.fuzzinessParameter.slider.StrictMatch' })}</span>
      </>
    );
    result[5].label = (
      <>
        <span className={classes.sliderPointValue}>50</span>
        <span className={classnames(classes.sliderPointText, classes.sliderPointMiddle)}>{intl.formatMessage({ id: 'AmlCheck.settings.fuzzinessParameter.slider.Optimal' })}</span>
      </>
    );
    result[10].label = (
      <>
        <span className={classes.sliderPointValue}>100</span>
        <span className={classnames(classes.sliderPointText, classes.sliderPointLast)}>{intl.formatMessage({ id: 'AmlCheck.settings.fuzzinessParameter.slider.FuzzyMatch' })}</span>
      </>
    );

    return result;
  }, [intl, classes]);

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="subtitle2" color="textPrimary" gutterBottom>
          {intl.formatMessage({ id: 'AmlCheck.settings.watchlist.title' })}
        </Typography>
        <Box color="common.black75">
          {intl.formatMessage({ id: 'AmlCheck.settings.watchlist.description' })}
        </Box>
      </Box>
      <Box mb={4}>
        <Typography variant="subtitle2" color="textPrimary" gutterBottom>
          {intl.formatMessage({ id: 'AmlCheck.settings.fuzzinessParameter.title' })}
        </Typography>
        <Box color="common.black75" mb={2}>
          {intl.formatMessage({ id: 'AmlCheck.settings.fuzzinessParameter.description' })}
        </Box>
        <Slider
          defaultValue={amlThreshold}
          valueLabelDisplay="auto"
          step={10}
          marks={marks}
          min={0}
          max={100}
          onChange={handleSliderChange}
        />
      </Box>
      <BoxBordered px={2}>
        <ExtendedDescription
          title={intl.formatMessage({ id: `AmlCheck.settings.${AmlCheckTypes.Search}.title` })}
          text={intl.formatMessage({ id: `AmlCheck.settings.${AmlCheckTypes.Search}.description` })}
          postfix={(
            <Switch
              checked={search}
              onChange={handleSearchToggle}
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
                    onChange={handleMonitoringToggle}
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
