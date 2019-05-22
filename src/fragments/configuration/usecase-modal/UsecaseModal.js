/** @jsx jsx */
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { css, jsx } from '@emotion/core'
import { Card, Click, Items, H2, VideoPlayer } from 'components'
import DrivingLicenceIcon from './DrivingLicenceIcon.svg'
import PassportIcon from './PassportIcon.svg'
import NationalIdIcon from './NationalIdIcon.svg'

const URLS = {
  drivingLicense: 'https://vimeo.com/337507628',
  passport: 'https://vimeo.com/337507683',
  nationalId: 'https://vimeo.com/337507662'
}

export default function UsecaseModal() {
  const buttonProps = {
    borderRadius: 0,
    justifyItems: 'center',
    padding: '2/1',
    gap: 1,
    shadow: 2,
    flow: 'row'
  }
  const [url, setURL] = useState(URLS.drivingLicense)
  return (
    <Card
      padding="4"
      gap="3"
      flow="column"
      align="stretch"
      templateColumns="3fr 2fr"
      css={css`
        max-width: 785px;
      `}
    >
      <Items flow="row">
        <H2>
          <FormattedMessage id="UsecaseModal.title" />
        </H2>
        <Card padding="0">
          <VideoPlayer url={url} />
        </Card>
      </Items>
      <Items templateColumns="1fr 1fr" flow="row" align="stretch">
        <Click
          {...buttonProps}
          onClick={setURL.bind(null, URLS.drivingLicense)}
        >
          <img src={DrivingLicenceIcon} alt="" />
          <FormattedMessage id="verification.type.driving-license" />
        </Click>
        <Click {...buttonProps} onClick={setURL.bind(null, URLS.passport)}>
          <img src={PassportIcon} alt="" />
          <FormattedMessage id="verification.type.passport" />
        </Click>
        <Click
          {...buttonProps}
          onClick={setURL.bind(null, URLS.nationalId)}
          css={css`
            grid-column: 1/3;
          `}
        >
          <Items align="center" gap="4">
            <img src={PassportIcon} alt="" />
            <img src={NationalIdIcon} alt="" />
          </Items>
          <span>
            <FormattedMessage id="verification.type.passport" /> +{' '}
            <FormattedMessage id="verification.type.national" />
          </span>
        </Click>
      </Items>
    </Card>
  )
}
