import React from 'react';
import Box from '@material-ui/core/Box';
import { ReactComponent as MatiLogo } from 'assets/mati-logo-v3.svg';
import { useStyles } from './Loader.styles';

export function Loader({ qa }) {
  const classes = useStyles();

  return (
    <Box
      className={classes.root}
    >
      <Box className={classes.logo}>
        <MatiLogo width={135} height={45} data-qa={qa} />
      </Box>
    </Box>
  );
}
