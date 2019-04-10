import React from 'react'
import { FormattedMessage } from 'react-intl'
import CSS from './how-it-works-video.scss'
import { createOverlay } from 'src/components/overlay'

export function showVideo() {
  createOverlay(<OnboardingVideoHowItWorks />)
}

export default class OnboardingVideoHowItWorks extends React.Component {
  render() {
    return (
      <div className={CSS.content}>
        <h1>
          <FormattedMessage id="onboarding.video.how-it-works" />
        </h1>
        <div className={CSS.player}>
          <iframe
            frameBorder="0"
            allowFullScreen=""
            title="Mati Dashboard Video"
            src="https://onelineplayer.com/player.html?autoplay=false&loop=true&autopause=false&muted=false&url=https%3A%2F%2Fdrive.google.com%2Fuc%3Fauthuser%3D0%26id%3D1qd7DmT1UajDRbs-OF0F3hW2E5qPALO1u%26export%3Ddownload&poster=null&time=true&progressBar=true&playButton=true&overlay=true&muteButton=false&fullscreenButton=true&style=light&logo=false&quality=1080p"
          />
        </div>
      </div>
    )
  }
}
