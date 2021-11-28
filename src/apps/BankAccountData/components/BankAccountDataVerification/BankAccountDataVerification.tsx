import { Grid, Box } from '@material-ui/core';
import { BoxBordered } from 'apps/ui';
import { useIntl } from 'react-intl';
import React from 'react';
import { IBankAccountDataVerification } from '../../models/BankAccountData.model';

export function BankAccountDataVerification({ data }: {
  data: IBankAccountDataVerification;
}) {
  const intl = useIntl();

  return (
    <Grid container>
      <Grid item xs={12} lg={4}>
        <BoxBordered>
          <Box mb={1} fontSize={18} color="common.black75">
            {intl.formatMessage({ id: 'BankAccountData.result.status' })}
          </Box>
          <Box mb={1} fontSize={36} color={data.success ? 'common.green' : 'common.red'}>
            {intl.formatMessage({ id: `BankAccountData.result.status.${data.success ? 'success' : 'failure'}` })}
          </Box>
          <Box fontSize={16} color="common.black75">
            {intl.formatMessage({ id: 'BankAccountData.result.status.description' })}
          </Box>
        </BoxBordered>
      </Grid>
    </Grid>
  );
}
