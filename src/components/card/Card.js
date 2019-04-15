/** @jsx jsx */

import { css, jsx } from '@emotion/core'
import Items from '../items'

export const shadowValue = shadow => css`
  box-shadow: 0px 2px calc(2px + 2px * ${shadow})
    rgba(52, 73, 94, calc(0.1 * ${shadow}));
`

export const paddingValue = padding => css`
  calc(var(--mgi-spacing) * 0.5 * ${padding});
`

export default function Card({
  children,
  background = 'white',
  border = 'transparent',
  padding = 2,
  shadow = 1,
  className,
  ...props
}) {
  const cardStyles = css`
    --mgi-card-border-radius: 4px;
    overflow: hidden;
    border-radius: var(--mgi-card-border-radius);
    box-shadow: ${shadowValue(shadow)}
    transition: box-shadow 0.2s ease-in-out;
    padding: ${paddingValue(padding)};
  `

  return (
    <Items
      flow="row"
      css={cardStyles}
      className={`background-${background} border-${border} ${className || ''}`}
      {...props}
    >
      {children}
    </Items>
  )
}
