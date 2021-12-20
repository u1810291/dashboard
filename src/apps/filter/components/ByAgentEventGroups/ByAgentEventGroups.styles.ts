import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  eventTypesList: {
    height: 200,
    overflowY: 'auto',
    padding: '20px 20px 5px',
    boxShadow: 'none',
    borderRadius: 3,
    border: `1px solid ${theme.palette.common.black7}`,
    wordBreak: 'break-word',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      height: 5,
      width: 5,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.common.black7,
      borderRadius: 10,
    },
  },
}));
