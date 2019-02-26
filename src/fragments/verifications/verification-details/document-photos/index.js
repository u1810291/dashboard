import React from 'react'
import classNames from 'classnames'
import ZoomIcon from './zoom.svg'
import SelfieIsLoadingIcon from './selfie-is-loading.svg'
import CSS from './document-photos.module.scss'
import { FormattedMessage } from 'react-intl'

export default function DocumentPhotos({ photos = [], selfie, signURL = url => url }) {
  return (
    <div className={CSS.photos}>
      {!selfie && <div className={classNames(CSS.mainPhoto, CSS.photo)}>
        <div className={classNames(CSS.selfiePlaceholder)}>
          <SelfieIsLoadingIcon />
          <br/>
          <FormattedMessage id="verificationModal.selfieIsLoading" />
        </div>
      </div>}

      {selfie && <div className={classNames(CSS.mainPhoto, CSS.photo)}>
        <a href={signURL(selfie.href)} target="_blank" rel="noopener noreferrer">
          <div className={CSS.photoWrapper}>
            <img src={signURL(selfie.href)} alt={selfie.caption} />
            <ZoomIcon className={CSS.zoomIcon}/>
          </div>
        </a>
      </div>}

      {photos.map(({ href, caption }, index) => (
        <div key={index} className={classNames(CSS.photo)}>
          <a href={signURL(href)} target="_blank" rel="noopener noreferrer">
            <div className={CSS.photoWrapper}>
              <img src={signURL(href)} alt={caption} />
              <ZoomIcon className={CSS.zoomIcon}/>
            </div>
          </a>
          {<span>{caption}</span>}
        </div>
      ))}
    </div>
  )
}
