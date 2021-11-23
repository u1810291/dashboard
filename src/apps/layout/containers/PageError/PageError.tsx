import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import { FiHome } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { Routes } from 'models/Router.model';
import { CenterContent } from '../../components/CenterContent/CenterContent';
import { ReactComponent as Image500 } from './500.svg';

export function PageError({ onRetry, linkTo = Routes.root }: {
  onRetry?: () => void;
  linkTo?: string;
}) {
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
            <NavLink to={linkTo}>
              <Button
                color="primary"
                variant="contained"
                startIcon={<FiHome />}
                onClick={onRetry}
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
