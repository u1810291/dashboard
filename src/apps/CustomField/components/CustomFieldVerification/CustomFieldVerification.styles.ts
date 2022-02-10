import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  root: {
    '@media (min-width: 1440px) and (max-width: 1919px)': {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    ...(theme.isDarkMode && ({
      '@media (min-width: 1280px) and (max-width: 1919px)': {
        flexBasis: '50%',
        maxWidth: '50%',
      },
    })),
  },
}));
