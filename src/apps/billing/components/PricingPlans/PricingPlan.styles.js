import { makeStyles, withStyles, Button } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  priceText: {
    fontSize: 18,
  },
  card: {
    color: '#212830',
    padding: [[14, 17]],
    minWidth: 240,
  },
  blockHeight: {
    minHeight: 80,
  },
  selectButton: {
    color: '#212830',
    '&:hover': {
      backgroundColor: '#fcfcfc',
    },
  },
  enterprise: {
    color: 'white',
    backgroundColor: '#3757ff',
  },
  system: {
    [theme.breakpoints]: '',
  },
}));

export const PriceButton = withStyles(() => ({
  root: {
    height: 50,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'white',
  },
}))(Button);
