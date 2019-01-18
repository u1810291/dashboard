import React from 'react'
import classNames from 'classnames'
import EmptyTableIcon from './empty-table.svg'
import CSS from './DataTable.scss'

export default function DataTable({
  columns,
  rows,
  className,
  emptyBodyLabel,
  onRowClick
}) {
  const sizeFraction =
    100 / columns.map(({ size = 1 }) => size).reduce((sum, val) => sum + val)

  return (
    <div className={CSS.wrapper}>
    <table className={classNames(CSS.table, className)}>
      <colgroup>
        {columns.map(({ size = 1 }, index) => (
          <col key={index} style={{ width: `${sizeFraction * size}%` }} />
        ))}
      </colgroup>
      <thead>
        <tr className="text-secondary">
          {columns.map(({ label }, index) => (
            <th scope="col" key={index}>
              <strong>{label}</strong>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((element, index) => (
          <tr
            key={index}
            onClick={onRowClick && (() => onRowClick(element))}
            className={onRowClick && CSS.clickable}
          >
            {columns.map(({ content, className }, index) => (
              <td className={className} key={index}>
                {content(element)}
              </td>
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
    </div>
  )
}
