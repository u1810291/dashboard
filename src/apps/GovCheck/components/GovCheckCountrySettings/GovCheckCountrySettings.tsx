import React from 'react';
import { flagMap } from 'assets/flags';
import { Box, Grid, Switch } from '@material-ui/core';
import { ExtendedDescription } from 'apps/ui';
import { useIntl } from 'react-intl';
import { GovCheck, GovCheckCountryTypes, GovCheckParsed } from 'apps/GovCheck/models/GovCheck.model';
import { useStyles } from './GovCheckCountrySettings.styles';
import { GovCheckSalesToolTip } from '../GovCheckSalesToolTip/GovCheckSalesToolTip';

export function GovCheckCountrySettings({ country, checkList: govChecks, onChange, onChangeOption, hideOptions = false }: {
  country: GovCheckCountryTypes;
  checkList: GovCheckParsed[];
  onChange: (item: GovCheck) => (event: any) => void;
  onChangeOption?: (item: GovCheck) => (event: any) => void;
  hideOptions?: boolean;
}) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Box key={country} className={classes.wrapper} p={1} pr={2} mt={1}>
      <Grid container alignItems="center" wrap="nowrap">
        <Box mr={1} className={classes.icon}>{flagMap[country]}</Box>
        <Box color="common.black90" fontWeight="bold">
          {intl.formatMessage({ id: `GovCheck.country.${country}` })}
        </Box>
      </Grid>
      {govChecks.map((govCheck) => (
        <Box key={govCheck.id} mt={1} className={classes.check}>
          <ExtendedDescription
            title={(
              <>
                {intl.formatMessage({ id: `GovCheck.check.${govCheck.id}` })}
                {!govCheck.isCanUse && (<GovCheckSalesToolTip />)}
              </>
            )}
            titleColor="common.black75"
            text={
              govCheck.description
              && intl.formatMessage({
                id: `GovCheck.check.${govCheck.id}.description`,
              })
            }
            textFontSize={10}
            postfix={(
              <Switch
                checked={!!govCheck.value}
                onChange={onChange(govCheck)}
                color="primary"
                disabled={govCheck.isDisabled}
              />
            )}
          />
          {(govCheck.option && !hideOptions) && (
            <Box display="flex" mt={0.3}>
              <Box className={classes.arrow} />
              <Box ml={0.5} width="100%">
                <ExtendedDescription
                  title={(
                    <>
                      {govCheck.option.stepTypeAlias ? intl.formatMessage({ id: `GovCheck.check.${govCheck.id}.${govCheck.option.id}` }) : intl.formatMessage({ id: `GovCheck.check.${govCheck.option.id}` })}
                      {!govCheck.option.isCanUse && (<GovCheckSalesToolTip isGovCheckOption />)}
                    </>
                  )}
                  titleColor="common.black75"
                  text={
                    govCheck.option.description
                    && intl.formatMessage({
                      id: `GovCheck.check.${govCheck.id}.${govCheck.option.id}.description`,
                    })
                  }
                  textFontSize={10}
                  postfix={(
                    <Switch
                      checked={!!govCheck.option.value}
                      onChange={onChangeOption ? onChangeOption(govCheck) : undefined}
                      color="primary"
                      disabled={govCheck.option.isDisabled}
                    />
                  )}
                />
              </Box>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
