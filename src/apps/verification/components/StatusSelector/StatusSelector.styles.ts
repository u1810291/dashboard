import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
    borderRadius: 5,
    overflow: 'initial',
    cursor: 'pointer',
  },
  title: {
    paddingRight: 20,
    fontSize: 21,
    lineHeight: 1.4,
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: '50%',
    fontSize: 20,
    transform: 'translateY(-50%)',
    transition: '.2s all ease-in-out',
  },
  iconOpen: {
    transform: 'translateY(-50%) rotate(180deg)',
  },
  openItems: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    backgroundColor: theme.palette.common.white,
  },
  item: {
    cursor: 'pointer',
    transition: '.2s all ease-in-out',
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.black7,
    },
  },
  itemNotChangeable: {
    cursor: 'auto',
    '&.MuiGrid-item': {
      paddingLeft: 36,
    },
  },
  itemIconWrapper: {
    position: 'relative',
    flexShrink: 0,
    margin: '2px 10px 0 0',
    width: 16,
    height: 16,
    borderRadius: '50%',
    border: `1px solid ${theme.palette.text.main}`,
  },
  itemIcon: {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 10,
    height: 10,
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
  },
  text: {
    fontSize: 12,
    color: theme.palette.text.main,
  },
}));
