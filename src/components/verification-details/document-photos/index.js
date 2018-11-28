import React from 'react'
import CSS from './document-photos.module.scss'

export default function DocumentPhotos({
  photos = [],
  signURL = url => url
}) {
  return (
    <div className={CSS.photos}>
      {photos.map(({ href, caption }) => (
        <div>
          <a href={signURL(href)} target="_blank" rel="noopener noreferrer">
            <img src={signURL(href)} alt={caption} />
          </a>
          <div className="text-caption">{caption}</div>
        </div>
      ))}
    </div>
  )
}
