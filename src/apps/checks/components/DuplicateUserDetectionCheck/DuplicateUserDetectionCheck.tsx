import { Box, Card, CardContent } from '@material-ui/core';
import { CheckBarExpandable } from 'apps/ui';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { LinkButton, useStyles } from 'apps/checks/components/DuplicateUserDetectionCheck/DuplicateUserDetectionCheck.styles';
import { IStep } from 'models/Step.model';
import { Routes } from 'models/Router.model';
import { FiExternalLink } from 'react-icons/fi';

export function DuplicateUserDetectionCheck({ stepData, hideLink }: { stepData: IStep; hideLink?: boolean }) {
  const classes = useStyles();
  const intl = useIntl();

  if (!stepData) {
    return null;
  }

  return (
    <CheckBarExpandable step={stepData} title={`Checks.result.DuplicateUserDetectionCheck.${stepData?.checkStatus}.title`} isNoBadge>
      <Card raised={false} className={classes.card}>
        <CardContent>
          <Box>
            {intl.formatMessage({ id: `Checks.result.DuplicateUserDetectionCheck.${stepData?.checkStatus}.description` })}
          </Box>
          {stepData?.data?.duplicateIdentities && (
          <Box my={1}>
            {!hideLink && stepData.data.duplicateIdentities?.map((entry, index) => (
              <Box my={1} key={index}>
                <Link to={`${Routes.list.root}/${entry}`}>
                  <LinkButton variant="contained" disableElevation endIcon={<FiExternalLink />}>
                    {`${intl.formatMessage({ id: 'Checks.result.DuplicateUserDetectionCheck.duplicatationLinks' })} ${index + 1}`}
                  </LinkButton>
                </Link>
              </Box>
            ))}
          </Box>
          )}
        </CardContent>
      </Card>
    </CheckBarExpandable>
  );
}
