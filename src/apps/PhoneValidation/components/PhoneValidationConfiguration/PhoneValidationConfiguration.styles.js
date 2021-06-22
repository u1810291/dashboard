import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: '100%',
  },
  itemMargin: {
    marginBottom: 40,
  },
  itemPadding: {
    '&.MuiGrid-item': {
      paddingBottom: 0,
    },
  },
  itemPaddingSubTitle: {
    '&.MuiGrid-item': {
      paddingTop: 0,
    },
  },
  buttonContainer: {
    marginTop: 20,
  },
}));
