import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  disabled: {
    opacity: 0.3,
    pointerEvents: 'none',
  },
  divider: {
    backgroundColor: theme.palette.common.black7opacity,
  },
  boxBordered: {
    borderColor: theme.palette.common.black7,
    backgroundColor: theme.palette.common.black7opacity,
  },
  countriesAmount: {
    color: theme.palette.text.main,
  },
  openCountriesButton: {
    width: '100%',
    marginBottom: 24,
  },
  productBlock: {
    marginTop: 25,
  },
}));
