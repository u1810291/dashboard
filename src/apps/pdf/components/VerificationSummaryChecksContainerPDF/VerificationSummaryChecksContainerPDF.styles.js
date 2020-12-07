import { StyleSheet } from '@react-pdf/renderer';
import { colors } from '../../PDF.theme.common';

export const styles = StyleSheet.create({
  selectContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 4,
    padding: [[6, 10]],
    borderRadius: 5,
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 4,
    padding: [[6, 10]],
    borderRadius: 5,
    background: colors.redopacity,
  },
  errorTitle: {
    fontSize: 14,
    color: colors.red,
  },
});
