import { Grid, Typography } from '@material-ui/core';
import { SyntaxHighlighter } from 'components/syntax-highlighter';
import { SyntaxHighlighterLanguages } from 'components/syntax-highlighter/SyntaxHighlighter.model';
import { integrationCode } from 'models/Integration.model';
import { QATags } from 'models/QA.model';
import React from 'react';
import { get } from 'lodash';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { selectAppLastModel, selectCurrentFlowId } from 'state/merchant/merchant.selectors';
import Frameworks from './web-frameworks.png';
import { useStyles } from './WebSDKSection.styles';

export function WebSDKSection() {
  const intl = useIntl();
  const classes = useStyles();
  const clientId = get(useSelector(selectAppLastModel), 'value.clientId');
  const flowId = useSelector(selectCurrentFlowId);

  return (
    <Grid container spacing={2} justify="space-between" alignItems="center">
      <Grid item xs={12} md={6}>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({ id: 'WebSDKSection.title' })}
          <img className={classes.img} src={Frameworks} alt={intl.formatMessage({ id: 'WebSDKSection.imgAlt' })} />
        </Typography>

        <Typography paragraph>{intl.formatMessage({ id: 'WebSDKSection.description' })}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <SyntaxHighlighter
          language={SyntaxHighlighterLanguages.HTML}
          code={integrationCode({ clientId, flowId })}
          qa={QATags.Integration.WebSDK}
        />
      </Grid>
    </Grid>
  );
}
