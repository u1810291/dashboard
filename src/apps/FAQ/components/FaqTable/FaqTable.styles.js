import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  answerTable: {
    border: [[1, 'solid', theme.palette.text.main]],
    borderRadius: 10,
    marginTop: 10,
  },
  tableHeader: {
    color: theme.palette.text.main,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  tableRow: {
    color: theme.palette.text.main,
    paddingLeft: 20,
    paddingTop: 8,
    paddingBottom: 6,
  },
  withTopBorder: {
    borderTop: [[1, 'solid', theme.palette.text.main]],
  },
  withLeftBorder: {
    borderLeft: [[1, 'solid', theme.palette.text.main]],
  },
}));
