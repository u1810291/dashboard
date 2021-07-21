import React from 'react';
import { Box } from '@material-ui/core';
import { PageContent } from 'apps/layout';
import { ContactUs } from '../ContactUs/ContactUs';
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
          <Box flexDirection="column">
            <Box>
              <Support />
            </Box>
            <Box mt={3}>
              <ContactUs />
            </Box>
          </Box>
        </Box>
      </Box>
    </PageContent>
  );
}
