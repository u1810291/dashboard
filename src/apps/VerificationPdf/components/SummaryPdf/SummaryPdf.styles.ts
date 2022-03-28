import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  statusWrapper: {
    padding: '12px 20px',
    borderRadius: 5,
  },
  item: {
    width: '100%',
    marginBottom: 20,
  },
  title: {
    paddingRight: 20,
    fontWeight: 'bold',
    fontSize: 21,
  },
  text: {
    fontSize: 14,
  },
});
