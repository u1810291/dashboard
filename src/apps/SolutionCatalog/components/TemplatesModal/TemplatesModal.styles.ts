import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  modal: {
    width: '65vw',
    minHeight: '70vh',
    backgroundColor: theme.palette.common.black7,
    borderRadius: 5,
  },
  modalTitle: {
    fontWeight: 700,
    fontSize: 36,
  },
  modalSubtitle: {
    color: theme.palette.common.black75,
    fontWeight: 700,
    fontSize: 18,
  },
  galleryContainer: {
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    display: 'flex',
    scrollBehavior: 'smooth',
  },
  templateContainer: {
    display: 'inline-block',
    borderRadius: '5px',
    backgroundColor: theme.palette.common.white,
    filter: 'border: 1,5px solid rgba(80, 125, 237, 1)',
    minWidth: '220px',
    minHeight: '156px',
    maxWidth: '220px',
    maxHeight: '156px',
    marginRight: '16px',
  },
  templateCardTitle: {
    fontSize: 18,
    fontWeight: 400,
  },
  description: {
    fontSize: 12,
    fontWeight: 400,
    color: theme.palette.common.black75,
  },
  descriptionContainer: {
    height: '70px',
    overflow: 'hidden',
  },
  controlsContainer: {
    position: 'absolute',
    // pointerEvents: 'none',
    zIndex: 99999,
    width: '90%',
    height: '160px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navigationControl: {
    borderRadius: '60px',
    backgroundColor: theme.palette.common.lightblue,
    width: '51px',
    height: '51px',
    cursor: 'pointer',
  },
}));
