
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  // :root {
  //   --mgi-table-row-height: 50px;
  // }
  wrapper: {
    width: '100%',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    '& td, th': {
      height: 50,
      verticalAlign: 'middle',
      padding: [[0, 'var(--mgi-spacing)']],
      '&.mgi-data-table_align-right': {
        textAlign: 'right',
      },
      '&.mgi-data-table_align-center': {
        textAlign: 'center',
      },
    },
    '& td': {
      '&.mgi-data-table_align-right': {
        textAlign: 'right',
      },
      '&.mgi-data-table_align-center': {
        textAlign: 'center',
      },
    },
    '& thead tr, tbody tr:not(:last-of-type)': {
      borderBottom: [[1, 'solid', 'var(--mgi-theme-palette-lightgray)']],
    },
    '& thead': {
      '& th': {
        textAlign: 'left',
        fontWeight: 600,
        height: 37.5,
      },
    },
    '& tbody': {
      '& tr:hover': {
        backgroundColor: 'var(--mgi-theme-palette-lightergray)',
      },
    },
  },
  borderAround: {
    border: [[1, 'solid', 'var(--mgi-theme-palette-lightgray)']],
    '& td, th': {
      '&:not(:last-child)': {
        borderRight: [[1, 'solid', 'var(--mgi-theme-palette-lightgray)']],
      },
    },
    '& thead th': {
      height: 50,
      background: 'var(--mgi-theme-palette-lightergray)',
    },
  },
  clickable: {
    cursor: 'pointer',
    '& label': {
      cursor: 'pointer',
    },
  },
  tableEmptyBody: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 360,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.125rem',
    color: 'var(--mgi-theme-palette-secondary)',
  },
}));
