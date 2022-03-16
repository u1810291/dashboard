import { StyleSheet, Font } from '@react-pdf/renderer';
import { appPalette } from 'apps/theme';
import { CommonStyles, PdfCommonStyleTypes } from 'models/PdfAdapter.model';
// @ts-ignore
import LatoBold from '../fonts/Lato-Bold.ttf';
// @ts-ignore
import LatoLight from '../fonts/Lato-Light.ttf';
// @ts-ignore
import LatoRegular from '../fonts/Lato-Regular.ttf';

export const rem = 10; // in pt (!)
export const pageGutter = 2 * rem;

export const fontSize = {
  normal: 1.35 * rem,
  h1: 1.5 * rem,
};

export const fontWeight = {
  light: 300,
  normal: 400,
  bold: 700,
};

export const fontFamilyLato = 'Lato';

Font.register({
  family: fontFamilyLato,
  fonts: [
    {
      src: LatoLight,
      fontWeight: fontWeight.light,
    },
    {
      src: LatoRegular,
      fontWeight: fontWeight.normal,
    },
    {
      src: LatoBold,
      fontWeight: fontWeight.bold,
    },
  ],
});

export const commonStyles: CommonStyles = StyleSheet.create({
  // common blocks
  [PdfCommonStyleTypes.Page]: {
    paddingTop: pageGutter,
    paddingLeft: pageGutter,
    paddingRight: pageGutter,
    paddingBottom: 2 * pageGutter,
    fontFamily: fontFamilyLato,
  },

  // box
  [PdfCommonStyleTypes.Paper]: {
    width: '100%',
    maxWidth: '100%',
    marginBottom: 1.5 * rem,
    padding: 1.5 * rem,
    backgroundColor: appPalette.white,
    border: `1pt solid ${appPalette.black7}`,
    borderRadius: 0.5 * rem,
  },
  [PdfCommonStyleTypes.Mt1]: {
    marginTop: rem,
  },
  [PdfCommonStyleTypes.Mr05]: {
    marginRight: 0.5 * rem,
  },
  [PdfCommonStyleTypes.Mb0]: {
    marginBottom: 0,
  },
  [PdfCommonStyleTypes.Mb05]: {
    marginBottom: 0.5 * rem,
  },
  [PdfCommonStyleTypes.Mb1]: {
    marginBottom: rem,
  },
  [PdfCommonStyleTypes.Mb15]: {
    marginBottom: 1.5 * rem,
  },
  [PdfCommonStyleTypes.Pb0]: {
    paddingBottom: 0,
  },

  // elements
  [PdfCommonStyleTypes.Title]: {
    fontSize: fontSize.normal,
    color: appPalette.black75,
  },
  [PdfCommonStyleTypes.TitleBold]: {
    fontSize: fontSize.normal,
    fontWeight: fontWeight.bold,
    color: appPalette.black75,
  },
  [PdfCommonStyleTypes.TitleBoldMain]: {
    fontSize: fontSize.h1,
    fontWeight: fontWeight.bold,
    color: appPalette.black75,
  },
  [PdfCommonStyleTypes.Code]: {
    fontSize: fontSize.normal,
    color: appPalette.green,
  },
  [PdfCommonStyleTypes.Data]: {
    marginBottom: 0.5 * rem,
    fontSize: fontSize.normal,
    fontWeight: fontWeight.bold,
    color: appPalette.black90,
  },
  [PdfCommonStyleTypes.LabelContainer]: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 4,
    padding: '6px 10px',
    borderRadius: 5,
    backgroundColor: appPalette.black7,
  },
  [PdfCommonStyleTypes.Label]: {
    fontWeight: fontWeight.bold,
    fontSize: fontSize.normal,
    color: appPalette.black75,
  },
  [PdfCommonStyleTypes.LabelIcon]: {
    flexShrink: 0,
    width: 17,
    height: 17,
    marginRight: 10,
  },
  [PdfCommonStyleTypes.MapBox]: {
    width: '100%',
    height: 26 * rem,
    borderRadius: 5,
    backgroundColor: appPalette.black7,
  },
  [PdfCommonStyleTypes.Map]: {
    width: '100%',
    height: 26 * rem,
    borderRadius: 5,
  },
  [PdfCommonStyleTypes.Footer]: {
    width: '100vw',
    height: 20,
    display: 'flex',
    position: 'absolute',
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appPalette.black90,
    color: appPalette.black7,
    fontSize: 10,
  },
  [PdfCommonStyleTypes.BoldText]: {
    fontWeight: 'bold',
  },
});
