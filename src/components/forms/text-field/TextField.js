/** @jsx jsx */

import { css, jsx } from '@emotion/core'
import Card from 'src/components/card'

export default function TextField({
  padding = 1,
  border = 'darkgray',
  shadow = 0,
  ...props
}) {
  return (
    <Card
      as="input"
      border={border}
      shadow={shadow}
      padding={padding}
      css={css`
        font: inherit;
        width: 100%;
      `}
      {...props}
    />
  )
}
