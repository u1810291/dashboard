import { StyleSheet } from '@react-pdf/renderer';
import { colors } from '../../PDF.theme.common';

export const styles = StyleSheet.create({
  textWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'no-wrap',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 12,
    color: colors.black75,
    fontWeight: 'bold',
  },
  images: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    borderRadius: 5,
    backgroundColor: colors.black7,
  },
  imageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    maxHeight: 200,
  },
  image: {
    display: 'block',
    maxHeight: 200,
    maxWidth: '100%',
    objectFit: 'cover',
    borderRadius: 5,
  },
  imageSingle: {
    maxWidth: '50%',
  },
  imagesHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    maxHeight: 220,
  },
  imageHorizontal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    maxHeight: 220,
    maxWidth: 'calc(50% - 20px)',
    marginRight: 10,
    marginLeft: 10,
  },
});
