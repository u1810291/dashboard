import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  droppableContainer: {
    padding: 10,
    border: `2px solid ${theme.palette.common.black7}`,
    display: ({ isDropDisabled }: {isDropDisabled: boolean}) => (isDropDisabled ? 'none' : 'unset'),
    '& > *': {
      paddingBottom: 10,
    },
  },
  mainDroppableContainer: {
    marginBottom: 10,
  },
}));
