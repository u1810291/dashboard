import React from 'react'
import { FormattedMessage } from 'react-intl'
import Card from 'src/components/card'
import Items from 'src/components/items'
import CSS from './mati-docs.scss'
import { ReactComponent as IconApple } from './icon-apple-documents.svg'
import { ReactComponent as IconAndroid } from './icon-android-documents.svg'

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
      <Items templateColumns="1fr 1fr" gap={4}>
        {docsSections.map(([url, icon, message], index) => (
          <Card key={index}>
            <Items align="center" justifyContent="start">
              <a href={url} target="_blank" rel="noopener noreferrer">
                {icon}
              </a>
              <Items flow="row" gap={1}>
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
              </Items>
            </Items>
          </Card>
        ))}
      </Items>
    </div>
  )
}
