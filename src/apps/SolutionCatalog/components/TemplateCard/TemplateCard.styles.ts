import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  templateCardTitle: {
    fontSize: 18,
    fontWeight: 400,
  },
  description: {
    fontWeight: 400,
    color: theme.palette.common.black75,
  },
  descriptionContainer: {
    height: '42px',
    lineHeight: '14px',
    fontSize: 12,
    marginTop: '3px',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    textOverflow: 'ellipsis',
  },
  templateCard: {
    width: '220px',
    height: '156px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    position: 'relative',
  },
  selected: {
    border: '1,5px solid #507DED',
  },
  selectButton: {
    cursor: 'pointer',
    minWidth: '64px',
    minHeight: '25px !important',
    maxWidth: '64px',
    maxHeight: '25px',
    marginTop: '15px',
    background: '#507DED',
    border: '1.5px solid #507DED',
    boxSizing: 'border-box',
    borderRadius: '12.5px',
  },
  arrow: {
    color: theme.palette.common.black,
    left: '10px !important',
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    borderRadius: '6px',
    left: '50%',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    color: '#FFFFFF',
    width: '220px',
  },
}));
