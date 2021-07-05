import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@material-ui/core';
import { checkInterval, toIsoPeriod } from 'lib/date';
import { GDPRRangeTypes } from 'models/GDPR.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { merchantUpdateFlow } from 'state/merchant/merchant.actions';
import { selectPolicyInterval } from 'state/merchant/merchant.selectors';

export function GdprPopup({ openDialog, handleCloseDialog }: {
  openDialog: boolean;
  handleCloseDialog: () => void;
}) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const policyInterval = useSelector(selectPolicyInterval);
  const [period, setPeriod] = useState(null);

  const handleIntervalChange = useCallback((e) => {
    const value = parseInt(e.target.value, 10) || '';
    if (checkInterval(value, GDPRRangeTypes.From, GDPRRangeTypes.To) || value === '') {
      setPeriod(value);
    }
  }, []);

  const submitCloseDialog = useCallback(async () => {
    if (checkInterval(period, GDPRRangeTypes.From, GDPRRangeTypes.To)) {
      await dispatch(merchantUpdateFlow({ policyInterval: toIsoPeriod(period) }));
      handleCloseDialog();
    }
  }, [dispatch, period, handleCloseDialog]);

  const rejectCloseDialog = useCallback(() => {
    handleCloseDialog();
  }, [handleCloseDialog]);

  useEffect(() => {
    setPeriod(policyInterval);
  }, [policyInterval]);

  return (
    <Dialog
      open={openDialog}
      onClose={rejectCloseDialog}
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
                } ${GDPRRangeTypes.From} - ${GDPRRangeTypes.To}`
              }
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={submitCloseDialog} color="primary">
          {intl.formatMessage({ id: 'Product.configuration.gdpr.popup.dialog.yes' })}
        </Button>
        <Button onClick={rejectCloseDialog} color="primary" autoFocus>
          {intl.formatMessage({ id: 'Product.configuration.gdpr.popup.dialog.no' })}
        </Button>
      </DialogActions>

    </Dialog>
  );
}
