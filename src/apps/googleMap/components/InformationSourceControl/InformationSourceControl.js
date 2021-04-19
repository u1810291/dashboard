import { Box, Grid } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import cn from 'classnames';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { InformationSources } from '../../models/googleMap.model';
import { useStyles } from './InformationSourceControl.styles';

export function InformationSourceControl({ isCountriesControlOpen, informationSource, setInformationSource }, ref) {
  const intl = useIntl();
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:960px)', { noSsr: true });

  const handleSetActiveSource = useCallback((id) => {
    setInformationSource(id);
  }, [setInformationSource]);

  return (
    <Box ref={ref}>
      {(isDesktop || !isCountriesControlOpen) && (
        <>
          {InformationSources.map((source) => (
            <Box
              className={classes.informationSource}
              key={source.id}
              onClick={() => handleSetActiveSource(source.id)}
            >
              <Grid
                container
                alignItems="center"
                justify="center"
                className={cn(classes.informationIcon, {
                  [classes.activeSourceIcon]: source.id === informationSource,
                })}
              >
                {source.icon}
              </Grid>
              <Box className={classes.informationText}>
                {intl.formatMessage({ id: `Map.${source.id}` })}
              </Box>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
}

export const InformationSourceControlForward = React.forwardRef(InformationSourceControl);
