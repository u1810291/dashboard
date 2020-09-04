import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  colWithIcon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
    flexWrap: 'nowrap',
  },
  footer: {
    marginTop: 20,
    color: theme.palette.common.black75,
  },
  icon: {
    marginLeft: 24,
    marginRight: 14,
    height: 28,
  },
  paper: {
    paddingTop: 14,
    marginBottom: 20,
    paddingBottom: 20,
  },
  section: {
    paddingLeft: 0,
  },
  sectionCaption: {
    color: theme.palette.common.black90,
    fontSize: '18px',
    fontWeight: 'bold',
  },
}));
