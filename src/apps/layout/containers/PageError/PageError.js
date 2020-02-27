import { Box, Button, Typography } from '@material-ui/core';
import { ROOT_PATH } from 'apps/routing';
import React from 'react';
import { FiHome } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { CenterContent } from '../../components/CenterContent/CenterContent';
import { ReactComponent as Image500 } from './500.svg';

export function PageError() {
  const intl = useIntl();

  return (
    <CenterContent>
      <Box display="flex" alignItems="center">
        <Box mr={4}>
          <Image500 />
        </Box>
        <Box>
          <Typography variant="h2" gutterBottom>{intl.formatMessage({ id: 'PageError.title' })}</Typography>
          <Typography variant="subtitle1" gutterBottom>{intl.formatMessage({ id: 'PageError.subtitle' })}</Typography>
          <Box mt={2}>
            <NavLink to={ROOT_PATH}>
              <Button
                color="primary"
                variant="contained"
                startIcon={<FiHome />}
              >
                {intl.formatMessage({ id: 'PageError.cta' })}
              </Button>
            </NavLink>
          </Box>
        </Box>
      </Box>
    </CenterContent>
  );
}
