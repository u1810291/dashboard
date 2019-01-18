import React from 'react'
import CSS from './document-photos.module.scss'

export default function DocumentPhotos({ photos = [], signURL = url => url }) {
  return (
    <div className={CSS.photos}>
      {photos.map(({ href, caption }, index) => (
        <div key={index}>
          <a href={signURL(href)} target="_blank" rel="noopener noreferrer">
            <img src={signURL(href)} alt={caption} />
          </a>
          <strong>{caption}</strong>
        </div>
      ))}
    </div>
  )
}
