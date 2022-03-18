import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  appliedFilters: {
    fontSize: 12,
    fontWeight: 400,
    color: theme.palette.common.black75,
    marginRight: 11,
  },
  resetFilters: {
    fontSize: 12,
    fontWeight: 400,
    color: theme.palette.common.lightblue,
    cursor: 'pointer',
  },
  chipContainer: {
    '&:last-child': {
      marginRight: 0,
    },
  },
  chip: {
    maxHeight: 22,
    fontSize: 10,
    fontWeight: 400,
    paddingLeft: 11,
    paddingRight: 11,
    marginRight: 13,
    marginBottom: 5,
    borderRadius: 12,
    border: 'none',
    boxShadow: `0px 4px 4px ${theme.palette.common.lightgrayopacity}`,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black75,
    cursor: 'pointer',
    '& .MuiChip-deleteIcon': {
      width: 15,
      height: 15,
      marginLeft: 2,
      color: theme.palette.common.black75,
    },
  },
}));
