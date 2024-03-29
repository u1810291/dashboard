import { StyleSheet } from '@react-pdf/renderer';
import { rem, colors, pageGutter } from 'apps/pdf/PDF.theme.common';
import { fontFamilyNoto, fontSize, fontWeight } from 'apps/pdf/PDF.theme.fonts';

// For better support of most languages (as a example - Hindi), the Noto font family has been added.
// If there are any problems, then use the old Lato font family.
// If there are no problems, then delete the Lato font ASAP.
export const commonStyles = StyleSheet.create({
  // common blocks
  page: {
    paddingTop: pageGutter,
    paddingLeft: pageGutter,
    paddingRight: pageGutter,
    paddingBottom: 2 * pageGutter,
    fontFamily: fontFamilyNoto,
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
  mt5: {
    marginTop: 0.5 * rem,
  },
  mt1: {
    marginTop: rem,
  },
  mr05: {
    marginRight: 0.5 * rem,
  },
  ml1: {
    marginLeft: rem,
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
  mb20: {
    marginBottom: 2 * rem,
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
    marginTop: 4,
    marginBottom: 4,
    padding: '6px 10px',
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
    height: 17,
    marginRight: 10,
  },
  mapBox: {
    width: '100%',
    height: 26 * rem,
    borderRadius: 5,
    backgroundColor: colors.black7,
  },
  map: {
    width: '100%',
    height: 26 * rem,
    borderRadius: 5,
  },
  footer: {
    width: '100vw',
    height: 20,
    display: 'flex',
    position: 'absolute',
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black90,
    color: colors.black7,
    fontSize: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  container: {
    display: 'flex',
  },
  column: {
    flexDirection: 'column',
  },
});
