import React from 'react';
import Paper from '@material-ui/core/Paper';
import { useIntl } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { useSelector } from 'react-redux';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { CopyToClipboard } from 'apps/ui';
import { useStyles } from './FaqBanner.styles';

export const FaqBanner = () => {
  const classes = useStyles();
  const intl = useIntl();
  const merchantId = useSelector(selectMerchantId);
  return (
    <Paper className={classes.banner}>
      <Box className={classes.boxWrapper}>
        <Box className={classes.boxCaption}>
          <Typography variant="h5" component="span">
            { intl.formatMessage({ id: 'FAQ.banner.title' }) }
          </Typography>
        </Box>
        <Box className={classes.boxWithMerchantId}>
          <Typography component="span" className={classes.yourMerchantId}>
            {intl.formatMessage({ id: 'FAQ.banner.yourMerchantId' })}
          </Typography>
          <CopyToClipboard text={merchantId}>
            <code className={classes.merchantId}>{merchantId}</code>
          </CopyToClipboard>
        </Box>
        <Box className={classes.boxEmail}>
          <Link
            className={classes.email}
            color="primary"
            href="mailto:support@mati.io"
            rel="noopener"
          >
            support@mati.io
          </Link>
        </Box>
      </Box>
    </Paper>
  );
};
