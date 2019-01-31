import React from 'react'
import classNames from 'classnames'
import ZoomIcon from './zoom.svg'
import SelfieIsLoadingIcon from './selfie-is-loading.svg'
import CSS from './document-photos.module.scss'
import { FormattedMessage } from 'react-intl'

export default function DocumentPhotos({ photos = [], signURL = url => url }) {

  let hasMainPhoto = photos.find(({isMainPhoto}) => isMainPhoto)

  return (
    <div className={CSS.photos}>
      {!hasMainPhoto && <div className={classNames(CSS.mainPhoto, CSS.photo)}>
        <div className={classNames(CSS.photoWrapper, CSS.selfiePlaceholder)}>
          <SelfieIsLoadingIcon />
          <br/>
          <FormattedMessage id="verificationModal.selfieIsLoading" />
        </div>
      </div>}
      {photos.map(({ href, caption, isMainPhoto }, index) => (
        <div key={index} className={classNames(isMainPhoto && CSS.mainPhoto, CSS.photo)}>
          <a href={signURL(href)} target="_blank" rel="noopener noreferrer">
            <div className={CSS.photoWrapper}>
              <img src={signURL(href)} alt={caption} />
              <ZoomIcon className={CSS.zoomIcon}/>
            </div>
          </a>
          {isMainPhoto || <span>{caption}</span>}
        </div>
      ))}
    </div>
  )
}
