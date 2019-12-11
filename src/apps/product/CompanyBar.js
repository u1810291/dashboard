import { Grid, Link, Paper, Typography, Box } from '@material-ui/core';
import { CopyToClipboard } from 'components/clipboard';
import { permalinkUrl } from 'lib/client/urls';
import { trimMiddle } from 'lib/string';
import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectMerchantOrganizationName } from 'state/merchant/merchant.selectors';

export function CompanyBar({ clientId }) {
  const intl = useIntl();
  const companyName = useSelector(selectMerchantOrganizationName);
  const url = permalinkUrl({ clientId });

  return (
    <Paper>
      <Box p={2}>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Typography variant="h4">
              {companyName || intl.formatMessage({ id: 'CompanyBar.namePlaceholder' })}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom>{intl.formatMessage({ id: 'CompanyBar.permalink' })}</Typography>
            <CopyToClipboard text={url}>
              <Link href={url} target="_blank" rel="noopener noreferrer">
                {trimMiddle(url)}
              </Link>
            </CopyToClipboard>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
