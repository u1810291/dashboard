import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: {
    minHeight: 220,
    position: 'relative',
  },
  value: {
    fontWeight: 'bold',
  },
  bar: {
    width: 0,
    height: '1.75rem',
    backgroundColor: 'var(--mgi-theme-palette-violet)',
    borderRadius: [[0, 'var(--mgi-theme-border-radius)', 'var(--mgi-theme-border-radius)', 0]],
  },
  noDataLabel: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));
