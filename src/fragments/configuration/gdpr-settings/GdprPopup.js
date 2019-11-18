import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import {
  Box,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@material-ui/core';
import { selectPolicyInterval } from 'state/merchant/merchant.selectors';
import { saveConfiguration } from 'state/merchant/merchant.actions';
import { toIsoPeriod, checkInterval } from 'lib/date';

const DAYS_RANGE = {
  from: 1,
  to: 300,
};

export function SetupDialog({ openDialog, handleCloseDialog }) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const policyInterval = useSelector(selectPolicyInterval) || '';
  const [period, setPeriod] = useState(null);

  function handleIntervalChange(e) {
    const value = parseInt(e.target.value, 10) || '';
    if (checkInterval(value, DAYS_RANGE.from, DAYS_RANGE.to) || value === '') {
      setPeriod(value);
    }
  }

  async function submitCloseDialog() {
    if (checkInterval(period, DAYS_RANGE.from, DAYS_RANGE.to)) {
      await dispatch(
        saveConfiguration({ policyInterval: toIsoPeriod(period) }),
      );
      handleCloseDialog();
    }
  }

  useEffect(() => {
    setPeriod(policyInterval);
  }, [policyInterval]);

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="gdpr-dialog-title"
      aria-describedby="gdpr-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {intl.formatMessage({ id: 'Product.configuration.gdpr.popup.title' })}
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {intl.formatMessage({ id: 'Product.configuration.gdpr.popup.subtitle' })}
        </DialogContentText>

        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Box mt={1}>
              {intl.formatMessage({ id: 'Product.configuration.gdpr.popup.dialog.title' })}
            </Box>
          </Grid>
          <Grid item>
            <TextField
              autoFocus
              type="number"
              value={period}
              onChange={handleIntervalChange}
              InputLabelProps={{ shrink: true }}
              helperText={
                `${intl.formatMessage({ id: 'Product.configuration.gdpr.popup.helpMessage' })
                } ${DAYS_RANGE.from} - ${DAYS_RANGE.to}`
              }
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={submitCloseDialog} color="primary">
          {intl.formatMessage({ id: 'Product.configuration.gdpr.popup.dialog.yes' })}
        </Button>
        <Button onClick={handleCloseDialog} color="primary" autoFocus>
          {intl.formatMessage({ id: 'Product.configuration.gdpr.popup.dialog.no' })}
        </Button>
      </DialogActions>

    </Dialog>
  );
}
