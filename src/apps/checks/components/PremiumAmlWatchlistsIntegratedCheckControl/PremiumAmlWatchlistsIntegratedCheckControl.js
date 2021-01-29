import { Switch, Box } from '@material-ui/core';
import { notification, BoxBordered } from 'apps/ui';
import { FiSearch, FiActivity } from 'react-icons/fi';
import { DocumentStepTypes } from 'models/Step.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { configurationFlowUpdate } from 'state/merchant/merchant.actions';
import { selectPremiumAmlWatchlistsCheck } from 'state/merchant/merchant.selectors';
import { PremiumAmlWatchlistsValidationTypes } from '../../../premiumAmlWatchlistsIntegratedCheck/models/premiumAmlWatchlistsIntegratedCheck.model';
import { useStyles, TitleIcon } from './PremiumAmlWatchlistsIntegratedCheckControl.styles';

export function PremiumAmlWatchlistsCheckControl() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const premiumAmlWatchlistsCheck = useSelector(selectPremiumAmlWatchlistsCheck);
  const [isSearch, setSearch] = useState(false);
  const [isSearchMonitoring, setSearchMonitoring] = useState(false);

  const handleChange = useCallback(async (event, value) => {
    const isChecked = event.target.checked;
    try {
      await dispatch(configurationFlowUpdate({
        verificationPatterns: {
          [DocumentStepTypes.PremiumAmlWatchlistsCheck]: isChecked ? value : PremiumAmlWatchlistsValidationTypes.none,
        },
      }));
      if (value === PremiumAmlWatchlistsValidationTypes.search) {
        setSearch(isChecked);
        setSearchMonitoring(isChecked ? false : isSearchMonitoring);
      }
      if (value === PremiumAmlWatchlistsValidationTypes.searchMonitoring) {
        setSearchMonitoring(isChecked);
        setSearch(isChecked ? false : isSearch);
      }
    } catch (e) {
      console.error('error', e.message);
      notification.error(intl.formatMessage({ id: 'update.field.error' }, { name: intl.formatMessage({ id: 'Product.checks.premiumAmlWatchlistsCheck.title' }) }));
    }
  }, [dispatch, intl, isSearchMonitoring, isSearch]);

  useEffect(() => {
    setSearch(premiumAmlWatchlistsCheck === PremiumAmlWatchlistsValidationTypes.search);
    setSearchMonitoring(premiumAmlWatchlistsCheck === PremiumAmlWatchlistsValidationTypes.searchMonitoring);
  }, [premiumAmlWatchlistsCheck]);

  return (
    <Box mt={2}>
      <BoxBordered className={classes.paper}>
        <Box className={classes.container}>
          <Box className={classes.header}>
            <Box className={classes.icon}>
              <TitleIcon icon={FiSearch} />
            </Box>
            <Box className={classes.titleText}>
              {intl.formatMessage({ id: 'Product.checks.premiumAmlWatchlistsCheck.search.title' })}
            </Box>
          </Box>
          <Box ml={2.5} className={classes.body}>
            <Box className={classes.text}>
              {intl.formatMessage({ id: 'Product.checks.premiumAmlWatchlistsCheck.search.text' })}
            </Box>
            <Switch
              name="premiumAmlWatchlistsCheck"
              color="primary"
              size="small"
              checked={isSearch}
              onChange={(e) => handleChange(e, PremiumAmlWatchlistsValidationTypes.search)}
              className={classes.switcher}
            />
          </Box>
        </Box>
      </BoxBordered>
      <BoxBordered mt={1} className={classes.paper}>
        <Box className={classes.container}>
          <Box className={classes.header}>
            <Box className={classes.icon}>
              <TitleIcon icon={FiActivity} />
            </Box>
            <Box className={classes.titleText}>
              {intl.formatMessage({ id: 'Product.checks.premiumAmlWatchlistsCheck.searchMonitoring.title' })}
            </Box>
          </Box>
          <Box ml={2.5} className={classes.body}>
            <Box className={classes.text}>
              {intl.formatMessage({ id: 'Product.checks.premiumAmlWatchlistsCheck.searchMonitoring.text' })}
            </Box>
            <Switch
              name="premiumAmlWatchlistsCheck"
              color="primary"
              size="small"
              checked={isSearchMonitoring}
              onChange={(e) => handleChange(e, PremiumAmlWatchlistsValidationTypes.searchMonitoring)}
              className={classes.switcher}
            />
          </Box>
        </Box>
      </BoxBordered>
    </Box>
  );
}
