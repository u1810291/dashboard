import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  cardBox: {
    width: 466,
  },
  mtTable: {
    borderCollapse: 'collapse',
    borderSpacing: 0,
    color: 'var(--mgi-theme-palette-lightgray)',
    '& td': {
      height: 50,
      border: [[1, 'solid', 'var(--mgi-theme-palette-lightgray)']],
      padding: 10,
      fontWeight: 400,
      color: 'rgba(36, 36, 36, 0.5)',
      verticalAlign: 'top',
    },
    '& td.col-00': {
      width: '30%',
      fontWeight: 600,
      whiteSpace: 'nowrap',
      color: 'var(--mgi-theme-palette-lightgreen)',
    },
    '& td.col-10': {
      width: '30%',
      fontWeight: 600,
      whiteSpace: 'nowrap',
      color: 'var(--mgi-theme-palette-red)',
    },
  },
}));
