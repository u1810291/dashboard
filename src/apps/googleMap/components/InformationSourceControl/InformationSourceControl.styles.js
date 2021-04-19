import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  informationSource: {
    position: 'relative',
    margin: 20,
    color: theme.palette.common.black7,
  },
  informationIcon: {
    width: 38,
    height: 38,
    borderRadius: 5,
    fontSize: 17,
    backgroundColor: theme.palette.text.secondary,
    cursor: 'pointer',
    transition: '.2s all ease-in-out',
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.lightblue,
      '& + div': {
        opacity: 1,
        visibility: 'visible',
      },
    },
  },
  activeSourceIcon: {
    backgroundColor: theme.palette.common.lightblue,
  },
  informationText: {
    position: 'absolute',
    left: 48,
    top: '50%',
    padding: 8,
    fontSize: 12,
    whiteSpace: 'nowrap',
    borderRadius: 5,
    backgroundColor: theme.palette.text.secondary,
    opacity: 0,
    visibility: 'hidden',
    transform: 'translateY(-50%)',
    transition: '.2s all ease-in-out',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: -12,
      top: '50%',
      border: '6px solid transparent',
      borderRight: `6px solid ${theme.palette.text.secondary}`,
      transform: 'translateY(-50%)',
    },
  },
}));
