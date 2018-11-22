import React from 'react'
import classNames from 'classnames'
import CSS from './styles.scss'

export default function DataTable({
  columns,
  rows,
  className
}) {
  const sizeFraction = 100 / columns.map(({ size = 1 }) => size).reduce((sum, val) => sum + val)

  return (
    <table className={classNames(CSS.table, className)}>
      <colgroup>
        {columns.map(({ size = 1 }) => (
          <col style={{ width: `${sizeFraction * size}%` }} />
        ))}
      </colgroup>
      <thead>
        <tr className="text-caption text-secondary">
          {columns.map(({ label }) => (
            <th scope="col">{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(element => (
          <tr>
            {columns.map(({ content }) => (
              <td>{content(element)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
