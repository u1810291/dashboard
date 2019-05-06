---
to: src/<%= name %>/<%= componentName %>.js
---
import React from 'react'
import CSS from './<%= componentName %>.module.scss'

export default function <%= componentName %>({ message }) {
  return <span className={CSS.root}>{message}</span>
}
