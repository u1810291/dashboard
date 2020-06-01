import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  countryItem: {
    color: 'var(--mgi-theme-palette-blue)',
    backgroundColor: 'var(--mgi-theme-palette-lighterblue)',
    border: 'none',
    padding: [['0.7rem', '1.2rem']],
    borderRadius: 4,
    fontSize: '1rem',
    '&:focus': {
      outline: 'none',
    },
  },
  action: {
    border: 'none',
    color: 'var(--mgi-theme-palette-blue)',
    textDecoration: 'underline',
    marginLeft: 0,
    paddingLeft: 0,
  },
  description: {
    margin: [[10, 20, 40, 0]],
  },
}));
