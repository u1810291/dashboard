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
    justifyContent: 'space-between',
  },
  inputsColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputLabelAndField: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputLabel: {
    display: 'inline-block',
    fontSize: '16px',
    color: theme.palette.common.slategray,
    whiteSpace: 'nowrap',
    flexGrow: 0,
  },
  smallInput: {
    height: '38px',
    '& .MuiInputBase-formControl': {
      height: '38px',
    },
    width: '317px',
  },
  textArea: {
    width: '100%',
    padding: '10px',
    fontFamily: 'Lato',
    lineHeight: '17px',
    borderColor: theme.palette.common.black75,
    borderRadius: '5px',
    resize: 'none',
    '&::placeholder': {
      color: theme.palette.common.black50,
    },
    '&.focus-visible': {
      border: `1px solid ${theme.palette.common.lightblue}`,
      outline: 'none',
    },
    '&:hover': {
      border: `1px solid ${theme.palette.common.lightblue}`,
    },
  },
  saveTemplateButtonContainer: {
    display: 'flex',
    justifyContent: 'end',
  },
  buttonSave: {
    width: 258,
    height: 50,
  },
  select: {
    minHeight: 38,
    maxHeight: 38,
    borderRadius: 4,
    border: `1px solid ${theme.palette.common.black75}`,
    width: '317px',
    maxWidth: '70%',
    padding: '0 22px 0 10px',
    color: theme.palette.common.black75,
    '&:hover': {
      cursor: 'pointer',
      borderColor: theme.palette.common.lightblue,
    },
    input: {
      display: 'none',
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: theme.palette.common.white,
    },
    '& .MuiOutlinedInput-input': {
      display: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.common.black75,
    },
    '& .MuiSelect-icon': {
      marginTop: 3,
      fontSize: 17,
      right: 12,
      color: theme.palette.common.black75,
    },
  },
  dropdownMenu: {
    width: '317px',
  },
  dropdownMenuPaper: {
    width: '94%',
    maxWidth: 'unset',
    marginLeft: '-10px',
    marginTop: '8px',
  },
  menuItem: {
    '&.Mui-selected': {
      backgroundColor: 'unset !important',
    },
  },
  chip: {
    height: 22,
    marginRight: 4,
  },
  selectHelperText: {
    position: 'absolute',
    color: theme.palette.common.red,
    fontSize: 14,
    marginRight: 188,
    marginTop: 60,
  },
  selectError: {
    border: `1px solid ${theme.palette.common.red}`,
  },
  textAreaHelperText: {
    position: 'absolute',
    color: theme.palette.common.red,
    fontSize: 14,
  },
}));
