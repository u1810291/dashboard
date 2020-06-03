import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  addLogo: {
    height: 250,
    width: 305,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: [[0, 20]],
    wordBreak: 'break-all',
    whiteSpace: 'normal',
    borderRadius: 4,
    border: [[1, 'solid', 'var(--mgi-theme-palette-blue)']],
    color: 'var(--mgi-theme-palette-blue)',
    cursor: 'pointer',
    outline: 'none',

    '&.hasntLogo': {
      height: 60,
      borderImageSource: 'url("./button-border-image.svg")',
      borderImageSlice: [[0, 0, 0, 0, 'fill']],
      borderImageWidth: [[0, 0, 0, 0]],
      borderImageOutset: [[0, 0, 0, 0]],
      borderImageRepeat: [['stretch', 'stretch']],
      background: 'transparent',
    },
  },
  logoPreview: {
    maxWidth: 230,
    maxHeight: 190,
    backgroundSize: 'cover',
    width: 'auto',
    height: 'auto',
  },
  logoText: {
    width: '100%',
    wordBreak: 'break-all',
  },
}));
