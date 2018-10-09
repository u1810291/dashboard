import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CSS from './Card.css'

export default function Card({
  cardBorderStyle = 'default',
  children,
  className,
  ...cardProps
}) {
  return (
    <div
      className={ classNames(CSS.card, cardBorderStyle, className) }
      { ...cardProps }
    >
      { children }
    </div>
  )
}

Card.propTypes = {
  cardStyle: PropTypes.string
}
