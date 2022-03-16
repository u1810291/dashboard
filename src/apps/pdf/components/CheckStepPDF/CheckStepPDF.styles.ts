import { StyleSheet } from '@react-pdf/renderer';
import { colors } from '../../PDF.theme.common';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  value: {
    marginLeft: 27,
    padding: 6,
    fontSize: 14,
    color: colors.black75,
  },
  valueEntrySuccess: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black90,
  },
  valueEntryFailed: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.red,
  },
});
