import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  tipMessage: {
    padding: [[6, 10]],
    borderRadius: 5,
    marginTop: 15,
  },

  success: {
    color: '#2ADA9A',
    backgroundColor: 'rgba(42, 218, 154, 0.1)',
  },
  failure: {
    color: '#ff0000',
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
  },
  checking: {
    border: '1px solid #0a0a0a',
  },
}));
