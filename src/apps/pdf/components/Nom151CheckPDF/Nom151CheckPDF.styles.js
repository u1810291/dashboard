import { StyleSheet } from '@react-pdf/renderer';
import { colors } from '../../PDF.theme.common';

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
    padding: [[15, 20]],
    border: `1pt solid ${colors.black50}`,
    borderRadius: 5,
  },
  link: {
    color: colors.black75,
    fontSize: 12,
  },
});
