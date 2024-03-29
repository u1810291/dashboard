import { Palette, PaletteOptions } from '@material-ui/core/styles/createPalette';
import { TypographyOptions, Typography } from '@material-ui/core/styles/createTypography';

declare module '@material-ui/core/styles/createPalette' {
  interface TypeText {
    main: string;
    light: string;
  }
  interface TypeBackground {
    loader: string;
    hover: string;
    focus: string;
  }
  interface Foreground {
    main: string;
  }
  interface DocumentButton {
    main: string;
    contrastText: string;
  }
  interface Button {
    document: Partial<DocumentButton>;
    close: Partial<DocumentButton>;
  }
  interface SimplePaletteColorOptions{
    disabled?: string;
  }
  interface CommonColors {
    blue: string;
    gray: string;
    verydarkgray: string;
    slategray: string;
    gray68: string;
    brightgray: string;
    gray70: string;
    lightblue: string;
    lightbluehover: string;
    lightblueopacity: string;
    white10: string;
    white15: string;
    darkBlue: string;
    whiteblue: string;
    white: string;
    whiteopacity: string;
    black: string;
    blackopacity: string;
    black7: string;
    black7opacity: string;
    black50: string;
    black75: string;
    black90: string;
    black90opacity: string;
    blueopacity: string;
    red: string;
    lightRed: string;
    redhover: string;
    redorange: string;
    brightorange: string;
    redopacity: string;
    lightgray: string;
    palegray: string;
    orange: string;
    yellow: string;
    green: string;
    greentransparent: string;
    lightgreen: string;
    brightgreen: string;
    grayopacity: string;
    lightgrayopacity: string;
  }
  interface PaletteOptions {
    text?: Partial<TypeText>;
    background?: Partial<TypeBackground>;
    foreground?: Partial<Foreground>;
    button?: Partial<Button>;
    common?: Partial<CommonColors>;
  }
  interface Palette {
    text: TypeText;
    background: TypeBackground;
    foreground: Foreground;
    button: Button;
    common: CommonColors;
  }
}

declare module '@material-ui/core/styles/createTypography' {
  interface Text {
    fontSize?: number;
    fontWeight?: number | string;
  }
  interface TypographyOptions {
    h1: Text;
    h2: Text;
    h3: Text;
    h4: Text;
    h5: Text;
    h6: Text;
    subtitle2: Text;
    button: {
      textTransform: string;
    };
    fontFamily: string;
  }
  interface Typography {
    h1: Text;
    h2: Text;
    h3: Text;
    h4: Text;
    h5: Text;
    h6: Text;
    subtitle2: Text;
    button: {
      textTransform: string;
    };
    fontFamily: string;
  }
}

declare module '@material-ui/core/styles/createTheme' {
  interface ThemeOptions {
    palette?: PaletteOptions;
    typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
    isDarkMode?: boolean;
  }
  interface Theme {
    palette: Palette;
    typography: Typography;
    isDarkMode: boolean;
  }
}
