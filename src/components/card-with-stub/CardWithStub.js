/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Card, H2 } from 'components'

export function Stub({ children, ...props }) {
  return (
    <Card
      borderRadius="1/0/0/1"
      shadow={0}
      padding="0"
      justifyContent="center"
      align="center"
      {...props}
    >
      <H2>{children}</H2>
    </Card>
  )
}

export default function CardWithStub({ stub, shadow, children, ...props }) {
  return (
    <Card
      flow="column"
      shadow={shadow}
      gap={0}
      templateColumns="30px auto"
      align="stretch"
      padding="0"
    >
      {stub}
      <Card shadow={0} {...props} borderRadius="0/1/1/0">
        {children}
      </Card>
    </Card>
  )
}
