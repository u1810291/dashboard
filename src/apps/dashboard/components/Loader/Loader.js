import Box from '@material-ui/core/Box';
import { ReactComponent as MatiLogoReview } from 'assets/mati-logo-review.svg';
import { ReactComponent as MatiLogo } from 'assets/mati-logo-v3.svg';
import React from 'react';
import { useStyles } from './Loader.styles';

export function Loader({ qa, logoWithCompanyName = false }) {
  const classes = useStyles();

  return (
    <Box
      className={classes.root}
    >
      <Box className={classes.logo}>
        {logoWithCompanyName ? (
          <MatiLogoReview width={80} height={75} data-qa={qa} />
        ) : (
          <MatiLogo width={135} height={45} data-qa={qa} />
        )}
      </Box>
    </Box>
  );
}
