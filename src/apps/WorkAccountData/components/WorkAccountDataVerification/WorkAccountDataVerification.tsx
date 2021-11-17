import { Grid, Box } from '@material-ui/core';
import { BoxBordered } from 'apps/ui';
import { useIntl } from 'react-intl';
import React from 'react';
import { IWorkAccountDataVerification } from '../../models/WorkAccountData.model';

export function WorkAccountDataVerification({
  data,
}: {
  data: IWorkAccountDataVerification;
}) {
  const intl = useIntl();

  return (
    <Grid container>
      <Grid item xs={12} lg={4}>
        <BoxBordered>
          <Box mb={1} fontSize={18} color="common.black75">
            {intl.formatMessage({ id: 'WorkAccountData.result.status' })}
          </Box>
          <Box mb={1} fontSize={36} color={data.success ? 'common.green' : 'common.red'}>
            {intl.formatMessage({ id: `WorkAccountData.result.status.${data.success ? 'success' : 'failure'}` })}
          </Box>
          <Box fontSize={16} color="common.black75">
            {intl.formatMessage({ id: 'WorkAccountData.result.status.description' })}
          </Box>
        </BoxBordered>
      </Grid>
    </Grid>
  );
}
