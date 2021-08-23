import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  label: {
    fontSize: 16,
  },
  value: {
    padding: 8,
    border: '1px solid var(--mgi-theme-palette-lightgray)',
    '& + &': {
      marginTop: -1,
    },
    '&:first-child': {
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
    '&:last-child': {
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
    },
  },
}));
