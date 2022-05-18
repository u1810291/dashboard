import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import { useFormatMessage } from 'apps/intl';
import { Alert, Warning, WarningTypes } from 'apps/ui';
import { selectVerification } from 'apps/Verification';
import classnames from 'classnames';
import dayjs from 'dayjs';
import { DateFormat } from 'lib/date';
import { getPostResultPhase, IdentityStatuses, VerificationStatusChangeReason } from 'models/Status.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { IStep, StepCodeStatus } from 'models/Step.model';
import { BackgroundCheckStatusesTypes, ICrawler, backgroundCheckDisplayOptions, backgroundCheckVerificationShieldIconsMap, IBackgroundCheckStepData } from 'models/BackgroundCheck.model';
import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactJsonViewer from 'react-json-view';
import { useStyles } from './BackgroundChecksBrazilianChecks.styles';
import { BackgroundJsonViewer } from '../BackgroundJsonViewer/BackgroundJsonViewer';
import { BackgroundCheckListItem } from '../BackgroundCheckListItem/BackgroundCheckListItem';
import { backgroundCheckManualRun } from '../../state/BackgroundCheck.actions';

export function BackgroundChecksBrazilianChecks({ step }: { step: IStep<IBackgroundCheckStepData> }) {
  const formatMessage = useFormatMessage();
  const [showJSON, setShowJSON] = useState<boolean>(true);

  const classes = useStyles();
  const dispatch = useDispatch();
  const verification = useSelector(selectVerification);

  const showJSONDisabled = useMemo(() => step.data?.stepExtra?.reduce((previous, current) => Math.max(previous, current.length), 0) === 0, [step]);

  const { value: verificationStatus, reasonCode } = verification.verificationStatusDetails;
  const isPostResultPhase = useMemo(() => getPostResultPhase(verificationStatus), [verificationStatus]);
  const isVerifiedBySystem = verificationStatus === IdentityStatuses.verified && reasonCode !== VerificationStatusChangeReason.ManualChange;

  const isShowManualBackgroundCheckButton: boolean = useMemo(() => !step.data && isPostResultPhase && !isVerifiedBySystem && !step.startedManuallyAt,
    [step, isPostResultPhase, isVerifiedBySystem]);
  const isCheckInProgress: boolean = [StepCodeStatus.Pending, StepCodeStatus.Running].includes(step.status) && !isShowManualBackgroundCheckButton;

  const handleBackgroundCheckManualRun = useCallback(
    () => {
      dispatch(backgroundCheckManualRun(verification._id, VerificationPatternTypes.BackgroundBrazilianChecks, step.id));
    },
    [dispatch, verification, step],
  );

  useEffect(() => {
    setShowJSON(step.data?.stepExtra?.reduce((previous, current) => Math.max(previous, current.length), 0) !== 0);
  }, [step]);

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
              defaultMessage: formatMessage('SecurityCheckStep.system.internalError.message'),
            })}
          />
        </Box>
      </Box>
    );
  }

  const items = Object.entries(step.data);
  const hiddenFields = backgroundCheckDisplayOptions[step.id] ?? {};
  const score = (step.id === VerificationPatternTypes.BackgroundBrazilianChecks) ? step.data.results.reduce((results, crawler: ICrawler) => ({
    ...results,
    [crawler.status]: (results[crawler.status] ?? 0) + 1,
  }), {
    [BackgroundCheckStatusesTypes.Approved]: 0,
    [BackgroundCheckStatusesTypes.LowRisk]: 0,
    [BackgroundCheckStatusesTypes.HighRisk]: 0,
  }) : null;

  return (
    <Grid container spacing={2}>
      <Grid item className={classes.summaryContianer}>
        <Typography variant="subtitle2" className={classnames(classes.colorGrey, classes.marginBottom20)}>
          {formatMessage('BackgroundCheck.verification.summary')}
        </Typography>
        <Grid container spacing={3}>
          <Grid item className={classes.shieldIconWrap} xs={4}>
            {backgroundCheckVerificationShieldIconsMap[step.data.status]}
          </Grid>
          <Grid item xs={8}>
            <Grid item container spacing={2} xs={12}>
              <Grid item xs={6}>
                <Paper className={classes.summary}>
                  <Box p={2}>
                    {items.map(([key, value]: [string, string]) => {
                      if (hiddenFields[key]?.hidden) return null;
                      const label = formatMessage(`identity.field.${key}`);
                      return key === 'dateOfBirth' ? (
                        <BackgroundCheckListItem key={key} label={label} value={dayjs(value).format(DateFormat.FullMonthDateAndFullYear)} />
                      ) : (
                        <BackgroundCheckListItem key={key} label={label} value={value} />
                      );
                    })}
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  {(step.id === VerificationPatternTypes.BackgroundBrazilianChecks) && (
                    <Box p={2}>
                      <Grid container direction="row">
                        <Grid item className={classes.scoreValueContainer}>
                          <Typography variant="body1" className={classnames(classes.scoreValue, classes[BackgroundCheckStatusesTypes.Approved])}>
                            {score[BackgroundCheckStatusesTypes.Approved]}
                          </Typography>
                          <Typography variant="body1" className={classes.label}>
                            {formatMessage('BackgroundCheck.verification.summary.noMatch')}
                          </Typography>
                        </Grid>
                        <Grid item className={classes.scoreValueContainer}>
                          <Typography variant="body1" className={classnames(classes.scoreValue, classes[BackgroundCheckStatusesTypes.LowRisk])}>
                            {score[BackgroundCheckStatusesTypes.LowRisk]}
                          </Typography>
                          <Typography variant="body1" className={classes.label}>
                            {formatMessage('BackgroundCheck.verification.summary.lowRisk')}
                          </Typography>
                        </Grid>
                        <Grid item className={classes.scoreValueContainer}>
                          <Typography variant="body1" className={classnames(classes.scoreValue, classes[BackgroundCheckStatusesTypes.HighRisk])}>
                            {score[BackgroundCheckStatusesTypes.HighRisk]}
                          </Typography>
                          <Typography variant="body1" className={classes.label}>
                            {formatMessage('BackgroundCheck.verification.summary.highRisk')}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" className={classnames(classes.statusValue, classes[step.data.status])}>
                          {formatMessage(`BackgroundCheck.verification.summary.status.${step.data.status}`)}
                        </Typography>
                        <Typography variant="body1" className={classes.label}>
                          {formatMessage('BackgroundCheck.verification.summary.status')}
                        </Typography>
                      </Grid>
                    </Box>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12}>
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
            <div className={classes.colorGrey}>
              <span className={classes.checkboxLabel}>
                {formatMessage('BackgroundCheck.verification.downloadJson.checkbox')}
              </span>
              <Switch
                checked={showJSON}
                color="primary"
                disabled={showJSONDisabled}
                onChange={() => setShowJSON((value: boolean) => !value)}
              />
            </div>
          </Grid>
        </Grid>
        {showJSON && !step.data?.stepExtra?.length ? (
          <ReactJsonViewer
            src={step}
            collapsed
            displayDataTypes={false}
            displayObjectSize={false}
            enableClipboard={false}
          />
        ) : <BackgroundJsonViewer data={step.data?.stepExtra} />}
      </Grid>
    </Grid>
  );
}
