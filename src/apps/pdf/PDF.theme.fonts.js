import { Font } from '@react-pdf/renderer';
import LatoBold from 'apps/pdf/fonts/Lato-Bold.ttf';
import LatoLight from 'apps/pdf/fonts/Lato-Light.ttf';
import LatoRegular from 'apps/pdf/fonts/Lato-Regular.ttf';
import NotoLight from 'apps/pdf/fonts/NotoSans-Light.ttf';
import NotoBold from 'apps/pdf/fonts/NotoSans-Bold.ttf';
import NotoRegular from 'apps/pdf/fonts/NotoSans-Regular.ttf';
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
export const fontFamilyNoto = 'Noto';

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

Font.register({
  family: fontFamilyNoto,
  fonts: [
    {
      src: NotoLight,
      fontWeight: fontWeight.light,
    },
    {
      src: NotoRegular,
      fontWeight: fontWeight.normal,
    },
    {
      src: NotoBold,
      fontWeight: fontWeight.bold,
    },
  ],
});
