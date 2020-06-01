import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  content: {
    padding: [[20, 20, 20, 0]],
    minHeight: 435,
    minWidth: 640,
  },
  list: {
    width: 225,
    marginRight: 20,
    '& li': {
      display: 'flex',
      width: 225,
      height: 43,
      paddingLeft: 20,
      cursor: 'pointer',
      borderRadius: [[0, 4, 4, 0]],
      marginBottom: 3,
      userSelect: 'none',
      '&.active': {
        backgroundColor: 'var(--mgi-theme-palette-lightergray)',
        fontWeight: 600,
        '& svg': {
          strokeWidth: 2,
          color: 'var(--mgi-theme-palette-blue)',
        },
      },
      '&:hover': {
        backgroundColor: 'var(--mgi-theme-palette-lightergray)',
      },
      '& svg': {
        marginRight: 12,
      },
    },
  },
}));
