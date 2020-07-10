import { Box, Container, Paper } from '@material-ui/core';
import { FeedbackData } from 'apps/info/components/Feedback/Feedback.model';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { PRODUCT_FOOTER_UPDATE_TIMEOUT } from '../../models/Product.model';
import { useStyles } from './Footer.styles';
import SocialStripe from './social-stripe.png';

export function Footer() {
  const intl = useIntl();
  const classes = useStyles();
  const [feedbackIndex, setFeedbackIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeedbackIndex((currentIndex) => (currentIndex + 1) % FeedbackData.length);
    }, PRODUCT_FOOTER_UPDATE_TIMEOUT);
    return () => clearInterval(interval);
  }, []);

  const feedback = FeedbackData[feedbackIndex];

  return (
    <Paper color="secondary" square elevation={0} className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        {/* left */}
        <Box className={classes.companies}>
          <img src={SocialStripe} className={classes.img} alt="" />
          <Box className={classes.label}>
            {intl.formatMessage({ id: 'dashboard.footer.whoUseIt' })}
          </Box>
        </Box>
        {/* right */}
        <Box className={classes.quotes}>
          <Box className={classes.quote}>
            {intl.formatMessage({ id: `Feedback.${feedback.id}.content` })}
          </Box>
          <Box className={classes.author}>
            {intl.formatMessage({ id: `Feedback.${feedback.id}.author` })}
          </Box>
        </Box>
      </Container>
    </Paper>
  );
}
