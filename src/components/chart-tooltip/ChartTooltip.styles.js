import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  tooltip: {
    position: 'absolute',
    minWidth: 45,
    minHeight: 30,
    padding: [[7, 6]],
    borderRadius: 5,
    backgroundColor: theme.palette.common.black90,
    textAlign: 'center',
    color: theme.palette.common.black7,
    transform: 'translate(-50%, calc(-100% - 1rem))',
    boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.2)',
    fontSize: 14,
    whiteSpace: 'pre',
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: 0,
      height: 0,
      margin: 'auto',
      borderStyle: 'solid',
      borderColor: [[theme.palette.common.black90, 'transparent', 'transparent', 'transparent']],
      borderWidth: [[6, 5, 0, 5]],
      bottom: 1,
      left: '50%',
      transform: 'translate(-50%, 100%)',
    },
  },
}));
