import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  root: ({ width }) => ({
    width,
    '& .MuiSkeleton-root': {
      maxWidth: '100%',
      borderRadius: 30,
      background: theme.palette.common.black7,
    },
    '& .MuiSkeleton-rect': {
      borderRadius: 5,
    },
    '& .MuiSkeleton-text': {
      borderRadius: 30,
      transform: 'scale(1)',
    },
  }),
}));
