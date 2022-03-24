import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  imageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    maxHeight: 350,
  },
  image: {
    display: 'flex',
    maxHeight: 350,
    maxWidth: 250,
    objectFit: 'cover',
    borderRadius: 5,
  },
});
