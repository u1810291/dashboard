import { AppBar, Box, Toolbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FeedbackData } from 'apps/info/components/Feedback/Feedback.model';
import { useIntl } from 'react-intl';
import { Author, EmptyBox, FirstBox, Sentence, useStyles } from './styles';

const UPDATE_TIMEOUT = 7000;

const Footer = () => {
  const intl = useIntl();
  const classes = useStyles();
  const [feedbackIndex, setFeedbackIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeedbackIndex((currentIndex) => (currentIndex + 1) % FeedbackData.length);
    }, UPDATE_TIMEOUT);
    return () => clearInterval(interval);
  }, []);

  const feedback = FeedbackData[feedbackIndex];

  return (
    <AppBar position="fixed" color="secondary" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <EmptyBox />
        <FirstBox>
          {intl.formatMessage({ id: 'dashboard.footer.whoUseIt' })}
        </FirstBox>
        <Sentence>
          <Box
            px={1}
            fontSize={12}
            width={416}
            textAlign="right"
            fontStyle="italic"
          >
            {intl.formatMessage({ id: `Feedback.${feedback.id}.content` })}
          </Box>
        </Sentence>
        <Author>
          <Box px={1} fontSize={10} fontWeight="bold">
            {intl.formatMessage({ id: `Feedback.${feedback.id}.author` })}
          </Box>
        </Author>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
