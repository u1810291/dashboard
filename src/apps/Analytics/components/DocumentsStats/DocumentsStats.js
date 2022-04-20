import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { localeNumber } from 'lib/number';
import React from 'react';
import { FiFileText } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { byDocumentTypes } from '../../models/Metrics.model';
import { selectDocumentsCount } from '../../state/Analytics.selectors';
import { useStyles } from './DocumentStats.styles';

export function DocumentsStats() {
  const intl = useIntl();
  const classes = useStyles();
  const documents = useSelector(selectDocumentsCount);

  return (
    <Paper>
      <Box p={2}>
        <Box mb={2} color="common.black75">
          <Grid container alignItems="center">
            <Box flexShrink={0} mr={0.5} lineHeight={0}>
              <FiFileText />
            </Box>
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: 'Analytics.documents.title' })}
            </Typography>
          </Grid>
        </Box>
        <Grid container alignItems="center">
          {byDocumentTypes.map((document) => (
            <Grid item xs={6} sm={5} key={document.id} className={classes.item}>
              <Box mb={0.4} fontSize={24} fontWeight="bold">
                {documents && localeNumber(documents[document.id])}
              </Box>
              <Box color="common.black75">
                {intl.formatMessage({ id: `flow.documentTypeStep.${document.id}` })}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}
