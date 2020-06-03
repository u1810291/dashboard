import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  datePicker: {
    '& .CalendarMonth_caption': {
      paddingBottom: 50,
    },
    '& .DateInput': {
      width: 115,
    },
    '& .DateInput_input': {
      fontSize: 16,
    },
  },
}));
