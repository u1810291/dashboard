import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAgentNotesConfig } from 'models/Merchant.model';
import { selectMerchantAgentNotesConfig, selectMerchantPasswordExpirationPolicy } from 'state/merchant/merchant.selectors';
import { merchantUpdateAgentNotesConfig } from 'state/merchant/merchant.actions';
import { Switch, notification } from 'apps/ui';
import { useOverlay } from 'apps/overlay';
import { useFormatMessage } from 'apps/intl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router-dom';
import { Routes } from 'models/Router.model';
import { PasswordExpirationPolicyDurationValue } from 'models/Settings.model';
import { ExpiryModal } from '../ExpiryModal/ExpiryModal';
import { updatePasswordExpiration } from '../../state/Settings.actions';
import { useStyles } from './AccountPolicySettings.styles';
import { NotesDialog } from './NotesDialog';

export function AccountPolicySettings() {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const dispatch = useDispatch();
  const agentNotesConfig = useSelector<any, IAgentNotesConfig>(selectMerchantAgentNotesConfig);
  const passwordExpirationPolicy = useSelector<any, PasswordExpirationPolicyDurationValue>(selectMerchantPasswordExpirationPolicy);
  const [createOverlay, closeOverlay] = useOverlay();
  const history = useHistory();
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

  const handleVerificationNotesChange = useCallback((checked: boolean, callback: () => void) => {
    if (checked) {
      createOverlay(<NotesDialog onSubmit={handleVerificationNotesEnable(callback)} onReject={closeOverlay} />);
      return;
    }

    handleVerificationNotesDisable();
  }, [handleVerificationNotesEnable, handleVerificationNotesDisable, createOverlay, closeOverlay]);

  const handleChangeExpirePeriod = (period) => {
    try {
      if (period === 'null') {
        dispatch(updatePasswordExpiration(null));
      } else {
        dispatch(updatePasswordExpiration(period));
      }
      closeOverlay();
    } catch (error) {
      notification.error(formatMessage('Error.common'));
    }
  };

  const handleExpirePeriodSelect = (event) => {
    history.push(Routes.settings.root, { dontShowModal: true });
    createOverlay(<ExpiryModal action={handleChangeExpirePeriod} closeOverlay={closeOverlay} expirationDuration={event.target.value} />);
  };

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
        <Box mt={2}>
          <Typography variant="h3" className={classes.title}>
            {formatMessage('settings.passwordExpiry.title')}
          </Typography>
        </Box>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={4}>
            <Typography variant="body1" className={classes.description}>
              {formatMessage('settings.passwordExpiry.subtitle')}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Select
              value={passwordExpirationPolicy || PasswordExpirationPolicyDurationValue.Never}
              onChange={handleExpirePeriodSelect}
              placeholder={formatMessage('settings.passwordExpiry.placeholder')}
              className={classes.input}
              variant="outlined"
            >
              <MenuItem value="" disabled hidden>{formatMessage('settings.passwordExpiry.placeholder')}</MenuItem>
              <MenuItem value={PasswordExpirationPolicyDurationValue.Never}>{formatMessage('PasswordExpirationPolicyDuration.Never')}</MenuItem>
              <MenuItem value={PasswordExpirationPolicyDurationValue.For30Days}>{formatMessage('PasswordExpirationPolicyDuration.For30Days')}</MenuItem>
              <MenuItem value={PasswordExpirationPolicyDurationValue.For60Days}>{formatMessage('PasswordExpirationPolicyDuration.For60Days')}</MenuItem>
              <MenuItem value={PasswordExpirationPolicyDurationValue.For90Days}>{formatMessage('PasswordExpirationPolicyDuration.For90Days')}</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
