import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    border: 0,
    padding: 0,
    margin: 0,
  },
  checkboxGroupLabel: {
    marginBottom: '0.875rem',
    fontSize: 14,
    lineHeight: 15,
    fontWeight: 600,
    letterSpacing: 0.5,
    padding: 0,
    color: 'var(--mgi-theme-palette-default)',
  },
  checkboxGroupItem: {
    '&:not(:last-child)': {
      marginBottom: 'var(--mgi-spacing-l)',
    },
  },
}));
