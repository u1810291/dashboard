import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@material-ui/core';
import { checkInterval, toIsoPeriod } from 'lib/date';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { configurationFlowUpdate } from 'state/merchant/merchant.actions';
import { selectPolicyInterval } from 'state/merchant/merchant.selectors';

const DAYS_RANGE = {
  from: 1,
  to: 300,
};

export function GdprPopup({ openDialog, handleCloseDialog }) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const policyInterval = useSelector(selectPolicyInterval);
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
        configurationFlowUpdate({ policyInterval: toIsoPeriod(period) }),
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
