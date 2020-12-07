import { StyleSheet } from '@react-pdf/renderer';
import { colors } from '../../PDF.theme.common';

export const styles = StyleSheet.create({
  itemWrapper: {
    width: '100%',
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    padding: [[10, 5]],
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: colors.black7,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.black75,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 10,
    color: colors.black75,
    textAlign: 'center',
  },
  mediaItem: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    margin: [[10, 5]],
    maxWidth: 125,
    minWidth: 110,
  },
  image: {
    width: '100%',
    minWidth: 125,
    maxWidth: '100%',
    height: 150,
    display: 'block',
    objectFit: 'cover',
    objectPosition: 'center',
    borderRadius: 5,
  },
});
