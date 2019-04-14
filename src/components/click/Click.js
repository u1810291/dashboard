/** @jsx jsx */

import { useState } from 'react'
import { css, jsx } from '@emotion/core'
import Card from '../card'

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
  const [currentShadow, setCurrentShadow] = useState(shadow)
  const onMouseOver = setCurrentShadow.bind(null, shadow + 1)
  const onMouseOut = setCurrentShadow.bind(null, shadow)

  return (
    <Card
      inline={inline}
      padding={padding}
      shadow={currentShadow}
      justifyContent={justifyContent}
      justifyItems={justifyItems}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
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
      `}
      {...props}
    >
      {children}
    </Card>
  )
}
