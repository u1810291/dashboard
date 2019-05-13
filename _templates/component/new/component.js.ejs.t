---
to: src/<%= name %>/<%= componentName %>.js
---
import React from 'react'

export default function <%= componentName %>({ message }) {
  return <span className={CSS.root}>{message}</span>
}
