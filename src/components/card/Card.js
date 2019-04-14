/** @jsx jsx */

import { css, jsx } from '@emotion/core'
import Items from '../items'

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
    box-shadow: 0px 2px calc(2px + 2px * ${shadow})
      rgba(52, 73, 94, calc(0.1 * ${shadow}));
    transition: box-shadow 0.2s ease-in-out;
    padding: calc(var(--mgi-spacing) * 0.5 * ${padding});
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
