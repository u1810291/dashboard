import React from 'react';
import { Box } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  switcher: {
    marginRight: 10,
  },
  container: {
    padding: [[10, 10, 10, 10]],
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: 5,
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
      marginBottom: 10,
    },
  },
  icon: {
    flex: [[0, 0, '25px']],
  },
  titleText: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  body: {
    display: 'flex',
  },
  text: {
    paddingRight: 40,
  },
  control: {
    flex: [[0, 0, 0]],
  },
  bordered: {
    borderColor: '#EDF0F5',
    marginBottom: 20,
  },
}));

export const TitleIcon = withStyles(() => ({
  root: {
    fontSize: 18,
    strokeWidth: 1,
  },
}))(({ icon, ...props }) => (<Box {...props}>{icon}</Box>));
