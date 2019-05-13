/** @jsx jsx */

import { css, jsx } from '@emotion/core'
import Card, { shadowValue } from '../card'

export default function Click({
  children,
  gap = 1,
  inline = true,
  shadow = 0,
  tabIndex = 0,
  hoverShadow = true,
  padding = '1/2',
  onClick = () => {},
  justifyContent = 'center',
  justifyItems = 'center',
  flow = 'column',
  align = 'center',
  ...props
}) {
  return (
    <Card
      inline={inline}
      shadow={shadow}
      justifyContent={justifyContent}
      justifyItems={justifyItems}
      tabIndex={tabIndex}
      onClick={onClick}
      padding={padding}
      flow={flow}
      gap={gap}
      align={align}
      onKeyPress={event =>
        ['Enter', ' '].includes(event.key) &&
        (event.preventDefault(), onClick(event))
      }
      role="button"
      css={css`
        font: inherit;
        border: 0;
        cursor: pointer;
        text-decoration: none;
        &:hover,
        &:active {
          box-shadow: ${shadowValue((shadow + 1) * hoverShadow ? 1 : 0)};
        }
      `}
      {...props}
    >
      {children}
    </Card>
  )
}
