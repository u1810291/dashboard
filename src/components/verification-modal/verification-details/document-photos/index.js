import React from 'react'
import CSS from './styles.scss'

export default function DocumentPhotos({
  photos = [],
}) {
  return (
    <div className={CSS.photos}>
      {photos.map(({ href, caption }) => (
        <div>
          <img src={href} alt={caption} />
          <h4>{caption}</h4>
        </div>
      ))}
    </div>
  )
}
