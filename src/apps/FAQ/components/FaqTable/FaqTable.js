import React from 'react';
import { Box, Grid } from '@material-ui/core';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { countToArray } from 'lib/number';
import { useStyles } from './FaqTable.styles';

export function FaqTable({ token, rows }) {
  const intl = useIntl();
  const classes = useStyles();
  return (
    <Box className={classes.answerTable}>
      <Grid container spacing={0}>
        <Grid item xs={7} className={classes.tableHeader}>
          {intl.formatMessage({ id: `${token}.tableHead.1` })}
        </Grid>
        <Grid item xs={5} className={classNames(classes.tableHeader, classes.withLeftBorder)}>
          {intl.formatMessage({ id: `${token}.tableHead.2` })}
        </Grid>
        {countToArray(rows).map((row) => ([
          <Grid item xs={7} key="row1" className={classNames(classes.tableRow, classes.withTopBorder)}>
            {intl.formatMessage({ id: `${token}.table.${row}.1` })}
          </Grid>,
          <Grid item xs={5} key="row2" className={classNames(classes.tableRow, classes.withTopBorder, classes.withLeftBorder)}>
            {intl.formatMessage({ id: `${token}.table.${row}.2` })}
          </Grid>,
        ]),
        )}
      </Grid>
    </Box>
  );
}
