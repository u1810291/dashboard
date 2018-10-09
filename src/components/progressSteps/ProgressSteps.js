import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CSS from './ProgressSteps.css'

export default function ProgressSteps({
  step = 1,
  stepsNum = 4,
  color = 'gray',
  colorSelected = 'blue',
  children,
  onClick = () => {},
  ...progressStepsProps
}) {
  const circles = [...Array(stepsNum).fill()].map((v, index) => {
    return (
      <li
        className={classNames(CSS.circle, color, index == step ? `selected-${colorSelected}` : '')}
        key={index}
        onClick={onClick.bind(null, index)}
      />
    )
  })

  return (
    <div {...progressStepsProps}>
      <ul className={CSS.progressSteps}>{circles}</ul>
    </div>
  )
}

ProgressSteps.propTypes = {
  step: PropTypes.number,
  stepsNum: PropTypes.number,
  color: PropTypes.string,
  colorSelected: PropTypes.string,
  onClick: PropTypes.func
}
