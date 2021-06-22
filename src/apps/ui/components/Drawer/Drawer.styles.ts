import { withStyles, makeStyles, Drawer } from '@material-ui/core';

export const StyledDrawer = withStyles(() => ({
  root: {
    height: 0,
    width: 0,
  },
  paper: {
    maxWidth: '340px',
    marginRight: '35px',
    background: '#fff',
    borderRadius: '10px',
    padding: '20px',
    height: 'calc(100% - 40px - 144px)',
    marginTop: '144px',
    overflow: 'hidden',
  },
}))(Drawer);

export const useStyles = makeStyles((theme) => ({
  drawer: {
    maxWidth: '340px',
  },
  title: {
    marginBottom: '20px',
  },
  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    width: '20px',
    height: '20px',
    // @ts-ignore
    color: theme.palette.button.close.main,
  },
}));
