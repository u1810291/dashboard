import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  calendarWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  calendar: {
    minWidth: 500,
    [theme.breakpoints.down('sm')]: {
      order: 2,
      minWidth: 260,
    },
    '& .DayPicker-wrapper': {
      paddingBottom: 20,
      '&:focus': {
        outline: 'none',
      },
    },
    '& .DayPicker': {
      width: '100%',
    },
    '& .DayPicker-Caption': {
      textAlign: 'center',
      color: theme.palette.common.black75,
    },
    '& .DayPicker-Caption > div': {
      fontSize: 14,
      lineHeight: 1,
      fontWeight: 'bold',
    },
    '& .DayPicker-Weekday': {
      fontSize: 13,
      fontWeight: 'bold',
      color: theme.palette.common.black75,
    },
    '& .DayPicker-Day': {
      fontSize: 13,
      color: theme.palette.common.black75,
      borderRadius: 0,
      padding: '0.65em',
      [theme.breakpoints.down('sm')]: {
        padding: '0.8em',
      },
    },
    '& .DayPicker-Day:focus': {
      outline: 'none',
      border: 'none',
    },
    '& .DayPicker-Day--outside': {
      color: theme.palette.common.black50,
    },
    '& .DayPicker-Months': {
      justifyContent: 'space-between',
    },
    '& .DayPicker-Month': {
      margin: [[20, 0, 0]],
      borderSpacing: '0 5px',
      borderCollapse: 'separate',
    },
    '& .DayPicker-Day--disabled': {
      color: theme.palette.common.black7,
    },
    '& .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside)': {
      backgroundColor: theme.palette.common.black7,
      color: theme.palette.common.black75,
    },
    '& .DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover': {
      backgroundColor: theme.palette.common.black7,
      color: theme.palette.common.black75,
    },
    '& .DayPicker-Day--selected.DayPicker-Day--start:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside)': {
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: theme.palette.common.lightblue,
      color: theme.palette.common.black7,
    },
    '& .DayPicker-Day--selected.DayPicker-Day--end:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside)': {
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
      backgroundColor: theme.palette.common.lightblue,
      color: theme.palette.common.black7,
    },
    '& .DayPicker-NavButton': {
      top: 21,
      width: 8,
      height: 8,
      borderStyle: 'solid',
      borderColor: theme.palette.common.black75,
      borderWidth: '0 1px 1px 0',
      padding: 3,
      background: 'none',
      outline: 'none',
    },
    '& .DayPicker-NavButton--prev': {
      left: 5,
      transform: 'rotate(135deg)',
    },
    '& .DayPicker-NavButton--next': {
      right: 5,
      transform: 'rotate(-45deg)',
      [theme.breakpoints.down('sm')]: {
        top: 346,
      },
    },
  },
  period: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 5,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingBottom: 15,
    },
    '& .MuiButton-root': {
      minHeight: 28,
      padding: [[3, 22]],
      borderRadius: 40,
      justifyContent: 'flex-start',
      color: theme.palette.common.black75,
      transition: 'none',
      [theme.breakpoints.down('sm')]: {
        padding: [[3, 7]],
      },
    },
    '& .MuiButton-root:hover': {
      backgroundColor: theme.palette.common.lightblue,
      color: theme.palette.common.black7,
    },
    '& .MuiButton-root.selected': {
      backgroundColor: theme.palette.common.lightblue,
      color: theme.palette.common.black7,
    },
  },
  range: {
    [theme.breakpoints.up('md')]: {
      flexWrap: 'nowrap',
    },
    '& .MuiSelect-icon': {
      top: 'auto',
      right: 5,
      height: 16,
      width: 16,
    },
    '& .MuiSelect-iconOpen': {
      transform: 'rotate(180deg)',
    },
    '& .MuiInputBase-input': {
      display: 'flex',
      alignItems: 'center',
      minWidth: 60,
      padding: [[5, 5, 5, 10]],
      borderRadius: 30,
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.palette.common.black90,
      backgroundColor: theme.palette.common.whiteblue,
    },
  },
  rangeItem: {
    color: theme.palette.common.black90,
    [theme.breakpoints.down('sm')]: {
      '&:first-child': {
        marginBottom: 10,
      },
    },
    [theme.breakpoints.up('md')]: {
      width: 'auto',
    },
  },
  rangeDivider: {
    width: 10,
    height: 1,
    margin: [[0, 15]],
    backgroundColor: theme.palette.common.black90,
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
  rangeSelect: {
    '& .MuiMenu-list': {
      maxHeight: 240,
      overflowY: 'auto',
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
  },
  rangeSelectItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.palette.common.black90,
    '&.Mui-selected': {
      backgroundColor: theme.palette.common.whiteblue,
    },
  },
}));
