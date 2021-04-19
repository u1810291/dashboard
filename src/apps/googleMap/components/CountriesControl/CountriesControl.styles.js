import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  countriesControlWrapper: {
    width: 'calc(100% - 30px)',
    maxHeight: 440,
    margin: [[0, 15]],
    padding: [[6, 10, 10]],
    borderRadius: 5,
    backgroundColor: 'rgba(35, 41, 57, 0.8)',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      height: 5,
      width: 5,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 5,
      backgroundColor: 'rgba(237, 240, 245, 0.2)',
    },
    [theme.breakpoints.up('md')]: {
      width: 270,
      maxHeight: 460,
      margin: 20,
    },
  },
  countriesControl: {
    position: 'relative',
    marginTop: 4,
    padding: [[6, 10]],
    borderRadius: 5,
    wordBreak: 'break-word',
    cursor: 'pointer',
    transition: '.2s all ease-in-out',
    '&:hover, &:focus': {
      backgroundColor: 'rgba(35, 41, 57, 0.6)',
    },
  },
  countriesControlActive: {
    borderRadius: 5,
    backgroundColor: 'rgba(35, 41, 57, 0.6)',
  },
  countriesArrow: {
    position: 'absolute',
    right: 10,
    top: 6,
    width: 17,
    height: 17,
    marginLeft: 10,
    fontSize: 17,
    transition: '.2s all ease-in-out',
  },
  countriesArrowExpanded: {
    transform: 'rotate(180deg)',
  },
  countriesCities: {
    padding: [[6, 10]],
    wordBreak: 'break-word',
    '&:last-child': {
      padding: [[6, 10, 2]],
    },
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 'auto',
    width: 50,
    height: 50,
    margin: [[32, 10, 32, 'auto']],
    borderRadius: 5,
    fontSize: 17,
    color: theme.palette.common.black7,
    backgroundColor: theme.palette.text.secondary,
    '&:hover, &:focus': {
      backgroundColor: 'rgba(35, 41, 57, 0.6)',
    },
  },
  buttonClose: {
    display: 'flex',
    minWidth: 'auto',
    width: 30,
    height: 30,
    marginLeft: 'auto',
    fontSize: 15,
    color: theme.palette.text.secondary,
  },
}));
