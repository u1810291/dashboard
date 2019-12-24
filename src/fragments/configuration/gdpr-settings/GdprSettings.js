import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import {
  Box,
  Switch,
  FormControl,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import { Items } from 'components';
import { selectPolicyInterval } from 'state/merchant/merchant.selectors';
import { configurationUpdate } from 'state/merchant/merchant.actions';
import { SetupDialog } from './GdprPopup';
import { DropdownSettings } from './GdprDropdown';

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
      await dispatch(configurationUpdate({ policyInterval: null }));
    }
  }

  useEffect(() => {
    setEnabled(!!policyInterval);
  }, [policyInterval, enabled]);

  return (
    <FormControl component="fieldset">
      <SetupDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
      />
      <Items flow="row">
        <Typography variant="h5">
          {intl.formatMessage({ id: 'Product.configuration.gdpr.title' })}
        </Typography>
        <Box>
          {intl.formatMessage({ id: 'Product.configuration.gdpr.subtitle' })}
        </Box>
        <Box>
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
            <DropdownSettings
              policyInterval={policyInterval}
              handleClickOpenDialog={handleClickOpenDialog}
            />
          )}
        </Box>
      </Items>
    </FormControl>
  );
}
