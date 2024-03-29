import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  modal: {
    width: '65vw',
    padding: '20px 0 20px 20px',
    height: '75vh',
    backgroundColor: theme.palette.common.black7,
    borderRadius: 5,
    overflowY: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      height: 5,
      width: 5,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.common.black7,
      borderRadius: 10,
    },
    [theme.breakpoints.down(1080)]: {
      width: '85vw',
    },
  },
  modalTitle: {
    fontWeight: 700,
    fontSize: 36,
    marginBottom: 15,
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalHeaderLeft: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '50%',
  },
  modalHeaderRight: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '50%',
    width: '100%',
    marginRight: 20,
    paddingLeft: 30,
  },
  swiperTitle: {
    paddingTop: '38px',
    fontSize: 15,
    fontWeight: 400,
    color: theme.palette.common.black75,
    marginBottom: 10,
  },
  modalSubtitle: {
    maxWidth: 507,
    color: theme.palette.common.black75,
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '21px',
    '& Link': {
      cursor: 'pointer',
    },
  },
}));
