import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  summary: {
    // --mgi-details-handle-height: 4px;
    cursor: 'pointer',
    position: 'relative',
    paddingRight: 'calc(1em + 8px)',
    '&::before': {
      display: 'block',
      content: ' ',
      position: 'absolute',
      width: 0,
      height: 0,
      top: '50%',
      marginTop: -2,
      right: 0,
      borderStyle: 'solid',
      borderWidth: [[4, 4, 0, 4]],
      borderColor: [['var(--mgi-theme-palette-gray)', 'transparent', 'transparent', 'transparent']],
    },
    '&:.opened': {
      '&::after': {
        borderWidth: [[0, 4, 4, 4]],
        borderColor: [['transparent', 'transparent', 'var(--mgi-theme-palette-gray)', 'transparent']],
      },
    },
  },
}));
