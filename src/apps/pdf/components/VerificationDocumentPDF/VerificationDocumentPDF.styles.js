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
    maxHeight: 160,
  },
  image: {
    maxHeight: '100%',
    objectFit: 'cover',
    borderRadius: 5,
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
  imageBigWrapper: {
    width: 120,
    height: 160,
    marginRight: 20,
    lineHeight: 0,
    textAlign: 'center',
  },
  imageBig: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    borderRadius: 5,
  },
  imageSmallWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: 40,
    maxHeight: 160,
    lineHeight: 0,
  },
  imageSmall: {
    maxHeight: 70,
    marginBottom: 10,
    marginTop: 10,
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
