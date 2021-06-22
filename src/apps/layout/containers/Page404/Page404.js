import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import { FiHome } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { Routes } from 'models/Router.model';
import { CenterContent } from '../../components/CenterContent/CenterContent';
import { ReactComponent as Image404 } from './404.svg';

export function Page404() {
  const intl = useIntl();

  return (
    <CenterContent>
      <Box display="flex" alignItems="center">
        <Box mr={4}>
          <Image404 />
        </Box>
        <Box>
          <Typography variant="h2" gutterBottom>{intl.formatMessage({ id: 'Page404.title' })}</Typography>
          <Typography variant="subtitle1" gutterBottom>{intl.formatMessage({ id: 'Page404.subtitle' })}</Typography>
          <Box mt={2}>
            <NavLink to={Routes.root}>
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
