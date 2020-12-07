import { StyleSheet } from '@react-pdf/renderer';
import { colors } from '../../PDF.theme.common';

export const styles = StyleSheet.create({
  titleError: {
    color: colors.red,
    fontSize: 14,
    fontWeight: 'bold',
  },
  text: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'no-wrap',
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
    padding: [[6, 10]],
    borderRadius: 5,
  },
  textError: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'no-wrap',
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
    padding: [[6, 10]],
    background: colors.redopacity,
    borderRadius: 5,
  },
});
