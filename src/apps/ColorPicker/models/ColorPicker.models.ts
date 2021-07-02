import cssVariable from 'lib/dom';

export enum Colors {
    BLUE = 'blue',
    GREEN = 'green',
    RED = 'red',
    PINK = 'pink',
    ORANGE = 'orange',
    YELLOW = 'yellow',
  }

export type GetPresets = [string, Colors][];

export function getColorValue(value: string, presets: GetPresets) {
  const preset = presets.find(([, color]) => color === value);
  return preset ? preset[0] : value;
}

// should be lazy, after document ready
export const getPresets = () => (): GetPresets => [
  [cssVariable('--mgi-theme-palette-lightblue'), Colors.BLUE],
  [cssVariable('--mgi-theme-palette-green'), Colors.GREEN],
  [cssVariable('--mgi-theme-palette-red'), Colors.RED],
  [cssVariable('--mgi-theme-palette-pink'), Colors.PINK],
  [cssVariable('--mgi-theme-palette-orange'), Colors.ORANGE],
  [cssVariable('--mgi-theme-palette-yellow'), Colors.YELLOW],
];
