import React from 'react';
import { Box } from '@material-ui/core';
import { useIntl } from 'react-intl';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as FlagIcon } from 'assets/icon-flag.svg';
import { ReactComponent as WrenchIcon } from 'assets/icon-wrench.svg';
import { ReactComponent as ShieldIcon } from 'assets/icon-shield.svg';
import { ReactComponent as GearWheel } from 'assets/icon-gearwheel.svg';
import { useStyles } from './FAQ.styles';
import { FaqSection } from '../FaqSection/FaqSection';
import { FaqExpandable } from '../FaqExpandable/FaqExpandable';
import { FaqTable } from '../FaqTable/FaqTable';

export function FAQ() {
  const intl = useIntl();
  const classes = useStyles();
  return (
    <Box p={0} mb={5}>
      {/* getting started */}
      <FaqSection Icon={FlagIcon} title={intl.formatMessage({ id: 'FAQ.gettingStarted.title' })}>
        <FaqExpandable
          answer={intl.formatMessage({ id: 'FAQ.gettingStarted.0.answer' })}
          question={intl.formatMessage({ id: 'FAQ.gettingStarted.0.question' })}
        />
        <FaqExpandable
          answer={intl.formatMessage({ id: 'FAQ.gettingStarted.1.answer' })}
          question={intl.formatMessage({ id: 'FAQ.gettingStarted.1.question' })}
        />
        <FaqExpandable
          answer={intl.formatMessage({ id: 'FAQ.gettingStarted.2.answer' })}
          question={intl.formatMessage({ id: 'FAQ.gettingStarted.2.question' })}
        />
        <FaqExpandable
          question={intl.formatMessage({ id: 'FAQ.gettingStarted.3.question' })}
        >
          <Typography gutterBottom>
            {intl.formatMessage({ id: 'FAQ.gettingStarted.3.answer.1' })}
          </Typography>
          <Typography>
            {intl.formatMessage({ id: 'FAQ.gettingStarted.3.answer.2' })}
          </Typography>
        </FaqExpandable>
        <FaqExpandable
          answer={intl.formatMessage({ id: 'FAQ.gettingStarted.4.answer' })}
          question={intl.formatMessage({ id: 'FAQ.gettingStarted.4.question' })}
        />
        <FaqExpandable
          question={intl.formatMessage({ id: 'FAQ.gettingStarted.5.question' })}
        >
          <Typography gutterBottom>
            {intl.formatMessage(
              { id: 'FAQ.gettingStarted.5.answer.1' },
              {
                verified: (
                  <Box component="span" color="common.green">
                    {intl.formatMessage({ id: 'statuses.verified' })}
                  </Box>
                ),
              },
            )}
          </Typography>
          <Typography>
            {intl.formatMessage(
              { id: 'FAQ.gettingStarted.5.answer.2' },
              {
                manualReviewNeeded: (
                  <Box component="span" color="common.orange">
                    {intl.formatMessage({ id: 'statuses.reviewNeeded' })}
                  </Box>
                ),
              },
            )}
          </Typography>
        </FaqExpandable>
        <FaqExpandable
          answer={intl.formatMessage({ id: 'FAQ.gettingStarted.6.answer' })}
          question={intl.formatMessage({ id: 'FAQ.gettingStarted.6.question' })}
        />
        <FaqExpandable
          question={intl.formatMessage({ id: 'FAQ.gettingStarted.7.question' })}
        >
          <Typography gutterBottom>
            {intl.formatMessage(
              { id: 'FAQ.gettingStarted.7.answer.1' },
              {
                verified: (
                  <Box component="span" color="common.green">
                    {intl.formatMessage({ id: 'statuses.verified' })}
                  </Box>
                ),
              },
            )}
          </Typography>
          <ul className={classes.list}>
            <li>{intl.formatMessage({ id: 'FAQ.gettingStarted.7.answer.2' })}</li>
            <li>{intl.formatMessage({ id: 'FAQ.gettingStarted.7.answer.3' })}</li>
            <li>{intl.formatMessage({ id: 'FAQ.gettingStarted.7.answer.4' })}</li>
          </ul>
          <ul>
            <li>
              <b>{intl.formatMessage({ id: 'FAQ.gettingStarted.7.answer.5' })}</b>
              {' '}
              {intl.formatMessage({ id: 'FAQ.gettingStarted.7.answer.6' })}
            </li>
            <li>
              <b>{intl.formatMessage({ id: 'FAQ.gettingStarted.7.answer.7' })}</b>
              {' '}
              {intl.formatMessage({ id: 'FAQ.gettingStarted.7.answer.8' })}
            </li>
          </ul>
        </FaqExpandable>
      </FaqSection>
      {/* technical integration */}
      <FaqSection
        footer={
          intl.formatMessage(
            { id: 'FAQ.technicalIntegration.footer' },
            {
              docsLink: (
                <Link
                  className={classes.emailLink}
                  color="primary"
                  href="https://docs.metamap.com/"
                  target="_blank"
                  rel="noopener"
                >
                  {intl.formatMessage({ id: 'FAQ.our.documentation' })}
                </Link>
              ),
            },
          )
        }
        Icon={WrenchIcon}
        title={intl.formatMessage({ id: 'FAQ.technicalIntegration.title' })}
      >
        <FaqExpandable
          answer={intl.formatMessage({ id: 'FAQ.technicalIntegration.0.answer' })}
          question={intl.formatMessage({ id: 'FAQ.technicalIntegration.0.question' })}
        />
        <FaqExpandable
          answer={intl.formatMessage({ id: 'FAQ.technicalIntegration.1.answer' })}
          question={intl.formatMessage({ id: 'FAQ.technicalIntegration.1.question' })}
        />
      </FaqSection>
      {/* security compliance */}
      <FaqSection Icon={ShieldIcon} title={intl.formatMessage({ id: 'FAQ.securityCompliance.title' })}>
        <FaqExpandable
          question={intl.formatMessage({ id: 'FAQ.securityCompliance.0.question' })}
        >
          <Typography gutterBottom>
            {intl.formatMessage({ id: 'FAQ.securityCompliance.0.answer.1' })}
          </Typography>
          <Typography gutterBottom>
            {intl.formatMessage({ id: 'FAQ.securityCompliance.0.answer.2' })}
          </Typography>
          <Typography>
            {intl.formatMessage({ id: 'FAQ.securityCompliance.0.answer.3' })}
          </Typography>
        </FaqExpandable>
        <FaqExpandable
          answer={intl.formatMessage({ id: 'FAQ.securityCompliance.1.answer' })}
          question={intl.formatMessage({ id: 'FAQ.securityCompliance.1.question' })}
        />
        <FaqExpandable
          question={intl.formatMessage({ id: 'FAQ.securityCompliance.2.question' })}
        >
          <FaqTable token="FAQ.securityCompliance.2" rows={21} />
        </FaqExpandable>
        <FaqExpandable
          answer={intl.formatMessage({ id: 'FAQ.securityCompliance.3.answer' })}
          question={intl.formatMessage({ id: 'FAQ.securityCompliance.3.question' })}
        />
        <FaqExpandable
          answer={intl.formatMessage({ id: 'FAQ.securityCompliance.4.answer' })}
          question={intl.formatMessage({ id: 'FAQ.securityCompliance.4.question' })}
        />
        <FaqExpandable
          answer={intl.formatMessage({ id: 'FAQ.securityCompliance.5.answer' })}
          question={intl.formatMessage({ id: 'FAQ.securityCompliance.5.question' })}
        />
      </FaqSection>
      {/* system requirements */}
      <FaqSection Icon={GearWheel} title={intl.formatMessage({ id: 'FAQ.systemRequirements.title' })}>
        <FaqExpandable
          question={intl.formatMessage({ id: 'FAQ.systemRequirements.0.question' })}
        >
          <Typography gutterBottom>
            {intl.formatMessage({ id: 'FAQ.systemRequirements.0.answer' })}
          </Typography>
          <FaqTable token="FAQ.systemRequirements.0" rows={12} />
        </FaqExpandable>
        <FaqExpandable
          answer={intl.formatMessage({ id: 'FAQ.systemRequirements.1.answer' })}
          question={intl.formatMessage({ id: 'FAQ.systemRequirements.1.question' })}
        />
      </FaqSection>
    </Box>
  );
}
