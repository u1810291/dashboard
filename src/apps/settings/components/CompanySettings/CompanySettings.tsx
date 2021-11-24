import { Button, Grid, Typography, Paper, Box, Link } from '@material-ui/core';
import { selectUserEmail } from 'apps/user/state/user.selectors';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { selectMerchantBusinessName, selectMerchantLegalAddress, selectMerchantLegalName, selectMerchantLegalRegNumber, selectMerchantCreatedAt } from 'state/merchant/merchant.selectors';
import { merchantUpdateBusinessName } from 'state/merchant/merchant.actions';
import { EditableInput, InfoTooltip } from 'apps/ui';
import { DateFormat, formatDate } from 'lib/date';
import { QATags } from 'models/QA.model';
import { useOverlay } from 'apps/overlay';
import { useRole } from 'apps/collaborators';
import { WithAgent } from 'models/Collaborator.model';
import { ChangePasswordModal } from 'apps/auth';
import { useStyles } from './CompanySettings.styles';

export function CompanySettings() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const email = useSelector(selectUserEmail);
  const companyName = useSelector(selectMerchantBusinessName);
  const createdAt = useSelector(selectMerchantCreatedAt);
  const legalName = useSelector(selectMerchantLegalName);
  const legalAddress = useSelector(selectMerchantLegalAddress);
  const legalRegNumber = useSelector(selectMerchantLegalRegNumber);
  const role = useRole();
  const [createOverlay, closeOverlay] = useOverlay();

  const handleSubmitBusinessName = useCallback(async (name) => {
    await dispatch(merchantUpdateBusinessName(name));
  }, [dispatch]);

  const openChangePasswordModal = useCallback(() => {
    createOverlay(<ChangePasswordModal onClose={closeOverlay} />);
  }, [createOverlay, closeOverlay]);

  return (
    <Paper>
      <Box p={2}>
        <Box mb={2}>
          <Typography variant="h3" className={classes.title}>
            {intl.formatMessage({ id: 'Settings.companySettings.company' })}
          </Typography>
        </Box>
        <Grid container alignItems="flex-end" justifyContent="space-between" className={classes.wrapper}>
          <Grid item xs={12} md="auto" className={classes.inputWrapper}>
            <EditableInput
              text={companyName}
              onSubmit={handleSubmitBusinessName}
              isEditingAllow={WithAgent.includes(role)}
            />
            <Typography variant="body1" className={classes.title}>
              {intl.formatMessage({ id: 'Settings.companySettings.name' })}
              <InfoTooltip title={intl.formatMessage({ id: 'Settings.companySettings.tooltip.name' })} />
            </Typography>
          </Grid>
          <Grid item xs={12} md="auto" className={classes.dateWrapper}>
            <Typography variant="body1" className={classes.value}>
              {formatDate(createdAt, DateFormat.DayShortMonthShortWithSpace)}
            </Typography>
            <Typography variant="body1" className={classes.title}>
              {intl.formatMessage({ id: 'Settings.companySettings.registrationDate' })}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="flex-end" justifyContent="space-between" className={classes.wrapperWithPadding}>
          {legalName && (
          <Grid container justify="space-between" alignItems="center" className={classes.fieldWrapper}>
            <Grid item xs={12} md="auto">
              <Typography className={classes.value}>
                {legalName}
              </Typography>
              <Typography variant="body1" className={classes.title}>
                {intl.formatMessage({ id: 'Settings.companySettings.legalName' })}
                <InfoTooltip title={intl.formatMessage({ id: 'Settings.companySettings.tooltip.forPdf' })} />
              </Typography>
            </Grid>
          </Grid>
          )}
          {legalAddress && (
          <Grid container justify="space-between" alignItems="center" className={classes.fieldWrapper}>
            <Grid item xs={12} md="auto">
              <Typography className={classes.value}>
                {legalAddress}
              </Typography>
              <Typography variant="body1" className={classes.title}>
                {intl.formatMessage({ id: 'Settings.companySettings.legalAddress' })}
                <InfoTooltip title={intl.formatMessage({ id: 'Settings.companySettings.tooltip.forPdf' })} />
              </Typography>
            </Grid>
          </Grid>
          )}
          {legalRegNumber && (
          <Grid container justify="space-between" alignItems="center" className={classes.fieldWrapper}>
            <Grid item xs={12} md="auto">
              <Typography className={classes.value}>
                {legalRegNumber}
              </Typography>
              <Typography variant="body1" className={classes.title}>
                {intl.formatMessage({ id: 'Settings.companySettings.legalRegNumber' })}
                <InfoTooltip title={intl.formatMessage({ id: 'Settings.companySettings.tooltip.forPdf' })} />
              </Typography>
            </Grid>
          </Grid>
          )}
          <Grid container justify="space-between" alignItems="center" className={classes.fieldWrapper}>
            <Grid item xs={12} md={5}>
              <Typography variant="body1" className={classes.title}>
                {intl.formatMessage({ id: 'Settings.companySettings.contactSupport' })}
              </Typography>
            </Grid>
            <Grid item xs={12} md="auto">
              <Link href="mailto:support@mati.io">
                <Button
                  variant="outlined"
                  tabIndex={0}
                  className={classes.button}
                  data-qa={QATags.Settings.ContactUs}
                >
                  {intl.formatMessage({ id: 'Settings.companySettings.button.contactSupport' })}
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Box pt={2}>
          <Grid container justify="space-between" alignItems="center" className={classes.fieldWrapper}>
            <Grid item xs={12} md="auto">
              <Typography variant="body1" className={classes.value}>
                {email}
              </Typography>
              <Typography variant="body1" className={classes.title}>
                {intl.formatMessage({ id: 'Settings.companySettings.email' })}
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between" alignItems="center" className={classes.passwordWrapper}>
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
