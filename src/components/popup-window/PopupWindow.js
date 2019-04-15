/** @jsx jsx */

import { css, jsx } from '@emotion/core'
import Card from '../card'

export default function PopupWindow({ children, size, padding = 4, ...props }) {
  return (
    <Card
      padding={padding}
      css={css`
        width: 670px;
      `}
      {...props}
    >
      {children}
    </Card>
  )
}
