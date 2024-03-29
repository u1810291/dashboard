import { makeStyles, Theme } from '@material-ui/core/styles';
import { appPalette } from 'apps/theme';

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    marginTop: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      paddingBottom: 10,
    },
    borderBottom: `1px solid ${theme.palette.common.black7}`,
  },
  wrapperWithPadding: {
    [theme.breakpoints.up('md')]: {
      paddingBottom: 10,
      paddingTop: 20,
      borderBottom: `1px solid ${theme.palette.common.black7}`,
    },
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  description: {
    fontSize: 14,
    color: theme.palette.text.main,
    marginBottom: theme.spacing(2),
  },
  switch: {
    color: `${appPalette.green} !important`,
  },
  dropdownMenu: {
    width: '317px',
  },
  dropdownMenuPaper: {
    width: '94%',
    maxWidth: '100%',
    marginTop: '8px',
  },
  input: {
    borderRadius: 4,
    fontSize: 16,
    width: '100%',
    opacity: '.5',
  },
}));
