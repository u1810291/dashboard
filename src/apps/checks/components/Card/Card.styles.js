import React from 'react';
import { Chip, Box } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: 20,
  },
  container: {
    padding: [[20, 20, 20, 15]],
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
}));

export const TitleBadge = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(55, 87, 255, 0.1)',
    height: 17,
    lineHeight: '18px',
  },
}))(Chip);

export const TitleIcon = withStyles(() => ({
  root: {
    fontSize: 18,
    strokeWidth: 1,
  },
}))(({ icon, ...props }) => (<Box {...props}>{icon}</Box>));
