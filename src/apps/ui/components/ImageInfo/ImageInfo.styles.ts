import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  imageInfo: {
    display: 'flex',
  },
  image: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
  },
  description: {
    marginLeft: '10px',
  },
  title: {
    fontSize: '18px',
    lineHeight: '22px',
    marginBottom: '5px',
    color: theme.palette.text.secondary,
  },
  text: {
    fontSize: '14px',
    lineHeight: '17px',
    // @ts-ignore
    color: theme.palette.text.main,
  },
}));
