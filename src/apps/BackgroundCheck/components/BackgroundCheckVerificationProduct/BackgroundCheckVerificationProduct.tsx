import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import classnames from 'classnames';
import { Alert, Warning, WarningTypes } from 'apps/ui';
import ReactJsonViewer from 'react-json-view';
import dayjs from 'dayjs';
import { DateFormat } from 'lib/date';
import { Grid, Box, Typography, Button } from '@material-ui/core';
import { getPostResultPhase, IdentityStatuses, VerificationStatusChangeReason } from 'models/Status.model';
import { selectVerification, selectVerificationStepsExtra } from 'apps/Verification';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { IStep, StepCodeStatus } from 'models/Step.model';
import { AlertTypes } from 'apps/ui/models/Alert.model';
import { appPalette } from 'apps/theme';
import { backgroundCheckDisplayOptions, backgroundCheckVerificationShieldIconsMap, BackgroundCheckStepData, BackgroundCheckStatuses } from 'models/BackgroundCheck.model';
import { backgroundCheckManualRun } from '../../state/BackgroundCheck.actions';
import { useStyles } from './BackgroundCheckVerificationProduct.styles';
import { BackgroundCheckListItem } from '../BackgroundCheckListItem/BackgroundCheckListItem';

export function BackgroundCheckVerificationProduct() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const verification = useSelector(selectVerification);
  const verificationStepsExtra = useSelector(selectVerificationStepsExtra);

  const backgroundStep: IStep<BackgroundCheckStepData> = useMemo(() => (
    verificationStepsExtra.find((step) => step.id === VerificationPatternTypes.BackgroundMexicanBuholegal)
  ), [verificationStepsExtra]);

  const { value: verificationStatus, reasonCode } = verification.verificationStatusDetails;
  const isPostResultPhase = useMemo(() => getPostResultPhase(verificationStatus), [verificationStatus]);
  const isVerifiedBySystem = verificationStatus === IdentityStatuses.verified && reasonCode !== VerificationStatusChangeReason.ManualChange;

  const isShowManualBackgroundCheckButton: boolean = useMemo(() => !backgroundStep.data && isPostResultPhase && !isVerifiedBySystem && !backgroundStep?.startedManuallyAt,
    [backgroundStep, isPostResultPhase, isVerifiedBySystem]);
  const isCheckInProgress: boolean = [StepCodeStatus.Pending, StepCodeStatus.Running].includes(backgroundStep.status) && !isShowManualBackgroundCheckButton;

  const handleBackgroundCheckManualRun = useCallback(
    () => {
      dispatch(backgroundCheckManualRun(verification._id, VerificationPatternTypes.BackgroundMexicanBuholegal, backgroundStep.id));
    },
    [dispatch, verification, backgroundStep],
  );

  console.log('backgroundStep', backgroundStep);

  if (isShowManualBackgroundCheckButton) {
    return (
      <Box className={classes.manualButtonWrap}>
        <Typography variant="h2" gutterBottom className={classnames(classes.reportTitle, classes.colorGrey)}>
          {intl.formatMessage({ id: 'BackgroundCheck.report.title' })}
        </Typography>
        <Box mt={2.5} mb={2.3} className={classnames(classes.reportSubTitle, classes.colorGrey)}>
          {intl.formatMessage({ id: 'BackgroundCheck.report.subTitle' })}
        </Box>
        <Button
          color="primary"
          variant="contained"
          onClick={handleBackgroundCheckManualRun}
          size="large"
          className={classes.ultraLargeButton}
        >
          {intl.formatMessage({ id: 'BackgroundCheck.requestBackgroundCheckReport' })}
        </Button>
      </Box>
    );
  }

  if (isCheckInProgress) {
    const messageType = isPostResultPhase ? 'running' : 'waiting';
    return (
      <Box mt={2} className={classes.manualButtonWrap}>
        <Warning
          type={WarningTypes.Notify}
          label={intl.formatMessage({ id: `BackgroundCheck.warning.${messageType}` })}
          filled
          isLabelColored
        />
      </Box>
    );
  }

  if (backgroundStep.error && !backgroundStep.data) {
    return (
      <Box mt={2} className={classes.manualButtonWrap}>
        <Box className={classes.labelError}>
          <Alert
            title={intl.formatMessage({
              id: `BackgroundCheck.check.${backgroundStep.error.code}.message`,
              defaultMessage: intl.formatMessage({ id: 'SecurityCheckStep.system.internalError.message' }),
            })}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="subtitle2" className={classnames(classes.colorGrey, classes.marginBottom20)}>
          {intl.formatMessage({ id: 'BackgroundCheck.verification.summary' })}
        </Typography>
        <Grid container spacing={3}>
          <Grid item className={classes.shieldIconWrap} xs={4}>
            {backgroundCheckVerificationShieldIconsMap[backgroundStep.data.status]}
          </Grid>
          <Grid container item xs={8} direction="column">
            <Grid item className={classes.summaryList}>
              {Object.entries(backgroundStep.data).map(([key, value]: [string, string]) => {
                if (backgroundCheckDisplayOptions[backgroundStep.id]?.[key]?.hidden) {
                  return null;
                }

                const label = intl.formatMessage({ id: `identity.field.${key}` });

                if (key === 'dateOfBirth') {
                  return <BackgroundCheckListItem key={key} label={label} value={dayjs(value).format(DateFormat.FullMonthDateAndFullYear)} />;
                }

                return (
                  <BackgroundCheckListItem key={key} label={label} value={value} />
                );
              })}
            </Grid>
            <Grid item>
              {backgroundStep.error && (
                <Alert
                  title={intl.formatMessage({
                    id: `BackgroundCheck.check.${backgroundStep.error.code}.message`,
                    defaultMessage: intl.formatMessage({ id: 'SecurityCheckStep.system.internalError.message' }),
                  })}
                  type={AlertTypes.TransparentError}
                />
              )}
              {backgroundStep.data.status === BackgroundCheckStatuses.Accepted && (
                <Alert
                  title={intl.formatMessage({ id: 'BackgroundCheck.verification.status.accepted' })}
                  type={AlertTypes.TransparentError}
                  textColor={appPalette.black75}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.marginBottom10} justify="space-between" alignItems="center">
          <Typography variant="subtitle2" className={classes.colorGrey}>
            {intl.formatMessage({ id: 'BackgroundCheck.verification.checkDetails' })}
          </Typography>
          <Grid container item className={classes.downloadButtonsBox}>
            <Button
              className={classes.colorGrey}
              href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(backgroundStep.data))}`}
              download="background_check.json"
            >
              {intl.formatMessage({ id: 'BackgroundCheck.verification.downloadJson' })}
            </Button>
          </Grid>
        </Grid>
        <ReactJsonViewer
          src={backgroundStep.data}
          collapsed
          displayDataTypes={false}
          displayObjectSize={false}
          enableClipboard={false}
        />
      </Grid>
    </Grid>
  );
}
