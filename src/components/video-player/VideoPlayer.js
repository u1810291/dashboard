/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import ReactPlayer from 'react-player'

export default function VideoPlayer({ aspectRatio = '16:9', ...props }) {
  const [width, height] = aspectRatio.split(':')
  const iframeHeight = (100 * parseInt(height)) / parseInt(width)

  return (
    <div
      css={css`
        position: relative;
        padding-top: ${iframeHeight}%;
      `}
    >
      <ReactPlayer
        width="100%"
        height="100%"
        css={css`
          position: absolute;
          top: 0;
          left: 0;
        `}
        {...props}
      />
    </div>
  )
}
