import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CSS from './Items.scss'

export const aligns = [
  'auto',
  'normal',
  'start',
  'end',
  'center',
  'stretch',
  'baseline',
  'first baseline',
  'last baseline'
]

export const justifies = [
  'start',
  'end',
  'center',
  'stretch',
  'normal',
  'space-around',
  'space-between',
  'space-evenly'
]

export const flows = ['column', 'row']

export const gaps = [0, 1, 2, 3, 4]

export default function Items({
  children,
  inline = false,
  align = 'start',
  justifyContent = 'normal',
  templateColumns = 'none',
  templateRows = 'none',
  flow = 'column',
  gap = 2,
  className
}) {
  return (
    <div
      className={classNames(CSS.root, { inline }, className)}
      data-gap={gap}
      style={{
        gridTemplateColumns: templateColumns,
        gridTemplateRows: templateRows,
        alignItems: align,
        gridAutoFlow: flow,
        justifyContent
      }}
    >
      {children}
    </div>
  )
}

Items.propTypes = {
  gap: PropTypes.oneOf(gaps),
  inline: PropTypes.bool,
  align: PropTypes.oneOf(aligns),
  justifyContent: PropTypes.oneOf(justifies),
  flow: PropTypes.oneOf(flows)
}
