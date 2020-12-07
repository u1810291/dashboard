import { StyleSheet } from '@react-pdf/renderer';
import { rem, colors, pageGutter } from 'apps/pdf/PDF.theme.common';
import { fontFamilyLato, fontSize, fontWeight } from 'apps/pdf/PDF.theme.fonts';

export const commonStyles = StyleSheet.create({
  // common blocks
  page: {
    paddingTop: pageGutter,
    paddingLeft: pageGutter,
    paddingRight: pageGutter,
    paddingBottom: 2 * pageGutter,
    fontFamily: fontFamilyLato,
  },

  // box
  paper: {
    width: '100%',
    maxWidth: '100%',
    marginBottom: 1.5 * rem,
    padding: 1.5 * rem,
    backgroundColor: colors.white,
    border: `1pt solid ${colors.black7}`,
    borderRadius: 0.5 * rem,
  },
  mt1: {
    marginTop: rem,
  },
  mr05: {
    marginRight: 0.5 * rem,
  },
  mb0: {
    marginBottom: 0,
  },
  mb05: {
    marginBottom: 0.5 * rem,
  },
  mb1: {
    marginBottom: rem,
  },
  mb15: {
    marginBottom: 1.5 * rem,
  },
  pb0: {
    paddingBottom: 0,
  },

  // elements
  title: {
    fontSize: fontSize.normal,
    color: colors.black75,
  },
  titleBold: {
    fontSize: fontSize.normal,
    fontWeight: fontWeight.bold,
    color: colors.black75,
  },
  titleBoldMain: {
    fontSize: fontSize.h1,
    fontWeight: fontWeight.bold,
    color: colors.black75,
  },
  code: {
    fontSize: fontSize.normal,
    color: colors.green,
  },
  data: {
    marginBottom: 0.5 * rem,
    fontSize: fontSize.normal,
    fontWeight: fontWeight.bold,
    color: colors.black90,
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 4,
    padding: [[6, 10]],
    borderRadius: 5,
    backgroundColor: colors.black7,
  },
  label: {
    fontWeight: fontWeight.bold,
    fontSize: fontSize.normal,
    color: colors.black75,
  },
  labelIcon: {
    flexShrink: 0,
    width: 17,
    marginRight: 10,
  },
  mapBox: {
    width: '100%',
    height: 12.5 * rem,
    borderRadius: 5,
    backgroundColor: colors.black7,
  },
  map: {
    width: '100%',
    height: 12.5 * rem,
    borderRadius: 5,
    objectFit: 'cover',
  },
});
