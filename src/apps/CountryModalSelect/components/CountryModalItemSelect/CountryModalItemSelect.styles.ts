import { Checkbox } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: '5px 0',
  },
  listItemChild: {
    marginLeft: 85,
  },
  listName: {
    width: 150,
    fontWeight: 700,
    color: theme.palette.text.main,
  },
  listNameChild: {
    width: 210,
    fontWeight: 400,

    '&:before': {
      content: '""',
      display: 'block',
      width: 38,
      height: 1,
      position: 'absolute',
      left: -38,
      top: 'calc(50% - 1px)',
      background: theme.palette.common.black7,
    },
    '&:after': {
      content: '""',
      display: 'block',
      left: -40,
      width: 1,
      height: 30,
      position: 'absolute',
      top: 0,
      background: theme.palette.common.black7,
    },
  },
  iconButton: {
    cursor: 'pointer',
    display: 'flex',
  },
  icon: {
    width: 20,
    height: 20,
    background: '#fff',
    position: 'relative',
    stroke: theme.palette.text.main,
  },
}));

export const StyledCheckbox = withStyles(() => ({
  root: {
    padding: 0,
    minHeight: '0 !important',
  },
}))(Checkbox);
