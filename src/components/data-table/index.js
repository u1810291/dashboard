import React from 'react'
import classNames from 'classnames'
import EmptyTableIcon from './empty-table.svg'
import CSS from './styles.scss'

export default function DataTable({
  columns,
  rows,
  className,
  emptyBodyLabel
}) {
  const sizeFraction =
    100 / columns.map(({ size = 1 }) => size).reduce((sum, val) => sum + val)

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
            {columns.map(({ content, className }) => (
              <td className={className}>{content(element)}</td>
            ))}
          </tr>
        ))}
        {emptyBodyLabel && !rows.length ? (
          <tr>
            <td colSpan={columns.length}>
              <div className={CSS.tableEmptyBody}>
                <EmptyTableIcon />
                <p>{emptyBodyLabel}</p>
              </div>
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  )
}
