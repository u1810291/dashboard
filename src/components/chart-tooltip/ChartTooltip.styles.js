import { makeStyles } from '@material-ui/core/styles';

const tooltipBG = '#3b4453';

export const useStyles = makeStyles(() => ({
  tooltip: {
    position: 'absolute',
    transform: 'translate(-50%, calc(-100% - 1rem))',
    padding: [['0.5rem', '0.75rem']],
    borderRadius: 4,
    backgroundColor: tooltipBG,
    color: 'var(--mgi-theme-palette-white)',
    boxShadow: [[0, 1, 4, 'rgba(0, 0, 0, 0.5)']],
    whiteSpace: 'pre',
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: 0,
      height: 0,
      margin: 'auto',
      borderStyle: 'solid',
      borderColor: [[tooltipBG, 'transparent', 'transparent', 'transparent']],
      borderWidth: [['0.5rem', '0.5rem', 0, '0.5rem']],
      bottom: 0,
      left: '50%',
      transform: 'translate(-50%, 100%)',
    },
  },
}));
