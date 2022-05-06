import { makeStyles } from '@material-ui/core/styles';
import { appPalette } from 'apps/theme';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.isDarkMode ? theme.breakpoints.up('lg') : theme.breakpoints.up('xl')]: {
      '& > *': {
        flexBasis: 'calc(33.33% - 10px)',
        '&:last-of-type': {
          marginRight: 0,
        },
      },
    },
  },
  itemWrapper: {
    marginBottom: 16,
    padding: 20,
    borderRadius: 5,
    maxWidth: '100%',
    border: `1px solid ${theme.palette.foreground.main}`,
    '&:last-of-type': {
      marginBottom: 0,
    },
    [theme.isDarkMode ? theme.breakpoints.up('lg') : theme.breakpoints.up('xl')]: {
      marginBottom: 0,
    },
    [theme.breakpoints.up('md') && theme.breakpoints.down('lg')]: {
      maxWidth: 'calc(50% - 5px)',
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },
  cardTitle: {
    width: '100%',
    fontWeight: 600,
    fontSize: '14px',
    borderBottom: `1px solid ${theme.palette.foreground.main}`,
    lineHeight: '16.6px',
    paddingBottom: '14px',
    color: appPalette.black75,
  },
  cardContent: {
    marginTop: '12px',
    marginBottom: 0,
  },
  itemLocationWrapper: {
    ...(theme.isDarkMode && ({
      [theme.breakpoints.up('lg')]: {
        '& > *': {
          flexBasis: '100%',
          maxWidth: '100%',
        },
      },
    })),
  },
  title: {
    lineHeight: '1.1',
    color: theme.palette.text.main,
    marginBottom: 4,
  },
  map: {
    marginBottom: 36,
    borderRadius: 5,
    backgroundColor: theme.palette.foreground.main,
    [theme.isDarkMode ? theme.breakpoints.up('lg') : theme.breakpoints.up('xl')]: {
      marginBottom: 0,
    },
    '& > img': {
      borderRadius: 5,
      maxHeight: '100%',
    },
  },
  markerMap: {
    width: '100%',
    height: 300,
    [theme.breakpoints.down('lg')]: {
      height: 300,
    },
    [theme.breakpoints.down('md')]: {
      height: 400,
    },
  },
  data: {
    fontSize: 16,
    lineHeight: 1.2,
    color: theme.palette.text.secondary,
    marginBottom: 6,
  },
}));
