import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormatMessage } from 'apps/intl';
import classnames from 'classnames';
import { Alert, Warning, WarningTypes } from 'apps/ui';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import { getPostResultPhase, IdentityStatuses, VerificationStatusChangeReason } from 'models/Status.model';
import { selectVerification, selectVerificationStepsExtra } from 'apps/Verification';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { IStep, StepCodeStatus } from 'models/Step.model';
import ReactJsonViewer from 'react-json-view';
import { backgroundCheckVerificationShieldIconsMap, IBackgroundCheckStepData } from 'models/BackgroundCheck.model';
import { BackgroundCheckSummary } from '../BackgroundCheckSummary/BackgroundCheckSummary';
import { backgroundCheckManualRun } from '../../state/BackgroundCheck.actions';
import { useStyles } from './BackgroundCheckVerificationProduct.styles';
import { BackgroundJsonViewer } from '../BackgroundJsonViewer/BackgroundJsonViewer';

export function BackgroundCheckVerificationProduct() {
  const formatMessage = useFormatMessage();
  const [showJSON, setShowJSON] = useState<boolean>(true);

  const classes = useStyles();
  const dispatch = useDispatch();
  const verification = useSelector(selectVerification);
  const verificationStepsExtra = useSelector(selectVerificationStepsExtra);

  const backgroundStep: IStep<IBackgroundCheckStepData> = useMemo(() => (
    verificationStepsExtra.find((step) => (step.id === VerificationPatternTypes.BackgroundMexicanBuholegal || step.id === VerificationPatternTypes.BackgroundBrazilianChecks))
  ), [verificationStepsExtra]);

  const showJSONDisabled = useMemo(() => backgroundStep?.data?.stepExtra?.reduce((previous, current) => Math.max(previous, current.length), 0) === 0, [backgroundStep]);

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

  useEffect(() => {
    setShowJSON(backgroundStep?.data?.stepExtra?.reduce((previous, current) => Math.max(previous, current.length), 0) !== 0);
  }, [backgroundStep]);

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

  if (backgroundStep.error && !backgroundStep.data) {
    return (
      <Box mt={2} className={classes.manualButtonWrap}>
        <Box className={classes.labelError}>
          <Alert
            title={
              formatMessage(`BackgroundCheck.check.${backgroundStep.error.code}.message`,
                { defaultMessage: 'SecurityCheckStep.system.internalError.message' })
            }
          />
        </Box>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item className={classes.summaryContianer}>
        <Typography variant="subtitle2" className={classnames(classes.colorGrey, classes.marginBottom20)}>
          {formatMessage('BackgroundCheck.verification.summary')}
        </Typography>
        <Grid container spacing={3}>
          <Grid item className={classes.shieldIconWrap} xs={4}>
            {backgroundCheckVerificationShieldIconsMap[backgroundStep.data.status]}
          </Grid>
          <Grid item xs={8}>
            <BackgroundCheckSummary step={backgroundStep} />
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
              href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(backgroundStep.data))}`}
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
        {showJSON && !backgroundStep?.data?.stepExtra?.length ? (
          <ReactJsonViewer
            src={backgroundStep}
            collapsed
            displayDataTypes={false}
            displayObjectSize={false}
            enableClipboard={false}
          />
        ) : <BackgroundJsonViewer data={backgroundStep?.data?.stepExtra} />}
      </Grid>
    </Grid>
  );
}
