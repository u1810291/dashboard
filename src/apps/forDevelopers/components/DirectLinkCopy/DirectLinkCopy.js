import { Box, Grid, Typography } from '@material-ui/core';
import { CopyToClipboard } from 'apps/ui';
import { permalinkUrl } from 'lib/client/urls';
import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectClientId, selectCurrentFlowId } from 'state/merchant/merchant.selectors';
import { useStyles } from './DirectLinkCopy.styles';

export function DirectLinkCopy() {
  const intl = useIntl();
  const classes = useStyles();
  const clientId = useSelector(selectClientId);
  const flowId = useSelector(selectCurrentFlowId);
  const link = permalinkUrl({ clientId, flowId });

  return (
    <Grid container direction="column">
      <Typography variant="subtitle2" gutterBottom>{intl.formatMessage({ id: 'forDevs.directLinkCopy.header' })}</Typography>
      <Box mb={2} color="common.black75">
        {intl.formatMessage({ id: 'forDevs.directLinkCopy.subheader' })}
      </Box>
      <Box className={classes.resourceUrl}>
        <CopyToClipboard withText withCopyText isOverlay text={link}>
          <Box px={2} py={1.5}>
            {link}
          </Box>
        </CopyToClipboard>
      </Box>
    </Grid>
  );
}
