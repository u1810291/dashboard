import React from 'react';
import { Box } from '@material-ui/core';
import { PageContent } from 'apps/layout';
import { FAQ } from '../FAQ/FAQ';
import { Support } from '../Support/Support';
import { FaqBanner } from '../FaqBanner/FaqBanner';
import { useStyles } from './InfoPage.styles';

export function InfoPage() {
  const classes = useStyles();
  return (
    <PageContent>
      <Box display="flex" justifyContent="center" flexWrap="wrap">
        <Box flexGrow={1}>
          <FaqBanner />
        </Box>
        <Box display="flex" mt="20px" flexWrap="wrap" className={classes.wrapper}>
          <Box>
            <FAQ />
          </Box>
          <Box>
            <Support />
          </Box>
        </Box>
      </Box>
    </PageContent>
  );
}
