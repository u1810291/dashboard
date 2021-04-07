import { StyleSheet } from '@react-pdf/renderer';
import { colors } from '../../PDF.theme.common';

export const styles = StyleSheet.create({
  result: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: [[0, 'auto', 16]],
    padding: [[30, 20, 0]],
  },
  resultTitle: {
    width: '100%',
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black50,
    textAlign: 'center',
  },
  image: {
    width: 22,
    marginBottom: 10,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  inputWrapper: {
    width: 'calc(50% - 30px)',
    marginBottom: 20,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  text: {
    color: colors.black90,
    fontSize: 14,
    fontWeight: 'bold',
  },
  textError: {
    fontSize: 14,
    color: colors.red,
  },
});
