import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  page: {
    height: 42,
    lineHeight: '42px',
    width: 42,
    border: [[1, 'solid', 'var(--mgi-theme-palette-lightgray)']],
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'white',
    cursor: 'pointer',
    '& a': {
      color: 'var(--mgi-theme-palette-black)',
      padding: [[10, 12]],
      '&:focus': {
        outline: 'none',
      },
    },
    '&:first-child': {
      borderRadius: [[4, 0, 0, 4]],
    },
    '&:last-child': {
      borderRadius: [[0, 4, 4, 0]],
    },
    '&+&': {
      borderLeft: 'none',
    },
  },
  activePage: {
    background: 'rgba(233, 233, 233, 0.5)',
  },
  prevNextPage: {
    width: 'auto',
    '&.disabled a': {
      color: 'var(--mgi-theme-palette-lightgray)',
    },
  },
}));
