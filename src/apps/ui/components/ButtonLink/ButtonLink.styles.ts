import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  buttonLink: {
    height: '100%',
    minHeight: 50,
    fontWeight: 'bold',
    fontSize: 14,
    color: theme.palette.text.main,
    borderColor: theme.palette.common.black7,
    '& svg': {
      marginLeft: 10,
      fontSize: 17,
    },
  },
}));
