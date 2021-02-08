import { makeStyles } from '@material-ui/core/styles';
import { appPalette } from 'apps/theme/app.palette';

export const useStyles = makeStyles(() => ({
  badge: {
    display: 'flex',
    alignItems: 'center',
    padding: [[0, 20]],
    backgroundColor: appPalette.black90,
    height: 40,
    width: 280,
    borderRadius: 5,
  },
  logo: {
    marginRight: 15,
  },
  statusMessage: (props) => ({
    color: props.textColor,
  }),

}));
