import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import React from 'react';
import classNames from 'classnames';
import { useFormatMessage } from 'apps/intl';
import { FiExternalLink, FiActivity, FiPauseCircle } from 'react-icons/fi';
import { IStep, StepStatus } from 'models/Step.model';
import { CheckStepDetailsEntry } from '../../../checks/components/CheckStepDetails/CheckStepDetailsEntry';
import { useStyles, LinkButton } from './PremiumAmlWatchlistsStepDetails.styles';

export function PremiumAmlWatchlistsStepDetails({ step }: { step: IStep}) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  return (
    <Card raised={false} className={classes.card}>
      <CardContent>
        <Box>
          {step?.error && (
            <Box mt={0.5} mb={1.5} className={classNames({ [classes.redText]: step.checkStatus === StepStatus.Failure })}>
              {formatMessage(step.checkStatus === StepStatus.Failure ? `SecurityCheckStep.${step.error.code}.message` : 'SecurityCheckStep.premiumAmlWatchlists.incomplete')}
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
                      {formatMessage(`SecurityCheckStep.premiumAmlWatchlists.monitoring.${step.data.monitored ? 'enabled' : 'disabled'}`, {
                        messageValues: {
                          verified: (
                            <Box component="span" className={classes.greenUnderlinedText}>
                              {formatMessage('statuses.verified')}
                            </Box>
                          ),
                        },
                      })}
                    </Box>
                  </Box>
                )
              }

              <CheckStepDetailsEntry label="nameSearched" value={step.data.nameSearched} />
              {Boolean(step.data.countriesSearched?.length)
                && <CheckStepDetailsEntry label="countriesSearched" value={step.data.countriesSearched.join(', ')} />}
              <Box className={classes.wrapper}>
                {step.data.dateOfBirth && (
                  <Box className={classes.inline}>
                    <CheckStepDetailsEntry label="dateOfBirth" value={step.data.dateOfBirth} />
                  </Box>
                )}
                <Box className={classes.inline}>
                  <CheckStepDetailsEntry label="matchType" value={formatMessage(`SecurityCheckStep.premiumAmlWatchlists.match.${step.data.matchType}`)} />
                </Box>
              </Box>
              {step.data.profileUrl && (
                <Link href={step.data.profileUrl} underline="none">
                  <LinkButton fullWidth endIcon={<FiExternalLink />}>
                    {formatMessage('SecurityCheckStep.premiumAmlWatchlists.profileLink')}
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
