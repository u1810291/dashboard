import { StyleSheet } from '@react-pdf/renderer';
import { colors } from '../../PDF.theme.common';

export const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    border: `1pt solid ${colors.black7}`,
    borderRadius: 5,
  },
  value: {
    marginLeft: 27,
    padding: 6,
    fontSize: 14,
    color: colors.black75,
  },
  linkWrapper: {
    marginLeft: 27,
  },
  link: {
    width: '100%',
    minWidth: 100,
    maxWidth: 350,
    margin: [[10, 0]],
    padding: 8,
    color: colors.lightblue,
    backgroundColor: '#f3f7ff',
    fontSize: 14,
    borderRadius: 5,
  },
});
