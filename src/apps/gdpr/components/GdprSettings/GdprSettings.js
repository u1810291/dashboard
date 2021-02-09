import { Box, FormControl, FormControlLabel, Switch, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { merchantUpdateFlow } from 'state/merchant/merchant.actions';
import { selectPolicyInterval } from 'state/merchant/merchant.selectors';
import { GdprDropdown } from '../GdprDropdown/GdprDropdown';
import { GdprPopup } from '../GdprPopup/GdprPopup';

export function GdprSettings() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const policyInterval = useSelector(selectPolicyInterval);
  const [enabled, setEnabled] = useState(false);

  function handleClickOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  async function handleSwitcher(e) {
    const isChecked = e.target.checked;
    if (isChecked && !policyInterval) {
      handleClickOpenDialog();
    }
    if (!isChecked) {
      await dispatch(merchantUpdateFlow({ policyInterval: null }));
    }
  }

  useEffect(() => {
    setEnabled(!!policyInterval);
  }, [policyInterval, enabled]);

  return (
    <FormControl component="fieldset">
      <GdprPopup
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
      />
      <Typography variant="h5">
        {intl.formatMessage({ id: 'Product.configuration.gdpr.title' })}
      </Typography>
      <Box mt={2}>
        {intl.formatMessage({ id: 'Product.configuration.gdpr.subtitle' })}
      </Box>
      <Box mt={2}>
        <FormControlLabel
          control={(
            <Switch
              checked={enabled}
              onChange={handleSwitcher}
              color="primary"
            />
            )}
          label={intl.formatMessage({ id: 'Product.configuration.gdpr.switchLabel' })}
        />
        {enabled && policyInterval && (
        <GdprDropdown
          policyInterval={policyInterval}
          handleClickOpenDialog={handleClickOpenDialog}
        />
        )}
      </Box>
    </FormControl>
  );
}
