import { Box, Collapse, Grid } from '@material-ui/core';
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useIntl } from 'react-intl';

export function HistoryDataChanged({ changes, isCollapsed }) {
  const intl = useIntl();

  return (
    <Grid container direction="column">
      <Box color="common.black75" fontWeight="bold">
        {intl.formatMessage({ id: 'DocumentStep.Data.title' }, { index: changes?.documentIndex + 1 || 0 })}
      </Box>
      {changes?.fields?.map(({ id, previousValue, value }, index) => (
        <React.Fragment key={id}>
          {index === 0 ? (
            <Box mt={1}>
              <Grid container alignItems="center">
                <Box>
                  <Box color="common.black90" fontWeight="bold">{previousValue}</Box>
                  <Box color="common.black75">{intl.formatMessage({ id: `identity.field.${id}` })}</Box>
                </Box>
                <Box display="flex" mx={1} fontSize={17} color="common.black75">
                  <FiArrowRight />
                </Box>
                <Box>
                  <Box color="common.black90" fontWeight="bold">{value}</Box>
                  <Box color="common.black75">{intl.formatMessage({ id: `identity.field.${id}` })}</Box>
                </Box>
              </Grid>
            </Box>
          ) : (
            <Collapse in={isCollapsed}>
              <Box mt={1}>
                <Grid container alignItems="center">
                  <Box>
                    <Box color="common.black90" fontWeight="bold">{previousValue}</Box>
                    <Box color="common.black75">{intl.formatMessage({ id: `identity.field.${id}` })}</Box>
                  </Box>
                  <Box display="flex" mx={1} fontSize={17} color="common.black75">
                    <FiArrowRight />
                  </Box>
                  <Box>
                    <Box color="common.black90" fontWeight="bold">{value}</Box>
                    <Box color="common.black75">{intl.formatMessage({ id: `identity.field.${id}` })}</Box>
                  </Box>
                </Grid>
              </Box>
            </Collapse>
          )}
        </React.Fragment>
      ))}

    </Grid>
  );
}
