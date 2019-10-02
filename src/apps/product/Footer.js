import { useIntl } from 'react-intl';
import { get } from 'lodash';
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box } from '@material-ui/core';

import {
  useStyles,
  EmptyBox,
  FirstBox,
  Sentence,
  Author,
} from './styles';

const Footer = () => {
  const intl = useIntl();
  const classes = useStyles();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFeedbackById = (id) => {
    const prefix = 'feedbacks.feedback';
    const getEntry = (txtId, field) => intl.formatMessage(
      {
        id: `${prefix}.${txtId}.${field}`,
        defaultMessage: 'null',
      },
    );
    const message = {
      id,
      author: getEntry(id, 'author'),
      sentence: getEntry(id, 'content'),
    };

    return (message.author === 'null' || message.sentence === 'null')
      ? null
      : message;
  };

  const [feedback, setFeedback] = useState(getFeedbackById(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setFeedback((fc) => {
        let fb = getFeedbackById(get(fc, 'id', -1) + 1);
        if (!fb) {
          fb = getFeedbackById(0);
        }
        return (fb);
      });
    }, 7000);
    return () => clearInterval(interval);
  }, [feedback, getFeedbackById]);

  return (
    <AppBar position="fixed" color="secondary" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <EmptyBox />
        <FirstBox>
          {intl.formatMessage({ id: 'dashboard.footer.whoUseIt' })}
        </FirstBox>
        <Sentence>
          <Box px={1} fontSize={12} width={416} textAlign="right" fontStyle="italic">
            {`"${feedback.sentence}"`}
          </Box>
        </Sentence>
        <Author>
          <Box px={1} fontSize={10} fontWeight="bold">
            {feedback.author}
          </Box>
        </Author>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
