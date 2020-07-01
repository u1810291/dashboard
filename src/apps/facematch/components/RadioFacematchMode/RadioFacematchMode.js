import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { Box, Collapse, FormControlLabel, Grid, Radio, Typography } from '@material-ui/core';
import { ButtonExpand, useStyles } from './RadioFacematchMode.styles';

const RadioFacematchMode = ({
  mode,
  children,
  subtitle,
  expandable,
  disabled,
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(!expandable);

  const toggleExpanded = useCallback(() => {
    if (expandable) {
      setExpanded(!expanded);
    }
  }, [expanded, expandable]);

  return (
    <Grid container flow="row">
      <Grid item>
        <FormControlLabel
          control={<Radio color="default" disabled={disabled} />}
          label={(
            <Typography variant="h5">
              {intl.formatMessage({ id: `Product.configuration.facematch.mode.${mode}.title` })}
            </Typography>
          )}
          value={mode}
        />
      </Grid>
      <Grid item>
        <Box pl={3}>
          <Grid container flow="column">
            <Grid item className={classes.fluid}>
              {children}
            </Grid>
            <Grid item className={classes.expandButtonBox}>
              {expandable && (
                <ButtonExpand onClick={toggleExpanded} expanded={expanded} disabled={disabled}>
                  {intl.formatMessage({
                    id: `Product.configuration.facematch.mode.custom.${expanded ? 'showLess' : 'showMore'}`,
                  })}
                </ButtonExpand>
              )}
            </Grid>
          </Grid>
        </Box>
        <Grid item>
          <Collapse in={expanded}>
            <Box pl={3}>
              <Typography component="div" variant="body2">
                {subtitle}
              </Typography>
            </Box>
          </Collapse>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RadioFacematchMode;
