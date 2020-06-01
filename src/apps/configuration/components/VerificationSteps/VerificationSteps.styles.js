import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  verificationSteps: {
    '& .docWrapperMany, & .docWrapper': {
      '& .child': {
        width: 305,
        height: 49,
        border: [[1, 'solid', 'var(--mgi-theme-palette-lightgray)']],
        boxSizing: 'border-box',
        borderRadius: 4,
        '& span': {
          paddingLeft: 10,
          fontSize: 16,
          lineHeight: '49px',
          color: 'var(--mgi-theme-palette-darkergray)',
        },
      },
    },
    '& .docWrapperMany': {
      '& .child': {
        borderRadius: 0,
        borderBottom: 'none',
      },
      '& > div:first-child': {
        '& .child': {
          borderRadius: [[4, 4, 0, 0]],
        },
      },
      '& > div:last-child': {
        '& .child': {
          border: [[1, 'solid', 'var(--mgi-theme-palette-lightgray)']],
          borderRadius: [[0, 0, 4, 4]],
        },
      },
    },
  },
  verificationInfo: {
    marginTop: 20,
    '& > div:first-child': {
      marginTop: 40,
    },
  },
  docTitle: {
    marginBottom: 5,
    marginLeft: 0,
  },
  newStep: {
    border: 'none',
    color: 'var(--mgi-theme-palette-blue)',
    textDecoration: 'underline',
    marginLeft: 0,
    paddingLeft: 0,
  },
}));
