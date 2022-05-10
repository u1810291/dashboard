import { appPalette } from 'apps/theme';
import { Alert } from 'apps/ui';
import { AlertTypes } from 'apps/ui/models/Alert.model';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import dayjs from 'dayjs';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { DateFormat } from 'lib/date';
import { useFormatMessage } from 'apps/intl';
import { backgroundCheckDisplayOptions, IBackgroundCheckStepData, BackgroundCheckStatusesTypes, ICrawler } from 'models/BackgroundCheck.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { IStep } from 'models/Step.model';
import { useStyles } from './BackgroundCheckSummary.styles';
import { BackgroundCheckListItem } from '../BackgroundCheckListItem/BackgroundCheckListItem';

export function BackgroundCheckSummary({ step }: {
  step: IStep<IBackgroundCheckStepData>;
}) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
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
    <>
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
      {(step.id === VerificationPatternTypes.BackgroundMexicanBuholegal) && (
        <Grid item>
          {step.error && (
            <Alert
              title={formatMessage(`BackgroundCheck.check.${step.error.code}.message`,
                { defaultMessage: 'SecurityCheckStep.system.internalError.message' })}
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
      )}
    </>
  );
}
