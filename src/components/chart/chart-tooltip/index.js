import React from 'react'
import CSS from './style.css'

export default ({ header, children }) => {
  return (
    <div>
      {header ? <div className={CSS.chartTooltipHeader}>{header}</div> : null}
      {children ? (
        <div className={CSS.chartTooltipContent}>{children}</div>
      ) : null}
    </div>
  )
}

export const ChartTooltipContainer = ({
  active,
  label,
  payload: data,
  children
}) => {
  const payload = data && data[0] ? data[0].payload : { value: null }
  return active ? (
    <div className={CSS.chartTooltipContainer}>
      {children ? (
        React.cloneElement(children, { label, payload })
      ) : (
        <div className={CSS.chartTooltipContent}>{payload.value}</div>
      )}
    </div>
  ) : null
}
