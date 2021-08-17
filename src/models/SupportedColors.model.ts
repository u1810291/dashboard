export const SupportedColorsModel: { [key: string]: string } = {
  blue: '#507DED',
  green: '#00B257',
  red: '#EB5757',
  pink: '#FF527E',
  orange: '#F2994A',
  yellow: '#FFBD00',
};

export const isColorValid = (color: string): string => {
  if (color in SupportedColorsModel || color.match(/^#[a-f\d]{6}$/i)) {
    return color;
  }
  return SupportedColorsModel.blue;
};
