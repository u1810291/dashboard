/** @jsx jsx */

import { css, jsx } from '@emotion/core'
import Card, { shadowValue, paddingValue } from '../card'

export default function Click({
  children,
  padding = 1,
  inline = true,
  shadow = 0,
  tabIndex = 0,
  onClick = () => {},
  justifyContent = 'center',
  justifyItems = 'center',
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
          ${shadowValue(shadow + 1)}
        }
      `}
      {...props}
    >
      {children}
    </Card>
  )
}
