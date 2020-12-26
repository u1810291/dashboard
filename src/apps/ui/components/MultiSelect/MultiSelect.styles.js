import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  multiSelect: {
    marginBottom: 'var(--mgi-spacing)',
  },
  select: {
    marginBottom: 'var(--mgi-spacing)',
  },
  valueItem: {
    position: 'relative',
    color: 'var(--mgi-theme-palette-blue)',
    backgroundColor: 'var(--mgi-theme-palette-lighterblue)',
    border: 'none',
    padding: [['0.7rem', '1.2rem']],
    borderRadius: 4,
    marginRight: 'var(--mgi-spacing-l)',
    marginBottom: 'var(--mgi-spacing)',
    fontSize: '1rem',
    '&:after': {
      content: '"\u2716"',
      fontSize: 10,
      display: 'block',
      position: 'absolute',
      right: 2,
      top: 2,
    },
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));
