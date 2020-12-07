import { StyleSheet } from '@react-pdf/renderer';
import { colors } from '../../PDF.theme.common';

export const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  inputWrapper: {
    width: 'calc(50% - 30px)',
    marginBottom: 20,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  text: {
    color: colors.black90,
    fontSize: 14,
    fontWeight: 'bold',
  },
  textError: {
    fontSize: 14,
    color: colors.red,
  },
});
