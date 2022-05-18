import { StyleSheet } from '@react-pdf/renderer';
import { colors } from '../../PDF.theme.common';

export const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    width: '100%',
    boxShadow: 'none',
  },
  value: {
    marginLeft: 27,
    padding: 6,
    fontSize: 14,
    color: colors.black75,
  },
  redText: {
    color: colors.red,
  },
  yellowText: {
    color: colors.yellow,
  },
  greenText: {
    color: colors.green,
  },
});
