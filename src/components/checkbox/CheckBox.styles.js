import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  // :root {
  //   --mgi-checkbox-size: 1.125rem
  // }
  checkbox: {
    display: 'inline-block',
    '& input[type="checkbox"]': {
      display: 'none',
    },
    '& input[type="checkbox"]:checked + $checkboxIcon': {
      background: 'var(--mgi-theme-palette-blue)',
      borderColor: 'var(--mgi-theme-palette-blue)',
    },
    '& input[type="checkbox"]:disabled + $checkboxIcon': {
      background: 'var(--mgi-theme-palette-lightergray)',
    },
  },
  '.checkbox + .checkbox': {
    marginLeft: '2rem',
  },
  checkboxLabel: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    cursor: 'pointer',
  },
  checkboxTitle: {
    marginLeft: '0.8rem',
    lineHeight: 'var(--mgi-checkbox-size)',
  },
  checkboxIcon: {
    borderRadius: 2,
    border: [[1, 'solid', '#dfe6ee']],
    width: 18,
    height: 18,
    background: 'white',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    alignSelf: 'flex-start',
  },
}));
