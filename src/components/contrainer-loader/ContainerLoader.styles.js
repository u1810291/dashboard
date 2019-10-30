import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  icon: {
    fontSize: theme.typography.h1.fontSize,
    color: grey['500'],
  },
}));
