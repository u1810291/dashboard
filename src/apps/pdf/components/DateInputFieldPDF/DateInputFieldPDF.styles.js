import { StyleSheet } from '@react-pdf/renderer';
import { colors } from '../../PDF.theme.common';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'no-wrap',
  },
  control: {
    width: '33.33%',
  },
  label: {
    color: colors.black90,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
