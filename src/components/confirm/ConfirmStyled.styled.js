import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  modal: {
    width: 410,
    height: 235,
    minHeight: 'auto',
    '& header': {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'left',
      background: 'white',
    },
    '& main': {
      paddingTop: [[0], '!important'],
    },
    '& footer': {
      background: 'white',
      '& button': {
        fontWeight: [[400], '!important'],
        width: 170,
      },
    },
    '& header, footer, main': {
      padding: 20,
    },
  },
}));
