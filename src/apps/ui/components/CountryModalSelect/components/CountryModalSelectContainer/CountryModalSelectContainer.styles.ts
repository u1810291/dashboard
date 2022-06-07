import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  modal: {
    width: 400,
    height: 640,
    maxHeight: 'none',
  },
  modalTitle: {
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  modalSubTitle: {
    maxWidth: 'initial',
    textAlign: 'left',
    color: theme.palette.text.main,
  },
}));
