import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  sliderPointValue: {
    display: 'block',
    fontWeight: 'bold',
    color: theme.palette.common.black90,
    marginBottom: 3,
  },
  sliderPointText: {
    color: theme.palette.common.black75,
    position: 'absolute',
  },
  sliderPointFirst: {
    left: 0,
  },
  sliderPointMiddle: {
    left: 'calc(-100% / 2 - 4px)',
  },
  sliderPointLast: {
    right: 0,
  },
}));
