import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../pdf/PDF.theme.common';

export const useStyles = (isFlowBuilder: boolean = false) => (makeStyles((theme) => ({
  wrapper: isFlowBuilder ? {
    [theme.breakpoints.down('xl')]: {
      '& > *': {
        minWidth: '100%',
      },
    },
  } : {
    [theme.breakpoints.up('lg')]: {
      '& > *': {
        flexBasis: 'calc(33.33% - 20px)',
        marginRight: 20,
        '&:last-of-type': {
          marginRight: 0,
        },
      },
    },
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.palette.text.main,
    marginBottom: '19px',
  },
  imagesWrapper: {
    marginBottom: 20,
    [theme.breakpoints.up('lg')]: {
      marginBottom: 0,
    },
  },
  images: {
    height: '100%',
    padding: 20,
    borderRadius: 5,
    backgroundColor: theme.palette.foreground.main,
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  image: {
    width: '100%',
    textAlign: 'center',
    [theme.breakpoints.up('lg')]: {
      '& > div': {
        maxHeight: 320,
      },
      '& img': {
        maxHeight: 320,
      },
    },
    '& img': {
      margin: [[0, 'auto']],
      objectFit: 'cover',
      borderRadius: 5,
    },
  },
  itemWrapper: {
    marginBottom: 20,
    '&:last-of-type': {
      marginBottom: 0,
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: 0,
      padding: [[20, 15]],
      borderRadius: 5,
      border: `1px solid ${theme.palette.foreground.main}`,
    },
  },
  borderBox: {
    width: '300px',
    display: 'flex',
    padding: '23px',
    border: '1px solid #EDF0F5',
    borderRadius: 5,
    color: theme.palette.text.main,
    marginBottom: '19px',
    align: 'start',
    justifyContent: 'flex-start',
  },
  icon: {
    color: theme.palette.common.green,
    width: '22px',
    height: '22px',
    marginRight: '10px',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black75,
    width: '100%',
  },
  name: {
    fontSize: '14px',
    fontWeight: 'normal',
    marginBottom: '10px',
  },
  uploadIcon: {
    marginRight: '10px',
    height: '17px',
    width: '17px',
    verticalAlign: 'middle',
  },
  downloadButton: {
    height: '45px',
    padding: '11px 40px',
    borderRadius: '5px',
    marginTop: '20px',
    border: '1px solid #507DED',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}))());
