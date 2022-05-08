import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import dayjs from 'dayjs';
import React from 'react';
import { useIntl } from 'react-intl';
import { DateFormat } from 'lib/date';
import { backgroundCheckDisplayOptions, IBackgroundCheckStepData, BackgroundCheckStatusesTypes, ICrawler } from 'models/BackgroundCheck.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { IStep } from 'models/Step.model';
import { useStyles } from './BackgroundCheckSummary.styles';
import { BackgroundCheckListItem } from '../BackgroundCheckListItem/BackgroundCheckListItem';

export function BackgroundCheckSummary({ step }: {
  step: IStep<IBackgroundCheckStepData>;
}) {
  const intl = useIntl();
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
    <Grid container item direction="row">
      <Grid item className={classes.summary}>
        {items.map(([key, value]: [string, string]) => {
          if (hiddenFields[key]?.hidden) {
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
      {(step.id === VerificationPatternTypes.BackgroundBrazilianChecks) && (
        <Grid item>
          <Grid container direction="row">
            <Grid item className={classes.scoreValueContainer}>
              <Typography variant="body1" className={classnames(classes.scoreValue, classes[BackgroundCheckStatusesTypes.Approved])}>
                {score[BackgroundCheckStatusesTypes.Approved]}
              </Typography>
              <Typography variant="body1" className={classes.label}>
                {intl.formatMessage({ id: 'BackgroundCheck.verification.summary.noMatch' })}
              </Typography>
            </Grid>
            <Grid item className={classes.scoreValueContainer}>
              <Typography variant="body1" className={classnames(classes.scoreValue, classes[BackgroundCheckStatusesTypes.LowRisk])}>
                {score[BackgroundCheckStatusesTypes.LowRisk]}
              </Typography>
              <Typography variant="body1" className={classes.label}>
                {intl.formatMessage({ id: 'BackgroundCheck.verification.summary.lowRisk' })}
              </Typography>
            </Grid>
            <Grid item className={classes.scoreValueContainer}>
              <Typography variant="body1" className={classnames(classes.scoreValue, classes[BackgroundCheckStatusesTypes.HighRisk])}>
                {score[BackgroundCheckStatusesTypes.HighRisk]}
              </Typography>
              <Typography variant="body1" className={classes.label}>
                {intl.formatMessage({ id: 'BackgroundCheck.verification.summary.highRisk' })}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="body1" className={classnames(classes.statusValue, classes[step.data.status])}>
              {intl.formatMessage({ id: `BackgroundCheck.verification.summary.status.${step.data.status}` })}
            </Typography>
            <Typography variant="body1" className={classes.label}>
              {intl.formatMessage({ id: 'BackgroundCheck.verification.summary.status' })}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
