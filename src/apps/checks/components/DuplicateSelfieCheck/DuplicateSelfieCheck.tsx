import { Box, Card, CardContent, TableCell, TableRow } from '@material-ui/core';
import { CheckBarExpandable } from 'apps/ui';
import React, { useCallback, useMemo } from 'react';
import { getStepStatus, IStep } from 'models/Step.model';
import { IDuplicateSelfieStepData } from 'models/Biometric.model';
import { DateFormat, formatDate } from 'lib/date';
import { useFormatMessage } from 'apps/intl';
import { useStyles } from './DuplicateSelfieCheck.styles';

export function DuplicateSelfieCheck({ stepData }: { stepData: IStep<IDuplicateSelfieStepData> }) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const checkStatus = getStepStatus(stepData);
  const isInternalError = useMemo(() => stepData?.error?.code === 'system.internalError' || false, [stepData]);
  const getPercentageScore = useCallback((score: number) => `${+(score * 100).toFixed(2)}%`, []);

  if (!stepData) {
    return null;
  }

  return (
    <CheckBarExpandable step={{ ...stepData, checkStatus }} title={`Checks.result.DuplicateSelfieCheck.${checkStatus}.title`}>
      <Card raised={false} className={classes.card}>
        <CardContent>
          {isInternalError && (
            <Box>
              {formatMessage('Checks.result.DuplicateSelfieCheck.error.system.internalError.message')}
            </Box>
          )}
          {!isInternalError && (
            <Box>
              {formatMessage(`Checks.result.DuplicateSelfieCheck.${checkStatus}.description`)}
            </Box>
          )}
          {stepData?.data?.duplicates && (
            <Box my={1}>
              <TableRow>
                <TableCell>
                  {formatMessage('Checks.result.DuplicateSelfieCheck.table.verificationNumber')}
                </TableCell>
                <TableCell>
                  {formatMessage('Checks.result.DuplicateSelfieCheck.table.verificationDate')}
                </TableCell>
                <TableCell>
                  {formatMessage('Checks.result.DuplicateSelfieCheck.table.facematchScore')}
                </TableCell>
                <TableCell>
                  {formatMessage('Checks.result.DuplicateSelfieCheck.table.result')}
                </TableCell>
              </TableRow>
              {[...stepData.data.duplicates]?.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).map((duplicate, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <a href={duplicate.verificationUrl}>
                      {`${formatMessage('Checks.result.DuplicateSelfieCheck.duplicatationLinks')} ${index + 1}`}
                    </a>
                  </TableCell>
                  <TableCell>
                    <Box>
                      {formatDate(duplicate.createdAt, DateFormat.DayShortMonthShortWithSpace)}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      {getPercentageScore(duplicate.facematchScore)}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      {formatMessage(`statuses.${duplicate.verificationStatus}`)}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </CheckBarExpandable>
  );
}
