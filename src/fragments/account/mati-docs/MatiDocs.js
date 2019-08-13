import React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from 'components/button'
import Items from 'components/items'
import CSS from './mati-docs.module.scss'
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
      <div className={CSS.buttonContent}>
        {docsSections.map(([url, icon, message], index) => (
          <Button
            external
            href={url}
            key={index}
            className={CSS.buttonRepo}
          >
            <Items gap={0} align="center" justifyContent="left" justifyItems="left">
              {icon}
              <h3>
                <FormattedMessage
                  id={`fragments.account.mati-docs.${message}`}
                />
              </h3>
            </Items>
          </Button>
        ))}
      </div>
    </div>
  )
}
