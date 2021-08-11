import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  arrow: {
    display: 'block',
    width: 15,
    height: 25,
    transform: 'translateY(-15px)',
    borderLeft: `1px solid ${theme.palette.common.black7}`,
    borderBottom: `1px solid ${theme.palette.common.black7}`,
  },
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
