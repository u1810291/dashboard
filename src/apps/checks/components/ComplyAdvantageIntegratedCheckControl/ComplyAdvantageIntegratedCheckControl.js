import { Switch, Box } from '@material-ui/core';
import { FiSearch } from 'react-icons/fi';
import { VerificationStepTypes } from 'models/Identity.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { BoxBordered, notification } from 'apps/ui';
import { useDispatch, useSelector } from 'react-redux';
import { configurationFlowUpdate } from 'state/merchant/merchant.actions';
import { selectComplyAdvantageIntegratedCheck } from 'state/merchant/merchant.selectors';
import { useStyles, TitleIcon } from './ComplyAdvantageIntegratedCheckControl.styles';

export function ComplyAdvantageIntegratedCheckControl() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const complyAdvantageIntegratedCheck = useSelector(selectComplyAdvantageIntegratedCheck);
  const [state, setState] = useState(false);

  const handleChangeSearchOnly = useCallback(async (event) => {
    const isChecked = event.target.checked;
    try {
      await dispatch(configurationFlowUpdate({
        verificationPatterns: {
          [VerificationStepTypes.ComplyAdvantageValidation]: isChecked,
        },
      }));
      setState(isChecked);
    } catch (e) {
      console.error('error', e.message);
      notification.error(intl.formatMessage({ id: 'update.field.error' }, { name: intl.formatMessage({ id: 'Product.checks.complyAdvantageIntegratedCheck.title' }) }));
    }
  }, [dispatch, intl]);

  useEffect(() => {
    setState(complyAdvantageIntegratedCheck);
  }, [complyAdvantageIntegratedCheck]);

  return (
    <Box my={2} mx={1}>
      <BoxBordered px={-1} className={classes.paper}>
        <Box className={classes.container}>
          <Box className={classes.header}>
            <Box className={classes.icon}>
              <TitleIcon icon={FiSearch} />
            </Box>
            <Box className={classes.titleText}>
              {intl.formatMessage({ id: 'Product.checks.complyAdvantageIntegratedCheck.search.title' })}
            </Box>
          </Box>
          <Box ml={2.5} className={classes.body}>
            <Box className={classes.text}>
              {intl.formatMessage({ id: 'Product.checks.complyAdvantageIntegratedCheck.search.text' })}
            </Box>
            <Switch
              name="complyAdvantageIntegratedCheck"
              color="primary"
              size="small"
              checked={state}
              onChange={handleChangeSearchOnly}
              className={classes.switcher}
            />
          </Box>
        </Box>
      </BoxBordered>
    </Box>
  );
}
