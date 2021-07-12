import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme, { color?: string }>((theme) => ({
  root: {
    borderRadius: 4,
    border: `1px solid ${theme.palette.common.black7}`,
    height: 112,
    padding: '10px 6px',
    display: 'flex',
    [theme.breakpoints.up('xl')]: {
      height: 125,
      padding: 15,
    },
  },
  checksWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 -5px',
  },
  colorPicker: {
    position: 'absolute',
  },
  colorPickerContainer: {
    width: 112,
    height: 90,
    border: `1px solid ${theme.palette.common.black7}`,
    padding: 8,
    borderRadius: 5,
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    cursor: 'pointer',
  },
  colorPickerWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  colorPickerButton: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
  selectedColor: ({ color }) => ({
    width: 30,
    height: 30,
    background: color,
    borderRadius: '50%',
    margin: '0 auto',
    marginBottom: 10,
  }),
}));
