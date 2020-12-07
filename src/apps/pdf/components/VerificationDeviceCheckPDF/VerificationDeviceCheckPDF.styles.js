import { StyleSheet } from '@react-pdf/renderer';
import { colors } from '../../PDF.theme.common';

export const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  col: {
    width: '50%',
  },
  titleIcon: {
    flexShrink: 0,
    width: 17,
    marginRight: 23,
  },
  value: {
    color: colors.black90,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
