import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

export default makeStyles(() => ({
  formLabel: {
    '&:hover': {
      backgroundColor: grey[50],
    },
    paddingLeft: 15,
  },
}));
