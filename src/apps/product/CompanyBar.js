import { Box, Grid, Link, Paper, Typography } from '@material-ui/core';
import { CopyToClipboard } from 'components/clipboard';
import { LoadableValue } from 'components/LoabableValue';
import { Loadable } from 'components/Loadable/Loadable';
import { permalinkUrl } from 'lib/client/urls';
import { trimMiddle } from 'lib/string';
import { QATags } from 'models/QA.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectClientIdModel, selectOrganizationNameModel } from 'state/merchant/merchant.selectors';

export function CompanyBar() {
  const intl = useIntl();
  const companyNameModel = useSelector(selectOrganizationNameModel);
  const clientIdModel = useSelector(selectClientIdModel);

  return (
    <Paper>
      <Box p={2}>
        <Grid container alignItems="center">
          <Grid item xs={9}>
            <Typography variant="h4" data-qa={QATags.Product.Bar.Name}>
              <LoadableValue
                model={companyNameModel}
                width={25}
                placeholder={intl.formatMessage({ id: 'CompanyBar.namePlaceholder' })}
              />
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography gutterBottom>{intl.formatMessage({ id: 'CompanyBar.permalink' })}</Typography>
            <Loadable
              model={clientIdModel}
              width={50}
              render={(clientId) => {
                const url = permalinkUrl({ clientId });
                return (
                  <CopyToClipboard text={url} qa={QATags.Product.Bar.Perma.Copy}>
                    <Link href={url} target="_blank" rel="noopener noreferrer" data-qa={QATags.Product.Bar.Perma.Link}>
                      {trimMiddle(url)}
                    </Link>
                  </CopyToClipboard>
                );
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
