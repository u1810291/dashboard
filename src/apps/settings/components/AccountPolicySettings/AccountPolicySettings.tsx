import { Grid, Typography, Paper, Box, FormControlLabel } from '@material-ui/core';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAgentNotesConfig } from 'models/Merchant.model';
import { selectMerchantAgentNotesConfig } from 'state/merchant/merchant.selectors';
import { merchantUpdateAgentNotesConfig } from 'state/merchant/merchant.actions';
import { Switch, notification } from 'apps/ui';
import { useOverlay } from 'apps/overlay';
import { useFormatMessage } from 'apps/intl';
import { useStyles } from './AccountPolicySettings.styles';
import { NotesDialog } from './NotesDialog';

export function AccountPolicySettings() {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const dispatch = useDispatch();
  const agentNotesConfig = useSelector<any, IAgentNotesConfig>(selectMerchantAgentNotesConfig);
  const [createOverlay, closeOverlay] = useOverlay();

  const isAgentNotesRequired = useMemo<boolean>(() => agentNotesConfig?.requiredOnChangeVerificationStatus || false, [agentNotesConfig]);

  const handleVerificationNotesEnable = useCallback((callback: () => void) => () => {
    callback();
    dispatch(merchantUpdateAgentNotesConfig({ requiredOnChangeVerificationStatus: true }));
    notification.success(formatMessage('Settings.accountPolicySettings.notesEnabled'));
    closeOverlay();
  }, [dispatch, closeOverlay, formatMessage]);

  const handleVerificationNotesDisable = useCallback(() => {
    dispatch(merchantUpdateAgentNotesConfig({ requiredOnChangeVerificationStatus: false }));
    notification.success(formatMessage('Settings.accountPolicySettings.notesDisabled'));
  }, [dispatch, formatMessage]);

  const handleVerificationNotesChange = useCallback((checked, callback) => {
    if (checked) {
      createOverlay(<NotesDialog onSubmit={handleVerificationNotesEnable(callback)} onReject={closeOverlay} />);
      return;
    }

    handleVerificationNotesDisable();
  }, [handleVerificationNotesEnable, handleVerificationNotesDisable, createOverlay, closeOverlay]);

  return (
    <Paper className={classes.wrapper}>
      <Box p={2}>
        <Box mb={2}>
          <Typography variant="h3" className={classes.description}>
            {formatMessage('Settings.accountPolicySettings.accountPolicies')}
          </Typography>
        </Box>
        <Grid container alignItems="flex-end" justifyContent="space-between" className={classes.wrapper}>
          <Grid item xs={12} md={8}>
            <Typography variant="body1" className={classes.title}>
              {formatMessage('Settings.accountPolicySettings.notesTitle')}
            </Typography>
            <Typography variant="body1" className={classes.description}>
              {formatMessage('Settings.accountPolicySettings.notesDescription')}
            </Typography>
            <Box flexShrink={0}>
              <FormControlLabel
                control={(
                  <Switch checked={isAgentNotesRequired} onSwitch={handleVerificationNotesChange} />
                )}
                label={formatMessage(`Settings.accountPolicySettings.switch.${isAgentNotesRequired ? 'required' : 'disabled'}`)}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
