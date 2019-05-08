/** @jsx jsx */

import { css, jsx } from '@emotion/core'
import Card, { shadowValue, paddingValue } from '../card'

export default function Click({
  children,
  padding = 1,
  gap = 1,
  inline = true,
  shadow = 0,
  tabIndex = 0,
  hoverShadow = true,
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
      padding={padding}
      shadow={shadow}
      justifyContent={justifyContent}
      justifyItems={justifyItems}
      tabIndex={tabIndex}
      onClick={onClick}
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
        padding-left: ${paddingValue(padding * 2)};
        padding-right: ${paddingValue(padding * 2)};

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
