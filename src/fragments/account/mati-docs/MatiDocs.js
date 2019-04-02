import React from 'react'
import { FormattedMessage } from 'react-intl'
import Panel from 'src/components/panel'
import Items from 'src/components/items'
import Sections from 'src/components/sections'
import CSS from './mati-docs.scss'
import IconApple from './icon-apple-documents.svg'
import IconAndroid from './icon-android-documents.svg'

const docsSections = [
  [
    'https://github.com/MatiFace/mati-global-id-sdk/blob/master/Integration_iOS.md',
    <IconApple />,
    'iosDocumentation'
  ],
  [
    'https://github.com/MatiFace/mati-global-id-sdk-integration-android',
    <IconAndroid />,
    'androidDocumentation'
  ]
]
export default function MatiDocs() {
  return (
    <div className={CSS.content}>
      <Items template="1fr 1fr" extraGap>
        {docsSections.map(([url, icon, message], index) => (
          <Panel.Body key={index}>
            <Items align="center">
              <a href={url} target="_blank" rel="noopener noreferrer">
                {icon}
              </a>
              <Sections smallGap>
                <h3>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <FormattedMessage
                      id={`fragments.account.mati-docs.${message}`}
                    />
                  </a>
                </h3>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <FormattedMessage id="fragments.account.mati-docs.github" />
                </a>
              </Sections>
            </Items>
          </Panel.Body>
        ))}
      </Items>
    </div>
  )
}
