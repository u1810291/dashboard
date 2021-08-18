import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: 700,
    '& > main': {
      minHeight: 490,
    },
  },
  leftGrid: {
    display: 'block',
  },
  title: {
    marginBottom: '40px',
  },
  switcher: {
    '&>span.MuiButtonBase-root': {
      minHeight: 0,
    },
  },
  borderedContent: {
    border: `1px solid ${theme.palette.common.black50}`,
    borderRadius: '5px',
    padding: '20px !important',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    padding: '10px',
    marginBottom: '20px',
  },
  button: {
    width: '100%',
  },
  secondCaption: {
    marginBottom: '6px',
  },
  descriptionHolder: {
    marginBottom: '20px',
  },
  contactButtonHolder: {
    display: 'inline-block',
    verticalAlign: 'top',
    borderRadius: '6px',
    border: `1px solid ${theme.palette.common.lightblue}`,
    height: '50px',
    width: '200px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  contactButtonHolderNoAdvancedValidation: {
    marginBottom: '135px',
    display: 'inline-block',
    verticalAlign: 'top',
    borderRadius: '6px',
    border: `1px solid ${theme.palette.common.lightblue}`,
    height: '50px',
    width: '200px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  uploadIcon: {
    marginRight: '12px',
    verticalAlign: 'baseline',
  },
  description: {
    color: theme.palette.common.black75,
  },
  switcherRow: {
    alignItems: 'center',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  switcherRowHolder: {
    marginBottom: '20px',
  },
  switcherRowHolderSubItem: {
    marginLeft: '20px',
    position: 'relative',
    '&::before': {
      position: 'absolute',
      display: 'block',
      content: '""',
      left: '-20px',
      top: '18px',
      width: '20px',
      height: '1px',
      background: theme.palette.common.black7,
    },
    '&::after': {
      position: 'absolute',
      display: 'block',
      content: '""',
      left: '-20px',
      top: '-22px',
      width: '1px',
      height: '40px',
      background: theme.palette.common.black7,
    },
  },
  settingRowHolder: {
    marginBottom: '20px',
    '&:last-child': {
      marginBottom: 0,
    },
  },
  settingButton: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px',
    border: `1px solid ${theme.palette.common.lightblue}`,
    color: theme.palette.common.lightblue,
    minHeight: '0 !important',
    height: '27px',
  },
  settingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  settingsIcon: {
    marginRight: '3px',
    display: 'inline-block',
  },
  tag: {
    backgroundColor: theme.palette.common.whiteblue,
    borderRadius: '5px',
    color: theme.palette.common.lightblue,
    display: 'inline-block',
    verticalAlign: 'top',
    padding: '6px 10px',
    marginRight: '10px',
    height: '30px',
  },
  chevronLeft: {
    marginRight: '7px',
  },
}));
