import React from 'react'
import { FormattedMessage } from 'react-intl'
import CSS from './onboarding-video.scss'
import { createOverlay } from 'src/components/overlay'

export function showVideo() {
  createOverlay(<OnboardingVideo />)
}

export default class OnboardingVideo extends React.Component {

  render() {
    return (
      <div className={CSS.content}>
        <h1>
          <FormattedMessage id="onboarding.video.title" />
        </h1>
        <div className={CSS.player}>
          <iframe
            frameBorder="0"
            allowFullScreen=""
            title="Mati Dashboard Video"
            src="https://onelineplayer.com/player.html?autoplay=false&loop=true&autopause=false&muted=false&url=https%3A%2F%2Fyoutu.be%2FH6-KDkZYS94&poster=null&time=true&progressBar=true&playButton=true&overlay=true&muteButton=false&fullscreenButton=true&style=light&logo=false&quality=1080p" />
        </div>
      </div>
    )
  }
}