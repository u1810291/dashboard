import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  restriction: {
    padding: '16px 20px',
    border: [[1, 'solid', 'var(--mgi-theme-palette-lightgray)']],
    borderRadius: 4,
  },
  restrictionLabel: {
    color: '#8392B8',
    fontWeight: 700,
    flex: 1,
  },
  restrictionHint: {
    color: '#8392B8',
  },
}));
