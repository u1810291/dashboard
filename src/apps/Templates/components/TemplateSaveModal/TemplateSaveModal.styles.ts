import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  modal: {
    width: '100%',
    minHeight: '50vh',
    backgroundColor: theme.palette.common.white,
    borderRadius: 10,
    padding: 0,
  },
  headerContainer: {
    height: '60px',
    borderBottom: `1.5px solid ${theme.palette.common.black7}`,
    paddingTop: 18,
    paddingLeft: 32,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 700,
  },
  inputsHeaderTitle: {
    color: theme.palette.common.black75,
    fontSize: 18,
  },
  inputsColumnsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  inputsColumn: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
  smallInput: {
    height: '38px',
    '& .MuiInputBase-formControl': {
      height: '38px',
    },
  },
  inputLabel: {
    display: 'inline-block',
    fontSize: '16px',
    color: theme.palette.common.slategray,
    whiteSpace: 'nowrap',
  },
  inputLabelAndField: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
