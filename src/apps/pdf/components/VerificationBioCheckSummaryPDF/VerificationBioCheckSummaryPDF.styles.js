import { StyleSheet } from '@react-pdf/renderer';
import { colors } from '../../PDF.theme.common';

export const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
    padding: 12,
    backgroundColor: colors.black7,
    borderRadius: 5,
  },
  data: {
    textTransform: 'uppercase',
  },
  biometricText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    wordBreak: 'break-word',
  },
  imageBiometric: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: 104,
    height: 140,
    margin: [[0, 'auto']],
    borderRadius: 5,
  },
  imageDisabled: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: [[20, 10]],
  },
  imageNotDisabled: {
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 5,
  },
  imageEmpty: {
    width: 40,
    paddingLeft: 10,
  },
  emptyCaption: {
    fontWeight: 'bold',
    fontSize: 12,
    color: colors.black75,
  },
  emptyText: {
    marginBottom: 5,
    color: colors.black50,
    fontSize: 14,
  },
});
