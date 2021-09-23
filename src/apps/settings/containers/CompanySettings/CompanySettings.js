import { Button, Grid, Typography, Paper, Box } from '@material-ui/core';
import { passwordChange } from 'apps/auth/state/auth.actions';
import { selectUserEmail } from 'apps/user/state/user.selectors';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { selectMerchantBusinessName, selectMerchantCreatedAt } from 'state/merchant/merchant.selectors';
import { merchantUpdateBusinessName } from 'state/merchant/merchant.actions';
import { formatDate } from 'lib/date';
import { EditableInput } from 'apps/ui';
import { QATags } from 'models/QA.model';
import { useOverlay } from 'apps/overlay';
import { useRole } from 'apps/collaborators';
import { WithAgent } from 'models/Collaborator.model';
import { ChangePasswordModal } from '../../components/ChangePasswordModal/ChangePasswordModal';
import { useStyles } from './CompanySettings.styles';

export function CompanySettings() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const email = useSelector(selectUserEmail);
  const companyName = useSelector(selectMerchantBusinessName);
  const createdAt = useSelector(selectMerchantCreatedAt);
  const role = useRole();
  const [createOverlay, closeOverlay] = useOverlay();

  const handleSubmitPassword = useCallback(async (values, { setFormState }) => {
    const { password, oldPassword } = values;
    try {
      await dispatch(passwordChange({ password, oldPassword }));
      setFormState({});
      closeOverlay();
    } catch (error) {
      setFormState({
        oldPassword: {
          isError: true,
          message: error.response.data.message,
        },
      });
    }
    return false;
  }, [dispatch, closeOverlay]);

  const handleSubmitBusinessName = useCallback(async (name) => {
    await dispatch(merchantUpdateBusinessName(name));
  }, [dispatch]);

  const openChangePasswordModal = useCallback(() => {
    createOverlay(<ChangePasswordModal onSubmit={handleSubmitPassword} />);
  }, [createOverlay, handleSubmitPassword]);

  return (
    <Paper>
      <Box p={2}>
        <Box mb={2}>
          <Typography variant="h3" className={classes.title}>
            {intl.formatMessage({ id: 'Settings.companySettings.company' })}
          </Typography>
        </Box>
        <Grid container alignItems="flex-end" justify="space-between" className={classes.wrapper}>
          <Grid item xs={12} md="auto" className={classes.inputWrapper}>
            <EditableInput
              text={companyName}
              onSubmit={handleSubmitBusinessName}
              isEditingAllow={WithAgent.includes(role)}
            />
            <Typography variant="body1" className={classes.title}>
              {intl.formatMessage({ id: 'Settings.companySettings.name' })}
            </Typography>
          </Grid>
          <Grid item xs={12} md="auto" className={classes.dateWrapper}>
            <Typography variant="body1" className={classes.value}>
              {formatDate(createdAt, 'D MMM, YYYY')}
            </Typography>
            <Typography variant="body1" className={classes.title}>
              {intl.formatMessage({ id: 'Settings.companySettings.registrationDate' })}
            </Typography>
          </Grid>
        </Grid>
        <Box pt={2}>
          <Grid container justify="space-between" alignItems="center" className={classes.emailWrapper}>
            <Grid item xs={12} md="auto">
              <Typography variant="body1" className={classes.value}>
                {email}
              </Typography>
              <Typography variant="body1" className={classes.title}>
                {intl.formatMessage({ id: 'Settings.companySettings.email' })}
              </Typography>
            </Grid>
            {/* <Grid item xs={12} md="auto">
              <Button
                variant="outlined"
                onClick={openChangeEmailModal}
                tabIndex={0}
                className={classes.button}
              >
                {intl.formatMessage({ id: 'Settings.companySettings.changeEmail' })}
              </Button>
            </Grid> */}
          </Grid>
          <Grid container justify="space-between" alignItems="center" className={classes.passwordWrapper}>
            <Grid item xs={12} md="auto">
              <Typography variant="body1" className={classes.title}>
                {intl.formatMessage({ id: 'Settings.companySettings.password' })}
              </Typography>
            </Grid>
            <Grid item xs={12} md="auto">
              <Button
                variant="outlined"
                onClick={openChangePasswordModal}
                tabIndex={0}
                className={classes.button}
                data-qa={QATags.Settings.ChangePassword.Change}
              >
                {intl.formatMessage({ id: 'Settings.companySettings.changePassword' })}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
}
