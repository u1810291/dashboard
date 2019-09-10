import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import QuestionImage from 'assets/questions-bkg.jpg';

export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    background: `url(${QuestionImage}) no-repeat center center fixed`,
    backgroundSize: 'cover',
  },
  grid: {
    width: 300,
    margin: '36px 80px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      margin: '20px 10px',
    },
  },
  logo: {
    width: 90,
    marginBottom: 15,
  },
  radioGroup: {
    marginLeft: 20,
  },
}));

export const theme = createMuiTheme({
  spacing: 10,
  palette: {
    primary: {
      main: '#3757FF',
    },
  },
  typography: {
    fontFamily: ['Lato', 'Helvetica Neue', 'sans-serif'],
    h4: {
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 2,
    },
    subtitle1: {
      color: 'rgba(36, 36, 36, 0.5)',
      lineHeight: 1.3,
    },
  },
  props: {
    MuiTextField: {
      variant: 'outlined',
      fullWidth: true,
    },
    MuiButton: {
      variant: 'outlined',
      fullWidth: true,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        fontSize: 14,
        height: 50,
        textTransform: 'inherit',
      },
      outlined: {
        padding: 0,
      },
    },
  },
});
