import { Font } from '@react-pdf/renderer';
import LatoBold from 'apps/pdf/fonts/Lato-Bold.ttf';
import LatoLight from 'apps/pdf/fonts/Lato-Light.ttf';
import LatoRegular from 'apps/pdf/fonts/Lato-Regular.ttf';
import { rem } from 'apps/pdf/PDF.theme.common';

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
