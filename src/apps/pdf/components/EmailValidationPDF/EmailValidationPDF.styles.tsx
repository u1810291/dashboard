import { StyleSheet } from '@react-pdf/renderer';
import { colors } from '../../PDF.theme.common';

export const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    border: `1pt solid ${colors.black7}`,
    borderRadius: 5,
    marginBottom: 10,
  },
  value: {
    marginLeft: 27,
    padding: 6,
    fontSize: 14,
    color: colors.black75,
  },
  stepDetailsContainer: {
    marginLeft: 27,
    padding: 6,
  },
  stepDetailsItem: {
    marginTop: 10,
  },
});
