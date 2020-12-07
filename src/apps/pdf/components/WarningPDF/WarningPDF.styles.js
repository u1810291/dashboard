import { StyleSheet } from '@react-pdf/renderer';
import { colors } from '../../PDF.theme.common';

export const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    textAlign: 'center',
  },
  icon: {
    flexShrink: 0,
    width: 17,
    marginBottom: 10,
  },
  titleColor: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black75,
  },
});
