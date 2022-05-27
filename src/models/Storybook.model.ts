import { Theme } from '@material-ui/core';
import { AppTheme, AppDarkTheme } from 'apps/theme';

/** Remove random numeric postfix from MUI classnames
 *  e.g. makeStyles-root-15 will be makeStyles-root */
export const generateClassName = (rule, styleSheet) => `${styleSheet.options.classNamePrefix}-${rule.key}`;

export enum StorybookThemeTypes {
  Light = 'light',
  Dark = 'dark',
}

export const StorybookThemeMap: Record<StorybookThemeTypes, Theme> = {
  [StorybookThemeTypes.Light]: AppTheme,
  [StorybookThemeTypes.Dark]: AppDarkTheme,
};

interface IStorybookRoutes {
  root: string;
  [key: string]: string | IStorybookRoutes;
}

export const StorybookRoutes: Record<string, IStorybookRoutes> = {
  UI: {
    root: 'Shared Components',
  },
};
