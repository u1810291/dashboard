import { StyleSheet } from '@react-pdf/renderer';
import { colors } from '../../PDF.theme.common';

export const styles = StyleSheet.create({
  fieldsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    width: '100%',
    backgroundColor: colors.white,
  },
  field: {
    width: '50%',
  },
});
