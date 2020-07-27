import { makeStyles } from '@material-ui/core/styles';
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
  phone: {
    '& > .iti': {
      display: 'grid',
      height: 53,
    },
    '& input': {
      outline: 'none',
      borderRadius: 4,
      border: '1px solid #bbb',
    },
  },
}));
