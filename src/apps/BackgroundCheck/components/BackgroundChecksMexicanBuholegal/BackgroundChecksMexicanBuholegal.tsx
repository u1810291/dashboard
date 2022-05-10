import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { appPalette } from 'apps/theme';
import { AlertTypes } from 'apps/ui/models/Alert.model';
import { useFormatMessage } from 'apps/intl';
import { selectVerification } from 'apps/Verification';
import { Alert, Warning, WarningTypes } from 'apps/ui';
import dayjs from 'dayjs';
import classnames from 'classnames';
import { DateFormat } from 'lib/date';
import { getPostResultPhase, IdentityStatuses, VerificationStatusChangeReason } from 'models/Status.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { IStep, StepCodeStatus } from 'models/Step.model';
import { backgroundCheckDisplayOptions, backgroundCheckVerificationShieldIconsMap, IBackgroundCheckStepData, BackgroundCheckStatusesTypes } from 'models/BackgroundCheck.model';
import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactJsonViewer from 'react-json-view';
import { useStyles } from './BackgroundChecksMexicanBuholegal.styles';
import { BackgroundCheckListItem } from '../BackgroundCheckListItem/BackgroundCheckListItem';
import { backgroundCheckManualRun } from '../../state/BackgroundCheck.actions';

export function BackgroundChecksMexicanBuholegal({ step }: { step: IStep<IBackgroundCheckStepData> }) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const dispatch = useDispatch();
  const verification = useSelector(selectVerification);

  const { value: verificationStatus, reasonCode } = verification.verificationStatusDetails;
  const isPostResultPhase = useMemo(() => getPostResultPhase(verificationStatus), [verificationStatus]);
  const isVerifiedBySystem = verificationStatus === IdentityStatuses.verified && reasonCode !== VerificationStatusChangeReason.ManualChange;

  const isShowManualBackgroundCheckButton: boolean = useMemo(() => !step.data && isPostResultPhase && !isVerifiedBySystem && !step.startedManuallyAt,
    [step, isPostResultPhase, isVerifiedBySystem]);
  const isCheckInProgress: boolean = [StepCodeStatus.Pending, StepCodeStatus.Running].includes(step.status) && !isShowManualBackgroundCheckButton;

  const handleBackgroundCheckManualRun = useCallback(
    () => {
      dispatch(backgroundCheckManualRun(verification._id, VerificationPatternTypes.BackgroundMexicanBuholegal, step.id));
    },
    [dispatch, verification, step],
  );

  if (isShowManualBackgroundCheckButton) {
    return (
      <Box className={classes.manualButtonWrap}>
        <Typography variant="h2" gutterBottom className={classnames(classes.reportTitle, classes.colorGrey)}>
          {formatMessage('BackgroundCheck.report.title')}
        </Typography>
        <Box mt={2.5} mb={2.3} className={classnames(classes.reportSubTitle, classes.colorGrey)}>
          {formatMessage('BackgroundCheck.report.subTitle')}
        </Box>
        <Button
          color="primary"
          variant="contained"
          onClick={handleBackgroundCheckManualRun}
          size="large"
          className={classes.ultraLargeButton}
        >
          {formatMessage('BackgroundCheck.requestBackgroundCheckReport')}
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
          label={formatMessage(`BackgroundCheck.warning.${messageType}`)}
          filled
          isLabelColored
        />
      </Box>
    );
  }

  if (step.error && !step.data) {
    return (
      <Box mt={2} className={classes.manualButtonWrap}>
        <Box className={classes.labelError}>
          <Alert
            title={formatMessage(`BackgroundCheck.check.${step.error.code}.message`, {
              defaultMessage: 'SecurityCheckStep.system.internalError.message',
            })}
          />
        </Box>
      </Box>
    );
  }

  const fields = Object.entries(step.data);
  const hiddenFields = backgroundCheckDisplayOptions[step.id] ?? {};

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="subtitle2" className={classnames(classes.colorGrey, classes.marginBottom20)}>
          {formatMessage('BackgroundCheck.verification.summary')}
        </Typography>
        <Grid container spacing={3}>
          <Grid item className={classes.shieldIconWrap} xs={4}>
            {backgroundCheckVerificationShieldIconsMap[step.data.status]}
          </Grid>
          <Grid container item xs={8} direction="column">
            <Grid item className={classes.summaryList}>
              {fields.map(([key, value]: [string, string]) => {
                if (backgroundCheckDisplayOptions[step.id]?.[key]?.hidden) {
                  return null;
                }
                const label = formatMessage(`identity.field.${key}`);
                return (key === 'dateOfBirth') ? <BackgroundCheckListItem key={key} label={label} value={dayjs(value).format(DateFormat.FullMonthDateAndFullYear)} /> : <BackgroundCheckListItem key={key} label={label} value={value} />;
              })}
            </Grid>
            <Grid item>
              {step.error && (
                <Alert
                  title={formatMessage(`BackgroundCheck.check.${step.error.code}.message`, {
                    defaultMessage: formatMessage('SecurityCheckStep.system.internalError.message'),
                  })}
                  type={AlertTypes.TransparentError}
                />
              )}
              {step.data.status === BackgroundCheckStatusesTypes.Accepted && (
                <Alert
                  title={formatMessage('BackgroundCheck.verification.status.accepted')}
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
            {formatMessage('BackgroundCheck.verification.checkDetails')}
          </Typography>
          <Grid container item className={classes.downloadButtonsBox}>
            <Button
              className={classes.colorGrey}
              href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(step.data))}`}
              download="background_check.json"
            >
              {formatMessage('BackgroundCheck.verification.downloadJson')}
            </Button>
          </Grid>
        </Grid>
        <ReactJsonViewer
          src={step.data}
          collapsed
          displayDataTypes={false}
          displayObjectSize={false}
          enableClipboard={false}
        />
      </Grid>
    </Grid>
  );
}
