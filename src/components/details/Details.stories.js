import React from 'react'
import { storiesOf } from '@storybook/react'
import Details from '.'

const stories = storiesOf('components/Details', module)

stories.add('Default', () => (
  <Details summary="Is Mati secure?">
    <p>
      In short, yes it is. In fact, the lack of security in most of the
      applications we use today is the reason we built Mati.
    </p>
    <p>
      We strongly believe the only path forward in securing our digital lives is
      to lift this responsibility away from users and put it on the technology
      around us. As we see it, security is either missing altogether or too
      frustrating to use.
    </p>

    <p>
      That is why we tried to minimize the difficulty and make Mati easy to use,
      but keep security as the highest priority.We use highly secure
      cryptographic methods to secure your data at Mati. All of your sensitive
      data is encrypted using standards-based crypto-algorithms.
    </p>

    <p>
      Unlike proprietary algorithms, standards-based algorithms have gone
      through public scrutiny by industry and security experts that reduces the
      chance of any inherent weaknesses or vulnerabilities.We also continuously
      make the best effort to secure our servers online and client applications
      locally.
    </p>
  </Details>
))

stories.add('Pre-opened', () => (
  <Details summary="Is Mati secure?" defaultOpened>
    <p>
      In short, yes it is. In fact, the lack of security in most of the
      applications we use today is the reason we built Mati.
    </p>
    <p>
      We strongly believe the only path forward in securing our digital lives is
      to lift this responsibility away from users and put it on the technology
      around us. As we see it, security is either missing altogether or too
      frustrating to use.
    </p>

    <p>
      That is why we tried to minimize the difficulty and make Mati easy to use,
      but keep security as the highest priority.We use highly secure
      cryptographic methods to secure your data at Mati. All of your sensitive
      data is encrypted using standards-based crypto-algorithms.
    </p>

    <p>
      Unlike proprietary algorithms, standards-based algorithms have gone
      through public scrutiny by industry and security experts that reduces the
      chance of any inherent weaknesses or vulnerabilities.We also continuously
      make the best effort to secure our servers online and client applications
      locally.
    </p>
  </Details>
))
