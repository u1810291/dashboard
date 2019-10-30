import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SocialStripe from './social-stripe.png';

export const EmptyBox = () => (
  <Box
    flexBasis={350}
    flexShrink={0}
    flexGrow={0}
  />
);

export const FirstBox = ({ children }) => (
  <Box
    px={1}
    fontSize={12}
    fontWeight="bold"
    textAlign="left"
    flexGrow={5}
    flexShrink={0}
    flexBasis={170}
    color="black"
  >
    { children }
  </Box>
);

export const Sentence = ({ children }) => (
  <Box
    height={46}
    flexShrink={0}
    flexBasis={150}
    color="rgba(36, 40, 45, 0.7)"
    display="flex"
    alignItems="center"
  >
    { children }
  </Box>
);

export const Author = ({ children }) => (
  <Box
    height={46}
    flexGrow={3}
    display="flex"
    alignItems="center"
    borderLeft={1}
    borderColor="grey.300"
    color="black"
  >
    { children }
  </Box>
);

export const useStyles = makeStyles(() => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolBar: {
    background: `url("${SocialStripe}") no-repeat center center`,
    'background-position-x': 70,
    'background-size': 'auto 50px',
    'justify-content': 'flex-end',
    'align-items': 'center',
    'min-width': 950,
  },
  wrapper: {
    display: 'flex',
  },
}));
