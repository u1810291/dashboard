import { FormControlLabel, makeStyles, Radio, withStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  optionImage: {
    flexGrow: 1,
  },
}));

export const FormControlLabelFixed = withStyles({
  root: {
    alignItems: 'flex-start',
  },
})(FormControlLabel);

export const RadioFixed = withStyles({
  root: {
    marginTop: -9,
    marginBottom: -9,
  },
})(Radio);
