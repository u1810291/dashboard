import React from 'react'
import { createOverlay } from 'src/components/overlay'

export function showVideo() {
  createOverlay(<InstallationVideo />)
}

export default class InstallationVideo extends React.Component {
  render() {
    return (
      <div>
        <iframe title="Installation Video" width="560" height="315" src="https://www.youtube.com/embed/Gmgl_lxeFlY"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
        </iframe>
      </div>
    )
  }
}
