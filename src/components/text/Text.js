import styled from '@emotion/styled';

const Text = styled.span(
  ({
    align,
    color,
    lineHeight = 'normal',
    opacity = 1,
    padding = '',
    size = 2,
    textDecoration = 'none',
    uppercase,
    capitalize,
    weight = 2,
    wordBreak,
  }) => ({
    fontSize: size === 2 ? null : `${1 + 0.28 * (size - 2)}rem`,
    color: color ? `var(--mgi-theme-palette-${color})` : null,
    fontWeight: weight === 2 ? null : 400 + 100 * (weight - 2),
    lineHeight,
    textTransform: (() => {
      if (uppercase) return 'uppercase';
      if (capitalize) return 'capitalize';
      return 'inherit';
    })(),
    textAlign: align,
    wordBreak,
    padding,
    opacity,
    textDecoration,
  }),
);

export default Text;
