import { Box, Card, CardContent, Paper } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { CheckBarExpandable } from 'apps/identity/components/CheckBarExpandable/CheckBarExpandable';
import { useStyles } from './DuplicateUserDetectionCheck.styles';
import { Routes } from '../../../../models/Router.model';

export function DuplicateUserDetectionCheck({ stepData = {} }) {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <Paper>
      <Box py={2} px={1}>
        <CheckBarExpandable step={stepData} title={`Checks.result.DuplicateUserDetectionCheck.${stepData.checkStatus}.title`}>
          <Card raised={false} className={classes.card}>
            <CardContent className={classes.wrapper}>
              {intl.formatMessage({ id: `Checks.result.DuplicateUserDetectionCheck.${stepData.checkStatus}.description` })}
              {stepData.error && stepData.error.details && stepData.error.details.length === 1 && (
                <Link to={`${Routes.list.root}/${stepData.error.details[0].identity}`}>
                  {intl.formatMessage({ id: 'Checks.result.DuplicateUserDetectionCheck.duplicatationLink' })}
                </Link>
              )}
            </CardContent>
            {stepData.error && stepData.error.details && stepData.error.details.length > 1 && (
              <Box px={6} m={1}>
                {stepData.error.details.map((entry, index) => (
                  <Box>
                    <Link to={`${Routes.list.root}/${entry.identity}`}>
                      {`${intl.formatMessage({ id: 'Checks.result.DuplicateUserDetectionCheck.duplicatationLinks' })} ${stepData.data.length > 1 ? index + 1 : ''}`}
                    </Link>
                  </Box>
                ))}
              </Box>
            )}

          </Card>
        </CheckBarExpandable>
      </Box>
    </Paper>
  );
}
