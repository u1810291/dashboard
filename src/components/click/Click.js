/** @jsx jsx */

import { css, jsx } from '@emotion/core'
import Card, { shadowValue } from '../card'

export default function Click({
  children,
  gap = 1,
  inline = true,
  disabled,
  shadow = 0,
  tabIndex = 0,
  hoverShadow = true,
  padding = '1/2',
  background,
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
      disabled={disabled}
      justifyContent={justifyContent}
      justifyItems={justifyItems}
      tabIndex={tabIndex}
      onClick={disabled ? () => {} : onClick}
      padding={padding}
      background={disabled ? 'disabled' : background}
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
          box-shadow: ${shadowValue(
            (shadow + 1) * (hoverShadow && !disabled) ? 1 : 0
          )};
        }
        &[disabled] {
          cursor: default;
          outline: 0;
        }
      `}
      {...props}
    >
      {children}
    </Card>
  )
}
