import React from 'react'

export default function storyStylesDecorator(story) {
  const styles = {
    padding: 'var(--mgi-spacing)'
  }
  return <div style={styles}>{story()}</div>
}
