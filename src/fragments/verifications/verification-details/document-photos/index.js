import React from 'react'
import classNames from 'classnames'
import ZoomIcon from './zoom.svg'
import SelfieIsLoadingIcon from './selfie-is-loading.svg'
import CSS from './document-photos.module.scss'
import { FormattedMessage } from 'react-intl'

export default function DocumentPhotos({ photos = [], selfie }) {
  return (
    <div className={CSS.photos}>
      {(!selfie || (selfie && selfie.error)) && <div className={classNames(CSS.mainPhoto, CSS.photo)}>
        <div className={classNames(CSS.selfiePlaceholder)}>
          <SelfieIsLoadingIcon />
          <br/>
          {(selfie && selfie.error) ?
            <FormattedMessage id="verificationModal.selfieNotLoaded" /> :
            <FormattedMessage id="verificationModal.selfieIsLoading" />
          }
        </div>
      </div>}

      {selfie && <div className={classNames(CSS.mainPhoto, CSS.photo)}>
        <a href={selfie.href} target="_blank" rel="noopener noreferrer">
          <div className={CSS.photoWrapper}>
            <img src={selfie.href} alt={selfie.caption} />
            <ZoomIcon className={CSS.zoomIcon}/>
          </div>
        </a>
      </div>}

      {photos.map(({ href, caption }, index) => (
        <div key={index} className={classNames(CSS.photo)}>
          <a href={href} target="_blank" rel="noopener noreferrer">
            <div className={CSS.photoWrapper}>
              <img src={href} alt={caption} />
              <ZoomIcon className={CSS.zoomIcon}/>
            </div>
          </a>
          {<span>{caption}</span>}
        </div>
      ))}
    </div>
  )
}
