import { StyleSheet } from '@react-pdf/renderer';
import { colors } from '../../PDF.theme.common';

export const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    backgroundColor: colors.black7,
    borderRadius: 5,
  },
  imageWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxHeight: 200,
  },
  imageEmptyWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: [[20, 10]],
    borderRadius: 5,
  },
  imageEmpty: {
    width: 40,
  },
  imageSingle: {
    maxHeight: '100%',
    maxWidth: '50%',
    objectFit: 'cover',
    borderRadius: 5,
  },
  imageDouble: {
    maxHeight: '100%',
    maxWidth: '46%',
    marginRight: 10,
    marginLeft: 10,
    objectFit: 'cover',
    borderRadius: 5,
  },
  emptyCaption: {
    width: '100%',
    fontWeight: 'bold',
    fontSize: 12,
    color: colors.black75,
    textAlign: 'center',
  },
});
