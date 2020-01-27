import { makeStyles, withStyles, Button } from '@material-ui/core';


export const useStyles = makeStyles((theme) => ({
  priceText: {
    fontSize: 18,
  },
  card: {
    color: '#212830',
    padding: '14px 17px',
    marginBottom: 35,
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
  yearlyBadge: {
    position: 'absolute',
    top: 35,
    right: 30,
    padding: '6px 30px',
    color: '#fff',
    backgroundColor: '#3757ff',
    borderRadius: 40,
    whiteSpace: 'nowrap',
  },
  yearlyBottomNote: {
    position: 'absolute',
    bottom: 21,
    color: 'rgba(33, 40, 48, 0.6)',
    width: 140,
    marginLeft: 'auto',
    marginRight: 'auto',
    right: 0,
    left: 0,
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
