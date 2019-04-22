/** @jsx jsx */

import { css, jsx } from '@emotion/core'
import { FormattedMessage } from 'react-intl'
import Card from 'src/components/card'
import Items from 'src/components/items'
import ContentPreloader from 'src/components/content-preloader'
import { ReactComponent as Check } from './check.svg'
import { ReactComponent as Failure } from './failure.svg'

const videoStyle = css`
  max-height: 250px;
  object-fit: cover;
  object-position: right;
`

function LivenessVideo({ url }) {
  return (
    <video
      css={videoStyle}
      autoPlay
      muted
      onMouseOver={({ target }) => {
        target.loop = true
        target.play()
      }}
      onMouseLeave={({ target }) => {
        target.loop = false
        target.pause()
      }}
      src={url}
    />
  )
}

function InProgress({ step }) {
  return (
    <Card flow="column" padding={4} templateColumns="5fr 4fr">
      <h2>
        <FormattedMessage id="LivenessStep.InProgress.title" />
        <p>
          <FormattedMessage id="LivenessStep.InProgress.description" />
        </p>
      </h2>
      <ContentPreloader />
    </Card>
  )
}

function Success({ step }) {
  return (
    <Card flow="column" padding={4} templateColumns="5fr 4fr" align="stretch">
      <h2>
        <Items align="center" inline gap={1}>
          <Check className="text-success" />
          <FormattedMessage id="LivenessStep.Success.title" />
        </Items>
        <p>
          <FormattedMessage
            id="LivenessStep.Success.description"
            values={{
              message: (
                <strong className="text-success">
                  <FormattedMessage id="LivenessStep.Success.message" />
                </strong>
              )
            }}
          />
        </p>
      </h2>

      <Card padding={0}>
        <LivenessVideo url={step.data.videoUrl} />
      </Card>
    </Card>
  )
}

function Error({ step }) {
  return (
    <Card flow="column" padding={4} templateColumns="5fr 4fr">
      <h2>
        <Items align="center" inline gap={1}>
          <Failure className="svg-error" />
          <FormattedMessage id="LivenessStep.Error.title" />
        </Items>
        <p>{step.error.message}</p>
      </h2>

      {step.data && step.data.videoUrl && (
        <Card padding={0}>
          <LivenessVideo url={step.data.videoUrl} />
        </Card>
      )}
    </Card>
  )
}

function Skipped() {
  return (
    <Card flow="column" padding={4} templateColumns="5fr 4fr">
      <h2>
        <Items align="center" inline gap={1}>
          <Failure />
          <FormattedMessage id="LivenessStep.Skipped.title" />
        </Items>

        <p>
          <FormattedMessage id="LivenessStep.Skipped.description" />
        </p>
      </h2>
    </Card>
  )
}

export default function LivenessStep({ step }) {
  if (step.status === 0) return <Skipped />
  if (step.status === 100) return <InProgress step={step} />
  if (step.status === 200 && step.error) return <Error step={step} />
  if (step.status === 200 && !step.error) return <Success step={step} />
}
