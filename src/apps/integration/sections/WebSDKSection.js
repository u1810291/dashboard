import { Grid, Typography } from '@material-ui/core';
import { SyntaxHighlighter } from 'components/syntax-highlighter';
import { SyntaxHighlighterLanguages } from 'components/syntax-highlighter/SyntaxHighlighter.model';
import { integrationCode } from 'models/Integration.model';
import React from 'react';
import { useIntl } from 'react-intl';
import Frameworks from './web-frameworks.png';
import { useStyles } from './WebSDKSection.styles';

export function WebSDKSection() {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item xs={5}>
        <Typography variant="h6" gutterBottom>
          {intl.formatMessage({ id: 'WebSDKSection.title' })}
          <img className={classes.img} src={Frameworks} alt={intl.formatMessage({ id: 'WebSDKSection.imgAlt' })} />
        </Typography>

        <Typography paragraph>{intl.formatMessage({ id: 'WebSDKSection.description' })}</Typography>
      </Grid>
      <Grid item xs={5}>
        <SyntaxHighlighter language={SyntaxHighlighterLanguages.HTML} code={integrationCode} />
      </Grid>
    </Grid>
  );
}
