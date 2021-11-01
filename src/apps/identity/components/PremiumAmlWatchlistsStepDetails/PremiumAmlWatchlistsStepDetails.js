import { Card, CardContent, Box } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { FiExternalLink, FiActivity, FiPauseCircle } from 'react-icons/fi';
import Link from '@material-ui/core/Link';
import { StepStatus } from 'models/Step.model';
import { CheckStepDetailsEntry } from '../../../checks/components/CheckStepDetails/CheckStepDetailsEntry';
import { useStyles, LinkButton } from './PremiumAmlWatchlistsStepDetails.styles';

export function PremiumAmlWatchlistsStepDetails({ step }) {
  const intl = useIntl();
  const classes = useStyles();
  return (
    <Card raised={false} className={classes.card}>
      <CardContent>
        <Box>
          {step?.error && (
            <Box mt={0.5} mb={1.5} className={step.checkStatus === StepStatus.Failure ? classes.redText : ''}>
              {intl.formatMessage({
                id: step.checkStatus === StepStatus.Failure ? `SecurityCheckStep.${step.error.code}.message` : 'SecurityCheckStep.premiumAmlWatchlists.incomplete',
              })}
            </Box>
          )}
          {step?.data && (
            <Box>
              {
                step.data.isMonitored && (
                  <Box mt={0.5} mb={1.5} className={classes.monitoringStatus}>
                    <Box className={classes.iconContainer}>
                      {step.data.monitored
                        ? (
                          <FiActivity size={18} className={classes.greenText} />
                        ) : (
                          <FiPauseCircle size={18} className={classes.yellowText} />
                        )}
                    </Box>
                    <Box>
                      {intl.formatMessage({ id: `SecurityCheckStep.premiumAmlWatchlists.monitoring.${step.data.monitored ? 'enabled' : 'disabled'}` },
                        {
                          verified: (
                            <Box component="span" className={classes.greenUnderlinedText}>
                              {intl.formatMessage({ id: 'statuses.verified' })}
                            </Box>
                          ),
                        })}
                    </Box>
                  </Box>
                )
              }

              <CheckStepDetailsEntry label="nameSearched" value={step.data.nameSearched} />
              <Box className={classes.wrapper}>
                {step.data.dateOfBirth && (
                  <Box className={classes.inline}>
                    <CheckStepDetailsEntry label="dateOfBirth" value={step.data.dateOfBirth} />
                  </Box>
                )}
                <Box className={classes.inline}>
                  <CheckStepDetailsEntry label="matchType" value={intl.formatMessage({ id: `SecurityCheckStep.premiumAmlWatchlists.match.${step.data.matchType}` })} />
                </Box>
              </Box>
              {step.data.profileUrl && (
                <Link href={step.data.profileUrl} underline="none">
                  <LinkButton className={classes.button} fullWidth endIcon={<FiExternalLink />}>
                    {intl.formatMessage({ id: 'SecurityCheckStep.premiumAmlWatchlists.profileLink' })}
                  </LinkButton>
                </Link>
              )}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
