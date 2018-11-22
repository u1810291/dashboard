import React from 'react'
import Label from 'src/components/label'
import TypeLabel from './TypeLabel'

export default function DocumentTypesLabel({ types = [] }) {
  return types
    .filter(t => typeof t === 'string')
    .map(type => <TypeLabel type={type} key={type} />)
    .reduce((prev, curr, i) => [prev, <Label key={i}>+</Label>, curr], [
      <TypeLabel type="liveness" key="liveness" />
    ])
}
