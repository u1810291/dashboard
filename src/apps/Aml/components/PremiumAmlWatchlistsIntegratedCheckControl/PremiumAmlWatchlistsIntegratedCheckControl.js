import { Box, Switch } from '@material-ui/core';
import { BoxBordered, notification } from 'apps/ui';
import { DocumentStepTypes } from 'models/Step.model';
import React, { useCallback, useEffect, useState } from 'react';
import { FiActivity, FiSearch } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { merchantUpdateFlow } from 'state/merchant/merchant.actions';
import { AmlValidationTypes } from '../../models/Aml.model';
import { selectPremiumAmlWatchlistsCheck } from '../../state/Aml.selectors';
import { TitleIcon, useStyles } from './PremiumAmlWatchlistsIntegratedCheckControl.styles';

export function PremiumAmlWatchlistsCheckControl() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const premiumAmlWatchlistsCheck = useSelector(selectPremiumAmlWatchlistsCheck);
  const [isSearch, setSearch] = useState(false);
  const [isSearchMonitoring, setSearchMonitoring] = useState(false);

  const handleChange = useCallback((value) => async (event) => {
    const isChecked = event.target.checked;
    try {
      await dispatch(merchantUpdateFlow({
        verificationPatterns: {
          [DocumentStepTypes.PremiumAmlWatchlistsCheck]: isChecked ? value : AmlValidationTypes.None,
        },
      }));
      if (value === AmlValidationTypes.Search) {
        setSearch(isChecked);
        setSearchMonitoring(isChecked ? false : isSearchMonitoring);
      }
      if (value === AmlValidationTypes.SearchMonitoring) {
        setSearchMonitoring(isChecked);
        setSearch(isChecked ? false : isSearch);
      }
    } catch (e) {
      console.error('error', e.message);
      notification.error(intl.formatMessage({ id: 'update.field.error' }, { name: intl.formatMessage({ id: 'Product.checks.premiumAmlWatchlistsCheck.title' }) }));
    }
  }, [dispatch, intl, isSearchMonitoring, isSearch]);

  useEffect(() => {
    setSearch(premiumAmlWatchlistsCheck === AmlValidationTypes.Search);
    setSearchMonitoring(premiumAmlWatchlistsCheck === AmlValidationTypes.SearchMonitoring);
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
              onChange={handleChange(AmlValidationTypes.Search)}
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
              onChange={handleChange(AmlValidationTypes.SearchMonitoring)}
              className={classes.switcher}
            />
          </Box>
        </Box>
      </BoxBordered>
    </Box>
  );
}
