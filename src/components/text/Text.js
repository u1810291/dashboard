/** @jsx jsx */

import styled from '@emotion/styled'
import { css, jsx } from '@emotion/core'

const Text = styled.span(
  ({ size = 2, weight = 2, align, color, uppercase, lineHeight = 1, padding = '', opacity = 1, textDecoration = 'none' }) => ({
    fontSize: size === 2 ? null : `${1 + 0.28 * (size - 2)}rem`,
    color: color ? `var(--mgi-theme-palette-${color})` : null,
    fontWeight: weight === 2 ? null : 400 + 100 * (weight - 2),
    lineHeight,
    textTransform: uppercase ? 'uppercase' : null,
    textAlign: align,
    padding: padding,
    opacity: opacity,
    textDecoration: textDecoration,
  })
)

export default Text

export function H1({ size = 4, weight = 4, ...props }) {
  return <Text size={size} weight={weight} as="h1" {...props} />
}

export function H2({ size = 3, weight = 4, ...props }) {
  return <Text size={size} weight={weight} as="h2" {...props} />
}

export function H3({ size = 2, weight = 4, ...props }) {
  return <Text size={size} weight={weight} as="h3" {...props} />
}

export function Small({ size = 1.5, ...props }) {
  return <Text size={size} as="small" {...props} />
}

export function HR({ margin = 10, width = 1, ...props }) {
  return <hr css={css`margin: ${margin}px 0; border-width: ${width}px;`} {...props} />
}
