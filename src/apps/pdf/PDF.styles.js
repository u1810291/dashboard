import { StyleSheet } from '@react-pdf/renderer';
import { rem, colors, pageGutter } from 'apps/pdf/PDF.theme.common';
import { fontFamilyLato, fontSize, fontWeight } from 'apps/pdf/PDF.theme.fonts';

export const styles = StyleSheet.create({
  // common blocks
  page: {
    paddingTop: pageGutter,
    paddingLeft: pageGutter,
    paddingRight: pageGutter,
    paddingBottom: 2 * pageGutter,
    fontFamily: fontFamilyLato,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: fontSize.small,
    height: 3 * rem,
    color: colors.blue,
    paddingTop: 0.5 * rem,
    paddingLeft: pageGutter,
    paddingRight: pageGutter,
    paddingBottom: 0.5 * rem,
    borderTop: `1pt solid ${colors.blue}`,
  },
  footerLogo: {
    width: 3.2 * rem,
    height: rem,
  },

  // elements

  selfieBox: {
    width: 10 * rem,
    height: 10 * rem,
  },
  selfieImg: {
    width: 10 * rem,
    height: 10 * rem,
    objectFit: 'cover',
    borderRadius: 5 * rem,
  },

  title: {
    marginTop: rem,
    paddingTop: 0.5 * rem,
    marginBottom: rem,
    paddingBottom: 0.5 * rem,
    marginLeft: -pageGutter,
    paddingLeft: pageGutter,
    marginRight: -pageGutter,
    paddingRight: pageGutter,
    backgroundColor: colors.greyBG,
    fontSize: fontSize.h2,
  },
  subtitle: {
    marginTop: 0.5 * rem,
    marginRight: -0.5 * rem,
    marginBottom: 0.5 * rem,
    marginLeft: -0.5 * rem,

    paddingTop: 0.3 * rem,
    paddingRight: 0.5 * rem,
    paddingBottom: 0.3 * rem,
    paddingLeft: 0.5 * rem,

    backgroundColor: colors.greyBG,
    fontSize: fontSize.h3,
  },
  photo: {
    width: 'auto',
    height: 15 * rem,
    objectFit: 'contain',
    marginRight: rem,
  },

  label: {
    color: colors.greyText,
    paddingTop: 0.5 * rem,
    paddingRight: 0.5 * rem,
    paddingBottom: 0.5 * rem,
  },
  value: {
    padding: 0.5 * rem,
  },
  indent: {
    paddingLeft: 4 * rem,
  },
  checkLogo: {
    width: 5 * rem,
    float: 'right',
    marginTop: 0.5 * rem,
  },

  // colors
  grey: {
    color: colors.greyText,
  },
  error: {
    color: colors.red,
  },
  success: {
    color: colors.green,
  },

  // text
  h1: {
    fontSize: fontSize.h1,
    fontWeight: fontWeight.bold,
  },
  h2: {
    fontSize: fontSize.h2,
    fontWeight: fontWeight.normal,
  },
  normal: {
    fontSize: fontSize.normal,
    fontWeight: fontWeight.normal,
  },

  // box
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // allows to avoid text intersection at the bottom of the page
    // TODO: find more elegant way
    marginBottom: -4,
  },
  fg1: {
    flexGrow: 1,
  },
  fg0: {
    flexGrow: 0,
  },

  chip: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 0.5 * rem,
    padding: 0.5 * rem,
    marginBottom: rem,
  },
  chipError: {
    border: `1pt solid ${colors.red}`,
  },
  chipSuccess: {
    border: `1pt solid ${colors.green}`,
  },
  icon: {
    width: rem,
    height: rem,
  },

  mt1: {
    marginTop: rem,
  },
  ml05: {
    marginLeft: 0.5 * rem,
  },
  w20: {
    width: '20%',
  },
  w35: {
    width: '35%',
  },
  w40: {
    width: '40%',
  },
  w70: {
    width: '70%',
  },
  w80: {
    width: '80%',
  },

  vpnChipBox: {
    width: 20 * rem,
  },
  mapBox: {
    width: 20 * rem,
    height: 12.5 * rem,
  },

  debug: {
    backgroundColor: colors.greyBG,
  },
});
