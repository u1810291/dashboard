import { StyleSheet } from '@react-pdf/renderer';
import { colors } from '../../PDF.theme.common';

export const styles = StyleSheet.create({
  title: {
    color: colors.black,
    marginBottom: 20,
    fontSize: 14,
    fontWeight: 'bold',
  },
  marginTop5: {
    marginTop: 0.5,
  },
  wrap: {
    padding: '20px 10px 10px',
  },
  container: {
    display: 'flex',
  },
  value: {
    marginLeft: 27,
    padding: 6,
    fontSize: 14,
    color: colors.black75,
  },
  valueBox: {
    marginLeft: 27,
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexRowItem50: {
    flexBasis: '50%',
  },
  flexRowItem100: {
    flexBasis: '100%',
  },
  pr5: {
    paddingRight: 5,
  },
});
