import { Box, Card, CardContent } from '@material-ui/core';
import { BoxBordered } from 'apps/ui';
import React from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { CheckBarExpandable } from 'apps/identity/components/CheckBarExpandable/CheckBarExpandable';
import { FiExternalLink } from 'react-icons/fi';
import { LinkButton, useStyles } from './DuplicateUserDetectionCheck.styles';

export function DuplicateUserDetectionCheck({ stepData = {} }) {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <BoxBordered p={1} pt={2} className={classes.bordered}>
      <CheckBarExpandable step={stepData} title={`Checks.result.DuplicateUserDetectionCheck.${stepData.checkStatus}.title`}>
        <Card raised={false} className={classes.card}>
          <CardContent>
            <Box>
              {intl.formatMessage({ id: `Checks.result.DuplicateUserDetectionCheck.${stepData.checkStatus}.description` })}
            </Box>
            {stepData.data && stepData.data.duplicateIdentities && (
              <Box my={1}>
                {stepData.data.duplicateIdentities.map((entry, index) => (
                  <Box my={1}>
                    <Link to={`/identities/${entry}`}>
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
    </BoxBordered>
  );
}
