import { Box, Card, CardContent } from '@material-ui/core';
import { CheckBarExpandable } from 'apps/ui';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from 'apps/checks/components/DuplicateUserDetectionCheck/DuplicateUserDetectionCheck.styles';
import { IStep } from 'models/Step.model';

export function DuplicateUserDetectionCheck({ stepData }: { stepData: IStep }) {
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
          {/*          {stepData?.data?.duplicateIdentities && (
          <Box my={1}>
            {stepData.data.duplicateIdentities?.map((entry, index) => (
              <Box my={1} key={index}>
                <Link to={isNewLink
                  ? `${Routes.identity.profile.root}/${entry}${Routes.identity.verification.root}/${stepData.data?.relatedRecords[index]}`
                  : `${Routes.list.root}/${entry}`}
                >
                  <LinkButton variant="contained" disableElevation endIcon={<FiExternalLink />}>
                    {`${intl.formatMessage({ id: 'Checks.result.DuplicateUserDetectionCheck.duplicatationLinks' })} ${index + 1}`}
                  </LinkButton>
                </Link>
              </Box>
            ))}
          </Box>
          )} */}
        </CardContent>
      </Card>
    </CheckBarExpandable>
  );
}
