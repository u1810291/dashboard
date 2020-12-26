import { Card, CardContent, Box } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { FiExternalLink } from 'react-icons/fi';
import { StepStatus } from 'models/Step.model';
import Link from '@material-ui/core/Link';
import { useStyles, LinkButton } from './ComplyAdvantageStepDetails.styles';
import { CheckStepDetailsEntry } from '../../../checks/components/CheckStepDetails/CheckStepDetailsEntry';

export function ComplyAdvantageStepDetails({ step }) {
  const intl = useIntl();
  const classes = useStyles();
  return (
    <Card raised={false} className={classes.card}>
      <CardContent>
        <Box>
          {step.error && (
            <Box mb={1} className={step.checkStatus === StepStatus.Failure ? classes.redText : ''}>
              {intl.formatMessage({
                id: step.checkStatus === StepStatus.Failure ? `SecurityCheckStep.${step.error.code}.message` : 'SecurityCheckStep.complyAdvantage.incomplete',
              })}
            </Box>
          )}
          {step.data && (
            <Box>
              <CheckStepDetailsEntry label="nameSearched" value={step.data.nameSearched} />
              <Box className={classes.wrapper}>
                {step.data.dateOfBirth && (
                  <Box className={classes.inline}>
                    <CheckStepDetailsEntry label="dateOfBirth" value={step.data.dateOfBirth} />
                  </Box>
                )}
                <Box className={classes.inline}>
                  <CheckStepDetailsEntry label="matchType" value={intl.formatMessage({ id: `SecurityCheckStep.complyAdvantage.match.${step.data.matchType}` })} />
                </Box>
              </Box>
              <Link href={step.data.profileUrl} underline="none">
                <LinkButton className={classes.button} fullWidth endIcon={<FiExternalLink />}>
                  {intl.formatMessage({ id: 'SecurityCheckStep.complyAdvantage.profileLink' })}
                </LinkButton>
              </Link>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
